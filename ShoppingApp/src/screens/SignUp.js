import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import React, { useState, useContext } from 'react';
import {colors,fontSizes,fontWeights,spacing,radius,layout,} from '../styles';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Iconuser from 'react-native-vector-icons/Fontisto';
import Icone from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import { ThemeContext } from '../context/ThemeContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SignUp = () => {
  const navigation = useNavigation();
  const { theme } = useContext(ThemeContext);
  const styles = getStyles(theme);

  const [userId, setUserId] = useState('');
  const [userPass, setUserPass] = useState('');

  const handleSignUp = async () => {
    if (!userId || !userPass) {
      Alert.alert('enter id and pass');
      return;
    }
    await AsyncStorage.setItem('USER_ID', userId);
    await AsyncStorage.setItem('USER_PASS', userPass);
    await AsyncStorage.setItem('IS_LOGGED_IN', 'true');

    navigation.replace('Login'); 
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Create an{'\n'}account</Text>
      </View>

      <View style={styles.formContainer}>
        <View style={styles.inputContainer}>
          <Icon
            name="user-alt"
            size={20}
            color={colors.textPlaceholder}
            style={styles.icon}
          />
          <TextInput
            style={styles.input}
            placeholder="Enter username"
            placeholderTextColor={colors.textPlaceholder}
            value={userId}
            onChangeText={setUserId}
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
            value={userPass}
            onChangeText={setUserPass}
          />
          <Icone
            name="eye"
            size={20}
            color={colors.textPlaceholder}
            style={styles.icon}
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
          />
          <Icone
            name="eye"
            size={20}
            color={colors.textPlaceholder}
            style={styles.icon}
          />
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          //onPress={() => navigation.navigate('GetStartedScreen')}
          onPress={handleSignUp}
        >
          <Text style={styles.buttonTitle}>Sign Up</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.dividerContainer}>
        <Text style={styles.dividerText}>- OR Continue with -</Text>
      </View>

      <View style={styles.socialContainer}>
        <Image
          source={require('../assets/Google.png')}
          style={styles.socialImage}
        />
        <Image
          source={require('../assets/Apple.png')}
          style={styles.socialImage}
        />
        <Image
          source={require('../assets/Facebook.png')}
          style={styles.socialImage}
        />
      </View>

      <View style={styles.bottomContainer}>
        <Text style={styles.bottomText}>I already have an account </Text>
        <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
          <Text style={styles.signupText}>Log</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SignUp;

const getStyles = theme =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.backgroundPrimary,
      paddingHorizontal: spacing.authTitleLeft,
      paddingTop: spacing.login,
    },

    titleContainer: {
      paddingBottom: spacing['7xl'],
    },
    title: {
      fontSize: fontSizes.screenTitle,
      fontWeight: fontWeights.bold,
      color: theme.textPrimary,
    },

    formContainer: {
      gap: 20,
    },
    inputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: theme.backgroundPrimary,
      borderRadius: radius.input,
      borderWidth: 1,
      borderColor: colors.border,
    },
    icon: {
      paddingLeft: spacing.paymentPadding,
      paddingRight: spacing.inputPaddingH,
      paddingVertical: 10,
    },
    input: {
      flex: 1,
      paddingVertical: spacing.screenPaddingTop, // 17 — drives input height
      paddingRight: spacing.paymentPadding, // 16
      fontSize: fontSizes.base,
      color: colors.textPrimary,
    },

    forgotContainer: {
      alignItems: 'flex-end',
      paddingTop: spacing.buttonPaddingV,
      //paddingVertical: spacing.md, // 8
    },
    forgotText: {
      color: colors.primary,
      fontSize: fontSizes.sm,
    },

    buttonContainer: {
      //alignItems: 'center',
      paddingTop: spacing.authTitleLeft,
    },
    button: {
      backgroundColor: colors.primary,
      borderRadius: radius.button,
      borderWidth: 1,
      borderColor: colors.primaryBorder,
      // justifyContent: 'center',
      alignItems: 'center',
    },
    buttonTitle: {
      color: colors.textOnPrimary,
      fontSize: fontSizes['2xl'],
      fontWeight: '600',
      textAlign: 'center',
      paddingHorizontal: 109,
      paddingVertical: 15,
    },

    dividerContainer: {
      alignItems: 'center',
      paddingTop: spacing.loginp,
    },
    dividerText: {
      color: theme.textPrimary,
      fontSize: fontSizes.label,
      fontWeight: fontWeights.medium,
    },

    socialContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      gap: spacing.lg,
      paddingTop: spacing['5xl'],
    },
    socialImage: {
      height: layout.socialIconSizeLarge,
      width: layout.socialIconSizeLarge,
    },

    bottomContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      paddingTop: 10,
    },
    bottomText: {
      color: theme.textPrimary,
      fontSize: fontSizes.label,
      fontWeight: fontWeights.medium,
    },
    signupText: {
      color: colors.primary,
      fontSize: fontSizes.label,
      fontWeight: fontWeights.medium,
      textDecorationLine: 'underline',
    },
  });
