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
   npm run expo:dev
   ```
   The frontend runs on port 8081.

3. **Scanning the QR Code**:
   After starting the Expo server, a QR code will appear in your terminal. Scan this code using the Expo Go app (Android) or the Camera app (iOS) to load the app on your device.

### Environment Variables
Ensure you have a `.env` file or set environment variables in your terminal:
- `DATABASE_URL`: Your PostgreSQL connection string.

---

## 2. App Build Process (EAS Build)

We use Expo Application Services (EAS) to build standalone binaries.

### Steps
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

### Local APK vs Store
- **Local APK**: Useful for testing on Android devices without publishing. Use `eas build --platform android --profile preview` to get an installable APK.
- **Store**: Use the default production profile to build for store submission.

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

## 4. Replit Cleanup

- **.replit**: This file is required for Replit workflows. If you are running the project entirely locally or on another host, it is safe to remove.
- **replit.md**: This is a memory file for the Replit Agent. It is safe to delete if you are not using the Replit Agent.

---

## 5. Agent Folder

The `.replit_agent` folder is Replit's internal configuration folder for the AI agent. It is empty by design. Users do not need to add anything to this folder.

---

## 6. Additional Configuration

To enable full functionality, set these additional environment variables:
- `OPENAI_API_KEY`: Required for the "Arjuna" AI Guide chat functionality.
- `GOOGLE_CLIENT_ID`: Required for Google Authentication.
