import React, { useContext, useEffect, useState } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  NativeModules,
  DeviceEventEmitter,
  PermissionsAndroid,
  Platform
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { ThemeContext } from '../context/ThemeContext';

const { RnVoicekit } = NativeModules;
//const voiceEmitter = new NativeEventEmitter(RnVoicekit);

const SearchBar = ({ value, onChangeText }) => {
  const { theme } = useContext(ThemeContext);
  const styles = getStyles(theme);
  const [isListening, setIsListening] = useState(false);

  useEffect(() => {
    const subs = [
      DeviceEventEmitter.addListener('onSpeechStart', () => setIsListening(true)),
      DeviceEventEmitter.addListener('onSpeechEnd', () => setIsListening(false)),
      DeviceEventEmitter.addListener('onSpeechPartialResults', (e) => {
        if (e.value?.length > 0) onChangeText(e.value[0]);
      }),
      DeviceEventEmitter.addListener('onSpeechResults', (e) => {
        if (e.value?.length > 0) onChangeText(e.value[0]);
        setIsListening(false);
      }),
      DeviceEventEmitter.addListener('onSpeechError', (e) => {
        console.error('Voice error:', e.message);
        setIsListening(false);
      }),
    ];

    return () => subs.forEach((s) => s.remove());
  }, []);

  const requestMicPermission = async () => {
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
        {
          title: 'Microphone Permission',
          message: 'App needs microphone access for voice search',
          buttonPositive: 'Allow',
          buttonNegative: 'Deny',
        }
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    }
    return true;
  };

  const startListening = async () => {
    try {
      const hasPermission = await requestMicPermission();
      if (!hasPermission) {
        console.warn('Microphone permission denied');
        return;
      }
      await RnVoicekit.start({ locale: 'en-US', partialResults: true });
    } catch (e) {
      console.error('Start error:', e);
    }
  };

  const stopListening = async () => {
    try {
      await RnVoicekit.stop();
      setIsListening(false);
    } catch (e) {
      console.error('Stop error:', e);
    }
  };

  const handleMicPress = () => {
    isListening ? stopListening() : startListening();
  };

  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        <Icon name="search" size={20} color="#9CA3AF" />

        <TextInput
          placeholder="Search any Product.."
          placeholderTextColor="#9CA3AF"
          style={styles.input}
          value={value}
          onChangeText={onChangeText}
        />

        <TouchableOpacity onPress={handleMicPress}>
          <Icon name="mic" size={20} color="#9CA3AF" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SearchBar;

const getStyles = theme =>
  StyleSheet.create({
    wrapper: {
      paddingHorizontal: 16,
      paddingTop: 16,
    },

    container: {
      height: 40,
      backgroundColor: theme.backgroundPrimary,
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 10,
      paddingVertical: 8,
    },

    input: {
      flex: 1,
      marginLeft: 10,
      fontSize: 14,
      lineHeight: 20,
      color: '#000',
      padding: 0,
    },
  });
