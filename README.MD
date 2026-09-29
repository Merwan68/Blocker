# AegisBet — Private Android Gambling Blocker Deployment Guide

This guide explains step-by-step how to build, sign, and install **AegisBet** privately on your target Android 12+ devices without publishing it to the public Google Play Store.

---

## 3 Ways to Publish & Install Privately

| Method | Cost | Difficulty | Best For |
| :--- | :--- | :--- | :--- |
| **Method 1: Direct Standalone APK (Recommended)** | **100% Free** | Beginner | Direct installation on your phone, family members, or specific devices via USB, Telegram, or Google Drive link. |
| **Method 2: Firebase App Distribution** | **100% Free** | Intermediate | Private over-the-air distribution via email invitations with automatic updates, managed by Google Firebase. |
| **Method 3: Google Play Closed Internal Testing** | $25 one-time fee | Advanced | Distributing via Google Play link accessible only to whitelisted Gmail accounts (invisible to the general public). |

---

## Method 1: Build & Sideload Standalone APK (Step-by-Step)

### Prerequisites
Make sure you have:
1. **Java JDK 17 or 21** installed (`java -version`).
2. **Android Studio** (or Android SDK Command-line Tools).

---

### Step 1: Generate Your Private Signing Key
A digital signing key authenticates your APK so you can update it in the future on your devices without reinstalling.

Open your computer's terminal and run:

```bash
keytool -genkey -v -keystore my-private-release-key.jks \
  -keyalg RSA -keysize 2048 -validity 10000 \
  -alias aegisbet-key
```

You will be prompted to:
- Enter a password (e.g., `AegisBetSecret2026`). **Remember this password!**
- Answer basic questions (name, organization; you can enter anything or press Enter).
- Confirm with `yes`.

This creates a file named `my-private-release-key.jks`. Move it into `android/app/`:
```bash
mv my-private-release-key.jks android/app/
```

---

### Step 2: Configure Signing in `android/app/build.gradle.kts`
Open `android/app/build.gradle.kts` and add your signing config:

```kotlin
android {
    ...
    signingConfigs {
        create("release") {
            storeFile = file("my-private-release-key.jks")
            storePassword = "AegisBetSecret2026"
            keyAlias = "aegisbet-key"
            keyPassword = "AegisBetSecret2026"
        }
    }

    buildTypes {
        release {
            isMinifyEnabled = true
            isShrinkResources = true
            signingConfig = signingConfigs.getByName("release")
            proguardFiles(
                getDefaultProguardFile("proguard-android-optimize.txt"),
                "proguard-rules.pro"
            )
        }
    }
}
```

---

### Step 3: Compile the Private Release APK
In your terminal, navigate to the `android/` directory and execute:

```bash
cd android
./gradlew assembleRelease
```
*(On Windows Command Prompt, use `gradlew.bat assembleRelease`)*

Once compilation finishes, your private APK is ready at:
```
android/app/build/outputs/apk/release/app-release.apk
```

---

### Step 4: Distribute Privately to Your Phone
You can send `app-release.apk` to any device using any of these private channels:
1. **Google Drive / Dropbox / OneDrive**: Upload the `.apk` and create a private link shared only with yourself.
2. **Telegram / WhatsApp**: Send the `.apk` file to "Saved Messages" on Telegram and download it on the phone.
3. **USB Cable (Fastest)**: Connect the phone to your computer via USB and run:
   ```bash
   adb install -r app/build/outputs/apk/release/app-release.apk
   ```

---

### Step 5: Install on the Target Android Phone
1. Open the file on the Android device (via Files / Downloads).
2. When prompted: **"For your security, your phone is not allowed to install unknown apps from this source"**:
   - Tap **Settings**.
   - Toggle **Allow from this source** to **ON**.
   - Tap **Back** and tap **Install**.
3. If Google Play Protect shows a popup: **"Unrecognized Developer"**:
   - Tap **More Details**.
   - Tap **Install Anyway**.
   *(This warning appears because the app was signed with your private key rather than through Google's public store).*

---

### Step 6: Initial Activation on the Target Phone
Once installed, open **AegisBet** on the phone:
1. Tap **Enable Protection**.
2. Accept the Android system VPN dialog: **"AegisBet wants to set up a VPN connection"** &rarr; Tap **OK**.
3. When prompted for notification permissions (Android 13+), tap **Allow**.

---

### Step 7: Essential Settings for Longevity (Tecno, Infinix, Samsung, Xiaomi)
To ensure the Android system doesn't close AegisBet when memory is low:
1. **Unrestricted Battery**:
   - Go to: **Settings &rarr; Apps &rarr; AegisBet &rarr; Battery**.
   - Select **"Unrestricted"** (or turn off "Battery Optimization").
2. **Always-On VPN (Highest Protection)**:
   - Go to: **Settings &rarr; Network & internet &rarr; VPN**.
   - Tap the **Gear** icon next to AegisBet.
   - Turn ON **"Always-on VPN"**.

---

## Method 2: Firebase App Distribution (Free Over-The-Air Updates)

If you manage multiple devices and want automatic update notifications without USB cables:

1. Go to [Firebase Console](https://console.firebase.google.com/) (free with any Google account).
2. Click **Create Project** (e.g. `AegisBet-Private`).
3. Click **Add App** &rarr; Select **Android**.
   - Package name: `com.aegisbet.app`
4. In the left menu, navigate to **Release & Monitor &rarr; App Distribution**.
5. Drag and drop your compiled `app-release.apk`.
6. Add the email addresses of the people/devices you want to install it on.
7. The recipients will receive a private email with an install button. Whenever you build a new update, drop the new APK into Firebase and every device gets an update notification automatically!
