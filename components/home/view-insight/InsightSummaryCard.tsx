import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import { ArrowTrendingUpIcon } from 'react-native-heroicons/solid';

interface InsightSummaryCardProps {
  title: string;
  priority: string;
  metricValue: string;
  metricCaption: string;
  trend: { label: string; value: number }[];
}

export default function InsightSummaryCard({ 
  title, 
  priority, 
  metricValue, 
  metricCaption, 
  trend 
}: InsightSummaryCardProps) {
  // Map trend values to heights and colors. We'll find max value to scale heights.
  // We use fallback to 1s to prevent division by 0 if all values are 0.
  const maxVal = Math.max(...(trend || []).map(t => t.value), 1);
  const minHeight = 10; // minimum visible height
  const maxHeight = 120; // maximum bar height allowed via stylesheet base assumption

  const chartData = (trend || []).map((item, index, arr) => {
    // scale height relative to maxVal
    const calculatedHeight = Math.max((item.value / maxVal) * maxHeight, minHeight);
    
    // Default color logic: light grey for most, highlight last two if they represent 'recent' 
    // Or we could derive color dynamically. For now, last item is dark orange, second last is light orange.
    let color = '#E5E7EB';
    if (index === arr.length - 1) color = '#FB923C';
    else if (index === arr.length - 2) color = '#FDE68A';

    return {
      day: item.label,
      height: verticalScale(calculatedHeight),
      color: color
    };
  });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{(priority || 'HIGH').toUpperCase()} PRIORITY</Text>
        </View>
        <View style={styles.trendIconContainer}>
          <ArrowTrendingUpIcon size={moderateScale(18)} color="#EF4444" />
        </View>
      </View>
      
      <Text style={styles.title}>{title}</Text>
      <View style={styles.statsContainer}>
        <Text style={styles.percentage}>{metricValue}</Text>
        <Text style={styles.subtext}>{metricCaption}</Text>
      </View>
      
      <View style={styles.chartContainer}>
        {chartData.map((item, index) => (
          <View key={index} style={styles.barColumn}>
            <View 
              style={[
                styles.bar, 
                { height: item.height, backgroundColor: item.color }
              ]} 
            />
            <Text style={styles.dayLabel}>{item.day}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: scale(16),
    padding: scale(20),
    marginBottom: verticalScale(24),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: verticalScale(12),
  },
  badge: {
    backgroundColor: '#FEE2E2',
    paddingHorizontal: scale(8),
    paddingVertical: verticalScale(4),
    borderRadius: scale(4),
  },
  badgeText: {
    fontSize: moderateScale(10, 0.3),
    fontWeight: '700',
    color: '#EF4444',
  },
  trendIconContainer: {
    backgroundColor: '#FEE2E2',
    padding: scale(8),
    borderRadius: scale(8),
  },
  title: {
    fontSize: moderateScale(18, 0.3),
    fontWeight: '700',
    color: '#111827',
    marginBottom: verticalScale(8),
  },
  statsContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: verticalScale(24),
  },
  percentage: {
    fontSize: moderateScale(32, 0.3),
    fontWeight: '800',
    color: '#111827',
    marginRight: scale(8),
  },
  subtext: {
    fontSize: moderateScale(14, 0.3),
    color: '#6B7280',
    fontStyle: 'italic',
  },
  chartContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    height: verticalScale(140),
  },
  barColumn: {
    alignItems: 'center',
    width: scale(30),
  },
  bar: {
    width: scale(22),
    borderRadius: scale(4),
    marginBottom: verticalScale(8),
  },
  dayLabel: {
    fontSize: moderateScale(10, 0.3),
    color: '#9CA3AF',
    fontWeight: '600',
  },
});
