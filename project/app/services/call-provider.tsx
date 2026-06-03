import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { useRouter } from 'expo-router';
import { Phone, PhoneOff, Volume2, Mic, MicOff } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors, FontSize, FontWeight, Spacing, BorderRadius, Shadow } from '@/constants/theme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function CallProviderScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [callStatus, setCallStatus] = useState<'calling' | 'connected' | 'ended'>('calling');
  const [timer, setTimer] = useState(0);
  const [muted, setMuted] = useState(false);
  const [speakerOn, setSpeakerOn] = useState(false);
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, { toValue: 1.15, duration: 800, useNativeDriver: true }),
        Animated.timing(pulseAnim, { toValue: 1, duration: 800, useNativeDriver: true }),
      ])
    ).start();

    const connectTimer = setTimeout(() => setCallStatus('connected'), 3000);
    return () => clearTimeout(connectTimer);
  }, []);

  useEffect(() => {
    if (callStatus !== 'connected') return;
    const t = setInterval(() => setTimer(s => s + 1), 1000);
    return () => clearInterval(t);
  }, [callStatus]);

  const formatTime = (s: number) => `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;

  const endCall = () => {
    setCallStatus('ended');
    setTimeout(() => router.back(), 1500);
  };

  return (
    <LinearGradient
      colors={[Colors.primary[800], Colors.primary[700], Colors.primary[600]]}
      style={[styles.container, { paddingTop: insets.top }]}
    >
      <View style={styles.content}>
        <View style={styles.avatarSection}>
          <Animated.View style={[styles.pulseOuter, { transform: [{ scale: pulseAnim }], opacity: callStatus === 'connected' ? 0 : 0.3 }]} />
          <View style={styles.pulseMiddle} />
          <View style={styles.avatar}>
            <Text style={styles.avatarEmoji}>👨‍🌾</Text>
          </View>
        </View>

        <Text style={styles.providerName}>Ramu Kumar</Text>
        <Text style={styles.providerRole}>Tractor Service Provider</Text>

        <View style={styles.statusSection}>
          {callStatus === 'calling' && (
            <Text style={styles.callingText}>Calling...</Text>
          )}
          {callStatus === 'connected' && (
            <View style={styles.timerWrap}>
              <View style={styles.connectedDot} />
              <Text style={styles.timerText}>{formatTime(timer)}</Text>
            </View>
          )}
          {callStatus === 'ended' && (
            <Text style={styles.endedText}>Call Ended</Text>
          )}
        </View>
      </View>

      <View style={[styles.controls, { paddingBottom: insets.bottom + 40 }]}>
        <View style={styles.controlsRow}>
          <TouchableOpacity
            style={[styles.controlBtn, muted && styles.controlBtnActive]}
            onPress={() => setMuted(!muted)}
          >
            {muted ? <MicOff size={24} color={Colors.white} /> : <Mic size={24} color={Colors.white} />}
            <Text style={styles.controlBtnLabel}>{muted ? 'Unmute' : 'Mute'}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.endCallBtn} onPress={endCall}>
            <PhoneOff size={32} color={Colors.white} />
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.controlBtn, speakerOn && styles.controlBtnActive]}
            onPress={() => setSpeakerOn(!speakerOn)}
          >
            <Volume2 size={24} color={Colors.white} />
            <Text style={styles.controlBtnLabel}>{speakerOn ? 'Earpiece' : 'Speaker'}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 16 },
  avatarSection: { position: 'relative', alignItems: 'center', justifyContent: 'center', width: 160, height: 160 },
  pulseOuter: {
    position: 'absolute',
    width: 160, height: 160, borderRadius: 80,
    backgroundColor: 'rgba(255,255,255,0.3)',
  },
  pulseMiddle: {
    position: 'absolute',
    width: 120, height: 120, borderRadius: 60,
    backgroundColor: 'rgba(255,255,255,0.15)',
  },
  avatar: {
    width: 100, height: 100, borderRadius: 50,
    backgroundColor: 'rgba(255,255,255,0.25)',
    borderWidth: 3, borderColor: 'rgba(255,255,255,0.5)',
    alignItems: 'center', justifyContent: 'center',
    zIndex: 2,
  },
  avatarEmoji: { fontSize: 48 },
  providerName: { fontSize: FontSize.xxxl, fontWeight: FontWeight.bold, color: Colors.white },
  providerRole: { fontSize: FontSize.md, color: 'rgba(255,255,255,0.8)', fontWeight: FontWeight.medium },
  statusSection: { marginTop: 8 },
  callingText: {
    fontSize: FontSize.lg, color: 'rgba(255,255,255,0.9)',
    fontWeight: FontWeight.medium, letterSpacing: 1,
  },
  timerWrap: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  connectedDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: Colors.success[400] },
  timerText: { fontSize: FontSize.xl, color: Colors.white, fontWeight: FontWeight.semibold, letterSpacing: 2 },
  endedText: { fontSize: FontSize.lg, color: 'rgba(255,255,255,0.7)' },
  controls: { paddingHorizontal: Spacing.xl },
  controlsRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  controlBtn: {
    alignItems: 'center', gap: 6,
    width: 72, height: 72, borderRadius: 36,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    borderWidth: 1, borderColor: 'rgba(255,255,255,0.2)',
  },
  controlBtnActive: { backgroundColor: 'rgba(255,255,255,0.35)' },
  controlBtnLabel: { fontSize: 10, color: 'rgba(255,255,255,0.85)', fontWeight: FontWeight.medium },
  endCallBtn: {
    width: 80, height: 80, borderRadius: 40,
    backgroundColor: Colors.error[600],
    alignItems: 'center', justifyContent: 'center',
    ...Shadow.lg,
  },
});
