import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { colors, fontSizes, fontWeights, spacing, radius, layout } from '../styles/index';

const GetStartedScreen = () => {
  const Navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Image source={require('../assets/getstarted.png')} style={styles.image} />

      <View style={styles.textContainer}>
        <Text style={styles.text}>
          You want{'\n'} Authentic, here{'\n'} you go!
        </Text>
        <Text style={styles.smalltext}>Find it here, buy it now!</Text>
        <TouchableOpacity onPress={() => Navigation.navigate('MainTabs')} style={styles.button}>
          <Text style={styles.buttontitle}>Get Started</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default GetStartedScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    height: '100%',
    width: '100%',
    position: 'absolute',
  },
  textContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    top: 100,
  },
  text: {
    color: colors.textOnPrimary,
    fontSize: fontSizes['5xl'],
    fontWeight: fontWeights.semiBold,
    textAlign: 'center',
  },
  smalltext: {
    color: colors.textOnPrimary,
    fontSize: fontSizes.lg,
    fontWeight: fontWeights.regular,
    top: spacing.xl,
  },
  button: {
    borderWidth: 1,
    borderRadius: radius.button,
    backgroundColor: colors.primary,
    borderColor: colors.primaryBorder,
    top: 70,
    height: layout.largePrimaryButtonHeight,
    width: layout.primaryButtonWidth,
  },
  buttontitle: {
    padding: spacing.lg,
    paddingLeft: 100,
    color: colors.textOnPrimary,
    fontWeight: fontWeights.semiBold,
    fontSize: fontSizes.buttonLarge,
  },
});
