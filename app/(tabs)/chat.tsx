import React from 'react';
import { StyleSheet, ScrollView, Platform, KeyboardAvoidingView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import ChatHeader from '../../components/chat/ChatHeader';
import QuickPrompts from '../../components/chat/QuickPrompts';
import ChatMessage from '../../components/chat/ChatMessage';
import InsightCard from '../../components/chat/InsightCard';
import ChatInput from '../../components/chat/ChatInput';

export default function ChatScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView 
        style={styles.keyboardAvoiding}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ChatHeader />
        
        <ScrollView 
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          <QuickPrompts />
          
          <ChatMessage 
            sender="ai" 
            message="Hello! I can help you analyze your restaurant data. What would you like to know?" 
          />
          
          <ChatMessage 
            sender="user" 
            message="Show me my revenue trend for this week." 
          />
          
          <InsightCard 
            insightText="Your dinner revenue increased by 15% this week."
            highlightText="15%"
          />
          
          <ChatMessage 
            sender="ai" 
            message="Your revenue is up 12% compared to last week. Would you like to see the breakdown by category?" 
          />
        </ScrollView>

        <ChatInput />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  keyboardAvoiding: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 20,
  },
});
