import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Image,
} from 'react-native';
import { useRouter } from 'expo-router';
import { ArrowLeft, Star, ThumbsUp, Send } from 'lucide-react-native';
import { Colors, FontSize, FontWeight, Spacing, BorderRadius, Shadow } from '@/constants/theme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const ratingDimensions = [
  { id: 'overall', label: 'Overall Service' },
  { id: 'punctuality', label: 'Punctuality' },
  { id: 'quality', label: 'Work Quality' },
  { id: 'condition', label: 'Machine Condition' },
  { id: 'behavior', label: 'Behavior & Attitude' },
];

const existingReviews = [
  { id: 1, name: 'Venkat Rao', avatar: 'https://images.pexels.com/photos/1139541/pexels-photo-1139541.jpeg?auto=compress&cs=tinysrgb&w=100', rating: 5, text: 'Excellent work! Came on time and completed the ploughing within 3 hours. Machine was in perfect condition. Will definitely book again.', date: '28 May 2026', helpful: 12 },
  { id: 2, name: 'Lakshmi Devi', avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100', rating: 4, text: 'Good service overall. Slight delay but the work quality was very good. The tractor operator was friendly and helpful.', date: '20 May 2026', helpful: 7 },
  { id: 3, name: 'Ravi Shankar', avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=100', rating: 5, text: 'Best tractor service in our area. Ramu bhai knows every inch of the land. Professional and efficient.', date: '15 May 2026', helpful: 19 },
];

function StarInput({ value, onChange }: { value: number; onChange: (v: number) => void }) {
  return (
    <View style={{ flexDirection: 'row', gap: 6 }}>
      {[1, 2, 3, 4, 5].map(s => (
        <TouchableOpacity key={s} onPress={() => onChange(s)}>
          <Star
            size={28}
            color={s <= value ? Colors.secondary[400] : Colors.neutral[300]}
            fill={s <= value ? Colors.secondary[400] : 'transparent'}
          />
        </TouchableOpacity>
      ))}
    </View>
  );
}

function SmallStarInput({ value, onChange }: { value: number; onChange: (v: number) => void }) {
  return (
    <View style={{ flexDirection: 'row', gap: 4 }}>
      {[1, 2, 3, 4, 5].map(s => (
        <TouchableOpacity key={s} onPress={() => onChange(s)}>
          <Star
            size={18}
            color={s <= value ? Colors.secondary[400] : Colors.neutral[300]}
            fill={s <= value ? Colors.secondary[400] : 'transparent'}
          />
        </TouchableOpacity>
      ))}
    </View>
  );
}

function StarDisplay({ value }: { value: number }) {
  return (
    <View style={{ flexDirection: 'row', gap: 2 }}>
      {[1, 2, 3, 4, 5].map(s => (
        <Star
          key={s}
          size={14}
          color={s <= value ? Colors.secondary[400] : Colors.neutral[300]}
          fill={s <= value ? Colors.secondary[400] : 'transparent'}
        />
      ))}
    </View>
  );
}

export default function ReviewsScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [ratings, setRatings] = useState<Record<string, number>>({ overall: 0, punctuality: 0, quality: 0, condition: 0, behavior: 0 });
  const [review, setReview] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (ratings.overall === 0) return;
    setSubmitted(true);
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <ArrowLeft size={22} color={Colors.neutral[800]} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Reviews & Ratings</Text>
        <View style={{ width: 36 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <View style={styles.serviceCard}>
          <Image source={{ uri: 'https://images.pexels.com/photos/2889890/pexels-photo-2889890.jpeg?auto=compress&cs=tinysrgb&w=200' }} style={styles.serviceImage} />
          <View style={styles.serviceInfo}>
            <Text style={styles.serviceName}>Tractor Ploughing</Text>
            <Text style={styles.providerName}>Ramu Kumar</Text>
            <Text style={styles.bookingId}>#AR-2026-4521 • 10 Jun 2026</Text>
          </View>
        </View>

        {!submitted ? (
          <View style={styles.reviewForm}>
            <Text style={styles.sectionTitle}>Rate Your Experience</Text>

            <View style={styles.overallRating}>
              <Text style={styles.overallLabel}>Overall Rating</Text>
              <StarInput value={ratings.overall} onChange={v => setRatings(p => ({ ...p, overall: v }))} />
              {ratings.overall > 0 && (
                <Text style={styles.ratingWord}>
                  {['', 'Poor', 'Fair', 'Good', 'Very Good', 'Excellent!'][ratings.overall]}
                </Text>
              )}
            </View>

            <View style={styles.dimensionsCard}>
              {ratingDimensions.slice(1).map(dim => (
                <View key={dim.id} style={styles.dimensionRow}>
                  <Text style={styles.dimensionLabel}>{dim.label}</Text>
                  <SmallStarInput
                    value={ratings[dim.id] || 0}
                    onChange={v => setRatings(p => ({ ...p, [dim.id]: v }))}
                  />
                </View>
              ))}
            </View>

            <View style={styles.reviewTextCard}>
              <Text style={styles.fieldLabel}>Write a Review</Text>
              <TextInput
                style={styles.reviewInput}
                placeholder="Share your experience with this service..."
                placeholderTextColor={Colors.neutral[400]}
                value={review}
                onChangeText={setReview}
                multiline
                numberOfLines={4}
                textAlignVertical="top"
              />
              <Text style={styles.charCount}>{review.length}/300</Text>
            </View>

            <TouchableOpacity
              style={[styles.submitBtn, ratings.overall === 0 && styles.submitBtnDisabled]}
              onPress={handleSubmit}
              disabled={ratings.overall === 0}
            >
              <Send size={16} color={Colors.white} />
              <Text style={styles.submitBtnText}>Submit Review</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.successCard}>
            <Text style={styles.successEmoji}>🎉</Text>
            <Text style={styles.successTitle}>Thank You!</Text>
            <Text style={styles.successText}>Your review helps other farmers make better decisions.</Text>
          </View>
        )}

        <View style={styles.reviewsSection}>
          <View style={styles.reviewsHeader}>
            <Text style={styles.sectionTitle}>Other Reviews</Text>
            <View style={styles.avgRatingWrap}>
              <Text style={styles.avgRatingNum}>4.8</Text>
              <StarDisplay value={5} />
              <Text style={styles.reviewCountText}>(47 reviews)</Text>
            </View>
          </View>

          {existingReviews.map(r => (
            <View key={r.id} style={styles.reviewCard}>
              <View style={styles.reviewerRow}>
                <Image source={{ uri: r.avatar }} style={styles.reviewerAvatar} />
                <View style={styles.reviewerInfo}>
                  <Text style={styles.reviewerName}>{r.name}</Text>
                  <StarDisplay value={r.rating} />
                </View>
                <Text style={styles.reviewDate}>{r.date}</Text>
              </View>
              <Text style={styles.reviewText}>{r.text}</Text>
              <TouchableOpacity style={styles.helpfulBtn}>
                <ThumbsUp size={12} color={Colors.neutral[500]} />
                <Text style={styles.helpfulText}>Helpful ({r.helpful})</Text>
              </TouchableOpacity>
            </View>
          ))}
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
  serviceCard: {
    flexDirection: 'row', backgroundColor: Colors.white, borderRadius: BorderRadius.lg,
    overflow: 'hidden', ...Shadow.sm,
  },
  serviceImage: { width: 80, height: 80 },
  serviceInfo: { flex: 1, padding: Spacing.md, justifyContent: 'center', gap: 3 },
  serviceName: { fontSize: FontSize.md, fontWeight: FontWeight.bold, color: Colors.neutral[900] },
  providerName: { fontSize: FontSize.sm, color: Colors.neutral[600] },
  bookingId: { fontSize: FontSize.xs, color: Colors.neutral[400] },
  reviewForm: { gap: Spacing.md },
  sectionTitle: { fontSize: FontSize.lg, fontWeight: FontWeight.bold, color: Colors.neutral[900] },
  overallRating: {
    backgroundColor: Colors.white, borderRadius: BorderRadius.lg, padding: Spacing.md,
    alignItems: 'center', gap: 10, ...Shadow.sm,
  },
  overallLabel: { fontSize: FontSize.md, color: Colors.neutral[700], fontWeight: FontWeight.semibold },
  ratingWord: { fontSize: FontSize.lg, fontWeight: FontWeight.bold, color: Colors.secondary[500] },
  dimensionsCard: {
    backgroundColor: Colors.white, borderRadius: BorderRadius.lg, padding: Spacing.md,
    gap: 12, ...Shadow.sm,
  },
  dimensionRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  dimensionLabel: { fontSize: FontSize.sm, color: Colors.neutral[700], fontWeight: FontWeight.medium },
  reviewTextCard: {
    backgroundColor: Colors.white, borderRadius: BorderRadius.lg, padding: Spacing.md,
    gap: 8, ...Shadow.sm,
  },
  fieldLabel: { fontSize: FontSize.sm, fontWeight: FontWeight.semibold, color: Colors.neutral[800] },
  reviewInput: {
    backgroundColor: Colors.neutral[50], borderRadius: BorderRadius.md,
    padding: Spacing.md, fontSize: FontSize.sm, color: Colors.neutral[900],
    minHeight: 100, borderWidth: 1, borderColor: Colors.neutral[200],
  },
  charCount: { fontSize: FontSize.xs, color: Colors.neutral[400], textAlign: 'right' },
  submitBtn: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8,
    backgroundColor: Colors.primary[600], borderRadius: BorderRadius.lg, paddingVertical: 14,
  },
  submitBtnDisabled: { backgroundColor: Colors.neutral[300] },
  submitBtnText: { fontSize: FontSize.md, fontWeight: FontWeight.bold, color: Colors.white },
  successCard: {
    backgroundColor: Colors.white, borderRadius: BorderRadius.xl, padding: Spacing.xl,
    alignItems: 'center', gap: 10, ...Shadow.sm,
  },
  successEmoji: { fontSize: 48 },
  successTitle: { fontSize: FontSize.xxl, fontWeight: FontWeight.bold, color: Colors.success[700] },
  successText: { fontSize: FontSize.sm, color: Colors.neutral[600], textAlign: 'center' },
  reviewsSection: { gap: Spacing.md },
  reviewsHeader: { gap: 6 },
  avgRatingWrap: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  avgRatingNum: { fontSize: FontSize.xxl, fontWeight: FontWeight.bold, color: Colors.neutral[900] },
  reviewCountText: { fontSize: FontSize.xs, color: Colors.neutral[500] },
  reviewCard: {
    backgroundColor: Colors.white, borderRadius: BorderRadius.lg, padding: Spacing.md,
    gap: 10, ...Shadow.sm,
  },
  reviewerRow: { flexDirection: 'row', alignItems: 'center', gap: Spacing.sm },
  reviewerAvatar: { width: 40, height: 40, borderRadius: 20 },
  reviewerInfo: { flex: 1, gap: 3 },
  reviewerName: { fontSize: FontSize.sm, fontWeight: FontWeight.bold, color: Colors.neutral[900] },
  reviewDate: { fontSize: FontSize.xs, color: Colors.neutral[400] },
  reviewText: { fontSize: FontSize.sm, color: Colors.neutral[700], lineHeight: 20 },
  helpfulBtn: {
    flexDirection: 'row', alignItems: 'center', gap: 4, alignSelf: 'flex-start',
    paddingVertical: 4, paddingHorizontal: 10, borderRadius: BorderRadius.full,
    backgroundColor: Colors.neutral[100],
  },
  helpfulText: { fontSize: FontSize.xs, color: Colors.neutral[600] },
});
