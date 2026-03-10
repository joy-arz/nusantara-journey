# Setup Guide

This guide provides step-by-step instructions to set up and build the Nusantara Journey application.

## 1. Local Setup

### Prerequisites
- **Node.js**: version 22 or higher
- **npm**: included with Node.js
- **Expo Go**: installed on your physical iOS/Android device for testing

### Installation
1. Clone the repository.
2. Install dependencies:
   ```bash
   npm install
   ```

### Running the Application
To run the app locally, you need to start both the backend server and the Expo development server.

1. **Start the Backend Server**:
   ```bash
   npm run server:dev
   ```
   The backend runs on port 5000.

2. **Start the Expo Development Server**:
   ```bash
   npm start
   ```
   The frontend runs on port 8081.

3. **Scanning the QR Code**:
   After starting the Expo server, a QR code will appear in your terminal. Scan this code using the Expo Go app (Android) or the Camera app (iOS) to load the app on your device.

### Environment Variables
Ensure you have a `.env` file or set environment variables in your terminal:
- `DATABASE_URL`: Your Supabase PostgreSQL connection string.
- `OPENAI_API_KEY`: Required for the "Arjuna" AI Guide chat.
- `SESSION_SECRET`: Required in production; set a strong random string for session cookies.
- `EXPO_PUBLIC_DOMAIN`: Set to your backend host (e.g. `localhost:5000`) when the app runs against a custom API.
- `ALLOWED_ORIGINS`: Comma-separated list of allowed CORS origins (e.g. `http://localhost:8081`).

**Firebase (server-side)**:
- `FIREBASE_PROJECT_ID`, `FIREBASE_CLIENT_EMAIL`, `FIREBASE_PRIVATE_KEY`: From Firebase Console > Project Settings > Service Accounts > Generate New Private Key.

**Firebase (client-side)**:
- `EXPO_PUBLIC_FIREBASE_API_KEY`, `EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN`, `EXPO_PUBLIC_FIREBASE_PROJECT_ID`, `EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET`, `EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`, `EXPO_PUBLIC_FIREBASE_APP_ID`: From Firebase Console > Project Settings > General > Your Apps > Web App.

**Google OAuth**:
- `EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID`: From Google Cloud Console > APIs & Services > Credentials > OAuth 2.0 Client IDs (Web).
- `EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID`: OAuth client ID for iOS.
- `EXPO_PUBLIC_GOOGLE_ANDROID_CLIENT_ID`: OAuth client ID for Android (use SHA-1 from your signing keystore).

---

## 2. App Build Process (EAS Build)

We use Expo Application Services (EAS) to build standalone binaries. See [BUILD_AND_TEST.md](BUILD_AND_TEST.md) for the full step-by-step guide.

### Quick Steps
1. **Install EAS CLI**:
   ```bash
   npm install -g eas-cli
   ```
2. **Login to Expo**:
   ```bash
   eas login
   ```
3. **Configure the project**:
   ```bash
   eas build:configure
   ```
4. **Build for your platform**:
   - For Android (APK/AAB): `eas build --platform android`
   - For iOS: `eas build --platform ios`

### Bundle Identifiers
Bundle identifiers are configured in `app.json` under `ios.bundleIdentifier` and `android.package`. They uniquely identify your app on the App Store and Google Play Store.

---

## 3. Database Setup (Supabase)

Nusantara Journey uses PostgreSQL. We recommend Supabase for a managed database.

### Step-by-Step Setup
1. **Create a Project**: Go to [supabase.com](https://supabase.com), sign up, and create a new project.
2. **Get Connection String**:
   - Go to Project Settings -> Database.
   - Find the "Connection string" section.
   - Copy the URI (ensure you use the transaction pooler if available, or the direct connection).
3. **Set Environment Variable**:
   Set `DATABASE_URL` to the copied connection string (replace `[YOUR-PASSWORD]` with your actual password).
4. **Push Schema**:
   Run the following command to create the necessary tables:
   ```bash
   npm run db:push
   ```

### Tables Created
- `users`: Stores user profiles and authentication data.
- `conversations`: Stores AI chat sessions.
- `messages`: Stores individual messages within conversations.
- `products`: Catalog of UMKM products.
- `cart_items`: User shopping cart data.

---

## 4. Firebase & Google Sign-In Setup

Authentication uses **Firebase Auth** with Google as the sign-in provider. The Expo client obtains a Google ID token via `expo-auth-session`, exchanges it for a Firebase credential, then sends the Firebase ID token to the Express backend, which verifies it using `firebase-admin`.

### Step-by-Step

1. **Create a Firebase Project** at [console.firebase.google.com](https://console.firebase.google.com).
2. **Enable Google Sign-In**: Go to Authentication > Sign-in Method > Google and enable it.
3. **Register your apps**:
   - **Web app**: Add a web app to get the Firebase config values (apiKey, authDomain, etc.).
   - **Android app**: Add an Android app with package name `com.nusantarajourney` and your SHA-1 fingerprint.
   - **iOS app**: Add an iOS app with bundle ID `com.nusantarajourney`.
4. **Create a Service Account Key**: Go to Project Settings > Service Accounts > Generate New Private Key. Use the values for `FIREBASE_PROJECT_ID`, `FIREBASE_CLIENT_EMAIL`, and `FIREBASE_PRIVATE_KEY`.
5. **Create Google Cloud OAuth Credentials**: Go to [Google Cloud Console](https://console.cloud.google.com) > APIs & Services > Credentials > Create OAuth 2.0 Client IDs for Web, Android (with SHA-1), and iOS.
6. **Fill in your `.env`** with all the values from steps 3-5.

### SHA-1 Fingerprint (Android)

For the debug keystore:
```bash
keytool -keystore ~/.android/debug.keystore -list -v -storepass android
```

For a production keystore, use the same command with your release keystore path and password.

## 5. Additional Configuration

- `OPENAI_API_KEY`: Required for the "Arjuna" AI Guide chat functionality.
