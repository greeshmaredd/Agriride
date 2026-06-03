import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import {
  Tractor, Scissors, Zap, Wrench, Droplet, Droplets,
  Truck, Users, Layers, ArrowLeft,
} from 'lucide-react-native';
import { Colors, FontSize, FontWeight, Spacing, BorderRadius, Shadow } from '@/constants/theme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

const categories = [
  { id: 'tractor', label: 'Tractor Work', desc: 'Ploughing, Rotavator, Trailer', icon: Tractor, color: Colors.primary[600], bg: '#dcfce7', gradient: [Colors.primary[500], Colors.primary[700]] as const, path: '/services/tractor' },
  { id: 'harvest', label: 'Harvesting', desc: 'Paddy, Wheat, Sugarcane', icon: Scissors, color: Colors.secondary[600], bg: '#fef9c3', gradient: [Colors.secondary[400], Colors.secondary[600]] as const, path: '/services/harvesting' },
  { id: 'sprayer', label: 'Fertilizer Sprayer', desc: 'Drone, Power, Tractor Sprayer', icon: Zap, color: Colors.accent[600], bg: '#fff7ed', gradient: [Colors.accent[400], Colors.accent[600]] as const, path: '/services/sprayer' },
  { id: 'jcb', label: 'JCB Services', desc: 'Leveling, Digging, Road', icon: Wrench, color: '#d97706', bg: '#fefce8', gradient: ['#f59e0b', '#d97706'] as const, path: '/services/jcb' },
  { id: 'borewell', label: 'Borewell', desc: 'Drilling, Motor Setup, Pipes', icon: Droplet, color: Colors.water[600], bg: '#eff6ff', gradient: [Colors.water[500], Colors.water[700]] as const, path: '/services/borewell' },
  { id: 'irrigation', label: 'Irrigation', desc: 'Drip, Sprinkler, Pump Rental', icon: Droplets, color: '#0891b2', bg: '#e0f2fe', gradient: ['#06b6d4', '#0891b2'] as const, path: '/services/irrigation' },
  { id: 'transport', label: 'Crop Transport', desc: 'Mini Truck, Auto, Pickup Van', icon: Truck, color: Colors.neutral[600], bg: Colors.neutral[100], gradient: [Colors.neutral[500], Colors.neutral[700]] as const, path: '/services/transport' },
  { id: 'labour', label: 'Labour Pickup', desc: 'Worker transport, Drop', icon: Users, color: '#7c3aed', bg: '#ede9fe', gradient: ['#8b5cf6', '#7c3aed'] as const, path: '/services/labour' },
  { id: 'traditional', label: 'Traditional', desc: 'Bullock cart, Village labour', icon: Layers, color: Colors.earth[600], bg: Colors.earth[50], gradient: [Colors.earth[400], Colors.earth[600]] as const, path: '/services/traditional' },
];

export default function CategoriesScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <ArrowLeft size={22} color={Colors.neutral[800]} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>All Services</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <Text style={styles.subtitle}>Choose the service you need for your farm</Text>
        <View style={styles.grid}>
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <TouchableOpacity
                key={cat.id}
                style={styles.card}
                onPress={() => router.push(cat.path as any)}
                activeOpacity={0.85}
              >
                <LinearGradient colors={cat.gradient} style={styles.cardGradient}>
                  <View style={styles.cardIconWrap}>
                    <Icon size={32} color={Colors.white} strokeWidth={1.8} />
                  </View>
                  <View style={styles.cardTextWrap}>
                    <Text style={styles.cardLabel}>{cat.label}</Text>
                    <Text style={styles.cardDesc}>{cat.desc}</Text>
                  </View>
                  <View style={styles.arrow}>
                    <Text style={styles.arrowText}>→</Text>
                  </View>
                </LinearGradient>
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.md,
    backgroundColor: Colors.white,
    borderBottomWidth: 1,
    borderBottomColor: Colors.neutral[100],
  },
  backBtn: {
    width: 40, height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.neutral[100],
  },
  headerTitle: {
    fontSize: FontSize.lg,
    fontWeight: FontWeight.bold,
    color: Colors.neutral[900],
  },
  scroll: { flex: 1 },
  scrollContent: { padding: Spacing.md, gap: Spacing.md },
  subtitle: {
    fontSize: FontSize.sm,
    color: Colors.neutral[500],
    marginBottom: Spacing.sm,
  },
  grid: { gap: 12 },
  card: {
    borderRadius: BorderRadius.xl,
    overflow: 'hidden',
    ...Shadow.md,
  },
  cardGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.md,
    gap: Spacing.md,
  },
  cardIconWrap: {
    width: 60,
    height: 60,
    borderRadius: 18,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  cardTextWrap: { flex: 1 },
  cardLabel: {
    fontSize: FontSize.lg,
    fontWeight: FontWeight.bold,
    color: Colors.white,
    marginBottom: 4,
  },
  cardDesc: {
    fontSize: FontSize.sm,
    color: 'rgba(255,255,255,0.85)',
  },
  arrow: {
    width: 36, height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255,255,255,0.25)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  arrowText: { fontSize: FontSize.lg, color: Colors.white, fontWeight: FontWeight.bold },
});
