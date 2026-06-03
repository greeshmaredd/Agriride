import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity, Image,
} from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import {
  User, Settings, Bookmark, Clock, MessageSquare, HelpCircle,
  Globe, LogOut, ChevronRight, Star, MapPin, Tractor,
} from 'lucide-react-native';
import { Colors, FontSize, FontWeight, Spacing, BorderRadius, Shadow } from '@/constants/theme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const menuItems = [
  { id: 'saved', icon: Bookmark, label: 'Saved Services', path: '/services/saved', color: Colors.secondary[600] },
  { id: 'history', icon: Clock, label: 'Booking History', path: '/(tabs)/bookings', color: Colors.primary[600] },
  { id: 'reviews', icon: Star, label: 'My Reviews', path: '/services/reviews', color: Colors.secondary[500] },
  { id: 'seasonal', icon: Tractor, label: 'Seasonal Tips', path: '/services/seasonal', color: Colors.accent[600] },
  { id: 'ai', icon: MessageSquare, label: 'AI Farming Assistant', path: '/services/ai-assistant', color: '#7c3aed' },
  { id: 'language', icon: Globe, label: 'Language Settings', path: '/settings/language', color: '#0891b2' },
  { id: 'support', icon: HelpCircle, label: 'Help & Support', path: '/services/support', color: Colors.neutral[600] },
  { id: 'complaint', icon: MessageSquare, label: 'Complaints', path: '/services/complaint', color: Colors.error[600] },
];

export default function ProfileScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <LinearGradient colors={[Colors.primary[700], Colors.primary[500]]} style={styles.profileHeader}>
          <View style={styles.avatarWrap}>
            <Image
              source={{ uri: 'https://images.pexels.com/photos/1139541/pexels-photo-1139541.jpeg?auto=compress&cs=tinysrgb&w=200' }}
              style={styles.avatar}
            />
            <TouchableOpacity style={styles.editAvatarBtn} onPress={() => router.push('/auth/profile-setup')}>
              <Text style={{ fontSize: 12 }}>✏️</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.name}>Suresh Reddy</Text>
          <View style={styles.locationRow}>
            <MapPin size={13} color="rgba(255,255,255,0.8)" />
            <Text style={styles.locationText}>Kurnool, Andhra Pradesh</Text>
          </View>
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>12</Text>
              <Text style={styles.statLabel}>Bookings</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statValue}>5.5 ac</Text>
              <Text style={styles.statLabel}>Farm Size</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statValue}>4.8 ⭐</Text>
              <Text style={styles.statLabel}>Avg Rating</Text>
            </View>
          </View>
        </LinearGradient>

        <View style={styles.farmCard}>
          <Text style={styles.farmCardTitle}>Farm Details</Text>
          <View style={styles.farmDetail}>
            <Text style={styles.farmLabel}>Crops</Text>
            <Text style={styles.farmValue}>Paddy, Vegetables, Groundnut</Text>
          </View>
          <View style={styles.farmDetail}>
            <Text style={styles.farmLabel}>Phone</Text>
            <Text style={styles.farmValue}>+91 98765 43210</Text>
          </View>
          <TouchableOpacity
            style={styles.editProfileBtn}
            onPress={() => router.push('/auth/profile-setup')}
          >
            <Text style={styles.editProfileText}>Edit Profile</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.menuSection}>
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <TouchableOpacity
                key={item.id}
                style={styles.menuItem}
                onPress={() => router.push(item.path as any)}
                activeOpacity={0.8}
              >
                <View style={[styles.menuIconWrap, { backgroundColor: item.color + '18' }]}>
                  <Icon size={20} color={item.color} />
                </View>
                <Text style={styles.menuLabel}>{item.label}</Text>
                <ChevronRight size={16} color={Colors.neutral[300]} />
              </TouchableOpacity>
            );
          })}
        </View>

        <TouchableOpacity style={styles.logoutBtn} onPress={() => router.replace('/auth/login')}>
          <LogOut size={18} color={Colors.error[600]} />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>

        <Text style={styles.versionText}>AgriRide v1.0.0 • Made with ❤️ for Indian Farmers</Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.neutral[50] },
  scrollContent: { gap: 0, paddingBottom: 40 },
  profileHeader: {
    paddingHorizontal: Spacing.xl,
    paddingBottom: Spacing.xl,
    paddingTop: Spacing.lg,
    alignItems: 'center',
    gap: 6,
  },
  avatarWrap: { position: 'relative', marginBottom: 4 },
  avatar: { width: 90, height: 90, borderRadius: 45, borderWidth: 3, borderColor: Colors.white },
  editAvatarBtn: {
    position: 'absolute', bottom: 0, right: 0,
    width: 28, height: 28, borderRadius: 14,
    backgroundColor: Colors.white,
    alignItems: 'center', justifyContent: 'center',
    ...Shadow.sm,
  },
  name: { fontSize: FontSize.xxl, fontWeight: FontWeight.bold, color: Colors.white },
  locationRow: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  locationText: { fontSize: FontSize.sm, color: 'rgba(255,255,255,0.85)' },
  statsRow: { flexDirection: 'row', alignItems: 'center', marginTop: 8, width: '100%' },
  statItem: { flex: 1, alignItems: 'center' },
  statValue: { fontSize: FontSize.lg, fontWeight: FontWeight.bold, color: Colors.white },
  statLabel: { fontSize: 10, color: 'rgba(255,255,255,0.75)' },
  statDivider: { width: 1, height: 28, backgroundColor: 'rgba(255,255,255,0.3)' },
  farmCard: {
    backgroundColor: Colors.white,
    margin: Spacing.md,
    borderRadius: BorderRadius.xl,
    padding: Spacing.md,
    gap: 8,
    ...Shadow.sm,
  },
  farmCardTitle: { fontSize: FontSize.md, fontWeight: FontWeight.bold, color: Colors.neutral[900] },
  farmDetail: { flexDirection: 'row', justifyContent: 'space-between' },
  farmLabel: { fontSize: FontSize.sm, color: Colors.neutral[500] },
  farmValue: { fontSize: FontSize.sm, fontWeight: FontWeight.medium, color: Colors.neutral[800], textAlign: 'right', flex: 1, marginLeft: Spacing.md },
  editProfileBtn: {
    marginTop: 4,
    paddingVertical: 8,
    borderRadius: BorderRadius.md,
    backgroundColor: Colors.primary[50],
    alignItems: 'center',
    borderWidth: 1, borderColor: Colors.primary[200],
  },
  editProfileText: { fontSize: FontSize.sm, fontWeight: FontWeight.semibold, color: Colors.primary[600] },
  menuSection: {
    backgroundColor: Colors.white,
    marginHorizontal: Spacing.md,
    borderRadius: BorderRadius.xl,
    overflow: 'hidden',
    ...Shadow.sm,
  },
  menuItem: {
    flexDirection: 'row', alignItems: 'center',
    paddingVertical: 14, paddingHorizontal: Spacing.md,
    gap: Spacing.md,
    borderBottomWidth: 1, borderBottomColor: Colors.neutral[100],
  },
  menuIconWrap: {
    width: 40, height: 40, borderRadius: 12,
    alignItems: 'center', justifyContent: 'center',
  },
  menuLabel: { flex: 1, fontSize: FontSize.md, color: Colors.neutral[800], fontWeight: FontWeight.medium },
  logoutBtn: {
    flexDirection: 'row', alignItems: 'center',
    justifyContent: 'center', gap: 8,
    margin: Spacing.md,
    paddingVertical: 14,
    backgroundColor: Colors.error[50],
    borderRadius: BorderRadius.lg,
    borderWidth: 1.5, borderColor: Colors.error[200],
  },
  logoutText: { fontSize: FontSize.md, fontWeight: FontWeight.semibold, color: Colors.error[700] },
  versionText: {
    textAlign: 'center',
    fontSize: FontSize.xs,
    color: Colors.neutral[400],
    marginTop: Spacing.sm,
  },
});
