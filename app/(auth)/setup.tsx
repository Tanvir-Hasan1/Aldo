import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { scale, verticalScale, moderateScale } from "react-native-size-matters";
import { Feather } from "@expo/vector-icons";
import Step1RestaurantInfo from "../../components/auth/restoAi/Step1RestaurantInfo";
import Step2RestaurantDetails from "../../components/auth/restoAi/Step2RestaurantDetails";
import Step3PhotoUpload from "../../components/auth/restoAi/Step3PhotoUpload";
import Step4BusinessGoal from "../../components/auth/restoAi/Step4BusinessGoal";
import Step5BiggestChallenge from "../../components/auth/restoAi/Step5BiggestChallenge";
import Step6Success from "../../components/auth/restoAi/Step6Success";

export default function SetupScreen() {
  const router = useRouter();
  const [step, setStep] = useState(1);

  // Step 1 State
  const [restaurantName, setRestaurantName] = useState("");
  const [restaurantType, setRestaurantType] = useState("");

  // Step 2 State
  const [city, setCity] = useState("");
  const [seats, setSeats] = useState("");
  const [averageSpend, setAverageSpend] = useState("");

  // Step 3 State
  const [interiorPhoto, setInteriorPhoto] = useState<string | null>(null);
  const [exteriorPhoto, setExteriorPhoto] = useState<string | null>(null);

  // Step 4 State
  const [businessGoal, setBusinessGoal] = useState("Increase revenue");

  // Step 5 State
  const [biggestProblem, setBiggestProblem] = useState("");
  const [improvementGoal, setImprovementGoal] = useState("");

  const totalSteps = 5;

  const handleNext = () => {
    if (step < 6) {
      setStep(step + 1);
    } else {
      // End of setup, navigate to tabs wrapper
      router.replace("/(tabs)/home");
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    } else {
      router.back();
    }
  };

  const renderProgressBar = () => {
    return (
      <View style={styles.progressContainer}>
        {Array.from({ length: totalSteps }).map((_, index) => (
          <View
            key={index}
            style={[
              styles.progressBarSegment,
              index < step ? styles.progressBarActive : null,
            ]}
          />
        ))}
      </View>
    );
  };

  const renderHeader = () => {
    return (
      <View style={styles.headerTopArea}>
        <View style={styles.headerRow}>
          <TouchableOpacity onPress={handleBack} style={styles.backButton}>
            {step > 1 ? (
              <Feather name="arrow-left" size={moderateScale(24)} color="#111827" />
            ) : (
              <View style={styles.placeholderCircle} />
            )}
          </TouchableOpacity>

          <View style={styles.logoTextContainer}>
            <Text style={styles.logoTextDark}>Risto </Text>
            <Text style={styles.logoTextOrange}>AI</Text>
          </View>

          <View style={{ width: moderateScale(40) }} />
        </View>
        {step < 6 && renderProgressBar()}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <View style={styles.container}>
          {renderHeader()}
          <ScrollView
            style={{ flex: 1 }}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
            keyboardDismissMode="on-drag"
          >
            {step === 1 && (
              <Step1RestaurantInfo
                restaurantName={restaurantName}
                setRestaurantName={setRestaurantName}
                restaurantType={restaurantType}
                setRestaurantType={setRestaurantType}
                onNext={handleNext}
              />
            )}
            {step === 2 && (
              <Step2RestaurantDetails
                city={city}
                setCity={setCity}
                seats={seats}
                setSeats={setSeats}
                averageSpend={averageSpend}
                setAverageSpend={setAverageSpend}
                onNext={handleNext}
              />
            )}
            {step === 3 && (
              <Step3PhotoUpload
                interiorPhoto={interiorPhoto}
                setInteriorPhoto={setInteriorPhoto}
                exteriorPhoto={exteriorPhoto}
                setExteriorPhoto={setExteriorPhoto}
                onNext={handleNext}
              />
            )}
            {step === 4 && (
              <Step4BusinessGoal
                businessGoal={businessGoal}
                setBusinessGoal={setBusinessGoal}
                onNext={handleNext}
              />
            )}
            {step === 5 && (
              <Step5BiggestChallenge
                biggestProblem={biggestProblem}
                setBiggestProblem={setBiggestProblem}
                improvementGoal={improvementGoal}
                setImprovementGoal={setImprovementGoal}
                onNext={handleNext}
              />
            )}
            {step === 6 && (
              <Step6Success />
            )}
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  container: {
    flex: 1,
  },
  headerTopArea: {
    paddingHorizontal: scale(20),
    paddingTop: verticalScale(10),
    paddingBottom: verticalScale(20),
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: verticalScale(20),
  },
  backButton: {
    width: moderateScale(40),
    height: moderateScale(40),
    justifyContent: "center",
    alignItems: "flex-start",
  },
  placeholderCircle: {
    width: moderateScale(36),
    height: moderateScale(36),
    borderRadius: moderateScale(18),
    backgroundColor: "#F9FAFB",
  },
  logoTextContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  logoTextDark: {
    fontSize: moderateScale(22, 0.3),
    fontWeight: "800",
    color: "#111827",
  },
  logoTextOrange: {
    fontSize: moderateScale(22, 0.3),
    fontWeight: "800",
    color: "#D97706",
  },
  progressContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: scale(10),
  },
  progressBarSegment: {
    height: moderateScale(4),
    width: scale(30),
    backgroundColor: "#FFEDD5",
    borderRadius: moderateScale(2),
  },
  progressBarActive: {
    backgroundColor: "#FA8C4C",
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: scale(24),
    paddingTop: verticalScale(30),
    paddingBottom: verticalScale(40),
  },
});
