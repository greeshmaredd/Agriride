import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity, Image,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Star, RefreshCw, ChevronRight, Clock, CircleCheck, CircleX } from 'lucide-react-native';
import { Colors, FontSize, FontWeight, Spacing, BorderRadius, Shadow } from '@/constants/theme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const tabs = ['All', 'Upcoming', 'Completed', 'Cancelled'];

const bookings = [
  { id: '#AR-2026-4521', service: 'Tractor Ploughing', provider: 'Ramu Kumar', date: '15 Jun 2026', time: '7:00 AM', amount: '₹3,416', status: 'upcoming', rated: false, image: 'https://images.pexels.com/photos/2889890/pexels-photo-2889890.jpeg?auto=compress&cs=tinysrgb&w=200' },
  { id: '#AR-2026-3104', service: 'Paddy Harvesting', provider: 'Sai Harvester', date: '10 Jun 2026', time: '6:30 AM', amount: '₹5,200', status: 'completed', rated: true, rating: 4.5, image: 'https://images.pexels.com/photos/1595104/pexels-photo-1595104.jpeg?auto=compress&cs=tinysrgb&w=200' },
  { id: '#AR-2026-2987', service: 'JCB Land Leveling', provider: 'Mahendra JCB', date: '5 Jun 2026', time: '8:00 AM', amount: '₹7,500', status: 'completed', rated: false, image: 'https://images.pexels.com/photos/2219024/pexels-photo-2219024.jpeg?auto=compress&cs=tinysrgb&w=200' },
  { id: '#AR-2026-2341', service: 'Drone Spraying', provider: 'AgroSprint', date: '1 Jun 2026', time: '5:30 AM', amount: '₹2,400', status: 'cancelled', rated: false, image: 'https://images.pexels.com/photos/2889890/pexels-photo-2889890.jpeg?auto=compress&cs=tinysrgb&w=200' },
];

const statusConfig = {
  upcoming: { color: Colors.primary[600], bg: Colors.primary[50], icon: Clock, label: 'Upcoming' },
  completed: { color: Colors.success[600], bg: Colors.success[50], icon: CircleCheck, label: 'Completed' },
  cancelled: { color: Colors.error[600], bg: Colors.error[50], icon: CircleX, label: 'Cancelled' },
};

export default function BookingsScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [activeTab, setActiveTab] = useState('All');

  const filtered = bookings.filter(b =>
    activeTab === 'All' ? true :
    activeTab === 'Upcoming' ? b.status === 'upcoming' :
    activeTab === 'Completed' ? b.status === 'completed' :
    b.status === 'cancelled'
  );

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Bookings</Text>
      </View>

      <View style={styles.tabBar}>
        {tabs.map(tab => (
          <TouchableOpacity
            key={tab}
            style={[styles.tab, activeTab === tab && styles.tabActive]}
            onPress={() => setActiveTab(tab)}
          >
            <Text style={[styles.tabText, activeTab === tab && styles.tabTextActive]}>{tab}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView showsVerticalScrollIndicator={false} style={styles.scroll} contentContainerStyle={styles.scrollContent}>
        {filtered.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyEmoji}>📋</Text>
            <Text style={styles.emptyTitle}>No bookings found</Text>
            <Text style={styles.emptyDesc}>Your {activeTab.toLowerCase()} bookings will appear here</Text>
          </View>
        ) : (
          filtered.map((b) => {
            const config = statusConfig[b.status as keyof typeof statusConfig];
            const StatusIcon = config.icon;
            return (
              <TouchableOpacity
                key={b.id}
                style={styles.bookingCard}
                onPress={() => router.push('/booking/tracking')}
                activeOpacity={0.88}
              >
                <Image source={{ uri: b.image }} style={styles.bookingImg} />
                <View style={styles.bookingInfo}>
                  <View style={styles.bookingTop}>
                    <Text style={styles.bookingId}>{b.id}</Text>
                    <View style={[styles.statusBadge, { backgroundColor: config.bg }]}>
                      <StatusIcon size={11} color={config.color} />
                      <Text style={[styles.statusText, { color: config.color }]}>{config.label}</Text>
                    </View>
                  </View>
                  <Text style={styles.serviceName}>{b.service}</Text>
                  <Text style={styles.providerName}>{b.provider}</Text>
                  <View style={styles.metaRow}>
                    <Text style={styles.metaText}>{b.date} • {b.time}</Text>
                    <Text style={styles.amountText}>{b.amount}</Text>
                  </View>

                  {b.status === 'completed' && (
                    <View style={styles.actionsRow}>
                      {!b.rated ? (
                        <TouchableOpacity
                          style={styles.rateBtn}
                          onPress={() => router.push('/services/reviews')}
                        >
                          <Star size={12} color={Colors.secondary[500]} />
                          <Text style={styles.rateBtnText}>Rate Service</Text>
                        </TouchableOpacity>
                      ) : (
                        <View style={styles.ratedBadge}>
                          <Star size={12} color={Colors.secondary[400]} fill={Colors.secondary[400]} />
                          <Text style={styles.ratedText}>{b.rating} Rated</Text>
                        </View>
                      )}
                      <TouchableOpacity style={styles.rebookBtn} onPress={() => router.push('/booking/calendar')}>
                        <RefreshCw size={12} color={Colors.primary[600]} />
                        <Text style={styles.rebookText}>Rebook</Text>
                      </TouchableOpacity>
                    </View>
                  )}
                  {b.status === 'upcoming' && (
                    <TouchableOpacity style={styles.trackBtn} onPress={() => router.push('/booking/tracking')}>
                      <Text style={styles.trackBtnText}>Track Vehicle</Text>
                      <ChevronRight size={14} color={Colors.primary[600]} />
                    </TouchableOpacity>
                  )}
                </View>
              </TouchableOpacity>
            );
          })
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.neutral[50] },
  header: { paddingHorizontal: Spacing.md, paddingVertical: Spacing.md, backgroundColor: Colors.white, borderBottomWidth: 1, borderBottomColor: Colors.neutral[100] },
  headerTitle: { fontSize: FontSize.xl, fontWeight: FontWeight.bold, color: Colors.neutral[900] },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: Colors.white,
    paddingHorizontal: Spacing.md,
    paddingBottom: Spacing.sm,
    borderBottomWidth: 1, borderBottomColor: Colors.neutral[100],
    gap: 4,
  },
  tab: {
    paddingVertical: 8, paddingHorizontal: 14,
    borderRadius: BorderRadius.full,
    borderWidth: 1.5, borderColor: Colors.neutral[200],
  },
  tabActive: { backgroundColor: Colors.primary[600], borderColor: Colors.primary[600] },
  tabText: { fontSize: FontSize.sm, fontWeight: FontWeight.semibold, color: Colors.neutral[600] },
  tabTextActive: { color: Colors.white },
  scroll: { flex: 1 },
  scrollContent: { padding: Spacing.md, gap: Spacing.md },
  emptyState: { alignItems: 'center', paddingVertical: 60, gap: 12 },
  emptyEmoji: { fontSize: 48 },
  emptyTitle: { fontSize: FontSize.lg, fontWeight: FontWeight.bold, color: Colors.neutral[700] },
  emptyDesc: { fontSize: FontSize.sm, color: Colors.neutral[400] },
  bookingCard: {
    flexDirection: 'row',
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.lg,
    overflow: 'hidden',
    ...Shadow.sm,
  },
  bookingImg: { width: 80, height: 120, backgroundColor: Colors.neutral[200] },
  bookingInfo: { flex: 1, padding: 12, gap: 4 },
  bookingTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  bookingId: { fontSize: FontSize.xs, color: Colors.neutral[400], fontWeight: FontWeight.medium },
  statusBadge: {
    flexDirection: 'row', alignItems: 'center', gap: 3,
    paddingHorizontal: 7, paddingVertical: 2,
    borderRadius: BorderRadius.full,
  },
  statusText: { fontSize: 10, fontWeight: FontWeight.bold },
  serviceName: { fontSize: FontSize.md, fontWeight: FontWeight.bold, color: Colors.neutral[900] },
  providerName: { fontSize: FontSize.xs, color: Colors.neutral[500] },
  metaRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  metaText: { fontSize: FontSize.xs, color: Colors.neutral[400] },
  amountText: { fontSize: FontSize.sm, fontWeight: FontWeight.bold, color: Colors.primary[700] },
  actionsRow: { flexDirection: 'row', gap: 8, marginTop: 2 },
  rateBtn: {
    flexDirection: 'row', alignItems: 'center', gap: 4,
    paddingVertical: 5, paddingHorizontal: 10,
    borderRadius: BorderRadius.full,
    backgroundColor: Colors.secondary[50],
    borderWidth: 1, borderColor: Colors.secondary[200],
  },
  rateBtnText: { fontSize: 10, fontWeight: FontWeight.semibold, color: Colors.secondary[700] },
  ratedBadge: {
    flexDirection: 'row', alignItems: 'center', gap: 3,
    paddingVertical: 5, paddingHorizontal: 8,
    borderRadius: BorderRadius.full,
    backgroundColor: Colors.neutral[100],
  },
  ratedText: { fontSize: 10, color: Colors.neutral[600], fontWeight: FontWeight.medium },
  rebookBtn: {
    flexDirection: 'row', alignItems: 'center', gap: 4,
    paddingVertical: 5, paddingHorizontal: 10,
    borderRadius: BorderRadius.full,
    backgroundColor: Colors.primary[50],
    borderWidth: 1, borderColor: Colors.primary[200],
  },
  rebookText: { fontSize: 10, fontWeight: FontWeight.semibold, color: Colors.primary[700] },
  trackBtn: {
    flexDirection: 'row', alignItems: 'center', gap: 4,
    alignSelf: 'flex-start', marginTop: 4,
  },
  trackBtnText: { fontSize: FontSize.xs, fontWeight: FontWeight.semibold, color: Colors.primary[600] },
});
