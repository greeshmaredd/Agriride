import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { Colors, BorderRadius, FontSize, FontWeight, Spacing } from '@/constants/theme';

interface BadgeProps {
  label: string;
  variant?: 'success' | 'warning' | 'error' | 'info' | 'neutral' | 'primary';
  size?: 'sm' | 'md';
  style?: ViewStyle;
}

export function Badge({ label, variant = 'primary', size = 'md', style }: BadgeProps) {
  return (
    <View style={[styles.base, styles[variant], styles[`size_${size}`], style]}>
      <Text style={[styles.text, styles[`text_${variant}`], styles[`textSize_${size}`]]}>
        {label}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
    borderRadius: BorderRadius.full,
    alignSelf: 'flex-start',
  },
  size_sm: { paddingVertical: 2, paddingHorizontal: Spacing.xs },
  size_md: { paddingVertical: 4, paddingHorizontal: Spacing.sm },

  primary: { backgroundColor: Colors.primary[100] },
  success: { backgroundColor: Colors.success[50] },
  warning: { backgroundColor: Colors.warning[50] },
  error: { backgroundColor: Colors.error[50] },
  info: { backgroundColor: Colors.water[100] },
  neutral: { backgroundColor: Colors.neutral[100] },

  text: { fontWeight: FontWeight.semibold },
  textSize_sm: { fontSize: 10 },
  textSize_md: { fontSize: FontSize.xs },

  text_primary: { color: Colors.primary[700] },
  text_success: { color: Colors.success[700] },
  text_warning: { color: Colors.warning[700] },
  text_error: { color: Colors.error[700] },
  text_info: { color: Colors.water[700] },
  text_neutral: { color: Colors.neutral[600] },
});
