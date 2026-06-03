import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { Colors, BorderRadius, FontSize, FontWeight, Shadow, Spacing } from '@/constants/theme';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  disabled?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  fullWidth?: boolean;
}

export function Button({
  title,
  onPress,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  style,
  textStyle,
  fullWidth = false,
}: ButtonProps) {
  const buttonStyles: ViewStyle[] = [
    styles.base,
    styles[`size_${size}`],
    styles[`variant_${variant}`],
    fullWidth ? styles.fullWidth : {},
    disabled || loading ? styles.disabled : {},
    style || {},
  ];

  const textStyles: TextStyle[] = [
    styles.text_base,
    styles[`text_size_${size}`],
    styles[`text_variant_${variant}`],
    textStyle || {},
  ];

  return (
    <TouchableOpacity
      style={buttonStyles}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.82}
    >
      {loading ? (
        <ActivityIndicator
          color={variant === 'outline' || variant === 'ghost' ? Colors.primary[600] : Colors.white}
          size="small"
        />
      ) : (
        <Text style={textStyles}>{title}</Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  base: {
    borderRadius: BorderRadius.lg,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  fullWidth: { width: '100%' },
  disabled: { opacity: 0.5 },

  size_sm: { paddingVertical: Spacing.xs, paddingHorizontal: Spacing.md, minHeight: 36 },
  size_md: { paddingVertical: 14, paddingHorizontal: Spacing.lg, minHeight: 50 },
  size_lg: { paddingVertical: 18, paddingHorizontal: Spacing.xl, minHeight: 58 },

  variant_primary: {
    backgroundColor: Colors.primary[600],
    ...Shadow.green,
  },
  variant_secondary: {
    backgroundColor: Colors.secondary[400],
    ...Shadow.sm,
  },
  variant_outline: {
    backgroundColor: Colors.transparent,
    borderWidth: 1.5,
    borderColor: Colors.primary[600],
  },
  variant_ghost: {
    backgroundColor: Colors.primary[50],
  },
  variant_danger: {
    backgroundColor: Colors.error[600],
    ...Shadow.sm,
  },

  text_base: {
    fontWeight: FontWeight.semibold,
    letterSpacing: 0.3,
  },
  text_size_sm: { fontSize: FontSize.sm },
  text_size_md: { fontSize: FontSize.md },
  text_size_lg: { fontSize: FontSize.lg },

  text_variant_primary: { color: Colors.white },
  text_variant_secondary: { color: Colors.neutral[900] },
  text_variant_outline: { color: Colors.primary[600] },
  text_variant_ghost: { color: Colors.primary[700] },
  text_variant_danger: { color: Colors.white },
});
