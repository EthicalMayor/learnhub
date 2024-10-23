// pages/CareerHuntPage.jsx
import React from 'react';
import { Card, CardContent, Badge } from "../custom-components/custom-components";
import { Building2, MapPin, Calendar } from 'lucide-react';
import { Button } from "../custom-components/custom-components";

export const CareerHuntPage = () => {
  const opportunities = [
    {
      role: "Software Engineering Intern",
      company: "Tech Corp",
      location: "San Francisco, CA",
      type: "Internship",
      deadline: "Nov 15, 2024",
      description: "Join our engineering team and work on cutting-edge projects...",
      requirements: ["Programming experience", "Problem-solving skills", "Team player"]
    },
    {
      role: "Marketing Assistant",
      company: "Global Media",
      location: "New York, NY",
      type: "Part-time",
      deadline: "Nov 20, 2024",
      description: "Assist in developing and implementing marketing strategies...",
      requirements: ["Communication skills", "Social media experience", "Creative mindset"]
    }
  ];

  return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900">Career Hunt</h1>
            <p className="text-gray-600 mt-2">Discover opportunities tailored for students</p>
          </div>

          <div className="grid gap-6">
            {opportunities.map((job, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <Badge className="mb-2">{job.type}</Badge>
                      <h3 className="text-2xl font-semibold mb-2">{job.role}</h3>
                      <p className="text-gray-600 mb-4">{job.description}</p>
                      
                      <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                        <span className="flex items-center gap-1">
                          <Building2 className="w-4 h-4" />
                          {job.company}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          {job.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          Due: {job.deadline}
                        </span>
                      </div>

                      <div className="space-y-2">
                        <h4 className="font-medium">Requirements:</h4>
                        <ul className="list-disc list-inside text-gray-600">
                          {job.requirements.map((req, idx) => (
                            <li key={idx}>{req}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    <Button className="mt-4">Apply Now</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Sign Up Prompt */}
          <div className="mt-8 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Join LearnHub Today!</h2>
            <p className="text-gray-600 mb-6">Sign up now to access more opportunities and connect with industry professionals.</p>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
              Sign Up
            </Button>
          </div>
        </div>
      </div>
  );
};

export default CareerHuntPage;
s