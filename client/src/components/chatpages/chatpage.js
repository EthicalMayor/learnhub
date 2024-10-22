import React from 'react';
import { MessageCircle, Users, Hash, Search, BookOpen, Plus } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../custom-components/custom-components';
import { Alert, AlertTitle, AlertDescription } from '../custom-components/custom-components';
import { Button } from '../custom-components/custom-components';

const ChatPreview = () => {
  const chatGroups = [
    {
      name: "Physics Study Group",
      members: 24,
      lastMessage: "Does anyone have notes from today's lecture?",
      time: "2m ago"
    },
    {
      name: "CS Project Team",
      members: 8,
      lastMessage: "Video Call tomorrow at 3 PM, please set your reminders",
      time: "5m ago"
    },
    {
      name: "Math Help",
      members: 156,
      lastMessage: "Check out this solution for problem 3.4",
      time: "15m ago"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <Alert className="mb-8 bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
          <AlertTitle className="text-blue-800 font-semibold">
            Chat Preview
          </AlertTitle>
          <AlertDescription className="text-blue-700">
            Create an account now to start connecting and collaborating with peers.
          </AlertDescription>
        </Alert>

        <div className="grid md:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="md:col-span-1">
            <div className="bg-white rounded-lg shadow p-4">
              <Button className="w-full mb-4 bg-blue-600 hover:bg-blue-700">
                <Plus className="w-4 h-4 mr-2" />
                New Chat
              </Button>
              
              <div className="space-y-2">
                <button className="w-full flex items-center p-2 rounded hover:bg-gray-100">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Direct Messages
                </button>
                <button className="w-full flex items-center p-2 rounded hover:bg-gray-100">
                  <Users className="w-4 h-4 mr-2" />
                  Gengs
                </button>
                <button className="w-full flex items-center p-2 rounded hover:bg-gray-100">
                  <Hash className="w-4 h-4 mr-2" />
                  Study Groups
                </button>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="md:col-span-3">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Recent Chats</CardTitle>
                  <Button variant="outline" size="sm">
                    <Search className="w-4 h-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {chatGroups.map((group, index) => (
                    <div 
                      key={index}
                      className="p-4 rounded-lg hover:bg-gray-50 cursor-pointer border"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex items-center">
                          <BookOpen className="w-5 h-5 text-blue-600 mr-2" />
                          <h3 className="font-semibold">{group.name}</h3>
                        </div>
                        <span className="text-sm text-gray-500">{group.time}</span>
                      </div>
                      <p className="text-gray-600 text-sm">{group.lastMessage}</p>
                      <div className="mt-2 flex items-center text-sm text-gray-500">
                        <Users className="w-4 h-4 mr-1" />
                        {group.members} members
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="mt-8 bg-white rounded-lg shadow-lg p-8 text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Connect With Friends
              </h2>
              <p className="text-gray-600 mb-6">
                Join LearnHub to chat with peers, organize study sessions, and collaborate on projects
              </p>
              <div className="flex justify-center gap-4">
                <Button variant="outline">Learn More</Button>
                <Button className="bg-blue-600 hover:bg-blue-700">
                  Get Started
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPreview;