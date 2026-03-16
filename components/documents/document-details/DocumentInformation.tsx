import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';

interface DocumentInformationProps {
  supplierName: string;
  totalAmount: string;
  invoiceDate: string;
  uploadDate: string;
}

export default function DocumentInformation({ supplierName, totalAmount, invoiceDate, uploadDate }: DocumentInformationProps) {
  return (
    <View style={styles.card}>
      <Text style={styles.sectionTitle}>Document Information</Text>
      
      <View style={styles.gridRow}>
        <View style={styles.gridItem}>
          <Text style={styles.label}>Supplier Name</Text>
          <Text style={styles.valueDark}>{supplierName}</Text>
        </View>
        <View style={styles.gridItem}>
          <Text style={styles.label}>Total Amount</Text>
          <Text style={styles.valueHighlight}>{totalAmount}</Text>
        </View>
      </View>
      
      <View style={styles.gridRow}>
        <View style={styles.gridItem}>
          <Text style={styles.label}>Invoice Date</Text>
          <Text style={styles.valueDark}>{invoiceDate}</Text>
        </View>
        <View style={styles.gridItem}>
          <Text style={styles.label}>Upload Date</Text>
          <Text style={styles.valueLight}>{uploadDate}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#F3F4F6',
    borderRadius: scale(16),
    padding: scale(20),
    marginBottom: verticalScale(24),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 6,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: moderateScale(14, 0.3),
    fontWeight: '700',
    color: '#111827',
    marginBottom: verticalScale(20),
  },
  gridRow: {
    flexDirection: 'row',
    marginBottom: verticalScale(16),
  },
  gridItem: {
    flex: 1,
  },
  label: {
    fontSize: moderateScale(11, 0.3),
    color: '#9CA3AF',
    marginBottom: verticalScale(4),
  },
  valueDark: {
    fontSize: moderateScale(14, 0.3),
    fontWeight: '600',
    color: '#111827',
  },
  valueHighlight: {
    fontSize: moderateScale(14, 0.3),
    fontWeight: '700',
    color: '#FA8C4C',
  },
  valueLight: {
    fontSize: moderateScale(14, 0.3),
    color: '#4B5563',
  },
});
