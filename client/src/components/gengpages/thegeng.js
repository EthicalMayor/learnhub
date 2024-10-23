import React from 'react';
import { Card, CardContent } from "../custom-components/custom-components";
import { Users, Calendar, MessageSquare } from 'lucide-react';

export const TheGengPage = () => {
  const members = [
    { name: "Alice", role: "Leader", interests: ["Coding", "Gaming"] },
    { name: "Bob", role: "Coordinator", interests: ["Design", "Art"] },
    { name: "Charlie", role: "Member", interests: ["Music", "Traveling"] },
  ];

  return (
    <>
      <Navigation currentPage="geng" />
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900">The Geng</h1>
            <p className="text-gray-600 mt-2">Meet the elites!</p>
          </div>

          <div className="grid gap-6">
            {members.map((member, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <h3 className="text-2xl font-semibold mb-2">{member.name}</h3>
                  <p className="text-gray-600 mb-2">{member.role}</p>
                  <p className="text-gray-500">Interests: {member.interests.join(", ")}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Sign Up Prompt */}
          <div className="mt-8 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Join The Geng!</h2>
            <p className="text-gray-600 mb-6">Become a part of our vibrant community and collaborate with fellow students.</p>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
              Sign Up
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default TheGengPage;
