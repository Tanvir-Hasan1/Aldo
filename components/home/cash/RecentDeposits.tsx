import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import {
  BanknotesIcon,
  BuildingLibraryIcon,
} from "react-native-heroicons/outline";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";

interface Deposit {
  id: string;
  display_title: string;
  deposit_date_formatted: string;
  amount_formatted: string;
  amount: number;
}

interface RecentDepositsProps {
  deposits?: Deposit[];
}

const DEPOSITS: Deposit[] = [
  {
    id: "1",
    display_title: "Chase Bank - Main",
    deposit_date_formatted: "Feb 24, 2026",
    amount_formatted: "$450.00",
    amount: 450.0,
  },
  {
    id: "2",
    display_title: "Wells Fargo - Savings",
    deposit_date_formatted: "Feb 23, 2026",
    amount_formatted: "$540.00",
    amount: 540.0,
  },
  {
    id: "3",
    display_title: "Vendor Payout",
    deposit_date_formatted: "Feb 22, 2026",
    amount_formatted: "$120.00",
    amount: -120.0,
  },
];

export default function RecentDeposits({ deposits }: RecentDepositsProps) {
  const displayDeposits = deposits?.length ? deposits : DEPOSITS;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.sectionTitle}>Recent Transactions</Text>
        <TouchableOpacity>
          <Text style={styles.viewAllBtn}>View All</Text>
        </TouchableOpacity>
      </View>

      {displayDeposits.map((item) => {
        const isPositive = item.amount >= 0;
        const displayAmount = isPositive
          ? `+${item.amount_formatted}`
          : `-${item.amount_formatted.replace("-", "")}`;
        // Since the backend might not provide a type flag for vendor, we determine it blindly by amount if needed,
        // or just treat all as bank since it's "Recent Deposits". For visual diversity with dummy data, we check amount flag:
        const iconType = item.amount < 0 ? "vendor" : "bank";

        return (
          <View key={item.id} style={styles.transactionCard}>
            <View
              style={[
                styles.iconContainer,
                iconType === "vendor"
                  ? styles.iconContainerVendor
                  : styles.iconContainerBank,
              ]}
            >
              {iconType === "bank" ? (
                <BuildingLibraryIcon size={moderateScale(20)} color="#FA8C4C" />
              ) : (
                <BanknotesIcon size={moderateScale(20)} color="#6B7280" />
              )}
            </View>

            <View style={styles.detailsContainer}>
              <Text style={styles.title} numberOfLines={1}>
                {item.display_title}
              </Text>
              <Text style={styles.subtitle} numberOfLines={1}>
                {item.deposit_date_formatted} •
              </Text>
            </View>

            <Text
              style={[
                styles.amount,
                isPositive ? styles.amountPositive : styles.amountNegative,
              ]}
            >
              {displayAmount}
            </Text>
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: verticalScale(40),
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: verticalScale(16),
  },
  sectionTitle: {
    fontSize: moderateScale(16, 0.3),
    fontWeight: "800",
    color: "#111827",
  },
  viewAllBtn: {
    fontSize: moderateScale(14, 0.3),
    fontWeight: "700",
    color: "#FA8C4C",
  },
  transactionCard: {
    flexDirection: "row",
    backgroundColor: "#F9FAFB", // very light grey matching the screenshot
    borderRadius: scale(12),
    padding: scale(16),
    marginBottom: verticalScale(12),
    alignItems: "center",
  },
  iconContainer: {
    width: moderateScale(44),
    height: moderateScale(44),
    borderRadius: scale(12),
    justifyContent: "center",
    alignItems: "center",
    marginRight: scale(16),
  },
  iconContainerBank: {
    backgroundColor: "#FFF0E5", // light orange
  },
  iconContainerVendor: {
    backgroundColor: "#E5E7EB", // light grey
  },
  detailsContainer: {
    flex: 1,
    marginRight: scale(8),
  },
  title: {
    fontSize: moderateScale(14, 0.3),
    fontWeight: "700",
    color: "#111827",
    marginBottom: verticalScale(4),
  },
  subtitle: {
    fontSize: moderateScale(12, 0.3),
    color: "#6B7280",
    fontWeight: "500",
  },
  amount: {
    fontSize: moderateScale(15, 0.3),
    fontWeight: "800",
  },
  amountPositive: {
    color: "#10B981", // green
  },
  amountNegative: {
    color: "#111827", // dark grey/black
  },
});
