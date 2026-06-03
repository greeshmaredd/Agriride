import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { ArrowLeft, Filter, MapPin, Star, Shield } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors, FontSize, FontWeight, Spacing, BorderRadius, Shadow } from '@/constants/theme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const sprayerTypes = [
  { id: 'manual', label: 'Manual Sprayer', icon: '💧', desc: 'For small plots up to 1 acre', price: '₹200/day', color: '#0891b2' },
  { id: 'power', label: 'Power Sprayer', icon: '⚡', desc: 'Engine-powered for 2-5 acres', price: '₹500/day', color: Colors.accent[600] },
  { id: 'drone', label: 'Drone Spraying', icon: '🚁', desc: 'Precision aerial spraying', price: '₹800/acre', color: Colors.primary[600] },
  { id: 'tractor', label: 'Tractor Sprayer', icon: '🚜', desc: 'Large-scale field spraying', price: '₹1,200/acre', color: Colors.secondary[600] },
];

const providers = [
  { name: 'AgroSprint Drone Services', type: 'Drone Spraying', rating: 4.9, reviews: 88, distance: '1.5 km', available: true, image: 'https://images.pexels.com/photos/2889890/pexels-photo-2889890.jpeg?auto=compress&cs=tinysrgb&w=300', certified: true },
  { name: 'Kisan Power Sprayer Co.', type: 'Power Sprayer', rating: 4.5, reviews: 62, distance: '2.8 km', available: true, image: 'https://images.pexels.com/photos/1595104/pexels-photo-1595104.jpeg?auto=compress&cs=tinysrgb&w=300', certified: false },
];

export default function SprayerScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [selectedType, setSelectedType] = useState('drone');

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <LinearGradient colors={[Colors.accent[600], Colors.accent[400]]} style={styles.header}>
        <View style={styles.headerRow}>
          <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
            <ArrowLeft size={22} color={Colors.white} />
          </TouchableOpacity>
          <View style={{ alignItems: 'center' }}>
            <Text style={styles.headerTitle}>Fertilizer Sprayers</Text>
            <Text style={styles.headerSub}>Crop protection services</Text>
          </View>
          <TouchableOpacity style={styles.backBtn}>
            <Filter size={20} color={Colors.white} />
          </TouchableOpacity>
        </View>
      </LinearGradient>

      <ScrollView showsVerticalScrollIndicator={false} style={styles.scroll} contentContainerStyle={styles.scrollContent}>
        <Text style={styles.sectionLabel}>Sprayer Type</Text>
        <View style={styles.typeGrid}>
          {sprayerTypes.map(t => (
            <TouchableOpacity
              key={t.id}
              style={[styles.typeCard, selectedType === t.id && styles.typeCardActive, { borderColor: selectedType === t.id ? t.color : Colors.neutral[200] }]}
              onPress={() => setSelectedType(t.id)}
            >
              <Text style={styles.typeIcon}>{t.icon}</Text>
              <Text style={[styles.typeLabel, selectedType === t.id && { color: t.color }]}>{t.label}</Text>
              <Text style={styles.typeDesc}>{t.desc}</Text>
              <Text style={[styles.typePrice, { color: t.color }]}>{t.price}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.safetyCard}>
          <Shield size={18} color={Colors.primary[600]} />
          <Text style={styles.safetyText}>All sprayers use approved crop-safe chemicals. Certified operators only.</Text>
        </View>

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
              <View style={styles.nameRow}>
                <Text style={styles.providerName}>{p.name}</Text>
                {p.certified && (
                  <View style={styles.certBadge}>
                    <Text style={styles.certText}>Certified</Text>
                  </View>
                )}
              </View>
              <Text style={styles.providerType}>{p.type}</Text>
              <View style={styles.metaRow}>
                <Star size={12} color={Colors.secondary[400]} fill={Colors.secondary[400]} />
                <Text style={styles.rating}>{p.rating} ({p.reviews})</Text>
                <View style={styles.dot} />
                <MapPin size={11} color={Colors.neutral[400]} />
                <Text style={styles.distText}>{p.distance}</Text>
              </View>
              <TouchableOpacity
                style={styles.bookBtn}
                onPress={() => router.push('/booking/calendar')}
              >
                <Text style={styles.bookBtnText}>Book Sprayer</Text>
              </TouchableOpacity>
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
  sectionLabel: { fontSize: FontSize.md, fontWeight: FontWeight.bold, color: Colors.neutral[900] },
  typeGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  typeCard: {
    width: '47%',
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    borderWidth: 2,
    borderColor: Colors.neutral[200],
    gap: 4,
    ...Shadow.sm,
  },
  typeCardActive: { backgroundColor: Colors.neutral[50] },
  typeIcon: { fontSize: 24 },
  typeLabel: { fontSize: FontSize.sm, fontWeight: FontWeight.bold, color: Colors.neutral[900] },
  typeDesc: { fontSize: 10, color: Colors.neutral[500] },
  typePrice: { fontSize: FontSize.sm, fontWeight: FontWeight.semibold, marginTop: 2 },
  safetyCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.primary[50],
    borderRadius: BorderRadius.md,
    padding: Spacing.md,
    gap: Spacing.sm,
    borderWidth: 1,
    borderColor: Colors.primary[200],
  },
  safetyText: { flex: 1, fontSize: FontSize.xs, color: Colors.primary[700], lineHeight: 18 },
  providerCard: {
    flexDirection: 'row',
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    gap: Spacing.md,
    ...Shadow.sm,
    alignItems: 'flex-start',
  },
  providerImg: { width: 70, height: 70, borderRadius: 12, backgroundColor: Colors.neutral[200] },
  providerInfo: { flex: 1, gap: 4 },
  nameRow: { flexDirection: 'row', alignItems: 'center', gap: 8, flexWrap: 'wrap' },
  providerName: { fontSize: FontSize.md, fontWeight: FontWeight.bold, color: Colors.neutral[900], flex: 1 },
  certBadge: {
    backgroundColor: Colors.primary[100],
    paddingHorizontal: 8, paddingVertical: 2,
    borderRadius: BorderRadius.full,
  },
  certText: { fontSize: 10, fontWeight: FontWeight.bold, color: Colors.primary[700] },
  providerType: { fontSize: FontSize.xs, color: Colors.neutral[500] },
  metaRow: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  rating: { fontSize: FontSize.xs, fontWeight: FontWeight.semibold, color: Colors.neutral[700] },
  dot: { width: 3, height: 3, borderRadius: 1.5, backgroundColor: Colors.neutral[300] },
  distText: { fontSize: FontSize.xs, color: Colors.neutral[500] },
  bookBtn: {
    alignSelf: 'flex-start',
    paddingVertical: 7, paddingHorizontal: 16,
    borderRadius: BorderRadius.full,
    backgroundColor: Colors.accent[600],
    marginTop: 4,
  },
  bookBtnText: { fontSize: FontSize.sm, fontWeight: FontWeight.bold, color: Colors.white },
});
