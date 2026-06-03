import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Phone, ChevronRight } from 'lucide-react-native';
import { Colors, FontSize, FontWeight, Spacing, BorderRadius, Shadow } from '@/constants/theme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

function FarmerIllustration() {
  return (
    <View style={ill.container}>
      <LinearGradient colors={['#e8f5e9', '#c8e6c9']} style={ill.bg}>
        <View style={ill.sun} />
        <View style={ill.field} />
        <View style={ill.farmerWrap}>
          <View style={ill.farmerBody}>
            <View style={ill.head}>
              <View style={ill.hat} />
              <View style={ill.face} />
            </View>
            <View style={ill.torso} />
            <View style={ill.arm} />
            <View style={[ill.arm, ill.armRight]} />
            <View style={ill.legs}>
              <View style={ill.leg} />
              <View style={ill.leg} />
            </View>
          </View>
          <View style={ill.phoneHold}>
            <View style={ill.miniPhone}>
              <View style={ill.miniScreen} />
            </View>
          </View>
        </View>
        <View style={ill.tractor}>
          <View style={ill.tractorBody} />
          <View style={ill.tractorWheel} />
        </View>
        <View style={ill.cropRow}>
          {[0,1,2,3,4,5].map(i => (
            <View key={i} style={ill.crop}>
              <View style={ill.stem} />
              <View style={ill.leaf} />
            </View>
          ))}
        </View>
      </LinearGradient>
    </View>
  );
}

export default function LoginScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');

  const handleLogin = () => {
    if (phone.length !== 10) {
      setError('Please enter a valid 10-digit mobile number');
      return;
    }
    setError('');
    router.push('/auth/otp');
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        style={[styles.container, { paddingTop: insets.top }]}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.illustration}>
          <FarmerIllustration />
        </View>

        <View style={styles.content}>
          <View style={styles.logoRow}>
            <LinearGradient
              colors={[Colors.primary[600], Colors.primary[800]]}
              style={styles.logoIcon}
            >
              <Text style={styles.logoText}>A</Text>
            </LinearGradient>
            <View>
              <Text style={styles.appName}>AgriRide</Text>
              <Text style={styles.appTagline}>Smart Farming Partner</Text>
            </View>
          </View>

          <Text style={styles.heading}>Login to AgriRide</Text>
          <Text style={styles.subheading}>
            Enter your mobile number to get started
          </Text>

          <View style={styles.inputCard}>
            <Text style={styles.inputLabel}>Mobile Number</Text>
            <View style={[styles.inputRow, error ? styles.inputError : {}]}>
              <View style={styles.countryCode}>
                <Text style={styles.flag}>🇮🇳</Text>
                <Text style={styles.code}>+91</Text>
                <ChevronRight size={14} color={Colors.neutral[400]} />
              </View>
              <View style={styles.divider} />
              <TextInput
                style={styles.phoneInput}
                placeholder="Enter 10-digit mobile number"
                placeholderTextColor={Colors.neutral[400]}
                value={phone}
                onChangeText={(t) => { setPhone(t.replace(/\D/g, '')); setError(''); }}
                keyboardType="number-pad"
                maxLength={10}
              />
              <Phone size={18} color={Colors.neutral[400]} style={{ marginRight: 12 }} />
            </View>
            {error ? <Text style={styles.errorText}>{error}</Text> : null}
          </View>

          <TouchableOpacity style={styles.otpBtn} onPress={handleLogin} activeOpacity={0.85}>
            <LinearGradient
              colors={[Colors.primary[500], Colors.primary[700]]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.otpGradient}
            >
              <Text style={styles.otpText}>Send OTP</Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => router.push('/auth/register')} style={styles.registerRow}>
            <Text style={styles.registerText}>New to AgriRide? </Text>
            <Text style={styles.registerLink}>Register Now</Text>
          </TouchableOpacity>

          <Text style={styles.terms}>
            By continuing, you agree to our{' '}
            <Text style={styles.termsLink}>Terms of Service</Text>
            {' '}and{' '}
            <Text style={styles.termsLink}>Privacy Policy</Text>
          </Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.cream },
  illustration: { height: 220, overflow: 'hidden' },
  content: {
    flex: 1,
    backgroundColor: Colors.cream,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    marginTop: -24,
    padding: Spacing.xl,
    gap: Spacing.md,
  },
  logoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: Spacing.sm,
  },
  logoIcon: {
    width: 46,
    height: 46,
    borderRadius: 13,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoText: {
    fontSize: FontSize.xl,
    fontWeight: FontWeight.bold,
    color: Colors.white,
  },
  appName: {
    fontSize: FontSize.xl,
    fontWeight: FontWeight.bold,
    color: Colors.primary[700],
  },
  appTagline: {
    fontSize: FontSize.xs,
    color: Colors.neutral[500],
    fontWeight: FontWeight.medium,
  },
  heading: {
    fontSize: FontSize.xxl,
    fontWeight: FontWeight.bold,
    color: Colors.neutral[900],
  },
  subheading: {
    fontSize: FontSize.md,
    color: Colors.neutral[500],
    marginTop: -8,
    lineHeight: 22,
  },
  inputCard: { gap: 8 },
  inputLabel: {
    fontSize: FontSize.sm,
    fontWeight: FontWeight.semibold,
    color: Colors.neutral[700],
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.md,
    borderWidth: 1.5,
    borderColor: Colors.neutral[200],
    height: 56,
    overflow: 'hidden',
  },
  inputError: { borderColor: Colors.error[500] },
  countryCode: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.md,
    gap: 4,
  },
  flag: { fontSize: 18 },
  code: {
    fontSize: FontSize.md,
    fontWeight: FontWeight.semibold,
    color: Colors.neutral[800],
  },
  divider: {
    width: 1,
    height: 30,
    backgroundColor: Colors.neutral[200],
  },
  phoneInput: {
    flex: 1,
    fontSize: FontSize.md,
    color: Colors.neutral[900],
    paddingHorizontal: Spacing.md,
    letterSpacing: 1,
  },
  errorText: {
    fontSize: FontSize.xs,
    color: Colors.error[600],
  },
  otpBtn: {
    borderRadius: BorderRadius.lg,
    overflow: 'hidden',
    marginTop: Spacing.sm,
    ...Shadow.green,
  },
  otpGradient: {
    paddingVertical: 16,
    alignItems: 'center',
    borderRadius: BorderRadius.lg,
  },
  otpText: {
    fontSize: FontSize.lg,
    fontWeight: FontWeight.bold,
    color: Colors.white,
    letterSpacing: 0.5,
  },
  registerRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: Spacing.xs,
  },
  registerText: { fontSize: FontSize.sm, color: Colors.neutral[600] },
  registerLink: {
    fontSize: FontSize.sm,
    color: Colors.primary[600],
    fontWeight: FontWeight.semibold,
  },
  terms: {
    fontSize: 11,
    color: Colors.neutral[400],
    textAlign: 'center',
    lineHeight: 18,
  },
  termsLink: { color: Colors.primary[600], fontWeight: FontWeight.medium },
});

const ill = StyleSheet.create({
  container: { flex: 1 },
  bg: { flex: 1, position: 'relative', overflow: 'hidden' },
  sun: {
    position: 'absolute',
    top: 15, right: 30,
    width: 40, height: 40,
    borderRadius: 20,
    backgroundColor: Colors.secondary[300],
  },
  field: {
    position: 'absolute',
    bottom: 0, left: 0, right: 0,
    height: 70,
    backgroundColor: '#81c784',
    borderTopLeftRadius: 60,
  },
  farmerWrap: {
    position: 'absolute',
    bottom: 40,
    left: '35%',
    alignItems: 'center',
  },
  farmerBody: { alignItems: 'center' },
  head: { alignItems: 'center' },
  hat: {
    width: 36, height: 14,
    backgroundColor: Colors.primary[700],
    borderRadius: 4,
    marginBottom: -3,
  },
  face: {
    width: 28, height: 28,
    borderRadius: 14,
    backgroundColor: '#f9c784',
    borderWidth: 1,
    borderColor: '#e8a060',
  },
  torso: {
    width: 34, height: 38,
    backgroundColor: Colors.primary[600],
    borderRadius: 6,
    marginTop: 2,
  },
  arm: {
    position: 'absolute',
    width: 10, height: 30,
    backgroundColor: Colors.primary[500],
    borderRadius: 5,
    top: 38, left: -8,
    transform: [{ rotate: '15deg' }],
  },
  armRight: {
    left: undefined, right: -8,
    transform: [{ rotate: '-15deg' }],
  },
  legs: { flexDirection: 'row', gap: 4, marginTop: 2 },
  leg: {
    width: 13, height: 28,
    backgroundColor: Colors.neutral[700],
    borderRadius: 5,
  },
  phoneHold: {
    position: 'absolute',
    right: -35, top: 20,
  },
  miniPhone: {
    width: 22, height: 36,
    backgroundColor: Colors.neutral[800],
    borderRadius: 5,
    padding: 3,
  },
  miniScreen: {
    flex: 1,
    backgroundColor: Colors.primary[400],
    borderRadius: 3,
  },
  tractor: {
    position: 'absolute',
    bottom: 40, right: 30,
  },
  tractorBody: {
    width: 60, height: 35,
    backgroundColor: Colors.primary[600],
    borderRadius: 6,
  },
  tractorWheel: {
    position: 'absolute',
    bottom: -8, left: 8,
    width: 22, height: 22,
    borderRadius: 11,
    backgroundColor: Colors.neutral[800],
    borderWidth: 3,
    borderColor: Colors.neutral[600],
  },
  cropRow: {
    position: 'absolute',
    bottom: 14, left: 20,
    flexDirection: 'row',
    gap: 8,
  },
  crop: { alignItems: 'center' },
  stem: { width: 3, height: 18, backgroundColor: Colors.primary[700], borderRadius: 2 },
  leaf: { width: 12, height: 7, backgroundColor: Colors.primary[500], borderRadius: 6 },
});
