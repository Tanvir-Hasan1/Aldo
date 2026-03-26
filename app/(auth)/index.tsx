import { FontAwesome5 } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import axios from "axios";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  Alert,
  ActivityIndicator,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import Input from "../../components/ui/Input";
import { useAppStore } from "../../store/useAppStore";

// @ts-ignore
import SplashLogo from "../../assets/images/splash-logo.svg";

export default function AuthLoginScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const setUser = useAppStore((state) => state.setUser);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    setIsLoading(true);
    try {
      const apiUrl = process.env.EXPO_PUBLIC_API_URL || "https://risto-ai.vercel.app";
      const response = await axios.post(
        `${apiUrl}/api/v1/auth/restaurant/login`,
        { email, password }
      );

      const data = response.data;

      console.log("Login API Response:", JSON.stringify(data, null, 2));

      // Save user and tokens to store
      setUser(data.user, data.tokens);

      // Navigate to the tabs flow
      router.replace("/(tabs)/home" as any);
    } catch (error: any) {
      console.log("Login API Error:", error.response?.data || error.message);
      
      const errorMessage =
        error.response?.data?.message ||
        error.response?.data?.detail ||
        error.message ||
        "An unexpected error occurred";
      Alert.alert("Login Failed", errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView
          contentContainerStyle={[
            styles.scrollContent,
            {
              paddingTop: Math.max(insets.top, verticalScale(20)),
              paddingBottom: Math.max(insets.bottom, verticalScale(20)),
            },
          ]}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Logo Area */}
          <View style={styles.logoContainer}>
            <SplashLogo width={scale(120)} height={scale(120)} />
            <Text style={styles.logoSubtitle}>
              AI POWERED RESTAURANT INTELLIGENCE
            </Text>
          </View>

          {/* Header Title */}
          <View style={styles.headerContainer}>
            <Text style={styles.headerTitle}>Welcome Back</Text>
            <Text style={styles.headerSubtitle}>
              Sign in to access your restaurant dashboard and AI insights
            </Text>
          </View>

          {/* Form */}
          <View style={styles.formContainer}>
            <Input
              label="Email Address"
              placeholder="e.g. manager@restaurant.com"
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
            />

            <Input
              label="Password"
              placeholder="Enter your password"
              isPassword
              isPasswordVisible={isPasswordVisible}
              onTogglePasswordVisibility={() =>
                setIsPasswordVisible(!isPasswordVisible)
              }
              value={password}
              onChangeText={setPassword}
            />

            <TouchableOpacity 
              style={styles.forgotPasswordButton}
              onPress={() => router.push("/(auth)/forgot-password" as any)}
            >
              <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.loginButton} onPress={handleLogin} disabled={isLoading}>
              {isLoading ? (
                <ActivityIndicator color={"#FFFFFF"} />
              ) : (
                <Text style={styles.loginButtonText}>Login</Text>
              )}
            </TouchableOpacity>
          </View>

          {/* Social Logins */}
          <View style={styles.socialContainer}>
            <View style={styles.dividerContainer}>
              <View style={styles.dividerLine} />
              <Text style={styles.dividerText}>OR CONTINUE WITH</Text>
              <View style={styles.dividerLine} />
            </View>

            <View style={styles.socialButtonsRow}>
              <TouchableOpacity style={styles.socialButton}>
                <View style={styles.socialIconContainer}>
                  {/* Simplified Google Icon rendering for now */}
                  <FontAwesome5
                    name="google"
                    size={moderateScale(18)}
                    color="#DB4437"
                  />
                </View>
                <Text style={styles.socialButtonText}>Google</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.socialButton}>
                <View style={styles.socialIconContainer}>
                  <FontAwesome5
                    name="apple"
                    size={moderateScale(20)}
                    color="#000000"
                  />
                </View>
                <Text style={styles.socialButtonText}>Apple</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Footer */}
          <View style={styles.footerContainer}>
            <Text style={styles.footerText}>
              Don't have an account?{" "}
              <Text
                style={styles.footerHighlight}
                onPress={() => router.push("/(auth)/signup" as any)}
              >
                Sign-up
              </Text>
            </Text>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: scale(24),
    justifyContent: "space-between",
  },
  logoContainer: {
    alignItems: "center",
    marginTop: verticalScale(20),
    marginBottom: verticalScale(30),
  },
  logoSubtitle: {
    fontSize: moderateScale(12, 0.3),
    fontWeight: "700",
    color: "#FA8C4C",
    marginTop: verticalScale(10),
    letterSpacing: 0.5,
  },
  headerContainer: {
    marginBottom: verticalScale(30),
  },
  headerTitle: {
    fontSize: moderateScale(32, 0.3),
    fontWeight: "800",
    color: "#111827",
    marginBottom: verticalScale(10),
  },
  headerSubtitle: {
    fontSize: moderateScale(16, 0.3),
    fontWeight: "500",
    color: "#6B7280",
    lineHeight: moderateScale(24, 0.3),
    paddingRight: scale(40),
  },
  formContainer: {
    marginBottom: verticalScale(30),
  },
  forgotPasswordButton: {
    alignSelf: "flex-end",
    marginBottom: verticalScale(24),
  },
  forgotPasswordText: {
    fontSize: moderateScale(14, 0.3),
    fontWeight: "600",
    color: "#FA8C4C",
  },
  loginButton: {
    backgroundColor: "#FA8C4C",
    height: verticalScale(56),
    borderRadius: scale(16),
    justifyContent: "center",
    alignItems: "center",
  },
  loginButtonText: {
    fontSize: moderateScale(18, 0.3),
    fontWeight: "700",
    color: "#FFFFFF",
  },
  socialContainer: {
    marginBottom: verticalScale(30),
  },
  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: verticalScale(24),
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: "#E5E7EB",
  },
  dividerText: {
    marginHorizontal: scale(16),
    fontSize: moderateScale(12, 0.3),
    fontWeight: "600",
    color: "#9CA3AF",
    letterSpacing: 0.5,
  },
  socialButtonsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  socialButton: {
    flex: 1,
    flexDirection: "row",
    height: verticalScale(52),
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: scale(12),
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: scale(6),
    backgroundColor: "#FFFFFF",
  },
  socialIconContainer: {
    marginRight: scale(10),
  },
  socialButtonText: {
    fontSize: moderateScale(15, 0.3),
    fontWeight: "600",
    color: "#374151",
  },
  footerContainer: {
    alignItems: "center",
    paddingBottom: verticalScale(20),
  },
  footerText: {
    fontSize: moderateScale(15, 0.3),
    fontWeight: "500",
    color: "#6B7280",
  },
  footerHighlight: {
    fontWeight: "700",
    color: "#D97706", // Slightly darker orange variant as shown in mockup for "Join Premium"
  },
});
