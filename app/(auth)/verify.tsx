import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";

import OTPVerification from "../../components/ui/OTPVerification";

// @ts-ignore
import SecurityIcon from "../../assets/images/Security Icon.svg";

export default function VerifyIdentityScreen() {
  const router = useRouter();
  const [code, setCode] = useState(["", "", "", ""]);

  const handleConfirm = () => {
    // Navigate to the subscription flow
    router.push("/(auth)/subscription");
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.content}>
            {/* Top Section */}
            <View style={styles.topSection}>
              <View style={styles.iconContainer}>
                <SecurityIcon width={scale(80)} height={scale(80)} />
              </View>

              <Text style={styles.headerTitle}>Verify Identity</Text>
              <Text style={styles.headerSubtitle}>
                Enter the 4-digit code sent to your email
              </Text>

              {/* OTP Component */}
              <OTPVerification code={code} setCode={setCode} />
            </View>

            {/* Bottom Section */}
            <View style={styles.bottomSection}>
              <TouchableOpacity
                style={styles.confirmButton}
                onPress={handleConfirm}
              >
                <Text style={styles.confirmButtonText}>Confirm</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.didNotReceiveButton}>
                <Text style={styles.didNotReceiveText}>
                  I didn't receive a code
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  keyboardView: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: scale(24),
    justifyContent: "space-between",
    paddingTop: verticalScale(60),
    paddingBottom: verticalScale(40),
  },
  topSection: {
    alignItems: "center",
  },
  iconContainer: {
    marginBottom: verticalScale(24),
  },
  headerTitle: {
    fontSize: moderateScale(26, 0.3),
    fontWeight: "700",
    color: "#111827",
    marginBottom: verticalScale(12),
  },
  headerSubtitle: {
    fontSize: moderateScale(15, 0.3),
    fontWeight: "400",
    color: "#4B5563",
    textAlign: "center",
    marginBottom: verticalScale(40),
  },
  bottomSection: {
    width: "100%",
  },
  confirmButton: {
    backgroundColor: "#FA8C4C",
    height: verticalScale(56),
    borderRadius: scale(12),
    justifyContent: "center",
    alignItems: "center",
    marginBottom: verticalScale(20),
  },
  confirmButtonText: {
    fontSize: moderateScale(16, 0.3),
    fontWeight: "700",
    color: "#FFFFFF",
  },
  didNotReceiveButton: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: verticalScale(10),
  },
  didNotReceiveText: {
    fontSize: moderateScale(14, 0.3),
    color: "#4B5563",
    fontWeight: "500",
  },
});
