import React, { useState } from 'react';
import { Star, Plus } from 'lucide-react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../custom-components/custom-components";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "../custom-components/custom-components";
import { Button } from "../custom-components/custom-components";
import { Badge } from "../custom-components/custom-components";

const TheGeng = () => {
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);

  const gengMembers = [
    { id: 1, name: "Oluwamayowa Adekoya", role: "Founder", description: "Passionate about creating learning solutions for students." },
    { id: 2, name: "Jane Doe", role: "Community Manager", description: "Connecting students to resources and opportunities." },
    { id: 3, name: "John Smith", role: "Tech Lead", description: "Building innovative tools for effective collaboration." },
    // Add more members as needed
  ];

  const SignUpModal = () => (
    <Dialog open={isSignUpModalOpen} onOpenChange={setIsSignUpModalOpen}>
      <DialogContent className="sm:max-w-[600px] transition-all duration-300 ease-in-out">
        <DialogHeader>
          <DialogTitle className="text-2xl">Join The Geng</DialogTitle>
          <DialogDescription className="text-gray-600">
            Sign up now to connect with a community of like-minded students and unlock exclusive features.
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-6 py-4">
          <div className="flex gap-4 mt-4">
            <Button className="flex-1 bg-blue-600 hover:bg-blue-700" onClick={() => setIsSignUpModalOpen(false)}>
              Sign Up Now
            </Button>
            <Button variant="outline" className="flex-1" onClick={() => setIsSignUpModalOpen(false)}>
              Maybe Later
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );

  return (
    <div className="p-8 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900">The Geng</h1>
            <p className="text-gray-600 mt-2">Join our vibrant community of learners and innovators.</p>
          </div>
          <div className="flex gap-4">
            <Button variant="outline" onClick={() => setIsSignUpModalOpen(true)} className="flex items-center gap-2">
              <Star className="w-4 h-4" />
              Log In 
            </Button>
            <Button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700" onClick={() => setIsSignUpModalOpen(true)}>
              <Plus className="w-4 h-4" />
              Sign Up now
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {gengMembers.map(member => (
            <Card key={member.id} className="cursor-pointer hover:shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl">{member.name}</CardTitle>
                <p className="text-gray-600">{member.role}</p>
              </CardHeader>
              <CardContent>
                <p className="mt-2">{member.description}</p>
              </CardContent>
              <div className="p-4">
                <Badge variant="secondary">View Profile</Badge>
              </div>
            </Card>
          ))}
        </div>

        <SignUpModal />
      </div>
    </div>
  );
};

export default TheGeng;
