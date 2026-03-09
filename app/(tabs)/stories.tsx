import React, { useState, useMemo } from "react";
import {
  View, Text, StyleSheet, ScrollView, Pressable,
  Dimensions, Platform, Modal, FlatList
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from "react-native-reanimated";
import { Colors } from "@/constants/colors";
import { router } from "expo-router";
import { TAB_BAR_HEIGHT, WEB_TOP_INSET, WEB_BOTTOM_INSET } from "@/constants/layout";
import {
  FOLKLORE_STORIES, FolkloreStory, CATEGORY_LABELS, CATEGORY_COLORS, STORY_REGIONS, StoryCategory
} from "@/constants/folklore-stories";

const { width } = Dimensions.get("window");
const CARD_WIDTH = (width - 48) / 2;

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const REGION_KEYWORDS: Record<string, string[]> = {
  'Java': ['java', 'yogyakarta', 'surakarta', 'solo', 'javanese', 'sunda', 'betawi', 'jakarta', 'ponorogo', 'kediri', 'malang', 'surabaya', 'banyumas', 'batavia', 'mataram'],
  'Sumatra': ['sumatra', 'sumatra', 'minangkabau', 'aceh', 'palembang', 'jambi', 'riau', 'bangka', 'belitung', 'batak', 'padang', 'medan', 'lampung'],
  'Bali': ['bali', 'balinese', 'ubud', 'denpasar'],
  'Kalimantan': ['kalimantan', 'borneo', 'dayak', 'kutai', 'banjar', 'mahakam', 'kapuas'],
  'Sulawesi': ['sulawesi', 'bugis', 'makassar', 'minahasa', 'tomohon', 'toraja', 'gorontalo'],
  'Papua': ['papua', 'papuan', 'irian', 'asmat'],
  'Nusa Tenggara': ['lombok', 'flores', 'sumbawa', 'timor', 'ntt', 'ntb', 'sasak', 'komodo', 'bima', 'sumba'],
  'Maluku': ['maluku', 'ternate', 'tidore', 'ambon', 'banda', 'moluccas'],
};

function regionFromStory(story: FolkloreStory): string {
  const lower = (story.region + ' ' + story.kingdom).toLowerCase();
  for (const [region, keywords] of Object.entries(REGION_KEYWORDS)) {
    if (keywords.some(k => lower.includes(k))) return region;
  }
  return 'Other';
}

function StoryCard({ story, onPress }: { story: FolkloreStory; onPress: () => void }) {
  const scale = useSharedValue(1);
  const animStyle = useAnimatedStyle(() => ({ transform: [{ scale: scale.value }] }));
  const catColor = CATEGORY_COLORS[story.category];

  return (
    <AnimatedPressable
      style={[styles.storyCard, animStyle]}
      onPressIn={() => { scale.value = withSpring(0.96); }}
      onPressOut={() => { scale.value = withSpring(1); }}
      onPress={onPress}
    >
      <View style={[styles.storyCardIllustration, { backgroundColor: catColor + "25" }]}>
        <MaterialCommunityIcons
          name={
            story.category === 'myth' ? 'star-crescent' :
            story.category === 'legend' ? 'crown' :
            story.category === 'fairy-tale' ? 'magic-staff' :
            story.category === 'origin-story' ? 'earth' :
            'owl'
          }
          size={36}
          color={catColor}
        />
      </View>
      <View style={styles.storyCardBody}>
        <View style={[styles.storyCardBadge, { backgroundColor: catColor + "22" }]}>
          <Text style={[styles.storyCardBadgeText, { color: catColor }]} numberOfLines={1}>
            {CATEGORY_LABELS[story.category]}
          </Text>
        </View>
        <Text style={styles.storyCardTitle} numberOfLines={2}>{story.title}</Text>
        <Text style={styles.storyCardRegion} numberOfLines={1}>
          <Ionicons name="location" size={10} color={Colors.textMuted} /> {story.region}
        </Text>
        <Text style={styles.storyCardSummary} numberOfLines={2}>{story.summary}</Text>
      </View>
    </AnimatedPressable>
  );
}

function StoryDetailModal({ story, onClose }: { story: FolkloreStory; onClose: () => void }) {
  const insets = useSafeAreaInsets();
  const catColor = CATEGORY_COLORS[story.category];

  return (
    <Modal visible animationType="slide" transparent onRequestClose={onClose}>
      <View style={styles.modalOverlay}>
        <View style={[styles.modalSheet, { paddingBottom: insets.bottom + 20 }]}>
          <View style={styles.modalHandle} />

          <ScrollView showsVerticalScrollIndicator={false} style={styles.modalScroll}>
            {/* Header illustration */}
            <View style={[styles.modalIllustration, { backgroundColor: catColor + "20" }]}>
              <MaterialCommunityIcons
                name={
                  story.category === 'myth' ? 'star-crescent' :
                  story.category === 'legend' ? 'crown' :
                  story.category === 'fairy-tale' ? 'magic-staff' :
                  story.category === 'origin-story' ? 'earth' : 'owl'
                }
                size={56}
                color={catColor}
              />
            </View>

            <View style={styles.modalBody}>
              <View style={styles.modalBadgeRow}>
                <View style={[styles.modalBadge, { backgroundColor: catColor + "22" }]}>
                  <Text style={[styles.modalBadgeText, { color: catColor }]}>{CATEGORY_LABELS[story.category]}</Text>
                </View>
                <View style={[styles.modalBadge, { backgroundColor: Colors.accent + "22" }]}>
                  <Text style={[styles.modalBadgeText, { color: Colors.accent }]}>{story.region}</Text>
                </View>
                {story.kingdom !== 'Nusantara' && (
                  <View style={[styles.modalBadge, { backgroundColor: Colors.surface }]}>
                    <MaterialCommunityIcons name="crown" size={10} color={Colors.textMuted} />
                    <Text style={[styles.modalBadgeText, { color: Colors.textMuted }]}>{story.kingdom}</Text>
                  </View>
                )}
              </View>

              <Text style={styles.modalTitle}>{story.title}</Text>
              <Text style={styles.modalTitleId}>{story.titleId}</Text>

              <Text style={styles.modalSummary}>{story.summary}</Text>

              <View style={styles.divider} />

              <Text style={styles.fullStoryLabel}>The Full Story</Text>
              <Text style={styles.modalFullText}>{story.fullText}</Text>

              {story.characters && story.characters.length > 0 && (
                <View style={styles.sectionBlock}>
                  <Text style={styles.sectionBlockTitle}>Characters</Text>
                  <View style={styles.tagRow}>
                    {story.characters.map((c, i) => (
                      <View key={i} style={[styles.characterTag, { borderColor: catColor + "50" }]}>
                        <Text style={[styles.characterTagText, { color: catColor }]}>{c}</Text>
                      </View>
                    ))}
                  </View>
                </View>
              )}

              {story.moral && (
                <View style={[styles.moralBlock, { borderLeftColor: catColor }]}>
                  <Text style={styles.moralLabel}>Moral</Text>
                  <Text style={styles.moralText}>{story.moral}</Text>
                </View>
              )}

              <Pressable
                style={styles.askArjunaBtn}
                onPress={() => {
                  onClose();
                  router.push({ pathname: "/guide", params: { initialMessage: `Tell me more about the Indonesian folklore story "${story.titleId}" (${story.title}). What are the deeper cultural meanings?` } });
                }}
              >
                <Ionicons name="chatbubble-ellipses" size={16} color="#FFF" />
                <Text style={styles.askArjunaBtnText}>Ask Arjuna about this story</Text>
              </Pressable>
            </View>
          </ScrollView>

          <Pressable style={styles.closeBtn} onPress={onClose}>
            <Ionicons name="close" size={22} color={Colors.text} />
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}

export default function StoriesScreen() {
  const insets = useSafeAreaInsets();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedRegion, setSelectedRegion] = useState<string>('All Regions');
  const [selectedStory, setSelectedStory] = useState<FolkloreStory | null>(null);
  const [search, setSearch] = useState('');

  const topPadding = Platform.OS === "web" ? WEB_TOP_INSET : insets.top;
  const bottomPadding = Platform.OS === "web" ? TAB_BAR_HEIGHT + WEB_BOTTOM_INSET : TAB_BAR_HEIGHT + insets.bottom;

  const categories = ['All', ...Object.keys(CATEGORY_LABELS)];

  const filteredStories = useMemo(() => {
    return FOLKLORE_STORIES.filter(story => {
      const matchCat = selectedCategory === 'All' || story.category === selectedCategory;
      const matchRegion = selectedRegion === 'All Regions' || regionFromStory(story) === selectedRegion;
      return matchCat && matchRegion;
    });
  }, [selectedCategory, selectedRegion]);

  const categoryLabel = (c: string) => c === 'All' ? 'All' : CATEGORY_LABELS[c as StoryCategory] ?? c;
  const catColor = (c: string) => c === 'All' ? Colors.primary : CATEGORY_COLORS[c as StoryCategory] ?? Colors.primary;

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={[styles.header, { paddingTop: topPadding + 12 }]}>
        <Text style={styles.headerTitle}>Cerita Rakyat</Text>
        <Text style={styles.headerSubtitle}>Indonesian Folklore — {FOLKLORE_STORIES.length} Stories</Text>
      </View>

      {/* Category Filter */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.filterRow}
        style={styles.filterScroll}
      >
        {categories.map(cat => (
          <Pressable
            key={cat}
            style={[
              styles.filterPill,
              selectedCategory === cat && { backgroundColor: catColor(cat), borderColor: catColor(cat) }
            ]}
            onPress={() => setSelectedCategory(cat)}
          >
            <Text style={[styles.filterText, selectedCategory === cat && styles.filterTextActive]}>
              {categoryLabel(cat)}
            </Text>
          </Pressable>
        ))}
      </ScrollView>

      {/* Region Filter */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.filterRow}
        style={styles.filterScrollSmall}
      >
        {STORY_REGIONS.map(region => (
          <Pressable
            key={region}
            style={[
              styles.regionPill,
              selectedRegion === region && { backgroundColor: Colors.accent + "22", borderColor: Colors.accent }
            ]}
            onPress={() => setSelectedRegion(region)}
          >
            <Text style={[styles.regionText, selectedRegion === region && { color: Colors.accent }]}>
              {region}
            </Text>
          </Pressable>
        ))}
      </ScrollView>

      {/* Count */}
      <View style={styles.countRow}>
        <Text style={styles.countText}>{filteredStories.length} stories</Text>
      </View>

      {/* Stories Grid */}
      <FlatList
        data={filteredStories}
        keyExtractor={item => item.id}
        numColumns={2}
        columnWrapperStyle={styles.columnWrapper}
        contentContainerStyle={[styles.listContent, { paddingBottom: bottomPadding }]}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <StoryCard story={item} onPress={() => setSelectedStory(item)} />
        )}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <MaterialCommunityIcons name="book-open-variant" size={48} color={Colors.textMuted} />
            <Text style={styles.emptyText}>No stories match your filters</Text>
          </View>
        }
      />

      {selectedStory && (
        <StoryDetailModal story={selectedStory} onClose={() => setSelectedStory(null)} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  header: {
    paddingHorizontal: 20,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  headerTitle: { fontSize: 26, fontFamily: "Inter_700Bold", color: Colors.text },
  headerSubtitle: { fontSize: 12, color: Colors.accent, fontFamily: "Inter_500Medium", marginTop: 2 },
  filterScroll: { borderBottomWidth: 0 },
  filterScrollSmall: { borderBottomWidth: 0, marginTop: 4 },
  filterRow: { paddingHorizontal: 16, paddingVertical: 10, gap: 8 },
  filterPill: {
    paddingHorizontal: 14, paddingVertical: 7,
    borderRadius: 20, borderWidth: 1,
    borderColor: Colors.border,
    backgroundColor: Colors.surface,
  },
  filterText: { fontSize: 13, fontFamily: "Inter_600SemiBold", color: Colors.textSecondary },
  filterTextActive: { color: "#FFF" },
  regionPill: {
    paddingHorizontal: 12, paddingVertical: 5,
    borderRadius: 14, borderWidth: 1,
    borderColor: Colors.border,
    backgroundColor: Colors.surface,
  },
  regionText: { fontSize: 11, fontFamily: "Inter_500Medium", color: Colors.textMuted },
  countRow: { paddingHorizontal: 20, paddingBottom: 8 },
  countText: { fontSize: 12, color: Colors.textMuted, fontFamily: "Inter_500Medium" },
  columnWrapper: { paddingHorizontal: 12, gap: 12 },
  listContent: { paddingTop: 4 },
  storyCard: {
    width: CARD_WIDTH,
    backgroundColor: Colors.surface,
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: Colors.border,
    marginBottom: 12,
  },
  storyCardIllustration: {
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  storyCardBody: { padding: 12 },
  storyCardBadge: {
    paddingHorizontal: 8, paddingVertical: 3,
    borderRadius: 10, alignSelf: 'flex-start', marginBottom: 6,
  },
  storyCardBadgeText: { fontSize: 9, fontFamily: "Inter_600SemiBold" },
  storyCardTitle: { fontSize: 13, fontFamily: "Inter_700Bold", color: Colors.text, marginBottom: 4, lineHeight: 18 },
  storyCardRegion: { fontSize: 10, color: Colors.textMuted, fontFamily: "Inter_500Medium", marginBottom: 4 },
  storyCardSummary: { fontSize: 10, color: Colors.textMuted, fontFamily: "Inter_400Regular", lineHeight: 14 },
  emptyState: { alignItems: 'center', justifyContent: 'center', paddingTop: 80, gap: 14 },
  emptyText: { color: Colors.textMuted, fontFamily: "Inter_500Medium", fontSize: 15 },

  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.65)', justifyContent: 'flex-end' },
  modalSheet: {
    backgroundColor: Colors.backgroundSecondary,
    borderTopLeftRadius: 28, borderTopRightRadius: 28,
    maxHeight: '93%',
    overflow: 'hidden',
  },
  modalHandle: {
    width: 40, height: 4, backgroundColor: Colors.border,
    borderRadius: 2, alignSelf: 'center', marginTop: 14, marginBottom: 0,
  },
  modalScroll: { flex: 1 },
  modalIllustration: {
    height: 140, alignItems: 'center', justifyContent: 'center',
  },
  modalBody: { padding: 20 },
  modalBadgeRow: { flexDirection: 'row', gap: 8, flexWrap: 'wrap', marginBottom: 12 },
  modalBadge: {
    flexDirection: 'row', alignItems: 'center', gap: 4,
    paddingHorizontal: 10, paddingVertical: 4,
    borderRadius: 12,
  },
  modalBadgeText: { fontSize: 11, fontFamily: "Inter_600SemiBold" },
  modalTitle: { fontSize: 22, fontFamily: "Inter_700Bold", color: Colors.text, marginBottom: 4, lineHeight: 28 },
  modalTitleId: { fontSize: 14, color: Colors.accent, fontFamily: "Inter_500Medium", fontStyle: 'italic', marginBottom: 12 },
  modalSummary: {
    fontSize: 14, color: Colors.textSecondary, fontFamily: "Inter_400Regular",
    lineHeight: 22, marginBottom: 16,
    backgroundColor: Colors.surface, padding: 14, borderRadius: 12,
    borderLeftWidth: 3, borderLeftColor: Colors.accent,
  },
  divider: { height: 1, backgroundColor: Colors.border, marginBottom: 16 },
  fullStoryLabel: {
    fontSize: 13, color: Colors.textMuted, fontFamily: "Inter_600SemiBold",
    textTransform: 'uppercase', letterSpacing: 1.2, marginBottom: 14,
  },
  modalFullText: {
    fontSize: 15, color: Colors.text, fontFamily: "Inter_400Regular",
    lineHeight: 26, marginBottom: 20,
  },
  sectionBlock: { marginBottom: 16 },
  sectionBlockTitle: {
    fontSize: 12, color: Colors.textMuted, fontFamily: "Inter_600SemiBold",
    textTransform: 'uppercase', letterSpacing: 1, marginBottom: 10,
  },
  tagRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 6 },
  characterTag: {
    paddingHorizontal: 10, paddingVertical: 5,
    borderRadius: 20, borderWidth: 1,
  },
  characterTagText: { fontSize: 12, fontFamily: "Inter_500Medium" },
  moralBlock: {
    borderLeftWidth: 3, paddingLeft: 14,
    marginBottom: 20, paddingVertical: 2,
  },
  moralLabel: {
    fontSize: 11, color: Colors.textMuted, fontFamily: "Inter_600SemiBold",
    textTransform: 'uppercase', letterSpacing: 1, marginBottom: 6,
  },
  moralText: { fontSize: 14, color: Colors.textSecondary, fontFamily: "Inter_400Regular", lineHeight: 22, fontStyle: 'italic' },
  askArjunaBtn: {
    backgroundColor: Colors.primary, flexDirection: 'row',
    alignItems: 'center', justifyContent: 'center',
    gap: 8, paddingVertical: 14, borderRadius: 14, marginBottom: 10,
  },
  askArjunaBtnText: { color: '#FFF', fontSize: 15, fontFamily: "Inter_600SemiBold" },
  closeBtn: {
    position: 'absolute', top: 14, right: 16,
    backgroundColor: Colors.surface + 'CC',
    borderRadius: 20, width: 36, height: 36,
    alignItems: 'center', justifyContent: 'center',
  },
});
