// android/app/build.gradle.kts
// AegisBet - Production Support for Android 12, 12L, 13, 14, 15, and 16 (API 31-36)
plugins {
    id("com.android.application")
    id("kotlin-android")
}

android {
    namespace = "com.aegisbet.app"
    compileSdk = 35 // Android 15 / 16 Preview

    defaultConfig {
        applicationId = "com.aegisbet.app"
        minSdk = 31     // Android 12 (API 31) base requirement
        targetSdk = 35  // Targets latest modern Android OS specifications
        versionCode = 2
        versionName = "2.1.0-all-android-12-plus"
        testInstrumentationRunner = "androidx.test.runner.AndroidJUnitRunner"

        // 16 KB page-size support required on modern Android 15+ devices
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
            isDebuggable = true
        }
    }

    compileOptions {
        sourceCompatibility = JavaVersion.VERSION_17
        targetCompatibility = JavaVersion.VERSION_17
    }

    kotlinOptions {
        jvmTarget = "17"
        freeCompilerArgs += listOf(
            "-opt-in=kotlinx.coroutines.ExperimentalCoroutinesApi"
        )
    }

    packaging {
        resources {
            excludes += "/META-INF/{AL2.0,LGPL2.1}"
        }
        // Enables 16 KB page alignment for native libraries on Android 15+
        jniLibs {
            useLegacyPackaging = false
        }
    }
}

dependencies {
    implementation("androidx.core:core-ktx:1.13.1")
    implementation("androidx.appcompat:appcompat:1.7.0")
    implementation("com.google.android.material:material:1.12.0")
    implementation("androidx.work:work-runtime-ktx:2.9.1")
    implementation("org.jetbrains.kotlinx:kotlinx-coroutines-android:1.8.1")
    implementation("androidx.activity:activity-ktx:1.9.2")
}
