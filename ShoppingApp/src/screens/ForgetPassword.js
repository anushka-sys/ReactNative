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
} from '../styles';
import Icon from 'react-native-vector-icons/Ionicons';

const ForgetPassword = () => {
  return (
    <View style={styles.container}>

      {/* TITLE */}
      <View style={styles.titleContainer}>
        <Text style={styles.title}>
          Forgot{'\n'}Password{'?'}
        </Text>
      </View>

      {/* FORM */}
      <View style={styles.formContainer}>
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

        <View style={styles.infoContainer}>
          <TouchableOpacity>
            <Text style={styles.infoText}>
              {'*'}We will send you a message to set or reset your new password
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* BUTTON */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonTitle}>Submit</Text>
        </TouchableOpacity>
      </View>

    </View>
  );
};

export default ForgetPassword;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundPrimary,
    paddingHorizontal: spacing.authTitleLeft,
    paddingTop: spacing.login,
  },

  titleContainer: {
    paddingBottom: spacing['7xl'],
  },
  title: {
    fontSize: fontSizes.screenTitle,
    fontWeight: fontWeights.bold,
    color: colors.textPrimary,
  },

  formContainer: {
    gap: spacing.gapb,
  },

  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.backgroundMuted,
    borderRadius: radius.input,
    borderWidth: 1,
    borderColor: colors.border,
  },
  icon: {
    paddingLeft: spacing.paymentPadding,
    paddingRight: spacing.inputPaddingH,
    paddingVertical: spacing.screenPaddingTop,
  },
  input: {
    flex: 1,
    paddingVertical: spacing.screenPaddingTop,
    paddingRight: spacing.paymentPadding,
    fontSize: fontSizes.base,
    color: colors.textPrimary,
  },

  infoContainer: {
    paddingTop: 0,
  },
  infoText: {
    color: colors.textSecondary,
    fontSize: 12,
    fontWeight:'400'
  },

  buttonContainer: {
    paddingTop: spacing.authTitleLeft,
  },
  button: {
    backgroundColor: colors.primary,
    borderRadius: radius.button,
    borderWidth: 1,
    borderColor: colors.primaryBorder,
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
});
