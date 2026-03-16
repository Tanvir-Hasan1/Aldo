import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import { ArrowDownTrayIcon, ChevronDownIcon } from 'react-native-heroicons/outline';

export default function ActionFilterBar() {
  const [isExportMenuOpen, setIsExportMenuOpen] = useState(false);

  return (
    <View style={styles.container}>
       <View style={styles.spacer} /> {/* Pusher to align items right */}
      
      <View style={styles.actionsGroup}>
        <TouchableOpacity 
          style={styles.actionButton}
          onPress={() => setIsExportMenuOpen(true)}
        >
          <ArrowDownTrayIcon size={moderateScale(14)} color="#111827" />
          <Text style={styles.actionText}>Export Data</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.filterButton}>
          <Text style={styles.filterText}>Weekly</Text>
          <ChevronDownIcon size={moderateScale(14)} color="#111827" />
        </TouchableOpacity>
      </View>

      {/* Export Dropdown Modal */}
      <Modal
        visible={isExportMenuOpen}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setIsExportMenuOpen(false)}
      >
        <TouchableOpacity 
          style={styles.modalOverlay} 
          activeOpacity={1} 
          onPress={() => setIsExportMenuOpen(false)}
        >
          <View style={styles.dropdownMenu}>
            <TouchableOpacity 
              style={styles.exportOptionBtn}
              onPress={() => setIsExportMenuOpen(false)}
            >
              <Text style={styles.exportOptionText}>PDF</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.exportOptionBtn}
              onPress={() => setIsExportMenuOpen(false)}
            >
              <Text style={styles.exportOptionText}>Excel</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: verticalScale(20),
  },
  spacer: {
    flex: 1,
  },
  actionsGroup: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    paddingHorizontal: scale(12),
    paddingVertical: verticalScale(6),
    borderRadius: scale(8),
    marginRight: scale(8),
  },
  actionText: {
    fontSize: moderateScale(12, 0.3),
    fontWeight: '600',
    color: '#374151',
    marginLeft: scale(6),
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF0E5',
    paddingHorizontal: scale(12),
    paddingVertical: verticalScale(6),
    borderRadius: scale(8),
  },
  filterText: {
    fontSize: moderateScale(12, 0.3),
    fontWeight: '600',
    color: '#111827',
    marginRight: scale(6),
  },
  modalOverlay: {
    flex: 1,
  },
  dropdownMenu: {
    position: 'absolute',
    top: verticalScale(160), // Measured roughly below the export button considering safe area
    right: scale(100), // Positioned under the Export button
    backgroundColor: '#E5E7EB', // Light grey container
    borderRadius: scale(8),
    padding: scale(6),
    width: scale(100),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 8,
  },
  exportOptionBtn: {
    paddingVertical: verticalScale(6),
    alignItems: 'center',
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#111827',
    borderRadius: scale(4),
    marginBottom: verticalScale(6),
  },
  exportOptionText: {
    fontSize: moderateScale(12, 0.3),
    fontWeight: '500',
    color: '#111827',
  },
});
