import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import { Feather } from '@expo/vector-icons';
import Svg, { Circle, G, Text as SvgText } from 'react-native-svg';

export default function ExpenseDistribution() {
  const size = moderateScale(100);
  const strokeWidth = moderateScale(12);
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  
  const staffPct = 65;
  const opsPct = 20;
  const othersPct = 15;

  const staffLength = (staffPct / 100) * circumference;
  const opsLength = (opsPct / 100) * circumference;
  const othersLength = (othersPct / 100) * circumference;

  const staffRotation = -90;
  const opsRotation = staffRotation + (360 * (staffPct / 100));
  const othersRotation = opsRotation + (360 * (opsPct / 100));

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Expense Distribution</Text>
        <Feather name="info" size={moderateScale(16)} color="#9CA3AF" />
      </View>

      <View style={styles.content}>
        <View style={styles.chartContainer}>
          <Svg width={size} height={size}>
            <G origin={`${size / 2}, ${size / 2}`}>
              <Circle
                rotation={staffRotation}
                origin={`${size / 2}, ${size / 2}`}
                stroke="#FA8C4C"
                fill="transparent"
                strokeWidth={strokeWidth}
                strokeDasharray={`${staffLength} ${circumference}`}
                r={radius}
                cx={size / 2}
                cy={size / 2}
              />
              <Circle
                rotation={opsRotation}
                origin={`${size / 2}, ${size / 2}`}
                stroke="#94A3B8"
                fill="transparent"
                strokeWidth={strokeWidth}
                strokeDasharray={`${opsLength} ${circumference}`}
                r={radius}
                cx={size / 2}
                cy={size / 2}
              />
              <Circle
                rotation={othersRotation}
                origin={`${size / 2}, ${size / 2}`}
                stroke="#E2E8F0"
                fill="transparent"
                strokeWidth={strokeWidth}
                strokeDasharray={`${othersLength} ${circumference}`}
                r={radius}
                cx={size / 2}
                cy={size / 2}
              />
            </G>
            <SvgText
              fill="#111827"
              fontSize={moderateScale(14, 0.3)}
              fontWeight="800"
              x={size / 2}
              y={size / 2 + moderateScale(4)}
              textAnchor="middle"
            >
              65%
            </SvgText>
          </Svg>
        </View>

        <View style={styles.legendContainer}>
          <View style={styles.legendItem}>
            <View style={styles.legendLabelGroup}>
              <View style={[styles.dot, { backgroundColor: '#FA8C4C' }]} />
              <Text style={styles.legendLabel}>Staff Costs</Text>
            </View>
            <Text style={styles.legendValue}>65%</Text>
          </View>

          <View style={styles.legendItem}>
            <View style={styles.legendLabelGroup}>
              <View style={[styles.dot, { backgroundColor: '#94A3B8' }]} />
              <Text style={styles.legendLabel}>Operations</Text>
            </View>
            <Text style={styles.legendValue}>20%</Text>
          </View>

          <View style={styles.legendItem}>
            <View style={styles.legendLabelGroup}>
              <View style={[styles.dot, { backgroundColor: '#E2E8F0' }]} />
              <Text style={styles.legendLabel}>Others</Text>
            </View>
            <Text style={styles.legendValue}>15%</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: scale(16),
    padding: scale(16),
    marginBottom: verticalScale(24),
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: verticalScale(16),
  },
  title: {
    fontSize: moderateScale(15, 0.3),
    fontWeight: '800',
    color: '#111827',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  chartContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  legendContainer: {
    flex: 1,
    marginLeft: scale(24),
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: verticalScale(10),
  },
  legendLabelGroup: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dot: {
    width: moderateScale(6),
    height: moderateScale(6),
    borderRadius: moderateScale(3),
    marginRight: scale(8),
  },
  legendLabel: {
    fontSize: moderateScale(12, 0.3),
    color: '#4B5563',
    fontWeight: '500',
  },
  legendValue: {
    fontSize: moderateScale(12, 0.3),
    color: '#111827',
    fontWeight: '700',
  },
});
