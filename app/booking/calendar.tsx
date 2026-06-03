import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity,
} from 'react-native';
import { useRouter } from 'expo-router';
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors, FontSize, FontWeight, Spacing, BorderRadius, Shadow } from '@/constants/theme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const cropSeasonHighlights: Record<number, string> = {
  5: 'Kharif Sowing',
  6: 'Paddy Season',
  7: 'Paddy Season',
  8: 'Paddy Season',
  9: 'Paddy Season',
  10: 'Harvest Season',
  11: 'Rabi Sowing',
  0: 'Rabi Season',
  1: 'Rabi Season',
  2: 'Harvest Season',
};

const busyDates = [3, 7, 14, 21, 22];

export default function BookingCalendarScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const today = new Date();
  const [month, setMonth] = useState(today.getMonth());
  const [year, setYear] = useState(today.getFullYear());
  const [selectedDate, setSelectedDate] = useState<number | null>(null);

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const prevMonth = () => {
    if (month === 0) { setMonth(11); setYear(y => y - 1); }
    else setMonth(m => m - 1);
  };
  const nextMonth = () => {
    if (month === 11) { setMonth(0); setYear(y => y + 1); }
    else setMonth(m => m + 1);
  };

  const isBusy = (d: number) => busyDates.includes(d);
  const isPast = (d: number) => new Date(year, month, d) < new Date(today.getFullYear(), today.getMonth(), today.getDate());

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <LinearGradient colors={[Colors.primary[700], Colors.primary[500]]} style={styles.header}>
        <View style={styles.headerRow}>
          <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
            <ArrowLeft size={22} color={Colors.white} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Select Date</Text>
          <View style={{ width: 40 }} />
        </View>
        {cropSeasonHighlights[month] && (
          <View style={styles.seasonBanner}>
            <Text style={styles.seasonText}>🌾 {cropSeasonHighlights[month]}</Text>
          </View>
        )}
      </LinearGradient>

      <ScrollView showsVerticalScrollIndicator={false} style={styles.scroll} contentContainerStyle={styles.scrollContent}>
        <View style={styles.calendarCard}>
          <View style={styles.calMonthRow}>
            <TouchableOpacity style={styles.calNavBtn} onPress={prevMonth}>
              <ChevronLeft size={20} color={Colors.neutral[600]} />
            </TouchableOpacity>
            <Text style={styles.calMonthLabel}>{MONTHS[month]} {year}</Text>
            <TouchableOpacity style={styles.calNavBtn} onPress={nextMonth}>
              <ChevronRight size={20} color={Colors.neutral[600]} />
            </TouchableOpacity>
          </View>

          <View style={styles.dayNames}>
            {DAYS.map(d => (
              <Text key={d} style={styles.dayName}>{d}</Text>
            ))}
          </View>

          <View style={styles.daysGrid}>
            {Array.from({ length: firstDay }).map((_, i) => (
              <View key={`empty${i}`} style={styles.dayCell} />
            ))}
            {Array.from({ length: daysInMonth }).map((_, i) => {
              const day = i + 1;
              const busy = isBusy(day);
              const past = isPast(day);
              const selected = selectedDate === day;
              const isToday = day === today.getDate() && month === today.getMonth() && year === today.getFullYear();

              return (
                <TouchableOpacity
                  key={day}
                  style={[
                    styles.dayCell,
                    isToday && styles.todayCell,
                    selected && styles.selectedCell,
                    (busy || past) && styles.disabledCell,
                  ]}
                  onPress={() => !busy && !past && setSelectedDate(day)}
                  disabled={busy || past}
                >
                  <Text style={[
                    styles.dayText,
                    isToday && styles.todayText,
                    selected && styles.selectedText,
                    (busy || past) && styles.disabledText,
                  ]}>
                    {day}
                  </Text>
                  {busy && <View style={styles.busyDot} />}
                </TouchableOpacity>
              );
            })}
          </View>

          <View style={styles.legend}>
            <View style={styles.legendItem}><View style={styles.legendDotFree} /><Text style={styles.legendText}>Available</Text></View>
            <View style={styles.legendItem}><View style={styles.legendDotBusy} /><Text style={styles.legendText}>Booked</Text></View>
            <View style={styles.legendItem}><View style={styles.legendDotSelected} /><Text style={styles.legendText}>Selected</Text></View>
          </View>
        </View>

        {selectedDate && (
          <View style={styles.summaryCard}>
            <Text style={styles.summaryTitle}>Selected Date</Text>
            <Text style={styles.summaryDate}>{selectedDate} {MONTHS[month]} {year}</Text>
            <Text style={styles.summaryDay}>{DAYS[new Date(year, month, selectedDate).getDay()]}</Text>
          </View>
        )}
      </ScrollView>

      <View style={[styles.footer, { paddingBottom: insets.bottom + 12 }]}>
        <TouchableOpacity
          style={[styles.continueBtn, !selectedDate && styles.continueBtnDisabled]}
          onPress={() => selectedDate && router.push('/booking/timeslot')}
          disabled={!selectedDate}
        >
          <LinearGradient
            colors={selectedDate ? [Colors.primary[500], Colors.primary[700]] : [Colors.neutral[300], Colors.neutral[300]]}
            style={styles.continueGradient}
            start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
          >
            <Text style={[styles.continueText, !selectedDate && styles.continueTextDisabled]}>
              {selectedDate ? `Continue with ${selectedDate} ${MONTHS[month]}` : 'Select a Date'}
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
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
  seasonBanner: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: BorderRadius.full,
    paddingHorizontal: Spacing.md,
    paddingVertical: 6,
    alignSelf: 'center',
    marginTop: 8,
  },
  seasonText: { fontSize: FontSize.sm, color: Colors.white, fontWeight: FontWeight.semibold },
  scroll: { flex: 1 },
  scrollContent: { padding: Spacing.md, gap: Spacing.md },
  calendarCard: {
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.xl,
    padding: Spacing.md,
    ...Shadow.md,
    gap: 12,
  },
  calMonthRow: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
  },
  calNavBtn: {
    width: 36, height: 36, borderRadius: 18,
    backgroundColor: Colors.neutral[100],
    alignItems: 'center', justifyContent: 'center',
  },
  calMonthLabel: { fontSize: FontSize.lg, fontWeight: FontWeight.bold, color: Colors.neutral[900] },
  dayNames: { flexDirection: 'row', justifyContent: 'space-around' },
  dayName: { fontSize: FontSize.xs, fontWeight: FontWeight.bold, color: Colors.neutral[500], width: 36, textAlign: 'center' },
  daysGrid: { flexDirection: 'row', flexWrap: 'wrap' },
  dayCell: {
    width: '14.28%',
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  todayCell: { backgroundColor: Colors.primary[50], borderRadius: 22 },
  selectedCell: { backgroundColor: Colors.primary[600], borderRadius: 22 },
  disabledCell: { opacity: 0.35 },
  dayText: { fontSize: FontSize.md, color: Colors.neutral[800], fontWeight: FontWeight.medium },
  todayText: { color: Colors.primary[700], fontWeight: FontWeight.bold },
  selectedText: { color: Colors.white, fontWeight: FontWeight.bold },
  disabledText: { color: Colors.neutral[400] },
  busyDot: {
    position: 'absolute',
    bottom: 4,
    width: 5, height: 5, borderRadius: 2.5,
    backgroundColor: Colors.error[400],
  },
  legend: { flexDirection: 'row', justifyContent: 'center', gap: 20, paddingTop: 4 },
  legendItem: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  legendDotFree: { width: 10, height: 10, borderRadius: 5, backgroundColor: Colors.neutral[200] },
  legendDotBusy: { width: 10, height: 10, borderRadius: 5, backgroundColor: Colors.error[400] },
  legendDotSelected: { width: 10, height: 10, borderRadius: 5, backgroundColor: Colors.primary[600] },
  legendText: { fontSize: FontSize.xs, color: Colors.neutral[500] },
  summaryCard: {
    backgroundColor: Colors.primary[50],
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    alignItems: 'center',
    borderWidth: 1, borderColor: Colors.primary[200],
    gap: 4,
  },
  summaryTitle: { fontSize: FontSize.sm, color: Colors.neutral[500] },
  summaryDate: { fontSize: FontSize.xxl, fontWeight: FontWeight.bold, color: Colors.primary[700] },
  summaryDay: { fontSize: FontSize.sm, color: Colors.primary[600], fontWeight: FontWeight.medium },
  footer: {
    paddingHorizontal: Spacing.md,
    paddingTop: Spacing.sm,
    backgroundColor: Colors.white,
    borderTopWidth: 1, borderTopColor: Colors.neutral[100],
  },
  continueBtn: { borderRadius: BorderRadius.lg, overflow: 'hidden', ...Shadow.green },
  continueBtnDisabled: { shadowOpacity: 0, elevation: 0 },
  continueGradient: { paddingVertical: 16, alignItems: 'center' },
  continueText: { fontSize: FontSize.lg, fontWeight: FontWeight.bold, color: Colors.white },
  continueTextDisabled: { color: Colors.neutral[500] },
});
