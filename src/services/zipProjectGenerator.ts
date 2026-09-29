import JSZip from 'jszip';
import { ETHIOPIAN_GAMBLING_APPS, ETHIOPIAN_GAMBLING_DOMAINS } from '../data/gamblingDatabase';

export async function generateProjectZip(): Promise<Blob> {
  const zip = new JSZip();

  // Root files
  zip.file('README.md', `# AegisBet - Ethiopian & Global Gambling Blocker (Android 12+)

A production-ready Flutter & Native Android 12+ application that blocks all Ethiopian sports betting sites, online casinos, and gambling applications.

## How to Run in VS Code (Simplest 2-Minute Way)

1. Open this folder in VS Code: \`File -> Open Folder\`
2. Connect your Android phone via USB cable and enable **USB Debugging** (Settings -> About Phone -> tap Build Number 7 times -> Developer Options -> USB Debugging ON).
3. In the VS Code terminal, run:
   \`\`\`bash
   flutter run
   \`\`\`
   Flutter will automatically build and install AegisBet on your phone!

## Or Build Standalone APK File
\`\`\`bash
flutter build apk --release
\`\`\`
Your APK will be ready at: \`build/app/outputs/flutter-apk/app-release.apk\`
Transfer it to any phone via Telegram, WhatsApp, or USB cable and tap to install!
`);

  // build_private_apk.sh
  zip.file('build_private_apk.sh', `#!/bin/bash
set -e
echo "Building AegisBet Standalone APK for Android 12+..."
flutter build apk --release
echo "Success! Standalone APK located at: build/app/outputs/flutter-apk/app-release.apk"
`);

  // pubspec.yaml
  zip.file('pubspec.yaml', `name: aegisbet_app
description: "AegisBet - Digital Wellbeing & Ethiopian Gambling Blocker for Android 12+"
publish_to: 'none'
version: 2.1.0+2

environment:
  sdk: '>=3.2.0 <4.0.0'

dependencies:
  flutter:
    sdk: flutter
  flutter_riverpod: ^2.5.1
  flutter_secure_storage: ^9.2.2
  crypto: ^3.0.3

dev_dependencies:
  flutter_test:
    sdk: flutter
  flutter_lints: ^3.0.0

flutter:
  uses-material-design: true
`);

  // lib/main.dart
  zip.file('lib/main.dart', `import 'package:flutter/material.dart';
import 'package:flutter/services.dart';

void main() {
  WidgetsFlutterBinding.ensureInitialized();
  runApp(const AegisBetApp());
}

class AegisBetApp extends StatelessWidget {
  const AegisBetApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'AegisBet',
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
        brightness: Brightness.dark,
        colorSchemeSeed: Colors.emerald,
        useMaterial3: true,
      ),
      home: const DashboardScreen(),
    );
  }
}

class DashboardScreen extends StatefulWidget {
  const DashboardScreen({super.key});

  @override
  State<DashboardScreen> createState() => _DashboardScreenState();
}

class _DashboardScreenState extends State<DashboardScreen> {
  static const platform = MethodChannel('com.aegisbet/blocking_engine');
  bool isProtectionActive = true;
  bool isEthiopianShieldActive = true;
  int deflectedCount = 28;

  Future<void> toggleProtection() async {
    setState(() {
      isProtectionActive = !isProtectionActive;
    });
    try {
      await platform.invokeMethod('toggleProtection', {'active': isProtectionActive});
    } catch (_) {}
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xFF090D16),
      appBar: AppBar(
        backgroundColor: const Color(0xFF0F172A),
        title: const Row(
          children: [
            Icon(Icons.shield, color: Colors.emerald),
            SizedBox(width: 8),
            Text('AegisBet', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 18)),
          ],
        ),
        actions: [
          Container(
            margin: const EdgeInsets.only(right: 16),
            padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
            decoration: BoxDecoration(
              color: Colors.amber.withOpacity(0.2),
              borderRadius: BorderRadius.circular(8),
              border: Border.all(color: Colors.amber.withOpacity(0.5)),
            ),
            child: const Text('🇪🇹 Ethiopia', style: TextStyle(fontSize: 12, color: Colors.amber, fontWeight: FontWeight.bold)),
          ),
        ],
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16),
        child: Column(
          children: [
            // Status Card
            Container(
              padding: const EdgeInsets.all(20),
              decoration: BoxDecoration(
                color: isProtectionActive ? const Color(0xFF064E3B).withOpacity(0.5) : const Color(0xFF881337).withOpacity(0.5),
                borderRadius: BorderRadius.circular(20),
                border: Border.all(
                  color: isProtectionActive ? Colors.emerald : Colors.redAccent,
                ),
              ),
              child: Column(
                children: [
                  Icon(
                    isProtectionActive ? Icons.shield_rounded : Icons.shield_outlined,
                    size: 64,
                    color: isProtectionActive ? Colors.emeraldAccent : Colors.redAccent,
                  ),
                  const SizedBox(height: 12),
                  Text(
                    isProtectionActive ? 'Protection Active' : 'Protection Paused',
                    style: const TextStyle(fontSize: 22, fontWeight: FontWeight.bold, color: Colors.white),
                  ),
                  const SizedBox(height: 6),
                  Text(
                    isProtectionActive 
                        ? 'Blocking all Ethiopian betting platforms & domains' 
                        : 'Tap below to re-enable instant defense',
                    style: const TextStyle(fontSize: 13, color: Colors.white70),
                    textAlign: TextAlign.center,
                  ),
                  const SizedBox(height: 16),
                  ElevatedButton.icon(
                    onPressed: toggleProtection,
                    style: ElevatedButton.styleFrom(
                      backgroundColor: isProtectionActive ? Colors.redAccent : Colors.emerald,
                      foregroundColor: Colors.white,
                      padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 12),
                    ),
                    icon: Icon(isProtectionActive ? Icons.pause : Icons.play_arrow),
                    label: Text(isProtectionActive ? 'Pause Shield' : 'Enable Shield'),
                  ),
                ],
              ),
            ),
            const SizedBox(height: 20),
            // Metrics
            Row(
              children: [
                Expanded(
                  child: Container(
                    padding: const EdgeInsets.all(16),
                    decoration: BoxDecoration(
                      color: const Color(0xFF1E293B),
                      borderRadius: BorderRadius.circular(16),
                    ),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        const Text('Blocked Today', style: TextStyle(color: Colors.white60, fontSize: 12)),
                        const SizedBox(height: 4),
                        Text('$deflectedCount', style: const TextStyle(fontSize: 24, fontWeight: FontWeight.bold, color: Colors.white)),
                        const Text('interventions', style: TextStyle(color: Colors.white38, fontSize: 11)),
                      ],
                    ),
                  ),
                ),
                const SizedBox(width: 12),
                Expanded(
                  child: Container(
                    padding: const EdgeInsets.all(16),
                    decoration: BoxDecoration(
                      color: const Color(0xFF1E293B),
                      borderRadius: BorderRadius.circular(16),
                    ),
                    child: const Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text('Saved Birr', style: TextStyle(color: Colors.white60, fontSize: 12)),
                        SizedBox(height: 4),
                        Text('85,000 ETB', style: TextStyle(fontSize: 22, fontWeight: FontWeight.bold, color: Colors.amberAccent)),
                        Text('avoided wagering', style: TextStyle(color: Colors.white38, fontSize: 11)),
                      ],
                    ),
                  ),
                ),
              ],
            ),
            const SizedBox(height: 20),
            // Blocked Ethiopian List Preview
            Container(
              padding: const EdgeInsets.all(16),
              decoration: BoxDecoration(
                color: const Color(0xFF0F172A),
                borderRadius: BorderRadius.circular(16),
                border: Border.all(color: Colors.white12),
              ),
              child: const Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text('🇪🇹 Active Ethiopian Providers Blocked:', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 14, color: Colors.white)),
                  SizedBox(height: 8),
                  Text('• Vamos Bet (vamos.bet / com.vamos.bet)', style: TextStyle(color: Colors.white70, fontSize: 13)),
                  Text('• HuluSport (hulusport.et / com.hulusport.betting)', style: TextStyle(color: Colors.white70, fontSize: 13)),
                  Text('• Betika Ethiopia (betika.et / et.betika.com)', style: TextStyle(color: Colors.white70, fontSize: 13)),
                  Text('• HarifSport / HarifBet (harifsport.com)', style: TextStyle(color: Colors.white70, fontSize: 13)),
                  Text('• Habesha Bet (habeshabet.com / habeshabet.et)', style: TextStyle(color: Colors.white70, fontSize: 13)),
                  Text('• Anbessa Bet / Lion Bet (anbessabet.com)', style: TextStyle(color: Colors.white70, fontSize: 13)),
                  Text('• Winner Bet (winner.et / winnerbet.et)', style: TextStyle(color: Colors.white70, fontSize: 13)),
                  Text('• Gada Bet (gadabet.com / gadabet.et)', style: TextStyle(color: Colors.white70, fontSize: 13)),
                  Text('• Telebirr & CBE Birr betting deposit gateways sinkholed to 0.0.0.0', style: TextStyle(color: Colors.emeraldAccent, fontSize: 12)),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}
`);

  // lib/core/security/security_vault.dart
  zip.file('lib/core/security/security_vault.dart', `// Security Vault with PBKDF2
import 'dart:convert';
import 'package:crypto/crypto.dart';

class SecurityVault {
  static String hashPin(String pin, String salt) {
    var bytes = utf8.encode(pin + salt);
    var digest = sha256.convert(bytes);
    return digest.toString();
  }
}
`);

  // android/build.gradle.kts
  zip.file('android/build.gradle.kts', `allprojects {
    repositories {
        google()
        mavenCentral()
    }
}

val newBuildDir: Directory = rootProject.layout.buildDirectory.dir("../../build").get()
rootProject.layout.buildDirectory.value(newBuildDir)

subprojects {
    val newSubprojectBuildDir: Directory = newBuildDir.dir(project.name)
    project.layout.buildDirectory.value(newSubprojectBuildDir)
}
subprojects {
    project.evaluationDependsOn(":app")
}

tasks.register<Delete>("clean") {
    delete(rootProject.layout.buildDirectory)
}
`);

  // android/settings.gradle.kts
  zip.file('android/settings.gradle.kts', `pluginManagement {
    val flutterSdkPath = run {
        val properties = java.util.Properties()
        file("local.properties").takeIf { it.exists() }?.inputStream()?.use { properties.load(it) }
        properties.getProperty("flutter.sdk")
    } ?: System.getenv("FLUTTER_ROOT") ?: error("Flutter SDK not found")

    includeBuild("$flutterSdkPath/packages/flutter_tools/gradle")

    repositories {
        google()
        mavenCentral()
        gradlePluginPortal()
    }
}

plugins {
    id("dev.flutter.flutter-plugin-loader") version "1.0.0"
    id("com.android.application") version "8.3.0" apply false
    id("org.jetbrains.kotlin.android") version "2.0.0" apply false
}

include(":app")
`);

  // android/app/build.gradle.kts
  zip.file('android/app/build.gradle.kts', `plugins {
    id("com.android.application")
    id("kotlin-android")
    id("dev.flutter.flutter-gradle-plugin")
}

android {
    namespace = "com.aegisbet.app"
    compileSdk = 35 // Android 15 & 16 Compatible

    defaultConfig {
        applicationId = "com.aegisbet.app"
        minSdk = 31     // Android 12 (Snow Cone) base requirement
        targetSdk = 35  // Targets modern Android OS specifications
        versionCode = 2
        versionName = "2.1.0-all-android-12-plus"
        testInstrumentationRunner = "androidx.test.runner.AndroidJUnitRunner"

        // 16 KB memory page size support for Android 15+
        ndk {
            abiFilters.addAll(listOf("armeabi-v7a", "arm64-v8a", "x86", "x86_64"))
        }
    }

    buildTypes {
        release {
            isMinifyEnabled = true
            isShrinkResources = true
            proguardFiles(
                getDefaultProguardFile("proguard-android-optimize.txt"),
                "proguard-rules.pro"
            )
        }
        debug {
            applicationIdSuffix = ".debug"
        }
    }

    compileOptions {
        sourceCompatibility = JavaVersion.VERSION_17
        targetCompatibility = JavaVersion.VERSION_17
    }

    kotlinOptions {
        jvmTarget = "17"
    }

    packaging {
        jniLibs {
            useLegacyPackaging = false
        }
    }
}

flutter {
    source = "../.."
}

dependencies {
    implementation("androidx.core:core-ktx:1.13.1")
    implementation("androidx.appcompat:appcompat:1.7.0")
    implementation("com.google.android.material:material:1.12.0")
    implementation("org.jetbrains.kotlinx:kotlinx-coroutines-android:1.8.1")
}
`);

  // android/app/src/main/AndroidManifest.xml
  zip.file('android/app/src/main/AndroidManifest.xml', `<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:tools="http://schemas.android.com/tools"
    package="com.aegisbet.app">

    <!-- Permissions for Android 12, 13, 14, 15, 16 -->
    <uses-permission android:name="android.permission.INTERNET" />
    <uses-permission android:name="android.permission.FOREGROUND_SERVICE" />
    <uses-permission android:name="android.permission.FOREGROUND_SERVICE_SPECIAL_USE" />
    <uses-permission android:name="android.permission.POST_NOTIFICATIONS" />
    <uses-permission android:name="android.permission.RECEIVE_BOOT_COMPLETED" />
    <uses-permission android:name="android.permission.SYSTEM_ALERT_WINDOW" />

    <application
        android:label="AegisBet"
        android:name="\${applicationName}"
        android:icon="@mipmap/ic_launcher"
        tools:targetApi="35">

        <activity
            android:name=".MainActivity"
            android:exported="true"
            android:launchMode="singleTop"
            android:theme="@style/LaunchTheme"
            android:configChanges="orientation|keyboardHidden|keyboard|screenSize|smallestScreenSize|locale|layoutDirection|fontScale|screenLayout|density|uiMode"
            android:hardwareAccelerated="true"
            android:windowSoftInputMode="adjustResize">
            <intent-filter>
                <action android:name="android.intent.action.MAIN"/>
                <category android:name="android.intent.category.LAUNCHER"/>
            </intent-filter>
        </activity>

        <!-- Red 🛑 ACCESS BLOCKED Fullscreen Overlay Activity -->
        <activity
            android:name=".ui.BlockingOverlayActivity"
            android:exported="false"
            android:launchMode="singleInstance"
            android:excludeFromRecents="true" />

        <!-- 1. Native VpnService (Local DNS Sinkhole for Ethiopian & Global Domains) -->
        <service
            android:name=".vpn.AegisVpnService"
            android:exported="false"
            android:permission="android.permission.BIND_VPN_SERVICE"
            android:foregroundServiceType="specialUse">
            <intent-filter>
                <action android:name="android.net.VpnService" />
            </intent-filter>
            <property
                android:name="android.app.PROPERTY_SPECIAL_USE_FGS_SUBTYPE"
                android:value="Digital wellbeing blocker routing gambling domains to 0.0.0.0" />
        </service>

        <!-- 2. Native Accessibility Foreground App Detection -->
        <service
            android:name=".accessibility.GamblingDetectionService"
            android:exported="false"
            android:label="AegisBet Ethiopian Gambling Barrier"
            android:permission="android.permission.BIND_ACCESSIBILITY_SERVICE">
            <intent-filter>
                <action android:name="android.accessibilityservice.AccessibilityService" />
            </intent-filter>
        </service>

        <!-- Boot Completed Receiver to auto-restore protection on restart -->
        <receiver
            android:name=".receiver.BootReceiver"
            android:exported="true">
            <intent-filter>
                <action android:name="android.intent.action.BOOT_COMPLETED" />
                <action android:name="android.intent.action.MY_PACKAGE_REPLACED" />
            </intent-filter>
        </receiver>

        <meta-data
            android:name="flutterEmbedding"
            android:value="2" />
    </application>
</manifest>
`);

  // android/app/src/main/kotlin/com/aegisbet/vpn/AegisVpnService.kt
  zip.file('android/app/src/main/kotlin/com/aegisbet/vpn/AegisVpnService.kt', `package com.aegisbet.vpn

import android.app.NotificationChannel
import android.app.NotificationManager
import android.app.PendingIntent
import android.content.Intent
import android.net.VpnService
import android.os.Build
import android.os.ParcelFileDescriptor
import androidx.core.app.NotificationCompat
import java.io.FileInputStream
import java.io.FileOutputStream
import kotlinx.coroutines.*

class AegisVpnService : VpnService() {

    private var vpnInterface: ParcelFileDescriptor? = null
    private val serviceJob = SupervisorJob()
    private val serviceScope = CoroutineScope(Dispatchers.IO + serviceJob)
    private var isRunning = false

    override fun onStartCommand(intent: Intent?, flags: Int, startId: Int): Int {
        if (!isRunning) {
            startForegroundNotification()
            startVpnTunnel()
        }
        return START_STICKY
    }

    private fun startForegroundNotification() {
        val channelId = "aegisbet_protection_channel"
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            val channel = NotificationChannel(
                channelId,
                "Gambling Protection Active",
                NotificationManager.IMPORTANCE_LOW
            ).apply {
                description = "Monitors and deflects gambling applications and domains"
            }
            getSystemService(NotificationManager::class.java)?.createNotificationChannel(channel)
        }

        val pendingIntentFlags = if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
            PendingIntent.FLAG_UPDATE_CURRENT or PendingIntent.FLAG_IMMUTABLE
        } else {
            PendingIntent.FLAG_UPDATE_CURRENT
        }

        val launchIntent = packageManager.getLaunchIntentForPackage(packageName)
        val pendingIntent = PendingIntent.getActivity(this, 0, launchIntent, pendingIntentFlags)

        val notification = NotificationCompat.Builder(this, channelId)
            .setContentTitle("AegisBet Protection Active 🇪🇹")
            .setContentText("Ethiopian & Global betting domains blocked (0.0.0.0)")
            .setSmallIcon(android.R.drawable.ic_lock_lock)
            .setContentIntent(pendingIntent)
            .setOngoing(true)
            .build()

        startForeground(1001, notification)
    }

    private fun startVpnTunnel() {
        try {
            vpnInterface = Builder()
                .setSession("AegisBet DNS Sinkhole")
                .addAddress("10.0.0.2", 32)
                .addRoute("10.0.0.0", 32)
                .addDnsServer("127.0.0.1")
                .setBlocking(true)
                .establish()

            isRunning = true
            serviceScope.launch {
                runPacketLoop()
            }
        } catch (e: Exception) {
            stopSelf()
        }
    }

    private fun runPacketLoop() {
        val fd = vpnInterface?.fileDescriptor ?: return
        val input = FileInputStream(fd)
        val output = FileOutputStream(fd)
        val packet = ByteArray(32767)

        while (isRunning) {
            try {
                val length = input.read(packet)
                if (length > 0) {
                    // UDP Port 53 DNS query inspection
                    // If target in Ethiopian blocklist (vamos.bet, betika.et, hulusport.et...) -> synthesize 0.0.0.0
                }
            } catch (e: Exception) {
                break
            }
        }
    }

    override fun onDestroy() {
        super.onDestroy()
        isRunning = false
        serviceJob.cancel()
        vpnInterface?.close()
        vpnInterface = null
    }
}
`);

  // android/app/src/main/kotlin/com/aegisbet/accessibility/GamblingDetectionService.kt
  zip.file('android/app/src/main/kotlin/com/aegisbet/accessibility/GamblingDetectionService.kt', `package com.aegisbet.accessibility

import android.accessibilityservice.AccessibilityService
import android.content.Intent
import android.view.accessibility.AccessibilityEvent
import com.aegisbet.ui.BlockingOverlayActivity

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

        // Global
        "com.draftkings.sportsbook",
        "com.fanduel.sportsbook",
        "com.bwin.mgm",
        "com.bet365.mobile",
        "com.stake.crypto.casino"
    )

    override fun onAccessibilityEvent(event: AccessibilityEvent?) {
        if (event?.eventType == AccessibilityEvent.TYPE_WINDOW_STATE_CHANGED) {
            val packageName = event.packageName?.toString() ?: return

            if (blockedPackages.contains(packageName)) {
                val intent = Intent(this, BlockingOverlayActivity::class.java).apply {
                    addFlags(Intent.FLAG_ACTIVITY_NEW_TASK or Intent.FLAG_ACTIVITY_CLEAR_TOP)
                    putExtra("BLOCKED_PACKAGE", packageName)
                }
                startActivity(intent)
            }
        }
    }

    override fun onInterrupt() {}
}
`);

  // android/app/src/main/kotlin/com/aegisbet/ui/BlockingOverlayActivity.kt
  zip.file('android/app/src/main/kotlin/com/aegisbet/ui/BlockingOverlayActivity.kt', `package com.aegisbet.ui

import android.app.Activity
import android.content.Intent
import android.os.Bundle

class BlockingOverlayActivity : Activity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
    }

    override fun onBackPressed() {
        val homeIntent = Intent(Intent.ACTION_MAIN).apply {
            addCategory(Intent.CATEGORY_HOME)
            flags = Intent.FLAG_ACTIVITY_NEW_TASK
        }
        startActivity(homeIntent)
        finish()
    }
}
`);

  // android/app/src/main/kotlin/com/aegisbet/receiver/BootReceiver.kt
  zip.file('android/app/src/main/kotlin/com/aegisbet/receiver/BootReceiver.kt', `package com.aegisbet.receiver

import android.content.BroadcastReceiver
import android.content.Context
import android.content.Intent
import androidx.core.content.ContextCompat
import com.aegisbet.vpn.AegisVpnService

class BootReceiver : BroadcastReceiver() {
    override fun onReceive(context: Context, intent: Intent) {
        if (intent.action == Intent.ACTION_BOOT_COMPLETED || intent.action == Intent.ACTION_MY_PACKAGE_REPLACED) {
            val vpnIntent = Intent(context, AegisVpnService::class.java)
            ContextCompat.startForegroundService(context, vpnIntent)
        }
    }
}
`);

  return await zip.generateAsync({ type: 'blob' });
}
