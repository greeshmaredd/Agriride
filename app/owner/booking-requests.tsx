import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity,
} from 'react-native';
import { useRouter } from 'expo-router';
import { ArrowLeft, Phone, MessageCircle, CircleCheck, CircleX, Clock, MapPin, ChevronRight } from 'lucide-react-native';
import { Colors, FontSize, FontWeight, Spacing, BorderRadius, Shadow } from '@/constants/theme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const tabs = ['Pending', 'Accepted', 'Completed'];

const requests = [
  { id: '#AR-2026-4891', farmer: 'Suresh Reddy', service: 'Tractor Ploughing', location: 'Survey No. 45, Kurnool', date: '16 Jun 2026', time: '7:00 AM', acres: 3.5, amount: '₹2,800', status: 'pending', phone: '+91 98765 43210', urgency: 'high' },
  { id: '#AR-2026-4872', farmer: 'Ramesh Babu', service: 'Rotavator Work', location: 'Nandyal Road, Kurnool', date: '16 Jun 2026', time: '10:00 AM', acres: 2, amount: '₹1,600', status: 'pending', phone: '+91 87654 32109', urgency: 'medium' },
  { id: '#AR-2026-4844', farmer: 'Vijay Rao', service: 'Tractor Ploughing', location: 'Near Water Tank, Panyam', date: '15 Jun 2026', time: '6:30 AM', acres: 5, amount: '₹4,000', status: 'accepted', phone: '+91 76543 21098', urgency: 'low' },
  { id: '#AR-2026-4801', farmer: 'Lakshmi Devi', service: 'Rotavator Work', location: 'Dhone Road, Kurnool', date: '14 Jun 2026', time: '8:00 AM', acres: 1.5, amount: '₹1,200', status: 'completed', phone: '+91 65432 10987', urgency: 'low' },
];

const urgencyColors = {
  high: Colors.error[600],
  medium: Colors.secondary[500],
  low: Colors.success[600],
};

export default function BookingRequestsScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [activeTab, setActiveTab] = useState('Pending');
  const [localRequests, setLocalRequests] = useState(requests);

  const filtered = localRequests.filter(r =>
    activeTab === 'Pending' ? r.status === 'pending' :
    activeTab === 'Accepted' ? r.status === 'accepted' :
    r.status === 'completed'
  );

  const handleAccept = (id: string) => {
    setLocalRequests(prev => prev.map(r => r.id === id ? { ...r, status: 'accepted' } : r));
  };

  const handleReject = (id: string) => {
    setLocalRequests(prev => prev.map(r => r.id === id ? { ...r, status: 'rejected' } : r));
  };

  const pendingCount = localRequests.filter(r => r.status === 'pending').length;

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <ArrowLeft size={22} color={Colors.neutral[800]} />
        </TouchableOpacity>
        <View style={styles.headerTitleWrap}>
          <Text style={styles.headerTitle}>Booking Requests</Text>
          {pendingCount > 0 && (
            <View style={styles.pendingBadge}>
              <Text style={styles.pendingBadgeText}>{pendingCount} new</Text>
            </View>
          )}
        </View>
        <View style={{ width: 36 }} />
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

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {filtered.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyEmoji}>📋</Text>
            <Text style={styles.emptyTitle}>No {activeTab.toLowerCase()} requests</Text>
          </View>
        ) : (
          filtered.map(req => (
            <View key={req.id} style={styles.requestCard}>
              <View style={styles.requestHeader}>
                <Text style={styles.requestId}>{req.id}</Text>
                <View style={[styles.urgencyDot, { backgroundColor: urgencyColors[req.urgency as keyof typeof urgencyColors] }]} />
              </View>

              <Text style={styles.farmerName}>{req.farmer}</Text>
              <Text style={styles.serviceName}>{req.service}</Text>

              <View style={styles.infoRow}>
                <MapPin size={13} color={Colors.neutral[400]} />
                <Text style={styles.infoText}>{req.location}</Text>
              </View>

              <View style={styles.infoRow}>
                <Clock size={13} color={Colors.neutral[400]} />
                <Text style={styles.infoText}>{req.date} • {req.time}</Text>
              </View>

              <View style={styles.statsRow}>
                <View style={styles.statItem}>
                  <Text style={styles.statLabel}>Area</Text>
                  <Text style={styles.statValue}>{req.acres} Acres</Text>
                </View>
                <View style={styles.statItem}>
                  <Text style={styles.statLabel}>Earnings</Text>
                  <Text style={[styles.statValue, styles.earningsText]}>{req.amount}</Text>
                </View>
              </View>

              <View style={styles.contactRow}>
                <TouchableOpacity style={styles.contactBtn} onPress={() => router.push('/services/call-provider')}>
                  <Phone size={14} color={Colors.primary[600]} />
                  <Text style={styles.contactBtnText}>Call Farmer</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.contactBtn} onPress={() => router.push('/services/chat')}>
                  <MessageCircle size={14} color={Colors.primary[600]} />
                  <Text style={styles.contactBtnText}>Message</Text>
                </TouchableOpacity>
              </View>

              {req.status === 'pending' && (
                <View style={styles.actionRow}>
                  <TouchableOpacity
                    style={styles.rejectBtn}
                    onPress={() => handleReject(req.id)}
                  >
                    <CircleX size={16} color={Colors.error[600]} />
                    <Text style={styles.rejectBtnText}>Decline</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.acceptBtn}
                    onPress={() => handleAccept(req.id)}
                  >
                    <CircleCheck size={16} color={Colors.white} />
                    <Text style={styles.acceptBtnText}>Accept Booking</Text>
                  </TouchableOpacity>
                </View>
              )}

              {req.status === 'accepted' && (
                <View style={styles.acceptedBadgeWrap}>
                  <CircleCheck size={14} color={Colors.success[600]} />
                  <Text style={styles.acceptedBadgeText}>Booking Accepted</Text>
                  <TouchableOpacity style={styles.viewDetailsBtn} onPress={() => router.push('/booking/tracking')}>
                    <Text style={styles.viewDetailsBtnText}>Track</Text>
                    <ChevronRight size={12} color={Colors.primary[600]} />
                  </TouchableOpacity>
                </View>
              )}

              {req.status === 'completed' && (
                <View style={styles.completedBadgeWrap}>
                  <CircleCheck size={14} color={Colors.neutral[500]} />
                  <Text style={styles.completedBadgeText}>Completed • Payment Received</Text>
                </View>
              )}
            </View>
          ))
        )}
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
  headerTitleWrap: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  headerTitle: { fontSize: FontSize.lg, fontWeight: FontWeight.bold, color: Colors.neutral[900] },
  pendingBadge: { backgroundColor: Colors.error[600], borderRadius: BorderRadius.full, paddingHorizontal: 8, paddingVertical: 2 },
  pendingBadgeText: { fontSize: 10, fontWeight: FontWeight.bold, color: Colors.white },
  tabBar: {
    flexDirection: 'row', backgroundColor: Colors.white,
    paddingHorizontal: Spacing.md, paddingBottom: Spacing.sm,
    borderBottomWidth: 1, borderBottomColor: Colors.neutral[100], gap: 8,
  },
  tab: {
    paddingVertical: 8, paddingHorizontal: 16, borderRadius: BorderRadius.full,
    borderWidth: 1.5, borderColor: Colors.neutral[200],
  },
  tabActive: { backgroundColor: Colors.primary[600], borderColor: Colors.primary[600] },
  tabText: { fontSize: FontSize.sm, fontWeight: FontWeight.semibold, color: Colors.neutral[600] },
  tabTextActive: { color: Colors.white },
  scrollContent: { padding: Spacing.md, gap: Spacing.md, paddingBottom: 40 },
  emptyState: { alignItems: 'center', paddingVertical: 60, gap: 12 },
  emptyEmoji: { fontSize: 48 },
  emptyTitle: { fontSize: FontSize.lg, fontWeight: FontWeight.bold, color: Colors.neutral[500] },
  requestCard: {
    backgroundColor: Colors.white, borderRadius: BorderRadius.xl, padding: Spacing.md,
    gap: 8, ...Shadow.sm,
  },
  requestHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  requestId: { fontSize: FontSize.xs, color: Colors.neutral[400], fontWeight: FontWeight.medium },
  urgencyDot: { width: 10, height: 10, borderRadius: 5 },
  farmerName: { fontSize: FontSize.lg, fontWeight: FontWeight.bold, color: Colors.neutral[900] },
  serviceName: { fontSize: FontSize.sm, color: Colors.primary[700], fontWeight: FontWeight.semibold },
  infoRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  infoText: { fontSize: FontSize.xs, color: Colors.neutral[600] },
  statsRow: { flexDirection: 'row', gap: Spacing.lg, paddingVertical: 6, borderTopWidth: 1, borderTopColor: Colors.neutral[100] },
  statItem: {},
  statLabel: { fontSize: FontSize.xs, color: Colors.neutral[500] },
  statValue: { fontSize: FontSize.md, fontWeight: FontWeight.bold, color: Colors.neutral[900] },
  earningsText: { color: Colors.primary[700] },
  contactRow: { flexDirection: 'row', gap: 8 },
  contactBtn: {
    flexDirection: 'row', alignItems: 'center', gap: 6,
    paddingVertical: 7, paddingHorizontal: 12, borderRadius: BorderRadius.full,
    backgroundColor: Colors.primary[50], borderWidth: 1, borderColor: Colors.primary[200],
  },
  contactBtnText: { fontSize: FontSize.xs, fontWeight: FontWeight.semibold, color: Colors.primary[600] },
  actionRow: { flexDirection: 'row', gap: 10, paddingTop: 4 },
  rejectBtn: {
    flexDirection: 'row', alignItems: 'center', gap: 6,
    flex: 1, justifyContent: 'center', paddingVertical: 10,
    borderRadius: BorderRadius.lg, backgroundColor: Colors.error[50],
    borderWidth: 1.5, borderColor: Colors.error[200],
  },
  rejectBtnText: { fontSize: FontSize.sm, fontWeight: FontWeight.semibold, color: Colors.error[700] },
  acceptBtn: {
    flexDirection: 'row', alignItems: 'center', gap: 6,
    flex: 2, justifyContent: 'center', paddingVertical: 10,
    borderRadius: BorderRadius.lg, backgroundColor: Colors.primary[600],
  },
  acceptBtnText: { fontSize: FontSize.sm, fontWeight: FontWeight.bold, color: Colors.white },
  acceptedBadgeWrap: { flexDirection: 'row', alignItems: 'center', gap: 6, paddingTop: 4 },
  acceptedBadgeText: { flex: 1, fontSize: FontSize.xs, fontWeight: FontWeight.semibold, color: Colors.success[700] },
  viewDetailsBtn: { flexDirection: 'row', alignItems: 'center', gap: 2 },
  viewDetailsBtnText: { fontSize: FontSize.xs, fontWeight: FontWeight.semibold, color: Colors.primary[600] },
  completedBadgeWrap: { flexDirection: 'row', alignItems: 'center', gap: 6, paddingTop: 4 },
  completedBadgeText: { fontSize: FontSize.xs, color: Colors.neutral[500], fontWeight: FontWeight.medium },
});
