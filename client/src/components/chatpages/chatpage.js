import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Send, MoreVertical, Phone, Video, User } from 'lucide-react';

const ChatPage = () => {
  const [message, setMessage] = useState('');
  const [activeChat, setActiveChat] = useState(0);

  const conversations = [
    { id: 1, name: 'Alice Johnson', lastMessage: 'Sure, I can help with that!', time: '10:30 AM', unread: 2 },
    { id: 2, name: 'Bob Smith', lastMessage: 'When is the next meeting?', time: 'Yesterday', unread: 0 },
    { id: 3, name: 'Carol Williams', lastMessage: 'The project is on track.', time: 'Monday', unread: 1 },
    { id: 4, name: 'Daniel Imasuen', lastMessage: 'The project is on track.', time: 'Monday', unread: 1 },
    { id: 5, name: 'Munachi Ani', lastMessage: 'The project is on track.', time: 'Monday', unread: 1 },
    { id: 6, name: 'Adekoya Oluwamayowa', lastMessage: 'The project is on track.', time: 'Monday', unread: 1 },
    { id: 7, name: 'Ade Adenugba', lastMessage: 'The project is on track.', time: 'Monday', unread: 1 },
    { id: 8, name: 'Olawuni Tobiloba', lastMessage: 'The project is on track.', time: 'Monday', unread: 1 },
    
  ];

  const messages = [
    { id: 1, sender: 'Alice Johnson', content: 'Hi there! How can I help you today?', time: '10:30 AM' },
    { id: 2, sender: 'You', content: 'I have a question about the latest assignment.', time: '10:31 AM' },
    { id: 4, sender: 'Alice Johnson', content: 'Sure, what would you like to know?', time: '10:32 AM' },
    
  ];

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (message.trim()) {
      // backend
      console.log('Sending message:', message);
      setMessage('');
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
     <Link to="/" className="absolute top-4 left-4 bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition duration-300">
        Back to Home
      </Link>
      {/* Sidebar */}
      <div className="w-1/4 bg-white border-r border-gray-200">
        <div className="p-4">
          <h2 className="text-2xl font-semibold mb-4">Chats</h2>
          <div className="relative">
            <input
              type="text"
              placeholder="Search conversations"
              className="w-full px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Search className="absolute right-3 top-2.5 text-gray-400" size={20} />
          </div>
        </div>
        <div className="overflow-y-auto h-[calc(100vh-120px)]">
          {conversations.map((conv, index) => (
            <div
              key={conv.id}
              className={`flex items-center p-4 cursor-pointer hover:bg-gray-100 ${activeChat === index ? 'bg-blue-50' : ''}`}
              onClick={() => setActiveChat(index)}
            >
              <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center mr-4">
                <User size={24} className="text-gray-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold">{conv.name}</h3>
                <p className="text-sm text-gray-500 truncate">{conv.lastMessage}</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-gray-500">{conv.time}</p>
                {conv.unread > 0 && (
                  <span className="bg-blue-500 text-white text-xs rounded-full px-2 py-1 mt-1 inline-block">
                    {conv.unread}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Chat Header */}
        <div className="bg-white border-b border-gray-200 p-4 flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center mr-3">
              <User size={20} className="text-gray-600" />
            </div>
            <div>
              <h3 className="font-semibold">{conversations[activeChat].name}</h3>
              <p className="text-sm text-gray-500">Online</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Phone className="text-gray-600 cursor-pointer" size={20} />
            <Video className="text-gray-600 cursor-pointer" size={20} />
            <MoreVertical className="text-gray-600 cursor-pointer" size={20} />
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.sender === 'You' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-xs ${msg.sender === 'You' ? 'bg-blue-500 text-white' : 'bg-gray-200'} rounded-lg p-3`}>
                <p>{msg.content}</p>
                <p className="text-xs text-right mt-1 opacity-70">{msg.time}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Message Input */}
        <form onSubmit={handleSendMessage} className="bg-white border-t border-gray-200 p-4">
          <div className="flex items-center">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type a message..."
              className="flex-1 border rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button type="submit" className="ml-2 bg-blue-500 text-white rounded-full p-2 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
              <Send size={20} />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChatPage;