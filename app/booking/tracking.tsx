import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { ArrowLeft, Phone, MessageCircle, Navigation, Clock, CheckCircle, Loader } from 'lucide-react-native';
import { Colors, FontSize, FontWeight, Spacing, BorderRadius, Shadow } from '@/constants/theme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const { width, height } = Dimensions.get('window');

const statusSteps = [
  { id: 1, label: 'Booking Confirmed', done: true, time: '6:30 AM' },
  { id: 2, label: 'Provider is on the way', done: true, time: '6:45 AM' },
  { id: 3, label: 'Arrived at location', done: false, time: '~7:12 AM' },
  { id: 4, label: 'Service in progress', done: false, time: '~7:15 AM' },
  { id: 5, label: 'Service completed', done: false, time: '~11:15 AM' },
];

function LiveMapMini() {
  return (
    <LinearGradient colors={['#d1fae5', '#a7f3d0']} style={mapStyles.container}>
      {[0,1,2,3].map(i => <View key={`h${i}`} style={[mapStyles.gridH, { top: i * 90 }]} />)}
      {[0,1,2,3].map(i => <View key={`v${i}`} style={[mapStyles.gridV, { left: i * 90 }]} />)}
      <View style={[mapStyles.road, { top: '50%', left: 0, right: 0 }]} />
      <View style={[mapStyles.road, { left: '50%', top: 0, bottom: 0, width: 10, height: undefined }]} />

      <View style={[mapStyles.pin, { bottom: 60, left: 60 }]}>
        <View style={mapStyles.farmPin}><Text style={{ fontSize: 16 }}>🌾</Text></View>
        <Text style={mapStyles.farmLabel}>Your Farm</Text>
      </View>

      <View style={[mapStyles.pin, { top: 60, right: 80 }]}>
        <View style={mapStyles.tractorPin}><Text style={{ fontSize: 20 }}>🚜</Text></View>
        <Text style={mapStyles.tractorLabel}>Ramu</Text>
      </View>

      <View style={mapStyles.etaBubble}>
        <Clock size={12} color={Colors.primary[600]} />
        <Text style={mapStyles.etaText}>12 min ETA</Text>
      </View>
    </LinearGradient>
  );
}

export default function TrackingScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.mapSection}>
        <LiveMapMini />
        <View style={styles.topBar}>
          <TouchableOpacity style={styles.topBtn} onPress={() => router.back()}>
            <ArrowLeft size={20} color={Colors.neutral[800]} />
          </TouchableOpacity>
          <View style={styles.statusPill}>
            <View style={styles.statusDot} />
            <Text style={styles.statusPillText}>Provider En Route</Text>
          </View>
          <TouchableOpacity style={styles.topBtn}>
            <Navigation size={20} color={Colors.primary[600]} />
          </TouchableOpacity>
        </View>
      </View>

      <View style={[styles.bottomSheet, { paddingBottom: insets.bottom + 16 }]}>
        <View style={styles.sheetHandle} />

        <View style={styles.providerRow}>
          <View style={styles.providerAvatar}><Text style={{ fontSize: 26 }}>👨‍🌾</Text></View>
          <View style={{ flex: 1 }}>
            <Text style={styles.providerName}>Ramu Kumar</Text>
            <Text style={styles.providerVehicle}>Mahindra 575 DI • KL 09 AX 1234</Text>
            <View style={styles.etaRow}>
              <Clock size={14} color={Colors.primary[600]} />
              <Text style={styles.etaText}>Arriving in 12 minutes</Text>
            </View>
          </View>
          <View style={styles.contactBtns}>
            <TouchableOpacity style={styles.contactBtn} onPress={() => router.push('/services/call-provider')}>
              <Phone size={18} color={Colors.white} />
            </TouchableOpacity>
            <TouchableOpacity style={[styles.contactBtn, styles.chatBtn]} onPress={() => router.push('/services/chat')}>
              <MessageCircle size={18} color={Colors.primary[600]} />
            </TouchableOpacity>
          </View>
        </View>

        <Text style={styles.timelineTitle}>Booking Status</Text>
        <View style={styles.timeline}>
          {statusSteps.map((step, i) => (
            <View key={step.id} style={styles.timelineItem}>
              <View style={styles.timelineLeft}>
                <View style={[styles.timelineDot, step.done && styles.timelineDotDone, !step.done && i === statusSteps.findIndex(s => !s.done) && styles.timelineDotActive]}>
                  {step.done
                    ? <CheckCircle size={16} color={Colors.white} />
                    : i === statusSteps.findIndex(s => !s.done)
                    ? <View style={styles.activePulse} />
                    : null
                  }
                </View>
                {i < statusSteps.length - 1 && (
                  <View style={[styles.timelineLine, step.done && styles.timelineLineDone]} />
                )}
              </View>
              <View style={styles.timelineContent}>
                <Text style={[styles.timelineLabel, step.done && styles.timelineLabelDone]}>
                  {step.label}
                </Text>
                <Text style={styles.timelineTime}>{step.time}</Text>
              </View>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.neutral[50] },
  mapSection: { height: height * 0.42, position: 'relative' },
  topBar: {
    position: 'absolute', top: 0, left: 0, right: 0,
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: Spacing.md, paddingTop: Spacing.md,
  },
  topBtn: {
    width: 42, height: 42, borderRadius: 21,
    backgroundColor: 'rgba(255,255,255,0.95)',
    alignItems: 'center', justifyContent: 'center',
    ...Shadow.sm,
  },
  statusPill: {
    flexDirection: 'row', alignItems: 'center', gap: 8,
    backgroundColor: 'rgba(255,255,255,0.95)',
    borderRadius: BorderRadius.full,
    paddingHorizontal: 14, paddingVertical: 8,
    ...Shadow.sm,
  },
  statusDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: Colors.success[500] },
  statusPillText: { fontSize: FontSize.sm, fontWeight: FontWeight.semibold, color: Colors.neutral[800] },
  bottomSheet: {
    flex: 1,
    backgroundColor: Colors.white,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    padding: Spacing.lg,
    paddingTop: Spacing.md,
    gap: Spacing.md,
    ...Shadow.lg,
  },
  sheetHandle: {
    width: 40, height: 4, borderRadius: 2,
    backgroundColor: Colors.neutral[200],
    alignSelf: 'center', marginBottom: 4,
  },
  providerRow: { flexDirection: 'row', alignItems: 'center', gap: Spacing.md },
  providerAvatar: {
    width: 56, height: 56, borderRadius: 28,
    backgroundColor: Colors.primary[50],
    alignItems: 'center', justifyContent: 'center',
  },
  providerName: { fontSize: FontSize.md, fontWeight: FontWeight.bold, color: Colors.neutral[900] },
  providerVehicle: { fontSize: FontSize.xs, color: Colors.neutral[500] },
  etaRow: { flexDirection: 'row', alignItems: 'center', gap: 5, marginTop: 3 },
  etaText: { fontSize: FontSize.sm, fontWeight: FontWeight.semibold, color: Colors.primary[600] },
  contactBtns: { gap: 8 },
  contactBtn: {
    width: 40, height: 40, borderRadius: 20,
    backgroundColor: Colors.primary[600],
    alignItems: 'center', justifyContent: 'center',
  },
  chatBtn: { backgroundColor: Colors.primary[50], borderWidth: 1.5, borderColor: Colors.primary[200] },
  timelineTitle: { fontSize: FontSize.md, fontWeight: FontWeight.bold, color: Colors.neutral[900] },
  timeline: { gap: 0 },
  timelineItem: { flexDirection: 'row', gap: 12 },
  timelineLeft: { alignItems: 'center', width: 24 },
  timelineDot: {
    width: 24, height: 24, borderRadius: 12,
    backgroundColor: Colors.neutral[200],
    alignItems: 'center', justifyContent: 'center',
    zIndex: 1,
  },
  timelineDotDone: { backgroundColor: Colors.success[500] },
  timelineDotActive: { backgroundColor: Colors.primary[600] },
  activePulse: { width: 10, height: 10, borderRadius: 5, backgroundColor: Colors.white },
  timelineLine: {
    flex: 1, width: 2,
    backgroundColor: Colors.neutral[200],
    marginVertical: 2, minHeight: 30,
  },
  timelineLineDone: { backgroundColor: Colors.success[400] },
  timelineContent: { flex: 1, paddingBottom: 14 },
  timelineLabel: { fontSize: FontSize.sm, fontWeight: FontWeight.medium, color: Colors.neutral[500] },
  timelineLabelDone: { color: Colors.neutral[900], fontWeight: FontWeight.semibold },
  timelineTime: { fontSize: FontSize.xs, color: Colors.neutral[400], marginTop: 2 },
});

const mapStyles = StyleSheet.create({
  container: { flex: 1, overflow: 'hidden' },
  gridH: { position: 'absolute', left: 0, right: 0, height: 1, backgroundColor: 'rgba(0,100,0,0.07)' },
  gridV: { position: 'absolute', top: 0, bottom: 0, width: 1, backgroundColor: 'rgba(0,100,0,0.07)' },
  road: {
    position: 'absolute',
    height: 10, backgroundColor: 'rgba(150,120,80,0.2)',
    borderRadius: 5,
  },
  pin: { position: 'absolute', alignItems: 'center' },
  farmPin: {
    width: 40, height: 40, borderRadius: 20,
    backgroundColor: Colors.white,
    alignItems: 'center', justifyContent: 'center',
    borderWidth: 2, borderColor: Colors.primary[400],
    ...Shadow.sm,
  },
  farmLabel: { fontSize: 9, fontWeight: FontWeight.bold, color: Colors.primary[700], marginTop: 2 },
  tractorPin: {
    width: 44, height: 44, borderRadius: 22,
    backgroundColor: Colors.primary[600],
    alignItems: 'center', justifyContent: 'center',
    borderWidth: 2, borderColor: Colors.white,
    ...Shadow.md,
  },
  tractorLabel: { fontSize: 9, fontWeight: FontWeight.bold, color: Colors.primary[800], marginTop: 2 },
  etaBubble: {
    position: 'absolute', top: 16, left: 16,
    flexDirection: 'row', alignItems: 'center', gap: 5,
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.full,
    paddingHorizontal: 12, paddingVertical: 6,
    ...Shadow.md,
  },
  etaText: { fontSize: FontSize.sm, fontWeight: FontWeight.bold, color: Colors.primary[700] },
});
