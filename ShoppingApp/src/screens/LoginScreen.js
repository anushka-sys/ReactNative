import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';
import React from 'react';
import {
  colors,
  fontSizes,
  fontWeights,
  spacing,
  radius,
  layout,
} from '../styles/index';
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
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            Navigation.navigate('GetStartedScreen');
          }}
        >
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
  container: { flex: 1 },
  title: {
    fontWeight: fontWeights.bold,
    fontSize: fontSizes.screenTitle,
    top: spacing.authTitleTop,
    left: spacing.authTitleLeft,
    width: 185,
    height: 83,
  },
  inputContainer: {
    top: 100,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.input,
    paddingHorizontal: spacing.inputPaddingH,
    height: layout.inputHeight,
    width: layout.inputWidth,
    marginLeft: spacing.inputMarginLeft,
    backgroundColor: colors.backgroundInput,
    marginBottom: spacing.inputMarginBottom,
  },
  icon: { marginRight: spacing.iconMarginRight },
  input: {
    flex: 1,
    height: '100%',
    padding: spacing.none,
    fontSize: fontSizes.inputText,
  },
  buttonContainer: { justifyContent: 'center', alignItems: 'center', top: 150 },
  button: {
    borderWidth: 1,
    borderRadius: radius.button,
    backgroundColor: colors.primary,
    borderColor: colors.primaryBorder,
    height: layout.primaryButtonHeight,
    width: layout.primaryButtonWidth,
  },
  buttontitle: {
    padding: spacing.buttonPaddingV,
    paddingLeft: spacing.buttonPaddingLeft,
    color: colors.textOnPrimary,
    fontWeight: fontWeights.semiBold,
    fontSize: fontSizes.buttonPrimary,
  },
  forgot: { top: 80, marginLeft: 245 },
  forgotText: { color: colors.primary, fontSize: fontSizes.sm },
  ImageContainer: {
    flexDirection: 'row',
    gap: spacing.lg,
    top: 200,
    paddingLeft: 80,
  },
  image: {
    height: layout.socialIconSizeLarge,
    width: layout.socialIconSizeLarge,
  },
  textcontainer: { top: 175, marginLeft: 115 },
  text: {
    color: colors.textSecondary,
    fontWeight: fontWeights.medium,
    fontSize: fontSizes.label,
  },
  Bottomcontainer: { top: 220, marginLeft: 115 },
  textbottom: {
    color: colors.textSecondary,
    fontWeight: fontWeights.medium,
    fontSize: fontSizes.label,
  },
  signup: {
    color: colors.primary,
    textDecorationLine: 'underline',
    fontWeight: fontWeights.medium,
    fontSize: fontSizes.label,
  },
});
