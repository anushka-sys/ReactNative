import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Help = () => {

  const [message, setMessage] = useState('');

  const [faqData, setFaqData] = useState([]);

  const [chatData, setChatData] = useState([
    {
      id: '1',
      type: 'bot',
      text: 'Hello  How can I help you?',
    },
  ]);

  useEffect(() => {
    getFAQData();
  }, []);

  // API Fetch
  const getFAQData = async () => {

    try {

      const response = await fetch(
        'https://69a7bb832cd1d055269167fa.mockapi.io/api/v1/users'
      );

      const data = await response.json();

      setFaqData(data);

    } catch (error) {
      console.log(error);
    }
  };

  // FAQ Click
  const handleFAQPress = item => {

    const userMsg = {
      id: Date.now().toString(),
      type: 'user',
      text: item.question,
    };

    const botMsg = {
      id: (Date.now() + 1).toString(),
      type: 'bot',
      text: item.answer,
    };

    setChatData(prev => [...prev, userMsg]);

    setTimeout(() => {
      setChatData(prev => [...prev, botMsg]);
    }, 500);
  };

  // Send Message
  const sendMessage = () => {

    if (!message.trim()) {
      return;
    }

    const userMsg = {
      id: Date.now().toString(),
      type: 'user',
      text: message,
    };

    setChatData(prev => [...prev, userMsg]);

    let botReply =
      'Sorry  Please try another question.';

    faqData.forEach(item => {

      if (
        message
          .toLowerCase()
          .includes(item.keyword.toLowerCase())
      ) {
        botReply = item.answer;
      }
    });

    const botMsg = {
      id: (Date.now() + 1).toString(),
      type: 'bot',
      text: botReply,
    };

    setTimeout(() => {
      setChatData(prev => [...prev, botMsg]);
    }, 500);

    setMessage('');
  };

  const renderItem = ({item}) => {

    return (
      <View
        style={[
          styles.chatBox,
          item.type === 'user'
            ? styles.userBox
            : styles.botBox,
        ]}>

        <Text
          style={{
            color:
              item.type === 'user'
                ? '#fff'
                : '#000',
          }}>
          {item.text}
        </Text>

      </View>
    );
  };

  return (
    <View style={styles.container}>

      {/* Header */}
      <Text style={styles.header}>
        Help Center
      </Text>

      {/* FAQ */}
      <FlatList
        horizontal
        data={faqData}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 10,
        }}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => (

          <TouchableOpacity
            style={styles.faqBtn}
            onPress={() =>
              handleFAQPress(item)
            }>

            <Text
              numberOfLines={2}
              style={styles.faqText}>
              {item.question}
            </Text>

          </TouchableOpacity>
        )}
      />

      {/* Chat */}
      <FlatList
        data={chatData}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={{
          paddingBottom: 100,
          paddingTop: 15,
        }}
      />

      {/* Input */}
      <View style={styles.inputContainer}>

        <TextInput
          placeholder="Ask something..."
          value={message}
          onChangeText={setMessage}
          style={styles.input}
        />

        <TouchableOpacity
          style={styles.sendBtn}
          onPress={sendMessage}>

          <Icon
            name="send"
            size={22}
            color="#fff"
          />

        </TouchableOpacity>

      </View>

    </View>
  );
};

export default Help;

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  header: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#F83758',
    textAlign: 'center',
    marginVertical: 15,
  },

  faqBtn: {
    backgroundColor: '#F83758',
    width: 170,
    height:50,
    padding: 12,
    borderRadius: 15,
    marginRight: 10,
    justifyContent: 'center',
  },

  faqText: {
    color: '#fff',
    fontSize: 12,
  },

  chatBox: {
    padding: 14,
    marginHorizontal: 15,
    marginBottom: 8,
    borderRadius: 14,
    maxWidth: '75%',
  },

  userBox: {
    backgroundColor: '#F83758',
    alignSelf: 'flex-end',
  },

  botBox: {
    backgroundColor: '#F1F1F1',
    alignSelf: 'flex-start',
  },

  inputContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderColor: '#ECECEC',
  },

  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#DADADA',
    borderRadius: 25,
    paddingHorizontal: 15,
    height: 48,
  },

  sendBtn: {
    backgroundColor: '#F83758',
    height: 48,
    width: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },

});
