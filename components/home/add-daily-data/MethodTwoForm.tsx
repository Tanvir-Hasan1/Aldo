import React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import { Feather } from '@expo/vector-icons';
import { HugeiconsIcon } from '@hugeicons/react-native';
import { Cash01Icon, UserGroupIcon, Wallet02Icon } from '@hugeicons/core-free-icons';

// Reusable custom input for this specific screen
const EuroInput = ({ label }: { label: string }) => {
  return (
    <View style={styles.inputContainer}>
      <Text style={styles.inputLabel}>{label}</Text>
      <View style={styles.inputWrapper}>
        <View style={styles.leadingIcon}>
          <Text style={styles.euroSymbol}>€</Text>
        </View>
        <TextInput
          style={styles.textInput}
          placeholder="0.00"
          placeholderTextColor="#9CA3AF"
          keyboardType="numeric"
        />
      </View>
    </View>
  );
};

const DollarInput = ({ label, description }: { label: string, description: string }) => {
  return (
    <View style={styles.inputContainer}>
      <Text style={styles.inputLabel}>{label}</Text>
      <Text style={styles.inputDescription}>{description}</Text>
      <View style={styles.inputWrapper}>
        <View style={styles.leadingIcon}>
          <Text style={styles.euroSymbol}>$</Text>
        </View>
        <TextInput
          style={styles.textInput}
          placeholder="0.00"
          placeholderTextColor="#9CA3AF"
          keyboardType="numeric"
        />
      </View>
    </View>
  );
};

export default function MethodTwoForm() {
  return (
    <View>
      {/* Payment Inputs Section */}
      <View style={styles.sectionHeader}>
        <View style={styles.sectionTitleRow}>
          <HugeiconsIcon icon={Cash01Icon} size={moderateScale(18)} color="#FA8C4C" />
          <Text style={styles.sectionTitle}>Payment Inputs</Text>
        </View>
        <TouchableOpacity style={styles.infoIconBg}>
           <Feather name="info" size={moderateScale(12)} color="#B45309" />
        </TouchableOpacity>
      </View>

      <EuroInput label="POS Payments (+)" />
      <EuroInput label="Cash Payments (+)" />
      <EuroInput label="Invoices Paid by Bank Transfer (+)" />

      {/* Customer Covers Section */}
      <View style={[styles.sectionHeader, { marginTop: verticalScale(8) }]}>
        <View style={styles.sectionTitleRow}>
          <HugeiconsIcon icon={UserGroupIcon} size={moderateScale(18)} color="#FA8C4C" />
          <Text style={styles.sectionTitle}>Customer Covers</Text>
        </View>
      </View>

      <View style={styles.splitRow}>
        <View style={[styles.inputContainer, { flex: 1, marginRight: scale(6) }]}>
          <Text style={styles.inputLabel}>Lunch Covers</Text>
          <View style={styles.inputWrapper}>
            <TextInput
              style={[styles.textInput, { paddingLeft: scale(16) }]}
              placeholder="0"
              placeholderTextColor="#9CA3AF"
              keyboardType="numeric"
            />
          </View>
        </View>
        <View style={[styles.inputContainer, { flex: 1, marginLeft: scale(6) }]}>
          <Text style={styles.inputLabel}>Dinner Covers</Text>
          <View style={styles.inputWrapper}>
            <TextInput
              style={[styles.textInput, { paddingLeft: scale(16) }]}
              placeholder="0"
              placeholderTextColor="#9CA3AF"
              keyboardType="numeric"
            />
          </View>
        </View>
      </View>

      {/* Cash Register Balance Section */}
      <View style={styles.registerCard}>
        <View style={[styles.sectionHeader, { marginBottom: verticalScale(12) }]}>
          <View style={styles.sectionTitleRow}>
            <HugeiconsIcon icon={Wallet02Icon} size={moderateScale(18)} color="#FA8C4C" />
            <Text style={styles.sectionTitle}>Cash Register Balance</Text>
          </View>
        </View>

        <DollarInput 
          label="Opening Cash" 
          description="Amount of cash in the register at the beginning of the day" 
        />
        
        <DollarInput 
          label="Closing Cash" 
          description="Amount of cash counted in the register at the end of the day" 
        />
      </View>

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
  sectionTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: moderateScale(15, 0.3),
    fontWeight: '800',
    color: '#111827',
    marginLeft: scale(8),
  },
  infoIconBg: {
    backgroundColor: '#FEF3C7',
    padding: scale(4),
    borderRadius: scale(12),
  },
  inputContainer: {
    marginBottom: verticalScale(16),
  },
  inputLabel: {
    fontSize: moderateScale(12, 0.3),
    fontWeight: '600',
    color: '#374151',
    marginBottom: verticalScale(8),
  },
  inputDescription: {
    fontSize: moderateScale(11, 0.3),
    color: '#6B7280',
    marginBottom: verticalScale(8),
    lineHeight: moderateScale(16, 0.3),
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
  euroSymbol: {
    fontSize: moderateScale(16, 0.3),
    fontWeight: '600',
    color: '#6B7280',
  },
  textInput: {
    height: verticalScale(50),
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: scale(12),
    paddingLeft: scale(40),
    paddingRight: scale(16),
    fontSize: moderateScale(16, 0.3),
    color: '#9CA3AF',
    backgroundColor: '#FFFFFF',
  },
  splitRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  registerCard: {
    backgroundColor: '#FFF7F2',
    borderWidth: 1,
    borderColor: '#EFE5DF',
    borderRadius: scale(16),
    padding: scale(16),
    marginTop: verticalScale(8),
  },
});
