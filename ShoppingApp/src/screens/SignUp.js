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
} from '../styles';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Iconuser from 'react-native-vector-icons/Fontisto';
import { useNavigation } from '@react-navigation/native';

const SignUp = () => {
  const Navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create an account</Text>

      <View>
        <View style={styles.inputContainer}>
          <Icon
            name="user-alt"
            size={15}
            color={colors.textPlaceholder}
            style={styles.icon}
          />
          <TextInput
            style={styles.input}
            placeholder="Username or Email"
            placeholderTextColor={colors.textPlaceholder}
          />
        </View>
        <View style={styles.inputContainer}>
          <Iconuser
            name="locked"
            size={20}
            color={colors.textPlaceholder}
            style={styles.icon}
          />
          <TextInput
            style={styles.input}
            placeholder="Enter password"
            placeholderTextColor={colors.textPlaceholder}
            secureTextEntry
          />
        </View>
        <View style={styles.inputContainer}>
          <Iconuser
            name="locked"
            size={20}
            color={colors.textPlaceholder}
            style={styles.icon}
          />
          <TextInput
            style={styles.input}
            placeholder="Confirm password"
            placeholderTextColor={colors.textPlaceholder}
            secureTextEntry
          />
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttontitle}>Sign Up</Text>
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
          I already have an account{' '}
          <TouchableOpacity onPress={() => Navigation.navigate('Login')}>
            <Text style={styles.signup}>Log in</Text>
          </TouchableOpacity>
        </Text>
      </View>
    </View>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  container: { 
    flex: 1 
  },
  title: {
    fontWeight: fontWeights.bold,
    fontSize: fontSizes.screenTitle,
    top: 60,
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
  buttonContainer: { 
    justifyContent: 'center', 
    alignItems: 'center', 
    top: 110 },
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
  ImageContainer: {
    flexDirection: 'row',
    gap: spacing.lg,
    top: 170,
    paddingLeft: 93,
  },
  image: {
    height: layout.socialIconSizeSmall,
    width: layout.socialIconSizeSmall,
  },
  textcontainer: {
     top: 155, 
     marginLeft: 115 },
  text: {
    color: colors.textSecondary,
    fontWeight: fontWeights.medium,
    fontSize: fontSizes.label,
  },
  Bottomcontainer: { 
    top: 200, 
    marginLeft: 105 },
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
