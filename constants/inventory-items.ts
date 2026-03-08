export interface InventoryItemTemplate {
  id: string;
  name: string;
  rarity: "Common" | "Uncommon" | "Rare" | "Epic" | "Legendary";
  icon: string;
  description: string;
}

export const INVENTORY_ITEMS: InventoryItemTemplate[] = [
  // Common
  { id: "scholars_scroll", name: "Scholar's Scroll", rarity: "Common", icon: "script-text", description: "A simple scroll for recording historical findings." },
  { id: "merchants_token", name: "Merchant's Token", rarity: "Common", icon: "cash", description: "A wooden token used by market travelers." },
  { id: "candi_stone_brick", name: "Candi Stone Brick", rarity: "Common", icon: "square", description: "A sturdy brick made of volcanic andesite." },
  { id: "wayang_puppet_token", name: "Wayang Puppet Token", rarity: "Common", icon: "account", description: "A small charm shaped like a shadow puppet." },
  { id: "batik_cloth_fragment", name: "Batik Cloth Fragment", rarity: "Common", icon: "texture", description: "A small piece of hand-stamped batik." },
  { id: "gamelan_gong_shard", name: "Gamelan Gong Shard", rarity: "Common", icon: "circle-outline", description: "A fragment of a broken bronze gong." },
  
  // Uncommon
  { id: "ancient_map_fragment", name: "Ancient Map Fragment", rarity: "Uncommon", icon: "map-outline", description: "A piece of a map showing forgotten trade routes." },
  { id: "explorers_compass", name: "Explorer's Compass", rarity: "Uncommon", icon: "compass", description: "A compass that always points toward heritage." },
  { id: "prambanan_relief_rubbing", name: "Prambanan Relief Rubbing", rarity: "Uncommon", icon: "file-image", description: "A charcoal rubbing of a temple relief." },
  { id: "kujang_blade_fragment", name: "Kujang Blade Fragment", rarity: "Uncommon", icon: "knife-military", description: "A fragment of a traditional Sundanese blade." },
  { id: "gamelan_kenong", name: "Gamelan Kenong", rarity: "Uncommon", icon: "bell", description: "A small kettle-gong from a gamelan set." },
  
  // Rare
  { id: "keris_pamor_shard", name: "Keris Pamor Shard", rarity: "Rare", icon: "sword-cross", description: "A piece of meteorite used in keris forging." },
  { id: "sriwijaya_sea_compass", name: "Sriwijaya Sea Compass", rarity: "Rare", icon: "navigation", description: "An ancient tool used by Sriwijayan sailors." },
  { id: "batik_parang_scroll", name: "Batik Parang Scroll", rarity: "Rare", icon: "format-list-bulleted-type", description: "A guide to the sacred Parang patterns." },
  { id: "topeng_panji_mask", name: "Topeng Panji Mask", rarity: "Rare", icon: "face-mask", description: "A refined mask representing Prince Panji." },
  { id: "pengging_temple_fragment", name: "Pengging Temple Fragment", rarity: "Rare", icon: "home-city", description: "A carved stone from the lost Pengging kingdom." },
  
  // Epic
  { id: "sriwijaya_sea_chart", name: "Sriwijaya Sea Chart", rarity: "Epic", icon: "map-check", description: "A complete navigation chart of the Malacca Strait." },
  { id: "borobudur_stone_fragment", name: "Borobudur Stone Fragment", rarity: "Epic", icon: "shimmer", description: "A sacred stone carved with ancient wisdom." },
  { id: "majapahit_royal_seal", name: "Majapahit Royal Seal", rarity: "Epic", icon: "seal", description: "A bronze seal used for official imperial decrees." },
  { id: "trowulan_gold_coin", name: "Trowulan Gold Coin", rarity: "Epic", icon: "gold", description: "A rare gold coin from the Majapahit era." },
  
  // Legendary
  { id: "gajah_mada_sumpah_palapa", name: "Gajah Mada's Sumpah Palapa", rarity: "Legendary", icon: "crown", description: "The symbol of the vow that unified Nusantara." },
  { id: "ken_arok_keris_empu_gandring", name: "Ken Arok's Keris Empu Gandring", rarity: "Legendary", icon: "flash", description: "The legendary cursed blade of Singhasari." },
];

export const RARITY_COLORS = {
  Common: "#7A6855",
  Uncommon: "#4CAF50",
  Rare: "#2196F3",
  Epic: "#9C27B0",
  Legendary: "#FFC107",
};
