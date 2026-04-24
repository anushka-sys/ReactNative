import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import React from 'react';
import Iconarrow from 'react-native-vector-icons/Entypo';
import { colors, radius } from '../styles/index';
import { useNavigation } from '@react-navigation/native';

const InputField = ({ label, placeholder }) => (
  <View style={styles.inputWrapper}>
    <Text style={styles.inputLabel}>{label}</Text>
    <TextInput
      style={styles.inputBox}
      placeholder={placeholder}
      placeholderTextColor="#999"
    />
  </View>
);

const ProfileScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Iconarrow name="chevron-thin-left" size={20} color="#000" />
          </TouchableOpacity>

          <Text style={styles.title}>Checkout</Text>

          {/* Empty view keeps title centered */}
          <View style={{ width: 20 }} />
        </View>

        {/* Profile Image */}
        <View style={styles.imagecontainer}>
          <Image
            source={require('../assets/profilel.png')}
            style={styles.image}
            resizeMode='contain'
          />
        </View>

        {/* Personal Details */}
        <Text style={styles.sectionTitle}>Personal Details</Text>
        <InputField label="Email Address" placeholder="Enter your email" />
        <InputField label="Password" placeholder="********" />

        <View style={styles.forgotContainer}>
          <TouchableOpacity>
            <Text style={styles.forgotText}>Forgot Password?</Text>
          </TouchableOpacity>
        </View>

        {/* Address Details */}
        <Text style={styles.sectionTitle}>Business Address Details</Text>
        <InputField label="Pincode" placeholder="Enter pincode" />
        <InputField label="Address" placeholder="Enter address" />
        <InputField label="City" placeholder="City" />
        <InputField label="State" placeholder="State" />
        <InputField label="Country" placeholder="Country" />

        {/* Save Button */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('GetStartedScreen')}
          >
            <Text style={styles.buttonTitle}>Save</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  /* Header */
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingTop: 40,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
  },

  /* Profile Image */
  imagecontainer: {
    alignItems: 'center',
    marginTop: 30,
  },
  image: {
    width: 96,
    height: 96,
    borderRadius: 48,
  },

  /* Section Title */
  sectionTitle: {
    marginTop: 30,
    paddingHorizontal: 24,
    fontSize: 18,
    fontWeight: '600',
  },

  /* Input */
  inputWrapper: {
    marginTop: 20,
    paddingHorizontal: 24,
  },
  inputLabel: {
    fontSize: 12,
    marginBottom: 8,
    color: '#444',
  },
  inputBox: {
    borderWidth: 1,
    borderColor: '#C8C8C8',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 14,
  },

  /* Forgot password */
  forgotContainer: {
    alignItems: 'flex-end',
    paddingHorizontal: 24,
    marginTop: 10,
  },
  forgotText: {
    color: '#F83758',
    fontSize: 12,
    fontWeight: '500',
  },

  /* Button */
  buttonContainer: {
    paddingHorizontal: 24,
    marginTop: 40,
  },
  button: {
    width: '100%',
    backgroundColor: colors.primary,
    borderRadius: radius.button,
    paddingVertical: 16,
    alignItems: 'center',
  },
  buttonTitle: {
    color: colors.textOnPrimary,
    fontSize: 16,
    fontWeight: '600',
  },
});