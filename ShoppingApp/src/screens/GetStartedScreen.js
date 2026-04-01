import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';

const GetStartedScreen = () => {
  const Navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/getstarted.png')}
        style={styles.image}
      />

      <View style={styles.textContainer}>
        <Text style={styles.text}>
          You want{'\n'} Authentic, here{'\n'} you go!
        </Text>
        <Text style={styles.smalltext}>Find it here, buy it now!</Text>
        <TouchableOpacity
          onPress={() => {
            Navigation.navigate('HomePage');
          }}
          style={styles.button}
        >
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
    color: '#FFFFFF',
    fontSize: 34,
    fontWeight: '600',
    textAlign: 'center', 
  },
  smalltext: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '400',
    top: 20,
  },
  button: {
    borderWidth: 1,
    borderRadius: 4,
    backgroundColor: '#F83758',
    borderColor: '#F83758',
    top: 70,
    height: 50,
    width: 290,
  },
  buttontitle: {
    padding: 10,
    paddingLeft: 100,
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 18,
  },
});
