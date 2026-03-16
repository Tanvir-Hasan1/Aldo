import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { scale, verticalScale } from "react-native-size-matters";

// Home Components
import ActionFilterBar from "../../components/home/ActionFilterBar";
import AIInsightBox from "../../components/home/AIInsightBox";
import CashManagement from "../../components/home/CashManagement";
import HomeHeader from "../../components/home/HomeHeader";
import KPIGrid from "../../components/home/KPIGrid";
import QuickActions from "../../components/home/QuickActions";
import RecentActivity from "../../components/home/RecentActivity";
import RevenueChart from "../../components/home/RevenueChart";
import VatBalance from "../../components/home/VatBalance";

export default function TabsIndex() {
  const insets = useSafeAreaInsets();

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
        <HomeHeader />
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
      >
        <ActionFilterBar />
        <KPIGrid />
        <CashManagement />
        <QuickActions />
        <VatBalance />
        <RevenueChart />
        <AIInsightBox />
        <RecentActivity />
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
