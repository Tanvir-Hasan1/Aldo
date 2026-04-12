import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import { Feather } from '@expo/vector-icons';

interface SupplierPriceAlertsProps {
  alerts: any[];
}

export default function SupplierPriceAlerts({ alerts }: SupplierPriceAlertsProps) {
  if (!alerts || alerts.length === 0) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Supplier Price Alerts</Text>
        </View>
        <View style={[styles.alertCard, { backgroundColor: '#F3F4F6', justifyContent: 'center' }]}>
          <Text style={[styles.alertTitle, { color: '#6B7280', textAlign: 'center' }]}>No price alerts at this time</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Supplier Price Alerts</Text>
        <TouchableOpacity>
          <Text style={styles.viewAll}>VIEW ALL</Text>
        </TouchableOpacity>
      </View>

      {alerts.map((alert, index) => (
        <View key={index} style={styles.alertCard}>
          <View style={styles.iconContainer}>
            <Feather name="trending-up" size={moderateScale(18)} color="#EF4444" />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.alertTitle}>{alert.title || 'Price Alert'}</Text>
            <Text style={styles.impact}>Impact: <Text style={styles.impactValue}>{alert.impact || 'Calculating...'}</Text></Text>
          </View>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: verticalScale(40),
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: verticalScale(16),
  },
  title: {
    fontSize: moderateScale(16, 0.3),
    fontWeight: '800',
    color: '#111827',
  },
  viewAll: {
    fontSize: moderateScale(11, 0.3),
    fontWeight: '700',
    color: '#FA8C4C',
  },
  alertCard: {
    flexDirection: 'row',
    backgroundColor: '#FFF1F2',
    borderRadius: scale(12),
    padding: scale(12),
    alignItems: 'center',
  },
  iconContainer: {
    width: moderateScale(40),
    height: moderateScale(40),
    borderRadius: scale(10),
    backgroundColor: '#FFE4E6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: scale(12),
  },
  textContainer: {
    flex: 1,
  },
  alertTitle: {
    fontSize: moderateScale(14, 0.3),
    fontWeight: '700',
    color: '#111827',
    marginBottom: verticalScale(2),
  },
  impact: {
    fontSize: moderateScale(11, 0.3),
    color: '#6B7280',
    fontWeight: '500',
  },
  impactValue: {
    fontWeight: '700',
  },
});
