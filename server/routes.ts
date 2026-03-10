import type { Express, Request, Response } from "express";
import { createServer, type Server } from "node:http";
import OpenAI from "openai";
import { db } from "./db";
import {
  conversations, messages, products, cartItems, users,
  type Conversation, type Message, type Product, type User
} from "@shared/schema";
import { eq, desc, sql } from "drizzle-orm";
import session from "express-session";
import MemoryStore from "memorystore";
import { firebaseAuth } from "./firebase-admin";

const SessionStore = MemoryStore(session);

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const NUSANTARA_SYSTEM_PROMPT = `You are Arjuna, an expert AI guide for Indonesian cultural heritage, history, and tourism. You have deep knowledge of:

HISTORY: 10 Indonesian kingdoms spanning 7th-17th century:
- Sriwijaya (650-1377 CE, Palembang, South Sumatra) - Buddhist maritime empire
- Mataram Kuno (717-1006 CE, Central Java) - Hindu-Buddhist kingdom, built Borobudur & Prambanan
- Medang Kemulan (850-1006 CE, East Java) - Continuation of Mataram
- Kahuripan (1006-1045 CE, East Java) - Founded by Airlangga
- Kediri (1045-1222 CE, East Java) - Literary golden age
- Singhasari (1222-1292 CE, East Java) - Founded by Ken Arok
- Majapahit (1293-1527 CE, East Java) - Greatest Hindu-Buddhist empire, unified Nusantara
- Demak (1475-1554 CE, Central Java) - First Islamic sultanate in Java
- Pajang (1568-1586 CE, Central Java) - Islamic kingdom
- Mataram Islam (1586-1755 CE, Central Java) - Last major Javanese kingdom before colonization

MYTHOLOGY: 22+ Indonesian mythological creatures:
Genderuwo, Kuntilanak, Tuyul, Pocong, Leak (Bali), Rangda (Bali), Barong (Bali), Garuda, Naga, Buto (giant), Wewe Gombel, Sundel Bolong, Aswang, Banaspati, Si Manis Jembatan Ancol, Nyai Roro Kidul (Sea Queen), Dewi Sri (rice goddess), Batara Kala (god of underworld), Jatayu (eagle), Hanoman, Bima (Pandawa), Arjuna (Pandawa)

CULTURE: Batik patterns, Keris (sacred dagger), Wayang (shadow puppetry), Gamelan music, traditional architecture (Joglo, Limasan, Rumah Gadang), traditional dances (Kecak, Saman, Bedhaya), traditional foods, spice trade routes

TOURISM: Borobudur (Central Java), Prambanan (Central Java), Trowulan (East Java, Majapahit ruins), Keraton Yogyakarta (palace), Tanah Lot (Bali), Uluwatu (Bali), Komodo Island, Raja Ampat

UMKM (Local Businesses): Batik craftsmen in Solo & Yogyakarta, Keris forgers in Madura, wooden crafts from Jepara, silver jewelry from Kotagede, Wayang puppets from Surakarta

LANGUAGES: Explain Indonesian/Javanese/Balinese cultural terms with context

Always respond in English unless asked for Indonesian. Be engaging, educational, and inspire tourism to Indonesia. When discussing heritage sites, mention nearby UMKM and authentic experiences. Keep responses concise (2-4 paragraphs) but rich with cultural detail.`;

async function seedProducts() {
  const currentProducts = await db.select().from(products);
  const needsReseed = currentProducts.length === 0 || currentProducts.some(p => p.imageUrl === null);

  if (!needsReseed) return;

  // Clear existing products if we need to reseed
  if (currentProducts.length > 0) {
    await db.delete(products);
  }

  const seedData = [
    { 
      name: "Batik Megamendung", 
      description: "Classic Cirebon cloud motif batik handcrafted by master artisans. Each piece takes 3-7 days of careful hand-drawing. Symbol of Cirebon's royal heritage.", 
      price: 185000, 
      category: "batik", 
      origin: "Cirebon, West Java", 
      rating: 4.9, 
      reviewCount: 124, 
      inStock: 15,
      imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Batik_Mega_Mendung.jpg/640px-Batik_Mega_Mendung.jpg"
    },
    { 
      name: "Keris Majapahit Replica", 
      description: "Hand-forged keris with pamor (damascus-like) pattern. Blessed by Javanese craftsman following ancient tradition. Includes wooden sheath.", 
      price: 650000, 
      category: "keris", 
      origin: "Madura, East Java", 
      rating: 4.8, 
      reviewCount: 67, 
      inStock: 5,
      imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2d/Keris_museum_Mandilaras.jpg/640px-Keris_museum_Mandilaras.jpg"
    },
    { 
      name: "Batik Parang Rusak", 
      description: "Royal Solo batik with diagonal knife-wave pattern. Originally worn only by royalty. Made with natural indigo and soga brown dyes.", 
      price: 320000, 
      category: "batik", 
      origin: "Surakarta, Central Java", 
      rating: 4.7, 
      reviewCount: 89, 
      inStock: 12,
      imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f5/Batik_pedalaman_-_parang_klithik.JPG/640px-Batik_pedalaman_-_parang_klithik.JPG"
    },
    { 
      name: "Wayang Kulit Set", 
      description: "Set of 5 Pandawa heroes carved from buffalo hide. Includes Arjuna, Bima, Yudhistira, Nakula, Sadewa. Each puppet is individually painted.", 
      price: 1200000, 
      category: "crafts", 
      origin: "Yogyakarta, Central Java", 
      rating: 5.0, 
      reviewCount: 43, 
      inStock: 3,
      imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f5/Bercerita_dengan_Wayang.jpg/640px-Bercerita_dengan_Wayang.jpg"
    },
    { 
      name: "Silver Kotagede Ring", 
      description: "925 sterling silver ring with traditional Javanese relief motif. Handcrafted by 4th generation silver artisan from Kotagede, Yogyakarta.", 
      price: 275000, 
      category: "jewelry", 
      origin: "Kotagede, Yogyakarta", 
      rating: 4.6, 
      reviewCount: 156, 
      inStock: 20,
      imageUrl: "https://upload.wikimedia.org/wikipedia/commons/7/79/COLLECTIE_TROPENMUSEUM_Zilversmederij_in_Kotagede_of_Jogjakarta_TMnr_60054140.jpg"
    },
    { 
      name: "Tenun Ikat Sumba", 
      description: "Traditional hand-woven textile from Sumba island. Uses natural dyes from indigo, morinda root, and teak bark. Each piece is unique.", 
      price: 850000, 
      category: "textiles", 
      origin: "Sumba, East Nusa Tenggara", 
      rating: 4.9, 
      reviewCount: 38, 
      inStock: 7,
      imageUrl: "https://upload.wikimedia.org/wikipedia/commons/3/38/Tenun_Ikat_Kodi%2C_SBD%2C_NTT.jpg"
    },
    { 
      name: "Ukiran Jepara Frame", 
      description: "Intricate teak wood carving in floral arabesque style. Perfect for displaying batik or as decorative art. Signature Jepara craftsmanship.", 
      price: 425000, 
      category: "crafts", 
      origin: "Jepara, Central Java", 
      rating: 4.7, 
      reviewCount: 72, 
      inStock: 8,
      imageUrl: "https://upload.wikimedia.org/wikipedia/commons/4/44/Indah%2C_Itu_Proses_Keindahan.jpg"
    },
    { 
      name: "Gamelan Mini Set", 
      description: "Decorative miniature gamelan set with 6 instruments in bonze/brass. Actual playable instruments at small scale. Includes care guide.", 
      price: 980000, 
      category: "instruments", 
      origin: "Surakarta, Central Java", 
      rating: 4.8, 
      reviewCount: 29, 
      inStock: 4,
      imageUrl: "https://upload.wikimedia.org/wikipedia/commons/e/e6/COLLECTIE_TROPENMUSEUM_Gong_hangend_aan_een_standaard_onderdeel_van_gamelan_Slendro_TMnr_500-26a.jpg"
    },
    { 
      name: "Batik Kawung Tulis", 
      description: "Ancient geometric batik featuring four-petal circular motifs. One of the oldest batik patterns in Java. Hand-drawn (tulis), not stamped.", 
      price: 245000, 
      category: "batik", 
      origin: "Yogyakarta, Central Java", 
      rating: 4.8, 
      reviewCount: 101, 
      inStock: 18,
      imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Batik_pattern_-_kawung.jpg/640px-Batik_pattern_-_kawung.jpg"
    },
    { 
      name: "Topeng Malangan Mask", 
      description: "Traditional Malang dance mask depicting Panji the noble hero. Carved from light hibiscus wood and painted with mineral pigments.", 
      price: 375000, 
      category: "crafts", 
      origin: "Malang, East Java", 
      rating: 4.9, 
      reviewCount: 55, 
      inStock: 6,
      imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a1/Menari_Topeng_Malang.jpg/640px-Menari_Topeng_Malang.jpg"
    },
  ];

  for (const item of seedData) {
    await db.insert(products).values(item).catch(() => {});
  }
}

declare module "express-session" {
  interface SessionData {
    userId: string;
  }
}

export async function registerRoutes(app: Express): Promise<Server> {
  if (process.env.NODE_ENV === "production" && !process.env.SESSION_SECRET) {
    throw new Error("SESSION_SECRET is required in production. Set it in your environment.");
  }
  const sessionSecret = process.env.SESSION_SECRET || "nusantara_secret";

  await seedProducts();

  app.use(
    session({
      cookie: { maxAge: 86400000 },
      store: new SessionStore({
        checkPeriod: 86400000,
      }),
      resave: false,
      saveUninitialized: false,
      secret: sessionSecret,
    })
  );

  app.post("/api/auth/firebase", async (req: Request, res: Response) => {
    try {
      const { idToken } = req.body;
      if (!idToken) {
        return res.status(400).json({ error: "Missing idToken" });
      }

      const decoded = await firebaseAuth.verifyIdToken(idToken);
      const { uid, email, name, picture } = decoded;

      let [user] = await db.select().from(users).where(eq(users.googleId, uid));

      if (!user) {
        const username = (email?.split("@")[0] || "user") + "_" + Math.random().toString(36).substring(2, 5);
        [user] = await db.insert(users).values({
          googleId: uid,
          email: email || null,
          displayName: name || null,
          avatarUrl: picture || null,
          username,
          password: "firebase_authenticated",
        }).returning();
      } else {
        [user] = await db.update(users)
          .set({ displayName: name || user.displayName, avatarUrl: picture || user.avatarUrl, email: email || user.email })
          .where(eq(users.id, user.id))
          .returning();
      }

      req.session.userId = user.id;
      res.json({ id: user.id, displayName: user.displayName, avatarUrl: user.avatarUrl, email: user.email });
    } catch (e) {
      console.error("Firebase auth error:", e);
      res.status(401).json({ error: "Invalid or expired token" });
    }
  });

  app.get("/api/auth/me", async (req: Request, res: Response) => {
    if (!req.session.userId) return res.status(401).json({ error: "Not authenticated" });
    
    try {
      const [user] = await db.select().from(users).where(eq(users.id, req.session.userId));
      if (!user) return res.status(401).json({ error: "User not found" });
      res.json(user);
    } catch (e) {
      res.status(500).json({ error: "Failed to fetch user" });
    }
  });

  app.post("/api/auth/logout", (req: Request, res: Response) => {
    req.session.destroy(() => {
      res.status(204).send();
    });
  });

  app.get("/api/conversations", async (req: Request, res: Response) => {
    try {
      const userId = req.session.userId;
      const all = userId
        ? await db.select().from(conversations).where(eq(conversations.userId, userId)).orderBy(desc(conversations.createdAt))
        : await db.select().from(conversations).orderBy(desc(conversations.createdAt));
      res.json(all);
    } catch (e) { res.status(500).json({ error: "Failed to fetch conversations" }); }
  });

  app.get("/api/conversations/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id as string);
      const [conv] = await db.select().from(conversations).where(eq(conversations.id, id));
      if (!conv) return res.status(404).json({ error: "Not found" });
      const msgs = await db.select().from(messages).where(eq(messages.conversationId, id)).orderBy(messages.createdAt);
      res.json({ ...conv, messages: msgs });
    } catch (e) { res.status(500).json({ error: "Failed to fetch conversation" }); }
  });

  app.post("/api/conversations", async (req: Request, res: Response) => {
    try {
      const { title } = req.body;
      const userId = req.session.userId || null;
      const [conv] = await db.insert(conversations).values({ title: title || "New Conversation", userId }).returning();
      res.status(201).json(conv);
    } catch (e) { res.status(500).json({ error: "Failed to create conversation" }); }
  });

  app.delete("/api/conversations/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id as string);
      await db.delete(messages).where(eq(messages.conversationId, id));
      await db.delete(conversations).where(eq(conversations.id, id));
      res.status(204).send();
    } catch (e) { res.status(500).json({ error: "Failed to delete" }); }
  });

  app.post("/api/conversations/:id/messages", async (req: Request, res: Response) => {
    try {
      const conversationId = parseInt(req.params.id as string);
      const { content } = req.body;

      await db.insert(messages).values({ conversationId, role: "user", content });

      const allMsgs = await db.select().from(messages).where(eq(messages.conversationId, conversationId)).orderBy(messages.createdAt);
      const chatMsgs = allMsgs.map(m => ({ role: m.role as "user" | "assistant", content: m.content }));

      res.setHeader("Content-Type", "text/event-stream");
      res.setHeader("Cache-Control", "no-cache");
      res.setHeader("Connection", "keep-alive");

      const stream = await openai.chat.completions.create({
        model: "gpt-5.1",
        messages: [{ role: "system", content: NUSANTARA_SYSTEM_PROMPT }, ...chatMsgs],
        stream: true,
        max_completion_tokens: 1024,
      });

      let fullResponse = "";
      for await (const chunk of stream) {
        const text = chunk.choices[0]?.delta?.content || "";
        if (text) {
          fullResponse += text;
          res.write(`data: ${JSON.stringify({ content: text })}\n\n`);
        }
      }

      await db.insert(messages).values({ conversationId, role: "assistant", content: fullResponse });
      res.write(`data: ${JSON.stringify({ done: true })}\n\n`);
      res.end();
    } catch (e) {
      if (res.headersSent) { res.write(`data: ${JSON.stringify({ error: "Failed" })}\n\n`); res.end(); }
      else res.status(500).json({ error: "Failed to send message" });
    }
  });

  app.get("/api/products", async (req: Request, res: Response) => {
    try {
      const { category } = req.query;
      const all = category
        ? await db.select().from(products).where(eq(products.category, category as string))
        : await db.select().from(products);
      res.json(all);
    } catch (e) { res.status(500).json({ error: "Failed to fetch products" }); }
  });

  app.get("/api/products/:id", async (req: Request, res: Response) => {
    try {
      const [product] = await db.select().from(products).where(eq(products.id, parseInt(req.params.id as string)));
      if (!product) return res.status(404).json({ error: "Not found" });
      res.json(product);
    } catch (e) { res.status(500).json({ error: "Failed to fetch product" }); }
  });

  app.get("/api/cart/:sessionId", async (req: Request, res: Response) => {
    try {
      const items = await db.select({ cartItem: cartItems, product: products })
        .from(cartItems)
        .innerJoin(products, eq(cartItems.productId, products.id))
        .where(eq(cartItems.sessionId, req.params.sessionId as string));
      res.json(items);
    } catch (e) { res.status(500).json({ error: "Failed to fetch cart" }); }
  });

  app.post("/api/cart", async (req: Request, res: Response) => {
    try {
      const { productId, quantity, sessionId } = req.body;
      const existing = await db.select().from(cartItems)
        .where(eq(cartItems.productId, productId));
      const existingForSession = existing.filter(i => i.sessionId === sessionId);
      if (existingForSession.length > 0) {
        const [updated] = await db.update(cartItems)
          .set({ quantity: existingForSession[0].quantity + (quantity || 1) })
          .where(eq(cartItems.id, existingForSession[0].id))
          .returning();
        return res.json(updated);
      }
      const [item] = await db.insert(cartItems).values({ productId, quantity: quantity || 1, sessionId }).returning();
      res.status(201).json(item);
    } catch (e) { res.status(500).json({ error: "Failed to add to cart" }); }
  });

  app.delete("/api/cart/:sessionId/:itemId", async (req: Request, res: Response) => {
    try {
      await db.delete(cartItems).where(eq(cartItems.id, parseInt(req.params.itemId as string)));
      res.status(204).send();
    } catch (e) { res.status(500).json({ error: "Failed to remove" }); }
  });

  app.delete("/api/cart/:sessionId", async (req: Request, res: Response) => {
    try {
      await db.delete(cartItems).where(eq(cartItems.sessionId, req.params.sessionId as string));
      res.status(204).send();
    } catch (e) { res.status(500).json({ error: "Failed to clear cart" }); }
  });

  const httpServer = createServer(app);
  return httpServer;
}
