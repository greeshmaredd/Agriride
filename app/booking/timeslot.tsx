import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { ArrowLeft, Clock, Sun, Sunset, Moon, Minus, Plus } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors, FontSize, FontWeight, Spacing, BorderRadius, Shadow } from '@/constants/theme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const timeSlots = {
  morning: [
    { time: '6:00 AM', available: true },
    { time: '7:00 AM', available: true },
    { time: '8:00 AM', available: false },
    { time: '9:00 AM', available: true },
    { time: '10:00 AM', available: true },
    { time: '11:00 AM', available: false },
  ],
  afternoon: [
    { time: '12:00 PM', available: true },
    { time: '1:00 PM', available: true },
    { time: '2:00 PM', available: false },
    { time: '3:00 PM', available: true },
    { time: '4:00 PM', available: true },
  ],
  evening: [
    { time: '5:00 PM', available: true },
    { time: '6:00 PM', available: true },
    { time: '7:00 PM', available: false },
  ],
};

export default function TimeslotScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [selectedSlot, setSelectedSlot] = useState('');
  const [duration, setDuration] = useState(4);

  const prices: Record<string, number> = {
    morning: 900,
    afternoon: 850,
    evening: 800,
  };

  const getSection = (slot: string) => {
    if (timeSlots.morning.find(s => s.time === slot)) return 'morning';
    if (timeSlots.afternoon.find(s => s.time === slot)) return 'afternoon';
    return 'evening';
  };

  const estimatedCost = selectedSlot
    ? prices[getSection(selectedSlot)] * duration * 0.8
    : 0;

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <ArrowLeft size={22} color={Colors.neutral[800]} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Select Time Slot</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} style={styles.scroll} contentContainerStyle={styles.scrollContent}>
        <View style={styles.dateChip}>
          <Text style={styles.dateChipText}>Saturday, 15 June 2026</Text>
        </View>

        {([
          { key: 'morning', label: 'Morning', icon: Sun, color: Colors.secondary[500] },
          { key: 'afternoon', label: 'Afternoon', icon: Sunset, color: Colors.accent[500] },
          { key: 'evening', label: 'Evening', icon: Moon, color: '#6366f1' },
        ] as const).map(({ key, label, icon: Icon, color }) => (
          <View key={key} style={styles.section}>
            <View style={styles.sectionHeader}>
              <Icon size={18} color={color} />
              <Text style={styles.sectionTitle}>{label}</Text>
              <Text style={styles.sectionPrice}>₹{prices[key]}/hr</Text>
            </View>
            <View style={styles.slotsGrid}>
              {timeSlots[key].map(slot => (
                <TouchableOpacity
                  key={slot.time}
                  style={[
                    styles.slotChip,
                    selectedSlot === slot.time && styles.slotChipActive,
                    !slot.available && styles.slotChipDisabled,
                    selectedSlot === slot.time && { borderColor: color, backgroundColor: color + '20' },
                  ]}
                  onPress={() => slot.available && setSelectedSlot(slot.time)}
                  disabled={!slot.available}
                >
                  <Clock size={12} color={
                    !slot.available ? Colors.neutral[300] :
                    selectedSlot === slot.time ? color :
                    Colors.neutral[600]
                  } />
                  <Text style={[
                    styles.slotText,
                    selectedSlot === slot.time && { color, fontWeight: FontWeight.bold },
                    !slot.available && styles.slotTextDisabled,
                  ]}>
                    {slot.time}
                  </Text>
                  {!slot.available && <Text style={styles.bookedTag}>Booked</Text>}
                </TouchableOpacity>
              ))}
            </View>
          </View>
        ))}

        <View style={styles.durationCard}>
          <Text style={styles.durationTitle}>Service Duration</Text>
          <Text style={styles.durationSub}>How long do you need the service?</Text>
          <View style={styles.durationRow}>
            <TouchableOpacity
              style={styles.durationBtn}
              onPress={() => setDuration(d => Math.max(1, d - 1))}
            >
              <Minus size={18} color={Colors.primary[600]} />
            </TouchableOpacity>
            <View style={styles.durationValue}>
              <Text style={styles.durationNum}>{duration}</Text>
              <Text style={styles.durationUnit}>hours</Text>
            </View>
            <TouchableOpacity
              style={styles.durationBtn}
              onPress={() => setDuration(d => Math.min(12, d + 1))}
            >
              <Plus size={18} color={Colors.primary[600]} />
            </TouchableOpacity>
          </View>
        </View>

        {selectedSlot && (
          <View style={styles.estimateCard}>
            <View style={styles.estimateRow}>
              <Text style={styles.estimateLabel}>Selected Time</Text>
              <Text style={styles.estimateValue}>{selectedSlot}</Text>
            </View>
            <View style={styles.estimateRow}>
              <Text style={styles.estimateLabel}>Duration</Text>
              <Text style={styles.estimateValue}>{duration} hours</Text>
            </View>
            <View style={[styles.estimateRow, styles.estimateTotalRow]}>
              <Text style={styles.estimateTotalLabel}>Estimated Cost</Text>
              <Text style={styles.estimateTotalValue}>₹{estimatedCost.toFixed(0)}</Text>
            </View>
          </View>
        )}
      </ScrollView>

      <View style={[styles.footer, { paddingBottom: insets.bottom + 12 }]}>
        <TouchableOpacity
          style={[styles.continueBtn, !selectedSlot && styles.continueBtnDisabled]}
          onPress={() => selectedSlot && router.push('/booking/price-estimate')}
          disabled={!selectedSlot}
        >
          <LinearGradient
            colors={selectedSlot ? [Colors.primary[500], Colors.primary[700]] : [Colors.neutral[300], Colors.neutral[300]]}
            style={styles.continueGradient}
            start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
          >
            <Text style={[styles.continueText, !selectedSlot && styles.continueTextDisabled]}>
              {selectedSlot ? `Confirm ${selectedSlot}` : 'Select a Time Slot'}
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
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
  scroll: { flex: 1 },
  scrollContent: { padding: Spacing.md, gap: Spacing.md },
  dateChip: {
    backgroundColor: Colors.primary[50],
    borderRadius: BorderRadius.full,
    paddingHorizontal: Spacing.md, paddingVertical: 8,
    alignSelf: 'center',
    borderWidth: 1, borderColor: Colors.primary[200],
  },
  dateChipText: { fontSize: FontSize.sm, fontWeight: FontWeight.semibold, color: Colors.primary[700] },
  section: {
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    gap: 10, ...Shadow.sm,
  },
  sectionHeader: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  sectionTitle: { flex: 1, fontSize: FontSize.md, fontWeight: FontWeight.bold, color: Colors.neutral[900] },
  sectionPrice: { fontSize: FontSize.sm, fontWeight: FontWeight.semibold, color: Colors.neutral[500] },
  slotsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  slotChip: {
    flexDirection: 'row', alignItems: 'center', gap: 4,
    paddingVertical: 8, paddingHorizontal: 12,
    borderRadius: BorderRadius.full,
    borderWidth: 1.5, borderColor: Colors.neutral[200],
    backgroundColor: Colors.neutral[50],
  },
  slotChipActive: { borderColor: Colors.primary[500] },
  slotChipDisabled: { opacity: 0.4, backgroundColor: Colors.neutral[100] },
  slotText: { fontSize: FontSize.sm, color: Colors.neutral[700] },
  slotTextDisabled: { color: Colors.neutral[400] },
  bookedTag: { fontSize: 9, color: Colors.error[600], fontWeight: FontWeight.bold },
  durationCard: {
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    gap: 8, ...Shadow.sm,
    alignItems: 'center',
  },
  durationTitle: { fontSize: FontSize.md, fontWeight: FontWeight.bold, color: Colors.neutral[900] },
  durationSub: { fontSize: FontSize.xs, color: Colors.neutral[500] },
  durationRow: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    gap: Spacing.xl, marginTop: 4,
  },
  durationBtn: {
    width: 44, height: 44, borderRadius: 22,
    backgroundColor: Colors.primary[50],
    alignItems: 'center', justifyContent: 'center',
    borderWidth: 2, borderColor: Colors.primary[200],
  },
  durationValue: { alignItems: 'center' },
  durationNum: { fontSize: 40, fontWeight: FontWeight.bold, color: Colors.primary[700] },
  durationUnit: { fontSize: FontSize.sm, color: Colors.neutral[500] },
  estimateCard: {
    backgroundColor: Colors.primary[50],
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    gap: 8,
    borderWidth: 1, borderColor: Colors.primary[200],
  },
  estimateRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  estimateLabel: { fontSize: FontSize.sm, color: Colors.neutral[600] },
  estimateValue: { fontSize: FontSize.sm, fontWeight: FontWeight.semibold, color: Colors.neutral[800] },
  estimateTotalRow: {
    borderTopWidth: 1, borderTopColor: Colors.primary[200],
    paddingTop: 8, marginTop: 4,
  },
  estimateTotalLabel: { fontSize: FontSize.md, fontWeight: FontWeight.bold, color: Colors.primary[700] },
  estimateTotalValue: { fontSize: FontSize.xl, fontWeight: FontWeight.bold, color: Colors.primary[700] },
  footer: {
    paddingHorizontal: Spacing.md, paddingTop: Spacing.sm,
    backgroundColor: Colors.white,
    borderTopWidth: 1, borderTopColor: Colors.neutral[100],
  },
  continueBtn: { borderRadius: BorderRadius.lg, overflow: 'hidden', ...Shadow.green },
  continueBtnDisabled: { shadowOpacity: 0, elevation: 0 },
  continueGradient: { paddingVertical: 16, alignItems: 'center' },
  continueText: { fontSize: FontSize.lg, fontWeight: FontWeight.bold, color: Colors.white },
  continueTextDisabled: { color: Colors.neutral[500] },
});
