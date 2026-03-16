import { Feather } from "@expo/vector-icons";
import { SaveIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react-native";
import { useNavigation, useRouter } from "expo-router";
import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";

import CashTrackingForm from "../../../components/home/add-daily-data/CashTrackingForm";
import DailyDataMethodSelector from "../../../components/home/add-daily-data/DailyDataMethodSelector";
import MethodTwoForm from "../../../components/home/add-daily-data/MethodTwoForm";

export default function AddDailyDataScreen() {
  const router = useRouter();
  const navigation = useNavigation();
  const [method, setMethod] = useState<"Method 1" | "Method 2">("Method 1");

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Feather name="arrow-left" size={moderateScale(20)} color="#111827" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Add Daily Data</Text>
        <TouchableOpacity style={styles.bellButton}>
          <Feather name="bell" size={moderateScale(18)} color="#111827" />
          <View style={styles.notificationDot} />
        </TouchableOpacity>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <Text style={styles.pageTitle}>Add Daily Business Data</Text>
        <Text style={styles.pageSubtitle}>
          Enter today's revenue and expenses to track your restaurant
          performance.
        </Text>

        <DailyDataMethodSelector method={method} setMethod={setMethod} />

        {method === "Method 1" ? <CashTrackingForm /> : <MethodTwoForm />}
      </ScrollView>

      {/* Sticky Bottom Button */}
      <View style={styles.bottomContainer}>
        <TouchableOpacity
          style={styles.saveButton}
          onPress={() => {
            router.dismissAll();
            router.push("/(tabs)/home/data-management");
          }}
        >
          <HugeiconsIcon
            icon={SaveIcon}
            size={moderateScale(18)}
            color="#FFFFFF"
          />
          <Text style={styles.saveButtonText}>Save Daily Data</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
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
    backgroundColor: "#F3F4F6",
    justifyContent: "center",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: moderateScale(16, 0.3),
    fontWeight: "700",
    color: "#111827",
  },
  bellButton: {
    width: moderateScale(40),
    height: moderateScale(40),
    borderRadius: moderateScale(20),
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    justifyContent: "center",
    alignItems: "center",
  },
  notificationDot: {
    position: "absolute",
    top: scale(10),
    right: scale(12),
    width: moderateScale(6),
    height: moderateScale(6),
    borderRadius: moderateScale(3),
    backgroundColor: "#EF4444",
  },
  scrollContent: {
    paddingHorizontal: scale(20),
    paddingTop: verticalScale(16),
    paddingBottom: verticalScale(100), // Space for sticky button
  },
  pageTitle: {
    fontSize: moderateScale(22, 0.3),
    fontWeight: "800",
    color: "#111827",
    marginBottom: verticalScale(8),
  },
  pageSubtitle: {
    fontSize: moderateScale(14, 0.3),
    color: "#6B7280",
    lineHeight: moderateScale(20, 0.3),
    marginBottom: verticalScale(24),
  },
  bottomContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: scale(20),
    paddingTop: verticalScale(12),
    paddingBottom: verticalScale(30),
    borderTopWidth: 1,
    borderTopColor: "#F3F4F6",
  },
  saveButton: {
    flexDirection: "row",
    backgroundColor: "#FA8C4C",
    borderRadius: scale(12),
    height: verticalScale(54),
    justifyContent: "center",
    alignItems: "center",
  },
  saveButtonText: {
    fontSize: moderateScale(16, 0.3),
    fontWeight: "700",
    color: "#FFFFFF",
    marginLeft: scale(8),
  },
});
