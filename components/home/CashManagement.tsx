import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import { CreditCardIcon, BanknotesIcon, BuildingLibraryIcon, ChevronRightIcon } from 'react-native-heroicons/outline';

interface CashItemProps {
  title: string;
  value: string;
  IconComponent: any;
}

const CashItem = ({ title, value, IconComponent }: CashItemProps) => {
  return (
    <TouchableOpacity style={styles.itemContainer}>
      <View style={styles.itemLeft}>
        <View style={styles.iconContainer}>
          <IconComponent size={moderateScale(16)} color="#FA8C4C" />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.itemValue}>{value}</Text>
          <Text style={styles.itemTitle}>{title}</Text>
        </View>
      </View>
      <ChevronRightIcon size={moderateScale(16)} color="#9CA3AF" />
    </TouchableOpacity>
  );
};

export default function CashManagement() {
  const cashData: CashItemProps[] = [
    { title: 'Total Cash Collected', value: '$3,840.00', IconComponent: CreditCardIcon },
    { title: 'Cash Available', value: '$1,240.50', IconComponent: BanknotesIcon },
    { title: 'Cash Deposited to Bank', value: '$2,600.00', IconComponent: BuildingLibraryIcon },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Cash Management</Text>
      
      <View style={styles.cardContainer}>
        {cashData.map((item, index) => (
          <React.Fragment key={item.title}>
            <CashItem {...item} />
            {index < cashData.length - 1 && <View style={styles.divider} />}
          </React.Fragment>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: verticalScale(24),
  },
  sectionTitle: {
    fontSize: moderateScale(16, 0.3),
    fontWeight: '700',
    color: '#111827',
    marginBottom: verticalScale(12),
  },
  cardContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: scale(16),
    borderWidth: 1,
    borderColor: '#F3F4F6',
    padding: scale(16),
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: verticalScale(8),
  },
  itemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: scale(40),
    height: scale(40),
    borderRadius: scale(20),
    backgroundColor: '#FFF0E5',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: scale(16),
  },
  textContainer: {
    justifyContent: 'center',
  },
  itemValue: {
    fontSize: moderateScale(16, 0.3),
    fontWeight: '700',
    color: '#111827',
    marginBottom: verticalScale(2),
  },
  itemTitle: {
    fontSize: moderateScale(12, 0.3),
    fontWeight: '500',
    color: '#9CA3AF',
  },
  divider: {
    height: 1,
    backgroundColor: '#F3F4F6',
    marginVertical: verticalScale(4),
  },
});
