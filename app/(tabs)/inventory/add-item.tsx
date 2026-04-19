import { Feather } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import Header from "../../../components/ui/Header";

import DatePicker from '../../../components/ui/DatePicker';
import { useTranslation } from '../../../utils/i18n';

export default function AddInventoryItemScreen() {
  const { t } = useTranslation();
  const [purchaseDate, setPurchaseDate] = useState(new Date());

  return (
    <View style={styles.safe}>
      <Header title={t('add_inventory_title')} showBack={true} />
      <KeyboardAvoidingView 
        style={{ flex: 1 }} 
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >

        <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
          <Text style={styles.pageTitle}>{t('add_inventory_item')}</Text>
          <Text style={styles.pageSubtitle}>
            {t('add_inventory_item_subtitle')}
          </Text>

          {/* Form Fields */}
          <View style={styles.formGroup}>
            <Text style={styles.label}>{t('product_name')}</Text>
            <TextInput style={styles.input} placeholder={t('product_name_placeholder')} placeholderTextColor="#9CA3AF" />
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>{t('category')}</Text>
            <TouchableOpacity style={styles.dropdownInput}>
              <Text style={styles.dropdownText}>{t('select_category')}</Text>
              <Feather name="chevron-down" size={moderateScale(18)} color="#111827" />
            </TouchableOpacity>
          </View>

          <View style={styles.row}>
            <View style={[styles.formGroup, { flex: 1 }]}>
              <Text style={styles.label}>{t('form_stock_quantity')}</Text>
              <TextInput style={styles.input} placeholder="0" keyboardType="numeric" placeholderTextColor="#9CA3AF" />
            </View>
            <View style={[styles.formGroup, { flex: 1 }]}>
              <Text style={styles.label}>{t('unit_type')}</Text>
              <TouchableOpacity style={styles.dropdownInput}>
                <Text style={styles.dropdownTextFilled}>kg</Text>
                <Feather name="chevron-down" size={moderateScale(18)} color="#111827" />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>{t('supplier_name')}</Text>
            <TextInput style={styles.input} placeholder={t('enter_supplier_name')} placeholderTextColor="#9CA3AF" />
          </View>

          <View style={styles.row}>
            <View style={[styles.formGroup, { flex: 1 }]}>
              <Text style={styles.label}>{t('unit_price')}</Text>
              <TextInput style={styles.input} placeholder="0.00" keyboardType="decimal-pad" placeholderTextColor="#9CA3AF" />
            </View>
            <View style={[styles.formGroup, { flex: 1 }]}>
              <Text style={styles.label}>{t('alert_threshold')}</Text>
              <TextInput style={styles.input} placeholder={t('low_stock_at')} keyboardType="numeric" placeholderTextColor="#9CA3AF" />
            </View>
          </View>

          <DatePicker 
            label={t('purchase_date')} 
            value={purchaseDate} 
            onChange={setPurchaseDate} 
          />


          {/* Spacer */}
          <View style={{ height: verticalScale(40) }} />
        </ScrollView>

        <View style={styles.footer}>
          <TouchableOpacity style={styles.saveBtn} onPress={() => router.back()}>
            <Feather name="save" size={moderateScale(18)} color="#FFFFFF" />
            <Text style={styles.saveBtnText}>{t('save_item')}</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#FFFFFF' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: scale(20),
    paddingVertical: verticalScale(12),
  },
  backBtn: {
    width: moderateScale(40),
    height: moderateScale(40),
    borderRadius: moderateScale(20),
    backgroundColor: '#F9FAFB',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  headerTitleContainer: { flex: 1, alignItems: 'center' },
  headerTitle: { fontSize: moderateScale(16), fontWeight: '700', color: '#111827' },
  
  scroll: { flex: 1, paddingHorizontal: scale(20) },
  pageTitle: { fontSize: moderateScale(20), fontWeight: '700', color: '#111827', marginTop: verticalScale(10) },
  pageSubtitle: { fontSize: moderateScale(14), color: '#6B7280', marginTop: verticalScale(6), marginBottom: verticalScale(24) },

  formGroup: { marginBottom: verticalScale(16) },
  row: { flexDirection: 'row', gap: scale(12) },
  label: { fontSize: moderateScale(12), fontWeight: '700', color: '#111827', marginBottom: verticalScale(8) },
  
  input: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: scale(10),
    paddingHorizontal: scale(14),
    paddingVertical: verticalScale(12),
    fontSize: moderateScale(14),
    color: '#111827',
  },
  dropdownInput: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: scale(10),
    paddingHorizontal: scale(14),
    paddingVertical: verticalScale(12),
  },
  dropdownText: { fontSize: moderateScale(14), color: '#9CA3AF' },
  dropdownTextFilled: { fontSize: moderateScale(14), color: '#111827' },

  footer: {
    paddingHorizontal: scale(20),
    paddingTop: verticalScale(16),
    paddingBottom: verticalScale(24),
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
  },
  saveBtn: {
    backgroundColor: '#FA8C4C',
    borderRadius: scale(10),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: verticalScale(14),
    gap: scale(8),
  },
  saveBtnText: { color: '#FFFFFF', fontSize: moderateScale(15), fontWeight: '600' },
});
