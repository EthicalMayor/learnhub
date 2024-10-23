import React from 'react';
import { Video, Users, MessageCircle, Share2, Settings, Shield } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../custom-components/custom-components';
import { Alert, AlertTitle, AlertDescription } from '../custom-components/custom-components';
import { Button } from '../custom-components/custom-components';

const VideoConferencingPreview = () => {
  const features = [
    {
      icon: <Users className="w-6 h-6 text-blue-600" />,
      title: "Group Study Sessions",
      description: "Host or join study sessions with up to 50 participants"
    },
    {
      icon: <Share2 className="w-6 h-6 text-blue-600" />,
      title: "Screen Sharing",
      description: "Share your screen for presentations and demonstrations"
    },
    {
      icon: <MessageCircle className="w-6 h-6 text-blue-600" />,
      title: "Live Chat",
      description: "Chat with participants during sessions"
    },
    {
      icon: <Shield className="w-6 h-6 text-blue-600" />,
      title: "Secure Meetings",
      description: "End-to-end encrypted video conferences"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <Alert className="mb-8 bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
          <AlertTitle className="text-blue-800 font-semibold">
         Video Conferences
          </AlertTitle>
          <AlertDescription className="text-blue-700">
            Sign up to access full video conferencing features
          </AlertDescription>
        </Alert>

        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Virtual Study Sessions Made Easy
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Connect with Peers anywhere, anytime
          </p>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Video className="w-4 h-4 mr-2" />
            Start New Meeting
          </Button>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {features.map((feature, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  {feature.icon}
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8 text-center">
          <img 
            src="/api/placeholder/800/400" 
            alt="Video conferencing preview" 
            className="rounded-lg mb-6 w-full"
          />
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Ready to Start Learning Together?
          </h2>
          <p className="text-gray-600 mb-6">
            Join LearnHub to access unlimited video conferencing 
          </p>
          <div className="flex justify-center gap-4">
            <Button variant="outline">Learn More</Button>
            <Button className="bg-blue-600 hover:bg-blue-700">
              Sign Up Free
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoConferencingPreview;