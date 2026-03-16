import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  StyleSheet,
  ScrollView,
  ImageBackground,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import { Feather, FontAwesome5 } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

// @ts-ignore
import SplashLogo from '../../assets/images/splash-logo.svg';
import Input from '../../components/ui/Input';

export default function AuthSignupScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  
  const [restaurantName, setRestaurantName] = useState('');
  const [ownerName, setOwnerName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);

  const handleSignup = () => {
    // Navigate to the tabs flow upon successful signup
    router.replace('/(tabs)');
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container} 
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView 
          contentContainerStyle={[
            styles.scrollContent, 
            { paddingTop: Math.max(insets.top, verticalScale(20)), paddingBottom: Math.max(insets.bottom, verticalScale(20)) }
          ]}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Logo Area */}
          <View style={styles.logoContainer}>
             <SplashLogo width={scale(120)} height={scale(120)} />
             <Text style={styles.logoSubtitle}>AI POWERED RESTAURANT INTELLIGENCE</Text>
          </View>

          {/* Hero Image Block */}
          <View style={styles.heroContainer}>
            <ImageBackground 
              source={{ uri: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80' }} // Placeholder for restaurant hero
              style={styles.heroImage}
              imageStyle={{ borderRadius: scale(16) }}
            >
              <View style={styles.heroOverlay}>
                <Text style={styles.heroText}>Elevate your dining experience with data.</Text>
              </View>
            </ImageBackground>
          </View>

          {/* Header Title */}
          <View style={styles.headerContainer}>
            <Text style={styles.headerTitle}>Create Your Account</Text>
            <Text style={styles.headerSubtitle}>Start managing your restaurant data with AI-powered insights.</Text>
          </View>

          {/* Form */}
          <View style={styles.formContainer}>
            <Input
              label="Restaurant Name"
              placeholder="e.g. The Golden Bistro"
              value={restaurantName}
              onChangeText={setRestaurantName}
              leadingIcon={<Feather name="home" size={moderateScale(18)} color="#9CA3AF" />}
            />

            <Input
              label="Owner Full Name"
              placeholder="John Doe"
              value={ownerName}
              onChangeText={setOwnerName}
              leadingIcon={<Feather name="user" size={moderateScale(18)} color="#9CA3AF" />}
            />

            <Input
              label="Email Address"
              placeholder="owner@restaurant.com"
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
              leadingIcon={<Feather name="mail" size={moderateScale(18)} color="#9CA3AF" />}
            />

            <Input
              label="Password"
              placeholder="••••••••"
              isPassword
              isPasswordVisible={isPasswordVisible}
              onTogglePasswordVisibility={() => setIsPasswordVisible(!isPasswordVisible)}
              value={password}
              onChangeText={setPassword}
              leadingIcon={<Feather name="lock" size={moderateScale(18)} color="#9CA3AF" />}
            />

            <Input
              label="Confirm Password"
              placeholder="••••••••"
              isPassword
              isPasswordVisible={isConfirmPasswordVisible}
              onTogglePasswordVisibility={() => setIsConfirmPasswordVisible(!isConfirmPasswordVisible)}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              leadingIcon={<Feather name="shield" size={moderateScale(18)} color="#9CA3AF" />} // Alternative lock/shield icon
            />

            <TouchableOpacity style={styles.createButton} onPress={handleSignup}>
              <Text style={styles.createButtonText}>Create Account</Text>
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
                   <FontAwesome5 name="google" size={moderateScale(18)} color="#DB4437" />
                </View>
                <Text style={styles.socialButtonText}>Google</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.socialButton}>
                <View style={styles.socialIconContainer}>
                  <FontAwesome5 name="apple" size={moderateScale(20)} color="#000000" />
                </View>
                <Text style={styles.socialButtonText}>Apple</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Footer */}
          <View style={styles.footerContainer}>
            <Text style={styles.footerText}>
              Already have an account?{' '}
              <Text style={styles.footerHighlight} onPress={() => router.back()}>
                Login
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
    backgroundColor: '#FFFFFF',
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: scale(24),
    justifyContent: 'space-between',
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: verticalScale(10),
    marginBottom: verticalScale(20),
  },
  logoSubtitle: {
    fontSize: moderateScale(10, 0.3),
    fontWeight: '700',
    color: '#FA8C4C',
    marginTop: verticalScale(4),
    letterSpacing: 0.5,
  },
  heroContainer: {
    width: '100%',
    height: verticalScale(100),
    marginBottom: verticalScale(24),
    borderRadius: scale(16),
  },
  heroImage: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  heroOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    borderRadius: scale(16),
    padding: scale(16),
    justifyContent: 'flex-end',
  },
  heroText: {
    color: '#FFFFFF',
    fontSize: moderateScale(18, 0.3),
    fontWeight: '700',
    width: '70%',
  },
  headerContainer: {
    marginBottom: verticalScale(24),
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: moderateScale(28, 0.3),
    fontWeight: '800',
    color: '#111827',
    marginBottom: verticalScale(8),
  },
  headerSubtitle: {
    fontSize: moderateScale(14, 0.3),
    fontWeight: '500',
    color: '#6B7280',
    lineHeight: moderateScale(22, 0.3),
    textAlign: 'center',
    paddingHorizontal: scale(10),
  },
  formContainer: {
    marginBottom: verticalScale(24),
  },
  createButton: {
    backgroundColor: '#FA8C4C',
    height: verticalScale(56),
    borderRadius: scale(16),
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: verticalScale(10),
  },
  createButtonText: {
    fontSize: moderateScale(18, 0.3),
    fontWeight: '700',
    color: '#FFFFFF',
  },
  socialContainer: {
    marginBottom: verticalScale(30),
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: verticalScale(24),
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#E5E7EB',
  },
  dividerText: {
    marginHorizontal: scale(16),
    fontSize: moderateScale(12, 0.3),
    fontWeight: '600',
    color: '#9CA3AF',
    letterSpacing: 0.5,
  },
  socialButtonsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  socialButton: {
    flex: 1,
    flexDirection: 'row',
    height: verticalScale(52),
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: scale(12),
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: scale(6),
    backgroundColor: '#FFFFFF',
  },
  socialIconContainer: {
    marginRight: scale(10),
  },
  socialButtonText: {
    fontSize: moderateScale(15, 0.3),
    fontWeight: '600',
    color: '#374151',
  },
  footerContainer: {
    alignItems: 'center',
    paddingBottom: verticalScale(20),
  },
  footerText: {
    fontSize: moderateScale(15, 0.3),
    fontWeight: '500',
    color: '#6B7280',
  },
  footerHighlight: {
    fontWeight: '700',
    color: '#FA8C4C',
  },
});
