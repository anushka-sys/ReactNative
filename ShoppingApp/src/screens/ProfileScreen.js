import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import React, { useState ,useEffect} from 'react';
import Iconarrow from 'react-native-vector-icons/Entypo';
import Iconfont from 'react-native-vector-icons/FontAwesome5'; 
import Geolocation from '@react-native-community/geolocation';
import { colors, radius } from '../styles/index';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

const InputField = ({ label, placeholder, value, onChangeText }) => (
  <View style={styles.inputWrapper}>
    <Text style={styles.inputLabel}>{label}</Text>
    <TextInput
      style={styles.inputBox}
      placeholder={placeholder}
      placeholderTextColor="#999"
      value={value}
      onChangeText={onChangeText}
    />
  </View>
);

const ProfileScreen = () => {
  const navigation = useNavigation();
  const [locating, setLocating] = useState(false);
  const [currLatitude,setCurrLatitude] = useState(null)
  const [currLongitude,setCurrLongitude] = useState(null)
  const [formData, setFormData] = useState({
    id: '',
    pass: '',
    pincode: '',
    address: '',
    city: '',
    state: '',
    country: '',
  });

  const handleChange = (field, value) => {
  setFormData(prev => ({ ...prev, [field]: value }));
};

 const getLocationName = async (latitude, longitude) => {
    try {
      const result = await axios.get(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`,
        // `https://nominatim.openstreetmap.org/reverse?format=json&lat=18.553933&lon=73.776828`,
        {
          headers: {
            "User-Agent": "Ecommerce",
            "Accept": "application/json"
          },
        },
      );
      const data = result.data;
      setFormData(prev => ({
        ...prev,
        pincode: data.address.postcode || '',
        address: data.display_name || '',
        city:
          (data.address.suburb || '') + ' ' + (data.address.city || ''),
        state: data.address.state || '',
        country: data.address.country || '',
      }));
    } catch (error) {
      console.error('Reverse geocoding failed:', error);
    }
  };

//  const handleDetectLocation = () => {
//     setLocating(true);
//     Geolocation.getCurrentPosition(
//       async position => {
//         const { latitude, longitude } = position.coords;
//         console.log('lat/lng:', latitude, longitude);
//         setCurrLatitude(latitude);
//         setCurrLongitude(longitude);
//         await getLocationName(latitude, longitude);
//         setLocating(false);
//       },
//       error => {
//         console.error('Geolocation error:', error);
//         setLocating(false);
//       },
//       { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
//     );
//   };

useEffect(()=>{
  Geolocation.getCurrentPosition(
    (info) =>{
      const lat = info.coords.latitude;
      const long = info.coords.longitude;
      setCurrLatitude(lat);
      setCurrLongitude(long);
    },
    (error)=> console.log(error),
    {enableHighAccuracy:true}
  );
},[]);

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
            resizeMode="contain"
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
        <View style={styles.addressHeader}>
          <Text style={styles.sectionTitle}>Business Address Details</Text>
          <TouchableOpacity
            style={styles.detectButton}
            onPress={getLocationName}
            disabled={locating}
          >
            {locating ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <>
                <Iconfont name="location-arrow" size={12} color="#fff" />
                <Text style={styles.detectText}>Detect</Text>
              </>
            )}
          </TouchableOpacity>
        </View>
        <InputField
          label="Pincode"
          placeholder="Enter pincode"
          value={formData.pincode}
          onChangeText={v => handleChange('pincode', v)}
        />
        <InputField
          label="Address"
          placeholder="Enter address"
          value={formData.address}
          onChangeText={v => handleChange('address', v)}
        />
        <InputField
          label="City"
          placeholder="City"
          value={formData.city}
          onChangeText={v => handleChange('city', v)}
        />
        <InputField
          label="State"
          placeholder="State"
          value={formData.state}
          onChangeText={v => handleChange('state', v)}
        />
        <InputField
          label="Country"
          placeholder="Country"
          value={formData.country}
          onChangeText={v => handleChange('country', v)}
        />

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
  addressHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 30,
    paddingHorizontal: 24,
  },

  // NEW: detect button style
  detectButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: colors.primary,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
});