import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity,
} from 'react-native';
import { useRouter } from 'expo-router';
import { ArrowLeft, TrendingUp, Wallet, Download, ChevronRight, Star } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors, FontSize, FontWeight, Spacing, BorderRadius, Shadow } from '@/constants/theme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const periods = ['This Week', 'This Month', 'Last Month', 'This Year'];

const transactions = [
  { id: '#AR-2026-4844', service: 'Tractor Ploughing', farmer: 'Vijay Rao', date: '15 Jun', amount: 4000, status: 'credited' },
  { id: '#AR-2026-4801', service: 'Rotavator Work', farmer: 'Lakshmi Devi', date: '14 Jun', amount: 1200, status: 'credited' },
  { id: '#AR-2026-4756', service: 'Tractor Ploughing', farmer: 'Ramu Babu', date: '12 Jun', amount: 3200, status: 'credited' },
  { id: '#AR-2026-4723', service: 'Rotavator Work', farmer: 'Sita Devi', date: '10 Jun', amount: 800, status: 'credited' },
  { id: 'WITHDRAW', service: 'Bank Withdrawal', farmer: 'To HDFC Bank', date: '10 Jun', amount: 5000, status: 'withdrawn' },
  { id: '#AR-2026-4698', service: 'Tractor Ploughing', farmer: 'Suresh Rao', date: '8 Jun', amount: 2800, status: 'credited' },
];

const weeklyData = [
  { day: 'M', amount: 1200, label: '₹1.2K' },
  { day: 'T', amount: 2400, label: '₹2.4K' },
  { day: 'W', amount: 800, label: '₹800' },
  { day: 'T', amount: 3200, label: '₹3.2K' },
  { day: 'F', amount: 2000, label: '₹2K' },
  { day: 'S', amount: 4000, label: '₹4K' },
  { day: 'S', amount: 1600, label: '₹1.6K' },
];

const MAX_BAR = 4000;

export default function EarningsScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [activePeriod, setActivePeriod] = useState('This Month');

  const totalEarnings = transactions.filter(t => t.status === 'credited').reduce((s, t) => s + t.amount, 0);
  const withdrawn = transactions.filter(t => t.status === 'withdrawn').reduce((s, t) => s + t.amount, 0);
  const balance = totalEarnings - withdrawn;

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <ArrowLeft size={22} color={Colors.neutral[800]} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Earnings Dashboard</Text>
        <View style={{ width: 36 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <LinearGradient colors={[Colors.primary[800], Colors.primary[600]]} style={styles.earningsCard}>
          <Text style={styles.earningsLabel}>Available Balance</Text>
          <Text style={styles.earningsAmount}>₹{balance.toLocaleString('en-IN')}</Text>
          <View style={styles.earningsStats}>
            <View style={styles.earningsStat}>
              <Text style={styles.earningsStatLabel}>Total Earned</Text>
              <Text style={styles.earningsStatValue}>₹{totalEarnings.toLocaleString('en-IN')}</Text>
            </View>
            <View style={styles.earningsStatDivider} />
            <View style={styles.earningsStat}>
              <Text style={styles.earningsStatLabel}>Withdrawn</Text>
              <Text style={styles.earningsStatValue}>₹{withdrawn.toLocaleString('en-IN')}</Text>
            </View>
            <View style={styles.earningsStatDivider} />
            <View style={styles.earningsStat}>
              <Text style={styles.earningsStatLabel}>Bookings</Text>
              <Text style={styles.earningsStatValue}>24</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.withdrawBtn}>
            <Wallet size={16} color={Colors.primary[700]} />
            <Text style={styles.withdrawBtnText}>Withdraw to Bank</Text>
          </TouchableOpacity>
        </LinearGradient>

        <View style={styles.ratingCard}>
          <View style={styles.ratingLeft}>
            <Text style={styles.ratingValue}>4.8</Text>
            <View style={{ flexDirection: 'row', gap: 3 }}>
              {[1,2,3,4,5].map(s => (
                <Star key={s} size={14} color={s <= 5 ? Colors.secondary[400] : Colors.neutral[300]} fill={s <= 4 ? Colors.secondary[400] : s === 5 ? Colors.secondary[400] : 'transparent'} />
              ))}
            </View>
            <Text style={styles.ratingSubtext}>Provider Rating</Text>
          </View>
          <View style={styles.ratingDivider} />
          <View style={styles.ratingRight}>
            <Text style={styles.completionRate}>96%</Text>
            <Text style={styles.completionLabel}>Completion Rate</Text>
          </View>
          <View style={styles.ratingDivider} />
          <View style={styles.ratingRight}>
            <Text style={styles.completionRate}>15 min</Text>
            <Text style={styles.completionLabel}>Avg. Response</Text>
          </View>
        </View>

        <View style={styles.periodBar}>
          {periods.map(p => (
            <TouchableOpacity
              key={p}
              style={[styles.periodChip, activePeriod === p && styles.periodChipActive]}
              onPress={() => setActivePeriod(p)}
            >
              <Text style={[styles.periodText, activePeriod === p && styles.periodTextActive]}>{p}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.chartCard}>
          <View style={styles.chartHeader}>
            <Text style={styles.sectionTitle}>Daily Earnings</Text>
            <View style={styles.trendBadge}>
              <TrendingUp size={12} color={Colors.success[600]} />
              <Text style={styles.trendText}>+18% vs last week</Text>
            </View>
          </View>
          <View style={styles.barChart}>
            {weeklyData.map((bar, i) => (
              <View key={i} style={styles.barWrap}>
                <Text style={styles.barLabel}>{bar.label}</Text>
                <View style={styles.barTrack}>
                  <View style={[styles.bar, { height: (bar.amount / MAX_BAR) * 100 + '%' as any }]} />
                </View>
                <Text style={styles.barDay}>{bar.day}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.transactionsSection}>
          <View style={styles.transactionsHeader}>
            <Text style={styles.sectionTitle}>Recent Transactions</Text>
            <TouchableOpacity style={styles.downloadBtn}>
              <Download size={14} color={Colors.primary[600]} />
              <Text style={styles.downloadText}>Export</Text>
            </TouchableOpacity>
          </View>

          {transactions.map(tx => (
            <View key={tx.id} style={styles.txRow}>
              <View style={[styles.txIcon, { backgroundColor: tx.status === 'credited' ? Colors.success[50] : Colors.error[50] }]}>
                <Text style={{ fontSize: 16 }}>{tx.status === 'credited' ? '💰' : '🏦'}</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.txService}>{tx.service}</Text>
                <Text style={styles.txFarmer}>{tx.farmer} • {tx.date}</Text>
              </View>
              <View style={styles.txAmountWrap}>
                <Text style={[styles.txAmount, { color: tx.status === 'credited' ? Colors.success[600] : Colors.error[600] }]}>
                  {tx.status === 'credited' ? '+' : '-'}₹{tx.amount.toLocaleString('en-IN')}
                </Text>
                <Text style={styles.txStatus}>{tx.status}</Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.neutral[50] },
  header: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: Spacing.md, paddingVertical: Spacing.md,
    backgroundColor: Colors.white, borderBottomWidth: 1, borderBottomColor: Colors.neutral[100],
  },
  backBtn: { width: 36, height: 36, borderRadius: 18, backgroundColor: Colors.neutral[100], alignItems: 'center', justifyContent: 'center' },
  headerTitle: { fontSize: FontSize.lg, fontWeight: FontWeight.bold, color: Colors.neutral[900] },
  scrollContent: { padding: Spacing.md, gap: Spacing.md, paddingBottom: 40 },
  earningsCard: { borderRadius: BorderRadius.xl, padding: Spacing.lg, gap: 12 },
  earningsLabel: { fontSize: FontSize.sm, color: 'rgba(255,255,255,0.8)' },
  earningsAmount: { fontSize: 40, fontWeight: FontWeight.bold, color: Colors.white },
  earningsStats: { flexDirection: 'row', alignItems: 'center' },
  earningsStat: { flex: 1, alignItems: 'center' },
  earningsStatLabel: { fontSize: FontSize.xs, color: 'rgba(255,255,255,0.7)' },
  earningsStatValue: { fontSize: FontSize.md, fontWeight: FontWeight.bold, color: Colors.white },
  earningsStatDivider: { width: 1, height: 32, backgroundColor: 'rgba(255,255,255,0.2)' },
  withdrawBtn: {
    flexDirection: 'row', alignItems: 'center', gap: 8, justifyContent: 'center',
    backgroundColor: Colors.white, borderRadius: BorderRadius.lg, paddingVertical: 12,
  },
  withdrawBtnText: { fontSize: FontSize.md, fontWeight: FontWeight.bold, color: Colors.primary[700] },
  ratingCard: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: Colors.white, borderRadius: BorderRadius.xl, padding: Spacing.md,
    ...Shadow.sm,
  },
  ratingLeft: { flex: 1, alignItems: 'center', gap: 4 },
  ratingValue: { fontSize: 28, fontWeight: FontWeight.bold, color: Colors.neutral[900] },
  ratingSubtext: { fontSize: FontSize.xs, color: Colors.neutral[500] },
  ratingDivider: { width: 1, height: 50, backgroundColor: Colors.neutral[100] },
  ratingRight: { flex: 1, alignItems: 'center', gap: 4 },
  completionRate: { fontSize: FontSize.xl, fontWeight: FontWeight.bold, color: Colors.primary[700] },
  completionLabel: { fontSize: FontSize.xs, color: Colors.neutral[500], textAlign: 'center' },
  periodBar: { flexDirection: 'row', gap: 6 },
  periodChip: {
    flex: 1, paddingVertical: 8, borderRadius: BorderRadius.full,
    borderWidth: 1.5, borderColor: Colors.neutral[200], alignItems: 'center',
  },
  periodChipActive: { backgroundColor: Colors.primary[600], borderColor: Colors.primary[600] },
  periodText: { fontSize: 10, fontWeight: FontWeight.semibold, color: Colors.neutral[600] },
  periodTextActive: { color: Colors.white },
  chartCard: { backgroundColor: Colors.white, borderRadius: BorderRadius.xl, padding: Spacing.md, gap: Spacing.md, ...Shadow.sm },
  chartHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  sectionTitle: { fontSize: FontSize.lg, fontWeight: FontWeight.bold, color: Colors.neutral[900] },
  trendBadge: {
    flexDirection: 'row', alignItems: 'center', gap: 4,
    backgroundColor: Colors.success[50], borderRadius: BorderRadius.full, paddingHorizontal: 8, paddingVertical: 3,
  },
  trendText: { fontSize: FontSize.xs, color: Colors.success[700], fontWeight: FontWeight.semibold },
  barChart: { flexDirection: 'row', alignItems: 'flex-end', gap: 6, height: 130 },
  barWrap: { flex: 1, alignItems: 'center', gap: 4, height: '100%' },
  barLabel: { fontSize: 9, color: Colors.neutral[500], textAlign: 'center' },
  barTrack: { flex: 1, width: '100%', backgroundColor: Colors.neutral[100], borderRadius: 4, justifyContent: 'flex-end' },
  bar: { backgroundColor: Colors.primary[500], borderRadius: 4, minHeight: 8 },
  barDay: { fontSize: FontSize.xs, color: Colors.neutral[500], fontWeight: FontWeight.semibold },
  transactionsSection: { gap: Spacing.sm },
  transactionsHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  downloadBtn: { flexDirection: 'row', alignItems: 'center', gap: 4, paddingVertical: 4, paddingHorizontal: 10, borderRadius: BorderRadius.full, backgroundColor: Colors.primary[50], borderWidth: 1, borderColor: Colors.primary[200] },
  downloadText: { fontSize: FontSize.xs, fontWeight: FontWeight.semibold, color: Colors.primary[600] },
  txRow: {
    flexDirection: 'row', alignItems: 'center', gap: Spacing.md,
    backgroundColor: Colors.white, borderRadius: BorderRadius.lg, padding: Spacing.md,
    ...Shadow.sm,
  },
  txIcon: { width: 44, height: 44, borderRadius: 22, alignItems: 'center', justifyContent: 'center' },
  txService: { fontSize: FontSize.sm, fontWeight: FontWeight.semibold, color: Colors.neutral[900] },
  txFarmer: { fontSize: FontSize.xs, color: Colors.neutral[500] },
  txAmountWrap: { alignItems: 'flex-end', gap: 2 },
  txAmount: { fontSize: FontSize.md, fontWeight: FontWeight.bold },
  txStatus: { fontSize: FontSize.xs, color: Colors.neutral[400], textTransform: 'capitalize' },
});
