import React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function DocumentsHeader() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Feather name="search" size={moderateScale(18)} color="#9CA3AF" style={styles.searchIcon} />
        <TextInput 
          style={styles.searchInput}
          placeholder="Search invoices, suppliers..."
          placeholderTextColor="#9CA3AF"
        />
      </View>

      {/* Filters and Action Row */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filtersRow}>
        <TouchableOpacity style={styles.filterChip}>
          <Text style={styles.filterText}>Date</Text>
          <Feather name="chevron-down" size={moderateScale(14)} color="#4B5563" />
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.filterChip}>
          <Text style={styles.filterText}>Supplier</Text>
          <Feather name="chevron-down" size={moderateScale(14)} color="#4B5563" />
        </TouchableOpacity>

        <TouchableOpacity style={[styles.filterChip, styles.filterChipActive]}>
          <Text style={styles.filterTextActive}>Status</Text>
          <Feather name="filter" size={moderateScale(14)} color="#FA8C4C" />
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: scale(20),
    paddingTop: verticalScale(16),
    marginBottom: verticalScale(16),
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    borderRadius: scale(12),
    paddingHorizontal: scale(16),
    height: verticalScale(48),
    marginBottom: verticalScale(16),
  },
  searchIcon: {
    marginRight: scale(12),
  },
  searchInput: {
    flex: 1,
    fontSize: moderateScale(14, 0.3),
    color: '#111827',
  },
  filtersRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  filterChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    paddingHorizontal: scale(16),
    paddingVertical: verticalScale(8),
    borderRadius: scale(20),
    marginRight: scale(12),
  },
  filterChipActive: {
    backgroundColor: '#FFF4ED',
    borderColor: '#FFDDC2',
  },
  filterText: {
    fontSize: moderateScale(12, 0.3),
    fontWeight: '600',
    color: '#111827',
    marginRight: scale(6),
  },
  filterTextActive: {
    fontSize: moderateScale(12, 0.3),
    fontWeight: '600',
    color: '#FA8C4C',
    marginRight: scale(6),
  },
});
