import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { useRouter } from 'expo-router';
import { ArrowLeft, Users, MapPin, Clock, AlertTriangle } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors, FontSize, FontWeight, Spacing, BorderRadius, Shadow } from '@/constants/theme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const vehicleTypes = [
  { id: 'auto', label: 'Auto Tempo', icon: '🛺', capacity: '6–8 persons', price: '₹12/km' },
  { id: 'van', label: 'Mahindra Van', icon: '🚐', capacity: '10–12 persons', price: '₹18/km' },
  { id: 'bus', label: 'Mini Bus', icon: '🚌', capacity: '20–25 persons', price: '₹28/km' },
];

const timeSlots = ['5:00 AM', '6:00 AM', '7:00 AM', '8:00 AM', '9:00 AM', '10:00 AM'];

export default function LabourScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [workers, setWorkers] = useState('10');
  const [vehicle, setVehicle] = useState('van');
  const [time, setTime] = useState('6:00 AM');
  const [pickup, setPickup] = useState('');
  const [dropFarm, setDropFarm] = useState('');

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <LinearGradient colors={['#6d28d9', '#7c3aed']} style={styles.header}>
        <View style={styles.headerRow}>
          <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
            <ArrowLeft size={22} color={Colors.white} />
          </TouchableOpacity>
          <View style={{ alignItems: 'center' }}>
            <Text style={styles.headerTitle}>Labour Pickup & Drop</Text>
            <Text style={styles.headerSub}>Worker transport service</Text>
          </View>
          <View style={{ width: 40 }} />
        </View>
      </LinearGradient>

      <ScrollView showsVerticalScrollIndicator={false} style={styles.scroll} contentContainerStyle={styles.scrollContent}>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Location Details</Text>
          <View style={styles.locationInput}>
            <View style={[styles.locationDot, { backgroundColor: Colors.primary[500] }]} />
            <TextInput style={styles.locationText} placeholder="Pickup point (village/street)" value={pickup} onChangeText={setPickup} placeholderTextColor={Colors.neutral[400]} />
          </View>
          <View style={styles.locationInput}>
            <View style={[styles.locationDot, { backgroundColor: Colors.error[500] }]} />
            <TextInput style={styles.locationText} placeholder="Drop at farm location" value={dropFarm} onChangeText={setDropFarm} placeholderTextColor={Colors.neutral[400]} />
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Workers Count</Text>
          <View style={styles.workerRow}>
            <TouchableOpacity style={styles.workerBtn} onPress={() => setWorkers(w => Math.max(1, parseInt(w) - 1).toString())}>
              <Text style={styles.workerBtnText}>−</Text>
            </TouchableOpacity>
            <View style={styles.workerCount}>
              <Users size={20} color={Colors.primary[600]} />
              <Text style={styles.workerNumber}>{workers}</Text>
              <Text style={styles.workerLabel}>persons</Text>
            </View>
            <TouchableOpacity style={styles.workerBtn} onPress={() => setWorkers(w => (parseInt(w) + 1).toString())}>
              <Text style={styles.workerBtnText}>+</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Vehicle Type</Text>
          <View style={styles.vehicleRow}>
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

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Pickup Time</Text>
          <View style={styles.timeRow}>
            {timeSlots.map(t => (
              <TouchableOpacity
                key={t}
                style={[styles.timeChip, time === t && styles.timeChipActive]}
                onPress={() => setTime(t)}
              >
                <Clock size={12} color={time === t ? Colors.white : Colors.neutral[500]} />
                <Text style={[styles.timeText, time === t && styles.timeTextActive]}>{t}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.safetyNote}>
          <AlertTriangle size={16} color={Colors.warning[600]} />
          <Text style={styles.safetyText}>All drivers are verified. Please ensure workers carry ID proof. Contact driver before boarding.</Text>
        </View>

        <TouchableOpacity
          style={styles.bookBtn}
          onPress={() => router.push('/booking/calendar')}
        >
          <LinearGradient colors={['#7c3aed', '#6d28d9']} style={styles.bookGradient} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}>
            <Text style={styles.bookBtnText}>Book Labour Transport</Text>
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
  scrollContent: { padding: Spacing.md, gap: Spacing.md },
  card: {
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    gap: 12,
    ...Shadow.sm,
  },
  cardTitle: { fontSize: FontSize.md, fontWeight: FontWeight.bold, color: Colors.neutral[900] },
  locationInput: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: Colors.neutral[100],
  },
  locationDot: { width: 12, height: 12, borderRadius: 6 },
  locationText: { flex: 1, fontSize: FontSize.md, color: Colors.neutral[900] },
  workerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.lg,
  },
  workerBtn: {
    width: 44, height: 44, borderRadius: 22,
    backgroundColor: Colors.primary[50],
    alignItems: 'center', justifyContent: 'center',
    borderWidth: 2, borderColor: Colors.primary[200],
  },
  workerBtnText: { fontSize: 22, fontWeight: FontWeight.bold, color: Colors.primary[700] },
  workerCount: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  workerNumber: { fontSize: 28, fontWeight: FontWeight.bold, color: Colors.primary[700] },
  workerLabel: { fontSize: FontSize.sm, color: Colors.neutral[500] },
  vehicleRow: { flexDirection: 'row', gap: 8 },
  vehicleCard: {
    flex: 1,
    backgroundColor: Colors.neutral[50],
    borderRadius: BorderRadius.lg,
    padding: 10,
    borderWidth: 2, borderColor: Colors.neutral[200],
    alignItems: 'center', gap: 3,
  },
  vehicleCardActive: { borderColor: '#7c3aed', backgroundColor: '#f5f3ff' },
  vehicleIcon: { fontSize: 22 },
  vehicleLabel: { fontSize: 11, fontWeight: FontWeight.bold, color: Colors.neutral[800], textAlign: 'center' },
  vehicleLabelActive: { color: '#6d28d9' },
  vehicleCapacity: { fontSize: 9, color: Colors.neutral[500], textAlign: 'center' },
  vehiclePrice: { fontSize: 11, fontWeight: FontWeight.semibold, color: Colors.neutral[600] },
  vehiclePriceActive: { color: '#7c3aed' },
  timeRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  timeChip: {
    flexDirection: 'row', alignItems: 'center', gap: 4,
    paddingVertical: 7, paddingHorizontal: 12,
    borderRadius: BorderRadius.full,
    backgroundColor: Colors.neutral[100],
    borderWidth: 1, borderColor: Colors.neutral[200],
  },
  timeChipActive: { backgroundColor: Colors.primary[600], borderColor: Colors.primary[600] },
  timeText: { fontSize: FontSize.xs, fontWeight: FontWeight.semibold, color: Colors.neutral[700] },
  timeTextActive: { color: Colors.white },
  safetyNote: {
    flexDirection: 'row',
    backgroundColor: Colors.warning[50],
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    gap: 10,
    borderWidth: 1, borderColor: '#fde68a',
  },
  safetyText: { flex: 1, fontSize: FontSize.xs, color: Colors.warning[700], lineHeight: 18 },
  bookBtn: { borderRadius: BorderRadius.lg, overflow: 'hidden', ...Shadow.md },
  bookGradient: { paddingVertical: 16, alignItems: 'center' },
  bookBtnText: { fontSize: FontSize.lg, fontWeight: FontWeight.bold, color: Colors.white },
});
