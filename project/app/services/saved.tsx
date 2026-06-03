import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity, Image,
} from 'react-native';
import { useRouter } from 'expo-router';
import { ArrowLeft, Bookmark, Star, MapPin, Trash2, ChevronRight } from 'lucide-react-native';
import { Colors, FontSize, FontWeight, Spacing, BorderRadius, Shadow } from '@/constants/theme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const savedItems = [
  { id: 1, type: 'service', name: 'Tractor Ploughing', provider: 'Ramu Kumar', location: 'Kurnool, AP', rating: 4.8, price: '₹800/ac', image: 'https://images.pexels.com/photos/2889890/pexels-photo-2889890.jpeg?auto=compress&cs=tinysrgb&w=200', available: true },
  { id: 2, type: 'service', name: 'Paddy Harvester', provider: 'Sai Harvester', location: 'Nellore, AP', rating: 4.9, price: '₹2,200/ac', image: 'https://images.pexels.com/photos/1595104/pexels-photo-1595104.jpeg?auto=compress&cs=tinysrgb&w=200', available: true },
  { id: 3, type: 'service', name: 'Drone Sprayer', provider: 'AgroSprint', location: 'Guntur, AP', rating: 4.7, price: '₹600/ac', image: 'https://images.pexels.com/photos/2889890/pexels-photo-2889890.jpeg?auto=compress&cs=tinysrgb&w=200', available: false },
  { id: 4, type: 'provider', name: 'Mahendra JCB', provider: 'JCB & Excavator', location: 'Kadapa, AP', rating: 4.6, price: '₹1,200/hr', image: 'https://images.pexels.com/photos/2219024/pexels-photo-2219024.jpeg?auto=compress&cs=tinysrgb&w=200', available: true },
];

export default function SavedServicesScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [saved, setSaved] = useState(savedItems);
  const [activeFilter, setActiveFilter] = useState<'all' | 'available'>('all');

  const filtered = activeFilter === 'available' ? saved.filter(s => s.available) : saved;

  const removeItem = (id: number) => setSaved(prev => prev.filter(s => s.id !== id));

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <ArrowLeft size={22} color={Colors.neutral[800]} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Saved Services</Text>
        <View style={styles.countBadge}>
          <Text style={styles.countText}>{saved.length}</Text>
        </View>
      </View>

      <View style={styles.filterRow}>
        {(['all', 'available'] as const).map(f => (
          <TouchableOpacity
            key={f}
            style={[styles.filterChip, activeFilter === f && styles.filterChipActive]}
            onPress={() => setActiveFilter(f)}
          >
            <Text style={[styles.filterText, activeFilter === f && styles.filterTextActive]}>
              {f === 'all' ? 'All Saved' : 'Available Now'}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {filtered.length === 0 ? (
          <View style={styles.emptyState}>
            <Bookmark size={48} color={Colors.neutral[300]} />
            <Text style={styles.emptyTitle}>No saved services</Text>
            <Text style={styles.emptyText}>Browse services and tap the bookmark icon to save them here</Text>
            <TouchableOpacity style={styles.browseBtn} onPress={() => router.push('/services/categories')}>
              <Text style={styles.browseBtnText}>Browse Services</Text>
            </TouchableOpacity>
          </View>
        ) : (
          filtered.map(item => (
            <TouchableOpacity
              key={item.id}
              style={styles.savedCard}
              onPress={() => router.push('/services/vehicle-detail')}
              activeOpacity={0.88}
            >
              <Image source={{ uri: item.image }} style={styles.cardImage} />
              <View style={styles.cardContent}>
                <View style={styles.cardTop}>
                  <Text style={styles.cardName}>{item.name}</Text>
                  <TouchableOpacity
                    style={styles.removeBtn}
                    onPress={() => removeItem(item.id)}
                  >
                    <Trash2 size={14} color={Colors.error[500]} />
                  </TouchableOpacity>
                </View>
                <Text style={styles.cardProvider}>{item.provider}</Text>
                <View style={styles.cardMeta}>
                  <MapPin size={12} color={Colors.neutral[400]} />
                  <Text style={styles.cardLocation}>{item.location}</Text>
                </View>
                <View style={styles.cardBottom}>
                  <View style={styles.ratingWrap}>
                    <Star size={12} color={Colors.secondary[400]} fill={Colors.secondary[400]} />
                    <Text style={styles.ratingText}>{item.rating}</Text>
                  </View>
                  <Text style={styles.priceText}>{item.price}</Text>
                  <View style={[styles.availBadge, { backgroundColor: item.available ? Colors.success[50] : Colors.neutral[100] }]}>
                    <Text style={[styles.availText, { color: item.available ? Colors.success[700] : Colors.neutral[500] }]}>
                      {item.available ? 'Available' : 'Busy'}
                    </Text>
                  </View>
                </View>
                <TouchableOpacity
                  style={[styles.bookBtn, !item.available && styles.bookBtnDisabled]}
                  disabled={!item.available}
                  onPress={() => router.push('/booking/calendar')}
                >
                  <Text style={[styles.bookBtnText, !item.available && styles.bookBtnTextDisabled]}>
                    {item.available ? 'Book Now' : 'Not Available'}
                  </Text>
                  {item.available && <ChevronRight size={14} color={Colors.primary[600]} />}
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          ))
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.neutral[50] },
  header: {
    flexDirection: 'row', alignItems: 'center',
    paddingHorizontal: Spacing.md, paddingVertical: Spacing.md,
    backgroundColor: Colors.white, borderBottomWidth: 1, borderBottomColor: Colors.neutral[100],
    gap: Spacing.sm,
  },
  backBtn: { width: 36, height: 36, borderRadius: 18, backgroundColor: Colors.neutral[100], alignItems: 'center', justifyContent: 'center' },
  headerTitle: { flex: 1, fontSize: FontSize.lg, fontWeight: FontWeight.bold, color: Colors.neutral[900] },
  countBadge: {
    width: 28, height: 28, borderRadius: 14,
    backgroundColor: Colors.primary[100], alignItems: 'center', justifyContent: 'center',
  },
  countText: { fontSize: FontSize.sm, fontWeight: FontWeight.bold, color: Colors.primary[700] },
  filterRow: {
    flexDirection: 'row', gap: Spacing.sm,
    paddingHorizontal: Spacing.md, paddingVertical: Spacing.sm,
    backgroundColor: Colors.white, borderBottomWidth: 1, borderBottomColor: Colors.neutral[100],
  },
  filterChip: {
    paddingVertical: 7, paddingHorizontal: 14, borderRadius: BorderRadius.full,
    borderWidth: 1.5, borderColor: Colors.neutral[200], backgroundColor: Colors.neutral[100],
  },
  filterChipActive: { backgroundColor: Colors.primary[600], borderColor: Colors.primary[600] },
  filterText: { fontSize: FontSize.sm, fontWeight: FontWeight.semibold, color: Colors.neutral[600] },
  filterTextActive: { color: Colors.white },
  scrollContent: { padding: Spacing.md, gap: Spacing.md, paddingBottom: 40 },
  emptyState: { alignItems: 'center', paddingVertical: 60, gap: 12 },
  emptyTitle: { fontSize: FontSize.lg, fontWeight: FontWeight.bold, color: Colors.neutral[700] },
  emptyText: { fontSize: FontSize.sm, color: Colors.neutral[400], textAlign: 'center' },
  browseBtn: {
    backgroundColor: Colors.primary[600], borderRadius: BorderRadius.lg,
    paddingVertical: 10, paddingHorizontal: 24, marginTop: 8,
  },
  browseBtnText: { fontSize: FontSize.sm, fontWeight: FontWeight.bold, color: Colors.white },
  savedCard: {
    flexDirection: 'row', backgroundColor: Colors.white, borderRadius: BorderRadius.lg,
    overflow: 'hidden', ...Shadow.sm,
  },
  cardImage: { width: 90, height: 140 },
  cardContent: { flex: 1, padding: Spacing.md, gap: 5 },
  cardTop: { flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between' },
  cardName: { flex: 1, fontSize: FontSize.md, fontWeight: FontWeight.bold, color: Colors.neutral[900] },
  removeBtn: { padding: 4 },
  cardProvider: { fontSize: FontSize.xs, color: Colors.neutral[500] },
  cardMeta: { flexDirection: 'row', alignItems: 'center', gap: 3 },
  cardLocation: { fontSize: FontSize.xs, color: Colors.neutral[400] },
  cardBottom: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  ratingWrap: { flexDirection: 'row', alignItems: 'center', gap: 3 },
  ratingText: { fontSize: FontSize.xs, fontWeight: FontWeight.bold, color: Colors.neutral[800] },
  priceText: { fontSize: FontSize.xs, fontWeight: FontWeight.bold, color: Colors.primary[700], flex: 1 },
  availBadge: { paddingHorizontal: 7, paddingVertical: 2, borderRadius: BorderRadius.full },
  availText: { fontSize: 10, fontWeight: FontWeight.semibold },
  bookBtn: {
    flexDirection: 'row', alignItems: 'center', gap: 4,
    backgroundColor: Colors.primary[50], borderRadius: BorderRadius.md,
    paddingVertical: 6, paddingHorizontal: 10,
    borderWidth: 1, borderColor: Colors.primary[200], alignSelf: 'flex-start',
  },
  bookBtnDisabled: { backgroundColor: Colors.neutral[100], borderColor: Colors.neutral[200] },
  bookBtnText: { fontSize: FontSize.xs, fontWeight: FontWeight.semibold, color: Colors.primary[600] },
  bookBtnTextDisabled: { color: Colors.neutral[400] },
});
