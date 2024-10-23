// pages/CollegeNewsPage.jsx
import React from 'react';
import { Card, CardContent, Badge } from "../custom-components/custom-components";
import { Building2, Calendar, ExternalLink } from 'lucide-react';
import { Button } from "../custom-components/custom-components";

export const CollegeNewsPage = () => {
  const news = [
    {
      college: "Tech University",
      title: "New AI Research Center Opening",
      date: "Oct 24, 2024",
      category: "Research",
      excerpt: "State-of-the-art facility to drive innovation in artificial intelligence...",
      image: ""
    },
    {
      college: "Business School",
      title: "International Business Summit",
      date: "Oct 25, 2024",
      category: "Events",
      excerpt: "Leading industry experts gather to discuss global market trends...",
      image: "/api/placeholder/800/400"
    }
  ];

  return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900">College News</h1>
            <p className="text-gray-600 mt-2">Stay updated with the latest happenings across campus</p>
          </div>
          
          <div className="grid gap-6">
            {news.map((item, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="grid md:grid-cols-2 gap-6">
                  <img 
                    src={item.image} 
                    alt={item.title}
                    className="w-full h-64 object-cover"
                  />
                  <CardContent className="p-6">
                    <Badge className="mb-2">{item.category}</Badge>
                    <h3 className="text-2xl font-semibold mb-2">{item.title}</h3>
                    <p className="text-gray-600 mb-4">{item.excerpt}</p>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        <Building2 className="w-4 h-4" />
                        {item.college}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {item.date}
                      </span>
                    </div>
                    <Button className="mt-4">
                      Read More
                      <ExternalLink className="w-4 h-4 ml-2" />
                    </Button>
                  </CardContent>
                </div>
              </Card>
            ))}
          </div>

          {/* Sign Up Prompt */}
          <div className="mt-8 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Join LearnHub Today!</h2>
            <p className="text-gray-600 mb-6">Sign up now to stay updated with the latest news and connect with other students.</p>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
              Sign Up
            </Button>
          </div>
        </div>
      </div>
  );
};

export default CollegeNewsPage;
