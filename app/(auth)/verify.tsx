import { useRouter, useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import axios from "axios";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  Alert,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";

import OTPVerification from "../../components/ui/OTPVerification";

// @ts-ignore
import SecurityIcon from "../../assets/images/Security Icon.svg";
import { useAppStore } from "../../store/useAppStore";

export default function VerifyIdentityScreen() {
  const router = useRouter();
  const { email, restaurant_name, owner_full_name, password } = useLocalSearchParams<{ 
    email: string;
    restaurant_name: string;
    owner_full_name: string;
    password: string;
  }>();
  const setUser = useAppStore((state) => state.setUser);
  
  const [code, setCode] = useState(["", "", "", ""]);
  const [isLoading, setIsLoading] = useState(false);
  const [isResending, setIsResending] = useState(false);

  const handleResendCode = async () => {
    if (!email || !restaurant_name || !owner_full_name || !password) {
      Alert.alert("Error", "Missing registration details. Please restart the signup process.");
      return;
    }
    
    setIsResending(true);
    try {
      const apiUrl = process.env.EXPO_PUBLIC_API_URL || "https://risto-ai.vercel.app";
      const response = await axios.post(`${apiUrl}/api/v1/auth/restaurant/register`, {
        restaurant_name,
        owner_full_name,
        email,
        password
      });
      console.log("Resend API Response:", response.data);
      Alert.alert("Success", response.data?.message || "Verification code resent to your email.");
    } catch (error: any) {
      console.log("Resend API Error:", error.response?.data || error.message);
      const errData = error.response?.data;
      let errorMessage = "An unexpected error occurred.";
      if (errData) {
        if (typeof errData === "string") {
          try {
            const parsed = JSON.parse(errData);
            errorMessage = parsed.error?.message || parsed.message || parsed.detail || errData;
          } catch {
            errorMessage = errData;
          }
        } else {
          errorMessage = errData.error?.message || errData.message || errData.detail || JSON.stringify(errData);
        }
      } else if (error.message) {
        errorMessage = error.message;
      }
      Alert.alert("Error", errorMessage);
    } finally {
      setIsResending(false);
    }
  };

  const handleConfirm = async () => {
    const otp = code.join("");
    if (otp.length !== 4) {
      Alert.alert("Error", "Please enter the 4-digit code.");
      return;
    }

    if (!email) {
      Alert.alert("Error", "Email not found. Please try signing up again.");
      return;
    }

    setIsLoading(true);
    try {
      const apiUrl = process.env.EXPO_PUBLIC_API_URL || "https://risto-ai.vercel.app";
      const response = await axios.post(
        `${apiUrl}/api/v1/auth/restaurant/verify-registration`,
        {
          email,
          code: otp,
        }
      );

      const data = response.data;
      setUser(data.user, data.tokens);

      Alert.alert("Success", "Email verified successfully!");
      router.replace("/(auth)/subscription" as any);
      
    } catch (error: any) {
      console.log("Verify API Error:", error.response?.data || error.message);
      const errorMessage =
        error.response?.data?.message ||
        error.response?.data?.detail ||
        error.message ||
        "An unexpected error occurred during verification.";
      Alert.alert("Verification Failed", errorMessage);
    } finally {
      setIsLoading(false);
    }
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
              <OTPVerification code={code} setCode={setCode} onResend={handleResendCode} />
            </View>

            {/* Bottom Section */}
            <View style={styles.bottomSection}>
              <TouchableOpacity
                style={styles.confirmButton}
                onPress={handleConfirm}
                disabled={isLoading}
              >
                {isLoading ? (
                  <ActivityIndicator color={"#FFFFFF"} />
                ) : (
                  <Text style={styles.confirmButtonText}>Confirm</Text>
                )}
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
