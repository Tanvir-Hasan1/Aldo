import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';

export default function CashMetrics() {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Total Collected</Text>
          <Text style={styles.cardValue}>€2,450.00</Text>
          <Text style={styles.tagGreen}>TODAY</Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Cash Available</Text>
          <Text style={styles.cardValue}>€1,120.50</Text>
          <Text style={styles.tagOrange}>IN SAFE</Text>
        </View>
      </View>
      
      <View style={styles.row}>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Withdrawals</Text>
          <Text style={styles.cardValue}>€340.00</Text>
          <Text style={styles.tagGrey}>TODAY</Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Bank Deposits</Text>
          <Text style={styles.cardValue}>€990.00</Text>
          <Text style={styles.tagGrey}>TODAY</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: scale(12),
    marginBottom: verticalScale(24),
  },
  row: {
    flexDirection: 'row',
    gap: scale(12),
    marginBottom: verticalScale(12),
  },
  card: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: scale(12),
    padding: scale(16),
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  cardTitle: {
    fontSize: moderateScale(12, 0.3),
    color: '#6B7280',
    fontWeight: '500',
    marginBottom: verticalScale(8),
  },
  cardValue: {
    fontSize: moderateScale(20, 0.3),
    fontWeight: '800',
    color: '#111827',
    marginBottom: verticalScale(12),
  },
  tagGreen: {
    fontSize: moderateScale(10, 0.3),
    fontWeight: '800',
    color: '#10B981', // Emerald green
    letterSpacing: 0.5,
  },
  tagOrange: {
    fontSize: moderateScale(10, 0.3),
    fontWeight: '800',
    color: '#FA8C4C', // Orange
    letterSpacing: 0.5,
  },
  tagGrey: {
    fontSize: moderateScale(10, 0.3),
    fontWeight: '800',
    color: '#9CA3AF', // Grey
    letterSpacing: 0.5,
  },
});
