import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  Animated,
} from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors, FontSize, FontWeight, Spacing, BorderRadius, Shadow } from '@/constants/theme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const { width, height } = Dimensions.get('window');

function TractorIllustration() {
  return (
    <View style={ill.container}>
      <View style={ill.sky}>
        <View style={ill.sun} />
        <View style={[ill.cloud, { left: 30, top: 20 }]} />
        <View style={[ill.cloud, { right: 40, top: 40, width: 70, height: 22 }]} />
      </View>
      <View style={ill.field} />
      <View style={ill.tractor}>
        <View style={ill.body}>
          <View style={ill.cabin}>
            <View style={ill.window} />
          </View>
          <View style={ill.hood}>
            <View style={ill.exhaust} />
          </View>
          <View style={ill.wheelLargeWrap}>
            <View style={ill.wheelLarge}>
              <View style={ill.hubLarge} />
            </View>
          </View>
          <View style={ill.wheelSmallWrap}>
            <View style={ill.wheelSmall}>
              <View style={ill.hubSmall} />
            </View>
          </View>
        </View>
      </View>
      <View style={ill.phoneFloat}>
        <View style={ill.phone}>
          <View style={ill.phoneScreen}>
            <View style={ill.phoneRow} />
            <View style={[ill.phoneRow, { width: '60%' }]} />
            <View style={[ill.phoneBtn]} />
          </View>
        </View>
        <View style={ill.phoneShadow} />
      </View>
      <View style={ill.cropRow}>
        {[0,1,2,3,4,5,6].map(i => (
          <View key={i} style={ill.crop}>
            <View style={ill.cropStem} />
            <View style={ill.cropLeaf} />
          </View>
        ))}
      </View>
    </View>
  );
}

function HarvestIllustration() {
  return (
    <View style={ill.container}>
      <View style={ill.sky} />
      <View style={ill.field} />
      <View style={[ill.harvester]}>
        <View style={ill.harvesterBody}>
          <View style={ill.harvesterCabin} />
          <View style={ill.harvesterCutter} />
          <View style={ill.wheelLarge} />
          <View style={[ill.wheelLarge, { right: 10, left: undefined }]} />
        </View>
      </View>
      <View style={ill.serviceGrid}>
        {['Irrigation\nPump', 'Labour\nTransport', 'Sprayer'].map((label, i) => (
          <View key={i} style={ill.serviceCard}>
            <View style={ill.serviceIcon} />
            <Text style={ill.serviceLabel}>{label}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

function GPSIllustration() {
  return (
    <View style={ill.container}>
      <LinearGradient
        colors={['#e8f5e9', '#c8e6c9', '#a5d6a7']}
        style={ill.mapBg}
      >
        <View style={ill.mapGrid}>
          {[0,1,2,3,4].map(i => (
            <View key={i} style={ill.mapLineH} />
          ))}
          {[0,1,2,3,4].map(i => (
            <View key={i} style={ill.mapLineV} />
          ))}
        </View>
        <View style={ill.mapRoad} />
        <View style={[ill.mapRoad, ill.mapRoadV]} />

        <View style={[ill.mapPin, { bottom: 60, left: 60 }]}>
          <View style={ill.pinDot} />
          <View style={ill.pinRipple} />
          <View style={[ill.pinRipple, ill.pinRipple2]} />
        </View>

        <View style={[ill.mapPin, ill.tractorPin, { top: 100, right: 80 }]}>
          <View style={ill.tractorPinIcon} />
        </View>

        <View style={ill.pathLine}>
          <View style={[ill.pathDash, { top: 0 }]} />
          <View style={[ill.pathDash, { top: 12 }]} />
          <View style={[ill.pathDash, { top: 24 }]} />
          <View style={[ill.pathDash, { top: 36 }]} />
        </View>

        <View style={ill.etaCard}>
          <Text style={ill.etaLabel}>ETA</Text>
          <Text style={ill.etaTime}>12 min</Text>
        </View>
      </LinearGradient>
    </View>
  );
}

const slides = [
  {
    illustration: TractorIllustration,
    title: 'Book Farming Vehicles Easily',
    subtitle: 'Find tractors, JCB, harvesters and sprayers near your village',
    gradient: [Colors.primary[50], Colors.white] as const,
  },
  {
    illustration: HarvestIllustration,
    title: 'All Agriculture Services in One App',
    subtitle: 'Book machines, labour, transport, borewell and irrigation support in simple steps',
    gradient: ['#fefce8', Colors.white] as const,
  },
  {
    illustration: GPSIllustration,
    title: 'Track Your Service Live',
    subtitle: 'Know provider location, price and arrival time with real-time updates',
    gradient: [Colors.primary[50], Colors.white] as const,
  },
];

export default function OnboardingScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [current, setCurrent] = useState(0);
  const scrollRef = useRef<ScrollView>(null);

  const goNext = () => {
    if (current < slides.length - 1) {
      const next = current + 1;
      scrollRef.current?.scrollTo({ x: next * width, animated: true });
      setCurrent(next);
    } else {
      router.replace('/language');
    }
  };

  const skip = () => router.replace('/language');

  const onScroll = (e: any) => {
    const idx = Math.round(e.nativeEvent.contentOffset.x / width);
    setCurrent(idx);
  };

  const slide = slides[current];
  const Illustration = slide.illustration;
  const isLast = current === slides.length - 1;

  return (
    <LinearGradient colors={slide.gradient} style={styles.container}>
      <View style={[styles.header, { paddingTop: insets.top + 8 }]}>
        <TouchableOpacity onPress={skip} style={styles.skipBtn}>
          <Text style={styles.skipText}>Skip</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        ref={scrollRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={onScroll}
        scrollEventThrottle={16}
        style={styles.slider}
      >
        {slides.map((s, i) => {
          const Illus = s.illustration;
          return (
            <View key={i} style={styles.slide}>
              <View style={styles.illustrationWrap}>
                <Illus />
              </View>
            </View>
          );
        })}
      </ScrollView>

      <View style={[styles.bottom, { paddingBottom: insets.bottom + 24 }]}>
        <Text style={styles.title}>{slide.title}</Text>
        <Text style={styles.subtitle}>{slide.subtitle}</Text>

        <View style={styles.dots}>
          {slides.map((_, i) => (
            <View
              key={i}
              style={[styles.dot, i === current && styles.dotActive]}
            />
          ))}
        </View>

        <TouchableOpacity style={styles.nextBtn} onPress={goNext} activeOpacity={0.85}>
          <LinearGradient
            colors={[Colors.primary[500], Colors.primary[700]]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.nextGradient}
          >
            <Text style={styles.nextText}>{isLast ? 'Get Started' : 'Next'}</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    paddingHorizontal: Spacing.lg,
    alignItems: 'flex-end',
    paddingBottom: Spacing.sm,
  },
  skipBtn: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: BorderRadius.full,
    backgroundColor: Colors.neutral[100],
  },
  skipText: {
    fontSize: FontSize.sm,
    color: Colors.neutral[600],
    fontWeight: FontWeight.medium,
  },
  slider: { flex: 1 },
  slide: {
    width,
    alignItems: 'center',
    justifyContent: 'center',
  },
  illustrationWrap: {
    width: width - 40,
    height: height * 0.38,
    borderRadius: BorderRadius.xl,
    overflow: 'hidden',
    ...Shadow.md,
  },
  bottom: {
    paddingHorizontal: Spacing.xl,
    paddingTop: Spacing.lg,
    gap: Spacing.md,
  },
  title: {
    fontSize: FontSize.xxl,
    fontWeight: FontWeight.bold,
    color: Colors.neutral[900],
    textAlign: 'center',
    lineHeight: 34,
  },
  subtitle: {
    fontSize: FontSize.md,
    color: Colors.neutral[500],
    textAlign: 'center',
    lineHeight: 24,
  },
  dots: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
    marginVertical: Spacing.sm,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.neutral[300],
  },
  dotActive: {
    width: 24,
    backgroundColor: Colors.primary[600],
  },
  nextBtn: {
    borderRadius: BorderRadius.lg,
    overflow: 'hidden',
    ...Shadow.green,
  },
  nextGradient: {
    paddingVertical: 16,
    alignItems: 'center',
    borderRadius: BorderRadius.lg,
  },
  nextText: {
    fontSize: FontSize.lg,
    fontWeight: FontWeight.bold,
    color: Colors.white,
    letterSpacing: 0.5,
  },
});

const ill = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0fdf4',
    position: 'relative',
    overflow: 'hidden',
  },
  sky: {
    position: 'absolute',
    top: 0, left: 0, right: 0,
    height: '55%',
    backgroundColor: '#e0f7fa',
  },
  sun: {
    position: 'absolute',
    top: 20, right: 40,
    width: 50, height: 50,
    borderRadius: 25,
    backgroundColor: Colors.secondary[300],
    shadowColor: Colors.secondary[400],
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 15,
  },
  cloud: {
    position: 'absolute',
    width: 90, height: 28,
    backgroundColor: Colors.white,
    borderRadius: 14,
    opacity: 0.9,
  },
  field: {
    position: 'absolute',
    bottom: 0, left: 0, right: 0,
    height: '50%',
    backgroundColor: '#a5d6a7',
    borderTopLeftRadius: 60,
    borderTopRightRadius: 60,
  },
  tractor: {
    position: 'absolute',
    bottom: 60,
    left: 30,
  },
  body: {
    position: 'relative',
    width: 120,
    height: 70,
  },
  cabin: {
    position: 'absolute',
    width: 45, height: 50,
    backgroundColor: Colors.primary[600],
    borderRadius: 6,
    top: 0, left: 42,
  },
  window: {
    width: 30, height: 20,
    backgroundColor: '#b3e5fc',
    borderRadius: 4,
    margin: 7,
  },
  hood: {
    position: 'absolute',
    width: 55, height: 30,
    backgroundColor: Colors.primary[700],
    borderRadius: 6,
    top: 15,
    left: 0,
  },
  exhaust: {
    position: 'absolute',
    width: 7, height: 18,
    backgroundColor: Colors.neutral[700],
    borderRadius: 3,
    top: -15,
    left: 8,
  },
  wheelLargeWrap: { position: 'absolute', bottom: -10, left: 5 },
  wheelLarge: {
    width: 44, height: 44,
    borderRadius: 22,
    backgroundColor: Colors.neutral[800],
    borderWidth: 4,
    borderColor: Colors.neutral[600],
    alignItems: 'center',
    justifyContent: 'center',
  },
  hubLarge: {
    width: 14, height: 14,
    borderRadius: 7,
    backgroundColor: Colors.neutral[400],
  },
  wheelSmallWrap: { position: 'absolute', bottom: 0, right: 12 },
  wheelSmall: {
    width: 30, height: 30,
    borderRadius: 15,
    backgroundColor: Colors.neutral[800],
    borderWidth: 3,
    borderColor: Colors.neutral[600],
    alignItems: 'center',
    justifyContent: 'center',
  },
  hubSmall: {
    width: 10, height: 10,
    borderRadius: 5,
    backgroundColor: Colors.neutral[400],
  },

  phoneFloat: {
    position: 'absolute',
    top: 30, right: 30,
    alignItems: 'center',
  },
  phone: {
    width: 55, height: 90,
    backgroundColor: Colors.neutral[800],
    borderRadius: 10,
    padding: 4,
    ...Shadow.md,
  },
  phoneScreen: {
    flex: 1,
    backgroundColor: Colors.white,
    borderRadius: 7,
    padding: 6,
    gap: 5,
    alignItems: 'flex-start',
  },
  phoneRow: {
    width: '100%',
    height: 6,
    backgroundColor: Colors.primary[200],
    borderRadius: 3,
  },
  phoneBtn: {
    width: '70%',
    height: 10,
    backgroundColor: Colors.primary[500],
    borderRadius: 5,
    marginTop: 4,
  },
  phoneShadow: {
    width: 40, height: 6,
    backgroundColor: 'rgba(0,0,0,0.15)',
    borderRadius: 3,
    marginTop: 4,
  },

  cropRow: {
    position: 'absolute',
    bottom: 10,
    right: 20,
    flexDirection: 'row',
    gap: 8,
  },
  crop: { alignItems: 'center' },
  cropStem: { width: 3, height: 20, backgroundColor: Colors.primary[700], borderRadius: 2 },
  cropLeaf: { width: 12, height: 8, backgroundColor: Colors.primary[500], borderRadius: 6 },

  harvester: { position: 'absolute', bottom: 50, left: 20 },
  harvesterBody: { width: 140, height: 75, position: 'relative' },
  harvesterCabin: {
    position: 'absolute',
    width: 55, height: 55,
    backgroundColor: Colors.secondary[600],
    borderRadius: 8,
    top: 0, right: 20,
  },
  harvesterCutter: {
    position: 'absolute',
    width: 80, height: 20,
    backgroundColor: Colors.neutral[600],
    borderRadius: 4,
    bottom: 25,
    left: 0,
  },

  serviceGrid: {
    position: 'absolute',
    top: 20, right: 10,
    gap: 8,
  },
  serviceCard: {
    width: 80,
    backgroundColor: Colors.white,
    borderRadius: 10,
    padding: 8,
    alignItems: 'center',
    ...Shadow.sm,
  },
  serviceIcon: {
    width: 28, height: 28,
    borderRadius: 14,
    backgroundColor: Colors.primary[100],
    marginBottom: 4,
  },
  serviceLabel: {
    fontSize: 9,
    color: Colors.primary[700],
    fontWeight: FontWeight.semibold,
    textAlign: 'center',
  },

  mapBg: { flex: 1, position: 'relative', overflow: 'hidden' },
  mapGrid: { ...StyleSheet.absoluteFillObject },
  mapLineH: {
    position: 'absolute',
    left: 0, right: 0,
    height: 1,
    backgroundColor: 'rgba(0,100,0,0.1)',
    top: 40,
  },
  mapLineV: {
    position: 'absolute',
    top: 0, bottom: 0,
    width: 1,
    backgroundColor: 'rgba(0,100,0,0.1)',
    left: 60,
  },
  mapRoad: {
    position: 'absolute',
    left: 80, right: 80,
    height: 12,
    backgroundColor: 'rgba(0,0,0,0.12)',
    borderRadius: 6,
    top: '50%',
  },
  mapRoadV: {
    width: 12,
    height: undefined,
    top: 0, bottom: 0,
    left: '50%',
    right: undefined,
  },
  mapPin: {
    position: 'absolute',
    alignItems: 'center',
  },
  pinDot: {
    width: 16, height: 16,
    borderRadius: 8,
    backgroundColor: Colors.error[600],
    borderWidth: 2,
    borderColor: Colors.white,
    zIndex: 2,
  },
  pinRipple: {
    position: 'absolute',
    width: 28, height: 28,
    borderRadius: 14,
    backgroundColor: 'rgba(239,68,68,0.2)',
    top: -6, left: -6,
  },
  pinRipple2: {
    width: 42, height: 42,
    borderRadius: 21,
    top: -13, left: -13,
    backgroundColor: 'rgba(239,68,68,0.1)',
  },
  tractorPin: {},
  tractorPinIcon: {
    width: 32, height: 32,
    borderRadius: 16,
    backgroundColor: Colors.primary[600],
    borderWidth: 2,
    borderColor: Colors.white,
    ...Shadow.md,
  },
  pathLine: {
    position: 'absolute',
    bottom: 80, left: '48%',
    height: 60,
    width: 4,
    alignItems: 'center',
  },
  pathDash: {
    position: 'absolute',
    width: 4, height: 8,
    borderRadius: 2,
    backgroundColor: Colors.primary[600],
  },
  etaCard: {
    position: 'absolute',
    top: 20, left: 20,
    backgroundColor: Colors.white,
    borderRadius: 10,
    padding: 10,
    ...Shadow.md,
    alignItems: 'center',
  },
  etaLabel: { fontSize: 10, color: Colors.neutral[500], fontWeight: FontWeight.medium },
  etaTime: { fontSize: 18, fontWeight: FontWeight.bold, color: Colors.primary[600] },
});
