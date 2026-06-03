import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
  Dimensions,
} from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import {
  Bell,
  Mic,
  Search,
  MapPin,
  Thermometer,
  Droplets,
  Wind,
  Star,
  ChevronRight,
  Tractor,
  Scissors,
  Zap,
  Truck,
  Layers,
  Droplet,
  Users,
  Wrench,
} from 'lucide-react-native';
import { Colors, FontSize, FontWeight, Spacing, BorderRadius, Shadow } from '@/constants/theme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

const categories = [
  { id: 'tractor', label: 'Tractor Work', icon: Tractor, color: Colors.primary[600], bg: Colors.primary[50], path: '/services/tractor' },
  { id: 'harvest', label: 'Harvesting', icon: Scissors, color: Colors.secondary[600], bg: Colors.secondary[50], path: '/services/harvesting' },
  { id: 'sprayer', label: 'Sprayer', icon: Zap, color: Colors.accent[600], bg: Colors.accent[50], path: '/services/sprayer' },
  { id: 'jcb', label: 'JCB', icon: Wrench, color: '#ca8a04', bg: '#fef9c3', path: '/services/jcb' },
  { id: 'borewell', label: 'Borewell', icon: Droplet, color: Colors.water[600], bg: Colors.water[100], path: '/services/borewell' },
  { id: 'irrigation', label: 'Irrigation', icon: Droplets, color: '#0891b2', bg: '#e0f2fe', path: '/services/irrigation' },
  { id: 'transport', label: 'Transport', icon: Truck, color: Colors.neutral[600], bg: Colors.neutral[100], path: '/services/transport' },
  { id: 'labour', label: 'Labour', icon: Users, color: '#7c3aed', bg: '#ede9fe', path: '/services/labour' },
];

const nearbyProviders = [
  { name: 'Ramu Tractor Services', service: 'Ploughing & Rotavator', rating: 4.8, distance: '1.2 km', image: 'https://images.pexels.com/photos/2889890/pexels-photo-2889890.jpeg?auto=compress&cs=tinysrgb&w=300', available: true },
  { name: 'Shiva Harvesting', service: 'Paddy Harvester', rating: 4.6, distance: '2.4 km', image: 'https://images.pexels.com/photos/1595104/pexels-photo-1595104.jpeg?auto=compress&cs=tinysrgb&w=300', available: true },
  { name: 'Krishna JCB Works', service: 'Land Leveling', rating: 4.9, distance: '3.1 km', image: 'https://images.pexels.com/photos/2219024/pexels-photo-2219024.jpeg?auto=compress&cs=tinysrgb&w=300', available: false },
];

export default function HomeScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [search, setSearch] = useState('');

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <LinearGradient
        colors={[Colors.primary[700], Colors.primary[600], Colors.primary[500]]}
        style={styles.header}
      >
        <View style={styles.headerTop}>
          <View>
            <Text style={styles.greeting}>Namaste, Farmer 🙏</Text>
            <View style={styles.locationRow}>
              <MapPin size={13} color="rgba(255,255,255,0.8)" />
              <Text style={styles.locationText}>Kurnool, Andhra Pradesh</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.notifBtn} onPress={() => router.push('/(tabs)/notifications')}>
            <Bell size={22} color={Colors.white} />
            <View style={styles.notifDot} />
          </TouchableOpacity>
        </View>

        <View style={styles.searchRow}>
          <View style={styles.searchWrap}>
            <Search size={18} color={Colors.neutral[400]} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search tractors, services..."
              placeholderTextColor={Colors.neutral[400]}
              value={search}
              onChangeText={setSearch}
            />
          </View>
          <TouchableOpacity style={styles.voiceBtn}>
            <Mic size={20} color={Colors.primary[600]} />
          </TouchableOpacity>
        </View>
      </LinearGradient>

      <ScrollView
        style={styles.scroll}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.weatherCard}>
          <LinearGradient
            colors={['#0284c7', '#0369a1']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.weatherGradient}
          >
            <View>
              <Text style={styles.weatherDay}>Today, {new Date().toLocaleDateString('en-IN', { weekday: 'long' })}</Text>
              <Text style={styles.weatherTemp}>28°C</Text>
              <Text style={styles.weatherDesc}>Partly Cloudy — Good for farming</Text>
            </View>
            <View style={styles.weatherRight}>
              <Text style={styles.weatherIcon}>⛅</Text>
              <View style={styles.weatherStats}>
                <View style={styles.weatherStat}>
                  <Droplets size={12} color="rgba(255,255,255,0.8)" />
                  <Text style={styles.weatherStatText}>72%</Text>
                </View>
                <View style={styles.weatherStat}>
                  <Wind size={12} color="rgba(255,255,255,0.8)" />
                  <Text style={styles.weatherStatText}>12 km/h</Text>
                </View>
              </View>
            </View>
          </LinearGradient>
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Our Services</Text>
          <TouchableOpacity onPress={() => router.push('/services/categories')}>
            <Text style={styles.seeAll}>See All</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.categoryGrid}>
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <TouchableOpacity
                key={cat.id}
                style={styles.catCard}
                onPress={() => router.push(cat.path as any)}
                activeOpacity={0.8}
              >
                <View style={[styles.catIconWrap, { backgroundColor: cat.bg }]}>
                  <Icon size={26} color={cat.color} strokeWidth={1.8} />
                </View>
                <Text style={styles.catLabel}>{cat.label}</Text>
              </TouchableOpacity>
            );
          })}
        </View>

        <View style={styles.seasonCard}>
          <LinearGradient
            colors={[Colors.secondary[500], Colors.accent[500]]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.seasonGradient}
          >
            <View style={styles.seasonLeft}>
              <Text style={styles.seasonBadge}>Seasonal Tip</Text>
              <Text style={styles.seasonTitle}>Paddy Harvest Season</Text>
              <Text style={styles.seasonDesc}>Book harvester now — limited slots available</Text>
            </View>
            <Text style={styles.seasonEmoji}>🌾</Text>
          </LinearGradient>
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Nearby Services</Text>
          <TouchableOpacity onPress={() => router.push('/services/nearby')}>
            <Text style={styles.seeAll}>View Map</Text>
          </TouchableOpacity>
        </View>

        {nearbyProviders.map((p, i) => (
          <TouchableOpacity
            key={i}
            style={styles.providerCard}
            onPress={() => router.push('/services/vehicle-detail')}
            activeOpacity={0.88}
          >
            <Image source={{ uri: p.image }} style={styles.providerImg} />
            <View style={styles.providerInfo}>
              <View style={styles.providerTopRow}>
                <Text style={styles.providerName}>{p.name}</Text>
                <View style={[styles.availBadge, { backgroundColor: p.available ? Colors.success[50] : Colors.error[50] }]}>
                  <Text style={[styles.availText, { color: p.available ? Colors.success[600] : Colors.error[600] }]}>
                    {p.available ? 'Available' : 'Busy'}
                  </Text>
                </View>
              </View>
              <Text style={styles.providerService}>{p.service}</Text>
              <View style={styles.providerMeta}>
                <View style={styles.ratingRow}>
                  <Star size={12} color={Colors.secondary[400]} fill={Colors.secondary[400]} />
                  <Text style={styles.ratingText}>{p.rating}</Text>
                </View>
                <View style={styles.distRow}>
                  <MapPin size={12} color={Colors.neutral[400]} />
                  <Text style={styles.distText}>{p.distance}</Text>
                </View>
              </View>
            </View>
            <ChevronRight size={18} color={Colors.neutral[300]} />
          </TouchableOpacity>
        ))}

        <View style={{ height: 20 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.neutral[50] },
  header: {
    paddingHorizontal: Spacing.md,
    paddingBottom: Spacing.lg,
    gap: Spacing.md,
    paddingTop: Spacing.sm,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  greeting: {
    fontSize: FontSize.xl,
    fontWeight: FontWeight.bold,
    color: Colors.white,
    marginBottom: 2,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  locationText: {
    fontSize: FontSize.xs,
    color: 'rgba(255,255,255,0.85)',
    fontWeight: FontWeight.medium,
  },
  notifBtn: {
    width: 42, height: 42,
    borderRadius: 21,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  notifDot: {
    position: 'absolute',
    top: 8, right: 10,
    width: 8, height: 8,
    borderRadius: 4,
    backgroundColor: Colors.error[500],
    borderWidth: 1.5,
    borderColor: Colors.primary[600],
  },
  searchRow: {
    flexDirection: 'row',
    gap: Spacing.sm,
    alignItems: 'center',
  },
  searchWrap: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.full,
    paddingHorizontal: Spacing.md,
    height: 46,
    gap: Spacing.sm,
    ...Shadow.sm,
  },
  searchInput: {
    flex: 1,
    fontSize: FontSize.md,
    color: Colors.neutral[900],
  },
  voiceBtn: {
    width: 46, height: 46,
    borderRadius: 23,
    backgroundColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    ...Shadow.sm,
  },
  scroll: { flex: 1 },
  scrollContent: { padding: Spacing.md, gap: Spacing.md },

  weatherCard: {
    borderRadius: BorderRadius.xl,
    overflow: 'hidden',
    ...Shadow.md,
  },
  weatherGradient: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: Spacing.md,
  },
  weatherDay: { fontSize: FontSize.xs, color: 'rgba(255,255,255,0.8)', marginBottom: 4 },
  weatherTemp: { fontSize: 36, fontWeight: FontWeight.bold, color: Colors.white },
  weatherDesc: { fontSize: FontSize.xs, color: 'rgba(255,255,255,0.8)', marginTop: 2 },
  weatherRight: { alignItems: 'flex-end', gap: 8 },
  weatherIcon: { fontSize: 40 },
  weatherStats: { gap: 4 },
  weatherStat: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  weatherStatText: { fontSize: FontSize.xs, color: 'rgba(255,255,255,0.9)', fontWeight: FontWeight.medium },

  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: FontSize.lg,
    fontWeight: FontWeight.bold,
    color: Colors.neutral[900],
  },
  seeAll: {
    fontSize: FontSize.sm,
    color: Colors.primary[600],
    fontWeight: FontWeight.semibold,
  },

  categoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  catCard: {
    width: (width - Spacing.md * 2 - 30) / 4,
    alignItems: 'center',
    gap: 6,
  },
  catIconWrap: {
    width: 58,
    height: 58,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    ...Shadow.sm,
  },
  catLabel: {
    fontSize: 11,
    fontWeight: FontWeight.semibold,
    color: Colors.neutral[700],
    textAlign: 'center',
  },

  seasonCard: {
    borderRadius: BorderRadius.xl,
    overflow: 'hidden',
    ...Shadow.md,
  },
  seasonGradient: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: Spacing.md,
  },
  seasonLeft: { flex: 1 },
  seasonBadge: {
    fontSize: 10,
    fontWeight: FontWeight.bold,
    color: 'rgba(255,255,255,0.9)',
    backgroundColor: 'rgba(0,0,0,0.15)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: BorderRadius.full,
    alignSelf: 'flex-start',
    marginBottom: 6,
  },
  seasonTitle: {
    fontSize: FontSize.lg,
    fontWeight: FontWeight.bold,
    color: Colors.white,
    marginBottom: 4,
  },
  seasonDesc: { fontSize: FontSize.xs, color: 'rgba(255,255,255,0.9)' },
  seasonEmoji: { fontSize: 48 },

  providerCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    gap: Spacing.md,
    ...Shadow.sm,
  },
  providerImg: {
    width: 60, height: 60,
    borderRadius: 12,
    backgroundColor: Colors.neutral[200],
  },
  providerInfo: { flex: 1, gap: 4 },
  providerTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  providerName: {
    fontSize: FontSize.md,
    fontWeight: FontWeight.bold,
    color: Colors.neutral[900],
    flex: 1,
  },
  availBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: BorderRadius.full,
  },
  availText: { fontSize: 10, fontWeight: FontWeight.semibold },
  providerService: {
    fontSize: FontSize.sm,
    color: Colors.neutral[500],
  },
  providerMeta: { flexDirection: 'row', gap: 12 },
  ratingRow: { flexDirection: 'row', alignItems: 'center', gap: 3 },
  ratingText: { fontSize: FontSize.sm, fontWeight: FontWeight.semibold, color: Colors.neutral[700] },
  distRow: { flexDirection: 'row', alignItems: 'center', gap: 3 },
  distText: { fontSize: FontSize.sm, color: Colors.neutral[500] },
});
