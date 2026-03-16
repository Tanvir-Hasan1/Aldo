import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import { DocumentArrowUpIcon, ClipboardDocumentListIcon, BoltIcon } from 'react-native-heroicons/outline';

interface ActivityItemProps {
  title: string;
  subtitle: string;
  timeText: string;
  IconComponent: any;
  iconBgColor: string;
  iconColor: string;
}

const ActivityItem = ({ title, subtitle, timeText, IconComponent, iconBgColor, iconColor }: ActivityItemProps) => {
  return (
    <View style={styles.itemContainer}>
      <View style={styles.itemLeft}>
        <View style={[styles.iconContainer, { backgroundColor: iconBgColor }]}>
          <IconComponent size={moderateScale(16)} color={iconColor} />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.itemTitle}>{title}</Text>
          <Text style={styles.itemSubtitle}>{subtitle}</Text>
        </View>
      </View>
      <Text style={styles.timeText}>{timeText}</Text>
    </View>
  );
};

export default function RecentActivity() {
  const activities: ActivityItemProps[] = [
    { title: 'Invoice uploaded', subtitle: 'Sysco Food Services Ltd.', timeText: '2H AGO', IconComponent: DocumentArrowUpIcon, iconBgColor: '#FFF0E5', iconColor: '#FA8C4C' },
    { title: 'Expense added', subtitle: 'Kitchen Utilities - Gas Bill', timeText: '5H AGO', IconComponent: ClipboardDocumentListIcon, iconBgColor: '#FEE2E2', iconColor: '#EF4444' },
    { title: 'AI insight generated', subtitle: 'Labor efficiency report ready', timeText: '8H AGO', IconComponent: BoltIcon, iconBgColor: '#FEF3C7', iconColor: '#D97706' },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.sectionTitle}>Recent Activity</Text>
        <Text style={styles.seeAllText}>See All</Text>
      </View>
      
      <View style={styles.cardContainer}>
        {activities.map((item, index) => (
          <React.Fragment key={item.title}>
            <ActivityItem {...item} />
            {index < activities.length - 1 && <View style={styles.divider} />}
          </React.Fragment>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: verticalScale(100), // Extra bottom padding to clear absolute tab bar
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: verticalScale(12),
  },
  sectionTitle: {
    fontSize: moderateScale(16, 0.3),
    fontWeight: '700',
    color: '#111827',
  },
  seeAllText: {
    fontSize: moderateScale(12, 0.3),
    fontWeight: '600',
    color: '#FA8C4C',
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
    alignItems: 'flex-start',
    paddingVertical: verticalScale(10),
  },
  itemLeft: {
    flexDirection: 'row',
    flex: 1, // allow wrapping
  },
  iconContainer: {
    width: scale(40),
    height: scale(40),
    borderRadius: scale(20),
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: scale(16),
  },
  textContainer: {
    justifyContent: 'center',
    flex: 1, // ensure text doesn't push past right edge
  },
  itemTitle: {
    fontSize: moderateScale(14, 0.3),
    fontWeight: '700',
    color: '#111827',
    marginBottom: verticalScale(2),
  },
  itemSubtitle: {
    fontSize: moderateScale(12, 0.3),
    fontWeight: '500',
    color: '#9CA3AF',
  },
  timeText: {
    fontSize: moderateScale(10, 0.3),
    fontWeight: '600',
    color: '#9CA3AF',
    marginTop: verticalScale(4), // align slightly down
  },
  divider: {
    height: 1,
    backgroundColor: '#F3F4F6',
    marginVertical: verticalScale(4),
  },
});
