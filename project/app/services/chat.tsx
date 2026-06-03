import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform,
} from 'react-native';
import { useRouter } from 'expo-router';
import { ArrowLeft, Phone, Send, Image as ImageIcon, Paperclip } from 'lucide-react-native';
import { Colors, FontSize, FontWeight, Spacing, BorderRadius, Shadow } from '@/constants/theme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const messages = [
  { id: 1, from: 'provider', text: 'Namaste! I have confirmed your booking for tomorrow morning 7 AM.', time: '6:30 PM', type: 'text' },
  { id: 2, from: 'me', text: 'Thank you! Is the tractor available for rotavator work too?', time: '6:31 PM', type: 'text' },
  { id: 3, from: 'provider', text: 'Yes, I have rotavator attachment. No extra charge for same plot.', time: '6:32 PM', type: 'text' },
  { id: 4, from: 'me', text: 'Great! My farm is near the water tank at Survey No. 45.', time: '6:33 PM', type: 'text' },
  { id: 5, from: 'provider', text: 'Okay noted. I know that area. Will be there by 7 AM sharp.', time: '6:34 PM', type: 'text' },
  { id: 6, from: 'provider', text: 'Also please ensure the gate is open. I will call you when I arrive.', time: '6:35 PM', type: 'text' },
];

const quickReplies = ['Okay, noted!', 'Gate will be open', 'Please be on time', 'Thank you!', 'Where are you now?'];

export default function ChatScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [input, setInput] = useState('');
  const [chatMessages, setChatMessages] = useState(messages);

  const sendMessage = () => {
    if (!input.trim()) return;
    setChatMessages(prev => [...prev, {
      id: prev.length + 1,
      from: 'me',
      text: input,
      time: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
      type: 'text',
    }]);
    setInput('');
  };

  const sendQuickReply = (text: string) => {
    setChatMessages(prev => [...prev, {
      id: prev.length + 1,
      from: 'me',
      text,
      time: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
      type: 'text',
    }]);
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={0}
    >
      <View style={[styles.container, { paddingTop: insets.top }]}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
            <ArrowLeft size={22} color={Colors.neutral[800]} />
          </TouchableOpacity>
          <View style={styles.headerInfo}>
            <View style={styles.avatar}><Text style={{ fontSize: 20 }}>👨‍🌾</Text></View>
            <View>
              <Text style={styles.headerName}>Ramu Kumar</Text>
              <View style={styles.onlineRow}>
                <View style={styles.onlineDot} />
                <Text style={styles.onlineText}>Online</Text>
              </View>
            </View>
          </View>
          <TouchableOpacity style={styles.callBtn} onPress={() => router.push('/services/call-provider')}>
            <Phone size={20} color={Colors.primary[600]} />
          </TouchableOpacity>
        </View>

        <View style={styles.bookingBar}>
          <Text style={styles.bookingBarText}>📅 Tractor Ploughing • 15 Jun 2026 • 7:00 AM</Text>
        </View>

        <ScrollView
          style={styles.messageList}
          contentContainerStyle={styles.messageListContent}
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.dateLabel}>Today</Text>
          {chatMessages.map(msg => (
            <View
              key={msg.id}
              style={[styles.messageBubbleWrap, msg.from === 'me' && styles.messageBubbleWrapMe]}
            >
              {msg.from === 'provider' && (
                <View style={styles.msgAvatar}><Text style={{ fontSize: 14 }}>👨‍🌾</Text></View>
              )}
              <View style={[
                styles.messageBubble,
                msg.from === 'me' ? styles.messageBubbleMe : styles.messageBubbleProvider,
              ]}>
                <Text style={[styles.messageText, msg.from === 'me' && styles.messageTextMe]}>
                  {msg.text}
                </Text>
                <Text style={[styles.messageTime, msg.from === 'me' && styles.messageTimeMe]}>
                  {msg.time}
                </Text>
              </View>
            </View>
          ))}

          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.quickRepliesScroll}>
            {quickReplies.map((r, i) => (
              <TouchableOpacity key={i} style={styles.quickReplyChip} onPress={() => sendQuickReply(r)}>
                <Text style={styles.quickReplyText}>{r}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </ScrollView>

        <View style={[styles.inputBar, { paddingBottom: insets.bottom + 8 }]}>
          <TouchableOpacity style={styles.attachBtn}>
            <ImageIcon size={20} color={Colors.neutral[500]} />
          </TouchableOpacity>
          <TextInput
            style={styles.input}
            placeholder="Type a message..."
            placeholderTextColor={Colors.neutral[400]}
            value={input}
            onChangeText={setInput}
            multiline
          />
          <TouchableOpacity
            style={[styles.sendBtn, input.trim() && styles.sendBtnActive]}
            onPress={sendMessage}
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
    flexDirection: 'row', alignItems: 'center',
    paddingHorizontal: Spacing.md, paddingVertical: Spacing.md,
    backgroundColor: Colors.white,
    borderBottomWidth: 1, borderBottomColor: Colors.neutral[100],
    gap: Spacing.sm,
  },
  backBtn: {
    width: 36, height: 36, borderRadius: 18,
    backgroundColor: Colors.neutral[100],
    alignItems: 'center', justifyContent: 'center',
  },
  headerInfo: { flex: 1, flexDirection: 'row', alignItems: 'center', gap: Spacing.sm },
  avatar: {
    width: 44, height: 44, borderRadius: 22,
    backgroundColor: Colors.primary[50],
    alignItems: 'center', justifyContent: 'center',
    borderWidth: 2, borderColor: Colors.primary[200],
  },
  headerName: { fontSize: FontSize.md, fontWeight: FontWeight.bold, color: Colors.neutral[900] },
  onlineRow: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  onlineDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: Colors.success[500] },
  onlineText: { fontSize: FontSize.xs, color: Colors.success[600], fontWeight: FontWeight.medium },
  callBtn: {
    width: 40, height: 40, borderRadius: 20,
    backgroundColor: Colors.primary[50],
    alignItems: 'center', justifyContent: 'center',
    borderWidth: 1.5, borderColor: Colors.primary[200],
  },
  bookingBar: {
    backgroundColor: Colors.primary[50],
    paddingHorizontal: Spacing.md,
    paddingVertical: 8,
    borderBottomWidth: 1, borderBottomColor: Colors.primary[100],
  },
  bookingBarText: { fontSize: FontSize.xs, fontWeight: FontWeight.semibold, color: Colors.primary[700], textAlign: 'center' },
  messageList: { flex: 1 },
  messageListContent: { padding: Spacing.md, gap: 6 },
  dateLabel: {
    textAlign: 'center', fontSize: FontSize.xs,
    color: Colors.neutral[400], marginVertical: 8,
    backgroundColor: Colors.neutral[200],
    alignSelf: 'center', paddingHorizontal: 12, paddingVertical: 3,
    borderRadius: BorderRadius.full,
  },
  messageBubbleWrap: {
    flexDirection: 'row', alignItems: 'flex-end', gap: 8,
  },
  messageBubbleWrapMe: { flexDirection: 'row-reverse' },
  msgAvatar: {
    width: 30, height: 30, borderRadius: 15,
    backgroundColor: Colors.primary[50],
    alignItems: 'center', justifyContent: 'center',
  },
  messageBubble: {
    maxWidth: '75%', borderRadius: 16, padding: 12,
    gap: 3,
  },
  messageBubbleProvider: {
    backgroundColor: Colors.white,
    borderBottomLeftRadius: 4,
    ...Shadow.sm,
  },
  messageBubbleMe: {
    backgroundColor: Colors.primary[600],
    borderBottomRightRadius: 4,
  },
  messageText: { fontSize: FontSize.sm, color: Colors.neutral[800], lineHeight: 20 },
  messageTextMe: { color: Colors.white },
  messageTime: { fontSize: 10, color: Colors.neutral[400], alignSelf: 'flex-end' },
  messageTimeMe: { color: 'rgba(255,255,255,0.7)' },
  quickRepliesScroll: { marginTop: Spacing.md },
  quickReplyChip: {
    paddingVertical: 8, paddingHorizontal: 14,
    borderRadius: BorderRadius.full,
    backgroundColor: Colors.white,
    borderWidth: 1.5, borderColor: Colors.primary[200],
    marginRight: 8,
  },
  quickReplyText: { fontSize: FontSize.xs, fontWeight: FontWeight.semibold, color: Colors.primary[600] },
  inputBar: {
    flexDirection: 'row', alignItems: 'flex-end',
    backgroundColor: Colors.white,
    paddingHorizontal: Spacing.md,
    paddingTop: Spacing.sm,
    borderTopWidth: 1, borderTopColor: Colors.neutral[100],
    gap: 8,
  },
  attachBtn: {
    width: 40, height: 40, borderRadius: 20,
    alignItems: 'center', justifyContent: 'center',
  },
  input: {
    flex: 1,
    backgroundColor: Colors.neutral[50],
    borderRadius: 20,
    paddingHorizontal: Spacing.md,
    paddingVertical: 10,
    fontSize: FontSize.md,
    color: Colors.neutral[900],
    maxHeight: 100,
    borderWidth: 1, borderColor: Colors.neutral[200],
  },
  sendBtn: {
    width: 40, height: 40, borderRadius: 20,
    backgroundColor: Colors.neutral[200],
    alignItems: 'center', justifyContent: 'center',
  },
  sendBtnActive: { backgroundColor: Colors.primary[600] },
});
