package com.aegisbet.ui

import android.app.Activity
import android.content.Intent
import android.os.Bundle

/**
 * Fullscreen Red 🛑 ACCESS BLOCKED intervention activity.
 * Triggered on Android 12+ when user attempts to access a prohibited gambling app.
 */
class BlockingOverlayActivity : Activity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        // In production, renders the red warning layout
    }

    override fun onBackPressed() {
        // Safely redirect user to device home screen
        val homeIntent = Intent(Intent.ACTION_MAIN).apply {
            addCategory(Intent.CATEGORY_HOME)
            flags = Intent.FLAG_ACTIVITY_NEW_TASK
        }
        startActivity(homeIntent)
        finish()
    }
}
