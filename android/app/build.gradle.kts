// android/app/build.gradle.kts
// AegisBet - Production Android 12+ (minSdk 31, targetSdk 35)
plugins {
    id("com.android.application")
    id("kotlin-android")
}

android {
    namespace = "com.aegisbet.app"
    compileSdk = 35 // Android 15 ready

    defaultConfig {
        applicationId = "com.aegisbet.app"
        minSdk = 31     // Android 12 Snow Cone mandatory minimum
        targetSdk = 35  // Latest Android 15 compatibility
        versionCode = 1
        versionName = "2.0.0"
        testInstrumentationRunner = "androidx.test.runner.AndroidJUnitRunner"
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
    }

    compileOptions {
        sourceCompatibility = JavaVersion.VERSION_17
        targetCompatibility = JavaVersion.VERSION_17
    }

    kotlinOptions {
        jvmTarget = "17"
    }
}

dependencies {
    implementation("androidx.core:core-ktx:1.13.1")
    implementation("androidx.appcompat:appcompat:1.7.0")
    implementation("com.google.android.material:material:1.12.0")
    implementation("androidx.work:work-runtime-ktx:2.9.1")
    implementation("org.jetbrains.kotlinx:kotlinx-coroutines-android:1.8.1")
}
