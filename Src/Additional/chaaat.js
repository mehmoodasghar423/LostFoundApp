import React, { useState, useEffect } from 'react';
import { View, Platform, KeyboardAvoidingView, TouchableOpacity } from 'react-native';
import { GiftedChat, Send } from 'react-native-gifted-chat';
import Icon from 'react-native-vector-icons/FontAwesome'; // You can use any icon library of your choice

const ChatScreen = () => {
  const [messages, setMessages] = useState([]);

  // Function to handle sending messages
  const handleSend = (newMessages) => {
    setMessages((prevMessages) => GiftedChat.append(prevMessages, newMessages));
  };

  // Simulate incoming messages using useEffect
  useEffect(() => {
    // Replace this part with your message reception logic (WebSocket, API, etc.)
    const simulateIncomingMessages = () => {
      const newMessage = {
        _id: Math.round(Math.random() * 1000000),
        text: 'Hello there!',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'Jane Smith', // Replace with the sender's name
        },
      };

      setMessages((prevMessages) => GiftedChat.append(prevMessages, [newMessage]));
    };

    // Simulate new messages every 3 seconds
    const messageTimer = setInterval(simulateIncomingMessages, 3000);

    // Clear the interval when the component unmounts
    return () => clearInterval(messageTimer);
  }, []);

  // Custom send button with an icon
  const renderSendButton = (props) => {
    return (
      <TouchableOpacity
        onPress={() => props.onSend({ text: props.text.trim() }, true)}
        style={{ marginRight: 10, marginBottom: 5 }}
      >
        <Icon name="send" size={26} color="blue" />
      </TouchableOpacity>
    );
  };

  return (
    <View style={{ flex: 1,marginTop:30  }}>
      {/* If you are on Android, use KeyboardAvoidingView to avoid keyboard overlap */}
      {Platform.OS === 'android' ? (
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          // behavior="padding"
          // keyboardVerticalOffset={80}
          // enabled
        >
          <GiftedChat
            messages={messages}
            onSend={(newMessages) => handleSend(newMessages)}
            user={{
              _id: 1,
              name: 'John Doe', // Replace with the current user's name
            }}
            renderSend={renderSendButton} // Use the custom send button
          />
        </KeyboardAvoidingView>
      ) : (
        <GiftedChat
          messages={messages}
          onSend={(newMessages) => handleSend(newMessages)}
          user={{
            _id: 1,
            name: 'John Doe', // Replace with the current user's name
          }}
          renderSend={renderSendButton} // Use the custom send button
        />
      )}
    </View>
  );
};

export default ChatScreen;


<View style={styles.buttonContentContainer}>{renderButtonContent()}</View>