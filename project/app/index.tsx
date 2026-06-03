import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Dimensions,
} from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors, FontSize, FontWeight, Spacing } from '@/constants/theme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const { width, height } = Dimensions.get('window');

function LeafPattern({ x, y, size, opacity, rotation }: { x: number; y: number; size: number; opacity: number; rotation: number }) {
  return (
    <View style={[styles.leafContainer, { left: x, top: y, width: size, height: size, opacity, transform: [{ rotate: `${rotation}deg` }] }]}>
      <View style={[styles.leaf, { width: size, height: size * 0.6, borderRadius: size / 2 }]} />
    </View>
  );
}

export default function SplashScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const logoScale = useRef(new Animated.Value(0.3)).current;
  const logoOpacity = useRef(new Animated.Value(0)).current;
  const textOpacity = useRef(new Animated.Value(0)).current;
  const textTranslate = useRef(new Animated.Value(30)).current;
  const taglineOpacity = useRef(new Animated.Value(0)).current;
  const loaderWidth = useRef(new Animated.Value(0)).current;
  const glowOpacity = useRef(new Animated.Value(0.4)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.parallel([
        Animated.spring(logoScale, { toValue: 1, useNativeDriver: true, tension: 50, friction: 7 }),
        Animated.timing(logoOpacity, { toValue: 1, duration: 600, useNativeDriver: true }),
      ]),
      Animated.parallel([
        Animated.timing(textOpacity, { toValue: 1, duration: 500, useNativeDriver: true }),
        Animated.spring(textTranslate, { toValue: 0, useNativeDriver: true, tension: 60, friction: 8 }),
      ]),
      Animated.timing(taglineOpacity, { toValue: 1, duration: 400, useNativeDriver: true }),
      Animated.timing(loaderWidth, { toValue: 200, duration: 1800, useNativeDriver: false }),
    ]).start(() => {
      setTimeout(() => router.replace('/onboarding'), 300);
    });

    Animated.loop(
      Animated.sequence([
        Animated.timing(glowOpacity, { toValue: 1, duration: 1200, useNativeDriver: true }),
        Animated.timing(glowOpacity, { toValue: 0.4, duration: 1200, useNativeDriver: true }),
      ])
    ).start();
  }, []);

  const leaves = [
    { x: -20, y: height * 0.1, size: 80, opacity: 0.12, rotation: 45 },
    { x: width - 60, y: height * 0.08, size: 60, opacity: 0.1, rotation: -30 },
    { x: width * 0.1, y: height * 0.7, size: 100, opacity: 0.08, rotation: 60 },
    { x: width - 80, y: height * 0.65, size: 90, opacity: 0.1, rotation: -45 },
    { x: width * 0.4, y: height * 0.85, size: 70, opacity: 0.09, rotation: 20 },
    { x: -30, y: height * 0.4, size: 110, opacity: 0.07, rotation: -15 },
  ];

  return (
    <LinearGradient
      colors={[Colors.primary[800], Colors.primary[600], Colors.primary[500], '#5cb85c']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      {leaves.map((l, i) => (
        <LeafPattern key={i} {...l} />
      ))}

      <View style={[styles.content, { paddingTop: insets.top + 60 }]}>
        <Animated.View style={[styles.logoWrap, { opacity: logoOpacity, transform: [{ scale: logoScale }] }]}>
          <Animated.View style={[styles.glowRing, { opacity: glowOpacity }]} />
          <View style={styles.logoCircle}>
            <View style={styles.tractorBody}>
              <View style={styles.tractorCabin} />
              <View style={styles.tractorHood} />
              <View style={styles.wheelLarge} />
              <View style={styles.wheelSmall} />
              <View style={styles.exhaust} />
            </View>
            <View style={styles.leafAccent}>
              <View style={styles.leafTop} />
              <View style={styles.leafStem} />
            </View>
          </View>
        </Animated.View>

        <Animated.View style={[styles.titleWrap, { opacity: textOpacity, transform: [{ translateY: textTranslate }] }]}>
          <Text style={styles.appName}>AgriRide</Text>
          <View style={styles.titleUnderline} />
        </Animated.View>

        <Animated.Text style={[styles.tagline, { opacity: taglineOpacity }]}>
          Smart Farming Services at Your Doorstep
        </Animated.Text>

        <View style={styles.loaderContainer}>
          <View style={styles.loaderTrack}>
            <Animated.View style={[styles.loaderFill, { width: loaderWidth }]} />
          </View>
          <Text style={styles.loadingText}>Loading...</Text>
        </View>
      </View>

      <View style={[styles.footer, { paddingBottom: insets.bottom + 20 }]}>
        <Text style={styles.footerText}>Powered by AgriTech India</Text>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: Spacing.xl,
  },

  leafContainer: { position: 'absolute' },
  leaf: {
    backgroundColor: Colors.white,
  },

  glowRing: {
    position: 'absolute',
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  logoWrap: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.xl,
    marginTop: 40,
  },
  logoCircle: {
    width: 130,
    height: 130,
    borderRadius: 65,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.4)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tractorBody: {
    width: 72,
    height: 48,
    position: 'relative',
  },
  tractorCabin: {
    position: 'absolute',
    width: 28,
    height: 30,
    backgroundColor: Colors.white,
    borderRadius: 4,
    top: 0,
    left: 20,
    opacity: 0.95,
  },
  tractorHood: {
    position: 'absolute',
    width: 36,
    height: 20,
    backgroundColor: 'rgba(255,255,255,0.85)',
    borderRadius: 4,
    top: 10,
    left: 0,
  },
  wheelLarge: {
    position: 'absolute',
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: 'rgba(255,255,255,0.25)',
    borderWidth: 3,
    borderColor: Colors.white,
    bottom: 0,
    left: 0,
  },
  wheelSmall: {
    position: 'absolute',
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: 'rgba(255,255,255,0.25)',
    borderWidth: 3,
    borderColor: Colors.white,
    bottom: 4,
    right: 8,
  },
  exhaust: {
    position: 'absolute',
    width: 5,
    height: 14,
    backgroundColor: Colors.white,
    borderRadius: 2,
    top: -10,
    left: 28,
    opacity: 0.8,
  },
  leafAccent: {
    position: 'absolute',
    top: 8,
    right: 12,
    alignItems: 'center',
  },
  leafTop: {
    width: 18,
    height: 12,
    backgroundColor: Colors.secondary[300],
    borderRadius: 9,
    transform: [{ rotate: '-30deg' }],
    opacity: 0.9,
  },
  leafStem: {
    width: 2,
    height: 10,
    backgroundColor: Colors.secondary[300],
    borderRadius: 1,
    opacity: 0.9,
  },

  titleWrap: {
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  appName: {
    fontSize: 46,
    fontWeight: FontWeight.bold,
    color: Colors.white,
    letterSpacing: 2,
  },
  titleUnderline: {
    width: 60,
    height: 3,
    backgroundColor: Colors.secondary[300],
    borderRadius: 2,
    marginTop: 6,
  },

  tagline: {
    fontSize: FontSize.lg,
    color: 'rgba(255,255,255,0.9)',
    textAlign: 'center',
    fontWeight: FontWeight.medium,
    lineHeight: 26,
    marginBottom: Spacing.xxxl,
    letterSpacing: 0.3,
    maxWidth: 280,
  },

  loaderContainer: {
    alignItems: 'center',
    gap: 12,
  },
  loaderTrack: {
    width: 200,
    height: 4,
    backgroundColor: 'rgba(255,255,255,0.25)',
    borderRadius: 2,
    overflow: 'hidden',
  },
  loaderFill: {
    height: '100%',
    backgroundColor: Colors.secondary[300],
    borderRadius: 2,
  },
  loadingText: {
    fontSize: FontSize.sm,
    color: 'rgba(255,255,255,0.7)',
    fontWeight: FontWeight.medium,
    letterSpacing: 1,
  },

  footer: {
    alignItems: 'center',
    paddingHorizontal: Spacing.xl,
  },
  footerText: {
    fontSize: FontSize.xs,
    color: 'rgba(255,255,255,0.5)',
    letterSpacing: 1,
  },
});
