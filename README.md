# Nusantara Journey

An AI-powered Indonesian cultural heritage tourism and UMKM marketplace mobile app. Discover Indonesia's rich history, interact with an intelligent cultural guide, and support local artisan economies — all from your phone.

<p align="center">
  <img src="assets/images/icon.png" alt="Nusantara Journey" width="120" />
</p>

## Features

- **GPS-Aware Discovery** — Real-time location integration to discover historical kingdoms and nearby heritage sites.
- **AI Guide "Arjuna"** — An intelligent assistant powered by GPT-4o with deep knowledge of Indonesian history and culture.
- **UMKM Marketplace** — A curated marketplace featuring authentic Indonesian crafts like Batik, Keris, and Wayang puppets.
- **Interactive Map** — Explore the territories of ancient kingdoms and find modern points of interest.
- **Gamified Experience** — Earn XP, complete quests, and track your cultural journey through a profile dashboard.

## Tech Stack

| Layer | Technology |
|:---|:---|
| Frontend | Expo SDK 54, React Native, Expo Router, React Query |
| Backend | Node.js, Express, TypeScript |
| Database | PostgreSQL (Supabase) with Drizzle ORM |
| Auth | Firebase Auth with Google Sign-In |
| AI | OpenAI GPT-4o |
| Animations | React Native Reanimated |

## Getting Started

### Prerequisites

- Node.js 22+
- An Expo account ([expo.dev](https://expo.dev))
- A Supabase project (for PostgreSQL)
- Firebase project with Google Sign-In enabled

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment

Copy the example env file and fill in your values:

```bash
cp .env.example .env
```

| Variable | Description |
|:---|:---|
| `DATABASE_URL` | Supabase PostgreSQL connection string |
| `OPENAI_API_KEY` | OpenAI API key for Arjuna AI |
| `SESSION_SECRET` | Secret for session cookies |
| `EXPO_PUBLIC_DOMAIN` | API base URL (e.g. `localhost:5000`) |
| `FIREBASE_PROJECT_ID` | Firebase project ID (server-side) |
| `FIREBASE_CLIENT_EMAIL` | Firebase service account email (server-side) |
| `FIREBASE_PRIVATE_KEY` | Firebase service account private key (server-side) |
| `EXPO_PUBLIC_FIREBASE_*` | Firebase client config (from `google-services.json`) |
| `EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID` | Google OAuth Web Client ID |

### 3. Set Up Database

```bash
npm run db:push
```

### 4. Run the App

Start the backend server:

```bash
npm run server:dev
```

In a separate terminal, start Expo:

```bash
npm start
```

## Building for Android (APK)

This project uses [EAS Build](https://docs.expo.dev/build/introduction/) for producing installable APKs.

```bash
# Install EAS CLI (if not already installed)
npm install -g eas-cli

# Log in to your Expo account
eas login

# Build an APK using the preview profile
eas build -p android --profile preview
```

The `preview` profile in `eas.json` is configured to output an `.apk` file. Once the build completes, you'll receive a download link.

For a production AAB (for Google Play Store):

```bash
eas build -p android --profile production
```

## Database Schema

The application uses five main tables:

- **Users** — Authentication and profile data
- **Conversations** — Chat sessions with the AI guide
- **Messages** — Individual chat messages
- **Products** — UMKM product catalog
- **Cart Items** — Persistent shopping cart

## Testing

```bash
# Unit / smoke tests
npm test

# API contract check (requires backend running)
npm run test:api
```

## License

This project is licensed under the MIT License.
