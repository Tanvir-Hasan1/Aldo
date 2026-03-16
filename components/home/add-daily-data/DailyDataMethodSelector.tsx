import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';

interface DailyDataMethodSelectorProps {
  method: 'Method 1' | 'Method 2';
  setMethod: (method: 'Method 1' | 'Method 2') => void;
}

export default function DailyDataMethodSelector({ method, setMethod }: DailyDataMethodSelectorProps) {
  return (
    <View style={styles.segmentContainer}>
      {['Method 1', 'Method 2'].map((tab) => {
        const isActive = method === tab;
        return (
          <TouchableOpacity 
            key={tab} 
            style={[styles.segmentButton, isActive && styles.segmentButtonActive]}
            onPress={() => setMethod(tab as any)}
          >
            <Text style={[styles.segmentText, isActive && styles.segmentTextActive]}>
              {tab}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  segmentContainer: {
    flexDirection: 'row',
    backgroundColor: '#F9FAFB',
    borderRadius: scale(8),
    padding: scale(4),
    marginBottom: verticalScale(24),
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  segmentButton: {
    flex: 1,
    paddingVertical: verticalScale(10),
    alignItems: 'center',
    borderRadius: scale(6),
  },
  segmentButtonActive: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  segmentText: {
    fontSize: moderateScale(14, 0.3),
    fontWeight: '600',
    color: '#6B7280',
  },
  segmentTextActive: {
    color: '#FA8C4C',
  },
});
