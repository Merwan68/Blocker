import 'dart:convert';
import 'dart:math';
import 'dart:typed_data';
import 'package:crypto/crypto.dart';
import 'i_secure_storage.dart';

class PinVerificationResult {
  final bool isSuccess;
  final String? errorMessage;
  final int? lockoutSecondsRemaining;
  final int failedAttempts;

  PinVerificationResult({
    required this.isSuccess,
    this.errorMessage,
    this.lockoutSecondsRemaining,
    required this.failedAttempts,
  });
}

/// Production implementation of AegisBet Cryptographic Security Vault.
/// Never stores PIN in plaintext.
/// Implements PBKDF2-HMAC-SHA256 with 100,000 iterations, 128-bit CSPRNG salt,
/// and exponential backoff lockout schedules.
class SecurityVault {
  static const String keyPinHash = "aegisbet_pin_hash_v1";
  static const String keyPinSalt = "aegisbet_pin_salt_v1";
  static const String keyRecoveryCode = "aegisbet_recovery_code_v1";
  static const String keyFailedAttempts = "aegisbet_failed_attempts_v1";
  static const String keyLockoutUntil = "aegisbet_lockout_until_epoch_ms";
  
  static const int pbkdf2Iterations = 100000;
  static const int saltLengthBytes = 16; // 128 bits

  final ISecureStorage _storage;

  SecurityVault(this._storage);

  /// Initializes the Protection PIN during onboarding.
  /// Generates a unique 128-bit cryptographically secure random salt,
  /// hashes using PBKDF2-HMAC-SHA256, and stores in the hardware-backed keystore.
  Future<String> setupProtectionPin(String pin) async {
    if (pin.length < 4 || pin.length > 8) {
      throw ArgumentError("PIN must be between 4 and 8 digits.");
    }

    final saltBytes = _generateSecureRandomBytes(saltLengthBytes);
    final saltBase64 = base64Encode(saltBytes);

    final hashHex = _derivePbkdf2Hash(pin, saltBytes, pbkdf2Iterations);

    await _storage.writeString(key: keyPinSalt, value: saltBase64);
    await _storage.writeString(key: keyPinHash, value: hashHex);
    await _storage.writeString(key: keyFailedAttempts, value: "0");
    await _storage.deleteKey(key: keyLockoutUntil);

    // Generate emergency recovery code
    final recoveryCode = _generateRecoveryCode();
    await _storage.writeString(key: keyRecoveryCode, value: recoveryCode);

    return recoveryCode;
  }

  /// Verifies a PIN entered by the user.
  /// Enforces lockout timings, increments failed attempts on mismatch,
  /// and resets failed attempts on success.
  Future<PinVerificationResult> verifyPin(String inputPin) async {
    // 1. Check if user is currently locked out
    final lockoutUntilStr = await _storage.readString(key: keyLockoutUntil);
    if (lockoutUntilStr != null) {
      final lockoutUntilEpoch = int.tryParse(lockoutUntilStr) ?? 0;
      final nowEpoch = DateTime.now().millisecondsSinceEpoch;
      if (nowEpoch < lockoutUntilEpoch) {
        final remainingSec = ((lockoutUntilEpoch - nowEpoch) / 1000).ceil();
        final currentFails = int.tryParse(await _storage.readString(key: keyFailedAttempts) ?? "3") ?? 3;
        return PinVerificationResult(
          isSuccess: false,
          errorMessage: "Device locked due to repeated failed attempts. Try again in $remainingSec seconds.",
          lockoutSecondsRemaining: remainingSec,
          failedAttempts: currentFails,
        );
      }
    }

    final storedSaltBase64 = await _storage.readString(key: keyPinSalt);
    final storedHashHex = await _storage.readString(key: keyPinHash);

    if (storedSaltBase64 == null || storedHashHex == null) {
      return PinVerificationResult(
        isSuccess: false,
        errorMessage: "Protection PIN has not been configured.",
        failedAttempts: 0,
      );
    }

    final saltBytes = base64Decode(storedSaltBase64);
    final computedHash = _derivePbkdf2Hash(inputPin, saltBytes, pbkdf2Iterations);

    final isValid = _constantTimeCompare(computedHash, storedHashHex);

    if (isValid) {
      // Authentication succeeded: reset failure count
      await _storage.writeString(key: keyFailedAttempts, value: "0");
      await _storage.deleteKey(key: keyLockoutUntil);

      return PinVerificationResult(
        isSuccess: true,
        failedAttempts: 0,
      );
    } else {
      // Authentication failed: increment failure counter
      final currentFailsStr = await _storage.readString(key: keyFailedAttempts) ?? "0";
      final newFails = (int.tryParse(currentFailsStr) ?? 0) + 1;
      await _storage.writeString(key: keyFailedAttempts, value: newFails.toString());

      final lockoutSec = _calculateLockoutDelaySeconds(newFails);
      if (lockoutSec > 0) {
        final lockoutUntil = DateTime.now().millisecondsSinceEpoch + (lockoutSec * 1000);
        await _storage.writeString(key: keyLockoutUntil, value: lockoutUntil.toString());
      }

      return PinVerificationResult(
        isSuccess: false,
        errorMessage: lockoutSec > 0
            ? "Too many failed attempts ($newFails). Protection locked for $lockoutSec seconds."
            : "Incorrect password. Protection remains active.",
        lockoutSecondsRemaining: lockoutSec > 0 ? lockoutSec : null,
        failedAttempts: newFails,
      );
    }
  }

  /// Verifies an emergency recovery code.
  Future<bool> verifyRecoveryCode(String inputCode) async {
    final storedCode = await _storage.readString(key: keyRecoveryCode);
    if (storedCode == null) return false;

    final cleanInput = inputCode.replaceAll('-', '').trim().toUpperCase();
    final cleanStored = storedCode.replaceAll('-', '').trim().toUpperCase();

    final isValid = _constantTimeCompare(cleanInput, cleanStored);
    if (isValid) {
      // Clear lockout
      await _storage.writeString(key: keyFailedAttempts, value: "0");
      await _storage.deleteKey(key: keyLockoutUntil);
    }
    return isValid;
  }

  /// Changes the Protection PIN after validating the current PIN.
  Future<bool> changePin({required String currentPin, required String newPin}) async {
    final verifyCurrent = await verifyPin(currentPin);
    if (!verifyCurrent.isSuccess) {
      return false;
    }
    await setupProtectionPin(newPin);
    return true;
  }

  /// Calculates progressive lockout delay in seconds.
  /// 1-2 attempts: no lockout
  /// 3 attempts: 30 seconds
  /// 4 attempts: 60 seconds (1 minute)
  /// 5 attempts: 180 seconds (3 minutes)
  /// 6+ attempts: 300 seconds (5 minutes)
  int _calculateLockoutDelaySeconds(int failedAttempts) {
    if (failedAttempts < 3) return 0;
    if (failedAttempts == 3) return 30;
    if (failedAttempts == 4) return 60;
    if (failedAttempts == 5) return 180;
    return 300;
  }

  /// Constant-time string comparison to prevent side-channel timing attacks.
  bool _constantTimeCompare(String a, String b) {
    if (a.length != b.length) return false;
    int result = 0;
    for (int i = 0; i < a.length; i++) {
      result |= a.codeUnitAt(i) ^ b.codeUnitAt(i);
    }
    return result == 0;
  }

  /// Cryptographic PBKDF2 implementation using HMAC-SHA256
  String _derivePbkdf2Hash(String password, Uint8List salt, int iterations) {
    final hmac = Hmac(sha256, utf8.encode(password));
    final numBlocks = (32 / 32).ceil();
    final derivedKey = Uint8List(32);

    for (int i = 1; i <= numBlocks; i++) {
      final blockIndexBytes = Uint8List(4)
        ..buffer.asByteData().setUint32(0, i, Endian.big);

      var u = hmac.convert([...salt, ...blockIndexBytes]).bytes;
      var xorSum = List<int>.from(u);

      for (int iter = 1; iter < iterations; iter++) {
        u = hmac.convert(u).bytes;
        for (int k = 0; k < xorSum.length; k++) {
          xorSum[k] ^= u[k];
        }
      }

      derivedKey.setRange((i - 1) * 32, i * 32, xorSum);
    }

    return derivedKey.map((b) => b.toRadixString(16).padLeft(2, '0')).join();
  }

  /// Generates CSPRNG random bytes.
  Uint8List _generateSecureRandomBytes(int length) {
    final random = Random.secure();
    final bytes = Uint8List(length);
    for (int i = 0; i < length; i++) {
      bytes[i] = random.nextInt(256);
    }
    return bytes;
  }

  /// Generates a 16-character alphanumeric recovery key formatted as XXXX-XXXX-XXXX-XXXX
  String _generateRecoveryCode() {
    const chars = '23456789ABCDEFGHJKLMNPQRSTUVWXYZ';
    final random = Random.secure();
    final buffer = StringBuffer();
    for (int i = 0; i < 16; i++) {
      buffer.write(chars[random.nextInt(chars.length)]);
    }
    final raw = buffer.toString();
    return "${raw.substring(0, 4)}-${raw.substring(4, 8)}-${raw.substring(8, 12)}-${raw.substring(12, 16)}";
  }
}
