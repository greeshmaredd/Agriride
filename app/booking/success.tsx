import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { CheckCircle, Navigation, Home } from 'lucide-react-native';
import { Colors, FontSize, FontWeight, Spacing, BorderRadius, Shadow } from '@/constants/theme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function BookingSuccessScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const scaleAnim = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(40)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.spring(scaleAnim, { toValue: 1, useNativeDriver: true, tension: 40, friction: 6 }),
      Animated.parallel([
        Animated.timing(fadeAnim, { toValue: 1, duration: 400, useNativeDriver: true }),
        Animated.spring(slideAnim, { toValue: 0, useNativeDriver: true, tension: 50, friction: 8 }),
      ]),
    ]).start();
  }, []);

  return (
    <LinearGradient colors={['#f0fdf4', '#dcfce7', '#f0fdf4']} style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.content}>
        <Animated.View style={[styles.successIconWrap, { transform: [{ scale: scaleAnim }] }]}>
          <View style={styles.successCircle}>
            <CheckCircle size={64} color={Colors.success[600]} fill={Colors.success[100]} />
          </View>
          <View style={styles.ripple1} />
          <View style={styles.ripple2} />
        </Animated.View>

        <Animated.View style={[styles.textSection, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}>
          <Text style={styles.successTitle}>Booking Confirmed!</Text>
          <Text style={styles.successDesc}>Your tractor service has been booked successfully</Text>

          <View style={styles.bookingIdCard}>
            <Text style={styles.bookingIdLabel}>Booking ID</Text>
            <Text style={styles.bookingId}>#AR-2026-4521</Text>
          </View>

          <View style={styles.detailsCard}>
            {[
              { label: 'Service', value: 'Tractor Ploughing' },
              { label: 'Provider', value: 'Ramu Kumar' },
              { label: 'Date & Time', value: '15 Jun • 7:00 AM' },
              { label: 'Estimated Arrival', value: '12 minutes' },
              { label: 'Payment', value: 'Cash after service' },
            ].map((item, i) => (
              <View key={i} style={[styles.detailRow, i > 0 && styles.detailRowBorder]}>
                <Text style={styles.detailLabel}>{item.label}</Text>
                <Text style={styles.detailValue}>{item.value}</Text>
              </View>
            ))}
          </View>
        </Animated.View>
      </View>

      <Animated.View style={[styles.actionsSection, { opacity: fadeAnim, paddingBottom: insets.bottom + 24 }]}>
        <TouchableOpacity
          style={styles.trackBtn}
          onPress={() => router.push('/booking/tracking')}
          activeOpacity={0.85}
        >
          <LinearGradient
            colors={[Colors.primary[500], Colors.primary[700]]}
            style={styles.trackGradient}
            start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
          >
            <Navigation size={20} color={Colors.white} />
            <Text style={styles.trackBtnText}>Track Vehicle</Text>
          </LinearGradient>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.homeBtn}
          onPress={() => router.replace('/(tabs)/home')}
        >
          <Home size={18} color={Colors.primary[600]} />
          <Text style={styles.homeBtnText}>Back to Home</Text>
        </TouchableOpacity>
      </Animated.View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: Spacing.xl, gap: Spacing.xl },
  successIconWrap: { alignItems: 'center', justifyContent: 'center', position: 'relative', marginBottom: 8 },
  successCircle: { zIndex: 2 },
  ripple1: {
    position: 'absolute',
    width: 100, height: 100,
    borderRadius: 50,
    backgroundColor: Colors.success[200],
    opacity: 0.3,
    zIndex: 1,
  },
  ripple2: {
    position: 'absolute',
    width: 140, height: 140,
    borderRadius: 70,
    backgroundColor: Colors.success[100],
    opacity: 0.2,
    zIndex: 0,
  },
  textSection: { width: '100%', gap: Spacing.md, alignItems: 'center' },
  successTitle: { fontSize: FontSize.xxxl, fontWeight: FontWeight.bold, color: Colors.success[700], textAlign: 'center' },
  successDesc: { fontSize: FontSize.md, color: Colors.neutral[600], textAlign: 'center', lineHeight: 24 },
  bookingIdCard: {
    backgroundColor: Colors.primary[50],
    borderRadius: BorderRadius.full,
    paddingHorizontal: Spacing.xl,
    paddingVertical: 10,
    alignItems: 'center',
    borderWidth: 1, borderColor: Colors.primary[200],
  },
  bookingIdLabel: { fontSize: FontSize.xs, color: Colors.neutral[500] },
  bookingId: { fontSize: FontSize.lg, fontWeight: FontWeight.bold, color: Colors.primary[700], letterSpacing: 1 },
  detailsCard: {
    width: '100%',
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.xl,
    padding: Spacing.md,
    ...Shadow.md,
    gap: 0,
  },
  detailRow: { paddingVertical: 10, flexDirection: 'row', justifyContent: 'space-between' },
  detailRowBorder: { borderTopWidth: 1, borderTopColor: Colors.neutral[100] },
  detailLabel: { fontSize: FontSize.sm, color: Colors.neutral[500] },
  detailValue: { fontSize: FontSize.sm, fontWeight: FontWeight.semibold, color: Colors.neutral[800] },
  actionsSection: {
    paddingHorizontal: Spacing.xl,
    gap: 12,
  },
  trackBtn: { borderRadius: BorderRadius.lg, overflow: 'hidden', ...Shadow.green },
  trackGradient: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    paddingVertical: 16, gap: 10,
  },
  trackBtnText: { fontSize: FontSize.lg, fontWeight: FontWeight.bold, color: Colors.white },
  homeBtn: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    gap: 8, paddingVertical: 14,
    borderRadius: BorderRadius.lg,
    backgroundColor: Colors.white,
    borderWidth: 1.5, borderColor: Colors.primary[200],
  },
  homeBtnText: { fontSize: FontSize.md, fontWeight: FontWeight.semibold, color: Colors.primary[700] },
});
