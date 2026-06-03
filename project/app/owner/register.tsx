import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform,
} from 'react-native';
import { useRouter } from 'expo-router';
import { ArrowLeft, Camera, MapPin, CircleCheck, ChevronDown } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors, FontSize, FontWeight, Spacing, BorderRadius, Shadow } from '@/constants/theme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const serviceTypes = ['Tractor', 'Harvester', 'Sprayer', 'JCB', 'Borewell', 'Transport', 'Labour', 'Irrigation'];
const states = ['Andhra Pradesh', 'Telangana', 'Karnataka', 'Tamil Nadu', 'Maharashtra', 'Gujarat', 'Punjab', 'Haryana'];

export default function OwnerRegisterScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [village, setVillage] = useState('');
  const [district, setDistrict] = useState('');
  const [selectedState, setSelectedState] = useState('Andhra Pradesh');
  const [showStateDD, setShowStateDD] = useState(false);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [experience, setExperience] = useState('');
  const [step, setStep] = useState(1);

  const toggleService = (s: string) => {
    setSelectedServices(prev => prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s]);
  };

  if (step === 2) {
    return (
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <View style={[styles.container, { paddingTop: insets.top }]}>
          <View style={styles.header}>
            <TouchableOpacity style={styles.backBtn} onPress={() => setStep(1)}>
              <ArrowLeft size={22} color={Colors.neutral[800]} />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Documents & Verification</Text>
            <View style={{ width: 36 }} />
          </View>

          <View style={styles.progressBar}>
            <View style={[styles.progressStep, styles.progressStepDone]}><Text style={styles.progressStepText}>1</Text></View>
            <View style={styles.progressLine} />
            <View style={[styles.progressStep, styles.progressStepActive]}><Text style={styles.progressStepText}>2</Text></View>
            <View style={[styles.progressLine, styles.progressLineInactive]} />
            <View style={[styles.progressStep, styles.progressStepInactive]}><Text style={[styles.progressStepText, styles.progressStepTextInactive]}>3</Text></View>
          </View>

          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
            <View style={styles.formCard}>
              <Text style={styles.sectionTitle}>Identity Documents</Text>
              {[
                { label: 'Aadhaar Card', required: true },
                { label: 'PAN Card', required: false },
                { label: 'Driving License', required: true },
                { label: 'Vehicle RC Book', required: true },
              ].map(doc => (
                <View key={doc.label} style={styles.docRow}>
                  <View style={styles.docInfo}>
                    <Text style={styles.docLabel}>{doc.label} {doc.required && <Text style={styles.required}>*</Text>}</Text>
                    <Text style={styles.docHint}>Upload front & back</Text>
                  </View>
                  <TouchableOpacity style={styles.uploadBtn}>
                    <Camera size={16} color={Colors.primary[600]} />
                    <Text style={styles.uploadText}>Upload</Text>
                  </TouchableOpacity>
                </View>
              ))}
            </View>

            <View style={styles.formCard}>
              <Text style={styles.sectionTitle}>Bank Details</Text>
              <View style={styles.fieldWrap}>
                <Text style={styles.fieldLabel}>Account Holder Name *</Text>
                <TextInput style={styles.input} placeholder="As per bank records" placeholderTextColor={Colors.neutral[400]} />
              </View>
              <View style={styles.fieldWrap}>
                <Text style={styles.fieldLabel}>Account Number *</Text>
                <TextInput style={styles.input} placeholder="XXXX XXXX XXXX" keyboardType="numeric" placeholderTextColor={Colors.neutral[400]} />
              </View>
              <View style={styles.fieldWrap}>
                <Text style={styles.fieldLabel}>IFSC Code *</Text>
                <TextInput style={styles.input} placeholder="SBIN0001234" autoCapitalize="characters" placeholderTextColor={Colors.neutral[400]} />
              </View>
            </View>

            <TouchableOpacity
              style={styles.primaryBtn}
              onPress={() => setStep(3)}
            >
              <Text style={styles.primaryBtnText}>Continue to Review</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    );
  }

  if (step === 3) {
    return (
      <View style={[styles.container, { paddingTop: insets.top }]}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.backBtn} onPress={() => setStep(2)}>
            <ArrowLeft size={22} color={Colors.neutral[800]} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Registration Review</Text>
          <View style={{ width: 36 }} />
        </View>

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
          <View style={styles.successCard}>
            <CircleCheck size={56} color={Colors.success[500]} />
            <Text style={styles.successTitle}>Application Submitted!</Text>
            <Text style={styles.successText}>
              Your provider registration is under review. Our team will verify your documents within 24-48 hours.
            </Text>
          </View>

          <View style={styles.formCard}>
            <Text style={styles.sectionTitle}>What's Next?</Text>
            {['Document verification (24-48 hrs)', 'Background check', 'Training & onboarding call', 'Account activation & first listing'].map((step, i) => (
              <View key={i} style={styles.nextStep}>
                <View style={styles.nextStepNum}><Text style={styles.nextStepNumText}>{i + 1}</Text></View>
                <Text style={styles.nextStepText}>{step}</Text>
              </View>
            ))}
          </View>

          <TouchableOpacity style={styles.primaryBtn} onPress={() => router.replace('/(tabs)/home')}>
            <Text style={styles.primaryBtnText}>Go to Home</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <View style={[styles.container, { paddingTop: insets.top }]}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
            <ArrowLeft size={22} color={Colors.neutral[800]} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Register as Provider</Text>
          <View style={{ width: 36 }} />
        </View>

        <View style={styles.progressBar}>
          <View style={[styles.progressStep, styles.progressStepActive]}><Text style={styles.progressStepText}>1</Text></View>
          <View style={[styles.progressLine, styles.progressLineInactive]} />
          <View style={[styles.progressStep, styles.progressStepInactive]}><Text style={[styles.progressStepText, styles.progressStepTextInactive]}>2</Text></View>
          <View style={[styles.progressLine, styles.progressLineInactive]} />
          <View style={[styles.progressStep, styles.progressStepInactive]}><Text style={[styles.progressStepText, styles.progressStepTextInactive]}>3</Text></View>
        </View>

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
          <LinearGradient colors={[Colors.primary[700], Colors.primary[500]]} style={styles.heroBanner}>
            <Text style={styles.heroEmoji}>🚜</Text>
            <Text style={styles.heroTitle}>Earn with AgriRide</Text>
            <Text style={styles.heroSubtitle}>Join 10,000+ service providers and earn ₹50,000+/month</Text>
          </LinearGradient>

          <View style={styles.formCard}>
            <Text style={styles.sectionTitle}>Personal Information</Text>

            <View style={styles.avatarSection}>
              <View style={styles.avatarPlaceholder}>
                <Camera size={28} color={Colors.neutral[400]} />
              </View>
              <TouchableOpacity style={styles.avatarBtn}>
                <Text style={styles.avatarBtnText}>Add Photo</Text>
              </TouchableOpacity>
            </View>

            {[
              { label: 'Full Name *', value: name, onChange: setName, placeholder: 'Enter your full name' },
              { label: 'Mobile Number *', value: phone, onChange: setPhone, placeholder: '+91 XXXXX XXXXX', keyboardType: 'phone-pad' },
              { label: 'Village / Town *', value: village, onChange: setVillage, placeholder: 'Your village or town' },
              { label: 'District *', value: district, onChange: setDistrict, placeholder: 'Your district' },
            ].map(field => (
              <View key={field.label} style={styles.fieldWrap}>
                <Text style={styles.fieldLabel}>{field.label}</Text>
                <TextInput
                  style={styles.input}
                  value={field.value}
                  onChangeText={field.onChange}
                  placeholder={field.placeholder}
                  placeholderTextColor={Colors.neutral[400]}
                  keyboardType={(field as any).keyboardType || 'default'}
                />
              </View>
            ))}

            <View style={styles.fieldWrap}>
              <Text style={styles.fieldLabel}>State *</Text>
              <TouchableOpacity style={styles.dropdown} onPress={() => setShowStateDD(!showStateDD)}>
                <Text style={styles.dropdownText}>{selectedState}</Text>
                <ChevronDown size={18} color={Colors.neutral[500]} />
              </TouchableOpacity>
              {showStateDD && (
                <View style={styles.dropdownList}>
                  {states.map(s => (
                    <TouchableOpacity key={s} style={styles.dropdownItem} onPress={() => { setSelectedState(s); setShowStateDD(false); }}>
                      <Text style={[styles.dropdownItemText, selectedState === s && styles.dropdownItemTextActive]}>{s}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}
            </View>

            <View style={styles.fieldWrap}>
              <Text style={styles.fieldLabel}>Years of Experience *</Text>
              <TextInput
                style={styles.input}
                value={experience}
                onChangeText={setExperience}
                placeholder="e.g., 5 years"
                keyboardType="numeric"
                placeholderTextColor={Colors.neutral[400]}
              />
            </View>
          </View>

          <View style={styles.formCard}>
            <Text style={styles.sectionTitle}>Services You Offer</Text>
            <Text style={styles.fieldHint}>Select all that apply</Text>
            <View style={styles.serviceGrid}>
              {serviceTypes.map(svc => (
                <TouchableOpacity
                  key={svc}
                  style={[styles.serviceChip, selectedServices.includes(svc) && styles.serviceChipActive]}
                  onPress={() => toggleService(svc)}
                >
                  <Text style={[styles.serviceChipText, selectedServices.includes(svc) && styles.serviceChipTextActive]}>
                    {svc}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <TouchableOpacity
            style={[styles.primaryBtn, (!name || !phone || selectedServices.length === 0) && styles.primaryBtnDisabled]}
            onPress={() => setStep(2)}
            disabled={!name || !phone || selectedServices.length === 0}
          >
            <Text style={styles.primaryBtnText}>Continue to Documents</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.neutral[50] },
  header: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: Spacing.md, paddingVertical: Spacing.md,
    backgroundColor: Colors.white, borderBottomWidth: 1, borderBottomColor: Colors.neutral[100],
  },
  backBtn: { width: 36, height: 36, borderRadius: 18, backgroundColor: Colors.neutral[100], alignItems: 'center', justifyContent: 'center' },
  headerTitle: { fontSize: FontSize.lg, fontWeight: FontWeight.bold, color: Colors.neutral[900] },
  progressBar: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    paddingHorizontal: Spacing.xl, paddingVertical: Spacing.md,
    backgroundColor: Colors.white, gap: 0, borderBottomWidth: 1, borderBottomColor: Colors.neutral[100],
  },
  progressStep: {
    width: 32, height: 32, borderRadius: 16, alignItems: 'center', justifyContent: 'center',
    backgroundColor: Colors.primary[600],
  },
  progressStepActive: { backgroundColor: Colors.primary[600] },
  progressStepDone: { backgroundColor: Colors.success[500] },
  progressStepInactive: { backgroundColor: Colors.neutral[200] },
  progressStepText: { fontSize: FontSize.sm, fontWeight: FontWeight.bold, color: Colors.white },
  progressStepTextInactive: { color: Colors.neutral[500] },
  progressLine: { flex: 1, height: 2, backgroundColor: Colors.primary[300] },
  progressLineInactive: { backgroundColor: Colors.neutral[200] },
  scrollContent: { padding: Spacing.md, gap: Spacing.md, paddingBottom: 40 },
  heroBanner: { borderRadius: BorderRadius.xl, padding: Spacing.lg, alignItems: 'center', gap: 8 },
  heroEmoji: { fontSize: 40 },
  heroTitle: { fontSize: FontSize.xl, fontWeight: FontWeight.bold, color: Colors.white },
  heroSubtitle: { fontSize: FontSize.sm, color: 'rgba(255,255,255,0.85)', textAlign: 'center' },
  formCard: { backgroundColor: Colors.white, borderRadius: BorderRadius.xl, padding: Spacing.md, gap: Spacing.md, ...Shadow.sm },
  sectionTitle: { fontSize: FontSize.lg, fontWeight: FontWeight.bold, color: Colors.neutral[900] },
  avatarSection: { alignItems: 'center', gap: Spacing.sm },
  avatarPlaceholder: {
    width: 80, height: 80, borderRadius: 40, backgroundColor: Colors.neutral[100],
    borderWidth: 2, borderColor: Colors.neutral[200], borderStyle: 'dashed',
    alignItems: 'center', justifyContent: 'center',
  },
  avatarBtn: { paddingVertical: 6, paddingHorizontal: 16, backgroundColor: Colors.primary[50], borderRadius: BorderRadius.full, borderWidth: 1, borderColor: Colors.primary[200] },
  avatarBtnText: { fontSize: FontSize.xs, fontWeight: FontWeight.semibold, color: Colors.primary[600] },
  fieldWrap: { gap: 6 },
  fieldLabel: { fontSize: FontSize.sm, fontWeight: FontWeight.semibold, color: Colors.neutral[700] },
  fieldHint: { fontSize: FontSize.xs, color: Colors.neutral[500], marginTop: -8 },
  input: {
    borderWidth: 1, borderColor: Colors.neutral[200], borderRadius: BorderRadius.md,
    padding: Spacing.md, fontSize: FontSize.sm, color: Colors.neutral[900], backgroundColor: Colors.neutral[50],
  },
  dropdown: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    borderWidth: 1, borderColor: Colors.neutral[200], borderRadius: BorderRadius.md,
    padding: Spacing.md, backgroundColor: Colors.neutral[50],
  },
  dropdownText: { fontSize: FontSize.sm, color: Colors.neutral[900] },
  dropdownList: {
    borderWidth: 1, borderColor: Colors.neutral[200], borderRadius: BorderRadius.md,
    backgroundColor: Colors.white, overflow: 'hidden', maxHeight: 200, ...Shadow.sm,
  },
  dropdownItem: { padding: Spacing.md, borderBottomWidth: 1, borderBottomColor: Colors.neutral[100] },
  dropdownItemText: { fontSize: FontSize.sm, color: Colors.neutral[800] },
  dropdownItemTextActive: { color: Colors.primary[700], fontWeight: FontWeight.semibold },
  serviceGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  serviceChip: {
    paddingVertical: 8, paddingHorizontal: 14, borderRadius: BorderRadius.full,
    borderWidth: 1.5, borderColor: Colors.neutral[200], backgroundColor: Colors.neutral[100],
  },
  serviceChipActive: { backgroundColor: Colors.primary[600], borderColor: Colors.primary[600] },
  serviceChipText: { fontSize: FontSize.xs, fontWeight: FontWeight.semibold, color: Colors.neutral[700] },
  serviceChipTextActive: { color: Colors.white },
  primaryBtn: {
    backgroundColor: Colors.primary[600], borderRadius: BorderRadius.lg, paddingVertical: 14, alignItems: 'center',
  },
  primaryBtnDisabled: { backgroundColor: Colors.neutral[300] },
  primaryBtnText: { fontSize: FontSize.md, fontWeight: FontWeight.bold, color: Colors.white },
  docRow: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: Colors.neutral[100],
  },
  docInfo: { flex: 1 },
  docLabel: { fontSize: FontSize.sm, fontWeight: FontWeight.medium, color: Colors.neutral[800] },
  docHint: { fontSize: FontSize.xs, color: Colors.neutral[400] },
  required: { color: Colors.error[500] },
  uploadBtn: {
    flexDirection: 'row', alignItems: 'center', gap: 6,
    paddingVertical: 7, paddingHorizontal: 14, borderRadius: BorderRadius.md,
    backgroundColor: Colors.primary[50], borderWidth: 1, borderColor: Colors.primary[200],
  },
  uploadText: { fontSize: FontSize.xs, fontWeight: FontWeight.semibold, color: Colors.primary[600] },
  successCard: {
    backgroundColor: Colors.white, borderRadius: BorderRadius.xl, padding: Spacing.xl,
    alignItems: 'center', gap: 12, ...Shadow.sm,
  },
  successTitle: { fontSize: FontSize.xxl, fontWeight: FontWeight.bold, color: Colors.success[700] },
  successText: { fontSize: FontSize.sm, color: Colors.neutral[600], textAlign: 'center', lineHeight: 22 },
  nextStep: { flexDirection: 'row', alignItems: 'center', gap: Spacing.sm },
  nextStepNum: { width: 24, height: 24, borderRadius: 12, backgroundColor: Colors.primary[600], alignItems: 'center', justifyContent: 'center' },
  nextStepNumText: { fontSize: FontSize.xs, fontWeight: FontWeight.bold, color: Colors.white },
  nextStepText: { fontSize: FontSize.sm, color: Colors.neutral[700] },
});
