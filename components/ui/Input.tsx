import React from 'react';
import { View, Text, TextInput, StyleSheet, ViewStyle } from 'react-native';
import { Colors, BorderRadius, FontSize, FontWeight, Spacing } from '@/constants/theme';

interface InputProps {
  label?: string;
  placeholder?: string;
  value: string;
  onChangeText: (text: string) => void;
  keyboardType?: 'default' | 'number-pad' | 'email-address' | 'phone-pad';
  secureTextEntry?: boolean;
  multiline?: boolean;
  numberOfLines?: number;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  error?: string;
  style?: ViewStyle;
  editable?: boolean;
  maxLength?: number;
}

export function Input({
  label,
  placeholder,
  value,
  onChangeText,
  keyboardType = 'default',
  secureTextEntry,
  multiline,
  numberOfLines,
  leftIcon,
  rightIcon,
  error,
  style,
  editable = true,
  maxLength,
}: InputProps) {
  return (
    <View style={[styles.container, style]}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View style={[styles.inputWrapper, error ? styles.inputError : {}, !editable ? styles.inputDisabled : {}]}>
        {leftIcon && <View style={styles.leftIcon}>{leftIcon}</View>}
        <TextInput
          style={[
            styles.input,
            leftIcon ? styles.inputWithLeft : {},
            rightIcon ? styles.inputWithRight : {},
            multiline ? styles.multilineInput : {},
          ]}
          placeholder={placeholder}
          placeholderTextColor={Colors.neutral[400]}
          value={value}
          onChangeText={onChangeText}
          keyboardType={keyboardType}
          secureTextEntry={secureTextEntry}
          multiline={multiline}
          numberOfLines={numberOfLines}
          editable={editable}
          maxLength={maxLength}
        />
        {rightIcon && <View style={styles.rightIcon}>{rightIcon}</View>}
      </View>
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { gap: 6 },
  label: {
    fontSize: FontSize.sm,
    fontWeight: FontWeight.semibold,
    color: Colors.neutral[700],
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.md,
    borderWidth: 1.5,
    borderColor: Colors.neutral[200],
    minHeight: 52,
  },
  inputError: { borderColor: Colors.error[500] },
  inputDisabled: { backgroundColor: Colors.neutral[50] },
  input: {
    flex: 1,
    fontSize: FontSize.md,
    color: Colors.neutral[900],
    paddingHorizontal: Spacing.md,
    paddingVertical: 12,
  },
  inputWithLeft: { paddingLeft: 0 },
  inputWithRight: { paddingRight: 0 },
  multilineInput: { minHeight: 100, textAlignVertical: 'top' },
  leftIcon: { paddingLeft: Spacing.md, paddingRight: Spacing.sm },
  rightIcon: { paddingRight: Spacing.md, paddingLeft: Spacing.sm },
  errorText: {
    fontSize: FontSize.xs,
    color: Colors.error[600],
    marginTop: 2,
  },
});
