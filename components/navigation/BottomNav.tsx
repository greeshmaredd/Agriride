import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter, usePathname } from 'expo-router';
import { Home, Search, BookOpen, Bell, User } from 'lucide-react-native';
import { Colors, FontSize, FontWeight, Shadow } from '@/constants/theme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const tabs = [
  { label: 'Home', icon: Home, path: '/(tabs)/home' },
  { label: 'Search', icon: Search, path: '/(tabs)/search' },
  { label: 'Bookings', icon: BookOpen, path: '/(tabs)/bookings' },
  { label: 'Alerts', icon: Bell, path: '/(tabs)/notifications' },
  { label: 'Profile', icon: User, path: '/(tabs)/profile' },
];

export function BottomNav() {
  const router = useRouter();
  const pathname = usePathname();
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingBottom: insets.bottom + 8 }]}>
      {tabs.map((tab) => {
        const active = pathname.startsWith(tab.path);
        const Icon = tab.icon;
        return (
          <TouchableOpacity
            key={tab.path}
            style={styles.tab}
            onPress={() => router.push(tab.path as any)}
            activeOpacity={0.7}
          >
            <View style={[styles.iconWrap, active && styles.iconWrapActive]}>
              <Icon
                size={22}
                color={active ? Colors.primary[600] : Colors.neutral[400]}
                strokeWidth={active ? 2.5 : 2}
              />
            </View>
            <Text style={[styles.label, active && styles.labelActive]}>{tab.label}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: Colors.white,
    borderTopWidth: 1,
    borderTopColor: Colors.neutral[100],
    paddingTop: 8,
    ...Shadow.md,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    gap: 4,
  },
  iconWrap: {
    width: 44,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconWrapActive: {
    backgroundColor: Colors.primary[50],
  },
  label: {
    fontSize: 10,
    fontWeight: FontWeight.medium,
    color: Colors.neutral[400],
  },
  labelActive: {
    color: Colors.primary[600],
    fontWeight: FontWeight.semibold,
  },
});
