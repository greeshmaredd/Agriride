import React, { useState } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, Image, Dimensions, ScrollView,
} from 'react-native';
import { useRouter } from 'expo-router';
import { ArrowLeft, X, ChevronLeft, ChevronRight } from 'lucide-react-native';
import { Colors, FontSize, FontWeight, Spacing, BorderRadius, Shadow } from '@/constants/theme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const { width, height } = Dimensions.get('window');

const galleryImages = [
  { uri: 'https://images.pexels.com/photos/2889890/pexels-photo-2889890.jpeg?auto=compress&cs=tinysrgb&w=800', caption: 'Tractor in Field' },
  { uri: 'https://images.pexels.com/photos/1595104/pexels-photo-1595104.jpeg?auto=compress&cs=tinysrgb&w=800', caption: 'Harvesting in Progress' },
  { uri: 'https://images.pexels.com/photos/2219024/pexels-photo-2219024.jpeg?auto=compress&cs=tinysrgb&w=800', caption: 'JCB Work' },
  { uri: 'https://images.pexels.com/photos/974314/pexels-photo-974314.jpeg?auto=compress&cs=tinysrgb&w=800', caption: 'Farm Overview' },
  { uri: 'https://images.pexels.com/photos/2132250/pexels-photo-2132250.jpeg?auto=compress&cs=tinysrgb&w=800', caption: 'Agricultural Field' },
  { uri: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800', caption: 'Service in Action' },
  { uri: 'https://images.pexels.com/photos/1301856/pexels-photo-1301856.jpeg?auto=compress&cs=tinysrgb&w=800', caption: 'Equipment Close-up' },
  { uri: 'https://images.pexels.com/photos/2132180/pexels-photo-2132180.jpeg?auto=compress&cs=tinysrgb&w=800', caption: 'Field Work' },
];

export default function GalleryScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [fullscreen, setFullscreen] = useState(false);
  const [activeIdx, setActiveIdx] = useState(0);

  const openFullscreen = (idx: number) => {
    setActiveIdx(idx);
    setFullscreen(true);
  };

  const prev = () => setActiveIdx(i => Math.max(0, i - 1));
  const next = () => setActiveIdx(i => Math.min(galleryImages.length - 1, i + 1));

  if (fullscreen) {
    return (
      <View style={styles.fullscreenContainer}>
        <Image
          source={{ uri: galleryImages[activeIdx].uri }}
          style={styles.fullscreenImg}
          resizeMode="contain"
        />
        <View style={[styles.fullscreenTopBar, { paddingTop: insets.top + 8 }]}>
          <TouchableOpacity style={styles.fsBtn} onPress={() => setFullscreen(false)}>
            <X size={22} color={Colors.white} />
          </TouchableOpacity>
          <Text style={styles.fsCounter}>{activeIdx + 1} / {galleryImages.length}</Text>
          <View style={{ width: 40 }} />
        </View>
        <View style={styles.fullscreenCaption}>
          <Text style={styles.captionText}>{galleryImages[activeIdx].caption}</Text>
        </View>
        {activeIdx > 0 && (
          <TouchableOpacity style={[styles.navBtn, styles.navBtnLeft]} onPress={prev}>
            <ChevronLeft size={28} color={Colors.white} />
          </TouchableOpacity>
        )}
        {activeIdx < galleryImages.length - 1 && (
          <TouchableOpacity style={[styles.navBtn, styles.navBtnRight]} onPress={next}>
            <ChevronRight size={28} color={Colors.white} />
          </TouchableOpacity>
        )}
        <View style={styles.dotsRow}>
          {galleryImages.map((_, i) => (
            <TouchableOpacity
              key={i}
              style={[styles.fsDot, i === activeIdx && styles.fsDotActive]}
              onPress={() => setActiveIdx(i)}
            />
          ))}
        </View>
      </View>
    );
  }

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <ArrowLeft size={22} color={Colors.neutral[800]} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Equipment Gallery</Text>
        <Text style={styles.headerCount}>{galleryImages.length} photos</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.grid}>
        <View style={styles.featuredImg}>
          <TouchableOpacity onPress={() => openFullscreen(0)} activeOpacity={0.9}>
            <Image source={{ uri: galleryImages[0].uri }} style={styles.featuredImgContent} />
            <View style={styles.imgOverlay}>
              <Text style={styles.imgCaption}>{galleryImages[0].caption}</Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.gridRow}>
          {galleryImages.slice(1).map((img, i) => (
            <TouchableOpacity
              key={i + 1}
              style={styles.gridItem}
              onPress={() => openFullscreen(i + 1)}
              activeOpacity={0.9}
            >
              <Image source={{ uri: img.uri }} style={styles.gridImgContent} />
              <View style={styles.imgOverlay}>
                <Text style={styles.gridCaption} numberOfLines={1}>{img.caption}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.neutral[900] },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.md,
    backgroundColor: Colors.neutral[900],
  },
  backBtn: {
    width: 40, height: 40, borderRadius: 20,
    backgroundColor: Colors.neutral[800],
    alignItems: 'center', justifyContent: 'center',
  },
  headerTitle: { fontSize: FontSize.lg, fontWeight: FontWeight.bold, color: Colors.white },
  headerCount: { fontSize: FontSize.sm, color: Colors.neutral[400] },
  grid: { padding: 2 },
  featuredImg: { width: '100%', height: 240, marginBottom: 2 },
  featuredImgContent: { width: '100%', height: '100%' },
  gridRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 2 },
  gridItem: { width: (width - 6) / 3, height: (width - 6) / 3, position: 'relative' },
  gridImgContent: { width: '100%', height: '100%' },
  imgOverlay: {
    position: 'absolute',
    bottom: 0, left: 0, right: 0,
    backgroundColor: 'rgba(0,0,0,0.4)',
    paddingHorizontal: 8, paddingVertical: 4,
  },
  imgCaption: { fontSize: FontSize.sm, color: Colors.white, fontWeight: FontWeight.medium },
  gridCaption: { fontSize: 9, color: Colors.white },
  fullscreenContainer: { flex: 1, backgroundColor: Colors.black },
  fullscreenImg: { flex: 1, width: '100%' },
  fullscreenTopBar: {
    position: 'absolute',
    top: 0, left: 0, right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.md,
    paddingBottom: Spacing.md,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  fsBtn: {
    width: 40, height: 40, borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.15)',
    alignItems: 'center', justifyContent: 'center',
  },
  fsCounter: { fontSize: FontSize.md, color: Colors.white, fontWeight: FontWeight.semibold },
  fullscreenCaption: {
    position: 'absolute',
    bottom: 60, left: 0, right: 0,
    alignItems: 'center',
    paddingHorizontal: Spacing.xl,
  },
  captionText: {
    fontSize: FontSize.md,
    color: Colors.white,
    fontWeight: FontWeight.semibold,
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingHorizontal: 16, paddingVertical: 8,
    borderRadius: BorderRadius.full,
  },
  navBtn: {
    position: 'absolute',
    top: '50%',
    width: 48, height: 48, borderRadius: 24,
    backgroundColor: 'rgba(0,0,0,0.5)',
    alignItems: 'center', justifyContent: 'center',
  },
  navBtnLeft: { left: Spacing.md },
  navBtnRight: { right: Spacing.md },
  dotsRow: {
    position: 'absolute',
    bottom: 20,
    left: 0, right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 6,
  },
  fsDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: 'rgba(255,255,255,0.4)' },
  fsDotActive: { width: 20, backgroundColor: Colors.white },
});
