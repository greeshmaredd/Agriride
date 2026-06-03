import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity, Image,
} from 'react-native';
import { useRouter } from 'expo-router';
import { ArrowLeft, MapPin, Star, Clock, Filter } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors, FontSize, FontWeight, Spacing, BorderRadius, Shadow } from '@/constants/theme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const services = [
  { id: 'ploughing', label: 'Ploughing', icon: '🚜', price: '₹800–1,200/acre', desc: 'Deep soil turning for optimal crop growth' },
  { id: 'rotavator', label: 'Rotavator', icon: '⚙️', price: '₹600–900/acre', desc: 'Soil pulverization and leveling' },
  { id: 'cultivator', label: 'Cultivator', icon: '🌱', price: '₹500–700/acre', desc: 'Loosens soil between crop rows' },
  { id: 'trailer', label: 'Trailer Service', icon: '📦', price: '₹300–500/hr', desc: 'Farm material and crop transport' },
  { id: 'seeding', label: 'Seeding', icon: '🌾', price: '₹400–600/acre', desc: 'Mechanical seed sowing service' },
];

const providers = [
  { name: 'Ramu Tractor Works', rating: 4.8, reviews: 124, distance: '1.2 km', available: true, price: '₹900/acre', image: 'https://images.pexels.com/photos/2889890/pexels-photo-2889890.jpeg?auto=compress&cs=tinysrgb&w=300' },
  { name: 'Balaji Agri Services', rating: 4.6, reviews: 89, distance: '2.5 km', available: true, price: '₹850/acre', image: 'https://images.pexels.com/photos/1595104/pexels-photo-1595104.jpeg?auto=compress&cs=tinysrgb&w=300' },
  { name: 'Venkateswara Tractors', rating: 4.9, reviews: 201, distance: '3.8 km', available: false, price: '₹950/acre', image: 'https://images.pexels.com/photos/2219024/pexels-photo-2219024.jpeg?auto=compress&cs=tinysrgb&w=300' },
];

export default function TractorScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [activeService, setActiveService] = useState('ploughing');

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <LinearGradient colors={[Colors.primary[700], Colors.primary[500]]} style={styles.header}>
        <View style={styles.headerRow}>
          <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
            <ArrowLeft size={22} color={Colors.white} />
          </TouchableOpacity>
          <View>
            <Text style={styles.headerTitle}>Tractor Work</Text>
            <Text style={styles.headerSub}>14 providers nearby</Text>
          </View>
          <TouchableOpacity style={styles.filterBtn}>
            <Filter size={20} color={Colors.white} />
          </TouchableOpacity>
        </View>
      </LinearGradient>

      <ScrollView showsVerticalScrollIndicator={false} style={styles.scroll} contentContainerStyle={styles.scrollContent}>
        <Text style={styles.sectionLabel}>Select Service Type</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.serviceScroll}>
          {services.map(s => (
            <TouchableOpacity
              key={s.id}
              style={[styles.serviceChip, activeService === s.id && styles.serviceChipActive]}
              onPress={() => setActiveService(s.id)}
            >
              <Text style={styles.serviceEmoji}>{s.icon}</Text>
              <Text style={[styles.serviceChipText, activeService === s.id && styles.serviceChipTextActive]}>
                {s.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {activeService && (() => {
          const s = services.find(x => x.id === activeService)!;
          return (
            <View style={styles.selectedCard}>
              <Text style={styles.selectedEmoji}>{s.icon}</Text>
              <View style={{ flex: 1 }}>
                <Text style={styles.selectedLabel}>{s.label}</Text>
                <Text style={styles.selectedDesc}>{s.desc}</Text>
                <Text style={styles.selectedPrice}>{s.price}</Text>
              </View>
            </View>
          );
        })()}

        <Text style={styles.sectionLabel}>Available Providers</Text>
        {providers.map((p, i) => (
          <TouchableOpacity
            key={i}
            style={styles.providerCard}
            onPress={() => router.push('/services/vehicle-detail')}
            activeOpacity={0.88}
          >
            <Image source={{ uri: p.image }} style={styles.providerImg} />
            <View style={styles.providerInfo}>
              <Text style={styles.providerName}>{p.name}</Text>
              <View style={styles.ratingRow}>
                <Star size={13} color={Colors.secondary[400]} fill={Colors.secondary[400]} />
                <Text style={styles.rating}>{p.rating}</Text>
                <Text style={styles.reviews}>({p.reviews} reviews)</Text>
              </View>
              <View style={styles.metaRow}>
                <View style={styles.metaItem}>
                  <MapPin size={12} color={Colors.neutral[400]} />
                  <Text style={styles.metaText}>{p.distance}</Text>
                </View>
                <View style={styles.metaItem}>
                  <Clock size={12} color={Colors.neutral[400]} />
                  <Text style={styles.metaText}>{p.available ? 'Available Now' : 'Busy'}</Text>
                </View>
              </View>
              <View style={styles.priceRow}>
                <Text style={styles.priceText}>{p.price}</Text>
                <TouchableOpacity
                  style={[styles.bookBtn, !p.available && styles.bookBtnDisabled]}
                  onPress={() => router.push('/booking/calendar')}
                  disabled={!p.available}
                >
                  <Text style={styles.bookBtnText}>{p.available ? 'Book Now' : 'Busy'}</Text>
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: Spacing.sm,
  },
  backBtn: {
    width: 40, height: 40, borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center', justifyContent: 'center',
  },
  headerTitle: { fontSize: FontSize.xl, fontWeight: FontWeight.bold, color: Colors.white, textAlign: 'center' },
  headerSub: { fontSize: FontSize.xs, color: 'rgba(255,255,255,0.8)', textAlign: 'center' },
  filterBtn: {
    width: 40, height: 40, borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center', justifyContent: 'center',
  },
  scroll: { flex: 1 },
  scrollContent: { padding: Spacing.md, gap: Spacing.md },
  sectionLabel: {
    fontSize: FontSize.md,
    fontWeight: FontWeight.bold,
    color: Colors.neutral[900],
  },
  serviceScroll: { marginHorizontal: -Spacing.md, paddingHorizontal: Spacing.md },
  serviceChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingVertical: 9,
    paddingHorizontal: Spacing.md,
    borderRadius: BorderRadius.full,
    backgroundColor: Colors.white,
    borderWidth: 1.5,
    borderColor: Colors.neutral[200],
    marginRight: 8,
    ...Shadow.sm,
  },
  serviceChipActive: {
    backgroundColor: Colors.primary[600],
    borderColor: Colors.primary[600],
  },
  serviceEmoji: { fontSize: 16 },
  serviceChipText: {
    fontSize: FontSize.sm,
    fontWeight: FontWeight.semibold,
    color: Colors.neutral[700],
  },
  serviceChipTextActive: { color: Colors.white },
  selectedCard: {
    flexDirection: 'row',
    backgroundColor: Colors.primary[50],
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    gap: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.primary[200],
    alignItems: 'center',
  },
  selectedEmoji: { fontSize: 32 },
  selectedLabel: { fontSize: FontSize.md, fontWeight: FontWeight.bold, color: Colors.primary[800] },
  selectedDesc: { fontSize: FontSize.xs, color: Colors.neutral[600], marginTop: 2 },
  selectedPrice: { fontSize: FontSize.sm, fontWeight: FontWeight.semibold, color: Colors.primary[600], marginTop: 4 },
  providerCard: {
    flexDirection: 'row',
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.lg,
    overflow: 'hidden',
    ...Shadow.sm,
  },
  providerImg: { width: 90, height: 110, backgroundColor: Colors.neutral[200] },
  providerInfo: { flex: 1, padding: Spacing.md, gap: 4 },
  providerName: { fontSize: FontSize.md, fontWeight: FontWeight.bold, color: Colors.neutral[900] },
  ratingRow: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  rating: { fontSize: FontSize.sm, fontWeight: FontWeight.bold, color: Colors.neutral[800] },
  reviews: { fontSize: FontSize.xs, color: Colors.neutral[500] },
  metaRow: { flexDirection: 'row', gap: 12 },
  metaItem: { flexDirection: 'row', alignItems: 'center', gap: 3 },
  metaText: { fontSize: FontSize.xs, color: Colors.neutral[500] },
  priceRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 4 },
  priceText: { fontSize: FontSize.md, fontWeight: FontWeight.bold, color: Colors.primary[700] },
  bookBtn: {
    paddingVertical: 7,
    paddingHorizontal: 16,
    borderRadius: BorderRadius.full,
    backgroundColor: Colors.primary[600],
  },
  bookBtnDisabled: { backgroundColor: Colors.neutral[300] },
  bookBtnText: { fontSize: FontSize.sm, fontWeight: FontWeight.bold, color: Colors.white },
});
