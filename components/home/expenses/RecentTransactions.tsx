import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import { Feather } from '@expo/vector-icons';

interface Transaction {
  id: string;
  title: string;
  category: string;
  date: string;
  amount: string;
  type: string;
}

const TRANSACTIONS: Transaction[] = [
  { id: '1', title: 'Employee Salaries', category: 'Staff Costs', date: 'Mar 28, 2026', amount: '-€2,500.00', type: 'Monthly Payroll' },
  { id: '2', title: 'Electricity', category: 'Property & Utilities', date: 'Jan 27, 2026', amount: '-€300.00', type: 'Utility Bill' },
  { id: '3', title: 'Cleaning Supplies', category: 'Restaurant Operations', date: 'Feb 27, 2026', amount: '-€120.00', type: 'Stock Refill' },
  { id: '4', title: 'New Menus Print', category: 'Administrative', date: 'Oct 25, 2025', amount: '-€85.00', type: 'Marketing' },
];

export default function RecentTransactions() {
  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>RECENT TRANSACTIONS</Text>

      {TRANSACTIONS.map((tx) => (
        <TouchableOpacity key={tx.id} style={styles.transactionCard}>
          <View style={styles.iconContainer}>
            <Feather name="credit-card" size={moderateScale(18)} color="#FA8C4C" />
          </View>
          
          <View style={styles.detailsContainer}>
            <View style={styles.titleRow}>
              <Text style={styles.title} numberOfLines={1}>{tx.title}</Text>
              <Text style={styles.amount}>{tx.amount}</Text>
            </View>
            <View style={styles.subRow}>
              <Text style={styles.subtitle} numberOfLines={1}>{tx.category} • {tx.date}</Text>
              <Text style={styles.typeText}>{tx.type}</Text>
            </View>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: verticalScale(40),
  },
  sectionTitle: {
    fontSize: moderateScale(11, 0.3),
    fontWeight: '800',
    color: '#111827',
    letterSpacing: 0.5,
    marginBottom: verticalScale(16),
  },
  transactionCard: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: scale(16),
    padding: scale(16),
    marginBottom: verticalScale(12),
    borderWidth: 1,
    borderColor: '#E5E7EB',
    alignItems: 'center',
  },
  iconContainer: {
    width: moderateScale(40),
    height: moderateScale(40),
    borderRadius: scale(12),
    backgroundColor: '#FFF6F0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: scale(12),
  },
  detailsContainer: {
    flex: 1,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: verticalScale(4),
  },
  title: {
    fontSize: moderateScale(14, 0.3),
    fontWeight: '700',
    color: '#111827',
    flex: 1,
    marginRight: scale(8),
  },
  amount: {
    fontSize: moderateScale(14, 0.3),
    fontWeight: '800',
    color: '#111827',
  },
  subRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  subtitle: {
    fontSize: moderateScale(11, 0.3),
    color: '#6B7280',
    flex: 1,
    marginRight: scale(8),
  },
  typeText: {
    fontSize: moderateScale(10, 0.3),
    color: '#9CA3AF',
    fontWeight: '500',
  },
});
