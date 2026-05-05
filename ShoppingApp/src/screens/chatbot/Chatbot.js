import React, { useState, useCallback, useEffect } from "react";
import { GiftedChat } from "react-native-gifted-chat";
import { getMainMenu, getResponseForOption, BOT_USER } from "./chatbotResponse";

const Chatbot = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: "Hello! I am your Help Center bot.",
        createdAt: new Date(),
        user: BOT_USER,
      },
      getMainMenu(),
    ]);
  }, []);

  
  const onQuickReply = useCallback((replies = []) => {
    const option = replies[0].value;

    
    const userMsg = {
      _id: Math.random(),
      text: replies[0].title,
      createdAt: new Date(),
      user: { _id: 1 },
    };

    // get bot response
    const botReplyData = getResponseForOption(option);

    const botMsg = {
      _id: Math.random(),
      text: botReplyData.text,
      createdAt: new Date(),
      user: BOT_USER,
    };

    // show response + show menu again
    setMessages((prev) =>
      GiftedChat.append(prev, [userMsg, botMsg, getMainMenu()])
    );
  }, []);

  return (
    <GiftedChat
      messages={messages}
      onQuickReply={onQuickReply}
      user={{ _id: 1 }}
    />
  );
};

export default Chatbot;