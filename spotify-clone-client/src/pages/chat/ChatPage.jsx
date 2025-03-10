
// Chat page component
import React, { useState, useEffect } from 'react';

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  // Handle sending a new message
  const handleSendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim()) {
      const message = {
        id: Date.now(),
        text: newMessage,
        sender: 'user',
        timestamp: new Date().toLocaleTimeString()
      };
      setMessages([...messages, message]);
      setNewMessage('');
    }
  };

  return (
    <div className="flex flex-col h-screen max-w-4xl mx-auto p-5">
      <div className="p-3 bg-gray-100 rounded-t-lg">
        <h2>Chat</h2>
      </div>
      
      <div className="flex-1 overflow-y-auto p-5 bg-white border border-gray-200">
        {messages.map(message => (
          <div 
            key={message.id}
            className={`max-w-[70%] rounded-lg p-3 mb-3 ${
              message.sender === 'user' 
                ? 'ml-auto bg-blue-600 text-white' 
                : 'mr-auto bg-gray-200'
            }`}
          >
            <div className="mb-1">
              {message.text}
            </div>
            <div className="text-sm opacity-70">
              {message.timestamp}
            </div>
          </div>
        ))}
      </div>

      <form className="flex gap-3 py-5" onSubmit={handleSendMessage}>
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 p-3 border border-gray-200 rounded-md text-base"
        />
        <button type="submit" className="px-5 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700">
          Send
        </button>
      </form>
    </div>
  );
};

export default Chat;
