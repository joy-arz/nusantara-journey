# Nusantara Journey

Nusantara Journey is an AI-powered Indonesian cultural heritage tourism and UMKM marketplace mobile app. Built with Expo React Native, it aims to revolutionize how tourists interact with Indonesia's rich history and support local creative economies.

![App Preview](assets/images/icon.png)

## Features

- **GPS-Aware Discovery**: Real-time GPS integration to discover historical kingdoms and nearby heritage sites.
- **AI Guide "Arjuna"**: An intelligent assistant with deep knowledge of Indonesian history and culture, providing personalized recommendations and stories.
- **UMKM Marketplace**: A curated marketplace featuring authentic Indonesian crafts like Batik, Keris, and Wayang puppets.
- **Interactive Map**: Explore the territories of ancient kingdoms and find modern points of interest.
- **Gamified Experience**: Earn XP, complete quests, and track your cultural journey through a beautiful profile dashboard.

## Tech Stack

- **Frontend**: Expo React Native, Expo Router, React Query, Lucide Icons.
- **Backend**: Node.js, Express, TypeScript.
- **Database**: PostgreSQL with Drizzle ORM.
- **AI**: OpenAI GPT-4o for intelligent cultural guidance.
- **Animations**: React Native Reanimated.

## Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Set Up Database
Provision a PostgreSQL database (e.g., via Supabase) and set the `DATABASE_URL` environment variable. Run:
```bash
npm run db:push
```

### 3. Run the App
Start the backend:
```bash
npm run server:dev
```
In a new terminal, start the frontend:
```bash
npm run expo:dev
```

## Environment Variables

| Variable | Description | Required |
| :--- | :--- | :--- |
| `DATABASE_URL` | PostgreSQL connection string | Yes |
| `OPENAI_API_KEY` | OpenAI API key for Arjuna AI | Yes |
| `GOOGLE_CLIENT_ID` | Google OAuth Client ID for Auth | No |

## Database Schema Overview

The application uses five main tables:
- **Users**: Authentication and profile data.
- **Conversations**: Chat sessions with the AI guide.
- **Messages**: Individual chat messages.
- **Products**: UMKM product catalog.
- **Cart Items**: Persistent shopping cart.

## Deployment

The app is ready for deployment via Expo Application Services (EAS).
- Android: `eas build --platform android`
- iOS: `eas build --platform ios`

The backend can be deployed to any Node.js compatible hosting (e.g., Railway, Render, or Heroku).

## License

This project is licensed under the MIT License.
