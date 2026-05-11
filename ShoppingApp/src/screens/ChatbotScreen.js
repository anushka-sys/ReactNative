import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { SafeAreaView } from 'react-native-safe-area-context';

const flows = {
  start: {
    bot: 'How can I help you today?',
    options: ['Order issue', 'Payment / Refund'],
  },
  order: {
    bot: "What's the issue with your order?",
    options: ['Track my order', 'Cancel my order'],
  },
  payment: {
    bot: "What's your payment concern?",
    options: ['Payment failed', 'Refund status'],
  },
  track: {
    bot: 'Your order is on the way — arrives in 2-3 business days.',
    options: ['Another issue', 'Talk to agent'],
  },
  cancel: {
    bot: 'You can cancel before the order ships from the warehouse.',
    options: ['Another issue', 'Talk to agent'],
  },
  failed: {
    bot: "Your payment didn't go through. Please try another method.",
    options: ['Another issue', 'Talk to agent'],
  },
  refund: {
    bot: 'Refunds take 5-7 working days to appear in your account.',
    options: ['Another issue', 'Talk to agent'],
  },
  another: {
    bot: 'Sure! What else can I help you with?',
    options: ['Order issue', 'Payment / Refund'],
  },
  agent: {
    bot: 'Connecting you to a support agent. Please wait.',
    options: ['Order issue', 'Payment / Refund'],
  },
};

const optionMap = {
  'Order issue': 'order',
  'Payment / Refund': 'payment',
  'Track my order': 'track',
  'Cancel my order': 'cancel',
  'Payment failed': 'failed',
  'Refund status': 'refund',
  'Another issue': 'another',
  'Talk to agent': 'agent',
};

let idCounter = 10;

const Help = () => {
  const [text, setText] = useState('');
  const [messages, setMessages] = useState([
    {
      id: '1',
      sender: 'bot',
      text: 'Hello! Welcome to Help Center.',
      options: null,
    },
    {
      id: '2',
      sender: 'bot',
      text: flows.start.bot,
      options: flows.start.options,
    },
  ]);

  const addMessage = (sender, msgText, options = null) => {
    const newMsg = {
      id: String(idCounter++),
      sender,
      text: msgText,  
      options,
    };
    setMessages(prev => [...prev, newMsg]);
  };

  const selectOption = label => {
    const key = optionMap[label];
    const next = flows[key];

    addMessage('user', label);

    setTimeout(() => {
      addMessage('bot', next.bot, next.options);
    }, 400);
  };

  const sendMessage = () => {
    if (text.trim() === '') return;

    const lower = text.toLowerCase();
    let reply =
      "Sorry, I couldn't understand that. Please choose an option below.";

    if (lower.includes('order') || lower.includes('track'))
      reply = flows.track.bot;
    else if (lower.includes('cancel')) reply = flows.cancel.bot;
    else if (lower.includes('payment') || lower.includes('failed'))
      reply = flows.failed.bot;
    else if (lower.includes('refund')) reply = flows.refund.bot;

    addMessage('user', text);
    setText('');

    setTimeout(() => {
      addMessage('bot', reply, flows.start.options);
    }, 400);
  };

  const renderItem = ({ item }) => {
    const isUser = item.sender === 'user';
    return (
      <View>
        <View
          style={[styles.bubble, isUser ? styles.userBubble : styles.botBubble]}
        >
          <Text style={{ color: isUser ? '#fff' : '#000', fontSize: 15 }}>
            {item.text}
          </Text>
        </View>

        {item.options && (
          <View style={styles.optionsWrap}>
            {item.options.map(opt => (
              <TouchableOpacity
                key={`${item.id}-${opt}`}
                style={styles.optBtn}
                onPress={() => selectOption(opt)}
              >
                <Text style={styles.optText}>{opt}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <Text style={styles.header}>Help Center</Text>

        <FlatList
          data={messages}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.chatContainer}
        />

        <View style={styles.inputRow}>
          <TextInput
            style={styles.input}
            placeholder="Ask something..."
            value={text}
            onChangeText={setText}
          />
          <TouchableOpacity style={styles.sendBtn} onPress={sendMessage}>
            <Icon name="send" size={20} color="#fff" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
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
    color: '#486ef9',
    textAlign: 'center',
    marginVertical: 10,
  },
  chatContainer: {
    paddingHorizontal: 12,
    paddingTop: 10,
  },
  bubble: {
    maxWidth: '75%',
    padding: 12,
    borderRadius: 16,
    marginBottom: 6,
  },
  userBubble: {
    backgroundColor: '#486ef9',
    alignSelf: 'flex-end',
  },
  botBubble: {
    backgroundColor: '#F1F1F1',
    alignSelf: 'flex-start',
  },
  optionsWrap: {
    alignSelf: 'flex-start',
    marginBottom: 10,
    gap: 6,
  },
  optBtn: {
    borderWidth: 1,
    borderColor: '#486ef9',
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
  optText: {
    color: '#486ef9',
    fontSize: 13,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderTopWidth: 1,
    borderColor: '#ECECEC',
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 25,
    paddingHorizontal: 15,
    height: 46,
    fontSize: 15,
  },
  sendBtn: {
    backgroundColor: '#486ef9',
    width: 46,
    height: 46,
    borderRadius: 23,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
});
