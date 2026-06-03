import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { ArrowLeft, MapPin, Calendar, Clock, User, CreditCard } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors, FontSize, FontWeight, Spacing, BorderRadius, Shadow } from '@/constants/theme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function BookingSummaryScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [paymentMode, setPaymentMode] = useState('cash');

  const summary = {
    service: 'Tractor Ploughing',
    provider: 'Ramu Kumar',
    farmLocation: 'Survey No. 45, Kurnool Village',
    date: 'Saturday, 15 June 2026',
    time: '7:00 AM',
    duration: '4 hours',
    area: '4 acres',
    price: '₹3,416',
  };

  const paymentOptions = [
    { id: 'cash', label: 'Cash', icon: '💵', desc: 'Pay after service completion' },
    { id: 'upi', label: 'UPI', icon: '📱', desc: 'GPay, PhonePe, Paytm' },
    { id: 'card', label: 'Card', icon: '💳', desc: 'Debit / Credit Card' },
    { id: 'wallet', label: 'Wallet', icon: '👝', desc: 'AgriRide Wallet: ₹0' },
  ];

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <ArrowLeft size={22} color={Colors.neutral[800]} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Booking Summary</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} style={styles.scroll} contentContainerStyle={styles.scrollContent}>
        <View style={styles.summaryCard}>
          <LinearGradient colors={[Colors.primary[600], Colors.primary[500]]} style={styles.summaryHeader}>
            <Text style={styles.summaryService}>{summary.service}</Text>
            <Text style={styles.summaryProvider}>by {summary.provider}</Text>
          </LinearGradient>

          <View style={styles.summaryBody}>
            {[
              { icon: MapPin, label: 'Farm Location', value: summary.farmLocation },
              { icon: Calendar, label: 'Date', value: summary.date },
              { icon: Clock, label: 'Time & Duration', value: `${summary.time} • ${summary.duration}` },
              { icon: User, label: 'Service Area', value: summary.area },
            ].map(({ icon: Icon, label, value }, i) => (
              <View key={i} style={styles.summaryRow}>
                <View style={styles.summaryIcon}>
                  <Icon size={16} color={Colors.primary[600]} />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.summaryLabel}>{label}</Text>
                  <Text style={styles.summaryValue}>{value}</Text>
                </View>
              </View>
            ))}

            <View style={styles.priceRow}>
              <Text style={styles.priceTotalLabel}>Total Amount</Text>
              <Text style={styles.priceTotalValue}>{summary.price}</Text>
            </View>
          </View>
        </View>

        <View style={styles.paymentCard}>
          <View style={styles.paymentHeader}>
            <CreditCard size={18} color={Colors.neutral[700]} />
            <Text style={styles.paymentTitle}>Payment Method</Text>
          </View>
          {paymentOptions.map(opt => (
            <TouchableOpacity
              key={opt.id}
              style={[styles.paymentOption, paymentMode === opt.id && styles.paymentOptionActive]}
              onPress={() => setPaymentMode(opt.id)}
              activeOpacity={0.8}
            >
              <Text style={styles.paymentIcon}>{opt.icon}</Text>
              <View style={{ flex: 1 }}>
                <Text style={[styles.paymentLabel, paymentMode === opt.id && styles.paymentLabelActive]}>{opt.label}</Text>
                <Text style={styles.paymentDesc}>{opt.desc}</Text>
              </View>
              <View style={[styles.radioCircle, paymentMode === opt.id && styles.radioCircleActive]}>
                {paymentMode === opt.id && <View style={styles.radioDot} />}
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.termsCard}>
          <Text style={styles.termsText}>
            By confirming, you agree to AgriRide's{' '}
            <Text style={styles.termsLink}>Booking Terms</Text>.
            The provider will be notified and will confirm within 30 minutes.
          </Text>
        </View>
      </ScrollView>

      <View style={[styles.footer, { paddingBottom: insets.bottom + 12 }]}>
        <TouchableOpacity
          style={styles.confirmBtn}
          onPress={() => router.push('/booking/payment')}
          activeOpacity={0.85}
        >
          <LinearGradient
            colors={[Colors.primary[500], Colors.primary[700]]}
            style={styles.confirmGradient}
            start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
          >
            <Text style={styles.confirmText}>Confirm Booking • {summary.price}</Text>
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
    backgroundColor: Colors.white, borderBottomWidth: 1, borderBottomColor: Colors.neutral[100],
  },
  backBtn: {
    width: 40, height: 40, borderRadius: 20,
    backgroundColor: Colors.neutral[100],
    alignItems: 'center', justifyContent: 'center',
  },
  headerTitle: { fontSize: FontSize.lg, fontWeight: FontWeight.bold, color: Colors.neutral[900] },
  scroll: { flex: 1 },
  scrollContent: { padding: Spacing.md, gap: Spacing.md, paddingBottom: 20 },
  summaryCard: { borderRadius: BorderRadius.xl, overflow: 'hidden', ...Shadow.md },
  summaryHeader: { padding: Spacing.md },
  summaryService: { fontSize: FontSize.xl, fontWeight: FontWeight.bold, color: Colors.white },
  summaryProvider: { fontSize: FontSize.sm, color: 'rgba(255,255,255,0.85)', marginTop: 2 },
  summaryBody: { backgroundColor: Colors.white, padding: Spacing.md, gap: 12 },
  summaryRow: { flexDirection: 'row', alignItems: 'flex-start', gap: 12 },
  summaryIcon: {
    width: 32, height: 32, borderRadius: 16,
    backgroundColor: Colors.primary[50],
    alignItems: 'center', justifyContent: 'center',
  },
  summaryLabel: { fontSize: FontSize.xs, color: Colors.neutral[500] },
  summaryValue: { fontSize: FontSize.sm, fontWeight: FontWeight.semibold, color: Colors.neutral[900], marginTop: 2 },
  priceRow: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    borderTopWidth: 1, borderTopColor: Colors.neutral[100], paddingTop: 12, marginTop: 4,
  },
  priceTotalLabel: { fontSize: FontSize.lg, fontWeight: FontWeight.bold, color: Colors.neutral[900] },
  priceTotalValue: { fontSize: FontSize.xxl, fontWeight: FontWeight.bold, color: Colors.primary[700] },
  paymentCard: {
    backgroundColor: Colors.white, borderRadius: BorderRadius.lg,
    padding: Spacing.md, gap: 10, ...Shadow.sm,
  },
  paymentHeader: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  paymentTitle: { fontSize: FontSize.md, fontWeight: FontWeight.bold, color: Colors.neutral[900] },
  paymentOption: {
    flexDirection: 'row', alignItems: 'center',
    padding: 12, borderRadius: BorderRadius.md,
    borderWidth: 1.5, borderColor: Colors.neutral[200],
    gap: 12,
  },
  paymentOptionActive: { borderColor: Colors.primary[400], backgroundColor: Colors.primary[50] },
  paymentIcon: { fontSize: 24 },
  paymentLabel: { fontSize: FontSize.md, fontWeight: FontWeight.semibold, color: Colors.neutral[800] },
  paymentLabelActive: { color: Colors.primary[700] },
  paymentDesc: { fontSize: FontSize.xs, color: Colors.neutral[500] },
  radioCircle: {
    width: 20, height: 20, borderRadius: 10,
    borderWidth: 2, borderColor: Colors.neutral[300],
    alignItems: 'center', justifyContent: 'center',
  },
  radioCircleActive: { borderColor: Colors.primary[600] },
  radioDot: { width: 10, height: 10, borderRadius: 5, backgroundColor: Colors.primary[600] },
  termsCard: {
    backgroundColor: Colors.neutral[50],
    borderRadius: BorderRadius.md,
    padding: Spacing.md,
    borderWidth: 1, borderColor: Colors.neutral[200],
  },
  termsText: { fontSize: FontSize.xs, color: Colors.neutral[600], lineHeight: 18, textAlign: 'center' },
  termsLink: { color: Colors.primary[600], fontWeight: FontWeight.semibold },
  footer: {
    paddingHorizontal: Spacing.md, paddingTop: Spacing.sm,
    backgroundColor: Colors.white,
    borderTopWidth: 1, borderTopColor: Colors.neutral[100],
  },
  confirmBtn: { borderRadius: BorderRadius.lg, overflow: 'hidden', ...Shadow.green },
  confirmGradient: { paddingVertical: 16, alignItems: 'center' },
  confirmText: { fontSize: FontSize.lg, fontWeight: FontWeight.bold, color: Colors.white },
});
