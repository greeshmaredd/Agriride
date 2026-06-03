import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity,
} from 'react-native';
import { useRouter } from 'expo-router';
import { TrendingUp, Users, Tractor, IndianRupee, CircleCheck, Clock, CircleX, ChevronRight, Bell, Settings, BarChart3, Shield } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors, FontSize, FontWeight, Spacing, BorderRadius, Shadow } from '@/constants/theme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const kpiCards = [
  { label: 'Total Revenue', value: '₹18.4L', change: '+24%', positive: true, icon: IndianRupee, color: Colors.primary[600], bg: Colors.primary[50] },
  { label: 'Active Farmers', value: '3,241', change: '+12%', positive: true, icon: Users, color: Colors.secondary[600], bg: Colors.secondary[50] },
  { label: 'Providers', value: '892', change: '+8%', positive: true, icon: Tractor, color: '#0891b2', bg: '#e0f7fa' },
  { label: 'Pending Verifications', value: '47', change: '-5', positive: false, icon: Shield, color: Colors.error[600], bg: Colors.error[50] },
];

const bookingStats = [
  { label: 'Completed', value: 1842, color: Colors.success[500], pct: '73%' },
  { label: 'Ongoing', value: 312, color: Colors.primary[500], pct: '12%' },
  { label: 'Cancelled', value: 189, color: Colors.error[400], pct: '7.5%' },
  { label: 'Pending', value: 196, color: Colors.secondary[400], pct: '7.5%' },
];

const recentActivity = [
  { id: 1, type: 'booking', msg: 'New booking #AR-2026-4895 confirmed', time: '2 min ago', icon: '📋' },
  { id: 2, type: 'provider', msg: 'Ramu Kumar (Tractor) — verification pending', time: '15 min ago', icon: '🚜' },
  { id: 3, type: 'complaint', msg: 'Complaint CMP-2026-1084 raised by Suresh Reddy', time: '1 hr ago', icon: '⚠️' },
  { id: 4, type: 'payment', msg: '₹12,450 payout processed to 8 providers', time: '2 hrs ago', icon: '💳' },
  { id: 5, type: 'user', msg: '24 new farmers registered in Kurnool district', time: '3 hrs ago', icon: '👥' },
];

const topProviders = [
  { name: 'Ramu Kumar', service: 'Tractor', bookings: 48, rating: 4.9, earnings: '₹52K' },
  { name: 'Sai Harvester', service: 'Harvester', bookings: 35, rating: 4.8, earnings: '₹89K' },
  { name: 'AgroSprint', service: 'Drone', bookings: 61, rating: 4.7, earnings: '₹43K' },
];

const pendingVerifications = [
  { name: 'Mahesh Tractor', type: 'Tractor Service', submitted: '2 Jun 2026', docs: 3 },
  { name: 'Ravi JCB Works', type: 'JCB Service', submitted: '3 Jun 2026', docs: 2 },
  { name: 'Krishna Transport', type: 'Transport', submitted: '3 Jun 2026', docs: 4 },
];

const weeklyRevenue = [68, 45, 82, 91, 55, 100, 74];
const weekDays = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

export default function AdminDashboardScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [activeSection, setActiveSection] = useState<'overview' | 'providers' | 'bookings' | 'complaints'>('overview');

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <LinearGradient colors={[Colors.primary[900], Colors.primary[800]]} style={styles.topBar}>
        <View>
          <Text style={styles.topBarTitle}>Admin Dashboard</Text>
          <Text style={styles.topBarSubtitle}>AgriRide Control Panel • Jun 2026</Text>
        </View>
        <View style={styles.topBarActions}>
          <TouchableOpacity style={styles.topBarBtn}>
            <Bell size={20} color={Colors.white} />
            <View style={styles.notifDot} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.topBarBtn}>
            <Settings size={20} color={Colors.white} />
          </TouchableOpacity>
        </View>
      </LinearGradient>

      <View style={styles.navTabs}>
        {(['overview', 'providers', 'bookings', 'complaints'] as const).map(tab => (
          <TouchableOpacity
            key={tab}
            style={[styles.navTab, activeSection === tab && styles.navTabActive]}
            onPress={() => setActiveSection(tab)}
          >
            <Text style={[styles.navTabText, activeSection === tab && styles.navTabTextActive]}>
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <View style={styles.kpiGrid}>
          {kpiCards.map(kpi => {
            const Icon = kpi.icon;
            return (
              <View key={kpi.label} style={styles.kpiCard}>
                <View style={[styles.kpiIconWrap, { backgroundColor: kpi.bg }]}>
                  <Icon size={20} color={kpi.color} />
                </View>
                <Text style={styles.kpiValue}>{kpi.value}</Text>
                <Text style={styles.kpiLabel}>{kpi.label}</Text>
                <View style={[styles.kpiChangeBadge, { backgroundColor: kpi.positive ? Colors.success[50] : Colors.error[50] }]}>
                  <TrendingUp size={10} color={kpi.positive ? Colors.success[600] : Colors.error[600]} style={kpi.positive ? {} : { transform: [{ rotate: '180deg' }] }} />
                  <Text style={[styles.kpiChange, { color: kpi.positive ? Colors.success[700] : Colors.error[700] }]}>{kpi.change}</Text>
                </View>
              </View>
            );
          })}
        </View>

        <View style={styles.chartCard}>
          <View style={styles.chartHeader}>
            <View>
              <Text style={styles.sectionTitle}>Revenue (This Week)</Text>
              <Text style={styles.chartTotal}>₹3,24,850</Text>
            </View>
            <View style={styles.trendBadge}>
              <TrendingUp size={12} color={Colors.success[600]} />
              <Text style={styles.trendText}>+18%</Text>
            </View>
          </View>
          <View style={styles.barChart}>
            {weeklyRevenue.map((h, i) => (
              <View key={i} style={styles.barWrap}>
                <View style={styles.barTrack}>
                  <LinearGradient
                    colors={[Colors.primary[400], Colors.primary[600]]}
                    style={[styles.bar, { height: `${h}%` }]}
                  />
                </View>
                <Text style={styles.barDay}>{weekDays[i]}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.statsCard}>
          <Text style={styles.sectionTitle}>Booking Breakdown</Text>
          <View style={styles.progressBarsWrap}>
            {bookingStats.map(stat => (
              <View key={stat.label} style={styles.progressBarRow}>
                <View style={styles.progressBarLabelRow}>
                  <View style={[styles.progressDot, { backgroundColor: stat.color }]} />
                  <Text style={styles.progressLabel}>{stat.label}</Text>
                  <Text style={styles.progressValue}>{stat.value.toLocaleString('en-IN')}</Text>
                  <Text style={styles.progressPct}>{stat.pct}</Text>
                </View>
                <View style={styles.progressTrack}>
                  <View style={[styles.progressFill, { width: stat.pct as any, backgroundColor: stat.color }]} />
                </View>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.pendingCard}>
          <View style={styles.cardHeader}>
            <Text style={styles.sectionTitle}>Pending Verifications</Text>
            <View style={styles.countBadge}><Text style={styles.countBadgeText}>47</Text></View>
          </View>
          {pendingVerifications.map(pv => (
            <View key={pv.name} style={styles.verificationRow}>
              <View style={styles.verificationIcon}>
                <Text style={{ fontSize: 18 }}>🚜</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.verificationName}>{pv.name}</Text>
                <Text style={styles.verificationType}>{pv.type} • {pv.docs} docs submitted</Text>
                <Text style={styles.verificationDate}>Submitted: {pv.submitted}</Text>
              </View>
              <View style={styles.verificationActions}>
                <TouchableOpacity style={styles.verifyAcceptBtn}>
                  <CircleCheck size={16} color={Colors.success[600]} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.verifyRejectBtn}>
                  <CircleX size={16} color={Colors.error[600]} />
                </TouchableOpacity>
              </View>
            </View>
          ))}
          <TouchableOpacity style={styles.viewAllBtn}>
            <Text style={styles.viewAllText}>View All 47 Pending</Text>
            <ChevronRight size={14} color={Colors.primary[600]} />
          </TouchableOpacity>
        </View>

        <View style={styles.topProvidersCard}>
          <Text style={styles.sectionTitle}>Top Performers This Month</Text>
          {topProviders.map((p, i) => (
            <View key={p.name} style={styles.providerRow}>
              <View style={styles.providerRank}>
                <Text style={styles.providerRankText}>#{i + 1}</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.providerName}>{p.name}</Text>
                <Text style={styles.providerService}>{p.service} • {p.bookings} bookings</Text>
              </View>
              <View style={styles.providerStats}>
                <Text style={styles.providerRating}>⭐ {p.rating}</Text>
                <Text style={styles.providerEarnings}>{p.earnings}</Text>
              </View>
            </View>
          ))}
        </View>

        <View style={styles.activityCard}>
          <Text style={styles.sectionTitle}>Recent Activity</Text>
          {recentActivity.map(act => (
            <View key={act.id} style={styles.activityRow}>
              <View style={styles.activityIcon}>
                <Text style={{ fontSize: 18 }}>{act.icon}</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.activityMsg}>{act.msg}</Text>
                <Text style={styles.activityTime}>{act.time}</Text>
              </View>
            </View>
          ))}
        </View>

        <View style={styles.quickActions}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.actionGrid}>
            {[
              { label: 'Verify Providers', emoji: '✅', color: Colors.success[600] },
              { label: 'Manage Categories', emoji: '📂', color: Colors.primary[600] },
              { label: 'Send Notifications', emoji: '📢', color: Colors.secondary[600] },
              { label: 'Export Reports', emoji: '📊', color: '#0891b2' },
              { label: 'Manage Pricing', emoji: '💰', color: Colors.primary[700] },
              { label: 'View Complaints', emoji: '🗂️', color: Colors.error[600] },
            ].map(action => (
              <TouchableOpacity key={action.label} style={styles.actionCard} activeOpacity={0.8}>
                <Text style={styles.actionEmoji}>{action.emoji}</Text>
                <Text style={[styles.actionLabel, { color: action.color }]}>{action.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.neutral[100] },
  topBar: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: Spacing.md, paddingVertical: Spacing.md,
  },
  topBarTitle: { fontSize: FontSize.xl, fontWeight: FontWeight.bold, color: Colors.white },
  topBarSubtitle: { fontSize: FontSize.xs, color: 'rgba(255,255,255,0.7)', marginTop: 2 },
  topBarActions: { flexDirection: 'row', gap: 8 },
  topBarBtn: {
    width: 38, height: 38, borderRadius: 19,
    backgroundColor: 'rgba(255,255,255,0.15)', alignItems: 'center', justifyContent: 'center',
  },
  notifDot: {
    position: 'absolute', top: 6, right: 6,
    width: 8, height: 8, borderRadius: 4, backgroundColor: Colors.error[500],
    borderWidth: 1.5, borderColor: Colors.primary[800],
  },
  navTabs: {
    flexDirection: 'row', backgroundColor: Colors.white,
    borderBottomWidth: 1, borderBottomColor: Colors.neutral[200],
  },
  navTab: {
    flex: 1, paddingVertical: 12, alignItems: 'center',
    borderBottomWidth: 2, borderBottomColor: 'transparent',
  },
  navTabActive: { borderBottomColor: Colors.primary[600] },
  navTabText: { fontSize: FontSize.xs, fontWeight: FontWeight.semibold, color: Colors.neutral[500] },
  navTabTextActive: { color: Colors.primary[600] },
  scrollContent: { padding: Spacing.md, gap: Spacing.md, paddingBottom: 40 },
  kpiGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.sm },
  kpiCard: {
    width: '48%', backgroundColor: Colors.white, borderRadius: BorderRadius.xl,
    padding: Spacing.md, gap: 6, ...Shadow.sm,
  },
  kpiIconWrap: { width: 40, height: 40, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  kpiValue: { fontSize: FontSize.xl, fontWeight: FontWeight.bold, color: Colors.neutral[900] },
  kpiLabel: { fontSize: FontSize.xs, color: Colors.neutral[500] },
  kpiChangeBadge: {
    flexDirection: 'row', alignItems: 'center', gap: 3, alignSelf: 'flex-start',
    paddingHorizontal: 6, paddingVertical: 2, borderRadius: BorderRadius.full,
  },
  kpiChange: { fontSize: 10, fontWeight: FontWeight.bold },
  chartCard: { backgroundColor: Colors.white, borderRadius: BorderRadius.xl, padding: Spacing.md, gap: Spacing.md, ...Shadow.sm },
  chartHeader: { flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between' },
  sectionTitle: { fontSize: FontSize.md, fontWeight: FontWeight.bold, color: Colors.neutral[900] },
  chartTotal: { fontSize: FontSize.xl, fontWeight: FontWeight.bold, color: Colors.primary[700], marginTop: 2 },
  trendBadge: {
    flexDirection: 'row', alignItems: 'center', gap: 4,
    backgroundColor: Colors.success[50], borderRadius: BorderRadius.full,
    paddingHorizontal: 8, paddingVertical: 3,
  },
  trendText: { fontSize: FontSize.xs, color: Colors.success[700], fontWeight: FontWeight.semibold },
  barChart: { flexDirection: 'row', alignItems: 'flex-end', gap: 6, height: 120 },
  barWrap: { flex: 1, alignItems: 'center', gap: 6, height: '100%' },
  barTrack: { flex: 1, width: '100%', backgroundColor: Colors.neutral[100], borderRadius: 6, justifyContent: 'flex-end', overflow: 'hidden' },
  bar: { width: '100%', borderRadius: 6, minHeight: 8 },
  barDay: { fontSize: FontSize.xs, color: Colors.neutral[500], fontWeight: FontWeight.semibold },
  statsCard: { backgroundColor: Colors.white, borderRadius: BorderRadius.xl, padding: Spacing.md, gap: Spacing.md, ...Shadow.sm },
  progressBarsWrap: { gap: Spacing.sm },
  progressBarRow: { gap: 6 },
  progressBarLabelRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  progressDot: { width: 8, height: 8, borderRadius: 4 },
  progressLabel: { flex: 1, fontSize: FontSize.xs, color: Colors.neutral[700] },
  progressValue: { fontSize: FontSize.xs, fontWeight: FontWeight.bold, color: Colors.neutral[800] },
  progressPct: { fontSize: FontSize.xs, color: Colors.neutral[400], width: 36, textAlign: 'right' },
  progressTrack: { height: 8, backgroundColor: Colors.neutral[100], borderRadius: 4, overflow: 'hidden' },
  progressFill: { height: '100%', borderRadius: 4 },
  pendingCard: { backgroundColor: Colors.white, borderRadius: BorderRadius.xl, padding: Spacing.md, gap: Spacing.sm, ...Shadow.sm },
  cardHeader: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 4 },
  countBadge: { backgroundColor: Colors.error[100], borderRadius: BorderRadius.full, paddingHorizontal: 8, paddingVertical: 2 },
  countBadgeText: { fontSize: FontSize.xs, fontWeight: FontWeight.bold, color: Colors.error[700] },
  verificationRow: { flexDirection: 'row', alignItems: 'center', gap: Spacing.sm, paddingVertical: 8, borderBottomWidth: 1, borderBottomColor: Colors.neutral[100] },
  verificationIcon: { width: 40, height: 40, borderRadius: 12, backgroundColor: Colors.neutral[100], alignItems: 'center', justifyContent: 'center' },
  verificationName: { fontSize: FontSize.sm, fontWeight: FontWeight.bold, color: Colors.neutral[900] },
  verificationType: { fontSize: FontSize.xs, color: Colors.neutral[500] },
  verificationDate: { fontSize: 10, color: Colors.neutral[400] },
  verificationActions: { flexDirection: 'row', gap: 8 },
  verifyAcceptBtn: { width: 34, height: 34, borderRadius: 17, backgroundColor: Colors.success[50], alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: Colors.success[200] },
  verifyRejectBtn: { width: 34, height: 34, borderRadius: 17, backgroundColor: Colors.error[50], alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: Colors.error[200] },
  viewAllBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 4, paddingVertical: 8 },
  viewAllText: { fontSize: FontSize.sm, fontWeight: FontWeight.semibold, color: Colors.primary[600] },
  topProvidersCard: { backgroundColor: Colors.white, borderRadius: BorderRadius.xl, padding: Spacing.md, gap: Spacing.sm, ...Shadow.sm },
  providerRow: { flexDirection: 'row', alignItems: 'center', gap: Spacing.sm, paddingVertical: 8, borderBottomWidth: 1, borderBottomColor: Colors.neutral[100] },
  providerRank: { width: 28, height: 28, borderRadius: 14, backgroundColor: Colors.primary[100], alignItems: 'center', justifyContent: 'center' },
  providerRankText: { fontSize: FontSize.xs, fontWeight: FontWeight.bold, color: Colors.primary[700] },
  providerName: { fontSize: FontSize.sm, fontWeight: FontWeight.bold, color: Colors.neutral[900] },
  providerService: { fontSize: FontSize.xs, color: Colors.neutral[500] },
  providerStats: { alignItems: 'flex-end', gap: 3 },
  providerRating: { fontSize: FontSize.xs, color: Colors.neutral[700] },
  providerEarnings: { fontSize: FontSize.sm, fontWeight: FontWeight.bold, color: Colors.primary[700] },
  activityCard: { backgroundColor: Colors.white, borderRadius: BorderRadius.xl, padding: Spacing.md, gap: Spacing.sm, ...Shadow.sm },
  activityRow: { flexDirection: 'row', alignItems: 'flex-start', gap: Spacing.md, paddingVertical: 6, borderBottomWidth: 1, borderBottomColor: Colors.neutral[100] },
  activityIcon: { width: 36, height: 36, borderRadius: 18, backgroundColor: Colors.neutral[100], alignItems: 'center', justifyContent: 'center' },
  activityMsg: { fontSize: FontSize.xs, color: Colors.neutral[800], lineHeight: 18 },
  activityTime: { fontSize: 10, color: Colors.neutral[400], marginTop: 2 },
  quickActions: { gap: Spacing.sm },
  actionGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.sm },
  actionCard: {
    width: '31%', backgroundColor: Colors.white, borderRadius: BorderRadius.xl,
    padding: Spacing.md, alignItems: 'center', gap: 8, ...Shadow.sm,
  },
  actionEmoji: { fontSize: 28 },
  actionLabel: { fontSize: FontSize.xs, fontWeight: FontWeight.semibold, textAlign: 'center' },
});
