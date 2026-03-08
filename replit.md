# Nusantara Journey

An AI-powered Indonesian cultural heritage tourism and UMKM marketplace mobile app built with Expo React Native.

## Project Context
Built for PIDI DIGDAYA x Hackathon 2026 (deadline March 27, 2026)
Categories: Digitalisasi Pariwisata + Ekonomi Kreatif

## Architecture

### Frontend (Expo React Native — port 8081)
- **Framework**: Expo Router (file-based routing)
- **State**: React Query for server state, React Context for cart + gamification + auth
- **Styling**: React Native StyleSheet with Indonesian color palette (no LinearGradient in content cards)
- **Fonts**: Inter (400, 500, 600, 700 weights via expo-google-fonts)
- **Animations**: React Native Reanimated
- **Icons**: @expo/vector-icons (Ionicons, MaterialCommunityIcons)
- **Keyboard**: react-native-keyboard-controller@1.18.5 (pinned — must match Expo Go native binary)
- **Maps**: react-native-maps@1.18.0 (exact — Expo Go compatible); wrapped in `components/MapWrapper.native.tsx` / `components/MapWrapper.tsx` for web fallback
- **Auth**: AuthContext (AsyncStorage-based) with Google OAuth stub — requires EXPO_PUBLIC_GOOGLE_*_CLIENT_ID env vars

### Backend (Express + TypeScript — port 5000)
- **Database**: PostgreSQL via Drizzle ORM
- **AI**: OpenAI gpt-5.1 via Replit AI Integration (streaming SSE)
- **Routes**: Conversations, Messages (streaming), Products, Cart

## App Structure

```
app/
  _layout.tsx          # Root layout with QueryClient, GameProvider, AuthProvider, CartProvider, fonts
  (tabs)/
    _layout.tsx        # Tab bar (NativeTabs for iOS 26+, classic Tabs fallback)
    index.tsx          # Discover: hero, GPS kingdom detection, museums, UMKM, mythology
    map.tsx            # Map tab: GPS map with markers, filter pills, 10 kingdoms history
    guide.tsx          # AI chat with Arjuna (streaming)
    marketplace.tsx    # UMKM product grid with cart drawer
    profile.tsx        # XP, quests, battle, inventory, Google sign-in
  product/[id].tsx     # Product detail with Add to Cart
components/
  MapWrapper.tsx           # Web stub (no react-native-maps import)
  MapWrapper.native.tsx    # Native wrapper for react-native-maps
context/
  GameContext.tsx      # Gamification (useRef anti-crash pattern)
  AuthContext.tsx      # Auth state + AsyncStorage persistence
  CartContext.tsx      # Shopping cart state
constants/
  places-data.ts       # GPS data: 10 kingdom centroids, 12 museums, 12 UMKM, 5 heritage sites
```

## Key Features

1. **10 Indonesian Kingdoms** (650 CE — 1755 CE):
   Sriwijaya, Mataram Kuno, Singhasari, Majapahit, Demak, Mataram Islam, Kediri, Kahuripan, Medang Kemulan, Pajang

2. **AI Guide "Arjuna"**: Streaming chat with OpenAI gpt-5.1, deep Indonesian cultural knowledge. Conversations persisted to PostgreSQL.

3. **UMKM Marketplace**: 10 authentic products (batik, keris, wayang, silver jewelry, etc.) seeded from DB. Cart is client-side via CartContext.

4. **Mythology Section**: 22+ creatures referenced (Garuda, Nyai Roro Kidul, Barong, etc.)

5. **Gamified Profile**: XP bar, achievements system, impact stats

## Color Palette
- Primary/Terracotta: `#C4622D`
- Gold/Accent: `#D4A843`
- Forest: `#2D5A3D`
- Obsidian Background: `#0D0806`
- Text: `#F5ECD5`

## Database Schema
- `conversations` — AI chat conversations
- `messages` — Individual messages per conversation
- `products` — UMKM product catalog (seeded on server start)
- `cart_items` — Session-based cart items

## Important Files
- `server/routes.ts` — All API routes + NUSANTARA_SYSTEM_PROMPT + product seeding
- `shared/schema.ts` — Drizzle schema
- `constants/colors.ts` — Indonesian color palette
- `context/CartContext.tsx` — Cart state management

## Development
- Backend: `npm run server:dev` (port 5000)
- Frontend: `npm run expo:dev` (port 8081)
- DB push: `npm run db:push`

## Planning Documents
- `PIDI_HACKATHON_STRATEGY.md` — Hackathon submission strategy
- `PRE_PRODUCTION_PLANNING.md` — Original RPG analysis (superseded)
