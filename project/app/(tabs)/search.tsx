import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity,
  TextInput, Dimensions,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Search, Mic, X, Filter, Sliders, Clock, TrendingUp } from 'lucide-react-native';
import { Colors, FontSize, FontWeight, Spacing, BorderRadius, Shadow } from '@/constants/theme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const popularServices = [
  { label: 'Tractor Ploughing', icon: '🚜', category: 'Tractor Work' },
  { label: 'Paddy Harvester', icon: '🌾', category: 'Harvesting' },
  { label: 'Drone Spraying', icon: '🚁', category: 'Sprayer' },
  { label: 'JCB Land Leveling', icon: '🚧', category: 'JCB' },
  { label: 'Borewell Drilling', icon: '⛏️', category: 'Borewell' },
  { label: 'Drip Irrigation', icon: '💧', category: 'Irrigation' },
];

const recentSearches = [
  'Tractor near Kurnool', 'Paddy harvester price', 'Rotavator service', 'Bore motor repair',
];

const filters = {
  distance: ['< 1 km', '< 3 km', '< 5 km', '< 10 km'],
  price: ['Under ₹500', '₹500–1000', '₹1000–2000', '₹2000+'],
  rating: ['4.5+', '4.0+', '3.5+', 'All'],
};

export default function SearchScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [query, setQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [activeDistance, setActiveDistance] = useState('< 5 km');
  const [activeRating, setActiveRating] = useState('4.0+');

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Search Services</Text>
        <View style={styles.searchRow}>
          <View style={styles.searchWrap}>
            <Search size={18} color={Colors.neutral[400]} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search tractors, JCB, irrigation..."
              placeholderTextColor={Colors.neutral[400]}
              value={query}
              onChangeText={setQuery}
              autoFocus={false}
            />
            {query ? (
              <TouchableOpacity onPress={() => setQuery('')}>
                <X size={16} color={Colors.neutral[400]} />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity style={styles.micBtn}>
                <Mic size={18} color={Colors.primary[600]} />
              </TouchableOpacity>
            )}
          </View>
          <TouchableOpacity
            style={[styles.filterBtn, showFilters && styles.filterBtnActive]}
            onPress={() => setShowFilters(!showFilters)}
          >
            <Sliders size={20} color={showFilters ? Colors.white : Colors.primary[600]} />
          </TouchableOpacity>
        </View>

        {showFilters && (
          <View style={styles.filtersPanel}>
            <Text style={styles.filterGroupLabel}>Distance</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {filters.distance.map(d => (
                <TouchableOpacity
                  key={d}
                  style={[styles.filterChip, activeDistance === d && styles.filterChipActive]}
                  onPress={() => setActiveDistance(d)}
                >
                  <Text style={[styles.filterChipText, activeDistance === d && styles.filterChipTextActive]}>{d}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
            <Text style={styles.filterGroupLabel}>Minimum Rating</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {filters.rating.map(r => (
                <TouchableOpacity
                  key={r}
                  style={[styles.filterChip, activeRating === r && styles.filterChipActive]}
                  onPress={() => setActiveRating(r)}
                >
                  <Text style={[styles.filterChipText, activeRating === r && styles.filterChipTextActive]}>⭐ {r}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        )}
      </View>

      <ScrollView showsVerticalScrollIndicator={false} style={styles.scroll} contentContainerStyle={styles.scrollContent}>
        {!query ? (
          <>
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Clock size={16} color={Colors.neutral[500]} />
                <Text style={styles.sectionTitle}>Recent Searches</Text>
              </View>
              {recentSearches.map((r, i) => (
                <TouchableOpacity
                  key={i}
                  style={styles.recentItem}
                  onPress={() => setQuery(r)}
                >
                  <Clock size={14} color={Colors.neutral[400]} />
                  <Text style={styles.recentText}>{r}</Text>
                  <X size={12} color={Colors.neutral[300]} />
                </TouchableOpacity>
              ))}
            </View>

            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <TrendingUp size={16} color={Colors.primary[600]} />
                <Text style={styles.sectionTitle}>Popular Services</Text>
              </View>
              <View style={styles.popularGrid}>
                {popularServices.map((s, i) => (
                  <TouchableOpacity
                    key={i}
                    style={styles.popularCard}
                    onPress={() => router.push('/services/nearby')}
                    activeOpacity={0.8}
                  >
                    <Text style={styles.popularIcon}>{s.icon}</Text>
                    <Text style={styles.popularLabel}>{s.label}</Text>
                    <Text style={styles.popularCategory}>{s.category}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </>
        ) : (
          <View style={styles.searchResults}>
            <Text style={styles.resultsLabel}>Results for "{query}"</Text>
            {popularServices
              .filter(s => s.label.toLowerCase().includes(query.toLowerCase()))
              .map((s, i) => (
                <TouchableOpacity
                  key={i}
                  style={styles.resultItem}
                  onPress={() => router.push('/services/nearby')}
                >
                  <Text style={styles.resultIcon}>{s.icon}</Text>
                  <View>
                    <Text style={styles.resultLabel}>{s.label}</Text>
                    <Text style={styles.resultCategory}>{s.category}</Text>
                  </View>
                </TouchableOpacity>
              ))}
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.neutral[50] },
  header: {
    backgroundColor: Colors.white,
    paddingHorizontal: Spacing.md,
    paddingBottom: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.neutral[100],
    gap: Spacing.md,
  },
  headerTitle: { fontSize: FontSize.xl, fontWeight: FontWeight.bold, color: Colors.neutral[900], marginTop: Spacing.md },
  searchRow: { flexDirection: 'row', gap: Spacing.sm },
  searchWrap: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.neutral[50],
    borderRadius: BorderRadius.full,
    paddingHorizontal: Spacing.md,
    height: 48,
    gap: Spacing.sm,
    borderWidth: 1.5, borderColor: Colors.neutral[200],
  },
  searchInput: { flex: 1, fontSize: FontSize.md, color: Colors.neutral[900] },
  micBtn: {},
  filterBtn: {
    width: 48, height: 48,
    borderRadius: BorderRadius.full,
    backgroundColor: Colors.primary[50],
    alignItems: 'center', justifyContent: 'center',
    borderWidth: 1.5, borderColor: Colors.primary[200],
  },
  filterBtnActive: { backgroundColor: Colors.primary[600], borderColor: Colors.primary[600] },
  filtersPanel: { gap: 8 },
  filterGroupLabel: { fontSize: FontSize.xs, fontWeight: FontWeight.semibold, color: Colors.neutral[600], textTransform: 'uppercase', letterSpacing: 0.5 },
  filterChip: {
    paddingVertical: 7, paddingHorizontal: 14,
    borderRadius: BorderRadius.full,
    backgroundColor: Colors.neutral[100],
    borderWidth: 1, borderColor: Colors.neutral[200],
    marginRight: 8,
  },
  filterChipActive: { backgroundColor: Colors.primary[600], borderColor: Colors.primary[600] },
  filterChipText: { fontSize: FontSize.xs, fontWeight: FontWeight.semibold, color: Colors.neutral[700] },
  filterChipTextActive: { color: Colors.white },
  scroll: { flex: 1 },
  scrollContent: { padding: Spacing.md, gap: Spacing.lg },
  section: { gap: Spacing.md },
  sectionHeader: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  sectionTitle: { fontSize: FontSize.md, fontWeight: FontWeight.bold, color: Colors.neutral[900] },
  recentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.neutral[100],
  },
  recentText: { flex: 1, fontSize: FontSize.md, color: Colors.neutral[700] },
  popularGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  popularCard: {
    width: '47%',
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    gap: 4,
    ...Shadow.sm,
  },
  popularIcon: { fontSize: 26 },
  popularLabel: { fontSize: FontSize.sm, fontWeight: FontWeight.semibold, color: Colors.neutral[900] },
  popularCategory: { fontSize: FontSize.xs, color: Colors.neutral[500] },
  searchResults: { gap: Spacing.sm },
  resultsLabel: { fontSize: FontSize.sm, color: Colors.neutral[500], fontWeight: FontWeight.medium },
  resultItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    gap: Spacing.md,
    ...Shadow.sm,
  },
  resultIcon: { fontSize: 24 },
  resultLabel: { fontSize: FontSize.md, fontWeight: FontWeight.semibold, color: Colors.neutral[900] },
  resultCategory: { fontSize: FontSize.xs, color: Colors.neutral[500] },
});
