import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import { BuildingLibraryIcon, BanknotesIcon } from 'react-native-heroicons/outline';

interface Deposit {
  id: string;
  title: string;
  date: string;
  amount: string;
  isPositive: boolean;
  type: 'bank' | 'vendor';
}

const DEPOSITS: Deposit[] = [
  { id: '1', title: 'Chase Bank - Main', date: 'Feb 24, 2026', amount: '+$450.00', isPositive: true, type: 'bank' },
  { id: '2', title: 'Wells Fargo - Savings', date: 'Feb 23, 2026', amount: '+$540.00', isPositive: true, type: 'bank' },
  { id: '3', title: 'Vendor Payout', date: 'Feb 22, 2026', amount: '-$120.00', isPositive: false, type: 'vendor' },
];

export default function RecentDeposits() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.sectionTitle}>Recent Deposits</Text>
        <TouchableOpacity>
          <Text style={styles.viewAllBtn}>View All</Text>
        </TouchableOpacity>
      </View>

      {DEPOSITS.map((item) => (
        <View key={item.id} style={styles.transactionCard}>
          <View style={[
            styles.iconContainer, 
            item.type === 'vendor' ? styles.iconContainerVendor : styles.iconContainerBank
          ]}>
            {item.type === 'bank' ? (
              <BuildingLibraryIcon size={moderateScale(20)} color="#FA8C4C" />
            ) : (
              <BanknotesIcon size={moderateScale(20)} color="#6B7280" />
            )}
          </View>
          
          <View style={styles.detailsContainer}>
            <Text style={styles.title} numberOfLines={1}>{item.title}</Text>
            <Text style={styles.subtitle} numberOfLines={1}>{item.date} •</Text>
          </View>

          <Text style={[styles.amount, item.isPositive ? styles.amountPositive : styles.amountNegative]}>
            {item.amount}
          </Text>
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
  sectionTitle: {
    fontSize: moderateScale(16, 0.3),
    fontWeight: '800',
    color: '#111827',
  },
  viewAllBtn: {
    fontSize: moderateScale(14, 0.3),
    fontWeight: '700',
    color: '#FA8C4C',
  },
  transactionCard: {
    flexDirection: 'row',
    backgroundColor: '#F9FAFB', // very light grey matching the screenshot
    borderRadius: scale(12),
    padding: scale(16),
    marginBottom: verticalScale(12),
    alignItems: 'center',
  },
  iconContainer: {
    width: moderateScale(44),
    height: moderateScale(44),
    borderRadius: scale(12),
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: scale(16),
  },
  iconContainerBank: {
    backgroundColor: '#FFF0E5', // light orange
  },
  iconContainerVendor: {
    backgroundColor: '#E5E7EB', // light grey
  },
  detailsContainer: {
    flex: 1,
    marginRight: scale(8),
  },
  title: {
    fontSize: moderateScale(14, 0.3),
    fontWeight: '700',
    color: '#111827',
    marginBottom: verticalScale(4),
  },
  subtitle: {
    fontSize: moderateScale(12, 0.3),
    color: '#6B7280',
    fontWeight: '500',
  },
  amount: {
    fontSize: moderateScale(15, 0.3),
    fontWeight: '800',
  },
  amountPositive: {
    color: '#10B981', // green
  },
  amountNegative: {
    color: '#111827', // dark grey/black
  },
});
