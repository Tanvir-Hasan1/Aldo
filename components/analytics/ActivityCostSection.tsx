import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import { Feather } from '@expo/vector-icons';
import { useTranslation } from '../../utils/i18n';

interface ActivityCostData {
  label: string;
  value: number;
}

interface ActivityCostSectionProps {
  coversActivity: ActivityCostData[];
  costBreakdown: ActivityCostData[];
}

export default function ActivityCostSection({ coversActivity, costBreakdown }: ActivityCostSectionProps) {
  const { t } = useTranslation();
  return (
    <View style={styles.container}>
      {/* Covers Activity */}
      <View style={styles.card}>
        <Text style={styles.title}>{t('covers_activity')}</Text>
        {coversActivity.map((item, index) => (
          <View key={index} style={styles.row}>
            <View style={styles.subRow}>
              <Feather 
                name={item.label.toLowerCase() === 'lunch' ? 'sun' : 'moon'} 
                size={moderateScale(14)} 
                color={item.label.toLowerCase() === 'lunch' ? '#F59E0B' : '#6366F1'} 
              />
              <Text style={styles.label}>{item.label}</Text>
            </View>
            <Text style={styles.value}>{item.value}</Text>
          </View>
        ))}
      </View>

      {/* Cost % */}
      <View style={styles.card}>
        <Text style={styles.title}>{t('cost_percentage')}</Text>
        {costBreakdown.map((item, index) => (
          <View key={index} style={styles.row}>
            <Text style={styles.label}>{item.label}</Text>
            <Text style={[styles.value, { color: index === 0 ? '#EF4444' : '#F59E0B' }]}>
              {item.value}%
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: verticalScale(24),
  },
  card: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: scale(16),
    padding: scale(16),
    borderWidth: 1,
    borderColor: '#F3F4F6',
    marginHorizontal: scale(4),
  },
  title: {
    fontSize: moderateScale(13, 0.3),
    fontWeight: '700',
    color: '#111827',
    marginBottom: verticalScale(12),
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: verticalScale(8),
  },
  subRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    fontSize: moderateScale(11, 0.3),
    color: '#6B7280',
    fontWeight: '500',
    marginLeft: scale(6),
  },
  value: {
    fontSize: moderateScale(12, 0.3),
    fontWeight: '700',
    color: '#111827',
  },
});
