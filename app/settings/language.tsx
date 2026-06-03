import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity,
} from 'react-native';
import { useRouter } from 'expo-router';
import { ArrowLeft, Globe, CircleCheck, Eye, Volume2 } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors, FontSize, FontWeight, Spacing, BorderRadius, Shadow } from '@/constants/theme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const languages = [
  { id: 'en', name: 'English', native: 'English', flag: '🇮🇳', preview: 'Book your farm services easily' },
  { id: 'te', name: 'Telugu', native: 'తెలుగు', flag: '🌾', preview: 'మీ వ్యవసాయ సేవలను సులభంగా బుక్ చేయండి' },
  { id: 'hi', name: 'Hindi', native: 'हिंदी', flag: '🇮🇳', preview: 'अपनी कृषि सेवाएं आसानी से बुक करें' },
  { id: 'ta', name: 'Tamil', native: 'தமிழ்', flag: '🌾', preview: 'உங்கள் விவசாய சேவைகளை எளிதாக பதிவு செய்யுங்கள்' },
  { id: 'kn', name: 'Kannada', native: 'ಕನ್ನಡ', flag: '🌾', preview: 'ನಿಮ್ಮ ಕೃಷಿ ಸೇವೆಗಳನ್ನು ಸುಲಭವಾಗಿ ಬುಕ್ ಮಾಡಿ' },
  { id: 'ml', name: 'Malayalam', native: 'മലയാളം', flag: '🌾', preview: 'നിങ്ങളുടെ കാർഷിക സേവനങ്ങൾ എളുപ്പത്തിൽ ബുക്ക് ചെയ്യൂ' },
  { id: 'mr', name: 'Marathi', native: 'मराठी', flag: '🌾', preview: 'आपल्या शेती सेवा सहजपणे बुक करा' },
  { id: 'gu', name: 'Gujarati', native: 'ગુજરાતી', flag: '🌾', preview: 'તમારી ખેત સેવાઓ સરળતાથી બુક કરો' },
];

export default function LanguageSettingsScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [selectedLang, setSelectedLang] = useState('en');
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => { setSaved(false); router.back(); }, 1200);
  };

  const selectedLanguage = languages.find(l => l.id === selectedLang)!;

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <ArrowLeft size={22} color={Colors.neutral[800]} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Language Settings</Text>
        <View style={{ width: 36 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <LinearGradient colors={[Colors.primary[700], Colors.primary[500]]} style={styles.previewCard}>
          <Globe size={22} color="rgba(255,255,255,0.8)" />
          <Text style={styles.previewLabel}>Preview in {selectedLanguage.name}</Text>
          <Text style={styles.previewText}>{selectedLanguage.preview}</Text>
        </LinearGradient>

        <Text style={styles.sectionTitle}>Choose Your Language</Text>
        <Text style={styles.sectionSubtitle}>The app will be displayed in your selected language</Text>

        <View style={styles.languageGrid}>
          {languages.map(lang => (
            <TouchableOpacity
              key={lang.id}
              style={[styles.langCard, selectedLang === lang.id && styles.langCardActive]}
              onPress={() => setSelectedLang(lang.id)}
              activeOpacity={0.8}
            >
              <Text style={styles.langFlag}>{lang.flag}</Text>
              <View style={styles.langInfo}>
                <Text style={[styles.langNative, selectedLang === lang.id && styles.langNativeActive]}>
                  {lang.native}
                </Text>
                <Text style={[styles.langName, selectedLang === lang.id && styles.langNameActive]}>
                  {lang.name}
                </Text>
              </View>
              {selectedLang === lang.id && (
                <CircleCheck size={20} color={Colors.primary[600]} fill={Colors.primary[100]} />
              )}
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.accessibilityCard}>
          <Text style={styles.accessibilityTitle}>Accessibility</Text>

          <View style={styles.accessibilityRow}>
            <View style={styles.accessibilityLeft}>
              <View style={[styles.accessibilityIcon, { backgroundColor: Colors.primary[50] }]}>
                <Volume2 size={18} color={Colors.primary[600]} />
              </View>
              <View>
                <Text style={styles.accessibilityLabel}>Voice Assistance</Text>
                <Text style={styles.accessibilityNote}>Read aloud labels and messages</Text>
              </View>
            </View>
            <TouchableOpacity
              style={[styles.toggle, voiceEnabled && styles.toggleActive]}
              onPress={() => setVoiceEnabled(!voiceEnabled)}
            >
              <View style={[styles.toggleThumb, voiceEnabled && styles.toggleThumbActive]} />
            </TouchableOpacity>
          </View>

          <View style={styles.accessibilityRow}>
            <View style={styles.accessibilityLeft}>
              <View style={[styles.accessibilityIcon, { backgroundColor: Colors.secondary[50] }]}>
                <Eye size={18} color={Colors.secondary[600]} />
              </View>
              <View>
                <Text style={styles.accessibilityLabel}>Large Text Mode</Text>
                <Text style={styles.accessibilityNote}>Increase font size for easier reading</Text>
              </View>
            </View>
            <TouchableOpacity style={styles.toggle}>
              <View style={styles.toggleThumb} />
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity
          style={[styles.saveBtn, saved && styles.saveBtnSuccess]}
          onPress={handleSave}
        >
          {saved
            ? <CircleCheck size={18} color={Colors.white} />
            : null
          }
          <Text style={styles.saveBtnText}>{saved ? 'Saved!' : 'Save Language Settings'}</Text>
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
  previewCard: {
    borderRadius: BorderRadius.xl, padding: Spacing.lg,
    alignItems: 'center', gap: 8,
  },
  previewLabel: { fontSize: FontSize.xs, color: 'rgba(255,255,255,0.75)', fontWeight: FontWeight.medium },
  previewText: { fontSize: FontSize.md, color: Colors.white, fontWeight: FontWeight.semibold, textAlign: 'center' },
  sectionTitle: { fontSize: FontSize.lg, fontWeight: FontWeight.bold, color: Colors.neutral[900] },
  sectionSubtitle: { fontSize: FontSize.sm, color: Colors.neutral[500], marginTop: -8 },
  languageGrid: { gap: Spacing.sm },
  langCard: {
    flexDirection: 'row', alignItems: 'center', gap: Spacing.md,
    backgroundColor: Colors.white, borderRadius: BorderRadius.lg, padding: Spacing.md,
    borderWidth: 1.5, borderColor: Colors.neutral[200], ...Shadow.sm,
  },
  langCardActive: { borderColor: Colors.primary[400], backgroundColor: Colors.primary[50] },
  langFlag: { fontSize: 24 },
  langInfo: { flex: 1 },
  langNative: { fontSize: FontSize.md, fontWeight: FontWeight.bold, color: Colors.neutral[900] },
  langNativeActive: { color: Colors.primary[800] },
  langName: { fontSize: FontSize.xs, color: Colors.neutral[500] },
  langNameActive: { color: Colors.primary[600] },
  accessibilityCard: {
    backgroundColor: Colors.white, borderRadius: BorderRadius.xl, padding: Spacing.md,
    gap: Spacing.md, ...Shadow.sm,
  },
  accessibilityTitle: { fontSize: FontSize.lg, fontWeight: FontWeight.bold, color: Colors.neutral[900] },
  accessibilityRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  accessibilityLeft: { flexDirection: 'row', alignItems: 'center', gap: Spacing.md, flex: 1 },
  accessibilityIcon: { width: 40, height: 40, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  accessibilityLabel: { fontSize: FontSize.sm, fontWeight: FontWeight.semibold, color: Colors.neutral[800] },
  accessibilityNote: { fontSize: FontSize.xs, color: Colors.neutral[500], marginTop: 2 },
  toggle: {
    width: 48, height: 26, borderRadius: 13,
    backgroundColor: Colors.neutral[300], padding: 2, justifyContent: 'center',
  },
  toggleActive: { backgroundColor: Colors.primary[500] },
  toggleThumb: {
    width: 22, height: 22, borderRadius: 11, backgroundColor: Colors.white,
    alignSelf: 'flex-start',
  },
  toggleThumbActive: { alignSelf: 'flex-end' },
  saveBtn: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8,
    backgroundColor: Colors.primary[600], borderRadius: BorderRadius.lg, paddingVertical: 14,
  },
  saveBtnSuccess: { backgroundColor: Colors.success[600] },
  saveBtnText: { fontSize: FontSize.md, fontWeight: FontWeight.bold, color: Colors.white },
});
