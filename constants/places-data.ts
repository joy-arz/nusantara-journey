export interface Place {
  id: string;
  name: string;
  kingdom: string;
  type: 'heritage' | 'museum' | 'umkm';
  lat: number;
  lng: number;
  description: string;
  entryFee?: string;
  openHours?: string;
  specialty?: string[];
  whatToBuy?: string;
}

export interface KingdomCentroid {
  name: string;
  lat: number;
  lng: number;
  period: string;
  description: string;
  color: string;
}

export const KINGDOM_CENTROIDS: KingdomCentroid[] = [
  { name: "Sriwijaya", lat: -3.0, lng: 104.7, period: "650–1377 CE", description: "The powerful maritime empire that controlled the spice trade routes.", color: "#D4A843" },
  { name: "Mataram Kuno", lat: -7.6, lng: 110.2, period: "717–1006 CE", description: "The era of great temple builders, creators of Borobudur and Prambanan.", color: "#2D5A3D" },
  { name: "Singhasari", lat: -7.9, lng: 112.6, period: "1222–1292 CE", description: "The East Javanese kingdom that paved the way for Majapahit's glory.", color: "#8B0000" },
  { name: "Majapahit", lat: -7.5, lng: 112.4, period: "1293–1527 CE", description: "The golden age of Nusantara, uniting the archipelago under one rule.", color: "#C4622D" },
  { name: "Demak", lat: -6.9, lng: 110.6, period: "1475–1554 CE", description: "The first major Islamic sultanate on Java, a center of faith and trade.", color: "#2E8B57" },
  { name: "Mataram Islam", lat: -7.8, lng: 110.4, period: "1587–1755 CE", description: "The successor of Mataram Kuno, shaping modern Javanese court culture.", color: "#4B3621" },
  { name: "Kediri", lat: -7.8, lng: 112.0, period: "1042–1222 CE", description: "A center of classical Javanese literature and refined arts.", color: "#704214" },
  { name: "Kahuripan", lat: -7.6, lng: 112.2, period: "1019–1045 CE", description: "The kingdom of Airlangga, known for its irrigation and wisdom.", color: "#556B2F" },
  { name: "Medang", lat: -7.5, lng: 112.0, period: "732–1006 CE", description: "The predecessor of the great East Javanese dynasties.", color: "#3D2B1F" },
  { name: "Pajang", lat: -7.5, lng: 110.7, period: "1568–1586 CE", description: "A brief but vital bridge between the era of Demak and Mataram Islam.", color: "#5C4033" },
];

export const MUSEUMS: Place[] = [
  { id: "m1", name: "Museum Nasional Jakarta", kingdom: "Nusantara", type: "museum", lat: -6.1763, lng: 106.8227, description: "The largest collection of Indonesian history and ethnography.", entryFee: "Rp 5.000", openHours: "Tue-Sun 08:00-16:00" },
  { id: "m2", name: "Museum Sonobudoyo Yogyakarta", kingdom: "Mataram Islam", type: "museum", lat: -7.8009, lng: 110.3650, description: "Javanese culture and heritage museum in the heart of Yogyakarta.", entryFee: "Rp 5.000", openHours: "Tue-Sun 08:00-15:30" },
  { id: "m3", name: "Museum Majapahit Trowulan", kingdom: "Majapahit", type: "museum", lat: -7.5519, lng: 112.3758, description: "Site museum at the ancient capital of the Majapahit Empire.", entryFee: "Rp 3.000", openHours: "Daily 07:30-16:00" },
  { id: "m4", name: "Museum Batik Pekalongan", kingdom: "Nusantara", type: "museum", lat: -6.8886, lng: 109.6753, description: "Dedicated to the coastal batik traditions of Northern Java.", entryFee: "Rp 10.000", openHours: "Tue-Sun 09:00-16:00" },
  { id: "m5", name: "Museum Wayang Jakarta", kingdom: "Nusantara", type: "museum", lat: -6.1352, lng: 106.8133, description: "Extensive collection of wayang puppets from across Indonesia.", entryFee: "Rp 5.000", openHours: "Tue-Sun 09:00-15:00" },
  { id: "m6", name: "Museum Tekstil Jakarta", kingdom: "Nusantara", type: "museum", lat: -6.1871, lng: 106.8138, description: "Discover the rich textile traditions of the archipelago.", entryFee: "Rp 5.000", openHours: "Tue-Sun 09:00-15:00" },
  { id: "m7", name: "Museum Keris Surakarta", kingdom: "Mataram Islam", type: "museum", lat: -7.5652, lng: 110.8188, description: "Dedicated to the art and history of the Indonesian kris.", entryFee: "Rp 5.000", openHours: "Tue-Sun 09:00-14:00" },
  { id: "m8", name: "Galeri Nasional Jakarta", kingdom: "Nusantara", type: "museum", lat: -6.1986, lng: 106.8322, description: "Home to Indonesia's finest modern and contemporary art.", entryFee: "Free", openHours: "Tue-Sun 10:00-18:00" },
  { id: "m9", name: "Museum Negeri Bali", kingdom: "Bali", type: "museum", lat: -8.6581, lng: 115.2134, description: "Showcasing Balinese art, culture, and prehistoric artifacts.", entryFee: "Rp 50.000", openHours: "Mon-Fri 08:00-16:00" },
  { id: "m10", name: "Museum Ullen Sentalu Yogyakarta", kingdom: "Mataram Islam", type: "museum", lat: -7.5963, lng: 110.4264, description: "Private museum of Javanese culture and Mataram royalty.", entryFee: "Rp 50.000", openHours: "Tue-Sun 08:30-16:00" },
  { id: "m11", name: "Museum Brawijaya Malang", kingdom: "Singhasari", type: "museum", lat: -7.9831, lng: 112.6265, description: "Military history museum with a focus on East Javanese heritage.", entryFee: "Rp 5.000", openHours: "Daily 08:00-15:00" },
  { id: "m12", name: "Museum Gubernuran Surabaya", kingdom: "Majapahit", type: "museum", lat: -7.2475, lng: 112.7378, description: "Historical museum located in the old governor's office.", entryFee: "Rp 5.000", openHours: "Tue-Sun 09:00-16:00" },
];

export const UMKM_ARTISANS: Place[] = [
  { id: "u1", name: "Kampung Batik Laweyan Solo", kingdom: "Mataram Islam", type: "umkm", lat: -7.5701, lng: 110.7883, description: "Historic batik district with grand merchant houses.", specialty: ["batik", "heritage district"], openHours: "Daily 08:00-18:00", whatToBuy: "Hand-drawn Batik" },
  { id: "u2", name: "Kotagede Silver District Yogyakarta", kingdom: "Mataram Islam", type: "umkm", lat: -7.8371, lng: 110.3949, description: "The silver center of Yogyakarta since the 16th century.", specialty: ["silver jewelry", "crafts"], openHours: "Daily 09:00-17:00", whatToBuy: "Filigree Silver" },
  { id: "u3", name: "Jepara Wood Carving Center", kingdom: "Majapahit", type: "umkm", lat: -6.5898, lng: 110.6729, description: "Famous worldwide for intricate wood carvings and furniture.", specialty: ["ukiran kayu", "furniture"], openHours: "Daily 08:00-17:00", whatToBuy: "Teak Carvings" },
  { id: "u4", name: "Sentra Batik Trusmi Cirebon", kingdom: "Cirebon", type: "umkm", lat: -6.7235, lng: 108.5100, description: "The home of the iconic Megamendung batik pattern.", specialty: ["batik Cirebon", "megamendung"], openHours: "Daily 08:00-20:00", whatToBuy: "Megamendung Batik" },
  { id: "u5", name: "Kamasan Wayang Village Klungkung Bali", kingdom: "Bali", type: "umkm", lat: -8.5396, lng: 115.4045, description: "The birthplace of classical Balinese painting.", specialty: ["wayang painting", "traditional art"], openHours: "Daily 08:00-16:00", whatToBuy: "Kamasan Paintings" },
  { id: "u6", name: "Celuk Silver Village Bali", kingdom: "Bali", type: "umkm", lat: -8.5579, lng: 115.2909, description: "Renowned for its generations of skilled gold and silver smiths.", specialty: ["silver", "gold jewelry"], openHours: "Daily 08:00-18:00", whatToBuy: "Balinese Silver" },
  { id: "u7", name: "Pasar Seni Ancol Jakarta", kingdom: "Nusantara", type: "umkm", lat: -6.1229, lng: 106.8479, description: "A hub for artists and traditional craftsmen in the capital.", specialty: ["mixed crafts", "ukiran", "batik"], openHours: "Daily 10:00-20:00", whatToBuy: "Local Artworks" },
  { id: "u8", name: "Kampung Batik Jetis Sidoarjo", kingdom: "Majapahit", type: "umkm", lat: -7.4561, lng: 112.7184, description: "Known for its vibrant and distinct coastal batik style.", specialty: ["batik Sidoarjo"], openHours: "Daily 08:00-17:00", whatToBuy: "Sidoarjo Batik" },
  { id: "u9", name: "Sentra Gerabah Kasongan Yogyakarta", kingdom: "Mataram Islam", type: "umkm", lat: -7.8703, lng: 110.3544, description: "Pottery village specializing in artistic clay creations.", specialty: ["pottery", "ceramic crafts"], openHours: "Daily 08:00-17:00", whatToBuy: "Terracotta Art" },
  { id: "u10", name: "Pusat Kerajinan Tenun Sukarara Lombok", kingdom: "Sasak", type: "umkm", lat: -8.6869, lng: 116.3083, description: "Witness the traditional weaving of Songket and Tenun.", specialty: ["tenun Lombok"], openHours: "Daily 08:00-17:00", whatToBuy: "Songket Textiles" },
  { id: "u11", name: "Kampung Keris Madura Sumenep", kingdom: "Majapahit", type: "umkm", lat: -7.0000, lng: 113.8667, description: "The most active keris-making community remaining today.", specialty: ["keris forging"], openHours: "Daily 08:00-16:00", whatToBuy: "Custom Keris" },
  { id: "u12", name: "Pusat Ukiran Mas Ubud Bali", kingdom: "Bali", type: "umkm", lat: -8.5069, lng: 115.2625, description: "The heart of high-quality Balinese wood carving.", specialty: ["gold ukiran", "traditional Bali crafts"], openHours: "Daily 08:00-18:00", whatToBuy: "Statue Carvings" },
];

export const HERITAGE_SITES: Place[] = [
  { id: "h1", name: "Candi Borobudur", kingdom: "Mataram Kuno", type: "heritage", lat: -7.6079, lng: 110.2038, description: "The world's largest Buddhist temple.", entryFee: "Rp 50.000", openHours: "Daily 06:30-16:30" },
  { id: "h2", name: "Candi Prambanan", kingdom: "Mataram Kuno", type: "heritage", lat: -7.7520, lng: 110.4915, description: "Magnificent 9th-century Hindu temple complex.", entryFee: "Rp 50.000", openHours: "Daily 06:30-17:00" },
  { id: "h3", name: "Trowulan Archaeological Site", kingdom: "Majapahit", type: "heritage", lat: -7.5592, lng: 112.3811, description: "Ruins of the capital city of Majapahit.", entryFee: "Rp 5.000", openHours: "Daily 07:00-16:00" },
  { id: "h4", name: "Candi Singhasari", kingdom: "Singhasari", type: "heritage", lat: -7.8863, lng: 112.6644, description: "13th-century Hindu-Buddhist temple.", entryFee: "Rp 5.000", openHours: "Daily 07:30-16:00" },
  { id: "h5", name: "Muara Jambi", kingdom: "Sriwijaya", type: "heritage", lat: -1.4727, lng: 103.6583, description: "One of the largest and best-preserved temple complexes in Southeast Asia.", entryFee: "Rp 5.000", openHours: "Daily 08:00-17:00" },
];
