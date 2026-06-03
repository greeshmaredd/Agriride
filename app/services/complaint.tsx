import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput,
} from 'react-native';
import { useRouter } from 'expo-router';
import { ArrowLeft, Camera, AlertTriangle, Phone, ChevronDown, CircleCheck } from 'lucide-react-native';
import { Colors, FontSize, FontWeight, Spacing, BorderRadius, Shadow } from '@/constants/theme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const issueCategories = [
  'Service not as described',
  'Provider did not arrive',
  'Poor work quality',
  'Overcharged / Billing issue',
  'Rude or unprofessional behavior',
  'Vehicle damage / Accident',
  'Payment not refunded',
  'Other',
];

export default function ComplaintScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [selectedCategory, setSelectedCategory] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [bookingId, setBookingId] = useState('#AR-2026-4521');
  const [description, setDescription] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (!selectedCategory || !description) return;
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <View style={[styles.container, { paddingTop: insets.top }]}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
            <ArrowLeft size={22} color={Colors.neutral[800]} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Complaint Submitted</Text>
          <View style={{ width: 36 }} />
        </View>
        <View style={styles.successContainer}>
          <View style={styles.successIcon}>
            <CircleCheck size={64} color={Colors.success[500]} />
          </View>
          <Text style={styles.successTitle}>Complaint Registered!</Text>
          <Text style={styles.successSubtitle}>Reference ID: CMP-2026-1084</Text>
          <Text style={styles.successText}>
            Our support team will review your complaint within 24 hours. You will receive updates via SMS and in-app notifications.
          </Text>
          <View style={styles.trackingCard}>
            <Text style={styles.trackingLabel}>Estimated Resolution Time</Text>
            <Text style={styles.trackingValue}>24-48 hours</Text>
          </View>
          <TouchableOpacity style={styles.homeBtn} onPress={() => router.replace('/(tabs)/home')}>
            <Text style={styles.homeBtnText}>Go to Home</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <ArrowLeft size={22} color={Colors.neutral[800]} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Raise a Complaint</Text>
        <View style={{ width: 36 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <View style={styles.emergencyCard}>
          <AlertTriangle size={18} color={Colors.error[600]} />
          <View style={{ flex: 1 }}>
            <Text style={styles.emergencyTitle}>Emergency / Accident?</Text>
            <Text style={styles.emergencyText}>Call helpline immediately for urgent issues</Text>
          </View>
          <TouchableOpacity style={styles.emergencyCallBtn}>
            <Phone size={14} color={Colors.white} />
            <Text style={styles.emergencyCallText}>1800-XXX</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.formCard}>
          <Text style={styles.sectionTitle}>Complaint Details</Text>

          <View style={styles.fieldWrap}>
            <Text style={styles.fieldLabel}>Booking ID</Text>
            <TextInput
              style={styles.input}
              value={bookingId}
              onChangeText={setBookingId}
              placeholder="#AR-XXXX-XXXX"
              placeholderTextColor={Colors.neutral[400]}
            />
          </View>

          <View style={styles.fieldWrap}>
            <Text style={styles.fieldLabel}>Issue Category *</Text>
            <TouchableOpacity
              style={[styles.dropdown, showDropdown && styles.dropdownOpen]}
              onPress={() => setShowDropdown(!showDropdown)}
            >
              <Text style={[styles.dropdownText, !selectedCategory && styles.dropdownPlaceholder]}>
                {selectedCategory || 'Select issue type...'}
              </Text>
              <ChevronDown size={18} color={Colors.neutral[500]} style={{ transform: [{ rotate: showDropdown ? '180deg' : '0deg' }] }} />
            </TouchableOpacity>
            {showDropdown && (
              <View style={styles.dropdownList}>
                {issueCategories.map(cat => (
                  <TouchableOpacity
                    key={cat}
                    style={[styles.dropdownItem, selectedCategory === cat && styles.dropdownItemActive]}
                    onPress={() => { setSelectedCategory(cat); setShowDropdown(false); }}
                  >
                    <Text style={[styles.dropdownItemText, selectedCategory === cat && styles.dropdownItemTextActive]}>
                      {cat}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>

          <View style={styles.fieldWrap}>
            <Text style={styles.fieldLabel}>Describe Your Issue *</Text>
            <TextInput
              style={styles.textArea}
              placeholder="Please describe what happened in detail. Include date, time, and any relevant information..."
              placeholderTextColor={Colors.neutral[400]}
              value={description}
              onChangeText={setDescription}
              multiline
              numberOfLines={5}
              textAlignVertical="top"
            />
            <Text style={styles.charCount}>{description.length}/500</Text>
          </View>

          <View style={styles.fieldWrap}>
            <Text style={styles.fieldLabel}>Attach Photos (Optional)</Text>
            <View style={styles.photoGrid}>
              {[1, 2, 3].map(i => (
                <TouchableOpacity key={i} style={styles.photoSlot}>
                  <Camera size={22} color={Colors.neutral[400]} />
                  <Text style={styles.photoSlotText}>Add Photo</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>

        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>What happens next?</Text>
          {['Your complaint is registered with a unique ID', 'Support team reviews within 24 hours', 'You receive updates via SMS & notifications', 'Resolution within 3-5 business days'].map((step, i) => (
            <View key={i} style={styles.infoStep}>
              <View style={styles.infoStepNum}>
                <Text style={styles.infoStepNumText}>{i + 1}</Text>
              </View>
              <Text style={styles.infoStepText}>{step}</Text>
            </View>
          ))}
        </View>

        <TouchableOpacity
          style={[styles.submitBtn, (!selectedCategory || !description) && styles.submitBtnDisabled]}
          onPress={handleSubmit}
          disabled={!selectedCategory || !description}
        >
          <Text style={styles.submitBtnText}>Submit Complaint</Text>
        </TouchableOpacity>
      </ScrollView>
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
  backBtn: { width: 36, height: 36, borderRadius: 18, backgroundColor: Colors.neutral[100], alignItems: 'center', justifyContent: 'center' },
  headerTitle: { fontSize: FontSize.lg, fontWeight: FontWeight.bold, color: Colors.neutral[900] },
  scrollContent: { padding: Spacing.md, gap: Spacing.md, paddingBottom: 40 },
  emergencyCard: {
    flexDirection: 'row', alignItems: 'center', gap: Spacing.sm,
    backgroundColor: Colors.error[50], borderRadius: BorderRadius.lg, padding: Spacing.md,
    borderWidth: 1, borderColor: Colors.error[200],
  },
  emergencyTitle: { fontSize: FontSize.sm, fontWeight: FontWeight.bold, color: Colors.error[800] },
  emergencyText: { fontSize: FontSize.xs, color: Colors.error[600] },
  emergencyCallBtn: {
    flexDirection: 'row', alignItems: 'center', gap: 4,
    backgroundColor: Colors.error[600], borderRadius: BorderRadius.md,
    paddingHorizontal: 10, paddingVertical: 6,
  },
  emergencyCallText: { fontSize: FontSize.xs, fontWeight: FontWeight.bold, color: Colors.white },
  formCard: { backgroundColor: Colors.white, borderRadius: BorderRadius.xl, padding: Spacing.md, gap: Spacing.md, ...Shadow.sm },
  sectionTitle: { fontSize: FontSize.lg, fontWeight: FontWeight.bold, color: Colors.neutral[900] },
  fieldWrap: { gap: 6 },
  fieldLabel: { fontSize: FontSize.sm, fontWeight: FontWeight.semibold, color: Colors.neutral[700] },
  input: {
    borderWidth: 1, borderColor: Colors.neutral[200], borderRadius: BorderRadius.md,
    padding: Spacing.md, fontSize: FontSize.sm, color: Colors.neutral[900],
    backgroundColor: Colors.neutral[50],
  },
  dropdown: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    borderWidth: 1, borderColor: Colors.neutral[200], borderRadius: BorderRadius.md,
    padding: Spacing.md, backgroundColor: Colors.neutral[50],
  },
  dropdownOpen: { borderColor: Colors.primary[500] },
  dropdownText: { fontSize: FontSize.sm, color: Colors.neutral[900] },
  dropdownPlaceholder: { color: Colors.neutral[400] },
  dropdownList: {
    borderWidth: 1, borderColor: Colors.neutral[200], borderRadius: BorderRadius.md,
    backgroundColor: Colors.white, overflow: 'hidden', ...Shadow.sm,
  },
  dropdownItem: { padding: Spacing.md, borderBottomWidth: 1, borderBottomColor: Colors.neutral[100] },
  dropdownItemActive: { backgroundColor: Colors.primary[50] },
  dropdownItemText: { fontSize: FontSize.sm, color: Colors.neutral[800] },
  dropdownItemTextActive: { color: Colors.primary[700], fontWeight: FontWeight.semibold },
  textArea: {
    borderWidth: 1, borderColor: Colors.neutral[200], borderRadius: BorderRadius.md,
    padding: Spacing.md, fontSize: FontSize.sm, color: Colors.neutral[900],
    backgroundColor: Colors.neutral[50], minHeight: 120,
  },
  charCount: { fontSize: FontSize.xs, color: Colors.neutral[400], textAlign: 'right' },
  photoGrid: { flexDirection: 'row', gap: Spacing.sm },
  photoSlot: {
    flex: 1, aspectRatio: 1, borderRadius: BorderRadius.md,
    borderWidth: 1.5, borderColor: Colors.neutral[200], borderStyle: 'dashed',
    alignItems: 'center', justifyContent: 'center', gap: 6, backgroundColor: Colors.neutral[50],
  },
  photoSlotText: { fontSize: FontSize.xs, color: Colors.neutral[400] },
  infoCard: { backgroundColor: Colors.primary[50], borderRadius: BorderRadius.xl, padding: Spacing.md, gap: Spacing.sm, borderWidth: 1, borderColor: Colors.primary[100] },
  infoTitle: { fontSize: FontSize.md, fontWeight: FontWeight.bold, color: Colors.primary[800], marginBottom: 2 },
  infoStep: { flexDirection: 'row', alignItems: 'flex-start', gap: Spacing.sm },
  infoStepNum: { width: 22, height: 22, borderRadius: 11, backgroundColor: Colors.primary[600], alignItems: 'center', justifyContent: 'center' },
  infoStepNumText: { fontSize: 11, fontWeight: FontWeight.bold, color: Colors.white },
  infoStepText: { flex: 1, fontSize: FontSize.sm, color: Colors.primary[800], lineHeight: 20 },
  submitBtn: {
    backgroundColor: Colors.error[600], borderRadius: BorderRadius.lg, paddingVertical: 14,
    alignItems: 'center',
  },
  submitBtnDisabled: { backgroundColor: Colors.neutral[300] },
  submitBtnText: { fontSize: FontSize.md, fontWeight: FontWeight.bold, color: Colors.white },
  successContainer: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: Spacing.xl, gap: Spacing.md },
  successIcon: { marginBottom: 8 },
  successTitle: { fontSize: FontSize.xxl, fontWeight: FontWeight.bold, color: Colors.success[700] },
  successSubtitle: { fontSize: FontSize.md, color: Colors.neutral[500], fontWeight: FontWeight.medium },
  successText: { fontSize: FontSize.sm, color: Colors.neutral[600], textAlign: 'center', lineHeight: 22 },
  trackingCard: {
    backgroundColor: Colors.neutral[100], borderRadius: BorderRadius.lg, padding: Spacing.md,
    alignItems: 'center', gap: 4, width: '100%',
  },
  trackingLabel: { fontSize: FontSize.sm, color: Colors.neutral[500] },
  trackingValue: { fontSize: FontSize.lg, fontWeight: FontWeight.bold, color: Colors.neutral[800] },
  homeBtn: {
    backgroundColor: Colors.primary[600], borderRadius: BorderRadius.lg, paddingVertical: 14,
    paddingHorizontal: 40, marginTop: 8,
  },
  homeBtnText: { fontSize: FontSize.md, fontWeight: FontWeight.bold, color: Colors.white },
});
