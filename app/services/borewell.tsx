import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { ArrowLeft, Droplet, MapPin, Star, Phone } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors, FontSize, FontWeight, Spacing, BorderRadius, Shadow } from '@/constants/theme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const borewellServices = [
  { label: 'Borewell Drilling', icon: '⛏️', price: '₹250–350/ft', desc: 'Deep borewell up to 1000 ft', highlight: true },
  { label: 'Bore Checking', icon: '🔍', price: '₹500/visit', desc: 'Water table testing & analysis', highlight: false },
  { label: 'Motor Installation', icon: '⚙️', price: '₹3,000–8,000', desc: 'Submersible pump setup', highlight: false },
  { label: 'Pipe Setup', icon: '🔧', price: '₹1,500–4,000', desc: 'PVC/GI pipe fitting', highlight: false },
];

const providers = [
  { name: 'Ramaiah Borewell Drilling', type: 'Drilling & Installation', rating: 4.7, reviews: 89, distance: '3.2 km', experience: '12 yrs', available: true },
  { name: 'Nageswara Water Solutions', type: 'All Services', rating: 4.9, reviews: 142, distance: '5.1 km', experience: '18 yrs', available: true },
  { name: 'Suresh Bore & Pump', type: 'Motor Installation', rating: 4.5, reviews: 53, distance: '2.7 km', experience: '8 yrs', available: false },
];

export default function BorewellScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <LinearGradient colors={['#1e40af', '#1d4ed8', '#2563eb']} style={styles.header}>
        <View style={styles.headerRow}>
          <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
            <ArrowLeft size={22} color={Colors.white} />
          </TouchableOpacity>
          <View style={{ alignItems: 'center' }}>
            <Text style={styles.headerTitle}>Borewell Services</Text>
            <Text style={styles.headerSub}>Water Solutions for Your Farm</Text>
          </View>
          <View style={{ width: 40 }} />
        </View>
      </LinearGradient>

      <ScrollView showsVerticalScrollIndicator={false} style={styles.scroll} contentContainerStyle={styles.scrollContent}>
        <LinearGradient colors={['#0369a1', '#0284c7']} style={styles.waterCard}>
          <Droplet size={40} color={Colors.white} />
          <View>
            <Text style={styles.waterTitle}>Water Table Info</Text>
            <Text style={styles.waterDesc}>Your area: 80–150 ft depth</Text>
            <Text style={styles.waterSub}>Success rate: 94% • Avg yield: 2" bore</Text>
          </View>
        </LinearGradient>

        <Text style={styles.sectionLabel}>Our Borewell Services</Text>
        <View style={styles.serviceList}>
          {borewellServices.map((s, i) => (
            <View key={i} style={[styles.serviceItem, s.highlight && styles.serviceItemHighlight]}>
              <Text style={styles.serviceIcon}>{s.icon}</Text>
              <View style={{ flex: 1 }}>
                <Text style={styles.serviceLabel}>{s.label}</Text>
                <Text style={styles.serviceDesc}>{s.desc}</Text>
              </View>
              <Text style={[styles.servicePrice, s.highlight && styles.servicePriceHighlight]}>{s.price}</Text>
            </View>
          ))}
        </View>

        <Text style={styles.sectionLabel}>Available Operators</Text>
        {providers.map((p, i) => (
          <TouchableOpacity
            key={i}
            style={styles.providerCard}
            onPress={() => router.push('/services/provider-profile')}
            activeOpacity={0.88}
          >
            <View style={styles.providerAvatar}>
              <Text style={styles.avatarEmoji}>👷</Text>
            </View>
            <View style={styles.providerInfo}>
              <View style={styles.nameRow}>
                <Text style={styles.providerName}>{p.name}</Text>
                <View style={[styles.availBadge, { backgroundColor: p.available ? Colors.success[50] : Colors.error[50] }]}>
                  <Text style={{ fontSize: 10, fontWeight: FontWeight.bold, color: p.available ? Colors.success[600] : Colors.error[600] }}>
                    {p.available ? 'Available' : 'Busy'}
                  </Text>
                </View>
              </View>
              <Text style={styles.providerType}>{p.type}</Text>
              <View style={styles.metaRow}>
                <Star size={12} color={Colors.secondary[400]} fill={Colors.secondary[400]} />
                <Text style={styles.rating}>{p.rating} ({p.reviews})</Text>
                <View style={styles.dot} />
                <Text style={styles.dist}>{p.distance}</Text>
                <View style={styles.dot} />
                <Text style={styles.exp}>{p.experience} exp</Text>
              </View>
            </View>
            <TouchableOpacity style={styles.callBtn} onPress={() => router.push('/services/call-provider')}>
              <Phone size={16} color={Colors.primary[600]} />
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
  waterCard: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: BorderRadius.xl,
    padding: Spacing.lg,
    gap: Spacing.md,
    ...Shadow.md,
  },
  waterTitle: { fontSize: FontSize.md, fontWeight: FontWeight.bold, color: Colors.white },
  waterDesc: { fontSize: FontSize.sm, color: 'rgba(255,255,255,0.9)', marginTop: 2 },
  waterSub: { fontSize: FontSize.xs, color: 'rgba(255,255,255,0.7)', marginTop: 2 },
  sectionLabel: { fontSize: FontSize.md, fontWeight: FontWeight.bold, color: Colors.neutral[900] },
  serviceList: { gap: 8 },
  serviceItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    gap: Spacing.md,
    ...Shadow.sm,
  },
  serviceItemHighlight: {
    backgroundColor: '#eff6ff',
    borderWidth: 1,
    borderColor: '#93c5fd',
  },
  serviceIcon: { fontSize: 24 },
  serviceLabel: { fontSize: FontSize.md, fontWeight: FontWeight.semibold, color: Colors.neutral[800] },
  serviceDesc: { fontSize: FontSize.xs, color: Colors.neutral[500], marginTop: 2 },
  servicePrice: { fontSize: FontSize.sm, fontWeight: FontWeight.bold, color: Colors.water[600] },
  servicePriceHighlight: { color: '#1d4ed8' },
  providerCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    gap: Spacing.md,
    ...Shadow.sm,
  },
  providerAvatar: {
    width: 56, height: 56,
    borderRadius: 28,
    backgroundColor: '#dbeafe',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarEmoji: { fontSize: 26 },
  providerInfo: { flex: 1 },
  nameRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 2 },
  providerName: { fontSize: FontSize.md, fontWeight: FontWeight.bold, color: Colors.neutral[900], flex: 1 },
  availBadge: { paddingHorizontal: 8, paddingVertical: 2, borderRadius: BorderRadius.full },
  providerType: { fontSize: FontSize.xs, color: Colors.neutral[500], marginBottom: 4 },
  metaRow: { flexDirection: 'row', alignItems: 'center', gap: 5 },
  rating: { fontSize: FontSize.xs, fontWeight: FontWeight.semibold, color: Colors.neutral[700] },
  dot: { width: 3, height: 3, borderRadius: 1.5, backgroundColor: Colors.neutral[300] },
  dist: { fontSize: FontSize.xs, color: Colors.neutral[500] },
  exp: { fontSize: FontSize.xs, color: Colors.water[600], fontWeight: FontWeight.semibold },
  callBtn: {
    width: 40, height: 40, borderRadius: 20,
    backgroundColor: Colors.primary[50],
    alignItems: 'center', justifyContent: 'center',
    borderWidth: 1, borderColor: Colors.primary[200],
  },
});
