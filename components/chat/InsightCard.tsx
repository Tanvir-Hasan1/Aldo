import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather } from '@expo/vector-icons';

interface InsightCardProps {
  insightText: string;
  highlightText: string;
}

export default function InsightCard({ insightText, highlightText }: InsightCardProps) {
  // Split the insight text to highlight the specific part
  const parts = insightText.split(highlightText);

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#272120', '#D67D4B']} // Dark brown to orange
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradientCard}
      >
        <View style={styles.header}>
          <Feather name="trending-up" size={moderateScale(18)} color="#FA8C4C" />
          <Text style={styles.headerTitle}>AI INSIGHT</Text>
        </View>

        <Text style={styles.insightText}>
          {parts[0]}
          {parts.length > 1 && (
            <Text style={styles.highlight}>{highlightText}</Text>
          )}
          {parts.length > 1 && parts[1]}
        </Text>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: scale(20),
    marginBottom: verticalScale(24),
  },
  gradientCard: {
    borderRadius: scale(16),
    padding: scale(20),
    shadowColor: '#FA8C4C',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 8,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: verticalScale(12),
  },
  headerTitle: {
    color: '#E5E7EB',
    fontSize: moderateScale(11, 0.3),
    fontWeight: '800',
    letterSpacing: 1,
    marginLeft: scale(8),
  },
  insightText: {
    color: '#FFFFFF',
    fontSize: moderateScale(16, 0.3),
    fontWeight: '500',
    lineHeight: moderateScale(24),
  },
  highlight: {
    color: '#FA8C4C',
    fontWeight: '800',
  },
});
