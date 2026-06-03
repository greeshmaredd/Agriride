import React, { useState, useRef } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform,
} from 'react-native';
import { useRouter } from 'expo-router';
import { ArrowLeft, Mic, Send, Sparkles, ChevronRight } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors, FontSize, FontWeight, Spacing, BorderRadius, Shadow } from '@/constants/theme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type Message = { id: number; from: 'ai' | 'user'; text: string; time: string };

const suggestedQuestions = [
  'When should I sow paddy?',
  'Best fertilizer for groundnut?',
  'How to prevent crop diseases?',
  'Ideal tractor time for ploughing?',
  'Water requirement for cotton?',
];

const aiInsightCards = [
  { id: 1, emoji: '🌦️', title: 'Weather Impact', desc: 'Based on your location, expect 3 dry days perfect for spraying this week.' },
  { id: 2, emoji: '🌱', title: 'Soil Health', desc: 'June is ideal for deep ploughing to break hardpan and improve drainage.' },
  { id: 3, emoji: '💰', title: 'Cost Tip', desc: 'Book services 5+ days in advance to save up to 15% on tractor rates.' },
];

const initialMessages: Message[] = [
  { id: 1, from: 'ai', text: 'Namaste! I am Agri AI, your personal farming assistant. Ask me anything about crops, weather, services, or best farming practices.', time: '10:00 AM' },
  { id: 2, from: 'ai', text: 'I can help you with:\n• Crop calendar advice\n• Service booking recommendations\n• Soil & fertilizer tips\n• Weather-based alerts\n• Cost optimization', time: '10:00 AM' },
];

function getAIResponse(question: string): string {
  const q = question.toLowerCase();
  if (q.includes('paddy') || q.includes('rice')) return 'For paddy in Andhra Pradesh, transplanting should happen between June 15 and July 10. Ensure the field has 5-7 cm water depth. I recommend booking labour teams at least 7 days in advance during peak season.';
  if (q.includes('fertilizer') || q.includes('groundnut')) return 'For groundnut, apply Gypsum (250kg/acre) at pegging stage. Use single superphosphate as basal dose. Avoid excess nitrogen — it promotes leafy growth over pods.';
  if (q.includes('disease') || q.includes('pest')) return 'Early detection is key! For fungal diseases, spray Mancozeb 75% WP at 2g/liter. For pests, neem oil solution (5ml/liter) is effective and organic-friendly.';
  if (q.includes('tractor') || q.includes('plough')) return 'Best time for ploughing is early morning (5-8 AM) to avoid soil compaction from heat. For heavy clay soils in your area, deep ploughing (12-15 inches) once every 3 years is recommended.';
  if (q.includes('water') || q.includes('cotton')) return 'Cotton requires 600-700mm water per season. Critical stages: flowering and boll formation. Drip irrigation saves 40% water compared to flood irrigation. I recommend booking irrigation setup now.';
  return 'Great question! Based on current season and your location in Kurnool, here are my recommendations: Monitor soil moisture, continue normal operations, and watch for upcoming weather alerts. Would you like more specific advice?';
}

export default function AIAssistantScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<ScrollView>(null);

  const sendMessage = (text: string = input) => {
    if (!text.trim()) return;
    const userMsg: Message = {
      id: messages.length + 1,
      from: 'user',
      text: text.trim(),
      time: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
    };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const aiMsg: Message = {
        id: messages.length + 2,
        from: 'ai',
        text: getAIResponse(text),
        time: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages(prev => [...prev, aiMsg]);
      setIsTyping(false);
      setTimeout(() => scrollRef.current?.scrollToEnd({ animated: true }), 100);
    }, 1500);
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <View style={[styles.container, { paddingTop: insets.top }]}>
        <LinearGradient colors={[Colors.primary[700], Colors.primary[600]]} style={styles.header}>
          <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
            <ArrowLeft size={22} color={Colors.white} />
          </TouchableOpacity>
          <View style={styles.headerInfo}>
            <View style={styles.aiAvatar}>
              <Sparkles size={18} color={Colors.white} />
            </View>
            <View>
              <Text style={styles.headerTitle}>Agri AI Assistant</Text>
              <View style={styles.onlineRow}>
                <View style={styles.onlineDot} />
                <Text style={styles.onlineText}>AI-powered • Always available</Text>
              </View>
            </View>
          </View>
        </LinearGradient>

        <View style={styles.insightStrip}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.insightContent}>
            {aiInsightCards.map(card => (
              <View key={card.id} style={styles.insightCard}>
                <Text style={styles.insightEmoji}>{card.emoji}</Text>
                <View>
                  <Text style={styles.insightTitle}>{card.title}</Text>
                  <Text style={styles.insightDesc} numberOfLines={2}>{card.desc}</Text>
                </View>
              </View>
            ))}
          </ScrollView>
        </View>

        <ScrollView
          ref={scrollRef}
          style={styles.messageList}
          contentContainerStyle={styles.messageContent}
          showsVerticalScrollIndicator={false}
          onContentSizeChange={() => scrollRef.current?.scrollToEnd({ animated: true })}
        >
          {messages.map(msg => (
            <View key={msg.id} style={[styles.messageWrap, msg.from === 'user' && styles.messageWrapUser]}>
              {msg.from === 'ai' && (
                <View style={styles.aiBubbleIcon}>
                  <Sparkles size={12} color={Colors.primary[600]} />
                </View>
              )}
              <View style={[styles.bubble, msg.from === 'user' ? styles.bubbleUser : styles.bubbleAI]}>
                <Text style={[styles.bubbleText, msg.from === 'user' && styles.bubbleTextUser]}>{msg.text}</Text>
                <Text style={[styles.bubbleTime, msg.from === 'user' && styles.bubbleTimeUser]}>{msg.time}</Text>
              </View>
            </View>
          ))}
          {isTyping && (
            <View style={[styles.messageWrap]}>
              <View style={styles.aiBubbleIcon}>
                <Sparkles size={12} color={Colors.primary[600]} />
              </View>
              <View style={[styles.bubble, styles.bubbleAI]}>
                <Text style={styles.typingText}>Agri AI is thinking...</Text>
              </View>
            </View>
          )}
        </ScrollView>

        <View style={styles.suggestionsRow}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.suggestionsContent}>
            {suggestedQuestions.map((q, i) => (
              <TouchableOpacity key={i} style={styles.suggestionChip} onPress={() => sendMessage(q)}>
                <Text style={styles.suggestionText}>{q}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        <View style={[styles.inputBar, { paddingBottom: insets.bottom + 8 }]}>
          <TouchableOpacity style={styles.micBtn}>
            <Mic size={20} color={Colors.primary[600]} />
          </TouchableOpacity>
          <TextInput
            style={styles.input}
            placeholder="Ask about crops, weather, services..."
            placeholderTextColor={Colors.neutral[400]}
            value={input}
            onChangeText={setInput}
            multiline
          />
          <TouchableOpacity
            style={[styles.sendBtn, input.trim() && styles.sendBtnActive]}
            onPress={() => sendMessage()}
          >
            <Send size={18} color={input.trim() ? Colors.white : Colors.neutral[400]} />
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.neutral[50] },
  header: {
    flexDirection: 'row', alignItems: 'center', gap: Spacing.md,
    paddingHorizontal: Spacing.md, paddingVertical: Spacing.md,
  },
  backBtn: {
    width: 36, height: 36, borderRadius: 18,
    backgroundColor: 'rgba(255,255,255,0.2)', alignItems: 'center', justifyContent: 'center',
  },
  headerInfo: { flex: 1, flexDirection: 'row', alignItems: 'center', gap: Spacing.sm },
  aiAvatar: {
    width: 44, height: 44, borderRadius: 22,
    backgroundColor: 'rgba(255,255,255,0.25)', borderWidth: 2, borderColor: 'rgba(255,255,255,0.5)',
    alignItems: 'center', justifyContent: 'center',
  },
  headerTitle: { fontSize: FontSize.md, fontWeight: FontWeight.bold, color: Colors.white },
  onlineRow: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  onlineDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: Colors.success[400] },
  onlineText: { fontSize: FontSize.xs, color: 'rgba(255,255,255,0.8)' },
  insightStrip: { backgroundColor: Colors.white, borderBottomWidth: 1, borderBottomColor: Colors.neutral[100] },
  insightContent: { paddingHorizontal: Spacing.md, paddingVertical: Spacing.sm, gap: Spacing.sm },
  insightCard: {
    flexDirection: 'row', gap: 8, width: 220,
    backgroundColor: Colors.primary[50], borderRadius: BorderRadius.md, padding: 10,
    borderWidth: 1, borderColor: Colors.primary[100],
  },
  insightEmoji: { fontSize: 20 },
  insightTitle: { fontSize: FontSize.xs, fontWeight: FontWeight.bold, color: Colors.primary[800] },
  insightDesc: { fontSize: 10, color: Colors.primary[700], lineHeight: 14, marginTop: 2 },
  messageList: { flex: 1 },
  messageContent: { padding: Spacing.md, gap: 10 },
  messageWrap: { flexDirection: 'row', alignItems: 'flex-end', gap: 8 },
  messageWrapUser: { flexDirection: 'row-reverse' },
  aiBubbleIcon: {
    width: 26, height: 26, borderRadius: 13,
    backgroundColor: Colors.primary[50], borderWidth: 1, borderColor: Colors.primary[200],
    alignItems: 'center', justifyContent: 'center',
  },
  bubble: { maxWidth: '78%', borderRadius: 16, padding: 12, gap: 4 },
  bubbleAI: { backgroundColor: Colors.white, borderBottomLeftRadius: 4, ...Shadow.sm },
  bubbleUser: { backgroundColor: Colors.primary[600], borderBottomRightRadius: 4 },
  bubbleText: { fontSize: FontSize.sm, color: Colors.neutral[800], lineHeight: 20 },
  bubbleTextUser: { color: Colors.white },
  bubbleTime: { fontSize: 10, color: Colors.neutral[400], alignSelf: 'flex-end' },
  bubbleTimeUser: { color: 'rgba(255,255,255,0.7)' },
  typingText: { fontSize: FontSize.sm, color: Colors.neutral[500], fontStyle: 'italic' },
  suggestionsRow: { backgroundColor: Colors.white, borderTopWidth: 1, borderTopColor: Colors.neutral[100] },
  suggestionsContent: { paddingHorizontal: Spacing.md, paddingVertical: 8, gap: 8 },
  suggestionChip: {
    paddingVertical: 7, paddingHorizontal: 12, borderRadius: BorderRadius.full,
    backgroundColor: Colors.primary[50], borderWidth: 1.5, borderColor: Colors.primary[200],
  },
  suggestionText: { fontSize: FontSize.xs, fontWeight: FontWeight.semibold, color: Colors.primary[700] },
  inputBar: {
    flexDirection: 'row', alignItems: 'flex-end', gap: 8,
    backgroundColor: Colors.white, paddingHorizontal: Spacing.md, paddingTop: Spacing.sm,
    borderTopWidth: 1, borderTopColor: Colors.neutral[100],
  },
  micBtn: {
    width: 40, height: 40, borderRadius: 20,
    backgroundColor: Colors.primary[50], alignItems: 'center', justifyContent: 'center',
    borderWidth: 1.5, borderColor: Colors.primary[200],
  },
  input: {
    flex: 1, backgroundColor: Colors.neutral[50], borderRadius: 20,
    paddingHorizontal: Spacing.md, paddingVertical: 10,
    fontSize: FontSize.sm, color: Colors.neutral[900],
    maxHeight: 100, borderWidth: 1, borderColor: Colors.neutral[200],
  },
  sendBtn: {
    width: 40, height: 40, borderRadius: 20,
    backgroundColor: Colors.neutral[200], alignItems: 'center', justifyContent: 'center',
  },
  sendBtnActive: { backgroundColor: Colors.primary[600] },
});
