import React, { createContext, useContext, useState, useMemo, useEffect, ReactNode } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Haptics from "expo-haptics";

export interface InventoryItem {
  id: string;
  name: string;
  rarity: "Common" | "Uncommon" | "Rare" | "Epic" | "Legendary";
  icon: string;
  count: number;
}

interface GameState {
  level: number;
  xp: number;
  title: string;
  inventory: InventoryItem[];
  completedQuestIds: string[];
  lastQuestDate: string;
  battleWins: number;
  battleTotal: number;
}

interface GameContextValue extends GameState {
  gainXP: (amount: number, source: string) => Promise<void>;
  addToInventory: (itemId: string) => Promise<void>;
  completeQuest: (questId: string, xpReward: number, itemRewardId?: string) => Promise<void>;
  recordBattle: (won: boolean) => Promise<void>;
  isLoading: boolean;
}

const GameContext = createContext<GameContextValue | null>(null);

const STORAGE_KEY = "nusantara_game_state";

const INITIAL_STATE: GameState = {
  level: 1,
  xp: 0,
  title: "Wanderer",
  inventory: [],
  completedQuestIds: [],
  lastQuestDate: "",
  battleWins: 0,
  battleTotal: 0,
};

const getTitleForLevel = (level: number): string => {
  if (level >= 40) return "Master of Nusantara";
  if (level >= 30) return "Sage";
  if (level >= 20) return "Guardian";
  if (level >= 15) return "Explorer";
  if (level >= 10) return "Scholar";
  if (level >= 5) return "Pilgrim";
  return "Wanderer";
};

const getXPForNextLevel = (level: number): number => {
  if (level === 1) return 100;
  if (level === 2) return 250;
  if (level === 3) return 500;
  if (level === 4) return 900;
  if (level < 10) return 900 + (level - 4) * 500;
  return 900 + (5 * 500) + (level - 9) * 1000;
};

// Simplified check for "today" in local date string
const getTodayDateString = () => new Date().toISOString().split('T')[0];

export function GameProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<GameState>(INITIAL_STATE);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadState();
  }, []);

  const loadState = async () => {
    try {
      const saved = await AsyncStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        // Reset quests if it's a new day
        const today = getTodayDateString();
        if (parsed.lastQuestDate !== today) {
          parsed.completedQuestIds = [];
          parsed.lastQuestDate = today;
        }
        setState(parsed);
      }
    } catch (e) {
      console.error("Failed to load game state", e);
    } finally {
      setIsLoading(false);
    }
  };

  const saveState = async (newState: GameState) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newState));
    } catch (e) {
      console.error("Failed to save game state", e);
    }
  };

  const gainXP = async (amount: number, source: string) => {
    setState(prev => {
      let newXP = prev.xp + amount;
      let newLevel = prev.level;
      
      while (newXP >= getXPForNextLevel(newLevel)) {
        newXP -= getXPForNextLevel(newLevel);
        newLevel++;
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      }

      const newState = {
        ...prev,
        xp: newXP,
        level: newLevel,
        title: getTitleForLevel(newLevel),
      };
      saveState(newState);
      return newState;
    });
  };

  const addToInventory = async (itemId: string) => {
    // We'll need a way to look up item details, for now just a stub
    // In real implementation we'd import INVENTORY_ITEMS
    setState(prev => {
      const existing = prev.inventory.find(i => i.id === itemId);
      let newInventory;
      if (existing) {
        newInventory = prev.inventory.map(i => i.id === itemId ? { ...i, count: i.count + 1 } : i);
      } else {
        // Fallback for item details - in a real app these come from a constant
        newInventory = [...prev.inventory, { id: itemId, name: itemId.replace(/_/g, ' '), rarity: "Common", icon: "help-circle", count: 1 } as InventoryItem];
      }
      const newState = { ...prev, inventory: newInventory };
      saveState(newState);
      return newState;
    });
  };

  const completeQuest = async (questId: string, xpReward: number, itemRewardId?: string) => {
    setState(prev => {
      if (prev.completedQuestIds.includes(questId)) return prev;
      
      const newCompleted = [...prev.completedQuestIds, questId];
      const newState = { ...prev, completedQuestIds: newCompleted };
      
      // We'll handle XP and items separately to keep state logic clean
      // but since we are inside setState, we must return the state with XP already updated if we want it atomic
      let newXP = prev.xp + xpReward;
      let newLevel = prev.level;
      while (newXP >= getXPForNextLevel(newLevel)) {
        newXP -= getXPForNextLevel(newLevel);
        newLevel++;
      }
      
      const finalState = {
        ...newState,
        xp: newXP,
        level: newLevel,
        title: getTitleForLevel(newLevel),
      };

      if (itemRewardId) {
        // This is tricky inside setState if we don't have item info. 
        // For now let's assume item reward is handled by the caller or we look it up.
      }

      saveState(finalState);
      return finalState;
    });
  };

  const recordBattle = async (won: boolean) => {
    setState(prev => {
      const newState = {
        ...prev,
        battleWins: prev.battleWins + (won ? 1 : 0),
        battleTotal: prev.battleTotal + 1,
      };
      saveState(newState);
      return newState;
    });
  };

  const value = useMemo(() => ({
    ...state,
    gainXP,
    addToInventory,
    completeQuest,
    recordBattle,
    isLoading,
  }), [state, isLoading]);

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
}

export function useGame() {
  const ctx = useContext(GameContext);
  if (!ctx) throw new Error("useGame must be used within GameProvider");
  return ctx;
}
