import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Bell, Tag, AlertTriangle, MessageCircle, Tractor, ChevronRight } from 'lucide-react-native';
import { Colors, FontSize, FontWeight, Spacing, BorderRadius, Shadow } from '@/constants/theme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type NotifCategory = 'all' | 'booking' | 'payment' | 'seasonal' | 'offers' | 'messages';

const categories: { id: NotifCategory; label: string; icon: any; color: string }[] = [
  { id: 'all', label: 'All', icon: Bell, color: Colors.neutral[600] },
  { id: 'booking', label: 'Booking', icon: Tractor, color: Colors.primary[600] },
  { id: 'payment', label: 'Payment', icon: Tag, color: Colors.success[600] },
  { id: 'seasonal', label: 'Seasonal', icon: AlertTriangle, color: Colors.secondary[600] },
  { id: 'messages', label: 'Messages', icon: MessageCircle, color: '#7c3aed' },
];

const notifications = [
  { id: 1, category: 'booking', title: 'Ramu Kumar is on the way!', body: 'Your tractor service provider has started and will arrive in 12 minutes.', time: '2 min ago', read: false, icon: '🚜' },
  { id: 2, category: 'payment', title: 'Payment Received', body: 'Your payment of ₹3,416 has been confirmed for booking #AR-2026-4521.', time: '1 hr ago', read: false, icon: '✅' },
  { id: 3, category: 'seasonal', title: 'Paddy Harvest Season Alert', body: 'Peak harvesting season begins next week. Book your harvester now to avoid delays.', time: '3 hrs ago', read: true, icon: '🌾' },
  { id: 4, category: 'offers', title: 'Special Offer for You!', body: 'Use code KISAN10 to get 10% off on your next booking. Valid till 30 Jun.', time: '1 day ago', read: true, icon: '🎁' },
  { id: 5, category: 'messages', title: 'New message from Ramu Kumar', body: '"I will be there by 7:15 AM. Is the farm gate open?"', time: '2 days ago', read: true, icon: '💬' },
  { id: 6, category: 'booking', title: 'Booking Reminder', body: 'You have a tractor service booked tomorrow at 7:00 AM. Set a reminder.', time: '2 days ago', read: true, icon: '🔔' },
  { id: 7, category: 'seasonal', title: 'Weather Alert', body: 'Heavy rainfall expected in your area on 16 Jun. Consider rescheduling outdoor services.', time: '3 days ago', read: true, icon: '🌧️' },
];

export default function NotificationsScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [activeCategory, setActiveCategory] = useState<NotifCategory>('all');

  const filtered = notifications.filter(n =>
    activeCategory === 'all' || n.category === activeCategory
  );

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>Notifications</Text>
          {unreadCount > 0 && (
            <Text style={styles.headerSub}>{unreadCount} new alerts</Text>
          )}
        </View>
        <TouchableOpacity style={styles.markAllBtn}>
          <Text style={styles.markAllText}>Mark all read</Text>
        </TouchableOpacity>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryBar} contentContainerStyle={styles.categoryContent}>
        {categories.map(cat => {
          const Icon = cat.icon;
          return (
            <TouchableOpacity
              key={cat.id}
              style={[styles.catChip, activeCategory === cat.id && styles.catChipActive, activeCategory === cat.id && { borderColor: cat.color }]}
              onPress={() => setActiveCategory(cat.id)}
            >
              <Icon size={14} color={activeCategory === cat.id ? cat.color : Colors.neutral[500]} />
              <Text style={[styles.catText, activeCategory === cat.id && { color: cat.color, fontWeight: FontWeight.bold }]}>
                {cat.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      <ScrollView showsVerticalScrollIndicator={false} style={styles.scroll} contentContainerStyle={styles.scrollContent}>
        {filtered.map(n => (
          <TouchableOpacity
            key={n.id}
            style={[styles.notifCard, !n.read && styles.notifCardUnread]}
            activeOpacity={0.88}
          >
            <View style={styles.notifIcon}>
              <Text style={styles.notifEmoji}>{n.icon}</Text>
            </View>
            <View style={styles.notifContent}>
              <View style={styles.notifHeader}>
                <Text style={[styles.notifTitle, !n.read && styles.notifTitleUnread]}>{n.title}</Text>
                {!n.read && <View style={styles.unreadDot} />}
              </View>
              <Text style={styles.notifBody} numberOfLines={2}>{n.body}</Text>
              <Text style={styles.notifTime}>{n.time}</Text>
            </View>
          </TouchableOpacity>
        ))}
        {filtered.length === 0 && (
          <View style={styles.emptyState}>
            <Bell size={40} color={Colors.neutral[300]} />
            <Text style={styles.emptyText}>No notifications in this category</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.neutral[50] },
  header: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start',
    paddingHorizontal: Spacing.md, paddingVertical: Spacing.md,
    backgroundColor: Colors.white, borderBottomWidth: 1, borderBottomColor: Colors.neutral[100],
  },
  headerTitle: { fontSize: FontSize.xl, fontWeight: FontWeight.bold, color: Colors.neutral[900] },
  headerSub: { fontSize: FontSize.xs, color: Colors.primary[600], fontWeight: FontWeight.semibold, marginTop: 2 },
  markAllBtn: { paddingVertical: 6 },
  markAllText: { fontSize: FontSize.sm, color: Colors.primary[600], fontWeight: FontWeight.semibold },
  categoryBar: { maxHeight: 52, backgroundColor: Colors.white, borderBottomWidth: 1, borderBottomColor: Colors.neutral[100] },
  categoryContent: { paddingHorizontal: Spacing.md, paddingVertical: 8, gap: 8 },
  catChip: {
    flexDirection: 'row', alignItems: 'center', gap: 6,
    paddingVertical: 7, paddingHorizontal: 12,
    borderRadius: BorderRadius.full,
    backgroundColor: Colors.neutral[100],
    borderWidth: 1.5, borderColor: 'transparent',
  },
  catChipActive: { backgroundColor: Colors.white, borderWidth: 1.5 },
  catText: { fontSize: FontSize.xs, fontWeight: FontWeight.medium, color: Colors.neutral[600] },
  scroll: { flex: 1 },
  scrollContent: { padding: Spacing.md, gap: Spacing.sm },
  notifCard: {
    flexDirection: 'row',
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    gap: Spacing.md,
    ...Shadow.sm,
  },
  notifCardUnread: {
    backgroundColor: Colors.primary[50],
    borderLeftWidth: 3,
    borderLeftColor: Colors.primary[400],
  },
  notifIcon: {
    width: 44, height: 44, borderRadius: 22,
    backgroundColor: Colors.neutral[100],
    alignItems: 'center', justifyContent: 'center',
  },
  notifEmoji: { fontSize: 22 },
  notifContent: { flex: 1, gap: 3 },
  notifHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  notifTitle: { flex: 1, fontSize: FontSize.sm, color: Colors.neutral[700], fontWeight: FontWeight.medium },
  notifTitleUnread: { color: Colors.neutral[900], fontWeight: FontWeight.bold },
  unreadDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: Colors.primary[600] },
  notifBody: { fontSize: FontSize.xs, color: Colors.neutral[500], lineHeight: 18 },
  notifTime: { fontSize: 10, color: Colors.neutral[400] },
  emptyState: { alignItems: 'center', paddingVertical: 60, gap: 12 },
  emptyText: { fontSize: FontSize.sm, color: Colors.neutral[400] },
});
