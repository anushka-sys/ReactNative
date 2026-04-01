import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';
import React from 'react';
import { fontsizes, Color } from '../styles/index.js';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Iconuser from 'react-native-vector-icons/Fontisto';
import { useNavigation } from '@react-navigation/native';

const LoginScreen = () => {
  const Navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome{'\n'}Back!</Text>

      <View>
        <View style={styles.inputContainer}>
          <Icon name="user-alt" size={15} color="#626262" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Username or Email"
            placeholderTextColor="#626262"
          />
        </View>
        <View style={styles.inputContainer}>
          <Iconuser
            name="locked"
            size={20}
            color="#626262"
            style={styles.icon}
          />
          <TextInput
            style={styles.input}
            placeholder="Enter username"
            placeholderTextColor="#626262"
          />
        </View>
        <View style={styles.forgot}>
          <TouchableOpacity style={styles.forgotcontainer}>
            <Text
              style={styles.forgotText}
              onPress={() => {
                Navigation.navigate('ForgetPassword');
              }}
            >
              Forgot Password
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={() => {
              Navigation.navigate('GetStartedScreen');
            }}>
          <Text style={styles.buttontitle}>Login</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.textcontainer}>
        <Text style={styles.text}>
          {'-'} OR Continue with {'-'}
        </Text>
      </View>

      <View>
        <TouchableOpacity style={styles.ImageContainer}>
          <Image
            source={require('../assets/Google.png')}
            style={styles.image}
          />
          <Image source={require('../assets/Apple.png')} style={styles.image} />
          <Image
            source={require('../assets/Facebook.png')}
            style={styles.image}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.Bottomcontainer}>
        <Text style={styles.textbottom}>
          Create An Account
          <TouchableOpacity
            onPress={() => {
              Navigation.navigate('SignUp');
            }}
          >
            <Text style={styles.signup}> Sign Up</Text>
          </TouchableOpacity>
        </Text>
      </View>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //justifyContent: 'center'
  },
  title: {
    fontWeight: '700',
    fontSize: fontsizes.l,
    top: 63,
    left: 32,
    width: 185,
    height: 83,
  },
  inputContainer: {
    top: 100,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#A8A8A9',
    borderRadius: 5,
    paddingHorizontal: 10,
    height: 45,
    width: 310,
    marginLeft: 25,
    backgroundColor: '#e4e4e4',
    marginBottom: 20,
  },
  icon: {
    marginRight: 20,
  },
  input: {
    flex: 1,
    height: '100%',
    padding: 0,
    fontSize: 11,
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    top: 150,
  },
  button: {
    borderWidth: 1,
    borderRadius: 4,
    backgroundColor: Color.buttoncolor,
    borderColor: Color.buttoncolor,
    //width:130,
    height: 40,
    width: 290,
  },
  buttontitle: {
    padding: 8,
    paddingLeft: 120,
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 15,
  },
  forgot: {
    top: 80,
    marginLeft: 245,
  },
  forgotText: {
    color: Color.buttoncolor,
    fontSize: 11,
  },
  ImageContainer: {
    flexDirection: 'row',
    gap: 10,
    top: 200,
    paddingLeft: 80,
  },
  image: {
    height: 55,
    width: 55,
  },
  textcontainer: {
    top: 175,
    marginLeft: 115,
  },
  text: {
    color: '#575757',
    fontWeight: '500',
    fontSize: 12,
  },
  Bottomcontainer: {
    top: 220,
    marginLeft: 115,
  },
  textbottom: {
    color: '#575757',
    fontWeight: '500',
    fontSize: 12,
  },
  signup: {
    color: Color.buttoncolor,
    textDecorationLine: 'underline',
    fontWeight: '500',
    fontSize: 12,
  },
});
