import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import { HugeiconsIcon } from '@hugeicons/react-native';
import { BotIcon } from '@hugeicons/core-free-icons';

interface ChatMessageProps {
  message: string;
  sender: 'ai' | 'user';
}

export default function ChatMessage({ message, sender }: ChatMessageProps) {
  const isUser = sender === 'user';

  return (
    <View style={[styles.container, isUser ? styles.containerUser : styles.containerAi]}>
      {!isUser && (
        <View style={styles.aiAvatar}>
          <HugeiconsIcon icon={BotIcon} size={moderateScale(16)} color="#FFFFFF" />
        </View>
      )}
      
      <View style={styles.messageContent}>
        <Text style={[styles.senderName, isUser ? styles.nameUser : styles.nameAi]}>
          {isUser ? 'YOU' : 'RISTO AI'}
        </Text>
        <View style={[styles.bubble, isUser ? styles.bubbleUser : styles.bubbleAi]}>
          <Text style={[styles.messageText, isUser ? styles.textUser : styles.textAi]}>
            {message}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginBottom: verticalScale(24),
    paddingHorizontal: scale(20),
  },
  containerUser: {
    justifyContent: 'flex-end',
  },
  containerAi: {
    justifyContent: 'flex-start',
  },
  aiAvatar: {
    width: moderateScale(32),
    height: moderateScale(32),
    borderRadius: moderateScale(16),
    backgroundColor: '#FA8C4C',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: scale(12),
    marginTop: verticalScale(20), // Align with the bubble
  },
  messageContent: {
    maxWidth: '80%',
  },
  senderName: {
    fontSize: moderateScale(10, 0.3),
    fontWeight: '800',
    letterSpacing: 0.5,
    marginBottom: verticalScale(6),
  },
  nameAi: {
    color: '#9CA3AF',
    marginLeft: scale(4),
  },
  nameUser: {
    color: '#FA8C4C',
    textAlign: 'right',
    marginRight: scale(4),
  },
  bubble: {
    paddingHorizontal: scale(16),
    paddingVertical: verticalScale(14),
  },
  bubbleAi: {
    backgroundColor: '#F3F4F6',
    borderTopRightRadius: scale(16),
    borderBottomRightRadius: scale(16),
    borderBottomLeftRadius: scale(16),
    borderTopLeftRadius: scale(4),
  },
  bubbleUser: {
    backgroundColor: '#FA8C4C',
    borderTopLeftRadius: scale(16),
    borderBottomLeftRadius: scale(16),
    borderTopRightRadius: scale(16),
    borderBottomRightRadius: scale(4),
  },
  messageText: {
    fontSize: moderateScale(15, 0.3),
    lineHeight: moderateScale(22),
  },
  textAi: {
    color: '#1F2937',
  },
  textUser: {
    color: '#FFFFFF',
  },
});
