import React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import { Feather } from '@expo/vector-icons';
import { HugeiconsIcon } from '@hugeicons/react-native';
import { Cash01Icon, Wallet01Icon, Invoice01Icon } from '@hugeicons/core-free-icons';

// Reusable custom input for this specific screen
const CurrencyInput = ({ label, icon, placeholder, rightLabel, rightLabelIcon }: any) => {
  return (
    <View style={styles.inputContainer}>
      <View style={styles.labelRow}>
        <Text style={styles.inputLabel}>{label}</Text>
        {rightLabel && (
          <TouchableOpacity style={styles.rightLabelBtn}>
            {rightLabelIcon && <Feather name={rightLabelIcon} size={moderateScale(10)} color="#FA8C4C" style={{ marginRight: scale(4) }} />}
            <Text style={styles.rightLabelText}>{rightLabel}</Text>
          </TouchableOpacity>
        )}
      </View>
      <View style={styles.inputWrapper}>
        <View style={styles.leadingIcon}>
          {icon}
        </View>
        <TextInput
          style={styles.textInput}
          placeholder={placeholder || "0.00"}
          placeholderTextColor="#9CA3AF"
          keyboardType="numeric"
        />
        <Text style={styles.trailingText}>USD</Text>
      </View>
    </View>
  );
};

export default function CashTrackingForm() {
  return (
    <View>
      {/* Section Title */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>CASH TRACKING</Text>
        <Feather name="info" size={moderateScale(14)} color="#D1D5DB" />
      </View>

      {/* Form Inputs */}
      <CurrencyInput 
        label="POS Payments (+)" 
        icon={<HugeiconsIcon icon={Cash01Icon} size={moderateScale(18)} color="#FA8C4C" />} 
      />
      
      <CurrencyInput 
        label="Cash Withdrawals (+)" 
        icon={<HugeiconsIcon icon={Wallet01Icon} size={moderateScale(18)} color="#FA8C4C" />} 
      />

      {/* Split Row */}
      <View style={styles.splitRow}>
        <View style={[styles.inputContainer, { flex: 1, marginRight: scale(6) }]}>
          <Text style={styles.inputLabel}>Cash In (-)</Text>
          <View style={styles.inputWrapper}>
            <TextInput
              style={[styles.textInput, { paddingLeft: scale(16) }]}
              placeholder="0.00"
              placeholderTextColor="#9CA3AF"
              keyboardType="numeric"
            />
          </View>
        </View>
        <View style={[styles.inputContainer, { flex: 1, marginLeft: scale(6) }]}>
          <Text style={styles.inputLabel}>Cash Out (+)</Text>
          <View style={styles.inputWrapper}>
            <TextInput
              style={[styles.textInput, { paddingLeft: scale(16) }]}
              placeholder="0.00"
              placeholderTextColor="#9CA3AF"
              keyboardType="numeric"
            />
          </View>
        </View>
      </View>

      <CurrencyInput 
        label="Expenses in Cash (+)" 
        icon={<HugeiconsIcon icon={Invoice01Icon} size={moderateScale(18)} color="#FA8C4C" />} 
        rightLabel="Add note"
        rightLabelIcon="edit-2"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: verticalScale(16),
  },
  sectionTitle: {
    fontSize: moderateScale(12, 0.3),
    fontWeight: '800',
    color: '#111827',
  },
  inputContainer: {
    marginBottom: verticalScale(16),
  },
  labelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: verticalScale(8),
  },
  inputLabel: {
    fontSize: moderateScale(13, 0.3),
    fontWeight: '600',
    color: '#374151',
    marginBottom: verticalScale(8), // applies when labelRow isn't used (split row)
  },
  rightLabelBtn: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rightLabelText: {
    fontSize: moderateScale(12, 0.3),
    fontWeight: '600',
    color: '#FA8C4C',
  },
  inputWrapper: {
    position: 'relative',
    justifyContent: 'center',
  },
  leadingIcon: {
    position: 'absolute',
    left: scale(16),
    zIndex: 1,
  },
  textInput: {
    height: verticalScale(52),
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: scale(12),
    paddingLeft: scale(46),
    paddingRight: scale(46),
    fontSize: moderateScale(16, 0.3),
    fontWeight: '600',
    color: '#111827',
    backgroundColor: '#FFFFFF',
  },
  trailingText: {
    position: 'absolute',
    right: scale(16),
    fontSize: moderateScale(14, 0.3),
    fontWeight: '600',
    color: '#9CA3AF',
  },
  splitRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
