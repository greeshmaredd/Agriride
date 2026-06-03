import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput,
} from 'react-native';
import { useRouter } from 'expo-router';
import { ArrowLeft, Camera, Plus, Minus, CircleCheck } from 'lucide-react-native';
import { Colors, FontSize, FontWeight, Spacing, BorderRadius, Shadow } from '@/constants/theme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const vehicleCategories = ['Tractor', 'Harvester', 'Sprayer', 'JCB/Excavator', 'Borewell Rig', 'Transport Truck', 'Labour Team', 'Irrigation'];
const serviceAreaChips = ['Within 5 km', 'Within 10 km', 'Within 20 km', 'Within 50 km', 'Any Distance'];

export default function VehicleUploadScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [category, setCategory] = useState('');
  const [make, setMake] = useState('');
  const [model, setModel] = useState('');
  const [year, setYear] = useState('');
  const [hourlyRate, setHourlyRate] = useState('');
  const [acreRate, setAcreRate] = useState('');
  const [serviceArea, setServiceArea] = useState('Within 10 km');
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <View style={[styles.container, { paddingTop: insets.top }]}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
            <ArrowLeft size={22} color={Colors.neutral[800]} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Vehicle Listed!</Text>
          <View style={{ width: 36 }} />
        </View>
        <View style={styles.successContainer}>
          <CircleCheck size={64} color={Colors.success[500]} />
          <Text style={styles.successTitle}>Vehicle Uploaded!</Text>
          <Text style={styles.successText}>Your vehicle listing is under review. It will be visible to farmers once approved (usually within 2 hours).</Text>
          <TouchableOpacity style={styles.addAnotherBtn} onPress={() => setSubmitted(false)}>
            <Plus size={16} color={Colors.primary[600]} />
            <Text style={styles.addAnotherText}>Add Another Vehicle</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.primaryBtn} onPress={() => router.push('/owner/booking-requests')}>
            <Text style={styles.primaryBtnText}>View Booking Requests</Text>
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
        <Text style={styles.headerTitle}>Upload Vehicle / Service</Text>
        <View style={{ width: 36 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <View style={styles.formCard}>
          <Text style={styles.sectionTitle}>Vehicle Photos</Text>
          <Text style={styles.sectionHint}>Add up to 6 photos of your vehicle</Text>
          <View style={styles.photoGrid}>
            <TouchableOpacity style={[styles.mainPhotoSlot]}>
              <Camera size={28} color={Colors.neutral[400]} />
              <Text style={styles.mainPhotoText}>Main Photo</Text>
              <Text style={styles.mainPhotoHint}>Front view</Text>
            </TouchableOpacity>
            {[1, 2, 3, 4, 5].map(i => (
              <TouchableOpacity key={i} style={styles.smallPhotoSlot}>
                <Camera size={18} color={Colors.neutral[400]} />
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.formCard}>
          <Text style={styles.sectionTitle}>Vehicle Category *</Text>
          <View style={styles.categoryGrid}>
            {vehicleCategories.map(cat => (
              <TouchableOpacity
                key={cat}
                style={[styles.categoryChip, category === cat && styles.categoryChipActive]}
                onPress={() => setCategory(cat)}
              >
                <Text style={[styles.categoryChipText, category === cat && styles.categoryChipTextActive]}>{cat}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.formCard}>
          <Text style={styles.sectionTitle}>Vehicle Details</Text>
          {[
            { label: 'Brand / Make *', value: make, onChange: setMake, placeholder: 'e.g., Mahindra, John Deere' },
            { label: 'Model *', value: model, onChange: setModel, placeholder: 'e.g., 575 DI, 5105' },
            { label: 'Year of Manufacture', value: year, onChange: setYear, placeholder: 'e.g., 2020', keyboardType: 'numeric' },
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
        </View>

        <View style={styles.formCard}>
          <Text style={styles.sectionTitle}>Pricing</Text>
          <View style={styles.pricingRow}>
            <View style={[styles.fieldWrap, { flex: 1 }]}>
              <Text style={styles.fieldLabel}>Rate per Hour</Text>
              <View style={styles.priceInput}>
                <Text style={styles.currencySymbol}>₹</Text>
                <TextInput
                  style={styles.priceInputField}
                  value={hourlyRate}
                  onChangeText={setHourlyRate}
                  placeholder="500"
                  keyboardType="numeric"
                  placeholderTextColor={Colors.neutral[400]}
                />
              </View>
            </View>
            <View style={[styles.fieldWrap, { flex: 1 }]}>
              <Text style={styles.fieldLabel}>Rate per Acre</Text>
              <View style={styles.priceInput}>
                <Text style={styles.currencySymbol}>₹</Text>
                <TextInput
                  style={styles.priceInputField}
                  value={acreRate}
                  onChangeText={setAcreRate}
                  placeholder="800"
                  keyboardType="numeric"
                  placeholderTextColor={Colors.neutral[400]}
                />
              </View>
            </View>
          </View>

          <View style={styles.fieldWrap}>
            <Text style={styles.fieldLabel}>Service Area</Text>
            <View style={styles.areaChips}>
              {serviceAreaChips.map(area => (
                <TouchableOpacity
                  key={area}
                  style={[styles.areaChip, serviceArea === area && styles.areaChipActive]}
                  onPress={() => setServiceArea(area)}
                >
                  <Text style={[styles.areaChipText, serviceArea === area && styles.areaChipTextActive]}>{area}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>

        <View style={styles.formCard}>
          <Text style={styles.sectionTitle}>Documents for Verification</Text>
          {['Vehicle RC Book', 'Insurance Certificate', 'Fitness Certificate'].map(doc => (
            <View key={doc} style={styles.docRow}>
              <View>
                <Text style={styles.docLabel}>{doc}</Text>
                <Text style={styles.docHint}>PDF or image</Text>
              </View>
              <TouchableOpacity style={styles.uploadBtn}>
                <Camera size={14} color={Colors.primary[600]} />
                <Text style={styles.uploadText}>Upload</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>

        <TouchableOpacity
          style={[styles.primaryBtn, (!category || !make || !model) && styles.primaryBtnDisabled]}
          onPress={() => setSubmitted(true)}
          disabled={!category || !make || !model}
        >
          <Text style={styles.primaryBtnText}>Submit for Review</Text>
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
  formCard: { backgroundColor: Colors.white, borderRadius: BorderRadius.xl, padding: Spacing.md, gap: Spacing.md, ...Shadow.sm },
  sectionTitle: { fontSize: FontSize.lg, fontWeight: FontWeight.bold, color: Colors.neutral[900] },
  sectionHint: { fontSize: FontSize.xs, color: Colors.neutral[500], marginTop: -8 },
  photoGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  mainPhotoSlot: {
    width: '48%', aspectRatio: 1.2, borderRadius: BorderRadius.lg,
    borderWidth: 1.5, borderColor: Colors.primary[200], borderStyle: 'dashed',
    backgroundColor: Colors.primary[50], alignItems: 'center', justifyContent: 'center', gap: 6,
  },
  mainPhotoText: { fontSize: FontSize.xs, fontWeight: FontWeight.semibold, color: Colors.primary[600] },
  mainPhotoHint: { fontSize: 10, color: Colors.primary[400] },
  smallPhotoSlot: {
    width: '14%', aspectRatio: 1, borderRadius: BorderRadius.md,
    borderWidth: 1.5, borderColor: Colors.neutral[200], borderStyle: 'dashed',
    backgroundColor: Colors.neutral[50], alignItems: 'center', justifyContent: 'center',
  },
  categoryGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  categoryChip: {
    paddingVertical: 8, paddingHorizontal: 14, borderRadius: BorderRadius.full,
    borderWidth: 1.5, borderColor: Colors.neutral[200], backgroundColor: Colors.neutral[100],
  },
  categoryChipActive: { backgroundColor: Colors.primary[600], borderColor: Colors.primary[600] },
  categoryChipText: { fontSize: FontSize.xs, fontWeight: FontWeight.semibold, color: Colors.neutral[700] },
  categoryChipTextActive: { color: Colors.white },
  fieldWrap: { gap: 6 },
  fieldLabel: { fontSize: FontSize.sm, fontWeight: FontWeight.semibold, color: Colors.neutral[700] },
  input: {
    borderWidth: 1, borderColor: Colors.neutral[200], borderRadius: BorderRadius.md,
    padding: Spacing.md, fontSize: FontSize.sm, color: Colors.neutral[900], backgroundColor: Colors.neutral[50],
  },
  pricingRow: { flexDirection: 'row', gap: Spacing.md },
  priceInput: {
    flexDirection: 'row', alignItems: 'center',
    borderWidth: 1, borderColor: Colors.neutral[200], borderRadius: BorderRadius.md,
    backgroundColor: Colors.neutral[50], overflow: 'hidden',
  },
  currencySymbol: {
    paddingHorizontal: 12, fontSize: FontSize.md, fontWeight: FontWeight.bold,
    color: Colors.neutral[700], backgroundColor: Colors.neutral[100], paddingVertical: 12,
  },
  priceInputField: { flex: 1, padding: Spacing.md, fontSize: FontSize.sm, color: Colors.neutral[900] },
  areaChips: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  areaChip: {
    paddingVertical: 7, paddingHorizontal: 12, borderRadius: BorderRadius.full,
    borderWidth: 1.5, borderColor: Colors.neutral[200], backgroundColor: Colors.neutral[100],
  },
  areaChipActive: { backgroundColor: Colors.primary[600], borderColor: Colors.primary[600] },
  areaChipText: { fontSize: FontSize.xs, fontWeight: FontWeight.semibold, color: Colors.neutral[700] },
  areaChipTextActive: { color: Colors.white },
  docRow: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: Colors.neutral[100],
  },
  docLabel: { fontSize: FontSize.sm, fontWeight: FontWeight.medium, color: Colors.neutral[800] },
  docHint: { fontSize: FontSize.xs, color: Colors.neutral[400] },
  uploadBtn: {
    flexDirection: 'row', alignItems: 'center', gap: 6,
    paddingVertical: 7, paddingHorizontal: 14, borderRadius: BorderRadius.md,
    backgroundColor: Colors.primary[50], borderWidth: 1, borderColor: Colors.primary[200],
  },
  uploadText: { fontSize: FontSize.xs, fontWeight: FontWeight.semibold, color: Colors.primary[600] },
  primaryBtn: {
    backgroundColor: Colors.primary[600], borderRadius: BorderRadius.lg, paddingVertical: 14, alignItems: 'center',
  },
  primaryBtnDisabled: { backgroundColor: Colors.neutral[300] },
  primaryBtnText: { fontSize: FontSize.md, fontWeight: FontWeight.bold, color: Colors.white },
  successContainer: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: Spacing.xl, gap: Spacing.md },
  successTitle: { fontSize: FontSize.xxl, fontWeight: FontWeight.bold, color: Colors.success[700] },
  successText: { fontSize: FontSize.sm, color: Colors.neutral[600], textAlign: 'center', lineHeight: 22 },
  addAnotherBtn: {
    flexDirection: 'row', alignItems: 'center', gap: 6,
    paddingVertical: 10, paddingHorizontal: 20, borderRadius: BorderRadius.lg,
    borderWidth: 1.5, borderColor: Colors.primary[300], backgroundColor: Colors.primary[50],
  },
  addAnotherText: { fontSize: FontSize.sm, fontWeight: FontWeight.semibold, color: Colors.primary[600] },
});
