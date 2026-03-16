import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { scale, verticalScale, moderateScale } from "react-native-size-matters";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Input from "../../ui/Input";

interface Step2Props {
  city: string;
  setCity: (val: string) => void;
  seats: string;
  setSeats: (val: string) => void;
  averageSpend: string;
  setAverageSpend: (val: string) => void;
  onNext: () => void;
}

export default function Step2RestaurantDetails({
  city,
  setCity,
  seats,
  setSeats,
  averageSpend,
  setAverageSpend,
  onNext,
}: Step2Props) {
  return (
    <View style={styles.stepContainer}>
      <Text style={styles.title}>Restaurant Details</Text>
      <Text style={styles.subtitle}>
        Tell us more about your restaurant setup.
      </Text>

      <Input
        label="City / Location"
        placeholder="e.g. New York, NY"
        value={city}
        onChangeText={setCity}
        trailingIcon={
          <MaterialCommunityIcons
            name="map-outline"
            size={moderateScale(20)}
            color="#6B7280"
          />
        }
      />

      <Input
        label="Number of Seats"
        placeholder="e.g. 45"
        keyboardType="number-pad"
        value={seats}
        onChangeText={setSeats}
        trailingIcon={
          <MaterialCommunityIcons
            name="sofa-outline"
            size={moderateScale(20)}
            color="#6B7280"
          />
        }
      />

      <Input
        label="Average Spend per Customer"
        placeholder="e.g. 25.00"
        keyboardType="decimal-pad"
        value={averageSpend}
        onChangeText={setAverageSpend}
        trailingIcon={
          <MaterialCommunityIcons
            name="cash"
            size={moderateScale(20)}
            color="#6B7280"
          />
        }
      />

      <View style={styles.spacer} />

      <TouchableOpacity style={styles.continueButton} onPress={onNext}>
        <Text style={styles.continueButtonText}>Continue</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  stepContainer: { flex: 1 },
  title: {
    fontSize: moderateScale(28, 0.3),
    fontWeight: "800",
    color: "#111827",
    marginBottom: verticalScale(12),
    lineHeight: moderateScale(34, 0.3),
  },
  subtitle: {
    fontSize: moderateScale(15, 0.3),
    color: "#4B5563",
    lineHeight: moderateScale(24, 0.3),
    marginBottom: verticalScale(30),
  },
  spacer: { flex: 1, minHeight: verticalScale(30) },
  continueButton: {
    flexDirection: "row",
    backgroundColor: "#FA8C4C",
    height: verticalScale(56),
    borderRadius: scale(12),
    justifyContent: "center",
    alignItems: "center",
    marginBottom: verticalScale(16),
  },
  continueButtonText: {
    fontSize: moderateScale(16, 0.3),
    fontWeight: "700",
    color: "#FFFFFF",
  },
});
