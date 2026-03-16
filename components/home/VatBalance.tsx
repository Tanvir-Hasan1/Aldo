import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import { Feather } from '@expo/vector-icons';

export default function VatBalance() {
  return (
    <View style={styles.container}>
      <Text style={styles.subtitle}>ESTIMATED VAT BALANCE</Text>
      <Text style={styles.balanceText}>€80</Text>
      
      <View style={styles.syncContainer}>
        <View style={styles.syncDot} />
        <Text style={styles.syncText}>Live sync</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#352109', // Dark brown to mimic gradient from mockup
    borderRadius: scale(16),
    padding: scale(20),
    marginBottom: verticalScale(24),
  },
  subtitle: {
    fontSize: moderateScale(11, 0.3),
    fontWeight: '600',
    color: '#D1D5DB', // Light gray
    letterSpacing: 0.5,
    marginBottom: verticalScale(8),
  },
  balanceText: {
    fontSize: moderateScale(40, 0.3),
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: verticalScale(16),
  },
  syncContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.15)',
    alignSelf: 'flex-start',
    paddingHorizontal: scale(10),
    paddingVertical: verticalScale(4),
    borderRadius: scale(12),
  },
  syncDot: {
    width: scale(6),
    height: scale(6),
    borderRadius: scale(3),
    backgroundColor: '#10B981', // green dot
    marginRight: scale(6),
  },
  syncText: {
    fontSize: moderateScale(10, 0.3),
    fontWeight: '500',
    color: '#FFFFFF',
  },
});
