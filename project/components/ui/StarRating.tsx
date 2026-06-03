import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Star } from 'lucide-react-native';
import { Colors, FontSize, FontWeight, Spacing } from '@/constants/theme';

interface StarRatingProps {
  rating: number;
  maxStars?: number;
  size?: number;
  onRate?: (rating: number) => void;
  showNumber?: boolean;
  count?: number;
}

export function StarRating({ rating, maxStars = 5, size = 16, onRate, showNumber, count }: StarRatingProps) {
  return (
    <View style={styles.container}>
      {Array.from({ length: maxStars }).map((_, i) => {
        const filled = i < Math.floor(rating);
        const partial = !filled && i < rating;
        return (
          <TouchableOpacity
            key={i}
            onPress={() => onRate?.(i + 1)}
            disabled={!onRate}
            activeOpacity={0.7}
          >
            <Star
              size={size}
              color={filled || partial ? Colors.secondary[400] : Colors.neutral[300]}
              fill={filled ? Colors.secondary[400] : 'none'}
            />
          </TouchableOpacity>
        );
      })}
      {showNumber && (
        <Text style={styles.number}>
          {rating.toFixed(1)}{count !== undefined ? ` (${count})` : ''}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  number: {
    fontSize: FontSize.xs,
    fontWeight: FontWeight.semibold,
    color: Colors.neutral[600],
    marginLeft: Spacing.xs,
  },
});
