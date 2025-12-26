# Build Guide for Android APK

Since your project uses **Ionic** and **Capacitor** with **Vite**, the build process involves compiling your web code and then syncing it to the native Android project.

## 1. Build Web Assets
First, compile your React/Vite application into the `dist/` folder.
```bash
npm run build
```

## 2. Sync Configuration
Copy the built web assets and any new plugin configuration to the native `android/` directory.
```bash
npx cap sync android
```
*Note: You must run this every time you change your React code or install a new npm package.*

## 3. Build the APK
You can build the APK using Android Studio.

### Option A: Open Android Studio (Recommended)
This opens the native project in Android Studio, where you can run the app on an emulator/device or build a signed APK.
```bash
npx cap open android
```
- **To Run**: Click the "Run" (Play) button.
- **To Build APK**: Go to **Build > Build Bundle(s) / APK(s) > Build APK(s)**.

### Option B: Command Line
If you have the Android SDK tools configured in your path, you can run:
```bash
npx cap build android
```

## Why is the `android/` folder so big?
The `android/` folder is a complete native Android Studio project. It contains:
- **Gradle Build System**: Tools to compile Java/Kotlin code.
- **Android Support Libraries**: Core Android functionality.
- **Native Plugin Code**: The native side of plugins like Camera, Geolocation, etc.

This folder is **required** to turn your web app into a mobile app. It is normal for it to be several hundred megabytes.
