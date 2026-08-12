
// Chat page component
import Header from '@/components/Header';
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const {isPlayer} = useSelector((state)=>state.player)

  // Handle sending a new message
  const handleSendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim()) {
      const message = {
        id: Date.now(),
        text: newMessage,
        sender: 'user',
        timestamp: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
      };
      setMessages([...messages, message]);
      setNewMessage('');
    }
  };

  return (
    <main className='rounded-md overflow-hidden h-screen bg-gradient-to-b from-zinc-800 to-zinc-900'>
    <Header/>
    <div className={`flex flex-col  max-h-screen max-w-4xl mx-auto p-5 ${isPlayer ? "min-h-[80%] h-auto" : " h-[75%]"}`}>
      <div className="p-3 bg-zinc-900  border border-b-0 border-zinc-800 white rounded-t-md">
        <h2>Chat</h2>
      </div>
      
      <div className="flex-1 overflow-y-auto p-5 rounded-b-md min-h-full bg-zinc-900 border border-zinc-800">
        {messages.map(message => (
          <div 
            key={message.id}
            className={`max-w-[70%] w-auto rounded-lg p-3 mb-3 ${
              message.sender === 'user' 
                ? 'ml-auto bg-zinc-800 text-white' 
                : 'mr-auto bg-gray-200'
            }`}
          >
            <div className="mb-1">
              {message.text}
            </div>
            <div className="text-xs text-right opacity-70">
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
          className="flex-1 p-3 border border-zinc-800 bg-zinc-900 rounded-md text-base focus:border-zinc-700 "
        />
        <button type="submit" className="px-5 py-3 bg-green-500 text-white rounded-md hover:bg-green-400">
          Send
        </button>
      </form>
    </div>
    </main>

  );
};

export default Chat;
