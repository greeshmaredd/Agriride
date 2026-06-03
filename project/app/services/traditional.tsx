import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { ArrowLeft, Star, MapPin } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors, FontSize, FontWeight, Spacing, BorderRadius, Shadow } from '@/constants/theme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const traditionalServices = [
  { id: 'bullock', label: 'Bullock Cart', icon: '🐂', price: '₹400–600/day', desc: 'Traditional bullock cart for short trips', providers: 3 },
  { id: 'manual', label: 'Manual Ploughing', icon: '⛏️', price: '₹500–800/acre', desc: 'Hand-held plough for small fields', providers: 5 },
  { id: 'manure', label: 'Organic Manure Transport', icon: '🌱', price: '₹300–500/trip', desc: 'Farm yard manure delivery', providers: 4 },
  { id: 'villagelabour', label: 'Village Labour Support', icon: '👥', price: '₹350–450/day', desc: 'Local farm workers per day', providers: 12 },
];

const providers = [
  { name: 'Peddanna Bullock Cart', service: 'Bullock Cart, Manual Work', rating: 4.3, reviews: 45, distance: '0.5 km', available: true, image: 'https://images.pexels.com/photos/2889890/pexels-photo-2889890.jpeg?auto=compress&cs=tinysrgb&w=300' },
  { name: 'Grama Seva Group', service: 'Village Labour, All Traditional', rating: 4.6, reviews: 78, distance: '1.1 km', available: true, image: 'https://images.pexels.com/photos/1595104/pexels-photo-1595104.jpeg?auto=compress&cs=tinysrgb&w=300' },
];

export default function TraditionalScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <LinearGradient colors={[Colors.earth[600], Colors.earth[500], Colors.earth[400]]} style={styles.header}>
        <View style={styles.headerRow}>
          <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
            <ArrowLeft size={22} color={Colors.white} />
          </TouchableOpacity>
          <View style={{ alignItems: 'center' }}>
            <Text style={styles.headerTitle}>Traditional Services</Text>
            <Text style={styles.headerSub}>Our roots, your harvest</Text>
          </View>
          <View style={{ width: 40 }} />
        </View>
      </LinearGradient>

      <ScrollView showsVerticalScrollIndicator={false} style={styles.scroll} contentContainerStyle={styles.scrollContent}>
        <View style={styles.bannerCard}>
          <Text style={styles.bannerEmoji}>🌾</Text>
          <View>
            <Text style={styles.bannerTitle}>Traditional Farming Services</Text>
            <Text style={styles.bannerDesc}>Time-tested methods, affordable rates, trusted by generations</Text>
          </View>
        </View>

        <Text style={styles.sectionLabel}>Available Services</Text>
        <View style={styles.serviceGrid}>
          {traditionalServices.map(s => (
            <TouchableOpacity key={s.id} style={styles.serviceCard} activeOpacity={0.8}>
              <Text style={styles.serviceIcon}>{s.icon}</Text>
              <Text style={styles.serviceLabel}>{s.label}</Text>
              <Text style={styles.serviceDesc}>{s.desc}</Text>
              <Text style={styles.servicePrice}>{s.price}</Text>
              <View style={styles.providerCount}>
                <Text style={styles.providerCountText}>{s.providers} providers</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.sectionLabel}>Nearby Providers</Text>
        {providers.map((p, i) => (
          <TouchableOpacity
            key={i}
            style={styles.providerCard}
            onPress={() => router.push('/services/provider-profile')}
            activeOpacity={0.88}
          >
            <Image source={{ uri: p.image }} style={styles.providerImg} />
            <View style={styles.providerInfo}>
              <Text style={styles.providerName}>{p.name}</Text>
              <Text style={styles.providerService}>{p.service}</Text>
              <View style={styles.metaRow}>
                <Star size={12} color={Colors.secondary[400]} fill={Colors.secondary[400]} />
                <Text style={styles.rating}>{p.rating} ({p.reviews})</Text>
                <View style={styles.dot} />
                <MapPin size={11} color={Colors.neutral[400]} />
                <Text style={styles.dist}>{p.distance}</Text>
              </View>
            </View>
            <TouchableOpacity
              style={styles.bookBtn}
              onPress={() => router.push('/booking/calendar')}
            >
              <Text style={styles.bookBtnText}>Book</Text>
            </TouchableOpacity>
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
  bannerCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.earth[50],
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    gap: Spacing.md,
    borderWidth: 1, borderColor: Colors.earth[200],
  },
  bannerEmoji: { fontSize: 36 },
  bannerTitle: { fontSize: FontSize.md, fontWeight: FontWeight.bold, color: Colors.earth[800] },
  bannerDesc: { fontSize: FontSize.xs, color: Colors.earth[600], marginTop: 2, lineHeight: 18 },
  sectionLabel: { fontSize: FontSize.md, fontWeight: FontWeight.bold, color: Colors.neutral[900] },
  serviceGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  serviceCard: {
    width: '47%',
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    gap: 4, ...Shadow.sm,
    borderWidth: 1, borderColor: Colors.earth[100],
  },
  serviceIcon: { fontSize: 26 },
  serviceLabel: { fontSize: FontSize.sm, fontWeight: FontWeight.bold, color: Colors.earth[800] },
  serviceDesc: { fontSize: 10, color: Colors.neutral[500] },
  servicePrice: { fontSize: FontSize.xs, fontWeight: FontWeight.semibold, color: Colors.earth[600] },
  providerCount: {
    backgroundColor: Colors.earth[50],
    paddingHorizontal: 6, paddingVertical: 2,
    borderRadius: 4, alignSelf: 'flex-start', marginTop: 2,
  },
  providerCountText: { fontSize: 9, color: Colors.earth[600], fontWeight: FontWeight.semibold },
  providerCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    gap: Spacing.md, ...Shadow.sm,
  },
  providerImg: { width: 60, height: 60, borderRadius: 12, backgroundColor: Colors.neutral[200] },
  providerInfo: { flex: 1 },
  providerName: { fontSize: FontSize.md, fontWeight: FontWeight.bold, color: Colors.neutral[900] },
  providerService: { fontSize: FontSize.xs, color: Colors.neutral[500], marginTop: 2 },
  metaRow: { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 4 },
  rating: { fontSize: FontSize.xs, fontWeight: FontWeight.semibold, color: Colors.neutral[700] },
  dot: { width: 3, height: 3, borderRadius: 1.5, backgroundColor: Colors.neutral[300] },
  dist: { fontSize: FontSize.xs, color: Colors.neutral[500] },
  bookBtn: {
    paddingVertical: 8, paddingHorizontal: 14,
    borderRadius: BorderRadius.full,
    backgroundColor: Colors.earth[600],
  },
  bookBtnText: { fontSize: FontSize.sm, fontWeight: FontWeight.bold, color: Colors.white },
});
