import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, View, ActivityIndicator, RefreshControl } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { scale, verticalScale } from "react-native-size-matters";
import { useRouter } from "expo-router";
import apiClient from "../../../api/apiClient";
import { useAppStore } from "../../../store/useAppStore";

// Home Components
import ActionFilterBar from "../../../components/home/ActionFilterBar";
import AIInsightBox from "../../../components/home/AIInsightBox";
import CashManagement from "../../../components/home/CashManagement";
import HomeHeader from "../../../components/home/HomeHeader";
import KPIGrid from "../../../components/home/KPIGrid";
import QuickActions from "../../../components/home/QuickActions";
import RecentActivity from "../../../components/home/RecentActivity";
import RevenueChart from "../../../components/home/RevenueChart";
import VatBalance from "../../../components/home/VatBalance";
import { generatePdfExport, generateExcelExport } from "../../../utils/exportData";

interface HomeDashboardData {
  greeting_name: string;
  restaurant_name: string;
  preferred_language: string;
  available_periods: string[];
  weekly: PeriodData;
  monthly: PeriodData;
  quick_actions: any[];
  recent_activity: any[];
}

interface PeriodData {
  metrics: any[];
  cash_management: any[];
  vat_balance: number;
  revenue: any[];
  featured_insight: any;
}

export default function TabsIndex() {
  const insets = useSafeAreaInsets();
  const router = useRouter();

  const setAnalyticsData = useAppStore((state) => state.setAnalyticsData);
  const setCashOverviewData = useAppStore((state) => state.setCashOverviewData);
  const [data, setData] = useState<HomeDashboardData | null>(null);
  const [activePeriod, setActivePeriod] = useState<string>("weekly");
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchHomeData = async () => {
    try {
      const [homeRes, analyticsRes, cashOverviewRes] = await Promise.all([
        apiClient.get("/api/v1/restaurant/home"),
        apiClient.get("/api/v1/restaurant/analytics/overview"),
        apiClient.get("/api/v1/restaurant/cash/overview")
      ]);
      
      setData(homeRes.data);
      setAnalyticsData(analyticsRes.data);
      setCashOverviewData(cashOverviewRes.data);

      if (homeRes.data.available_periods?.length > 0 && !homeRes.data.available_periods.includes(activePeriod)) {
        setActivePeriod(homeRes.data.available_periods[0]);
      }
    } catch (error: any) {
      console.log("API Error:", error.response?.data || error.message);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchHomeData();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    fetchHomeData();
  };

  const currentPeriodData = data ? (data as any)[activePeriod] as PeriodData : null;

  const handleExport = async (format: 'pdf' | 'excel') => {
    if (!currentPeriodData) return;

    if (format === 'pdf') {
      await generatePdfExport({
        metrics: currentPeriodData.metrics,
        cashData: currentPeriodData.cash_management,
        period: activePeriod,
      });
    } else if (format === 'excel') {
      await generateExcelExport({
        metrics: currentPeriodData.metrics,
        cashData: currentPeriodData.cash_management,
        period: activePeriod,
      });
    }
  };

  if (loading) {
    return (
      <View style={[styles.container, { justifyContent: "center", alignItems: "center" }]}>
        <ActivityIndicator size="large" color="#FA8C4C" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View
        style={{
          paddingTop: Math.max(
            insets.top + verticalScale(16),
            verticalScale(16),
          ),
          paddingHorizontal: scale(20),
          backgroundColor: "#F9FAFB",
          zIndex: 10,
        }}
      >
        <HomeHeader 
          greetingName={data?.greeting_name}
          restaurantName={data?.restaurant_name}
          preferredLanguage={data?.preferred_language}
        />
      </View>
      <ScrollView
        contentContainerStyle={[
          styles.scrollContent,
          {
            paddingTop: verticalScale(16),
            paddingBottom: Math.max(insets.bottom, verticalScale(0)),
          },
        ]}
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={["#FA8C4C"]} />}
      >
        <ActionFilterBar 
          activePeriod={activePeriod}
          availablePeriods={data?.available_periods || ["weekly", "monthly"]}
          onPeriodChange={setActivePeriod}
          onExport={handleExport}
        />
        <KPIGrid metrics={currentPeriodData?.metrics} />
        <CashManagement cashData={currentPeriodData?.cash_management} />
        <QuickActions items={data?.quick_actions} />
        <VatBalance balance={currentPeriodData?.vat_balance} onPress={() => router.push("/(tabs)/home/vat")} />
        <RevenueChart revenue={currentPeriodData?.revenue} period={activePeriod} />
        <AIInsightBox insight={currentPeriodData?.featured_insight} />
        <RecentActivity activities={data?.recent_activity} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB", // Slightly off-white background to match dashboard aesthetic
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: scale(20),
  },
});
