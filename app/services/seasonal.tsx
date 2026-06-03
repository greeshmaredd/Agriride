import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity, Image,
} from 'react-native';
import { useRouter } from 'expo-router';
import { ArrowLeft, Cloud, Thermometer, Droplets, Wind, ChevronRight, AlertTriangle } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors, FontSize, FontWeight, Spacing, BorderRadius, Shadow } from '@/constants/theme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const seasonalTips = [
  {
    id: 1,
    season: 'Kharif Season',
    months: 'Jun - Nov',
    color: [Colors.primary[700], Colors.primary[500]] as [string, string],
    badge: '🌱 Active Now',
    crops: ['Paddy', 'Cotton', 'Groundnut', 'Maize'],
    tips: [
      { icon: '🚜', title: 'Land Preparation', desc: 'Start deep ploughing now. Rotavator recommended for fine tilth.', urgent: true },
      { icon: '💧', title: 'Irrigation Setup', desc: 'Install drip irrigation before monsoon ends for water conservation.', urgent: false },
      { icon: '🌾', title: 'Paddy Transplanting', desc: 'Optimal window: June 15 - July 10. Book labour teams in advance.', urgent: true },
    ],
    image: 'https://images.pexels.com/photos/2889890/pexels-photo-2889890.jpeg?auto=compress&cs=tinysrgb&w=400',
  },
  {
    id: 2,
    season: 'Rabi Season',
    months: 'Nov - Apr',
    color: ['#f59e0b', '#d97706'] as [string, string],
    badge: '🌾 Coming Soon',
    crops: ['Wheat', 'Mustard', 'Chickpea', 'Sunflower'],
    tips: [
      { icon: '🌡️', title: 'Soil Temperature', desc: 'Wait for soil to cool below 25°C before sowing.', urgent: false },
      { icon: '💉', title: 'Fertilizer Plan', desc: 'Apply basal dose of NPK before sowing. Book sprayer early.', urgent: false },
    ],
    image: 'https://images.pexels.com/photos/1595104/pexels-photo-1595104.jpeg?auto=compress&cs=tinysrgb&w=400',
  },
];

const weatherAlerts = [
  { id: 1, type: 'warning', icon: '🌧️', title: 'Heavy Rainfall Expected', desc: 'Jun 16-18: 80mm+ rainfall predicted. Avoid spraying operations.', color: Colors.primary[600] },
  { id: 2, type: 'info', icon: '💨', title: 'Strong Winds', desc: 'Jun 15: Wind speed 25-35 km/h. Delay drone spraying.', color: Colors.secondary[600] },
];

const upcomingServices = [
  { id: 1, name: 'Paddy Transplanting Labour', date: 'Book by Jun 12', urgency: 'high', emoji: '👷' },
  { id: 2, name: 'Rotavator Service', date: 'Book by Jun 15', urgency: 'medium', emoji: '🚜' },
  { id: 3, name: 'Drone Spraying', date: 'Book by Jun 20', urgency: 'low', emoji: '🚁' },
];

const urgencyColors = {
  high: { bg: Colors.error[50], text: Colors.error[700], border: Colors.error[200] },
  medium: { bg: Colors.secondary[50], text: Colors.secondary[700], border: Colors.secondary[200] },
  low: { bg: Colors.success[50], text: Colors.success[700], border: Colors.success[200] },
};

export default function SeasonalScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [activeSeason, setActiveSeason] = useState(0);

  const season = seasonalTips[activeSeason];

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <ArrowLeft size={22} color={Colors.neutral[800]} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Seasonal Tips</Text>
        <View style={{ width: 36 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <View style={styles.weatherCard}>
          <View style={styles.weatherMain}>
            <View>
              <Text style={styles.weatherTemp}>32°C</Text>
              <Text style={styles.weatherLocation}>Kurnool, AP</Text>
              <Text style={styles.weatherDesc}>Partly Cloudy</Text>
            </View>
            <Text style={styles.weatherEmoji}>⛅</Text>
          </View>
          <View style={styles.weatherStats}>
            <View style={styles.weatherStat}>
              <Droplets size={14} color={Colors.primary[500]} />
              <Text style={styles.weatherStatText}>78% Humidity</Text>
            </View>
            <View style={styles.weatherStat}>
              <Wind size={14} color={Colors.neutral[500]} />
              <Text style={styles.weatherStatText}>18 km/h</Text>
            </View>
            <View style={styles.weatherStat}>
              <Thermometer size={14} color={Colors.error[500]} />
              <Text style={styles.weatherStatText}>Low: 24°C</Text>
            </View>
          </View>
        </View>

        {weatherAlerts.map(alert => (
          <View key={alert.id} style={[styles.alertCard, { borderLeftColor: alert.color }]}>
            <Text style={styles.alertEmoji}>{alert.icon}</Text>
            <View style={{ flex: 1 }}>
              <Text style={styles.alertTitle}>{alert.title}</Text>
              <Text style={styles.alertDesc}>{alert.desc}</Text>
            </View>
            <AlertTriangle size={16} color={alert.color} />
          </View>
        ))}

        <Text style={styles.sectionTitle}>Crop Seasons</Text>
        <View style={styles.seasonTabs}>
          {seasonalTips.map((s, i) => (
            <TouchableOpacity
              key={s.id}
              style={[styles.seasonTab, activeSeason === i && styles.seasonTabActive]}
              onPress={() => setActiveSeason(i)}
            >
              <Text style={[styles.seasonTabText, activeSeason === i && styles.seasonTabTextActive]}>
                {s.season}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <LinearGradient colors={season.color} style={styles.seasonCard}>
          <Image source={{ uri: season.image }} style={styles.seasonImage} />
          <View style={styles.seasonOverlay} />
          <View style={styles.seasonContent}>
            <View style={styles.seasonBadge}>
              <Text style={styles.seasonBadgeText}>{season.badge}</Text>
            </View>
            <Text style={styles.seasonTitle}>{season.season}</Text>
            <Text style={styles.seasonMonths}>{season.months}</Text>
            <View style={styles.cropList}>
              {season.crops.map(crop => (
                <View key={crop} style={styles.cropChip}>
                  <Text style={styles.cropText}>{crop}</Text>
                </View>
              ))}
            </View>
          </View>
        </LinearGradient>

        <Text style={styles.sectionTitle}>Actionable Tips</Text>
        <View style={styles.tipsList}>
          {season.tips.map((tip, i) => (
            <View key={i} style={[styles.tipCard, tip.urgent && styles.tipCardUrgent]}>
              <Text style={styles.tipEmoji}>{tip.icon}</Text>
              <View style={{ flex: 1 }}>
                <View style={styles.tipHeader}>
                  <Text style={styles.tipTitle}>{tip.title}</Text>
                  {tip.urgent && <View style={styles.urgentBadge}><Text style={styles.urgentText}>Act Now</Text></View>}
                </View>
                <Text style={styles.tipDesc}>{tip.desc}</Text>
              </View>
            </View>
          ))}
        </View>

        <Text style={styles.sectionTitle}>Services to Book Soon</Text>
        <View style={styles.servicesList}>
          {upcomingServices.map(svc => {
            const urgency = urgencyColors[svc.urgency as keyof typeof urgencyColors];
            return (
              <TouchableOpacity
                key={svc.id}
                style={[styles.serviceItem, { borderColor: urgency.border, backgroundColor: urgency.bg }]}
                onPress={() => router.push('/booking/calendar')}
                activeOpacity={0.8}
              >
                <Text style={styles.serviceEmoji}>{svc.emoji}</Text>
                <View style={{ flex: 1 }}>
                  <Text style={styles.serviceName}>{svc.name}</Text>
                  <Text style={[styles.serviceDate, { color: urgency.text }]}>{svc.date}</Text>
                </View>
                <ChevronRight size={16} color={urgency.text} />
              </TouchableOpacity>
            );
          })}
        </View>
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
  weatherCard: {
    backgroundColor: Colors.primary[700], borderRadius: BorderRadius.xl, padding: Spacing.md, gap: 12,
  },
  weatherMain: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  weatherTemp: { fontSize: 40, fontWeight: FontWeight.bold, color: Colors.white },
  weatherLocation: { fontSize: FontSize.sm, color: 'rgba(255,255,255,0.85)' },
  weatherDesc: { fontSize: FontSize.xs, color: 'rgba(255,255,255,0.7)' },
  weatherEmoji: { fontSize: 52 },
  weatherStats: { flexDirection: 'row', gap: Spacing.lg },
  weatherStat: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  weatherStatText: { fontSize: FontSize.xs, color: 'rgba(255,255,255,0.85)' },
  alertCard: {
    flexDirection: 'row', alignItems: 'flex-start', gap: Spacing.sm,
    backgroundColor: Colors.white, borderRadius: BorderRadius.lg, padding: Spacing.md,
    borderLeftWidth: 3, ...Shadow.sm,
  },
  alertEmoji: { fontSize: 20 },
  alertTitle: { fontSize: FontSize.sm, fontWeight: FontWeight.bold, color: Colors.neutral[900] },
  alertDesc: { fontSize: FontSize.xs, color: Colors.neutral[600], marginTop: 2 },
  sectionTitle: { fontSize: FontSize.lg, fontWeight: FontWeight.bold, color: Colors.neutral[900] },
  seasonTabs: { flexDirection: 'row', gap: Spacing.sm },
  seasonTab: {
    flex: 1, paddingVertical: 10, paddingHorizontal: Spacing.md,
    borderRadius: BorderRadius.lg, borderWidth: 1.5, borderColor: Colors.neutral[200],
    backgroundColor: Colors.white, alignItems: 'center',
  },
  seasonTabActive: { backgroundColor: Colors.primary[600], borderColor: Colors.primary[600] },
  seasonTabText: { fontSize: FontSize.sm, fontWeight: FontWeight.semibold, color: Colors.neutral[600] },
  seasonTabTextActive: { color: Colors.white },
  seasonCard: { borderRadius: BorderRadius.xl, overflow: 'hidden', height: 180 },
  seasonImage: { position: 'absolute', width: '100%', height: '100%' },
  seasonOverlay: { position: 'absolute', width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.4)' },
  seasonContent: { padding: Spacing.lg, gap: 6 },
  seasonBadge: { alignSelf: 'flex-start', backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: BorderRadius.full, paddingHorizontal: 10, paddingVertical: 3 },
  seasonBadgeText: { fontSize: FontSize.xs, color: Colors.white, fontWeight: FontWeight.semibold },
  seasonTitle: { fontSize: FontSize.xl, fontWeight: FontWeight.bold, color: Colors.white },
  seasonMonths: { fontSize: FontSize.sm, color: 'rgba(255,255,255,0.8)' },
  cropList: { flexDirection: 'row', flexWrap: 'wrap', gap: 6 },
  cropChip: { backgroundColor: 'rgba(255,255,255,0.25)', borderRadius: BorderRadius.full, paddingHorizontal: 10, paddingVertical: 3 },
  cropText: { fontSize: FontSize.xs, color: Colors.white, fontWeight: FontWeight.medium },
  tipsList: { gap: Spacing.sm },
  tipCard: {
    flexDirection: 'row', gap: Spacing.md,
    backgroundColor: Colors.white, borderRadius: BorderRadius.lg, padding: Spacing.md,
    ...Shadow.sm,
  },
  tipCardUrgent: { borderLeftWidth: 3, borderLeftColor: Colors.error[400] },
  tipEmoji: { fontSize: 28, marginTop: 2 },
  tipHeader: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 4 },
  tipTitle: { fontSize: FontSize.sm, fontWeight: FontWeight.bold, color: Colors.neutral[900], flex: 1 },
  urgentBadge: { backgroundColor: Colors.error[100], borderRadius: BorderRadius.full, paddingHorizontal: 8, paddingVertical: 2 },
  urgentText: { fontSize: 10, fontWeight: FontWeight.bold, color: Colors.error[700] },
  tipDesc: { fontSize: FontSize.xs, color: Colors.neutral[600], lineHeight: 18 },
  servicesList: { gap: Spacing.sm },
  serviceItem: {
    flexDirection: 'row', alignItems: 'center', gap: Spacing.md,
    borderRadius: BorderRadius.lg, padding: Spacing.md,
    borderWidth: 1.5,
  },
  serviceEmoji: { fontSize: 24 },
  serviceName: { fontSize: FontSize.sm, fontWeight: FontWeight.bold, color: Colors.neutral[800] },
  serviceDate: { fontSize: FontSize.xs, fontWeight: FontWeight.semibold, marginTop: 2 },
});
