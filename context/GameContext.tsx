import React, { createContext, useContext, useState, useMemo, useEffect, useRef, ReactNode } from "react";
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
  gainXP: (amount: number, source: string) => void;
  addToInventory: (itemId: string) => void;
  completeQuest: (questId: string, xpReward: number, itemRewardId?: string) => void;
  recordBattle: (won: boolean) => void;
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

const getTodayDateString = () => new Date().toISOString().split('T')[0];

export function GameProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<GameState>(INITIAL_STATE);
  const stateRef = useRef<GameState>(INITIAL_STATE);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    stateRef.current = state;
  }, [state]);

  useEffect(() => {
    loadState();
  }, []);

  const loadState = async () => {
    try {
      const saved = await AsyncStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        const today = getTodayDateString();
        if (parsed.lastQuestDate !== today) {
          parsed.completedQuestIds = [];
          parsed.lastQuestDate = today;
        }
        setState(parsed);
        stateRef.current = parsed;
      }
    } catch (e) {
      console.error("Failed to load game state", e);
    } finally {
      setIsLoading(false);
    }
  };

  const saveState = (newState: GameState) => {
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newState)).catch(e => {
      console.error("Failed to save game state", e);
    });
  };

  const gainXP = (amount: number, source: string) => {
    const prev = stateRef.current;
    let newXP = prev.xp + amount;
    let newLevel = prev.level;
    let leveledUp = false;

    while (newXP >= getXPForNextLevel(newLevel)) {
      newXP -= getXPForNextLevel(newLevel);
      newLevel++;
      leveledUp = true;
    }

    const newState: GameState = {
      ...prev,
      xp: newXP,
      level: newLevel,
      title: getTitleForLevel(newLevel),
    };

    setState(newState);
    stateRef.current = newState;
    saveState(newState);

    if (leveledUp) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    }
  };

  const addToInventory = (itemId: string) => {
    const prev = stateRef.current;
    const existing = prev.inventory.find(i => i.id === itemId);
    let newInventory: InventoryItem[];
    if (existing) {
      newInventory = prev.inventory.map(i =>
        i.id === itemId ? { ...i, count: i.count + 1 } : i
      );
    } else {
      newInventory = [
        ...prev.inventory,
        { id: itemId, name: itemId.replace(/_/g, " "), rarity: "Common" as const, icon: "help-circle", count: 1 },
      ];
    }
    const newState: GameState = { ...prev, inventory: newInventory };
    setState(newState);
    stateRef.current = newState;
    saveState(newState);
  };

  const completeQuest = (questId: string, xpReward: number, itemRewardId?: string) => {
    const prev = stateRef.current;
    if (prev.completedQuestIds.includes(questId)) return;

    const newCompleted = [...prev.completedQuestIds, questId];
    let newXP = prev.xp + xpReward;
    let newLevel = prev.level;

    while (newXP >= getXPForNextLevel(newLevel)) {
      newXP -= getXPForNextLevel(newLevel);
      newLevel++;
    }

    const newState: GameState = {
      ...prev,
      completedQuestIds: newCompleted,
      xp: newXP,
      level: newLevel,
      title: getTitleForLevel(newLevel),
    };

    setState(newState);
    stateRef.current = newState;
    saveState(newState);
  };

  const recordBattle = (won: boolean) => {
    const prev = stateRef.current;
    const newState: GameState = {
      ...prev,
      battleWins: prev.battleWins + (won ? 1 : 0),
      battleTotal: prev.battleTotal + 1,
    };
    setState(newState);
    stateRef.current = newState;
    saveState(newState);
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
