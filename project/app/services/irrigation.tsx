import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { ArrowLeft, Droplets, Star, CheckCircle } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors, FontSize, FontWeight, Spacing, BorderRadius, Shadow } from '@/constants/theme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const irrigationServices = [
  { id: 'drip', label: 'Drip Irrigation', icon: '💧', price: '₹15,000–40,000/acre', desc: 'Water-efficient drip system installation', recommended: true },
  { id: 'sprinkler', label: 'Sprinkler Setup', icon: '🌊', price: '₹8,000–25,000/acre', desc: 'Overhead sprinkler system' },
  { id: 'pump', label: 'Water Pump Rental', icon: '⚙️', price: '₹500–800/day', desc: 'Diesel/electric pump rental' },
  { id: 'pipe', label: 'Pipe Laying', icon: '🔧', price: '₹50–120/meter', desc: 'PVC/HDPE pipe installation' },
  { id: 'motor', label: 'Motor Repair', icon: '🛠️', price: '₹500–3,000', desc: 'Submersible motor repair & service' },
];

const providers = [
  { name: 'AquaFarm Solutions', services: ['Drip Irrigation', 'Sprinkler'], rating: 4.9, reviews: 203, distance: '1.8 km', available: true },
  { name: 'Jal Seva Irrigation', services: ['Pipe Laying', 'Pump Rental'], rating: 4.6, reviews: 89, distance: '3.4 km', available: true },
];

export default function IrrigationScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [selected, setSelected] = useState('drip');

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <LinearGradient colors={['#0e7490', '#0891b2', '#06b6d4']} style={styles.header}>
        <View style={styles.headerRow}>
          <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
            <ArrowLeft size={22} color={Colors.white} />
          </TouchableOpacity>
          <View style={{ alignItems: 'center' }}>
            <Text style={styles.headerTitle}>Irrigation Services</Text>
            <Text style={styles.headerSub}>Smart water management</Text>
          </View>
          <View style={{ width: 40 }} />
        </View>
      </LinearGradient>

      <ScrollView showsVerticalScrollIndicator={false} style={styles.scroll} contentContainerStyle={styles.scrollContent}>
        <View style={styles.benefitCard}>
          <Droplets size={28} color='#0891b2' />
          <View>
            <Text style={styles.benefitTitle}>Save up to 60% water</Text>
            <Text style={styles.benefitDesc}>Efficient irrigation reduces water usage and improves yield</Text>
          </View>
        </View>

        <Text style={styles.sectionLabel}>Service Type</Text>
        <View style={styles.serviceList}>
          {irrigationServices.map(s => (
            <TouchableOpacity
              key={s.id}
              style={[styles.serviceRow, selected === s.id && styles.serviceRowActive]}
              onPress={() => setSelected(s.id)}
            >
              <Text style={styles.serviceIcon}>{s.icon}</Text>
              <View style={{ flex: 1 }}>
                <View style={styles.serviceTopRow}>
                  <Text style={styles.serviceLabel}>{s.label}</Text>
                  {s.recommended && (
                    <View style={styles.recBadge}>
                      <Text style={styles.recText}>Recommended</Text>
                    </View>
                  )}
                </View>
                <Text style={styles.serviceDesc}>{s.desc}</Text>
                <Text style={styles.servicePrice}>{s.price}</Text>
              </View>
              {selected === s.id && <CheckCircle size={20} color={Colors.primary[600]} fill={Colors.primary[100]} />}
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.sectionLabel}>Top Providers</Text>
        {providers.map((p, i) => (
          <TouchableOpacity
            key={i}
            style={styles.providerCard}
            onPress={() => router.push('/services/vehicle-detail')}
          >
            <View style={styles.providerAvatar}>
              <Text style={{ fontSize: 26 }}>💧</Text>
            </View>
            <View style={styles.providerInfo}>
              <Text style={styles.providerName}>{p.name}</Text>
              <Text style={styles.providerServices}>{p.services.join(' • ')}</Text>
              <View style={styles.metaRow}>
                <Star size={12} color={Colors.secondary[400]} fill={Colors.secondary[400]} />
                <Text style={styles.rating}>{p.rating} ({p.reviews})</Text>
                <View style={styles.dot} />
                <Text style={styles.dist}>{p.distance}</Text>
              </View>
            </View>
            <TouchableOpacity style={styles.bookBtn} onPress={() => router.push('/booking/calendar')}>
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
  benefitCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e0f2fe',
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    gap: Spacing.md,
    borderWidth: 1, borderColor: '#7dd3fc',
  },
  benefitTitle: { fontSize: FontSize.md, fontWeight: FontWeight.bold, color: '#0c4a6e' },
  benefitDesc: { fontSize: FontSize.xs, color: '#075985', marginTop: 2 },
  sectionLabel: { fontSize: FontSize.md, fontWeight: FontWeight.bold, color: Colors.neutral[900] },
  serviceList: { gap: 8 },
  serviceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    gap: Spacing.md,
    borderWidth: 1.5, borderColor: Colors.neutral[200],
    ...Shadow.sm,
  },
  serviceRowActive: { borderColor: Colors.primary[400], backgroundColor: Colors.primary[50] },
  serviceIcon: { fontSize: 24 },
  serviceTopRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  serviceLabel: { fontSize: FontSize.sm, fontWeight: FontWeight.bold, color: Colors.neutral[900] },
  recBadge: { backgroundColor: Colors.secondary[100], paddingHorizontal: 6, paddingVertical: 2, borderRadius: BorderRadius.full },
  recText: { fontSize: 9, fontWeight: FontWeight.bold, color: Colors.secondary[700] },
  serviceDesc: { fontSize: FontSize.xs, color: Colors.neutral[500], marginTop: 2 },
  servicePrice: { fontSize: FontSize.xs, fontWeight: FontWeight.semibold, color: '#0891b2', marginTop: 2 },
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
    width: 52, height: 52,
    borderRadius: 26,
    backgroundColor: '#e0f2fe',
    alignItems: 'center', justifyContent: 'center',
  },
  providerInfo: { flex: 1 },
  providerName: { fontSize: FontSize.md, fontWeight: FontWeight.bold, color: Colors.neutral[900] },
  providerServices: { fontSize: FontSize.xs, color: Colors.neutral[500], marginTop: 2 },
  metaRow: { flexDirection: 'row', alignItems: 'center', gap: 5, marginTop: 4 },
  rating: { fontSize: FontSize.xs, fontWeight: FontWeight.semibold, color: Colors.neutral[700] },
  dot: { width: 3, height: 3, borderRadius: 1.5, backgroundColor: Colors.neutral[300] },
  dist: { fontSize: FontSize.xs, color: Colors.neutral[500] },
  bookBtn: {
    paddingVertical: 8, paddingHorizontal: 16,
    borderRadius: BorderRadius.full,
    backgroundColor: '#0891b2',
  },
  bookBtnText: { fontSize: FontSize.sm, fontWeight: FontWeight.bold, color: Colors.white },
});
