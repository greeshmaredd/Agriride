import React from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity, Image,
} from 'react-native';
import { useRouter } from 'expo-router';
import { ArrowLeft, Star, Phone, MessageCircle, MapPin, Check, ChevronRight } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors, FontSize, FontWeight, Spacing, BorderRadius, Shadow } from '@/constants/theme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const vehicles = [
  { name: 'Mahindra 575 DI Tractor', service: 'Ploughing, Rotavator', price: '₹900/acre', available: true },
  { name: 'Mahindra 475 DI', service: 'Cultivator, Seeding', price: '₹750/acre', available: true },
];

const reviews = [
  { name: 'Ravi Kumar', rating: 5, text: 'Very punctual and professional. Highly recommended!', date: '3 days ago' },
  { name: 'Savitri Devi', rating: 4, text: 'Good quality work. The ploughing was done efficiently.', date: '1 week ago' },
  { name: 'Venkat Rao', rating: 5, text: 'Best service in the area. Will book again.', date: '2 weeks ago' },
];

export default function ProviderProfileScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <LinearGradient colors={[Colors.primary[700], Colors.primary[500]]} style={styles.headerBg}>
          <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
            <ArrowLeft size={22} color={Colors.white} />
          </TouchableOpacity>
        </LinearGradient>

        <View style={styles.profileCard}>
          <View style={styles.avatarWrap}>
            <Image
              source={{ uri: 'https://images.pexels.com/photos/1139541/pexels-photo-1139541.jpeg?auto=compress&cs=tinysrgb&w=200' }}
              style={styles.avatar}
            />
            <View style={styles.verifiedBadgeWrap}>
              <Check size={10} color={Colors.white} />
            </View>
          </View>

          <Text style={styles.providerName}>Ramu Kumar</Text>
          <View style={styles.verifiedRow}>
            <View style={styles.verifiedBadge}>
              <Check size={12} color={Colors.primary[600]} />
              <Text style={styles.verifiedText}>Verified Provider</Text>
            </View>
          </View>

          <View style={styles.locationRow}>
            <MapPin size={14} color={Colors.neutral[500]} />
            <Text style={styles.locationText}>Kurnool, Andhra Pradesh</Text>
          </View>

          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>4.9</Text>
              <Star size={12} color={Colors.secondary[400]} fill={Colors.secondary[400]} />
              <Text style={styles.statLabel}>Rating</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statValue}>124</Text>
              <Text style={styles.statLabel}>Bookings</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statValue}>12 yr</Text>
              <Text style={styles.statLabel}>Experience</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statValue}>2</Text>
              <Text style={styles.statLabel}>Vehicles</Text>
            </View>
          </View>

          <View style={styles.contactRow}>
            <TouchableOpacity style={styles.contactBtn} onPress={() => router.push('/services/call-provider')}>
              <Phone size={18} color={Colors.white} />
              <Text style={styles.contactBtnText}>Call</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.chatContactBtn} onPress={() => router.push('/services/chat')}>
              <MessageCircle size={18} color={Colors.primary[600]} />
              <Text style={styles.chatContactBtnText}>Chat</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Vehicles & Services</Text>
          {vehicles.map((v, i) => (
            <TouchableOpacity
              key={i}
              style={styles.vehicleRow}
              onPress={() => router.push('/services/vehicle-detail')}
            >
              <View style={styles.vehicleIcon}><Text style={{ fontSize: 26 }}>🚜</Text></View>
              <View style={{ flex: 1 }}>
                <Text style={styles.vehicleName}>{v.name}</Text>
                <Text style={styles.vehicleService}>{v.service}</Text>
                <Text style={styles.vehiclePrice}>{v.price}</Text>
              </View>
              <View style={[styles.availBadge, { backgroundColor: v.available ? Colors.success[50] : Colors.error[50] }]}>
                <Text style={{ fontSize: 10, fontWeight: FontWeight.bold, color: v.available ? Colors.success[600] : Colors.error[600] }}>
                  {v.available ? 'Available' : 'Busy'}
                </Text>
              </View>
              <ChevronRight size={16} color={Colors.neutral[400]} />
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Reviews</Text>
            <View style={styles.overallRating}>
              <Star size={16} color={Colors.secondary[400]} fill={Colors.secondary[400]} />
              <Text style={styles.overallRatingText}>4.9 / 5.0</Text>
            </View>
          </View>
          {reviews.map((r, i) => (
            <View key={i} style={styles.reviewCard}>
              <View style={styles.reviewHeader}>
                <View style={styles.reviewerAvatarWrap}><Text style={{ fontSize: 20 }}>👤</Text></View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.reviewerName}>{r.name}</Text>
                  <Text style={styles.reviewDate}>{r.date}</Text>
                </View>
                <View style={styles.reviewStars}>
                  {[1,2,3,4,5].map(s => (
                    <Star key={s} size={11} color={s <= r.rating ? Colors.secondary[400] : Colors.neutral[300]} fill={s <= r.rating ? Colors.secondary[400] : 'none'} />
                  ))}
                </View>
              </View>
              <Text style={styles.reviewText}>{r.text}</Text>
            </View>
          ))}
        </View>

        <View style={{ height: 20 }} />
      </ScrollView>

      <View style={[styles.footer, { paddingBottom: insets.bottom + 12 }]}>
        <TouchableOpacity style={styles.bookBtn} onPress={() => router.push('/booking/calendar')} activeOpacity={0.85}>
          <LinearGradient colors={[Colors.primary[500], Colors.primary[700]]} style={styles.bookGradient} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}>
            <Text style={styles.bookBtnText}>Book This Provider</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.neutral[50] },
  scrollContent: { gap: Spacing.md, paddingBottom: 80 },
  headerBg: { height: 120, paddingHorizontal: Spacing.md, paddingTop: Spacing.md },
  backBtn: {
    width: 40, height: 40, borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center', justifyContent: 'center',
  },
  profileCard: {
    backgroundColor: Colors.white,
    marginHorizontal: Spacing.md,
    marginTop: -60,
    borderRadius: BorderRadius.xl,
    padding: Spacing.lg,
    alignItems: 'center',
    gap: 8,
    ...Shadow.md,
  },
  avatarWrap: { position: 'relative' },
  avatar: { width: 90, height: 90, borderRadius: 45, borderWidth: 3, borderColor: Colors.white },
  verifiedBadgeWrap: {
    position: 'absolute',
    bottom: 4, right: 4,
    width: 22, height: 22, borderRadius: 11,
    backgroundColor: Colors.primary[600],
    alignItems: 'center', justifyContent: 'center',
    borderWidth: 2, borderColor: Colors.white,
  },
  providerName: { fontSize: FontSize.xl, fontWeight: FontWeight.bold, color: Colors.neutral[900] },
  verifiedRow: { flexDirection: 'row', justifyContent: 'center' },
  verifiedBadge: {
    flexDirection: 'row', alignItems: 'center', gap: 4,
    backgroundColor: Colors.primary[50],
    paddingHorizontal: 10, paddingVertical: 4,
    borderRadius: BorderRadius.full,
    borderWidth: 1, borderColor: Colors.primary[200],
  },
  verifiedText: { fontSize: FontSize.xs, fontWeight: FontWeight.bold, color: Colors.primary[700] },
  locationRow: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  locationText: { fontSize: FontSize.sm, color: Colors.neutral[500] },
  statsRow: { flexDirection: 'row', alignItems: 'center', width: '100%', marginTop: 4 },
  statItem: { flex: 1, alignItems: 'center', gap: 2 },
  statValue: { fontSize: FontSize.lg, fontWeight: FontWeight.bold, color: Colors.neutral[900] },
  statLabel: { fontSize: 10, color: Colors.neutral[500] },
  statDivider: { width: 1, height: 36, backgroundColor: Colors.neutral[200] },
  contactRow: { flexDirection: 'row', gap: 12, width: '100%', marginTop: 4 },
  contactBtn: {
    flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    gap: 8, paddingVertical: 13,
    borderRadius: BorderRadius.lg,
    backgroundColor: Colors.primary[600],
    ...Shadow.green,
  },
  contactBtnText: { fontSize: FontSize.md, fontWeight: FontWeight.bold, color: Colors.white },
  chatContactBtn: {
    flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    gap: 8, paddingVertical: 13,
    borderRadius: BorderRadius.lg,
    backgroundColor: Colors.primary[50],
    borderWidth: 1.5, borderColor: Colors.primary[300],
  },
  chatContactBtnText: { fontSize: FontSize.md, fontWeight: FontWeight.bold, color: Colors.primary[600] },
  section: { paddingHorizontal: Spacing.md, gap: 10 },
  sectionTitle: { fontSize: FontSize.lg, fontWeight: FontWeight.bold, color: Colors.neutral[900] },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  overallRating: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  overallRatingText: { fontSize: FontSize.sm, fontWeight: FontWeight.bold, color: Colors.neutral[700] },
  vehicleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    gap: Spacing.md,
    ...Shadow.sm,
  },
  vehicleIcon: { width: 50, height: 50, borderRadius: 14, backgroundColor: Colors.primary[50], alignItems: 'center', justifyContent: 'center' },
  vehicleName: { fontSize: FontSize.sm, fontWeight: FontWeight.bold, color: Colors.neutral[900] },
  vehicleService: { fontSize: FontSize.xs, color: Colors.neutral[500], marginTop: 2 },
  vehiclePrice: { fontSize: FontSize.xs, fontWeight: FontWeight.semibold, color: Colors.primary[600], marginTop: 2 },
  availBadge: { paddingHorizontal: 8, paddingVertical: 3, borderRadius: BorderRadius.full },
  reviewCard: { backgroundColor: Colors.white, borderRadius: BorderRadius.lg, padding: Spacing.md, gap: 8, ...Shadow.sm },
  reviewHeader: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  reviewerAvatarWrap: { width: 36, height: 36, borderRadius: 18, backgroundColor: Colors.neutral[100], alignItems: 'center', justifyContent: 'center' },
  reviewerName: { fontSize: FontSize.sm, fontWeight: FontWeight.bold, color: Colors.neutral[900] },
  reviewDate: { fontSize: FontSize.xs, color: Colors.neutral[400] },
  reviewStars: { flexDirection: 'row', gap: 2 },
  reviewText: { fontSize: FontSize.sm, color: Colors.neutral[600], lineHeight: 20 },
  footer: {
    paddingHorizontal: Spacing.md,
    paddingTop: Spacing.sm,
    backgroundColor: Colors.white,
    borderTopWidth: 1, borderTopColor: Colors.neutral[100],
    ...Shadow.lg,
  },
  bookBtn: { borderRadius: BorderRadius.lg, overflow: 'hidden', ...Shadow.green },
  bookGradient: { paddingVertical: 16, alignItems: 'center' },
  bookBtnText: { fontSize: FontSize.lg, fontWeight: FontWeight.bold, color: Colors.white },
});
