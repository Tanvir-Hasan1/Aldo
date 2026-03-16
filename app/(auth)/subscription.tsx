import { MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
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

// @ts-ignore
import SplashLogo from "../../assets/images/splash-logo.svg";

export default function SubscriptionScreen() {
  const router = useRouter();
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">(
    "monthly",
  );

  const handleStartTrial = () => {
    // Navigate to the AI setup wizard
    router.push("/(auth)/setup");
  };

  const features = [
    "Unlimited invoice scanning",
    "Advanced AI insights",
    "Revenue and cost analytics",
    "Performance reports",
    "Supplier price alerts",
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Logo */}
        <View style={styles.logoContainer}>
          <SplashLogo width={scale(90)} height={scale(90)} />
        </View>

        {/* Header */}
        <View style={styles.headerContainer}>
          <Text style={styles.headerTitle}>Choose Your Plan</Text>
          <Text style={styles.headerSubtitle}>
            Unlock powerful AI tools to manage your restaurant business.
          </Text>
        </View>

        {/* Toggle (Monthly / Yearly) */}
        <View style={styles.toggleContainer}>
          <TouchableOpacity
            style={[
              styles.toggleButton,
              billingCycle === "monthly" ? styles.toggleButtonActive : null,
            ]}
            onPress={() => setBillingCycle("monthly")}
          >
            <Text
              style={[
                styles.toggleText,
                billingCycle === "monthly" ? styles.toggleTextActive : null,
              ]}
            >
              Monthly
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.toggleButton,
              billingCycle === "yearly" ? styles.toggleButtonActive : null,
            ]}
            onPress={() => setBillingCycle("yearly")}
          >
            <Text
              style={[
                styles.toggleText,
                billingCycle === "yearly" ? styles.toggleTextActive : null,
              ]}
            >
              Yearly (2 months free)
            </Text>
          </TouchableOpacity>
        </View>

        {/* Plan Card */}
        <View style={styles.cardContainer}>
          {/* Best Value Ribbon */}
          <LinearGradient
            colors={["#160c03", "#c78b1e"]}
            start={{ x: 0, y: 0.5 }}
            end={{ x: 1, y: 0.5 }}
            style={styles.ribbonContainer}
          >
            <Text style={styles.ribbonText}>BEST VALUE</Text>
          </LinearGradient>

          <Text style={styles.planTitle}>Pro Plan</Text>

          <View style={styles.priceContainer}>
            <Text style={styles.priceAmount}>
              ${billingCycle === "monthly" ? "29" : "290"}
            </Text>
            <Text style={styles.pricePeriod}>
              {billingCycle === "monthly" ? " / month" : " / year"}
            </Text>
          </View>

          <Text style={styles.trialText}>7-day free trial included</Text>

          {/* Features */}
          <View style={styles.featuresContainer}>
            {features.map((feature, index) => (
              <View key={index} style={styles.featureRow}>
                <MaterialCommunityIcons
                  name="check-decagram-outline"
                  size={moderateScale(20)}
                  color="#D97706"
                />
                <Text style={styles.featureText}>{feature}</Text>
              </View>
            ))}
          </View>

          <TouchableOpacity
            style={styles.startButton}
            onPress={handleStartTrial}
          >
            <Text style={styles.startButtonText}>Start 7-Day Free Trial</Text>
          </TouchableOpacity>
        </View>

        {/* Footer */}
        <View style={styles.footerContainer}>
          <Text style={styles.footerCancelText}>Cancel anytime.</Text>
          <View style={styles.footerLinksRow}>
            <TouchableOpacity>
              <Text style={styles.footerLink}>Terms of Service</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={styles.footerLink}>Privacy Policy</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: scale(20),
    paddingTop: verticalScale(40),
    paddingBottom: verticalScale(40),
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: verticalScale(16),
  },
  headerContainer: {
    alignItems: "center",
    marginBottom: verticalScale(30),
  },
  headerTitle: {
    fontSize: moderateScale(28, 0.3),
    fontWeight: "800",
    color: "#111827",
    marginBottom: verticalScale(8),
  },
  headerSubtitle: {
    fontSize: moderateScale(15, 0.3),
    color: "#6B7280",
    textAlign: "center",
    paddingHorizontal: scale(10),
    lineHeight: moderateScale(22, 0.3),
  },
  toggleContainer: {
    flexDirection: "row",
    backgroundColor: "#F3F4F6",
    borderRadius: scale(12),
    padding: scale(4),
    marginBottom: verticalScale(30),
  },
  toggleButton: {
    flex: 1,
    paddingVertical: verticalScale(12),
    alignItems: "center",
    borderRadius: scale(10),
  },
  toggleButtonActive: {
    backgroundColor: "#FFFFFF",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  toggleText: {
    fontSize: moderateScale(14, 0.3),
    fontWeight: "600",
    color: "#6B7280",
  },
  toggleTextActive: {
    color: "#FA8C4C",
  },
  cardContainer: {
    borderWidth: 2,
    borderColor: "#D97706",
    borderRadius: scale(20),
    padding: scale(24),
    backgroundColor: "#FFFFFF",
    position: "relative",
    shadowColor: "#D97706",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 5,
    marginBottom: verticalScale(30),
  },
  ribbonContainer: {
    position: "absolute",
    top: -2 /* Slightly offset to cover border */,
    right: -2,
    borderTopRightRadius: scale(20),
    borderBottomLeftRadius: scale(24),
    paddingHorizontal: scale(16),
    paddingVertical: verticalScale(6),
  },
  ribbonText: {
    color: "#FFFFFF",
    fontSize: moderateScale(11, 0.3),
    fontWeight: "800",
    letterSpacing: 1.5,
  },
  planTitle: {
    fontSize: moderateScale(22, 0.3),
    fontWeight: "800",
    color: "#111827",
    marginBottom: verticalScale(4),
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
    marginBottom: verticalScale(16),
  },
  priceAmount: {
    fontSize: moderateScale(38, 0.3),
    fontWeight: "800",
    color: "#111827",
    lineHeight: moderateScale(42, 0.3),
  },
  pricePeriod: {
    fontSize: moderateScale(15, 0.3),
    fontWeight: "500",
    color: "#6B7280",
    marginBottom: verticalScale(6),
  },
  trialText: {
    color: "#FA8C4C",
    fontWeight: "700",
    fontSize: moderateScale(14, 0.3),
    marginBottom: verticalScale(20),
  },
  featuresContainer: {
    marginBottom: verticalScale(24),
  },
  featureRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: verticalScale(16),
  },
  featureText: {
    marginLeft: scale(12),
    fontSize: moderateScale(14, 0.3),
    color: "#4B5563",
    fontWeight: "500",
  },
  startButton: {
    backgroundColor: "#FA8C4C",
    borderRadius: scale(12),
    height: verticalScale(54),
    justifyContent: "center",
    alignItems: "center",
  },
  startButtonText: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: moderateScale(16, 0.3),
  },
  footerContainer: {
    alignItems: "center",
    paddingBottom: verticalScale(20),
  },
  footerCancelText: {
    color: "#4B5563",
    fontSize: moderateScale(14, 0.3),
    marginBottom: verticalScale(16),
  },
  footerLinksRow: {
    flexDirection: "row",
    gap: scale(20),
  },
  footerLink: {
    color: "#374151",
    fontSize: moderateScale(13, 0.3),
    textDecorationLine: "underline",
  },
});
