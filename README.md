# Nusantara Journey

An AI-powered Indonesian cultural heritage tourism and UMKM marketplace mobile app. Discover Indonesia's rich history, interact with an intelligent cultural guide, and support local artisan economies — all from your phone.

<p align="center">
  <img src="assets/images/icon.png" alt="Nusantara Journey" width="120" />
</p>

## The Problem

Indonesia faces a **heritage tourism revenue gap** compared to Thailand and Vietnam. Despite tourists staying longer in Indonesia (~10.7 nights vs ~8–10 in regional peers), daily spend is ~40% lower (~$118/day vs ~$160–200). Tourism contributes only 5.5% to Indonesia's GDP vs 12%+ in Thailand and 8.8% in Vietnam. The root causes:

- **Discovery & payment gap** — Indonesia has 1,003 man-made attractions, but only a fraction are "market-ready." Heritage sites, UMKM crafts, and guided experiences remain invisible or difficult to pay for digitally.
- **UMKM digital exclusion** — ~70% of artisan MSMEs operate offline only; only 20% of rural craft enterprises have e-commerce presence. Yet MSMEs that adopt digital tools see ~40% revenue increase.
- **Bali concentration** — Over 70% of international arrivals concentrate in Bali, while provinces like Jambi (Muara Jambi) and East Java (Trowulan) remain under-visited despite world-class heritage.
- **Mobile-app gap** — Indonesia has 80%+ internet penetration and 33% monthly AI adoption, yet less than 1% of top applications are dedicated to national heritage or cultural education.

Nusantara Journey addresses these by integrating GPS discovery, AI-guided heritage tours, a direct UMKM marketplace, and gamified quests that incentivize exploration beyond Bali.

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

