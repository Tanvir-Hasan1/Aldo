import { Feather } from '@expo/vector-icons';
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';

export function FilterChips() {
  return (
    <View style={styles.container}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        {/* Active Filter (All Items) */}
        <TouchableOpacity style={[styles.chip, styles.chipActive]}>
          <Text style={styles.chipTextActive}>All Items</Text>
        </TouchableOpacity>

        {/* Dropdown Filter (Supplier) */}
        <TouchableOpacity style={styles.chipDropdown}>
          <Text style={styles.chipDropdownText}>Supplier</Text>
          <Feather name="chevron-down" size={moderateScale(14)} color="#4B5563" />
        </TouchableOpacity>

        {/* Dropdown Filter (Category) */}
        <TouchableOpacity style={styles.chipDropdown}>
          <Text style={styles.chipDropdownText}>Category</Text>
          <Feather name="chevron-down" size={moderateScale(14)} color="#4B5563" />
        </TouchableOpacity>

        {/* Highlight Filter (Low Stock) */}
        <TouchableOpacity style={[styles.chip, styles.chipHighlight]}>
          <Text style={styles.chipTextHighlight}>Low Stock</Text>
        </TouchableOpacity>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: verticalScale(16),
  },
  scrollContent: {
    paddingHorizontal: scale(20),
    gap: scale(8),
  },
  chip: {
    paddingHorizontal: scale(16),
    paddingVertical: verticalScale(8),
    borderRadius: scale(20),
    justifyContent: 'center',
    alignItems: 'center',
  },
  chipActive: {
    backgroundColor: '#FA8C4C',
  },
  chipTextActive: {
    color: '#FFFFFF',
    fontSize: moderateScale(13),
    fontWeight: '500',
  },
  chipDropdown: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    paddingHorizontal: scale(14),
    paddingVertical: verticalScale(8),
    borderRadius: scale(20),
    borderWidth: 1,
    borderColor: '#E5E7EB',
    gap: scale(6),
  },
  chipDropdownText: {
    color: '#4B5563',
    fontSize: moderateScale(13),
    fontWeight: '500',
  },
  chipHighlight: {
    backgroundColor: '#FFF4EE',
    borderWidth: 1,
    borderColor: '#FFE0CC',
  },
  chipTextHighlight: {
    color: '#EA580C',
    fontSize: moderateScale(13),
    fontWeight: '500',
  },
});
