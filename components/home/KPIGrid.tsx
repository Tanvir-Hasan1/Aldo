import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import { EyeIcon, ClipboardDocumentListIcon, ShoppingBagIcon, ChartPieIcon, ArrowTrendingUpIcon, ArrowTrendingDownIcon } from 'react-native-heroicons/outline';

interface KPIItemProps {
  title: string;
  value: string;
  trend: string;
  isPositive: boolean;
  IconComponent: any;
  iconColor: string;
  iconBgColor: string;
}

const KPICard = ({ title, value, trend, isPositive, IconComponent, iconColor, iconBgColor }: KPIItemProps) => {
  return (
    <View style={styles.cardContainer}>
      <View style={styles.cardHeader}>
        <View style={[styles.iconContainer, { backgroundColor: iconBgColor }]}>
          <IconComponent size={moderateScale(14)} color={iconColor} />
        </View>
        <View style={styles.trendContainer}>
          {isPositive ? (
            <ArrowTrendingUpIcon size={moderateScale(10)} color="#10B981" />
          ) : (
            <ArrowTrendingDownIcon size={moderateScale(10)} color="#EF4444" />
          )}
          <Text style={[styles.trendText, { color: isPositive ? "#10B981" : "#EF4444" }]}>{trend}</Text>
        </View>
      </View>
      <Text style={styles.cardTitle}>{title}</Text>
      <Text style={styles.cardValue}>{value}</Text>
    </View>
  );
};

export default function KPIGrid() {
  const kpiData: KPIItemProps[] = [
    { title: 'Revenue', value: '$12,450', trend: '5.2%', isPositive: true, IconComponent: EyeIcon, iconColor: '#FA8C4C', iconBgColor: '#FFF0E5' },
    { title: 'Expenses', value: '$8,120', trend: '2.1%', isPositive: false, IconComponent: ClipboardDocumentListIcon, iconColor: '#EF4444', iconBgColor: '#FEE2E2' },
    { title: 'Food Cost', value: '$32', trend: '1.5%', isPositive: false, IconComponent: ShoppingBagIcon, iconColor: '#D97706', iconBgColor: '#FEF3C7' },
    { title: 'Profit', value: '$4,330', trend: '8.4%', isPositive: true, IconComponent: ChartPieIcon, iconColor: '#10B981', iconBgColor: '#D1FAE5' },
  ];

  return (
    <View style={styles.gridContainer}>
      <View style={styles.row}>
        <KPICard {...kpiData[0]} />
        <KPICard {...kpiData[1]} />
      </View>
      <View style={styles.row}>
        <KPICard {...kpiData[2]} />
        <KPICard {...kpiData[3]} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  gridContainer: {
    marginBottom: verticalScale(20),
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: verticalScale(12),
  },
  cardContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: scale(16),
    padding: scale(16),
    marginHorizontal: scale(4),
    borderWidth: 1,
    borderColor: '#F3F4F6',
    // Shadow matching mockup card aesthetics roughly
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: verticalScale(12),
  },
  iconContainer: {
    width: scale(32),
    height: scale(32),
    borderRadius: scale(8),
    justifyContent: 'center',
    alignItems: 'center',
  },
  trendContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  trendText: {
    fontSize: moderateScale(10, 0.3),
    fontWeight: '700',
    marginLeft: scale(4),
  },
  cardTitle: {
    fontSize: moderateScale(12, 0.3),
    fontWeight: '600',
    color: '#9CA3AF',
    marginBottom: verticalScale(4),
  },
  cardValue: {
    fontSize: moderateScale(18, 0.3),
    fontWeight: '800',
    color: '#111827',
  },
});
