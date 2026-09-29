/// Contract for hardware-backed secure storage on Android.
/// Interacts with Android Keystore through EncryptedSharedPreferences or StrongBox Keymaster.
abstract class ISecureStorage {
  Future<void> writeString({required String key, required String value});
  Future<String?> readString({required String key});
  Future<void> deleteKey({required String key});
  Future<void> clearAll();
}
