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
import { ChevronDown } from 'lucide-react-native';
import { Colors, FontSize, FontWeight, Spacing, BorderRadius, Shadow } from '@/constants/theme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const STATES = ['Andhra Pradesh', 'Bihar', 'Gujarat', 'Haryana', 'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Punjab', 'Rajasthan', 'Tamil Nadu', 'Telangana', 'Uttar Pradesh', 'West Bengal'];
const USER_TYPES = [
  { id: 'farmer', label: 'Farmer', icon: '👨‍🌾', desc: 'I need agricultural services' },
  { id: 'owner', label: 'Service Owner', icon: '🚜', desc: 'I provide agricultural services' },
];

function FieldInput({ label, value, onChangeText, placeholder, keyboardType, required }: any) {
  return (
    <View style={styles.fieldWrap}>
      <Text style={styles.fieldLabel}>{label}{required && <Text style={styles.required}> *</Text>}</Text>
      <TextInput
        style={styles.fieldInput}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={Colors.neutral[400]}
        keyboardType={keyboardType || 'default'}
      />
    </View>
  );
}

export default function RegisterScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [village, setVillage] = useState('');
  const [district, setDistrict] = useState('');
  const [state, setState] = useState('');
  const [userType, setUserType] = useState('farmer');
  const [stateOpen, setStateOpen] = useState(false);

  const handleRegister = () => {
    router.replace('/auth/profile-setup');
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScrollView
        style={[styles.container, { paddingTop: insets.top }]}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <LinearGradient
          colors={[Colors.primary[700], Colors.primary[500]]}
          style={styles.topHeader}
        >
          <Text style={styles.headerTitle}>Create Account</Text>
          <Text style={styles.headerSub}>Join 2 lakh+ farmers on AgriRide</Text>
        </LinearGradient>

        <View style={styles.form}>
          <FieldInput label="Full Name" value={name} onChangeText={setName} placeholder="Enter your full name" required />
          <FieldInput label="Mobile Number" value={mobile} onChangeText={(t: string) => setMobile(t.replace(/\D/g, ''))} placeholder="+91 XXXXXXXXXX" keyboardType="phone-pad" required />
          <FieldInput label="Village / Town" value={village} onChangeText={setVillage} placeholder="Enter your village name" required />
          <FieldInput label="District" value={district} onChangeText={setDistrict} placeholder="Enter your district" required />

          <View style={styles.fieldWrap}>
            <Text style={styles.fieldLabel}>State<Text style={styles.required}> *</Text></Text>
            <TouchableOpacity
              style={styles.selectBtn}
              onPress={() => setStateOpen(!stateOpen)}
            >
              <Text style={state ? styles.selectValue : styles.selectPlaceholder}>
                {state || 'Select State'}
              </Text>
              <ChevronDown size={18} color={Colors.neutral[400]} />
            </TouchableOpacity>
            {stateOpen && (
              <View style={styles.dropdown}>
                <ScrollView style={{ maxHeight: 200 }} nestedScrollEnabled>
                  {STATES.map(s => (
                    <TouchableOpacity
                      key={s}
                      style={[styles.dropdownItem, state === s && styles.dropdownItemActive]}
                      onPress={() => { setState(s); setStateOpen(false); }}
                    >
                      <Text style={[styles.dropdownText, state === s && styles.dropdownTextActive]}>{s}</Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>
            )}
          </View>

          <View style={styles.fieldWrap}>
            <Text style={styles.fieldLabel}>I am a<Text style={styles.required}> *</Text></Text>
            <View style={styles.typeRow}>
              {USER_TYPES.map(t => (
                <TouchableOpacity
                  key={t.id}
                  style={[styles.typeCard, userType === t.id && styles.typeCardActive]}
                  onPress={() => setUserType(t.id)}
                  activeOpacity={0.8}
                >
                  <Text style={styles.typeIcon}>{t.icon}</Text>
                  <Text style={[styles.typeLabel, userType === t.id && styles.typeLabelActive]}>{t.label}</Text>
                  <Text style={styles.typeDesc}>{t.desc}</Text>
                  {userType === t.id && <View style={styles.typeCheck}><Text style={{ color: Colors.white, fontSize: 10 }}>✓</Text></View>}
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <TouchableOpacity style={styles.registerBtn} onPress={handleRegister} activeOpacity={0.85}>
            <LinearGradient
              colors={[Colors.primary[500], Colors.primary[700]]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.registerGradient}
            >
              <Text style={styles.registerText}>Register & Continue</Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => router.back()} style={styles.loginLink}>
            <Text style={styles.loginLinkText}>Already have an account? <Text style={styles.loginLinkBold}>Login</Text></Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.cream },
  topHeader: {
    padding: Spacing.xl,
    paddingBottom: Spacing.xxl,
  },
  headerTitle: {
    fontSize: FontSize.xxl,
    fontWeight: FontWeight.bold,
    color: Colors.white,
    marginBottom: 4,
  },
  headerSub: {
    fontSize: FontSize.sm,
    color: 'rgba(255,255,255,0.85)',
    fontWeight: FontWeight.medium,
  },
  form: {
    marginTop: -20,
    backgroundColor: Colors.cream,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    padding: Spacing.xl,
    gap: Spacing.md,
    paddingBottom: 40,
  },
  fieldWrap: { gap: 6 },
  fieldLabel: {
    fontSize: FontSize.sm,
    fontWeight: FontWeight.semibold,
    color: Colors.neutral[700],
  },
  required: { color: Colors.error[600] },
  fieldInput: {
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.md,
    borderWidth: 1.5,
    borderColor: Colors.neutral[200],
    paddingHorizontal: Spacing.md,
    paddingVertical: 13,
    fontSize: FontSize.md,
    color: Colors.neutral[900],
    ...Shadow.sm,
  },
  selectBtn: {
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.md,
    borderWidth: 1.5,
    borderColor: Colors.neutral[200],
    paddingHorizontal: Spacing.md,
    paddingVertical: 13,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    ...Shadow.sm,
  },
  selectValue: {
    fontSize: FontSize.md,
    color: Colors.neutral[900],
  },
  selectPlaceholder: {
    fontSize: FontSize.md,
    color: Colors.neutral[400],
  },
  dropdown: {
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    borderColor: Colors.neutral[200],
    ...Shadow.md,
    marginTop: -4,
    zIndex: 100,
  },
  dropdownItem: {
    paddingVertical: 12,
    paddingHorizontal: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.neutral[100],
  },
  dropdownItemActive: { backgroundColor: Colors.primary[50] },
  dropdownText: {
    fontSize: FontSize.md,
    color: Colors.neutral[800],
  },
  dropdownTextActive: {
    color: Colors.primary[700],
    fontWeight: FontWeight.semibold,
  },
  typeRow: {
    flexDirection: 'row',
    gap: 12,
  },
  typeCard: {
    flex: 1,
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    borderWidth: 2,
    borderColor: Colors.neutral[200],
    alignItems: 'center',
    gap: 4,
    ...Shadow.sm,
    position: 'relative',
  },
  typeCardActive: {
    borderColor: Colors.primary[500],
    backgroundColor: Colors.primary[50],
  },
  typeIcon: { fontSize: 28 },
  typeLabel: {
    fontSize: FontSize.md,
    fontWeight: FontWeight.bold,
    color: Colors.neutral[800],
  },
  typeLabelActive: { color: Colors.primary[700] },
  typeDesc: {
    fontSize: 10,
    color: Colors.neutral[500],
    textAlign: 'center',
  },
  typeCheck: {
    position: 'absolute',
    top: 8, right: 8,
    width: 20, height: 20,
    borderRadius: 10,
    backgroundColor: Colors.primary[600],
    alignItems: 'center',
    justifyContent: 'center',
  },
  registerBtn: {
    borderRadius: BorderRadius.lg,
    overflow: 'hidden',
    marginTop: Spacing.sm,
    ...Shadow.green,
  },
  registerGradient: {
    paddingVertical: 16,
    alignItems: 'center',
  },
  registerText: {
    fontSize: FontSize.lg,
    fontWeight: FontWeight.bold,
    color: Colors.white,
    letterSpacing: 0.3,
  },
  loginLink: { alignItems: 'center' },
  loginLinkText: { fontSize: FontSize.sm, color: Colors.neutral[500] },
  loginLinkBold: { fontWeight: FontWeight.bold, color: Colors.primary[600] },
});
