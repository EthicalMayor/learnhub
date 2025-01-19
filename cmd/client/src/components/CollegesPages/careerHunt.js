import React, { useState, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Briefcase, Star, Plus } from 'lucide-react';
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

const CareerHunt = () => {
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);
  const [selectedOpportunity, setSelectedOpportunity] = useState(null);

  const jobOpportunities = [
    { id: 1, title: "Software Development Intern", company: "Tech Innovators", location: "Remote", datePosted: "Oct 1, 2024", description: "Join our team to develop cutting-edge software solutions. Ideal for students with a passion for coding." },
    { id: 2, title: "Marketing Assistant", company: "Creative Minds", location: "Onsite", datePosted: "Oct 5, 2024", description: "Assist in marketing campaigns and gain hands-on experience in digital marketing strategies." },
    // Add more job opportunities as needed
  ];

  const handleOpportunityClick = (opportunity) => {
    setSelectedOpportunity(opportunity);
  };

  const OpportunityPreview = () => {
    if (!selectedOpportunity) return null;

    return (
      <div className="fixed z-50 transform transition-all duration-200 ease-in-out" style={{ top: '20%', left: '50%', transform: 'translate(-50%, -100%)' }}>
        <Card className="w-80 shadow-lg">
          <CardContent className="p-4">
            <h3 className="font-bold">{selectedOpportunity.title}</h3>
            <p className="text-gray-600">{selectedOpportunity.company}</p>
            <p className="text-sm">{selectedOpportunity.location} | {selectedOpportunity.datePosted}</p>
            <p className="mt-2">{selectedOpportunity.description}</p>
          </CardContent>
        </Card>
      </div>
    );
  };

  const SignUpModal = () => (
    <Dialog open={isSignUpModalOpen} onOpenChange={setIsSignUpModalOpen}>
      <DialogContent className="sm:max-w-[600px] transition-all duration-300 ease-in-out">
        <DialogHeader>
          <DialogTitle className="text-2xl">Join Career Hunt</DialogTitle>
          <DialogDescription className="text-gray-600">
            Sign up now to unlock exclusive job listings and manage your applications.
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
            <h1 className="text-4xl font-bold text-gray-900">Career Hunt</h1>
            <p className="text-gray-600 mt-2">Discover job and internship opportunities tailored for students.</p>
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

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {jobOpportunities.map(opportunity => (
            <Card key={opportunity.id} className="cursor-pointer hover:shadow-lg" onClick={() => handleOpportunityClick(opportunity)}>
              <CardHeader>
                <CardTitle className="text-xl">{opportunity.title}</CardTitle>
                <p className="text-gray-600">{opportunity.company}</p>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-500">{opportunity.location} | Posted on {opportunity.datePosted}</p>
                <p className="mt-2">{opportunity.description.substring(0, 50)}...</p>
              </CardContent>
              <div className="p-4">
                <Badge variant="secondary">Apply Now</Badge>
              </div>
            </Card>
          ))}
        </div>

        <OpportunityPreview />
        <SignUpModal />
      </div>
    </div>
  );
};

export default CareerHunt;
