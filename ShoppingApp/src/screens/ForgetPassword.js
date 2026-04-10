import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
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
import Icon from 'react-native-vector-icons/Ionicons';

const ForgetPassword = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Forgot{'\n'}Password{'?'}
      </Text>

      <View>
        <View style={styles.inputContainer}>
          <Icon
            name="mail"
            size={20}
            color={colors.textPlaceholder}
            style={styles.icon}
          />
          <TextInput
            style={styles.input}
            placeholder="Enter your email address"
            placeholderTextColor={colors.textPlaceholder}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        <View style={styles.forgot}>
          <TouchableOpacity>
            <Text style={styles.forgotText}>
              {'*'}We will send you a message to set or reset your new password
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttontitle}>Submit</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ForgetPassword;

const styles = StyleSheet.create({
  container: 
  { 
    flex: 1 
  },
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
  icon: 
  { 
    marginRight: 
    spacing.iconMarginRight 
  },
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
  forgot: {
    top: 100,
  },
  forgotText: {
    color: colors.textSecondary,
    fontSize: fontSizes.md,
    fontWeight: fontWeights.regular,
    paddingLeft: spacing.authTitleLeft,
  },
});
