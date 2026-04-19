import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import { useTranslation } from '../../utils/i18n';

interface RevenueTrendChartProps {
  weeklyRevenue: Array<{ label: string; value: number }>;
  totalRevenue: number;
  changePercent: number;
}

export default function RevenueTrendChart({ weeklyRevenue, totalRevenue, changePercent }: RevenueTrendChartProps) {
  const maxValue = Math.max(...weeklyRevenue.map(item => item.value), 1);
  const { t } = useTranslation();
  
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>{t('revenue_trend')}</Text>
          <Text style={styles.value}>${totalRevenue.toLocaleString()}</Text>
        </View>
        <Text style={[styles.trend, { color: changePercent >= 0 ? '#10B981' : '#EF4444' }]}>
          {changePercent >= 0 ? '+' : ''}{changePercent}% <Text style={styles.trendSub}>{t('last_week')}</Text>
        </Text>
      </View>

      <View style={styles.chartContainer}>
        {weeklyRevenue.map((item, index) => {
          const heightPercent = maxValue > 0 ? (item.value / maxValue) * 100 : 0;
          return (
            <View key={index} style={styles.barGroup}>
              <View style={styles.barBackground}>
                <View 
                  style={[
                    styles.bar, 
                    { height: `${Math.max(heightPercent, 5)}%` }, // Minimum 5% height for visibility if value is > 0
                    styles.barActive
                  ]} 
                />
              </View>
              <Text style={styles.dayText}>{item.label}</Text>
            </View>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: scale(16),
    padding: scale(16),
    borderWidth: 1,
    borderColor: '#F3F4F6',
    marginBottom: verticalScale(24),
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: verticalScale(24),
  },
  title: {
    fontSize: moderateScale(16, 0.3),
    fontWeight: '700',
    color: '#111827',
    marginBottom: verticalScale(4),
  },
  value: {
    fontSize: moderateScale(24, 0.3),
    fontWeight: '800',
    color: '#111827',
  },
  trend: {
    fontSize: moderateScale(12, 0.3),
    color: '#10B981',
    fontWeight: '700',
    textAlign: 'right',
  },
  trendSub: {
    color: '#9CA3AF',
    fontWeight: '500',
  },
  chartContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    height: verticalScale(120),
    alignItems: 'flex-end',
  },
  barGroup: {
    alignItems: 'center',
    flex: 1,
  },
  barBackground: {
    width: scale(30),
    height: '100%',
    backgroundColor: '#F3F4F6',
    borderRadius: scale(6),
    justifyContent: 'flex-end',
    overflow: 'hidden',
    marginBottom: verticalScale(12),
  },
  bar: {
    width: '100%',
    borderRadius: scale(6),
  },
  barInactive: {
    backgroundColor: '#FB923C',
    opacity: 0.3,
  },
  barActive: {
    backgroundColor: '#FB923C',
    shadowColor: '#FB923C',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 4,
  },
  dayText: {
    fontSize: moderateScale(10, 0.3),
    fontWeight: '700',
    color: '#9CA3AF',
  },
  dayTextActive: {
    color: '#FB923C',
  },
});
