import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity,
} from 'react-native';
import { useRouter } from 'expo-router';
import { ArrowLeft, Phone, MessageCircle, ChevronDown, ChevronUp, HelpCircle, FileText, ChevronRight } from 'lucide-react-native';
import { Colors, FontSize, FontWeight, Spacing, BorderRadius, Shadow } from '@/constants/theme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const faqs = [
  { id: 1, q: 'How do I cancel a booking?', a: 'Go to My Bookings, select the booking, and tap Cancel. Free cancellation up to 2 hours before the scheduled time. Late cancellations may incur a ₹100 fee.' },
  { id: 2, q: 'How is the service price calculated?', a: 'Prices are based on acreage, service type, distance, and seasonal demand. Our AI gives you a fair estimate before you book. No hidden charges.' },
  { id: 3, q: 'What if the provider doesn\'t show up?', a: 'If the provider doesn\'t arrive within 30 minutes, you get a full refund automatically. You can also raise a complaint for faster resolution.' },
  { id: 4, q: 'How do I track my tractor in real-time?', a: 'After booking is confirmed, tap "Track Vehicle" on your booking card. You\'ll see live GPS location of your provider on the map.' },
  { id: 5, q: 'Can I reschedule a booking?', a: 'Yes! Open the booking, tap "Reschedule", and pick a new date/time. Free rescheduling up to 24 hours before the service.' },
  { id: 6, q: 'How do I add my farm location?', a: 'In Profile > Edit Profile, use the GPS button to auto-detect your location or search for your village/survey number.' },
];

const quickLinks = [
  { id: 'account', label: 'Account & Profile', icon: '👤' },
  { id: 'booking', label: 'Booking Issues', icon: '📋' },
  { id: 'payment', label: 'Payment & Refunds', icon: '💳' },
  { id: 'tracking', label: 'GPS Tracking', icon: '📍' },
  { id: 'provider', label: 'Provider Issues', icon: '🚜' },
  { id: 'app', label: 'App Technical Issues', icon: '📱' },
];

function FaqItem({ faq }: { faq: typeof faqs[0] }) {
  const [open, setOpen] = useState(false);
  return (
    <TouchableOpacity style={styles.faqItem} onPress={() => setOpen(!open)} activeOpacity={0.8}>
      <View style={styles.faqRow}>
        <Text style={styles.faqQuestion}>{faq.q}</Text>
        {open ? <ChevronUp size={18} color={Colors.primary[600]} /> : <ChevronDown size={18} color={Colors.neutral[500]} />}
      </View>
      {open && <Text style={styles.faqAnswer}>{faq.a}</Text>}
    </TouchableOpacity>
  );
}

export default function SupportScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <ArrowLeft size={22} color={Colors.neutral[800]} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Help & Support</Text>
        <View style={{ width: 36 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <View style={styles.heroCard}>
          <Text style={styles.heroEmoji}>🤝</Text>
          <Text style={styles.heroTitle}>How can we help you?</Text>
          <Text style={styles.heroSubtitle}>We're available 6 AM - 10 PM every day</Text>
        </View>

        <View style={styles.contactRow}>
          <TouchableOpacity style={styles.contactCard}>
            <View style={[styles.contactIcon, { backgroundColor: Colors.primary[50] }]}>
              <Phone size={22} color={Colors.primary[600]} />
            </View>
            <Text style={styles.contactLabel}>Call Us</Text>
            <Text style={styles.contactValue}>1800-XXX-XXXX</Text>
            <Text style={styles.contactNote}>Free • 24/7</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.contactCard} onPress={() => router.push('/services/chat')}>
            <View style={[styles.contactIcon, { backgroundColor: Colors.secondary[50] }]}>
              <MessageCircle size={22} color={Colors.secondary[600]} />
            </View>
            <Text style={styles.contactLabel}>Live Chat</Text>
            <Text style={styles.contactValue}>Start Chat</Text>
            <Text style={styles.contactNote}>Avg. 2 min reply</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.contactCard} onPress={() => router.push('/services/complaint')}>
            <View style={[styles.contactIcon, { backgroundColor: Colors.error[50] }]}>
              <FileText size={22} color={Colors.error[600]} />
            </View>
            <Text style={styles.contactLabel}>Complaints</Text>
            <Text style={styles.contactValue}>Raise Issue</Text>
            <Text style={styles.contactNote}>24hr resolution</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.trackingCard}>
          <View style={styles.trackingLeft}>
            <HelpCircle size={20} color={Colors.primary[600]} />
            <View>
              <Text style={styles.trackingTitle}>Track Your Complaint</Text>
              <Text style={styles.trackingSubtitle}>Check status of your open tickets</Text>
            </View>
          </View>
          <ChevronRight size={18} color={Colors.primary[600]} />
        </View>

        <Text style={styles.sectionTitle}>Browse by Topic</Text>
        <View style={styles.quickLinksGrid}>
          {quickLinks.map(link => (
            <TouchableOpacity key={link.id} style={styles.quickLinkCard} activeOpacity={0.8}>
              <Text style={styles.quickLinkEmoji}>{link.icon}</Text>
              <Text style={styles.quickLinkLabel}>{link.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.sectionTitle}>Frequently Asked Questions</Text>
        <View style={styles.faqList}>
          {faqs.map(faq => (
            <FaqItem key={faq.id} faq={faq} />
          ))}
        </View>

        <View style={styles.languageNote}>
          <Text style={styles.languageNoteIcon}>🌐</Text>
          <View style={{ flex: 1 }}>
            <Text style={styles.languageNoteTitle}>Need help in your language?</Text>
            <Text style={styles.languageNoteText}>Our agents speak Telugu, Tamil, Hindi, Kannada, and more.</Text>
          </View>
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
  heroCard: {
    backgroundColor: Colors.primary[600], borderRadius: BorderRadius.xl,
    padding: Spacing.xl, alignItems: 'center', gap: 6,
  },
  heroEmoji: { fontSize: 40 },
  heroTitle: { fontSize: FontSize.xl, fontWeight: FontWeight.bold, color: Colors.white },
  heroSubtitle: { fontSize: FontSize.sm, color: 'rgba(255,255,255,0.85)' },
  contactRow: { flexDirection: 'row', gap: Spacing.sm },
  contactCard: {
    flex: 1, backgroundColor: Colors.white, borderRadius: BorderRadius.lg,
    padding: Spacing.md, alignItems: 'center', gap: 6, ...Shadow.sm,
  },
  contactIcon: { width: 48, height: 48, borderRadius: 24, alignItems: 'center', justifyContent: 'center' },
  contactLabel: { fontSize: FontSize.xs, color: Colors.neutral[500], fontWeight: FontWeight.medium },
  contactValue: { fontSize: FontSize.sm, fontWeight: FontWeight.bold, color: Colors.neutral[900] },
  contactNote: { fontSize: 10, color: Colors.primary[600], fontWeight: FontWeight.medium },
  trackingCard: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    backgroundColor: Colors.primary[50], borderRadius: BorderRadius.lg, padding: Spacing.md,
    borderWidth: 1, borderColor: Colors.primary[100],
  },
  trackingLeft: { flexDirection: 'row', alignItems: 'center', gap: Spacing.sm },
  trackingTitle: { fontSize: FontSize.sm, fontWeight: FontWeight.bold, color: Colors.primary[800] },
  trackingSubtitle: { fontSize: FontSize.xs, color: Colors.primary[600] },
  sectionTitle: { fontSize: FontSize.lg, fontWeight: FontWeight.bold, color: Colors.neutral[900] },
  quickLinksGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.sm },
  quickLinkCard: {
    width: '31%', backgroundColor: Colors.white, borderRadius: BorderRadius.lg,
    padding: Spacing.md, alignItems: 'center', gap: 8, ...Shadow.sm,
  },
  quickLinkEmoji: { fontSize: 28 },
  quickLinkLabel: { fontSize: FontSize.xs, fontWeight: FontWeight.semibold, color: Colors.neutral[700], textAlign: 'center' },
  faqList: { backgroundColor: Colors.white, borderRadius: BorderRadius.xl, overflow: 'hidden', ...Shadow.sm },
  faqItem: {
    padding: Spacing.md, borderBottomWidth: 1, borderBottomColor: Colors.neutral[100],
  },
  faqRow: { flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between', gap: Spacing.sm },
  faqQuestion: { flex: 1, fontSize: FontSize.sm, fontWeight: FontWeight.semibold, color: Colors.neutral[800], lineHeight: 20 },
  faqAnswer: { fontSize: FontSize.sm, color: Colors.neutral[600], lineHeight: 22, marginTop: 10 },
  languageNote: {
    flexDirection: 'row', alignItems: 'center', gap: Spacing.md,
    backgroundColor: Colors.secondary[50], borderRadius: BorderRadius.lg, padding: Spacing.md,
    borderWidth: 1, borderColor: Colors.secondary[200],
  },
  languageNoteIcon: { fontSize: 28 },
  languageNoteTitle: { fontSize: FontSize.sm, fontWeight: FontWeight.bold, color: Colors.secondary[800] },
  languageNoteText: { fontSize: FontSize.xs, color: Colors.secondary[700], marginTop: 2 },
});
