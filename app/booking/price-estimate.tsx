import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { useRouter } from 'expo-router';
import { ArrowLeft, Tag, Info, ChevronDown } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors, FontSize, FontWeight, Spacing, BorderRadius, Shadow } from '@/constants/theme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function PriceEstimateScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [coupon, setCoupon] = useState('');
  const [couponApplied, setCouponApplied] = useState(false);

  const breakdown = [
    { label: 'Service Cost (4 acres × ₹900)', value: 3600, type: 'main' },
    { label: 'Distance Charge (1.2 km)', value: 60, type: 'sub' },
    { label: 'Platform Fee', value: 49, type: 'sub' },
    { label: 'GST (18%)', value: 67, type: 'sub' },
    { label: 'Coupon Discount (KISAN10)', value: -360, type: 'discount', show: couponApplied },
  ];

  const subtotal = breakdown
    .filter(b => b.show !== false)
    .reduce((sum, b) => sum + b.value, 0);

  const applyCoupon = () => {
    if (coupon.toUpperCase() === 'KISAN10') {
      setCouponApplied(true);
    }
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <ArrowLeft size={22} color={Colors.neutral[800]} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Price Estimate</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} style={styles.scroll} contentContainerStyle={styles.scrollContent}>
        <View style={styles.serviceCard}>
          <Text style={styles.serviceLabel}>Tractor Ploughing Service</Text>
          <View style={styles.serviceDetails}>
            <View style={styles.detailItem}><Text style={styles.detailLabel}>Provider</Text><Text style={styles.detailValue}>Ramu Kumar</Text></View>
            <View style={styles.detailItem}><Text style={styles.detailLabel}>Date & Time</Text><Text style={styles.detailValue}>15 Jun • 7:00 AM</Text></View>
            <View style={styles.detailItem}><Text style={styles.detailLabel}>Area</Text><Text style={styles.detailValue}>4 acres</Text></View>
          </View>
        </View>

        <View style={styles.breakdownCard}>
          <Text style={styles.cardTitle}>Price Breakdown</Text>
          {breakdown.filter(b => b.show !== false).map((item, i) => (
            <View key={i} style={[styles.breakdownRow, item.type === 'discount' && styles.discountRow]}>
              <Text style={[styles.breakdownLabel, item.type === 'discount' && styles.discountLabel]}>
                {item.label}
              </Text>
              <Text style={[
                styles.breakdownValue,
                item.type === 'sub' && styles.subValue,
                item.type === 'discount' && styles.discountValue,
              ]}>
                {item.value < 0 ? '-' : ''}₹{Math.abs(item.value)}
              </Text>
            </View>
          ))}
          <View style={styles.divider} />
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Total Amount</Text>
            <Text style={styles.totalValue}>₹{subtotal}</Text>
          </View>
          <View style={styles.savingsBanner}>
            <Text style={styles.savingsText}>
              {couponApplied ? '🎉 You saved ₹360 with KISAN10 coupon!' : '💡 Use coupon KISAN10 to get 10% off'}
            </Text>
          </View>
        </View>

        <View style={styles.couponCard}>
          <Tag size={18} color={Colors.primary[600]} />
          <TextInput
            style={styles.couponInput}
            placeholder="Enter coupon code"
            placeholderTextColor={Colors.neutral[400]}
            value={coupon}
            onChangeText={(t) => { setCoupon(t); setCouponApplied(false); }}
            autoCapitalize="characters"
          />
          <TouchableOpacity style={styles.applyBtn} onPress={applyCoupon}>
            <Text style={styles.applyBtnText}>{couponApplied ? 'Applied!' : 'Apply'}</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.infoCard}>
          <Info size={16} color={Colors.water[600]} />
          <Text style={styles.infoText}>This is an estimated price. Final price may vary based on actual work area and conditions. Payment after service completion.</Text>
        </View>
      </ScrollView>

      <View style={[styles.footer, { paddingBottom: insets.bottom + 12 }]}>
        <View style={styles.footerTotal}>
          <Text style={styles.footerTotalLabel}>Total Payable</Text>
          <Text style={styles.footerTotalValue}>₹{subtotal}</Text>
        </View>
        <TouchableOpacity
          style={styles.continueBtn}
          onPress={() => router.push('/booking/summary')}
          activeOpacity={0.85}
        >
          <LinearGradient
            colors={[Colors.primary[500], Colors.primary[700]]}
            style={styles.continueGradient}
            start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
          >
            <Text style={styles.continueText}>Proceed to Booking</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.neutral[50] },
  header: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: Spacing.md, paddingVertical: Spacing.md,
    backgroundColor: Colors.white,
    borderBottomWidth: 1, borderBottomColor: Colors.neutral[100],
  },
  backBtn: {
    width: 40, height: 40, borderRadius: 20,
    backgroundColor: Colors.neutral[100],
    alignItems: 'center', justifyContent: 'center',
  },
  headerTitle: { fontSize: FontSize.lg, fontWeight: FontWeight.bold, color: Colors.neutral[900] },
  scroll: { flex: 1 },
  scrollContent: { padding: Spacing.md, gap: Spacing.md },
  serviceCard: {
    backgroundColor: Colors.primary[50],
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    borderWidth: 1, borderColor: Colors.primary[200],
    gap: 10,
  },
  serviceLabel: { fontSize: FontSize.md, fontWeight: FontWeight.bold, color: Colors.primary[800] },
  serviceDetails: { gap: 6 },
  detailItem: { flexDirection: 'row', justifyContent: 'space-between' },
  detailLabel: { fontSize: FontSize.sm, color: Colors.neutral[500] },
  detailValue: { fontSize: FontSize.sm, fontWeight: FontWeight.semibold, color: Colors.neutral[800] },
  breakdownCard: {
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    gap: 10, ...Shadow.sm,
  },
  cardTitle: { fontSize: FontSize.md, fontWeight: FontWeight.bold, color: Colors.neutral[900], marginBottom: 2 },
  breakdownRow: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
  },
  discountRow: { backgroundColor: Colors.success[50], borderRadius: 6, padding: 4, marginHorizontal: -4 },
  breakdownLabel: { fontSize: FontSize.sm, color: Colors.neutral[700] },
  discountLabel: { color: Colors.success[700], fontWeight: FontWeight.semibold },
  breakdownValue: { fontSize: FontSize.sm, fontWeight: FontWeight.semibold, color: Colors.neutral[900] },
  subValue: { color: Colors.neutral[600] },
  discountValue: { color: Colors.success[600], fontWeight: FontWeight.bold },
  divider: { height: 1, backgroundColor: Colors.neutral[100] },
  totalRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  totalLabel: { fontSize: FontSize.lg, fontWeight: FontWeight.bold, color: Colors.neutral[900] },
  totalValue: { fontSize: FontSize.xl, fontWeight: FontWeight.bold, color: Colors.primary[700] },
  savingsBanner: {
    backgroundColor: Colors.success[50],
    borderRadius: BorderRadius.md,
    padding: 10,
    borderWidth: 1, borderColor: '#bbf7d0',
  },
  savingsText: { fontSize: FontSize.xs, color: Colors.success[700], fontWeight: FontWeight.medium, textAlign: 'center' },
  couponCard: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    borderWidth: 1.5, borderColor: Colors.neutral[200],
    gap: Spacing.sm,
    ...Shadow.sm,
  },
  couponInput: { flex: 1, fontSize: FontSize.md, color: Colors.neutral[900], letterSpacing: 1 },
  applyBtn: {
    paddingVertical: 8, paddingHorizontal: 16,
    borderRadius: BorderRadius.full,
    backgroundColor: Colors.primary[600],
  },
  applyBtnText: { fontSize: FontSize.sm, fontWeight: FontWeight.bold, color: Colors.white },
  infoCard: {
    flexDirection: 'row', alignItems: 'flex-start',
    backgroundColor: Colors.water[100],
    borderRadius: BorderRadius.md,
    padding: Spacing.md,
    gap: 8,
    borderWidth: 1, borderColor: Colors.water[200],
  },
  infoText: { flex: 1, fontSize: FontSize.xs, color: Colors.water[700], lineHeight: 18 },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.md,
    paddingTop: Spacing.sm,
    backgroundColor: Colors.white,
    borderTopWidth: 1, borderTopColor: Colors.neutral[100],
    gap: Spacing.md,
  },
  footerTotal: {},
  footerTotalLabel: { fontSize: FontSize.xs, color: Colors.neutral[500] },
  footerTotalValue: { fontSize: FontSize.xxl, fontWeight: FontWeight.bold, color: Colors.primary[700] },
  continueBtn: { flex: 1, borderRadius: BorderRadius.lg, overflow: 'hidden', ...Shadow.green },
  continueGradient: { paddingVertical: 16, alignItems: 'center' },
  continueText: { fontSize: FontSize.lg, fontWeight: FontWeight.bold, color: Colors.white },
});
