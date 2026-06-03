import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { ArrowLeft, MapPin, Star } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors, FontSize, FontWeight, Spacing, BorderRadius, Shadow } from '@/constants/theme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const jcbServices = [
  { id: 'leveling', label: 'Land Leveling', icon: '🏔️', desc: 'Flat land for farming', price: '₹2,000–3,500/hr' },
  { id: 'pond', label: 'Pond Digging', icon: '💧', desc: 'Farm pond excavation', price: '₹3,000–5,000/hr' },
  { id: 'road', label: 'Farm Road', icon: '🛣️', desc: 'Farm access road work', price: '₹2,500–4,000/hr' },
  { id: 'trench', label: 'Trench Digging', icon: '⛏️', desc: 'Irrigation trenches', price: '₹1,800–3,000/hr' },
];

const providers = [
  { name: 'Srinivas JCB Works', service: 'Land Leveling, Pond Digging', rating: 4.8, reviews: 76, distance: '2.1 km', price: '₹2,500/hr', available: true, image: 'https://images.pexels.com/photos/2219024/pexels-photo-2219024.jpeg?auto=compress&cs=tinysrgb&w=300' },
  { name: 'Mahendra Earthworks', service: 'All JCB Services', rating: 4.9, reviews: 134, distance: '3.6 km', price: '₹2,800/hr', available: false, image: 'https://images.pexels.com/photos/2889890/pexels-photo-2889890.jpeg?auto=compress&cs=tinysrgb&w=300' },
];

export default function JCBScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <LinearGradient colors={['#d97706', '#f59e0b']} style={styles.header}>
        <View style={styles.headerRow}>
          <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
            <ArrowLeft size={22} color={Colors.white} />
          </TouchableOpacity>
          <View style={{ alignItems: 'center' }}>
            <Text style={styles.headerTitle}>JCB Services</Text>
            <Text style={styles.headerSub}>Earthwork & Excavation</Text>
          </View>
          <View style={{ width: 40 }} />
        </View>
      </LinearGradient>

      <ScrollView showsVerticalScrollIndicator={false} style={styles.scroll} contentContainerStyle={styles.scrollContent}>
        <View style={styles.jcbHero}>
          <Text style={styles.heroEmoji}>🚧</Text>
          <View>
            <Text style={styles.heroTitle}>JCB Excavation Services</Text>
            <Text style={styles.heroDesc}>Professional earthwork for farm development</Text>
          </View>
        </View>

        <Text style={styles.sectionLabel}>Service Types</Text>
        <View style={styles.serviceGrid}>
          {jcbServices.map(s => (
            <View key={s.id} style={styles.serviceCard}>
              <Text style={styles.serviceIcon}>{s.icon}</Text>
              <Text style={styles.serviceLabel}>{s.label}</Text>
              <Text style={styles.serviceDesc}>{s.desc}</Text>
              <Text style={styles.servicePrice}>{s.price}</Text>
            </View>
          ))}
        </View>

        <Text style={styles.sectionLabel}>Available JCB Operators</Text>
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
              <Text style={styles.providerService}>{p.service}</Text>
              <View style={styles.metaRow}>
                <Star size={12} color={Colors.secondary[400]} fill={Colors.secondary[400]} />
                <Text style={styles.rating}>{p.rating} ({p.reviews})</Text>
                <MapPin size={11} color={Colors.neutral[400]} />
                <Text style={styles.dist}>{p.distance}</Text>
              </View>
              <View style={styles.bottomRow}>
                <Text style={styles.price}>{p.price}</Text>
                <TouchableOpacity
                  style={[styles.bookBtn, !p.available && styles.bookBtnDisabled]}
                  disabled={!p.available}
                  onPress={() => router.push('/booking/calendar')}
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
  jcbHero: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fef9c3',
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    gap: Spacing.md,
    borderWidth: 1,
    borderColor: '#fde047',
  },
  heroEmoji: { fontSize: 40 },
  heroTitle: { fontSize: FontSize.md, fontWeight: FontWeight.bold, color: '#92400e' },
  heroDesc: { fontSize: FontSize.xs, color: '#a16207', marginTop: 2 },
  sectionLabel: { fontSize: FontSize.md, fontWeight: FontWeight.bold, color: Colors.neutral[900] },
  serviceGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  serviceCard: {
    width: '47%',
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    gap: 4,
    ...Shadow.sm,
    borderWidth: 1,
    borderColor: Colors.neutral[200],
  },
  serviceIcon: { fontSize: 24 },
  serviceLabel: { fontSize: FontSize.sm, fontWeight: FontWeight.bold, color: Colors.neutral[900] },
  serviceDesc: { fontSize: 10, color: Colors.neutral[500] },
  servicePrice: { fontSize: FontSize.xs, fontWeight: FontWeight.semibold, color: '#d97706' },
  providerCard: {
    flexDirection: 'row',
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    gap: Spacing.md,
    ...Shadow.sm,
  },
  providerImg: { width: 80, height: 90, borderRadius: 12, backgroundColor: Colors.neutral[200] },
  providerInfo: { flex: 1, gap: 5 },
  providerName: { fontSize: FontSize.md, fontWeight: FontWeight.bold, color: Colors.neutral[900] },
  providerService: { fontSize: FontSize.xs, color: Colors.neutral[500] },
  metaRow: { flexDirection: 'row', alignItems: 'center', gap: 5 },
  rating: { fontSize: FontSize.xs, fontWeight: FontWeight.semibold, color: Colors.neutral[700] },
  dist: { fontSize: FontSize.xs, color: Colors.neutral[500] },
  bottomRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  price: { fontSize: FontSize.md, fontWeight: FontWeight.bold, color: '#d97706' },
  bookBtn: {
    paddingVertical: 8, paddingHorizontal: 16,
    borderRadius: BorderRadius.full,
    backgroundColor: '#d97706',
  },
  bookBtnDisabled: { backgroundColor: Colors.neutral[300] },
  bookBtnText: { fontSize: FontSize.sm, fontWeight: FontWeight.bold, color: Colors.white },
});
