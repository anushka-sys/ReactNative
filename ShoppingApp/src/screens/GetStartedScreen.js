import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import {
  colors,
  fontSizes,
  fontWeights,
  spacing,
  radius,
} from '../styles/index';
import LinearGradient from 'react-native-linear-gradient';

const GetStartedScreen = () => {
  const Navigation = useNavigation();

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../assets/getstarted.png')}
        style={styles.image}
        resizeMode="cover"
      />

      <LinearGradient
        style={styles.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        colors={['transparent', 'rgba(0,0,0,0.85)']}
      >
        <View style={styles.textContainer}>
          <Text style={styles.title}>
            You want{'\n'}Authentic, here{'\n'}you go!
          </Text>
          <Text style={styles.subtitle}>Find it here, buy it now!</Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => Navigation.navigate('MainTabs')}
          >
            <Text style={styles.buttonTitle}>Get Started</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
      <ImageBackground />
    </View>
  );
};

export default GetStartedScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    width: '100%',
  },
  image: {
    flex: 1,
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  gradient: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  textContainer: {
    alignItems: 'center',
    paddingHorizontal: spacing.authTitleLeft,
    paddingBottom: spacing['7xl'],
    gap: spacing['5xl'],
  },
  title: {
    color: colors.textOnPrimary,
    fontSize: fontSizes['5xl'],
    fontWeight: fontWeights.semiBold,
    textAlign: 'center',
    lineHeight: 42,
  },
  subtitle: {
    color: colors.textOnPrimary,
    fontSize: fontSizes.lg,
    fontWeight: fontWeights.regular,
    textAlign: 'center',
  },
  button: {
    backgroundColor: colors.primary,
    borderRadius: radius.button,
    borderWidth: 1,
    borderColor: colors.primaryBorder,
    alignItems: 'center',
    alignSelf: 'stretch',
  },
  buttonTitle: {
    color: colors.textOnPrimary,
    fontSize: fontSizes.buttonLarge,
    fontWeight: fontWeights.semiBold,
    paddingVertical: 15,
    textAlign: 'center',
  },
});
