import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { ArrowLeft, Map, List, MapPin, Star, Clock, Filter } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors, FontSize, FontWeight, Spacing, BorderRadius, Shadow } from '@/constants/theme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const nearbyServices = [
  { name: 'Ramu Tractor Works', type: 'Tractor', distance: '0.8 km', rating: 4.9, reviews: 124, available: true, price: '₹900/acre', eta: '12 min', image: 'https://images.pexels.com/photos/2889890/pexels-photo-2889890.jpeg?auto=compress&cs=tinysrgb&w=300', typeColor: Colors.primary[600] },
  { name: 'Sai Paddy Harvester', type: 'Harvester', distance: '1.4 km', rating: 4.7, reviews: 89, available: true, price: '₹1,500/acre', eta: '20 min', image: 'https://images.pexels.com/photos/1595104/pexels-photo-1595104.jpeg?auto=compress&cs=tinysrgb&w=300', typeColor: Colors.secondary[600] },
  { name: 'AgroSprint Drone', type: 'Sprayer', distance: '2.1 km', rating: 4.8, reviews: 67, available: true, price: '₹800/acre', eta: '28 min', image: 'https://images.pexels.com/photos/2219024/pexels-photo-2219024.jpeg?auto=compress&cs=tinysrgb&w=300', typeColor: Colors.accent[600] },
  { name: 'Mahendra JCB', type: 'JCB', distance: '2.8 km', rating: 4.6, reviews: 43, available: false, price: '₹2,500/hr', eta: '35 min', image: 'https://images.pexels.com/photos/2889890/pexels-photo-2889890.jpeg?auto=compress&cs=tinysrgb&w=300', typeColor: '#d97706' },
  { name: 'AquaFarm Irrigation', type: 'Irrigation', distance: '3.5 km', rating: 4.9, reviews: 156, available: true, price: '₹500/day', eta: '42 min', image: 'https://images.pexels.com/photos/1595104/pexels-photo-1595104.jpeg?auto=compress&cs=tinysrgb&w=300', typeColor: '#0891b2' },
];

export default function NearbyScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [view, setView] = useState<'list' | 'map'>('list');
  const [filterType, setFilterType] = useState('All');

  const types = ['All', 'Tractor', 'Harvester', 'Sprayer', 'JCB', 'Irrigation'];

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <ArrowLeft size={22} color={Colors.neutral[800]} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Nearby Services</Text>
        <View style={styles.viewToggle}>
          <TouchableOpacity
            style={[styles.toggleBtn, view === 'list' && styles.toggleBtnActive]}
            onPress={() => setView('list')}
          >
            <List size={18} color={view === 'list' ? Colors.white : Colors.neutral[500]} />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.toggleBtn, view === 'map' && styles.toggleBtnActive]}
            onPress={() => {
              setView('map');
              router.push('/services/map');
            }}
          >
            <Map size={18} color={view === 'map' ? Colors.white : Colors.neutral[500]} />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.locationBar}>
        <MapPin size={16} color={Colors.primary[600]} />
        <Text style={styles.locationText}>Kurnool, Andhra Pradesh</Text>
        <Text style={styles.countText}>{nearbyServices.length} services found</Text>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.typeFilter} contentContainerStyle={styles.typeFilterContent}>
        {types.map(t => (
          <TouchableOpacity
            key={t}
            style={[styles.typeChip, filterType === t && styles.typeChipActive]}
            onPress={() => setFilterType(t)}
          >
            <Text style={[styles.typeChipText, filterType === t && styles.typeChipTextActive]}>{t}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <ScrollView showsVerticalScrollIndicator={false} style={styles.scroll} contentContainerStyle={styles.scrollContent}>
        {nearbyServices
          .filter(s => filterType === 'All' || s.type === filterType)
          .map((s, i) => (
            <TouchableOpacity
              key={i}
              style={styles.serviceCard}
              onPress={() => router.push('/services/vehicle-detail')}
              activeOpacity={0.88}
            >
              <Image source={{ uri: s.image }} style={styles.serviceImg} />
              <View style={styles.serviceInfo}>
                <View style={styles.nameRow}>
                  <Text style={styles.serviceName}>{s.name}</Text>
                  <View style={[styles.typeBadge, { backgroundColor: s.typeColor + '18' }]}>
                    <Text style={[styles.typeText, { color: s.typeColor }]}>{s.type}</Text>
                  </View>
                </View>
                <View style={styles.metaRow}>
                  <Star size={12} color={Colors.secondary[400]} fill={Colors.secondary[400]} />
                  <Text style={styles.rating}>{s.rating} ({s.reviews})</Text>
                </View>
                <View style={styles.detailRow}>
                  <View style={styles.detailItem}>
                    <MapPin size={11} color={Colors.neutral[400]} />
                    <Text style={styles.detailText}>{s.distance}</Text>
                  </View>
                  <View style={styles.detailItem}>
                    <Clock size={11} color={Colors.neutral[400]} />
                    <Text style={styles.detailText}>{s.eta}</Text>
                  </View>
                  <View style={[styles.availBadge, { backgroundColor: s.available ? Colors.success[50] : Colors.error[50] }]}>
                    <Text style={{ fontSize: 9, fontWeight: FontWeight.bold, color: s.available ? Colors.success[600] : Colors.error[600] }}>
                      {s.available ? 'Available' : 'Busy'}
                    </Text>
                  </View>
                </View>
                <View style={styles.priceRow}>
                  <Text style={styles.priceText}>{s.price}</Text>
                  <TouchableOpacity
                    style={[styles.bookBtn, { backgroundColor: s.typeColor }, !s.available && styles.bookBtnDisabled]}
                    disabled={!s.available}
                    onPress={() => router.push('/booking/calendar')}
                  >
                    <Text style={styles.bookBtnText}>{s.available ? 'Book Now' : 'Unavailable'}</Text>
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
  header: {
    flexDirection: 'row', alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.md,
    backgroundColor: Colors.white,
    borderBottomWidth: 1, borderBottomColor: Colors.neutral[100],
  },
  backBtn: {
    width: 40, height: 40, borderRadius: 20,
    backgroundColor: Colors.neutral[100],
    alignItems: 'center', justifyContent: 'center',
  },
  headerTitle: { fontSize: FontSize.lg, fontWeight: FontWeight.bold, color: Colors.neutral[900] },
  viewToggle: {
    flexDirection: 'row',
    backgroundColor: Colors.neutral[100],
    borderRadius: BorderRadius.md,
    padding: 3,
    gap: 3,
  },
  toggleBtn: { width: 36, height: 36, borderRadius: 9, alignItems: 'center', justifyContent: 'center' },
  toggleBtnActive: { backgroundColor: Colors.primary[600] },
  locationBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.md,
    paddingVertical: 8,
    backgroundColor: Colors.primary[50],
    gap: 6,
    borderBottomWidth: 1, borderBottomColor: Colors.primary[100],
  },
  locationText: { flex: 1, fontSize: FontSize.sm, fontWeight: FontWeight.semibold, color: Colors.primary[700] },
  countText: { fontSize: FontSize.xs, color: Colors.neutral[500] },
  typeFilter: { maxHeight: 50 },
  typeFilterContent: { paddingHorizontal: Spacing.md, paddingVertical: 8, gap: 8 },
  typeChip: {
    paddingVertical: 7, paddingHorizontal: 14,
    borderRadius: BorderRadius.full,
    backgroundColor: Colors.white,
    borderWidth: 1.5, borderColor: Colors.neutral[200],
    ...Shadow.sm,
  },
  typeChipActive: { backgroundColor: Colors.primary[600], borderColor: Colors.primary[600] },
  typeChipText: { fontSize: FontSize.sm, fontWeight: FontWeight.semibold, color: Colors.neutral[700] },
  typeChipTextActive: { color: Colors.white },
  scroll: { flex: 1 },
  scrollContent: { padding: Spacing.md, gap: Spacing.md },
  serviceCard: {
    flexDirection: 'row',
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.lg,
    overflow: 'hidden',
    ...Shadow.sm,
  },
  serviceImg: { width: 90, height: 120, backgroundColor: Colors.neutral[200] },
  serviceInfo: { flex: 1, padding: Spacing.md, gap: 5 },
  nameRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', gap: 8 },
  serviceName: { flex: 1, fontSize: FontSize.md, fontWeight: FontWeight.bold, color: Colors.neutral[900] },
  typeBadge: { paddingHorizontal: 8, paddingVertical: 3, borderRadius: BorderRadius.full },
  typeText: { fontSize: 10, fontWeight: FontWeight.bold },
  metaRow: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  rating: { fontSize: FontSize.xs, fontWeight: FontWeight.semibold, color: Colors.neutral[700] },
  detailRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  detailItem: { flexDirection: 'row', alignItems: 'center', gap: 3 },
  detailText: { fontSize: FontSize.xs, color: Colors.neutral[500] },
  availBadge: { paddingHorizontal: 8, paddingVertical: 2, borderRadius: BorderRadius.full },
  priceRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 2 },
  priceText: { fontSize: FontSize.sm, fontWeight: FontWeight.bold, color: Colors.primary[700] },
  bookBtn: {
    paddingVertical: 7, paddingHorizontal: 14,
    borderRadius: BorderRadius.full,
  },
  bookBtnDisabled: { backgroundColor: Colors.neutral[300] },
  bookBtnText: { fontSize: FontSize.xs, fontWeight: FontWeight.bold, color: Colors.white },
});
