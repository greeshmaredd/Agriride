import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { Colors, BorderRadius, Shadow, Spacing } from '@/constants/theme';

interface CardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  variant?: 'default' | 'elevated' | 'flat' | 'green' | 'cream';
  padding?: number;
}

export function Card({ children, style, variant = 'default', padding }: CardProps) {
  return (
    <View
      style={[
        styles.base,
        styles[variant],
        padding !== undefined ? { padding } : {},
        style,
      ]}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    backgroundColor: Colors.white,
  },
  default: {
    backgroundColor: Colors.white,
    ...Shadow.sm,
  },
  elevated: {
    backgroundColor: Colors.white,
    ...Shadow.md,
  },
  flat: {
    backgroundColor: Colors.neutral[50],
    borderWidth: 1,
    borderColor: Colors.neutral[200],
  },
  green: {
    backgroundColor: Colors.primary[50],
    borderWidth: 1,
    borderColor: Colors.primary[200],
  },
  cream: {
    backgroundColor: Colors.cream,
    ...Shadow.sm,
  },
});
