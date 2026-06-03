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
  Image,
} from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Camera, MapPin, ChevronDown, Leaf } from 'lucide-react-native';
import { Colors, FontSize, FontWeight, Spacing, BorderRadius, Shadow } from '@/constants/theme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const CROPS = ['Paddy / Rice', 'Wheat', 'Sugarcane', 'Cotton', 'Groundnut', 'Soybean', 'Maize', 'Vegetables', 'Pulses', 'Other'];
const LANGUAGES = ['English', 'Telugu', 'Tamil', 'Hindi', 'Kannada', 'Malayalam'];

export default function ProfileSetupScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [landSize, setLandSize] = useState('');
  const [village, setVillage] = useState('');
  const [selectedCrops, setSelectedCrops] = useState<string[]>([]);
  const [language, setLanguage] = useState('English');
  const [locationGranted, setLocationGranted] = useState(false);

  const toggleCrop = (c: string) => {
    setSelectedCrops(prev => prev.includes(c) ? prev.filter(x => x !== c) : [...prev, c]);
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScrollView
        style={[styles.container, { paddingTop: insets.top }]}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <LinearGradient colors={[Colors.primary[700], Colors.primary[500]]} style={styles.header}>
          <Text style={styles.headerTitle}>Setup Your Profile</Text>
          <Text style={styles.headerSub}>Help us serve you better</Text>
        </LinearGradient>

        <View style={styles.content}>
          <View style={styles.photoSection}>
            <View style={styles.photoWrap}>
              <Image
                source={{ uri: 'https://images.pexels.com/photos/1139541/pexels-photo-1139541.jpeg?auto=compress&cs=tinysrgb&w=200' }}
                style={styles.photo}
              />
              <TouchableOpacity style={styles.cameraBtn}>
                <Camera size={16} color={Colors.white} />
              </TouchableOpacity>
            </View>
            <Text style={styles.photoHint}>Tap to upload your photo</Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>Farm Details</Text>
            <View style={styles.fieldWrap}>
              <Text style={styles.fieldLabel}>Land Size (in Acres)</Text>
              <TextInput
                style={styles.fieldInput}
                value={landSize}
                onChangeText={setLandSize}
                placeholder="e.g. 5.5 acres"
                placeholderTextColor={Colors.neutral[400]}
                keyboardType="decimal-pad"
              />
            </View>
            <View style={styles.fieldWrap}>
              <Text style={styles.fieldLabel}>Village / Location</Text>
              <TextInput
                style={styles.fieldInput}
                value={village}
                onChangeText={setVillage}
                placeholder="Your village name"
                placeholderTextColor={Colors.neutral[400]}
              />
            </View>
          </View>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>
              <Leaf size={16} color={Colors.primary[600]} /> Crop Types
            </Text>
            <Text style={styles.cardSub}>Select crops you grow</Text>
            <View style={styles.chipWrap}>
              {CROPS.map(c => (
                <TouchableOpacity
                  key={c}
                  style={[styles.chip, selectedCrops.includes(c) && styles.chipActive]}
                  onPress={() => toggleCrop(c)}
                >
                  <Text style={[styles.chipText, selectedCrops.includes(c) && styles.chipTextActive]}>{c}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>Preferred Language</Text>
            <View style={styles.langRow}>
              {LANGUAGES.map(l => (
                <TouchableOpacity
                  key={l}
                  style={[styles.langChip, language === l && styles.langChipActive]}
                  onPress={() => setLanguage(l)}
                >
                  <Text style={[styles.langChipText, language === l && styles.langChipTextActive]}>{l}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <TouchableOpacity
            style={[styles.locationCard, locationGranted && styles.locationCardGranted]}
            onPress={() => setLocationGranted(true)}
            activeOpacity={0.8}
          >
            <MapPin size={24} color={locationGranted ? Colors.primary[600] : Colors.neutral[500]} />
            <View style={styles.locationText}>
              <Text style={styles.locationTitle}>
                {locationGranted ? 'Location Enabled' : 'Enable Location Access'}
              </Text>
              <Text style={styles.locationSub}>
                {locationGranted ? 'We will find nearby services for you' : 'Find services near your farm location'}
              </Text>
            </View>
            {locationGranted && (
              <View style={styles.locationCheck}>
                <Text style={{ color: Colors.white, fontSize: 12 }}>✓</Text>
              </View>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.saveBtn}
            onPress={() => router.replace('/(tabs)/home')}
            activeOpacity={0.85}
          >
            <LinearGradient
              colors={[Colors.primary[500], Colors.primary[700]]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.saveGradient}
            >
              <Text style={styles.saveText}>Save Profile & Enter App</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.neutral[50] },
  header: { padding: Spacing.xl, paddingBottom: Spacing.xxl },
  headerTitle: {
    fontSize: FontSize.xxl,
    fontWeight: FontWeight.bold,
    color: Colors.white,
    marginBottom: 4,
  },
  headerSub: {
    fontSize: FontSize.sm,
    color: 'rgba(255,255,255,0.85)',
  },
  content: {
    marginTop: -20,
    backgroundColor: Colors.neutral[50],
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    padding: Spacing.lg,
    gap: Spacing.md,
    paddingBottom: 40,
  },
  photoSection: {
    alignItems: 'center',
    marginVertical: Spacing.lg,
  },
  photoWrap: {
    position: 'relative',
    width: 90, height: 90,
  },
  photo: {
    width: 90, height: 90,
    borderRadius: 45,
    borderWidth: 3,
    borderColor: Colors.primary[400],
  },
  cameraBtn: {
    position: 'absolute',
    bottom: 0, right: 0,
    width: 30, height: 30,
    borderRadius: 15,
    backgroundColor: Colors.primary[600],
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: Colors.white,
  },
  photoHint: {
    fontSize: FontSize.xs,
    color: Colors.neutral[500],
    marginTop: 8,
  },
  card: {
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    gap: 10,
    ...Shadow.sm,
  },
  cardTitle: {
    fontSize: FontSize.md,
    fontWeight: FontWeight.bold,
    color: Colors.neutral[900],
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  cardSub: {
    fontSize: FontSize.xs,
    color: Colors.neutral[500],
    marginTop: -6,
  },
  fieldWrap: { gap: 6 },
  fieldLabel: {
    fontSize: FontSize.sm,
    fontWeight: FontWeight.semibold,
    color: Colors.neutral[700],
  },
  fieldInput: {
    backgroundColor: Colors.neutral[50],
    borderRadius: BorderRadius.md,
    borderWidth: 1.5,
    borderColor: Colors.neutral[200],
    paddingHorizontal: Spacing.md,
    paddingVertical: 12,
    fontSize: FontSize.md,
    color: Colors.neutral[900],
  },
  chipWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  chip: {
    paddingVertical: 7,
    paddingHorizontal: 14,
    borderRadius: BorderRadius.full,
    backgroundColor: Colors.neutral[100],
    borderWidth: 1,
    borderColor: Colors.neutral[200],
  },
  chipActive: {
    backgroundColor: Colors.primary[100],
    borderColor: Colors.primary[400],
  },
  chipText: {
    fontSize: FontSize.sm,
    color: Colors.neutral[600],
    fontWeight: FontWeight.medium,
  },
  chipTextActive: {
    color: Colors.primary[700],
    fontWeight: FontWeight.semibold,
  },
  langRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  langChip: {
    paddingVertical: 7,
    paddingHorizontal: 14,
    borderRadius: BorderRadius.full,
    backgroundColor: Colors.neutral[100],
    borderWidth: 1,
    borderColor: Colors.neutral[200],
  },
  langChipActive: {
    backgroundColor: Colors.secondary[100],
    borderColor: Colors.secondary[400],
  },
  langChipText: {
    fontSize: FontSize.sm,
    color: Colors.neutral[600],
    fontWeight: FontWeight.medium,
  },
  langChipTextActive: {
    color: Colors.secondary[700],
    fontWeight: FontWeight.semibold,
  },
  locationCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    borderWidth: 1.5,
    borderColor: Colors.neutral[200],
    gap: Spacing.md,
    ...Shadow.sm,
  },
  locationCardGranted: {
    borderColor: Colors.primary[400],
    backgroundColor: Colors.primary[50],
  },
  locationText: { flex: 1 },
  locationTitle: {
    fontSize: FontSize.md,
    fontWeight: FontWeight.semibold,
    color: Colors.neutral[800],
  },
  locationSub: {
    fontSize: FontSize.xs,
    color: Colors.neutral[500],
    marginTop: 2,
  },
  locationCheck: {
    width: 26, height: 26,
    borderRadius: 13,
    backgroundColor: Colors.primary[600],
    alignItems: 'center',
    justifyContent: 'center',
  },
  saveBtn: {
    borderRadius: BorderRadius.lg,
    overflow: 'hidden',
    marginTop: Spacing.sm,
    ...Shadow.green,
  },
  saveGradient: {
    paddingVertical: 16,
    alignItems: 'center',
  },
  saveText: {
    fontSize: FontSize.lg,
    fontWeight: FontWeight.bold,
    color: Colors.white,
    letterSpacing: 0.3,
  },
});
