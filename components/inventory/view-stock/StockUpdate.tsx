import { Feather } from '@expo/vector-icons';
import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';

export function StockUpdate() {
  const [stockToUpdate, setStockToUpdate] = useState({ add: 0, remove: 0 });

  return (
    <View>
      <Text style={styles.sectionTitle}>Stock Update</Text>
      <View style={styles.updateRow}>
        <TouchableOpacity
          style={styles.updateBox}
          onPress={() => setStockToUpdate((prev) => ({ ...prev, add: prev.add + 1 }))}
        >
          <Text style={styles.updateLabel}>ADD STOCK</Text>
          <View style={styles.updateControls}>
            <Feather name="plus-circle" size={moderateScale(20)} color="#16A34A" />
            <Text style={styles.updateNum}>{stockToUpdate.add}</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.updateBox}
          onPress={() => setStockToUpdate((prev) => ({ ...prev, remove: prev.remove + 1 }))}
        >
          <Text style={styles.updateLabel}>REMOVE STOCK</Text>
          <View style={styles.updateControls}>
            <Feather name="minus-circle" size={moderateScale(20)} color="#DC2626" />
            <Text style={styles.updateNum}>{stockToUpdate.remove}</Text>
          </View>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.updateButton}>
        <Text style={styles.updateButtonText}>Update Stock Level</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  sectionTitle: {
    fontSize: moderateScale(16),
    fontWeight: '700',
    color: '#111827',
    marginBottom: verticalScale(12),
  },
  updateRow: { flexDirection: 'row', gap: scale(12), marginBottom: verticalScale(12) },
  updateBox: {
    flex: 1,
    backgroundColor: '#F9FAFB',
    borderRadius: scale(12),
    padding: scale(14),
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  updateLabel: { fontSize: moderateScale(10), fontWeight: '700', color: '#111827', marginBottom: verticalScale(8) },
  updateControls: { flexDirection: 'row', alignItems: 'center', gap: scale(8) },
  updateNum: { fontSize: moderateScale(18), fontWeight: '700', color: '#111827' },
  updateButton: {
    backgroundColor: '#FA8C4C',
    borderRadius: scale(10),
    paddingVertical: verticalScale(14),
    alignItems: 'center',
    marginBottom: verticalScale(24),
  },
  updateButtonText: { color: '#FFFFFF', fontSize: moderateScale(14), fontWeight: '600' },
});
