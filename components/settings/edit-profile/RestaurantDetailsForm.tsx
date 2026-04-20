import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import FormInput from './FormInput';

interface RestaurantDetailsFormProps {
  restaurantName?: string;
  restaurantType?: string;
  cityLocation?: string;
  numberOfSeats?: string;
  onChangeRestaurantName?: (val: string) => void;
  onChangeRestaurantType?: (val: string) => void;
  onChangeCityLocation?: (val: string) => void;
  onChangeNumberOfSeats?: (val: string) => void;
}

export default function RestaurantDetailsForm({
  restaurantName,
  restaurantType,
  cityLocation,
  numberOfSeats,
  onChangeRestaurantName,
  onChangeRestaurantType,
  onChangeCityLocation,
  onChangeNumberOfSeats,
}: RestaurantDetailsFormProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>RESTAURANT DETAILS</Text>
      
      <FormInput 
        label="Restaurant Name" 
        defaultValue={restaurantName} 
        onChangeText={onChangeRestaurantName}
      />

      <FormInput 
        label="Restaurant Type" 
        defaultValue={restaurantType} 
        onChangeText={onChangeRestaurantType}
      />

      <View style={styles.row}>
        <View style={{ flex: 1, marginRight: scale(8) }}>
          <FormInput 
            label="City / Location" 
            defaultValue={cityLocation} 
            onChangeText={onChangeCityLocation}
          />
        </View>
        <View style={{ flex: 1, marginLeft: scale(8) }}>
          <FormInput 
            label="Number of Seats" 
            defaultValue={numberOfSeats} 
            keyboardType="numeric" 
            onChangeText={onChangeNumberOfSeats}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: verticalScale(8),
  },
  sectionTitle: {
    fontSize: moderateScale(12, 0.3),
    fontWeight: '800',
    color: '#FA8C4C',
    letterSpacing: 1,
    marginBottom: verticalScale(20),
  },
  row: {
    flexDirection: 'row',
  },
});
