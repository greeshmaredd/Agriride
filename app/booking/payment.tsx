import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { useRouter } from 'expo-router';
import { ArrowLeft, CreditCard, Smartphone, Wallet, Banknote, Lock, ChevronRight } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors, FontSize, FontWeight, Spacing, BorderRadius, Shadow } from '@/constants/theme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const upiApps = [
  { id: 'gpay', name: 'Google Pay', icon: '🟢' },
  { id: 'phonepe', name: 'PhonePe', icon: '🟣' },
  { id: 'paytm', name: 'Paytm', icon: '💙' },
  { id: 'bhim', name: 'BHIM UPI', icon: '🔵' },
];

export default function PaymentScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [selected, setSelected] = useState('cash');
  const [upiId, setUpiId] = useState('');
  const [processing, setProcessing] = useState(false);

  const handlePay = () => {
    setProcessing(true);
    setTimeout(() => {
      setProcessing(false);
      router.push('/booking/success');
    }, 2000);
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <ArrowLeft size={22} color={Colors.neutral[800]} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Payment</Text>
        <View style={styles.secureWrap}>
          <Lock size={13} color={Colors.success[600]} />
          <Text style={styles.secureText}>Secure</Text>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} style={styles.scroll} contentContainerStyle={styles.scrollContent}>
        <View style={styles.amountCard}>
          <Text style={styles.amountLabel}>Total Amount</Text>
          <Text style={styles.amountValue}>₹3,416</Text>
          <Text style={styles.amountDesc}>Tractor Ploughing • 4 acres</Text>
        </View>

        <Text style={styles.sectionTitle}>Choose Payment Method</Text>

        {[
          { id: 'cash', icon: Banknote, label: 'Cash Payment', desc: 'Pay in cash after service completion', color: Colors.success[600] },
          { id: 'upi', icon: Smartphone, label: 'UPI', desc: 'Pay via UPI apps', color: '#7c3aed' },
          { id: 'card', icon: CreditCard, label: 'Debit / Credit Card', desc: 'Visa, Mastercard, RuPay', color: Colors.water[600] },
          { id: 'wallet', icon: Wallet, label: 'AgriRide Wallet', desc: 'Balance: ₹0', color: Colors.secondary[600] },
        ].map(({ id, icon: Icon, label, desc, color }) => (
          <TouchableOpacity
            key={id}
            style={[styles.paymentCard, selected === id && styles.paymentCardActive, selected === id && { borderColor: color }]}
            onPress={() => setSelected(id)}
            activeOpacity={0.8}
          >
            <View style={[styles.paymentIconWrap, { backgroundColor: color + '18' }]}>
              <Icon size={22} color={color} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={[styles.paymentLabel, selected === id && { color }]}>{label}</Text>
              <Text style={styles.paymentDesc}>{desc}</Text>
            </View>
            <View style={[styles.radio, selected === id && { borderColor: color }]}>
              {selected === id && <View style={[styles.radioDot, { backgroundColor: color }]} />}
            </View>
          </TouchableOpacity>
        ))}

        {selected === 'upi' && (
          <View style={styles.upiSection}>
            <Text style={styles.upiSectionTitle}>Popular UPI Apps</Text>
            <View style={styles.upiAppsRow}>
              {upiApps.map(app => (
                <TouchableOpacity key={app.id} style={styles.upiApp} activeOpacity={0.8}>
                  <Text style={styles.upiAppIcon}>{app.icon}</Text>
                  <Text style={styles.upiAppName}>{app.name}</Text>
                </TouchableOpacity>
              ))}
            </View>
            <Text style={styles.orText}>— or enter UPI ID manually —</Text>
            <View style={styles.upiInput}>
              <TextInput
                style={styles.upiInputField}
                placeholder="yourname@bank"
                placeholderTextColor={Colors.neutral[400]}
                value={upiId}
                onChangeText={setUpiId}
                keyboardType="email-address"
              />
              <TouchableOpacity style={styles.verifyBtn}>
                <Text style={styles.verifyBtnText}>Verify</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        <View style={styles.securityNote}>
          <Lock size={14} color={Colors.neutral[500]} />
          <Text style={styles.securityText}>All transactions are secured with 256-bit SSL encryption</Text>
        </View>
      </ScrollView>

      <View style={[styles.footer, { paddingBottom: insets.bottom + 12 }]}>
        <TouchableOpacity
          style={styles.payBtn}
          onPress={handlePay}
          disabled={processing}
          activeOpacity={0.85}
        >
          <LinearGradient
            colors={[Colors.primary[500], Colors.primary[700]]}
            style={styles.payGradient}
            start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
          >
            <Text style={styles.payBtnText}>
              {processing ? 'Processing...' : `Pay ₹3,416 via ${selected === 'cash' ? 'Cash' : selected.toUpperCase()}`}
            </Text>
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
    backgroundColor: Colors.neutral[100], alignItems: 'center', justifyContent: 'center',
  },
  headerTitle: { fontSize: FontSize.lg, fontWeight: FontWeight.bold, color: Colors.neutral[900] },
  secureWrap: {
    flexDirection: 'row', alignItems: 'center', gap: 4,
    backgroundColor: Colors.success[50], paddingHorizontal: 8, paddingVertical: 4,
    borderRadius: BorderRadius.full,
  },
  secureText: { fontSize: FontSize.xs, fontWeight: FontWeight.semibold, color: Colors.success[700] },
  scroll: { flex: 1 },
  scrollContent: { padding: Spacing.md, gap: Spacing.md },
  amountCard: {
    backgroundColor: Colors.primary[600],
    borderRadius: BorderRadius.xl, padding: Spacing.lg,
    alignItems: 'center', gap: 4, ...Shadow.green,
  },
  amountLabel: { fontSize: FontSize.sm, color: 'rgba(255,255,255,0.8)' },
  amountValue: { fontSize: 40, fontWeight: FontWeight.bold, color: Colors.white },
  amountDesc: { fontSize: FontSize.xs, color: 'rgba(255,255,255,0.7)' },
  sectionTitle: { fontSize: FontSize.md, fontWeight: FontWeight.bold, color: Colors.neutral[900] },
  paymentCard: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: Colors.white, borderRadius: BorderRadius.lg,
    padding: Spacing.md, gap: Spacing.md,
    borderWidth: 2, borderColor: Colors.neutral[200],
    ...Shadow.sm,
  },
  paymentCardActive: { backgroundColor: Colors.neutral[50] },
  paymentIconWrap: {
    width: 48, height: 48, borderRadius: 14,
    alignItems: 'center', justifyContent: 'center',
  },
  paymentLabel: { fontSize: FontSize.md, fontWeight: FontWeight.bold, color: Colors.neutral[900] },
  paymentDesc: { fontSize: FontSize.xs, color: Colors.neutral[500], marginTop: 2 },
  radio: {
    width: 22, height: 22, borderRadius: 11,
    borderWidth: 2, borderColor: Colors.neutral[300],
    alignItems: 'center', justifyContent: 'center',
  },
  radioDot: { width: 10, height: 10, borderRadius: 5 },
  upiSection: {
    backgroundColor: Colors.white, borderRadius: BorderRadius.lg,
    padding: Spacing.md, gap: 12, ...Shadow.sm,
  },
  upiSectionTitle: { fontSize: FontSize.sm, fontWeight: FontWeight.semibold, color: Colors.neutral[700] },
  upiAppsRow: { flexDirection: 'row', justifyContent: 'space-between' },
  upiApp: {
    flex: 1, alignItems: 'center',
    padding: 10, borderRadius: BorderRadius.md,
    borderWidth: 1, borderColor: Colors.neutral[200],
    marginHorizontal: 4,
  },
  upiAppIcon: { fontSize: 22 },
  upiAppName: { fontSize: 9, color: Colors.neutral[600], marginTop: 4, textAlign: 'center' },
  orText: { textAlign: 'center', fontSize: FontSize.xs, color: Colors.neutral[400] },
  upiInput: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: Colors.neutral[50], borderRadius: BorderRadius.md,
    borderWidth: 1.5, borderColor: Colors.neutral[200], overflow: 'hidden',
  },
  upiInputField: { flex: 1, paddingHorizontal: Spacing.md, paddingVertical: 12, fontSize: FontSize.md, color: Colors.neutral[900] },
  verifyBtn: { paddingHorizontal: 16, paddingVertical: 12, backgroundColor: Colors.primary[600] },
  verifyBtnText: { fontSize: FontSize.sm, fontWeight: FontWeight.bold, color: Colors.white },
  securityNote: {
    flexDirection: 'row', alignItems: 'center', gap: 8,
    backgroundColor: Colors.neutral[100], borderRadius: BorderRadius.md, padding: Spacing.md,
  },
  securityText: { flex: 1, fontSize: FontSize.xs, color: Colors.neutral[600] },
  footer: {
    paddingHorizontal: Spacing.md, paddingTop: Spacing.sm,
    backgroundColor: Colors.white, borderTopWidth: 1, borderTopColor: Colors.neutral[100],
  },
  payBtn: { borderRadius: BorderRadius.lg, overflow: 'hidden', ...Shadow.green },
  payGradient: { paddingVertical: 16, alignItems: 'center' },
  payBtnText: { fontSize: FontSize.lg, fontWeight: FontWeight.bold, color: Colors.white },
});
