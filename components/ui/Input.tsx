import React from 'react';
import { View, Text, TextInput, TextInputProps, StyleSheet, TouchableOpacity } from 'react-native';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import { Feather } from '@expo/vector-icons';

interface InputProps extends TextInputProps {
  label: string;
  isPassword?: boolean;
  isPasswordVisible?: boolean;
  onTogglePasswordVisibility?: () => void;
  leadingIcon?: React.ReactNode;
}

export default function Input({
  label,
  isPassword,
  isPasswordVisible,
  onTogglePasswordVisibility,
  leadingIcon,
  style,
  ...props
}: InputProps) {
  return (
    <View style={styles.inputGroup}>
      <Text style={styles.inputLabel}>{label}</Text>
      <View style={styles.inputWrapper}>
        {leadingIcon && (
          <View style={styles.leadingIconContainer}>
            {leadingIcon}
          </View>
        )}
        <TextInput
          style={[
            styles.input,
            leadingIcon ? { paddingLeft: scale(40) } : null,
            isPassword ? { paddingRight: scale(40) } : null,
            style,
          ]}
          placeholderTextColor="#9CA3AF"
          secureTextEntry={isPassword && !isPasswordVisible}
          {...props}
        />
        {isPassword && (
          <TouchableOpacity
            style={styles.eyeIcon}
            onPress={onTogglePasswordVisibility}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Feather
              name={isPasswordVisible ? 'eye' : 'eye-off'}
              size={moderateScale(20)}
              color="#9CA3AF"
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  inputGroup: {
    marginBottom: verticalScale(20),
  },
  inputLabel: {
    fontSize: moderateScale(14, 0.3),
    fontWeight: '700',
    color: '#374151',
    marginBottom: verticalScale(8),
  },
  inputWrapper: {
    position: 'relative',
    justifyContent: 'center',
  },
  input: {
    height: verticalScale(52),
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: scale(12),
    paddingHorizontal: scale(16),
    fontSize: moderateScale(15, 0.3),
    color: '#111827',
    backgroundColor: '#FFFFFF',
  },
  eyeIcon: {
    position: 'absolute',
    right: scale(16),
  },
  leadingIconContainer: {
    position: 'absolute',
    left: scale(16),
    zIndex: 1,
  },
});
