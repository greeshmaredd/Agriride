import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { useRouter } from 'expo-router';
import { ArrowLeft, MapPin, Truck, Package, ChevronRight } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors, FontSize, FontWeight, Spacing, BorderRadius, Shadow } from '@/constants/theme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const vehicleTypes = [
  { id: 'auto', label: 'Auto Tempo', icon: '🛺', capacity: '200–300 kg', price: '₹15/km' },
  { id: 'mini', label: 'Mini Truck', icon: '🚐', capacity: '500–800 kg', price: '₹25/km' },
  { id: 'pickup', label: 'Pickup Van', icon: '🚙', capacity: '800–1200 kg', price: '₹30/km' },
  { id: 'large', label: 'Large Truck', icon: '🚚', capacity: '2000–5000 kg', price: '₹45/km' },
];

const loadTypes = ['Vegetables', 'Fruits', 'Rice Bags', 'Fertilizer', 'Farm Tools', 'Other'];

export default function TransportScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [load, setLoad] = useState('Vegetables');
  const [vehicle, setVehicle] = useState('mini');

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <LinearGradient colors={[Colors.neutral[700], Colors.neutral[600]]} style={styles.header}>
        <View style={styles.headerRow}>
          <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
            <ArrowLeft size={22} color={Colors.white} />
          </TouchableOpacity>
          <View style={{ alignItems: 'center' }}>
            <Text style={styles.headerTitle}>Vegetable Transport</Text>
            <Text style={styles.headerSub}>Farm to Market delivery</Text>
          </View>
          <View style={{ width: 40 }} />
        </View>
      </LinearGradient>

      <ScrollView showsVerticalScrollIndicator={false} style={styles.scroll} contentContainerStyle={styles.scrollContent}>
        <View style={styles.routeCard}>
          <Text style={styles.routeTitle}>Route Details</Text>
          <View style={styles.routeInputWrap}>
            <View style={styles.routeInput}>
              <View style={[styles.routeDot, { backgroundColor: Colors.primary[500] }]} />
              <TextInput style={styles.routeText} placeholder="From: Your Farm location" value={from} onChangeText={setFrom} placeholderTextColor={Colors.neutral[400]} />
            </View>
            <View style={styles.routeDivider} />
            <View style={styles.routeInput}>
              <View style={[styles.routeDot, { backgroundColor: Colors.error[500] }]} />
              <TextInput style={styles.routeText} placeholder="To: Market / Destination" value={to} onChangeText={setTo} placeholderTextColor={Colors.neutral[400]} />
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Load Type</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {loadTypes.map(l => (
              <TouchableOpacity
                key={l}
                style={[styles.loadChip, load === l && styles.loadChipActive]}
                onPress={() => setLoad(l)}
              >
                <Text style={[styles.loadText, load === l && styles.loadTextActive]}>{l}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Vehicle Type</Text>
          <View style={styles.vehicleGrid}>
            {vehicleTypes.map(v => (
              <TouchableOpacity
                key={v.id}
                style={[styles.vehicleCard, vehicle === v.id && styles.vehicleCardActive]}
                onPress={() => setVehicle(v.id)}
              >
                <Text style={styles.vehicleIcon}>{v.icon}</Text>
                <Text style={[styles.vehicleLabel, vehicle === v.id && styles.vehicleLabelActive]}>{v.label}</Text>
                <Text style={styles.vehicleCapacity}>{v.capacity}</Text>
                <Text style={[styles.vehiclePrice, vehicle === v.id && styles.vehiclePriceActive]}>{v.price}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.estimateCard}>
          <View style={styles.estimateRow}>
            <Truck size={16} color={Colors.neutral[600]} />
            <Text style={styles.estimateText}>Estimated Distance: ~25 km</Text>
          </View>
          <View style={styles.estimateRow}>
            <Package size={16} color={Colors.neutral[600]} />
            <Text style={styles.estimateText}>Estimated Cost: ₹625–750</Text>
          </View>
        </View>

        <TouchableOpacity
          style={styles.searchBtn}
          onPress={() => router.push('/services/nearby')}
        >
          <LinearGradient colors={[Colors.neutral[600], Colors.neutral[800]]} style={styles.searchGradient} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}>
            <Text style={styles.searchBtnText}>Find Available Vehicles</Text>
            <ChevronRight size={20} color={Colors.white} />
          </LinearGradient>
        </TouchableOpacity>
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
  scrollContent: { padding: Spacing.md, gap: Spacing.lg },
  routeCard: {
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    ...Shadow.md,
  },
  routeTitle: { fontSize: FontSize.md, fontWeight: FontWeight.bold, color: Colors.neutral[900], marginBottom: Spacing.md },
  routeInputWrap: { gap: 0 },
  routeInput: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    paddingVertical: 12,
  },
  routeDot: { width: 12, height: 12, borderRadius: 6 },
  routeText: {
    flex: 1,
    fontSize: FontSize.md,
    color: Colors.neutral[900],
    borderBottomWidth: 1,
    borderBottomColor: Colors.neutral[100],
    paddingBottom: 8,
  },
  routeDivider: {
    width: 1.5,
    height: 20,
    backgroundColor: Colors.neutral[200],
    marginLeft: 5,
  },
  section: { gap: 10 },
  sectionLabel: { fontSize: FontSize.md, fontWeight: FontWeight.bold, color: Colors.neutral[900] },
  loadChip: {
    paddingVertical: 8, paddingHorizontal: 14,
    borderRadius: BorderRadius.full,
    backgroundColor: Colors.white,
    borderWidth: 1.5, borderColor: Colors.neutral[200],
    marginRight: 8, ...Shadow.sm,
  },
  loadChipActive: { backgroundColor: Colors.primary[600], borderColor: Colors.primary[600] },
  loadText: { fontSize: FontSize.sm, fontWeight: FontWeight.semibold, color: Colors.neutral[700] },
  loadTextActive: { color: Colors.white },
  vehicleGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  vehicleCard: {
    width: '47%',
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    borderWidth: 2, borderColor: Colors.neutral[200],
    gap: 4, ...Shadow.sm,
  },
  vehicleCardActive: { borderColor: Colors.neutral[700], backgroundColor: Colors.neutral[50] },
  vehicleIcon: { fontSize: 28 },
  vehicleLabel: { fontSize: FontSize.sm, fontWeight: FontWeight.bold, color: Colors.neutral[800] },
  vehicleLabelActive: { color: Colors.neutral[900] },
  vehicleCapacity: { fontSize: FontSize.xs, color: Colors.neutral[500] },
  vehiclePrice: { fontSize: FontSize.sm, fontWeight: FontWeight.semibold, color: Colors.neutral[600] },
  vehiclePriceActive: { color: Colors.neutral[800] },
  estimateCard: {
    backgroundColor: Colors.neutral[100],
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    gap: 8,
  },
  estimateRow: { flexDirection: 'row', alignItems: 'center', gap: Spacing.sm },
  estimateText: { fontSize: FontSize.sm, color: Colors.neutral[700], fontWeight: FontWeight.medium },
  searchBtn: { borderRadius: BorderRadius.lg, overflow: 'hidden', ...Shadow.md },
  searchGradient: {
    flexDirection: 'row', alignItems: 'center',
    justifyContent: 'center', paddingVertical: 16,
    gap: 8,
  },
  searchBtnText: { fontSize: FontSize.lg, fontWeight: FontWeight.bold, color: Colors.white },
});
