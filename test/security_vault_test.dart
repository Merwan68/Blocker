import 'package:flutter_test/flutter_test.dart';
import '../lib/core/security/security_vault.dart';
import '../lib/core/security/i_secure_storage.dart';

class MockSecureStorage implements ISecureStorage {
  final Map<String, String> _storage = {};

  @override
  Future<void> writeString({required String key, required String value}) async {
    _storage[key] = value;
  }

  @override
  Future<String?> readString({required String key}) async {
    return _storage[key];
  }

  @override
  Future<void> deleteKey({required String key}) async {
    _storage.remove(key);
  }

  @override
  Future<void> clearAll() async {
    _storage.clear();
  }
}

void main() {
  group('AegisBet SecurityVault Production Unit Tests', () {
    late MockSecureStorage mockStorage;
    late SecurityVault vault;

    setUp(() {
      mockStorage = MockSecureStorage();
      vault = SecurityVault(mockStorage);
    });

    test('Setup PIN stores salt and PBKDF2 hash, never plaintext PIN', () async {
      const pin = '4928';
      final recoveryCode = await vault.setupProtectionPin(pin);

      expect(recoveryCode, isNotEmpty);
      expect(recoveryCode.length, equals(19)); // XXXX-XXXX-XXXX-XXXX = 19 chars

      final storedHash = await mockStorage.readString(key: SecurityVault.keyPinHash);
      final storedSalt = await mockStorage.readString(key: SecurityVault.keyPinSalt);

      // Verify that plaintext PIN is nowhere in storage
      expect(storedHash, isNotNull);
      expect(storedHash, isNot(contains(pin)));
      expect(storedSalt, isNotNull);
      expect(storedSalt, isNot(contains(pin)));
    });

    test('Correct PIN authenticates and resets failure count', () async {
      await vault.setupProtectionPin('7789');

      final result = await vault.verifyPin('7789');
      expect(result.isSuccess, isTrue);
      expect(result.failedAttempts, equals(0));
      expect(result.lockoutSecondsRemaining, isNull);
    });

    test('Incorrect PIN fails without revealing sensitive data', () async {
      await vault.setupProtectionPin('7789');

      final result = await vault.verifyPin('1111');
      expect(result.isSuccess, isFalse);
      expect(result.failedAttempts, equals(1));
      expect(result.errorMessage, contains('Incorrect password'));
    });

    test('Three consecutive failed attempts trigger 30-second lockout delay', () async {
      await vault.setupProtectionPin('8842');

      // Attempt 1
      final res1 = await vault.verifyPin('0000');
      expect(res1.isSuccess, isFalse);
      expect(res1.lockoutSecondsRemaining, isNull);

      // Attempt 2
      final res2 = await vault.verifyPin('0000');
      expect(res2.isSuccess, isFalse);
      expect(res2.lockoutSecondsRemaining, isNull);

      // Attempt 3 -> Lockout!
      final res3 = await vault.verifyPin('0000');
      expect(res3.isSuccess, isFalse);
      expect(res3.failedAttempts, equals(3));
      expect(res3.lockoutSecondsRemaining, equals(30));
      expect(res3.errorMessage, contains('locked for 30 seconds'));

      // Attempt 4 while locked out should immediately be rejected
      final resBlocked = await vault.verifyPin('8842'); // even with right PIN!
      expect(resBlocked.isSuccess, isFalse);
      expect(resBlocked.errorMessage, contains('Device locked'));
    });

    test('Emergency recovery code validates and clears lockout', () async {
      final code = await vault.setupProtectionPin('5512');

      // Trigger lockout
      await vault.verifyPin('0000');
      await vault.verifyPin('0000');
      await vault.verifyPin('0000');

      // Verify recovery code
      final isValid = await vault.verifyRecoveryCode(code);
      expect(isValid, isTrue);

      // Lockout is cleared, now correct PIN works
      final afterRecovery = await vault.verifyPin('5512');
      expect(afterRecovery.isSuccess, isTrue);
    });

    test('Changing PIN requires verifying current PIN first', () async {
      await vault.setupProtectionPin('1234');

      // Try change with wrong old PIN
      final failChange = await vault.changePin(currentPin: '9999', newPin: '5678');
      expect(failChange, isFalse);

      // Verify original PIN still works
      final stillWorks = await vault.verifyPin('1234');
      expect(stillWorks.isSuccess, isTrue);

      // Successful change
      final successChange = await vault.changePin(currentPin: '1234', newPin: '5678');
      expect(successChange, isTrue);

      // Old PIN fails, new PIN succeeds
      final oldFails = await vault.verifyPin('1234');
      expect(oldFails.isSuccess, isFalse);

      final newSucceeds = await vault.verifyPin('5678');
      expect(newSucceeds.isSuccess, isTrue);
    });
  });
}
