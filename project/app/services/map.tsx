import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { ArrowLeft, Navigation, Phone, MessageCircle, X, Star, MapPin, Clock } from 'lucide-react-native';
import { Colors, FontSize, FontWeight, Spacing, BorderRadius, Shadow } from '@/constants/theme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const { width, height } = Dimensions.get('window');

function FarmMapView() {
  return (
    <LinearGradient
      colors={['#d1fae5', '#a7f3d0', '#6ee7b7']}
      style={mapStyles.container}
    >
      {/* Map grid lines */}
      {[0,1,2,3,4,5,6,7].map(i => (
        <View key={`h${i}`} style={[mapStyles.gridH, { top: i * 80 }]} />
      ))}
      {[0,1,2,3,4,5].map(i => (
        <View key={`v${i}`} style={[mapStyles.gridV, { left: i * 70 }]} />
      ))}

      {/* Roads */}
      <View style={[mapStyles.road, { top: '45%', left: 0, right: 0, height: 12 }]} />
      <View style={[mapStyles.road, { left: '40%', top: 0, bottom: 0, width: 12 }]} />

      {/* Farm area */}
      <View style={mapStyles.farmArea}>
        <View style={mapStyles.farmPattern} />
      </View>

      {/* Your location pin */}
      <View style={[mapStyles.pin, { bottom: 120, left: width * 0.35 }]}>
        <View style={mapStyles.userPin}>
          <View style={mapStyles.userPinInner} />
        </View>
        <View style={mapStyles.pinRipple} />
        <View style={[mapStyles.pinRipple, { width: 40, height: 40, top: -12, left: -12, opacity: 0.15 }]} />
        <Text style={mapStyles.pinLabel}>Your Farm</Text>
      </View>

      {/* Tractor pin (moving) */}
      <View style={[mapStyles.pin, { top: height * 0.18, right: width * 0.2 }]}>
        <View style={mapStyles.tractorPin}>
          <Text style={mapStyles.tractorPinEmoji}>🚜</Text>
        </View>
        <Text style={mapStyles.tractorPinLabel}>Ramu Tractor</Text>
      </View>

      {/* Route line */}
      <View style={mapStyles.routeLine} />
      <View style={[mapStyles.routeLine, { top: '50%', left: '40%', width: 2, height: 80, transform: [{ translateY: -80 }] }]} />

      {/* ETA chip */}
      <View style={mapStyles.etaChip}>
        <Clock size={14} color={Colors.primary[600]} />
        <Text style={mapStyles.etaText}>12 min away</Text>
      </View>

      {/* Scale bar */}
      <View style={mapStyles.scaleBar}>
        <View style={mapStyles.scaleBarLine} />
        <Text style={mapStyles.scaleBarText}>500m</Text>
      </View>

      {/* Compass */}
      <View style={mapStyles.compass}>
        <Text style={mapStyles.compassN}>N</Text>
        <View style={mapStyles.compassArrow} />
      </View>
    </LinearGradient>
  );
}

export default function MapScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [expanded, setExpanded] = useState(false);

  return (
    <View style={styles.container}>
      <FarmMapView />

      {/* Top bar */}
      <View style={[styles.topBar, { paddingTop: insets.top + 8 }]}>
        <TouchableOpacity style={styles.topBtn} onPress={() => router.back()}>
          <ArrowLeft size={20} color={Colors.neutral[800]} />
        </TouchableOpacity>
        <View style={styles.searchPill}>
          <MapPin size={14} color={Colors.primary[600]} />
          <Text style={styles.searchPillText}>Kurnool District Area</Text>
        </View>
        <TouchableOpacity style={styles.topBtn}>
          <Navigation size={20} color={Colors.primary[600]} />
        </TouchableOpacity>
      </View>

      {/* Bottom sheet */}
      <View style={[styles.bottomSheet, { paddingBottom: insets.bottom + 16 }]}>
        <View style={styles.sheetHandle} />

        <View style={styles.providerRow}>
          <View style={styles.providerAvatar}>
            <Text style={{ fontSize: 26 }}>👨‍🌾</Text>
          </View>
          <View style={styles.providerInfo}>
            <View style={styles.providerNameRow}>
              <Text style={styles.providerName}>Ramu Tractor Works</Text>
              <View style={styles.verifiedBadge}>
                <Text style={styles.verifiedText}>Verified</Text>
              </View>
            </View>
            <Text style={styles.providerService}>Tractor Ploughing Service</Text>
            <View style={styles.ratingRow}>
              <Star size={12} color={Colors.secondary[400]} fill={Colors.secondary[400]} />
              <Text style={styles.rating}>4.9</Text>
              <Text style={styles.ratingCount}>(124 reviews)</Text>
            </View>
          </View>
        </View>

        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>12 min</Text>
            <Text style={styles.statLabel}>ETA</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>1.2 km</Text>
            <Text style={styles.statLabel}>Distance</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>₹900</Text>
            <Text style={styles.statLabel}>Per Acre</Text>
          </View>
        </View>

        <View style={styles.actionRow}>
          <TouchableOpacity style={styles.callBtn} onPress={() => router.push('/services/call-provider')}>
            <Phone size={20} color={Colors.white} />
            <Text style={styles.callBtnText}>Call</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.chatBtn} onPress={() => router.push('/services/chat')}>
            <MessageCircle size={20} color={Colors.primary[600]} />
            <Text style={styles.chatBtnText}>Chat</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.bookBtn} onPress={() => router.push('/booking/calendar')}>
            <Text style={styles.bookBtnText}>Book Now</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  topBar: {
    position: 'absolute',
    top: 0, left: 0, right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.md,
    gap: Spacing.sm,
  },
  topBtn: {
    width: 44, height: 44, borderRadius: 22,
    backgroundColor: Colors.white,
    alignItems: 'center', justifyContent: 'center',
    ...Shadow.md,
  },
  searchPill: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.full,
    paddingHorizontal: Spacing.md,
    height: 44,
    ...Shadow.md,
  },
  searchPillText: { flex: 1, fontSize: FontSize.sm, fontWeight: FontWeight.medium, color: Colors.neutral[800] },
  bottomSheet: {
    position: 'absolute',
    bottom: 0, left: 0, right: 0,
    backgroundColor: Colors.white,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    padding: Spacing.lg,
    paddingTop: Spacing.md,
    gap: Spacing.md,
    ...Shadow.lg,
  },
  sheetHandle: {
    width: 40, height: 4,
    borderRadius: 2,
    backgroundColor: Colors.neutral[200],
    alignSelf: 'center',
    marginBottom: 4,
  },
  providerRow: { flexDirection: 'row', gap: Spacing.md, alignItems: 'center' },
  providerAvatar: {
    width: 56, height: 56,
    borderRadius: 28,
    backgroundColor: Colors.primary[50],
    alignItems: 'center', justifyContent: 'center',
  },
  providerInfo: { flex: 1 },
  providerNameRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 2 },
  providerName: { fontSize: FontSize.md, fontWeight: FontWeight.bold, color: Colors.neutral[900] },
  verifiedBadge: {
    backgroundColor: Colors.primary[100],
    paddingHorizontal: 6, paddingVertical: 2,
    borderRadius: BorderRadius.full,
  },
  verifiedText: { fontSize: 9, fontWeight: FontWeight.bold, color: Colors.primary[700] },
  providerService: { fontSize: FontSize.xs, color: Colors.neutral[500], marginBottom: 4 },
  ratingRow: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  rating: { fontSize: FontSize.sm, fontWeight: FontWeight.bold, color: Colors.neutral[800] },
  ratingCount: { fontSize: FontSize.xs, color: Colors.neutral[500] },
  statsRow: { flexDirection: 'row', gap: 10 },
  statCard: {
    flex: 1,
    backgroundColor: Colors.neutral[50],
    borderRadius: BorderRadius.md,
    padding: Spacing.md,
    alignItems: 'center',
    borderWidth: 1, borderColor: Colors.neutral[100],
  },
  statValue: { fontSize: FontSize.lg, fontWeight: FontWeight.bold, color: Colors.primary[700] },
  statLabel: { fontSize: FontSize.xs, color: Colors.neutral[500] },
  actionRow: { flexDirection: 'row', gap: 10 },
  callBtn: {
    flexDirection: 'row',
    alignItems: 'center', gap: 6,
    paddingVertical: 12, paddingHorizontal: 20,
    borderRadius: BorderRadius.lg,
    backgroundColor: Colors.primary[600],
    ...Shadow.green,
  },
  callBtnText: { fontSize: FontSize.sm, fontWeight: FontWeight.bold, color: Colors.white },
  chatBtn: {
    flexDirection: 'row',
    alignItems: 'center', gap: 6,
    paddingVertical: 12, paddingHorizontal: 20,
    borderRadius: BorderRadius.lg,
    backgroundColor: Colors.primary[50],
    borderWidth: 1.5, borderColor: Colors.primary[200],
  },
  chatBtnText: { fontSize: FontSize.sm, fontWeight: FontWeight.bold, color: Colors.primary[600] },
  bookBtn: {
    flex: 1,
    paddingVertical: 13,
    borderRadius: BorderRadius.lg,
    backgroundColor: Colors.secondary[500],
    alignItems: 'center',
    ...Shadow.sm,
  },
  bookBtnText: { fontSize: FontSize.md, fontWeight: FontWeight.bold, color: Colors.white },
});

const mapStyles = StyleSheet.create({
  container: { flex: 1, position: 'relative', overflow: 'hidden' },
  gridH: {
    position: 'absolute',
    left: 0, right: 0,
    height: 1,
    backgroundColor: 'rgba(0,100,0,0.08)',
  },
  gridV: {
    position: 'absolute',
    top: 0, bottom: 0,
    width: 1,
    backgroundColor: 'rgba(0,100,0,0.08)',
  },
  road: {
    position: 'absolute',
    backgroundColor: 'rgba(150,120,80,0.25)',
    borderRadius: 6,
  },
  farmArea: {
    position: 'absolute',
    bottom: 100, left: '20%',
    width: 180, height: 120,
    backgroundColor: 'rgba(0,120,0,0.15)',
    borderWidth: 2,
    borderColor: 'rgba(0,150,0,0.4)',
    borderRadius: 8,
  },
  farmPattern: {
    flex: 1,
    borderRadius: 6,
    opacity: 0.5,
  },
  pin: { position: 'absolute', alignItems: 'center' },
  userPin: {
    width: 20, height: 20,
    borderRadius: 10,
    backgroundColor: Colors.error[600],
    borderWidth: 3, borderColor: Colors.white,
    zIndex: 10,
    ...Shadow.md,
  },
  userPinInner: {
    width: 8, height: 8,
    borderRadius: 4,
    backgroundColor: Colors.white,
    margin: 3,
  },
  pinRipple: {
    position: 'absolute',
    width: 28, height: 28,
    borderRadius: 14,
    backgroundColor: 'rgba(239,68,68,0.2)',
    top: -4, left: -4,
  },
  pinLabel: {
    fontSize: 10, fontWeight: FontWeight.bold,
    color: Colors.neutral[800],
    backgroundColor: Colors.white,
    paddingHorizontal: 6, paddingVertical: 2,
    borderRadius: 4,
    marginTop: 4,
    ...Shadow.sm,
  },
  tractorPin: {
    width: 40, height: 40,
    borderRadius: 20,
    backgroundColor: Colors.primary[600],
    alignItems: 'center', justifyContent: 'center',
    borderWidth: 2, borderColor: Colors.white,
    ...Shadow.md,
  },
  tractorPinEmoji: { fontSize: 20 },
  tractorPinLabel: {
    fontSize: 10, fontWeight: FontWeight.bold,
    color: Colors.primary[800],
    backgroundColor: Colors.white,
    paddingHorizontal: 6, paddingVertical: 2,
    borderRadius: 4,
    marginTop: 4,
    ...Shadow.sm,
  },
  routeLine: {
    position: 'absolute',
    bottom: 140, left: '42%',
    width: 2, height: 120,
    backgroundColor: Colors.primary[500],
    opacity: 0.6,
  },
  etaChip: {
    position: 'absolute',
    top: 160, left: Spacing.md,
    flexDirection: 'row', alignItems: 'center',
    gap: 6,
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.full,
    paddingHorizontal: 12, paddingVertical: 6,
    ...Shadow.md,
  },
  etaText: { fontSize: FontSize.sm, fontWeight: FontWeight.bold, color: Colors.primary[700] },
  scaleBar: {
    position: 'absolute',
    bottom: 20, right: Spacing.md,
    alignItems: 'flex-end',
    gap: 2,
  },
  scaleBarLine: { width: 60, height: 2, backgroundColor: Colors.neutral[700] },
  scaleBarText: { fontSize: 9, color: Colors.neutral[700], fontWeight: FontWeight.semibold },
  compass: {
    position: 'absolute',
    top: 20, right: Spacing.md,
    width: 36, height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255,255,255,0.9)',
    alignItems: 'center', justifyContent: 'center',
    ...Shadow.sm,
  },
  compassN: { fontSize: 12, fontWeight: FontWeight.bold, color: Colors.error[600] },
  compassArrow: { width: 2, height: 10, backgroundColor: Colors.neutral[700], borderRadius: 1 },
});
