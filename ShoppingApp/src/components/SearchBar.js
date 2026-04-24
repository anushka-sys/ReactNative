import React, { useContext, useEffect, useState } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  NativeModules,
  NativeEventEmitter,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { ThemeContext } from '../context/ThemeContext';

const { RnVoicekit } = NativeModules;
const voiceEmitter = new NativeEventEmitter(RnVoicekit);

const SearchBar = ({ value, onChangeText }) => {
  const { theme } = useContext(ThemeContext);
  const styles = getStyles(theme);
  const [isListening, setIsListening] = useState(false);

  useEffect(() => {
    const subs = [
      voiceEmitter.addListener("onSpeechStart", () => {
        setIsListening(true);
      }),

      voiceEmitter.addListener("onSpeechEnd", () => {
        setIsListening(false);
      }),

      // Partial results — update text in real-time as user speaks
      voiceEmitter.addListener("onSpeechPartialResults", (e) => {
        if (e.value?.length > 0) {
          onChangeText(e.value[0]);
        }
      }),

      // Final result — set the confirmed text
      voiceEmitter.addListener("onSpeechResults", (e) => {
        if (e.value?.length > 0) {
          onChangeText(e.value[0]);
        }
        setIsListening(false);
      }),

      voiceEmitter.addListener("onSpeechError", (e) => {
        console.error("Voice error:", e.message);
        setIsListening(false);
      }),
    ];

    // Cleanup all listeners on unmount
    return () => subs.forEach((s) => s.remove());
  }, []);
  
  const startListening = async () => {
    try {
      await RnVoicekit.start({ locale: "en-US", partialResults: true });
    } catch (e) {
      console.error("Start error:", e);
    }
  };

  const stopListening = async () => {
    try {
      await RnVoicekit.stop();
      setIsListening(false);
    } catch (e) {
      console.error("Stop error:", e);
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


//   SearchBar.js:14 `new NativeEventEmitter()` was called with a non-null argument without the required `addListener` method.
// SearchBar.js:14 `new NativeEventEmitter()` was called with a non-null argument without the required `removeListeners` method.
// console.js:668 Running "productapp" with {"rootTag":1,"initialProps":{},"fabric":true}
// SearchBar.js:47 Voice error: Insufficient permissions
// anonymous	@	SearchBar.js:47


