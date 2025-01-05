import React, { useState } from 'react';
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
  ConversationHeader,
  Avatar
} from "@chatscope/chat-ui-kit-react";
import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";

const ChatBot = () => {
  const [messages, setMessages] = useState([
    {
      message: "Hello! How can I help you today?",
      sender: "bot",
      direction: "incoming"
    }
  ]);
  const [isOpen, setIsOpen] = useState(false);

  const handleSend = async (message) => {
    // Add user message
    const userMessage = {
      message,
      sender: "user",
      direction: "outgoing"
    };
    
    setMessages(prevMessages => [...prevMessages, userMessage]);

    try {
      // Call your AI service endpoint
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message }),
      });

      const data = await response.json();
      
      // Add bot response
      const botMessage = {
        message: data.response,
        sender: "bot",
        direction: "incoming"
      };
      
      setMessages(prevMessages => [...prevMessages, botMessage]);
    } catch (error) {
      console.error('Chat error:', error);
      const errorMessage = {
        message: "Sorry, I encountered an error. Please try again later.",
        sender: "bot",
        direction: "incoming"
      };
      setMessages(prevMessages => [...prevMessages, errorMessage]);
    }
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 bg-indigo-600 text-white rounded-full p-4 shadow-lg hover:bg-indigo-700 transition-colors"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
          />
        </svg>
      </button>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 w-80 h-96 shadow-xl rounded-lg overflow-hidden">
      <MainContainer>
        <ChatContainer>
          <ConversationHeader>
            <Avatar src="/robo-avatar.png" name="AI Assistant" />
            <ConversationHeader.Content 
              userName="AI Assistant"
              info="Customer Support"
            />
            <ConversationHeader.Actions>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-gray-100 rounded"
              >
                ✕
              </button>
            </ConversationHeader.Actions>
          </ConversationHeader>
          <MessageList>
            {messages.map((msg, i) => (
              <Message
                key={i}
                model={msg}
              />
            ))}
          </MessageList>
          <MessageInput
            placeholder="Type message here"
            onSend={handleSend}
            attachButton={false}
          />
        </ChatContainer>
      </MainContainer>
    </div>
  );
};

export default ChatBot; 