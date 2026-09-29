package com.aegisbet.accessibility

import android.accessibilityservice.AccessibilityService
import android.content.Intent
import android.view.accessibility.AccessibilityEvent
import com.aegisbet.ui.BlockingOverlayActivity

/**
 * Android 12+ Foreground Application Interceptor.
 * Listens for TYPE_WINDOW_STATE_CHANGED events.
 * Intercepts all Ethiopian and international sports betting, casino, and lottery apps.
 */
class GamblingDetectionService : AccessibilityService() {

    private val blockedPackages = hashSetOf(
        // Ethiopian Sports Betting & Gambling Apps
        "com.vamos.bet",
        "com.vamosbet.app",
        "com.betika.app.et",
        "com.betika.app",
        "com.harifsport.mobile",
        "com.harifbet.app",
        "com.habeshabet.app",
        "com.hulusport.betting",
        "com.hulusport.app",
        "com.anbessabet.app",
        "com.winnerbet.et",
        "com.gadabet.mobile",
        "com.ashewa.bet",
        "com.ethiobet.app",
        "com.bravobet.mobile",
        "com.flashbet.et",
        "com.zemenbet.app",
        "com.bet251.mobile",
        "com.bunnabet.app",
        "com.destabet.app",
        "com.betking.ethiopia",
        "com.worldbet.et",
        "com.galaxybet.et",
        "org.xbet.client.et",
        "com.melbet.client.et",

        // International Sportsbooks & Crypto Casinos
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
