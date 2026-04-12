import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Modal,
  FlatList,
  ActivityIndicator,
  Alert,
} from "react-native";
import { BuildingLibraryIcon } from "react-native-heroicons/outline";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import Header from "../../../components/ui/Header";
import DatePicker from "../../../components/ui/DatePicker";
import apiClient from "../../../api/apiClient";

interface BankAccount {
  id?: string;
  bank_account: string;
  deposited_amount?: number;
  created_at?: string;
}

export default function AddBankDepositScreen() {
  const router = useRouter();
  const [date, setDate] = useState(new Date());
  const [amount, setAmount] = useState("");
  const [notes, setNotes] = useState("");

  const [accounts, setAccounts] = useState<BankAccount[]>([]);
  const [selectedAccount, setSelectedAccount] = useState("");
  const [isAccountListVisible, setIsAccountListVisible] = useState(false);
  const [isLoadingAccounts, setIsLoadingAccounts] = useState(false);
  
  const [isNewAccountModalVisible, setIsNewAccountModalVisible] = useState(false);
  const [newAccountName, setNewAccountName] = useState("");

  const [isEditAccountModalVisible, setIsEditAccountModalVisible] = useState(false);
  const [editAccountName, setEditAccountName] = useState("");
  const [editingAccount, setEditingAccount] = useState<BankAccount | null>(null);
  const [isUpdatingAccount, setIsUpdatingAccount] = useState(false);
  
  const [isSavingDeposit, setIsSavingDeposit] = useState(false);

  const handleSaveDeposit = async () => {
    if (!amount || !selectedAccount) {
      Alert.alert("Missing Fields", "Please enter an amount and select a bank account.");
      return;
    }
    
    setIsSavingDeposit(true);
    try {
      const depositDateString = date.toISOString().split('T')[0];
      const parsedAmount = parseFloat(amount) || 0;
      
      const payload = {
        deposit_date: depositDateString,
        amount: parsedAmount,
        bank_account: selectedAccount,
        notes: notes.trim(),
      };
      
      await apiClient.post("/api/v1/restaurant/cash/deposits", payload);
      
      // Navigate back on success
      router.back();
    } catch (error) {
      console.error("Error saving deposit:", error);
      Alert.alert("Error", "Could not save deposit. Please try again.");
    } finally {
      setIsSavingDeposit(false);
    }
  };

  const handleOpenAccountList = async () => {
    setIsAccountListVisible(true);
    setIsLoadingAccounts(true);
    try {
      const res = await apiClient.get("/api/v1/restaurant/cash/bank-accounts");
      setAccounts(res.data.items || []);
    } catch (error) {
      console.error("Error fetching accounts:", error);
    } finally {
      setIsLoadingAccounts(false);
    }
  };

  const [isCreatingAccount, setIsCreatingAccount] = useState(false);

  const handleCreateAccount = async () => {
    if (newAccountName.trim()) {
      const trimmedName = newAccountName.trim();
      setIsCreatingAccount(true);
      try {
        const res = await apiClient.post("/api/v1/restaurant/cash/bank-accounts", {
          bank_account: trimmedName
        });
        
        const newAccount = res.data?.id ? res.data : { 
          id: res.data?.id || Date.now().toString(), 
          bank_account: trimmedName, 
          deposited_amount: 0 
        };
        
        setAccounts([...accounts, newAccount]);
        setSelectedAccount(trimmedName);
        setNewAccountName("");
        setIsNewAccountModalVisible(false);
      } catch (error) {
        console.error("Error creating account:", error);
      } finally {
        setIsCreatingAccount(false);
      }
    }
  };

  const handleOpenEdit = (account: BankAccount) => {
    setEditingAccount(account);
    setEditAccountName(account.bank_account);
    setIsEditAccountModalVisible(true);
    setIsAccountListVisible(false); // smoothly exit list to show edit modal on top or just behind
  };

  const handleUpdateAccount = async () => {
    if (!editingAccount || !editingAccount.id) return;
    const trimmedName = editAccountName.trim();
    
    if (trimmedName && trimmedName !== editingAccount.bank_account) {
      setIsUpdatingAccount(true);
      try {
        await apiClient.patch(`/api/v1/restaurant/cash/bank-accounts/${editingAccount.id}`, {
          bank_account: trimmedName
        });
        
        setAccounts(accounts.map(acc => 
          acc.id === editingAccount.id ? { ...acc, bank_account: trimmedName } : acc
        ));
        
        if (selectedAccount === editingAccount.bank_account) {
          setSelectedAccount(trimmedName);
        }
      } catch (error) {
        console.error("Error updating account:", error);
      } finally {
        setIsUpdatingAccount(false);
      }
    }
    setIsEditAccountModalVisible(false);
    setIsAccountListVisible(true); // Return to list view
  };

  const handleDeleteAccount = async (accountToDelete: BankAccount) => {
    if (!accountToDelete.id) return;
    
    if ((accountToDelete.deposited_amount || 0) !== 0) {
      Alert.alert(
        "Action Not Allowed",
        "You cannot delete an account that currently holds a deposited balance. Please withdraw or transfer all funds to 0 first."
      );
      return;
    }
    
    try {
      await apiClient.delete(`/api/v1/restaurant/cash/bank-accounts/${accountToDelete.id}`);
      
      setAccounts(accounts.filter(acc => acc.id !== accountToDelete.id));
      if (selectedAccount === accountToDelete.bank_account) {
        setSelectedAccount("");
      }
    } catch (error) {
      console.error("Error deleting account:", error);
    }
  };

  return (
    <View style={styles.safeArea}>
      <Header title="Add Bank Deposit" showBack={true} />

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* Daily Reconciliation Banner */}
          <View style={styles.bannerContainer}>
            <View style={styles.bannerIconContainer}>
              <BuildingLibraryIcon size={moderateScale(24)} color="#FFFFFF" />
            </View>
            <View style={styles.bannerTextContainer}>
              <Text style={styles.bannerTitle}>DAILY RECONCILIATION</Text>
              <Text style={styles.bannerSubtitle}>Record cash and check drops for today.</Text>
            </View>
          </View>

          {/* Date */}
          <DatePicker
            label="Deposit Date"
            value={date}
            onChange={setDate}
            leftIcon={<Feather name="calendar" size={moderateScale(18)} color="#6B7280" />}
          />

          {/* Amount */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Amount Deposited</Text>
            <View style={styles.textInputContainer}>
              <Text style={styles.prefix}>€ </Text>
              <TextInput
                style={styles.textInput}
                placeholder="0.00"
                placeholderTextColor="#9CA3AF"
                keyboardType="numeric"
                value={amount}
                onChangeText={setAmount}
              />
            </View>
          </View>

          {/* Bank Account */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Bank Account</Text>
            <TouchableOpacity 
              style={styles.dropdownInput}
              onPress={handleOpenAccountList}
            >
              <Text style={selectedAccount ? styles.dropdownText : styles.dropdownPlaceholder}>
                {selectedAccount || "Select bank account"}
              </Text>
              <Feather name="chevron-down" size={moderateScale(20)} color="#6B7280" />
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.newCategoryPill}
              onPress={() => setIsNewAccountModalVisible(true)}
            >
              <Feather name="plus" size={moderateScale(12)} color="#FA8C4C" style={{ marginRight: scale(4) }} />
              <Text style={styles.newCategoryText}>Add Bank account</Text>
            </TouchableOpacity>
          </View>

          {/* Notes */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Notes (Optional)</Text>
            <TextInput
              style={styles.textArea}
              placeholder="e.g. End of shift deposit for Friday night..."
              placeholderTextColor="#9CA3AF"
              multiline
              textAlignVertical="top"
              value={notes}
              onChangeText={setNotes}
            />
          </View>
        </ScrollView>

        <View style={styles.bottomFooter}>
          <TouchableOpacity 
            style={[styles.saveButton, (!amount || !selectedAccount) && { opacity: 0.7 }]}
            onPress={handleSaveDeposit}
            disabled={isSavingDeposit || !amount || !selectedAccount}
          >
            {isSavingDeposit ? (
              <ActivityIndicator size="small" color="#FFFFFF" />
            ) : (
              <>
                <Feather name="save" size={moderateScale(18)} color="#FFFFFF" style={styles.saveIcon} />
                <Text style={styles.saveButtonText}>Save Deposit</Text>
              </>
            )}
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>

      {/* Account Selection Modal */}
      <Modal
        visible={isAccountListVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setIsAccountListVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.categoryListContainer}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Select Bank Account</Text>
              <TouchableOpacity onPress={() => setIsAccountListVisible(false)}>
                <Feather name="x" size={moderateScale(24)} color="#111827" />
              </TouchableOpacity>
            </View>
            {isLoadingAccounts ? (
              <View style={{ padding: scale(40), alignItems: 'center' }}>
                <ActivityIndicator size="small" color="#FA8C4C" />
              </View>
            ) : (
              <FlatList
                data={accounts}
                keyExtractor={(item) => item.id || item.bank_account}
                renderItem={({ item }) => (
                  <View style={styles.categoryItemRow}>
                    <TouchableOpacity 
                      style={styles.categoryItemMain}
                      onPress={() => {
                        setSelectedAccount(item.bank_account);
                        setIsAccountListVisible(false);
                      }}
                    >
                      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={[styles.categoryItemText, selectedAccount === item.bank_account && styles.selectedCategoryItemText]}>
                          {item.bank_account}
                        </Text>
                        {(item.deposited_amount !== undefined) && (
                          <Text style={styles.depositedAmountText}>
                            {" • "}${item.deposited_amount.toFixed(2)}
                          </Text>
                        )}
                      </View>
                      {selectedAccount === item.bank_account && (
                        <Feather name="check" size={moderateScale(18)} color="#FA8C4C" />
                      )}
                    </TouchableOpacity>
                    <View style={{ flexDirection: 'row', alignItems: 'center', paddingRight: scale(8) }}>
                      <TouchableOpacity 
                        style={styles.actionButton}
                        onPress={() => handleOpenEdit(item)}
                      >
                        <Feather name="edit-2" size={moderateScale(18)} color="#6B7280" />
                      </TouchableOpacity>
                      
                      <TouchableOpacity 
                        style={styles.actionButton}
                        onPress={() => handleDeleteAccount(item)}
                      >
                        <Feather name="trash-2" size={moderateScale(18)} color="#EF4444" />
                      </TouchableOpacity>
                    </View>
                  </View>
                )}
              />
            )}
          </View>
        </View>
      </Modal>

      {/* New Account Modal */}
      <Modal
        visible={isNewAccountModalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setIsNewAccountModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.newCategoryContainer}>
            <Text style={styles.modalTitle}>Add Bank Account</Text>
            <TextInput
              style={styles.modalInput}
              placeholder="Enter bank account name..."
              value={newAccountName}
              onChangeText={setNewAccountName}
              autoFocus
            />
            <View style={styles.modalActions}>
              <TouchableOpacity 
                style={styles.cancelButton}
                onPress={() => setIsNewAccountModalVisible(false)}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.confirmButton}
                onPress={handleCreateAccount}
                disabled={isCreatingAccount}
              >
                {isCreatingAccount ? (
                  <ActivityIndicator size="small" color="#FFFFFF" />
                ) : (
                  <Text style={styles.confirmButtonText}>Add</Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Edit Account Modal */}
      <Modal
        visible={isEditAccountModalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setIsEditAccountModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.newCategoryContainer}>
            <Text style={styles.modalTitle}>Edit Bank Account</Text>
            <TextInput
              style={styles.modalInput}
              placeholder="Enter bank account name..."
              value={editAccountName}
              onChangeText={setEditAccountName}
              autoFocus
            />
            <View style={styles.modalActions}>
              <TouchableOpacity 
                style={styles.cancelButton}
                onPress={() => {
                  setIsEditAccountModalVisible(false);
                  setIsAccountListVisible(true);
                }}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.confirmButton}
                onPress={handleUpdateAccount}
                disabled={isUpdatingAccount}
              >
                {isUpdatingAccount ? (
                  <ActivityIndicator size="small" color="#FFFFFF" />
                ) : (
                  <Text style={styles.confirmButtonText}>Save</Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: scale(20),
    paddingBottom: verticalScale(16),
  },
  backButton: {
    width: moderateScale(40),
    height: moderateScale(40),
    borderRadius: moderateScale(20),
    backgroundColor: "#F9FAFB",
    justifyContent: "center",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: moderateScale(16, 0.3),
    fontWeight: "700",
    color: "#111827",
  },
  scrollContent: {
    paddingHorizontal: scale(20),
    paddingTop: verticalScale(16),
    paddingBottom: verticalScale(100),
  },
  bannerContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFF8F3', // Light orange tint
    borderRadius: scale(16),
    padding: scale(16),
    marginBottom: verticalScale(24),
    borderWidth: 1,
    borderColor: '#FCE7D6',
    alignItems: 'center',
  },
  bannerIconContainer: {
    backgroundColor: '#FA8C4C',
    borderRadius: scale(12),
    width: moderateScale(48),
    height: moderateScale(48),
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: scale(16),
  },
  bannerTextContainer: {
    flex: 1,
  },
  bannerTitle: {
    fontSize: moderateScale(11, 0.3),
    fontWeight: '800',
    color: '#FA8C4C',
    letterSpacing: 0.5,
    marginBottom: verticalScale(4),
  },
  bannerSubtitle: {
    fontSize: moderateScale(13, 0.3),
    color: '#4B5563',
    lineHeight: moderateScale(18),
  },
  inputGroup: {
    marginBottom: verticalScale(20),
  },
  label: {
    fontSize: moderateScale(14, 0.3),
    fontWeight: '700',
    color: '#374151',
    marginBottom: verticalScale(8),
  },
  dropdownInput: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: scale(12),
    height: verticalScale(50),
    paddingHorizontal: scale(16),
    backgroundColor: '#FFFFFF',
  },
  dropdownPlaceholder: {
    fontSize: moderateScale(15, 0.3),
    color: '#111827',
  },
  textInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: scale(12),
    height: verticalScale(50),
    paddingHorizontal: scale(16),
    backgroundColor: '#FFFFFF',
  },
  prefix: {
    fontSize: moderateScale(16, 0.3),
    color: '#111827',
    fontWeight: '700',
  },
  textInput: {
    flex: 1,
    fontSize: moderateScale(16, 0.3),
    color: '#111827',
    fontWeight: '600',
  },
  textArea: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: scale(12),
    height: verticalScale(120),
    paddingHorizontal: scale(16),
    paddingTop: verticalScale(16),
    backgroundColor: '#FFFFFF',
    fontSize: moderateScale(15, 0.3),
    color: '#111827',
  },
  bottomFooter: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: scale(20),
    paddingVertical: verticalScale(20),
    backgroundColor: "#FFFFFF",
    borderTopWidth: 1,
    borderTopColor: "#F3F4F6",
  },
  saveButton: {
    flexDirection: "row",
    backgroundColor: "#FA8C4C",
    borderRadius: scale(12),
    paddingVertical: verticalScale(14),
    justifyContent: "center",
    alignItems: "center",
  },
  saveIcon: {
    marginRight: scale(8),
  },
  saveButtonText: {
    color: "#FFFFFF",
    fontSize: moderateScale(16, 0.3),
    fontWeight: "700",
  },
  dropdownText: {
    fontSize: moderateScale(15, 0.3),
    color: '#111827',
    fontWeight: '500',
  },
  newCategoryPill: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    borderWidth: 1,
    borderColor: '#FCE7D6',
    backgroundColor: '#FFF8F3',
    borderRadius: scale(20),
    paddingHorizontal: scale(12),
    paddingVertical: verticalScale(6),
    marginTop: verticalScale(8),
  },
  newCategoryText: {
    color: '#FA8C4C',
    fontSize: moderateScale(12, 0.3),
    fontWeight: '600',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  categoryListContainer: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: scale(24),
    borderTopRightRadius: scale(24),
    maxHeight: '80%',
    paddingBottom: verticalScale(30),
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: scale(20),
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  modalTitle: {
    fontSize: moderateScale(18, 0.3),
    fontWeight: '700',
    color: '#111827',
  },
  categoryItemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#F9FAFB',
  },
  categoryItemMain: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: verticalScale(16),
    paddingLeft: scale(20),
    paddingRight: scale(10),
  },
  actionButton: {
    padding: scale(10),
  },
  deleteCategoryButton: {
    padding: scale(16),
  },
  categoryItemText: {
    fontSize: moderateScale(16, 0.3),
    color: '#4B5563',
  },
  selectedCategoryItemText: {
    color: '#FA8C4C',
    fontWeight: '600',
  },
  newCategoryContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: scale(16),
    margin: scale(20),
    padding: scale(24),
    marginBottom: '50%',
  },
  modalInput: {
    borderBottomWidth: 1,
    borderBottomColor: '#D1D5DB',
    fontSize: moderateScale(16, 0.3),
    color: '#111827',
    paddingVertical: verticalScale(8),
    marginVertical: verticalScale(20),
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  cancelButton: {
    paddingHorizontal: scale(16),
    paddingVertical: verticalScale(8),
    marginRight: scale(8),
  },
  cancelButtonText: {
    color: '#6B7280',
    fontSize: moderateScale(15, 0.3),
    fontWeight: '600',
  },
  confirmButton: {
    backgroundColor: '#FA8C4C',
    paddingHorizontal: scale(20),
    paddingVertical: verticalScale(8),
    borderRadius: scale(8),
  },
  confirmButtonText: {
    color: '#FFFFFF',
    fontSize: moderateScale(15, 0.3),
    fontWeight: '600',
  },
  depositedAmountText: {
    fontSize: moderateScale(14, 0.3),
    color: '#10B981',
    fontWeight: '600',
  },
});
