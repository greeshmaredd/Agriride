import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors, FontSize, FontWeight, Spacing, BorderRadius, Shadow } from '@/constants/theme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function OTPScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [timer, setTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);
  const inputs = useRef<(TextInput | null)[]>([]);

  useEffect(() => {
    if (timer > 0) {
      const t = setTimeout(() => setTimer(timer - 1), 1000);
      return () => clearTimeout(t);
    } else {
      setCanResend(true);
    }
  }, [timer]);

  const handleChange = (val: string, idx: number) => {
    const newOtp = [...otp];
    newOtp[idx] = val.replace(/\D/g, '').slice(-1);
    setOtp(newOtp);
    if (val && idx < 5) {
      inputs.current[idx + 1]?.focus();
    }
  };

  const handleKeyPress = (key: string, idx: number) => {
    if (key === 'Backspace' && !otp[idx] && idx > 0) {
      inputs.current[idx - 1]?.focus();
    }
  };

  const handleVerify = () => {
    const code = otp.join('');
    if (code.length === 6) {
      router.replace('/auth/register');
    }
  };

  const resendOTP = () => {
    setTimer(30);
    setCanResend(false);
    setOtp(['', '', '', '', '', '']);
  };

  const filled = otp.filter(Boolean).length;

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={[styles.container, { paddingTop: insets.top }]}>
        <View style={styles.header}>
          <View style={styles.tractorIcon}>
            <View style={styles.tractorBody}>
              <View style={styles.tractorCabin} />
              <View style={styles.tractorHood} />
              <View style={styles.wheelL} />
              <View style={styles.wheelS} />
            </View>
          </View>
        </View>

        <View style={styles.content}>
          <Text style={styles.title}>OTP Verification</Text>
          <Text style={styles.subtitle}>
            We sent a 6-digit code to{'\n'}
            <Text style={styles.phone}>+91 98765 43210</Text>
          </Text>

          <View style={styles.otpRow}>
            {otp.map((digit, i) => (
              <TextInput
                key={i}
                ref={(r) => { inputs.current[i] = r; }}
                style={[
                  styles.otpBox,
                  digit ? styles.otpBoxFilled : {},
                  i === filled && filled < 6 ? styles.otpBoxActive : {},
                ]}
                value={digit}
                onChangeText={(v) => handleChange(v, i)}
                onKeyPress={(e) => handleKeyPress(e.nativeEvent.key, i)}
                keyboardType="number-pad"
                maxLength={1}
                textAlign="center"
              />
            ))}
          </View>

          <View style={styles.timerRow}>
            {canResend ? (
              <TouchableOpacity onPress={resendOTP}>
                <Text style={styles.resendActive}>Resend OTP</Text>
              </TouchableOpacity>
            ) : (
              <Text style={styles.timerText}>
                Resend OTP in{' '}
                <Text style={styles.timerCount}>00:{timer.toString().padStart(2, '0')}</Text>
              </Text>
            )}
          </View>

          <TouchableOpacity
            style={[styles.verifyBtn, filled < 6 && styles.verifyBtnDisabled]}
            onPress={handleVerify}
            disabled={filled < 6}
            activeOpacity={0.85}
          >
            <LinearGradient
              colors={filled === 6 ? [Colors.primary[500], Colors.primary[700]] : [Colors.neutral[300], Colors.neutral[300]]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.verifyGradient}
            >
              <Text style={[styles.verifyText, filled < 6 && styles.verifyTextDisabled]}>
                Verify & Continue
              </Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => router.back()}
            style={styles.changeNumber}
          >
            <Text style={styles.changeNumberText}>Change Mobile Number</Text>
          </TouchableOpacity>

          <View style={styles.secureNote}>
            <View style={styles.lockIcon}>
              <Text style={styles.lockEmoji}>🔒</Text>
            </View>
            <Text style={styles.secureText}>
              Your number is secure and will not be shared
            </Text>
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.cream,
  },
  header: {
    backgroundColor: Colors.primary[600],
    height: 180,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
  },
  tractorIcon: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.4)',
  },
  tractorBody: {
    width: 60,
    height: 40,
    position: 'relative',
  },
  tractorCabin: {
    position: 'absolute',
    width: 24, height: 28,
    backgroundColor: Colors.white,
    borderRadius: 4,
    top: 0, left: 24,
    opacity: 0.9,
  },
  tractorHood: {
    position: 'absolute',
    width: 30, height: 18,
    backgroundColor: 'rgba(255,255,255,0.7)',
    borderRadius: 4,
    top: 8, left: 0,
  },
  wheelL: {
    position: 'absolute',
    width: 22, height: 22,
    borderRadius: 11,
    borderWidth: 3, borderColor: Colors.white,
    bottom: -6, left: 2,
  },
  wheelS: {
    position: 'absolute',
    width: 16, height: 16,
    borderRadius: 8,
    borderWidth: 3, borderColor: Colors.white,
    bottom: -2, right: 8,
  },
  content: {
    flex: 1,
    paddingHorizontal: Spacing.xl,
    paddingTop: Spacing.xxl,
    gap: Spacing.lg,
  },
  title: {
    fontSize: FontSize.xxl,
    fontWeight: FontWeight.bold,
    color: Colors.neutral[900],
    textAlign: 'center',
  },
  subtitle: {
    fontSize: FontSize.md,
    color: Colors.neutral[500],
    textAlign: 'center',
    lineHeight: 24,
    marginTop: -Spacing.sm,
  },
  phone: {
    fontWeight: FontWeight.bold,
    color: Colors.primary[600],
  },
  otpRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 12,
    marginTop: Spacing.sm,
  },
  otpBox: {
    width: 48,
    height: 56,
    borderRadius: BorderRadius.md,
    borderWidth: 1.5,
    borderColor: Colors.neutral[200],
    backgroundColor: Colors.white,
    fontSize: FontSize.xxl,
    fontWeight: FontWeight.bold,
    color: Colors.neutral[900],
    ...Shadow.sm,
  },
  otpBoxFilled: {
    borderColor: Colors.primary[500],
    backgroundColor: Colors.primary[50],
  },
  otpBoxActive: {
    borderColor: Colors.primary[400],
    borderWidth: 2,
  },
  timerRow: {
    alignItems: 'center',
  },
  timerText: {
    fontSize: FontSize.sm,
    color: Colors.neutral[500],
  },
  timerCount: {
    fontWeight: FontWeight.bold,
    color: Colors.primary[600],
  },
  resendActive: {
    fontSize: FontSize.sm,
    fontWeight: FontWeight.semibold,
    color: Colors.primary[600],
    textDecorationLine: 'underline',
  },
  verifyBtn: {
    borderRadius: BorderRadius.lg,
    overflow: 'hidden',
    ...Shadow.green,
  },
  verifyBtnDisabled: {
    shadowOpacity: 0,
    elevation: 0,
  },
  verifyGradient: {
    paddingVertical: 16,
    alignItems: 'center',
  },
  verifyText: {
    fontSize: FontSize.lg,
    fontWeight: FontWeight.bold,
    color: Colors.white,
  },
  verifyTextDisabled: {
    color: Colors.neutral[500],
  },
  changeNumber: {
    alignItems: 'center',
  },
  changeNumberText: {
    fontSize: FontSize.sm,
    color: Colors.primary[600],
    fontWeight: FontWeight.medium,
    textDecorationLine: 'underline',
  },
  secureNote: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.neutral[50],
    borderRadius: BorderRadius.md,
    padding: Spacing.md,
    gap: Spacing.sm,
  },
  lockIcon: {},
  lockEmoji: { fontSize: 18 },
  secureText: {
    flex: 1,
    fontSize: FontSize.xs,
    color: Colors.neutral[500],
    lineHeight: 18,
  },
});
