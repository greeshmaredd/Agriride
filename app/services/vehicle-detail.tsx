import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Dimensions,
} from 'react-native';
import { useRouter } from 'expo-router';
import { ArrowLeft, Star, MapPin, Heart, Share2, Phone, MessageCircle, Calendar, ChevronRight, Images } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors, FontSize, FontWeight, Spacing, BorderRadius, Shadow } from '@/constants/theme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

const images = [
  'https://images.pexels.com/photos/2889890/pexels-photo-2889890.jpeg?auto=compress&cs=tinysrgb&w=600',
  'https://images.pexels.com/photos/1595104/pexels-photo-1595104.jpeg?auto=compress&cs=tinysrgb&w=600',
  'https://images.pexels.com/photos/2219024/pexels-photo-2219024.jpeg?auto=compress&cs=tinysrgb&w=600',
];

const specs = [
  { label: 'Make & Model', value: 'Mahindra 575 DI' },
  { label: 'HP', value: '47 HP' },
  { label: 'Year', value: '2021' },
  { label: 'Fuel', value: 'Diesel' },
  { label: 'Services', value: 'Ploughing, Rotavator, Trailer' },
  { label: 'Coverage', value: '20 km radius' },
];

const reviews = [
  { name: 'Suresh Reddy', rating: 5, date: '2 days ago', text: 'Excellent service! The tractor was on time and the work quality was top-notch.' },
  { name: 'Lakshmi Devi', rating: 4, date: '1 week ago', text: 'Good service, completed the ploughing faster than expected.' },
];

export default function VehicleDetailScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [activeImg, setActiveImg] = useState(0);
  const [liked, setLiked] = useState(false);

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.imageSection}>
        <Image source={{ uri: images[activeImg] }} style={styles.mainImg} />
        <View style={[styles.imgTopBar]}>
          <TouchableOpacity style={styles.iconBtn} onPress={() => router.back()}>
            <ArrowLeft size={20} color={Colors.neutral[800]} />
          </TouchableOpacity>
          <View style={styles.imgTopRight}>
            <TouchableOpacity style={styles.iconBtn} onPress={() => setLiked(!liked)}>
              <Heart size={20} color={liked ? Colors.error[600] : Colors.neutral[800]} fill={liked ? Colors.error[600] : 'none'} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconBtn}>
              <Share2 size={20} color={Colors.neutral[800]} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.imgThumbs}>
          {images.map((img, i) => (
            <TouchableOpacity key={i} onPress={() => setActiveImg(i)}>
              <Image
                source={{ uri: img }}
                style={[styles.thumb, i === activeImg && styles.thumbActive]}
              />
            </TouchableOpacity>
          ))}
          <TouchableOpacity style={styles.moreImgsBtn} onPress={() => router.push('/services/gallery')}>
            <Images size={16} color={Colors.neutral[600]} />
            <Text style={styles.moreImgsText}>+5</Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} style={styles.scroll} contentContainerStyle={styles.scrollContent}>
        <View style={styles.titleSection}>
          <View>
            <Text style={styles.vehicleName}>Mahindra 575 DI Tractor</Text>
            <View style={styles.metaRow}>
              <View style={styles.availBadge}>
                <View style={styles.availDot} />
                <Text style={styles.availText}>Available Now</Text>
              </View>
              <View style={styles.ratingBadge}>
                <Star size={13} color={Colors.secondary[400]} fill={Colors.secondary[400]} />
                <Text style={styles.ratingText}>4.9</Text>
                <Text style={styles.reviewCount}>(124)</Text>
              </View>
            </View>
          </View>
          <View style={styles.priceBlock}>
            <Text style={styles.price}>₹900</Text>
            <Text style={styles.priceUnit}>/acre</Text>
          </View>
        </View>

        <View style={styles.ownerCard}>
          <View style={styles.ownerAvatar}>
            <Image
              source={{ uri: 'https://images.pexels.com/photos/1139541/pexels-photo-1139541.jpeg?auto=compress&cs=tinysrgb&w=150' }}
              style={styles.ownerImg}
            />
          </View>
          <View style={styles.ownerInfo}>
            <Text style={styles.ownerName}>Ramu Kumar</Text>
            <View style={styles.ownerMeta}>
              <MapPin size={12} color={Colors.neutral[400]} />
              <Text style={styles.ownerLocation}>Kurnool, AP • 1.2 km</Text>
            </View>
            <Text style={styles.ownerExp}>12 years experience</Text>
          </View>
          <TouchableOpacity style={styles.viewProfileBtn} onPress={() => router.push('/services/provider-profile')}>
            <Text style={styles.viewProfileText}>Profile</Text>
            <ChevronRight size={14} color={Colors.primary[600]} />
          </TouchableOpacity>
        </View>

        <View style={styles.specsCard}>
          <Text style={styles.sectionTitle}>Specifications</Text>
          <View style={styles.specsGrid}>
            {specs.map((s, i) => (
              <View key={i} style={styles.specItem}>
                <Text style={styles.specLabel}>{s.label}</Text>
                <Text style={styles.specValue}>{s.value}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.availCalendar}>
          <Text style={styles.sectionTitle}>Availability Calendar</Text>
          <View style={styles.calRow}>
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((d, i) => (
              <View key={d} style={styles.calDay}>
                <Text style={styles.calDayName}>{d}</Text>
                <View style={[
                  styles.calDot,
                  i === 1 || i === 4 ? styles.calDotBusy : styles.calDotFree,
                ]} />
              </View>
            ))}
          </View>
          <View style={styles.calLegend}>
            <View style={styles.legendItem}><View style={[styles.legendDot, styles.calDotFree]} /><Text style={styles.legendText}>Available</Text></View>
            <View style={styles.legendItem}><View style={[styles.legendDot, styles.calDotBusy]} /><Text style={styles.legendText}>Booked</Text></View>
          </View>
        </View>

        <View style={styles.reviewsSection}>
          <View style={styles.reviewsHeader}>
            <Text style={styles.sectionTitle}>Reviews</Text>
            <TouchableOpacity><Text style={styles.seeAll}>See All</Text></TouchableOpacity>
          </View>
          {reviews.map((r, i) => (
            <View key={i} style={styles.reviewCard}>
              <View style={styles.reviewTop}>
                <View style={styles.reviewerAvatar}><Text style={{ fontSize: 18 }}>👤</Text></View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.reviewerName}>{r.name}</Text>
                  <Text style={styles.reviewDate}>{r.date}</Text>
                </View>
                <View style={styles.reviewStars}>
                  {[1,2,3,4,5].map(s => <Star key={s} size={12} color={s <= r.rating ? Colors.secondary[400] : Colors.neutral[300]} fill={s <= r.rating ? Colors.secondary[400] : 'none'} />)}
                </View>
              </View>
              <Text style={styles.reviewText}>{r.text}</Text>
            </View>
          ))}
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>

      <View style={[styles.bookingFooter, { paddingBottom: insets.bottom + 12 }]}>
        <TouchableOpacity style={styles.callFooterBtn} onPress={() => router.push('/services/call-provider')}>
          <Phone size={20} color={Colors.primary[600]} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.chatFooterBtn} onPress={() => router.push('/services/chat')}>
          <MessageCircle size={20} color={Colors.primary[600]} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.bookNowBtn}
          onPress={() => router.push('/booking/calendar')}
          activeOpacity={0.85}
        >
          <LinearGradient
            colors={[Colors.primary[500], Colors.primary[700]]}
            start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
            style={styles.bookNowGradient}
          >
            <Calendar size={18} color={Colors.white} />
            <Text style={styles.bookNowText}>Book Now</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.neutral[50] },
  imageSection: { height: 280, position: 'relative' },
  mainImg: { width: '100%', height: 240, backgroundColor: Colors.neutral[200] },
  imgTopBar: {
    position: 'absolute',
    top: 0, left: 0, right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: Spacing.md,
  },
  imgTopRight: { flexDirection: 'row', gap: 8 },
  iconBtn: {
    width: 40, height: 40, borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.9)',
    alignItems: 'center', justifyContent: 'center',
    ...Shadow.sm,
  },
  imgThumbs: {
    position: 'absolute',
    bottom: 0,
    left: Spacing.md,
    flexDirection: 'row',
    gap: 8,
  },
  thumb: { width: 50, height: 50, borderRadius: 8, borderWidth: 2, borderColor: 'transparent' },
  thumbActive: { borderColor: Colors.primary[500] },
  moreImgsBtn: {
    width: 50, height: 50, borderRadius: 8,
    backgroundColor: 'rgba(0,0,0,0.5)',
    alignItems: 'center', justifyContent: 'center',
    gap: 2,
  },
  moreImgsText: { fontSize: 11, color: Colors.white, fontWeight: FontWeight.bold },
  scroll: { flex: 1 },
  scrollContent: { padding: Spacing.md, gap: Spacing.md },
  titleSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  vehicleName: { fontSize: FontSize.xl, fontWeight: FontWeight.bold, color: Colors.neutral[900], marginBottom: 6, maxWidth: '70%' },
  metaRow: { flexDirection: 'row', gap: 10, alignItems: 'center' },
  availBadge: {
    flexDirection: 'row',
    alignItems: 'center', gap: 5,
    backgroundColor: Colors.success[50],
    paddingHorizontal: 8, paddingVertical: 4,
    borderRadius: BorderRadius.full,
  },
  availDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: Colors.success[500] },
  availText: { fontSize: FontSize.xs, fontWeight: FontWeight.bold, color: Colors.success[700] },
  ratingBadge: { flexDirection: 'row', alignItems: 'center', gap: 3 },
  ratingText: { fontSize: FontSize.sm, fontWeight: FontWeight.bold, color: Colors.neutral[800] },
  reviewCount: { fontSize: FontSize.xs, color: Colors.neutral[500] },
  priceBlock: { alignItems: 'flex-end' },
  price: { fontSize: FontSize.xxl, fontWeight: FontWeight.bold, color: Colors.primary[700] },
  priceUnit: { fontSize: FontSize.xs, color: Colors.neutral[500] },
  ownerCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    gap: Spacing.md,
    ...Shadow.sm,
  },
  ownerAvatar: { width: 52, height: 52, borderRadius: 26, overflow: 'hidden' },
  ownerImg: { width: 52, height: 52 },
  ownerInfo: { flex: 1 },
  ownerName: { fontSize: FontSize.md, fontWeight: FontWeight.bold, color: Colors.neutral[900] },
  ownerMeta: { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 2 },
  ownerLocation: { fontSize: FontSize.xs, color: Colors.neutral[500] },
  ownerExp: { fontSize: FontSize.xs, color: Colors.primary[600], fontWeight: FontWeight.semibold, marginTop: 2 },
  viewProfileBtn: {
    flexDirection: 'row', alignItems: 'center',
    paddingHorizontal: 10, paddingVertical: 6,
    borderRadius: BorderRadius.full,
    borderWidth: 1, borderColor: Colors.primary[300],
  },
  viewProfileText: { fontSize: FontSize.xs, fontWeight: FontWeight.semibold, color: Colors.primary[600] },
  specsCard: {
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    gap: 12,
    ...Shadow.sm,
  },
  sectionTitle: { fontSize: FontSize.md, fontWeight: FontWeight.bold, color: Colors.neutral[900] },
  specsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 0 },
  specItem: {
    width: '50%',
    paddingVertical: 8,
    paddingRight: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.neutral[100],
  },
  specLabel: { fontSize: FontSize.xs, color: Colors.neutral[500] },
  specValue: { fontSize: FontSize.sm, fontWeight: FontWeight.semibold, color: Colors.neutral[800], marginTop: 2 },
  availCalendar: {
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    gap: 12, ...Shadow.sm,
  },
  calRow: { flexDirection: 'row', justifyContent: 'space-between' },
  calDay: { alignItems: 'center', gap: 4 },
  calDayName: { fontSize: FontSize.xs, color: Colors.neutral[500] },
  calDot: { width: 26, height: 26, borderRadius: 13 },
  calDotFree: { backgroundColor: Colors.success[500] },
  calDotBusy: { backgroundColor: Colors.error[400] },
  calLegend: { flexDirection: 'row', gap: 16, justifyContent: 'center' },
  legendItem: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  legendDot: { width: 10, height: 10, borderRadius: 5 },
  legendText: { fontSize: FontSize.xs, color: Colors.neutral[500] },
  reviewsSection: { gap: 10 },
  reviewsHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  seeAll: { fontSize: FontSize.sm, color: Colors.primary[600], fontWeight: FontWeight.semibold },
  reviewCard: {
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    gap: 8, ...Shadow.sm,
  },
  reviewTop: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  reviewerAvatar: { width: 36, height: 36, borderRadius: 18, backgroundColor: Colors.neutral[100], alignItems: 'center', justifyContent: 'center' },
  reviewerName: { fontSize: FontSize.sm, fontWeight: FontWeight.bold, color: Colors.neutral[900] },
  reviewDate: { fontSize: FontSize.xs, color: Colors.neutral[400] },
  reviewStars: { flexDirection: 'row', gap: 2 },
  reviewText: { fontSize: FontSize.sm, color: Colors.neutral[600], lineHeight: 20 },
  bookingFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    paddingHorizontal: Spacing.md,
    paddingTop: Spacing.md,
    gap: 10,
    borderTopWidth: 1, borderTopColor: Colors.neutral[100],
    ...Shadow.lg,
  },
  callFooterBtn: {
    width: 48, height: 48, borderRadius: 24,
    backgroundColor: Colors.primary[50],
    alignItems: 'center', justifyContent: 'center',
    borderWidth: 1.5, borderColor: Colors.primary[200],
  },
  chatFooterBtn: {
    width: 48, height: 48, borderRadius: 24,
    backgroundColor: Colors.primary[50],
    alignItems: 'center', justifyContent: 'center',
    borderWidth: 1.5, borderColor: Colors.primary[200],
  },
  bookNowBtn: { flex: 1, borderRadius: BorderRadius.lg, overflow: 'hidden', ...Shadow.green },
  bookNowGradient: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    paddingVertical: 14, gap: 8,
  },
  bookNowText: { fontSize: FontSize.lg, fontWeight: FontWeight.bold, color: Colors.white },
});
