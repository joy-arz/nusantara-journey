export interface Quest {
  id: string;
  title: string;
  description: string;
  xpReward: number;
  itemRewardId: string;
  icon: string;
}

export const ALL_QUESTS: Quest[] = [
  {
    id: "quest_chat",
    title: "Ask Arjuna a question",
    description: "Consult the sage Arjuna about Indonesian heritage.",
    xpReward: 75,
    itemRewardId: "scholars_scroll",
    icon: "chatbubble-ellipses",
  },
  {
    id: "quest_kingdoms",
    title: "Read about 3 kingdoms",
    description: "Expand your knowledge of the great empires of Nusantara.",
    xpReward: 100,
    itemRewardId: "ancient_map_fragment",
    icon: "library",
  },
  {
    id: "quest_location",
    title: "Discover your location kingdom",
    description: "Use GPS to find which kingdom ruled your current land.",
    xpReward: 50,
    itemRewardId: "explorers_compass",
    icon: "navigate",
  },
  {
    id: "quest_marketplace",
    title: "Visit the marketplace",
    description: "Browse authentic products from local UMKM artisans.",
    xpReward: 40,
    itemRewardId: "merchants_token",
    icon: "cart",
  },
  {
    id: "quest_trivia",
    title: "Win a cultural battle",
    description: "Prove your knowledge in a trivia challenge.",
    xpReward: 150,
    itemRewardId: "prambanan_relief_rubbing",
    icon: "trophy",
  },
  {
    id: "quest_product",
    title: "Add an item to cart",
    description: "Show interest in supporting local cultural preservation.",
    xpReward: 60,
    itemRewardId: "candi_stone_brick",
    icon: "bag-add",
  },
  {
    id: "quest_kingdoms5",
    title: "Explore 5 kingdoms",
    description: "Become a true scholar of the archipelago's history.",
    xpReward: 200,
    itemRewardId: "sriwijaya_sea_chart",
    icon: "map",
  },
  {
    id: "quest_guide3",
    title: "Have 3 guide conversations",
    description: "Deep dive into cultural nuances with Arjuna.",
    xpReward: 120,
    itemRewardId: "prambanan_relief_rubbing",
    icon: "sparkles",
  },
  {
    id: "quest_beyond_bali",
    title: "Explore heritage beyond Bali",
    description: "Visit an under-visited site like Muara Jambi or Trowulan to help redistribute tourism across the archipelago.",
    xpReward: 175,
    itemRewardId: "trowulan_gold_coin",
    icon: "compass",
  },
];

export function getDailyQuests() {
  const today = new Date().toISOString().split('T')[0];
  // Simple seed based on date
  let seed = 0;
  for (let i = 0; i < today.length; i++) seed += today.charCodeAt(i);
  
  const shuffled = [...ALL_QUESTS].sort(() => {
    seed = (seed * 9301 + 49297) % 233280;
    return (seed / 233280) - 0.5;
  });
  
  return shuffled.slice(0, 3);
}
