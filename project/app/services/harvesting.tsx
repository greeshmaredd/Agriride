import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { ArrowLeft, MapPin, Star, Filter } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors, FontSize, FontWeight, Spacing, BorderRadius, Shadow } from '@/constants/theme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const cropTypes = ['All', 'Paddy', 'Wheat', 'Sugarcane', 'Groundnut'];

const harvesters = [
  { name: 'Sai Paddy Harvester', crop: 'Paddy', rating: 4.9, reviews: 156, distance: '0.8 km', price: '₹1,500/acre', available: true, image: 'https://images.pexels.com/photos/1595104/pexels-photo-1595104.jpeg?auto=compress&cs=tinysrgb&w=300' },
  { name: 'Govind Wheat Combine', crop: 'Wheat', rating: 4.7, reviews: 98, distance: '2.2 km', price: '₹1,800/acre', available: true, image: 'https://images.pexels.com/photos/2889890/pexels-photo-2889890.jpeg?auto=compress&cs=tinysrgb&w=300' },
  { name: 'Sugarcane Harvester Pro', crop: 'Sugarcane', rating: 4.5, reviews: 67, distance: '4.1 km', price: '₹2,500/acre', available: false, image: 'https://images.pexels.com/photos/2219024/pexels-photo-2219024.jpeg?auto=compress&cs=tinysrgb&w=300' },
  { name: 'Groundnut Digger', crop: 'Groundnut', rating: 4.6, reviews: 43, distance: '3.5 km', price: '₹1,200/acre', available: true, image: 'https://images.pexels.com/photos/1595104/pexels-photo-1595104.jpeg?auto=compress&cs=tinysrgb&w=300' },
];

export default function HarvestingScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [cropFilter, setCropFilter] = useState('All');

  const filtered = cropFilter === 'All' ? harvesters : harvesters.filter(h => h.crop === cropFilter);

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <LinearGradient colors={[Colors.secondary[600], Colors.secondary[400]]} style={styles.header}>
        <View style={styles.headerRow}>
          <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
            <ArrowLeft size={22} color={Colors.white} />
          </TouchableOpacity>
          <View style={{ alignItems: 'center' }}>
            <Text style={styles.headerTitle}>Harvesting Services</Text>
            <Text style={styles.headerSub}>8 harvesters available</Text>
          </View>
          <TouchableOpacity style={styles.backBtn}>
            <Filter size={20} color={Colors.white} />
          </TouchableOpacity>
        </View>
      </LinearGradient>

      <ScrollView showsVerticalScrollIndicator={false} style={styles.scroll} contentContainerStyle={styles.scrollContent}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterScroll}>
          {cropTypes.map(c => (
            <TouchableOpacity
              key={c}
              style={[styles.filterChip, cropFilter === c && styles.filterChipActive]}
              onPress={() => setCropFilter(c)}
            >
              <Text style={[styles.filterText, cropFilter === c && styles.filterTextActive]}>{c}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {filtered.map((h, i) => (
          <TouchableOpacity
            key={i}
            style={styles.card}
            onPress={() => router.push('/services/vehicle-detail')}
            activeOpacity={0.88}
          >
            <Image source={{ uri: h.image }} style={styles.cardImg} />
            <View style={styles.cardContent}>
              <View style={styles.topRow}>
                <Text style={styles.cardName}>{h.name}</Text>
                <View style={[styles.cropBadge, { backgroundColor: Colors.secondary[100] }]}>
                  <Text style={[styles.cropText, { color: Colors.secondary[700] }]}>{h.crop}</Text>
                </View>
              </View>
              <View style={styles.ratingRow}>
                <Star size={13} color={Colors.secondary[400]} fill={Colors.secondary[400]} />
                <Text style={styles.rating}>{h.rating}</Text>
                <Text style={styles.reviews}>({h.reviews})</Text>
                <View style={styles.dot} />
                <MapPin size={11} color={Colors.neutral[400]} />
                <Text style={styles.distText}>{h.distance}</Text>
              </View>
              <View style={styles.bottomRow}>
                <Text style={styles.price}>{h.price}</Text>
                <TouchableOpacity
                  style={[styles.bookBtn, !h.available && styles.bookBtnDisabled]}
                  onPress={() => router.push('/booking/calendar')}
                  disabled={!h.available}
                >
                  <Text style={styles.bookBtnText}>{h.available ? 'Book Now' : 'Unavailable'}</Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.neutral[50] },
  header: { paddingHorizontal: Spacing.md, paddingBottom: Spacing.lg },
  headerRow: {
    flexDirection: 'row', alignItems: 'center',
    justifyContent: 'space-between', marginTop: Spacing.sm,
  },
  backBtn: {
    width: 40, height: 40, borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center', justifyContent: 'center',
  },
  headerTitle: { fontSize: FontSize.xl, fontWeight: FontWeight.bold, color: Colors.white },
  headerSub: { fontSize: FontSize.xs, color: 'rgba(255,255,255,0.8)' },
  scroll: { flex: 1 },
  scrollContent: { padding: Spacing.md, gap: Spacing.md },
  filterScroll: { marginHorizontal: -Spacing.md, paddingHorizontal: Spacing.md },
  filterChip: {
    paddingVertical: 8, paddingHorizontal: 16,
    borderRadius: BorderRadius.full,
    backgroundColor: Colors.white,
    borderWidth: 1.5, borderColor: Colors.neutral[200],
    marginRight: 8, ...Shadow.sm,
  },
  filterChipActive: {
    backgroundColor: Colors.secondary[500],
    borderColor: Colors.secondary[500],
  },
  filterText: { fontSize: FontSize.sm, fontWeight: FontWeight.semibold, color: Colors.neutral[700] },
  filterTextActive: { color: Colors.white },
  card: {
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.lg,
    overflow: 'hidden',
    ...Shadow.sm,
  },
  cardImg: { width: '100%', height: 140, backgroundColor: Colors.neutral[200] },
  cardContent: { padding: Spacing.md, gap: 6 },
  topRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  cardName: { fontSize: FontSize.md, fontWeight: FontWeight.bold, color: Colors.neutral[900], flex: 1 },
  cropBadge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: BorderRadius.full },
  cropText: { fontSize: FontSize.xs, fontWeight: FontWeight.semibold },
  ratingRow: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  rating: { fontSize: FontSize.sm, fontWeight: FontWeight.bold, color: Colors.neutral[800] },
  reviews: { fontSize: FontSize.xs, color: Colors.neutral[500] },
  dot: { width: 3, height: 3, borderRadius: 1.5, backgroundColor: Colors.neutral[300] },
  distText: { fontSize: FontSize.xs, color: Colors.neutral[500] },
  bottomRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 4 },
  price: { fontSize: FontSize.md, fontWeight: FontWeight.bold, color: Colors.secondary[600] },
  bookBtn: {
    paddingVertical: 8, paddingHorizontal: 18,
    borderRadius: BorderRadius.full,
    backgroundColor: Colors.secondary[500],
  },
  bookBtnDisabled: { backgroundColor: Colors.neutral[300] },
  bookBtnText: { fontSize: FontSize.sm, fontWeight: FontWeight.bold, color: Colors.white },
});
