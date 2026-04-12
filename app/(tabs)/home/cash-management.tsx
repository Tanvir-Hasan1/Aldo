import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState, useEffect, useCallback } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  RefreshControl,
  ActivityIndicator
} from "react-native";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import Header from "../../../components/ui/Header";
import apiClient from "../../../api/apiClient";
import { useAppStore } from "../../../store/useAppStore";

import CashMetrics from "../../../components/home/cash/CashMetrics";
import RecentDeposits from "../../../components/home/cash/RecentDeposits";

export default function CashManagementScreen() {
  const router = useRouter();
  
  const cashOverviewData = useAppStore((state) => state.cashOverviewData);
  const setCashOverviewData = useAppStore((state) => state.setCashOverviewData);
  
  const [activeFilter, setActiveFilter] = useState("Today");
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(!cashOverviewData);

  const filters = ["Today", "This Week", "This Month"];

  const filterToPeriodKey = (filter: string) => {
    switch(filter) {
      case "Today": return "today";
      case "This Week": return "this_week";
      case "This Month": return "this_month";
      default: return "today";
    }
  };

  const fetchCashOverview = useCallback(async () => {
    try {
      const res = await apiClient.get("/api/v1/restaurant/cash/overview");
      setCashOverviewData(res.data);
    } catch (error) {
      console.error("Error fetching cash overview:", error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [setCashOverviewData]);

  useEffect(() => {
    fetchCashOverview();
  }, [fetchCashOverview]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchCashOverview();
  }, [fetchCashOverview]);

  const periodKey = filterToPeriodKey(activeFilter);
  const currentData = cashOverviewData?.periods?.[periodKey];

  return (
    <View style={styles.safeArea}>
      <Header title="Cash Management" showBack={true} />

      {loading && !cashOverviewData ? (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <ActivityIndicator size="large" color="#FA8C4C" />
        </View>
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={["#FA8C4C"]} />
          }
        >
          <Text style={styles.pageSubtitle}>
            Track and manage your restaurant's physical cash flow and bank deposits.
          </Text>

          <View style={{ flexDirection: 'row', gap: scale(12), marginBottom: verticalScale(20) }}>
            <TouchableOpacity 
              style={[styles.actionButton, { backgroundColor: '#FA8C4C' }]}
              onPress={() => router.push('/(tabs)/home/add-bank-deposit')}
            >
              <Feather name="plus" size={moderateScale(18)} color="#FFFFFF" style={{ marginRight: scale(6) }} />
              <Text style={styles.actionButtonText}>Deposit</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={[styles.actionButton, { backgroundColor: '#EF4444' }]}
            >
              <Feather name="minus" size={moderateScale(18)} color="#FFFFFF" style={{ marginRight: scale(6) }} />
              <Text style={styles.actionButtonText}>Withdraw</Text>
            </TouchableOpacity>
          </View>

          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false} 
            style={styles.filtersContainer}
          >
            {filters.map((filter) => {
              const isActive = activeFilter === filter;
              return (
                <TouchableOpacity
                  key={filter}
                  style={[styles.filterPill, isActive && styles.filterPillActive]}
                  onPress={() => setActiveFilter(filter)}
                >
                  <Text style={[styles.filterText, isActive && styles.filterTextActive]}>
                    {filter}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>

          {currentData && (
            <>
              <CashMetrics summary={currentData.summary} status={currentData.status} />
              <RecentDeposits deposits={currentData.recent_deposits} />
            </>
          )}
        </ScrollView>
      )}
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
    paddingBottom: verticalScale(40),
  },
  pageSubtitle: {
    fontSize: moderateScale(14, 0.3),
    color: "#6B7280",
    marginBottom: verticalScale(20),
    lineHeight: moderateScale(20),
  },
  actionButton: {
    flex: 1,
    flexDirection: "row",
    borderRadius: scale(12),
    paddingVertical: verticalScale(14),
    justifyContent: "center",
    alignItems: "center",
  },
  actionButtonText: {
    color: "#FFFFFF",
    fontSize: moderateScale(16, 0.3),
    fontWeight: "600",
  },
  filtersContainer: {
    flexDirection: "row",
    marginBottom: verticalScale(24),
  },
  filterPill: {
    paddingHorizontal: scale(16),
    paddingVertical: verticalScale(8),
    borderRadius: scale(20),
    borderWidth: 1,
    borderColor: '#D1D5DB',
    backgroundColor: '#FFFFFF',
    marginRight: scale(8),
  },
  filterPillActive: {
    backgroundColor: '#FA8C4C',
    borderColor: '#FA8C4C',
  },
  filterText: {
    color: '#6B7280',
    fontSize: moderateScale(13, 0.3),
    fontWeight: "500",
  },
  filterTextActive: {
    color: '#FFFFFF',
    fontWeight: "600",
  },
});
