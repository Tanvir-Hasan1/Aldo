import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import { useRouter } from 'expo-router';
import { DocumentArrowUpIcon, PencilSquareIcon, ClipboardDocumentListIcon, CurrencyDollarIcon } from 'react-native-heroicons/outline';
import { useTranslation } from '../../utils/i18n';

interface ActionItemProps {
  title: string;
  IconComponent: any;
  onPress?: () => void;
}

const ActionItem = ({ title, IconComponent, onPress }: ActionItemProps) => {
  return (
    <TouchableOpacity style={styles.itemContainer} onPress={onPress}>
      <View style={styles.iconContainer}>
        <IconComponent size={moderateScale(20)} color="#FA8C4C" />
      </View>
      <Text style={styles.itemTitle}>{title}</Text>
    </TouchableOpacity>
  );
};

interface QuickActionsProps {
  items?: {
    key: string;
    label: string;
  }[];
}

export default function QuickActions({ items: apiItems }: QuickActionsProps) {
  const router = useRouter();
  const { t } = useTranslation();
  
  const getActionData = (key: string) => {
    switch (key) {
      case 'upload_invoice':
        return { IconComponent: DocumentArrowUpIcon, route: '/(tabs)/home/upload-invoice' };
      case 'daily_data':
        return { IconComponent: PencilSquareIcon, route: '/(tabs)/home/add-daily-data' };
      case 'expenses':
        return { IconComponent: ClipboardDocumentListIcon, route: '/(tabs)/home/expenses' };
      case 'cash':
        return { IconComponent: CurrencyDollarIcon, route: '/(tabs)/home/cash-management' };
      default:
        return { IconComponent: PencilSquareIcon, route: '/(tabs)/home' };
    }
  };

  const fallbackActions = [
    { key: 'upload_invoice', label: t('upload_invoice') },
    { key: 'daily_data', label: t('add_daily_data') },
    { key: 'expenses', label: t('expenses') },
    { key: 'cash', label: t('cash') },
  ];

  const displayActions = (apiItems && apiItems.length > 0 ? apiItems : fallbackActions).map(item => {
    const { IconComponent, route } = getActionData(item.key);
    return {
      title: item.label,
      IconComponent,
      onPress: () => router.push(route as any),
    };
  });

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>{t('quick_actions')}</Text>
      
      <View style={styles.cardContainer}>
        {displayActions.map((item: any) => (
          <ActionItem key={item.title} {...item} />
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  itemContainer: {
    alignItems: 'center',
    width: '24%', // roughly quarter width to fit 4 evenly
  },
  iconContainer: {
    width: scale(48),
    height: scale(48),
    borderRadius: scale(24),
    backgroundColor: '#FFF0E5', // Matches faint orange
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: verticalScale(8),
    borderWidth: 1,
    borderColor: '#F9D8C4', // Slight darker border on these ones
  },
  itemTitle: {
    fontSize: moderateScale(10, 0.3),
    fontWeight: '600',
    color: '#374151',
    textAlign: 'center',
  },
});
