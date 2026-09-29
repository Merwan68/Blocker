package com.aegisbet.accessibility

import android.accessibilityservice.AccessibilityService
import android.content.Intent
import android.view.accessibility.AccessibilityEvent
import com.aegisbet.ui.BlockingOverlayActivity

/**
 * Android 12+ Foreground Application Interceptor.
 * Listens for TYPE_WINDOW_STATE_CHANGED events.
 * When a prohibited sports betting or casino app package gains focus,
 * immediately opens the BlockingOverlayActivity.
 */
class GamblingDetectionService : AccessibilityService() {

    private val blockedPackages = hashSetOf(
        "com.draftkings.sportsbook",
        "com.fanduel.sportsbook",
        "com.bwin.mgm",
        "com.bet365.mobile",
        "com.stake.crypto.casino",
        "com.pyrsoftware.pokerstars",
        "com.eighteighteight.casino",
        "com.williamhill.us",
        "org.xbet.client",
        "lv.bovada.mobile",
        "com.roobet.app",
        "com.rollbit.mobile",
        "com.betfair.exchange",
        "com.jackpotcity.slots",
        "com.unibet.sportsbook"
    )

    override fun onAccessibilityEvent(event: AccessibilityEvent?) {
        if (event?.eventType == AccessibilityEvent.TYPE_WINDOW_STATE_CHANGED) {
            val packageName = event.packageName?.toString() ?: return

            if (blockedPackages.contains(packageName)) {
                // Intercept immediately: Bring Red 🛑 ACCESS BLOCKED screen to foreground
                val intent = Intent(this, BlockingOverlayActivity::class.java).apply {
                    addFlags(Intent.FLAG_ACTIVITY_NEW_TASK or Intent.FLAG_ACTIVITY_CLEAR_TOP)
                    putExtra("BLOCKED_PACKAGE", packageName)
                }
                startActivity(intent)
            }
        }
    }

    override fun onInterrupt() {
        // Accessibility interrupted
    }
}
