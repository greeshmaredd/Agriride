import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Check } from 'lucide-react-native';
import { Colors, FontSize, FontWeight, Spacing, BorderRadius, Shadow } from '@/constants/theme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const languages = [
  { code: 'en', name: 'English', native: 'English', flag: '🇮🇳', states: 'National' },
  { code: 'te', name: 'Telugu', native: 'తెలుగు', flag: '🌾', states: 'Andhra Pradesh, Telangana' },
  { code: 'ta', name: 'Tamil', native: 'தமிழ்', flag: '🌿', states: 'Tamil Nadu' },
  { code: 'hi', name: 'Hindi', native: 'हिन्दी', flag: '🇮🇳', states: 'North India' },
  { code: 'kn', name: 'Kannada', native: 'ಕನ್ನಡ', flag: '🌻', states: 'Karnataka' },
  { code: 'ml', name: 'Malayalam', native: 'മലയാളം', flag: '🥥', states: 'Kerala' },
  { code: 'mr', name: 'Marathi', native: 'मराठी', flag: '🌾', states: 'Maharashtra' },
  { code: 'gu', name: 'Gujarati', native: 'ગુજરાતી', flag: '🌼', states: 'Gujarat' },
];

export default function LanguageScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [selected, setSelected] = useState('en');

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <LinearGradient
        colors={[Colors.primary[700], Colors.primary[600]]}
        style={styles.headerGrad}
      >
        <Text style={styles.headerTitle}>Choose Your Language</Text>
        <Text style={styles.headerSub}>अपनी भाषा चुनें • మీ భాష ఎంచుకోండి</Text>
      </LinearGradient>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.sectionLabel}>Select Preferred Language</Text>
        <View style={styles.grid}>
          {languages.map((lang) => {
            const active = selected === lang.code;
            return (
              <TouchableOpacity
                key={lang.code}
                style={[styles.langCard, active && styles.langCardActive]}
                onPress={() => setSelected(lang.code)}
                activeOpacity={0.8}
              >
                <View style={styles.langTop}>
                  <Text style={styles.flag}>{lang.flag}</Text>
                  {active && (
                    <View style={styles.checkWrap}>
                      <Check size={14} color={Colors.white} strokeWidth={3} />
                    </View>
                  )}
                </View>
                <Text style={[styles.nativeName, active && styles.nativeNameActive]}>
                  {lang.native}
                </Text>
                <Text style={[styles.engName, active && styles.engNameActive]}>
                  {lang.name}
                </Text>
                <Text style={styles.stateTag}>{lang.states}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>

      <View style={[styles.footer, { paddingBottom: insets.bottom + 16 }]}>
        <TouchableOpacity
          style={styles.continueBtn}
          onPress={() => router.replace('/auth/login')}
          activeOpacity={0.85}
        >
          <LinearGradient
            colors={[Colors.primary[500], Colors.primary[700]]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.continueGradient}
          >
            <Text style={styles.continueText}>Continue with {languages.find(l => l.code === selected)?.name}</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.neutral[50] },
  headerGrad: {
    paddingHorizontal: Spacing.xl,
    paddingVertical: Spacing.xl,
    paddingTop: Spacing.lg,
  },
  headerTitle: {
    fontSize: FontSize.xxl,
    fontWeight: FontWeight.bold,
    color: Colors.white,
    marginBottom: 6,
  },
  headerSub: {
    fontSize: FontSize.sm,
    color: 'rgba(255,255,255,0.8)',
    fontWeight: FontWeight.medium,
  },
  scroll: { flex: 1 },
  scrollContent: { padding: Spacing.md, paddingBottom: Spacing.lg },
  sectionLabel: {
    fontSize: FontSize.sm,
    fontWeight: FontWeight.semibold,
    color: Colors.neutral[500],
    marginBottom: Spacing.md,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  langCard: {
    width: '47%',
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    borderWidth: 2,
    borderColor: Colors.neutral[200],
    ...Shadow.sm,
    gap: 4,
  },
  langCardActive: {
    borderColor: Colors.primary[500],
    backgroundColor: Colors.primary[50],
    ...Shadow.green,
  },
  langTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  flag: { fontSize: 28 },
  checkWrap: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: Colors.primary[600],
    alignItems: 'center',
    justifyContent: 'center',
  },
  nativeName: {
    fontSize: FontSize.lg,
    fontWeight: FontWeight.bold,
    color: Colors.neutral[800],
  },
  nativeNameActive: { color: Colors.primary[700] },
  engName: {
    fontSize: FontSize.sm,
    fontWeight: FontWeight.semibold,
    color: Colors.neutral[500],
  },
  engNameActive: { color: Colors.primary[600] },
  stateTag: {
    fontSize: 10,
    color: Colors.neutral[400],
    marginTop: 2,
  },
  footer: {
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.sm,
    backgroundColor: Colors.white,
    borderTopWidth: 1,
    borderTopColor: Colors.neutral[100],
  },
  continueBtn: {
    borderRadius: BorderRadius.lg,
    overflow: 'hidden',
    ...Shadow.green,
  },
  continueGradient: {
    paddingVertical: 16,
    alignItems: 'center',
    borderRadius: BorderRadius.lg,
  },
  continueText: {
    fontSize: FontSize.lg,
    fontWeight: FontWeight.bold,
    color: Colors.white,
  },
});
