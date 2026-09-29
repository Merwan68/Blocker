package com.aegisbet.security

import android.content.Context
import android.content.SharedPreferences
import androidx.security.crypto.EncryptedSharedPreferences
import androidx.security.crypto.MasterKey

/**
 * Android Keystore Hardware Security Manager for AegisBet.
 * Utilizes StrongBox Keymaster / Trusted Execution Environment (TEE)
 * to store cryptographic tokens and configuration without exposing keys in RAM.
 */
class KeystoreManager(private val context: Context) {

    private val masterKey: MasterKey by lazy {
        MasterKey.Builder(context)
            .setKeyScheme(MasterKey.KeyScheme.AES256_GCM)
            .setRequestStrongBoxBacked(true) // Uses StrongBox hardware chip if available on device
            .build()
    }

    private val securePreferences: SharedPreferences by lazy {
        EncryptedSharedPreferences.create(
            context,
            SECURE_PREFS_NAME,
            masterKey,
            EncryptedSharedPreferences.PrefKeyEncryptionScheme.AES256_SIV,
            EncryptedSharedPreferences.PrefValueEncryptionScheme.AES256_GCM
        )
    }

    fun putSecureString(key: String, value: String) {
        securePreferences.edit().putString(key, value).apply()
    }

    fun getSecureString(key: String): String? {
        return securePreferences.getString(key, null)
    }

    fun removeSecureKey(key: String) {
        securePreferences.edit().remove(key).apply()
    }

    fun clearAllSecureKeys() {
        securePreferences.edit().clear().apply()
    }

    companion object {
        private const val SECURE_PREFS_NAME = "aegisbet_keystore_vault_secure"
        
        @Volatile
        private var instance: KeystoreManager? = null

        fun getInstance(context: Context): KeystoreManager {
            return instance ?: synchronized(this) {
                instance ?: KeystoreManager(context.applicationContext).also { instance = it }
            }
        }
    }
}
