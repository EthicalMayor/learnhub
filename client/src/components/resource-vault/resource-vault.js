import React from 'react';
import { Book, BookOpen, Video, FileText, Download, Search, Grid, List, Clock, Star } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent, Alert, AlertTitle, AlertDescription, Button, Input } from '@/components/ui/alert';
import { Link } from 'react-router-dom';

const ResourceVaultPreview = () => {
  const previewResources = [
    {
      id: 1,
      title: 'Complete Calculus Course Materials',
      type: 'Course Bundle',
      format: 'PDF + Video',
      downloads: 1234,
      rating: 4.8,
      subject: 'Mathematics',
      lastUpdated: '2024-10-20'
    },
    {
      id: 2,
      title: 'Programming Fundamentals - Java',
      type: 'Video Series',
      format: 'Video',
      downloads: 892,
      rating: 4.9,
      subject: 'Computer Science',
      lastUpdated: '2024-10-19'
    },
    {
      id: 3,
      title: 'Research Methodology Guide',
      type: 'Study Guide',
      format: 'PDF',
      downloads: 567,
      rating: 4.7,
      subject: 'Research',
      lastUpdated: '2024-10-18'
    }
  ];

  const categories = [
    { name: 'Mathematics', count: 245 },
    { name: 'Computer Science', count: 189 },
    { name: 'Physics', count: 156 },
    { name: 'Chemistry', count: 134 },
    { name: 'Biology', count: 123 }
  ];

  return (
    <div className="relative min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-6">
        <Alert className="mb-6 bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200">
          <AlertTitle className="text-purple-800 text-lg font-semibold">Resource Vault Preview</AlertTitle>
          <AlertDescription className="text-purple-700">
            Access thousands of peer-reviewed academic resources, study materials, and course content.
          </AlertDescription>
        </Alert>

        <div className="filter blur-[0.4px]">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Resource Vault</h1>
              <p className="text-gray-500 mt-1">Premium academic resources curated by experts</p>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" className="border-gray-200">
                <Grid className="w-4 h-4 mr-2" />
                View
              </Button>
              <Button className="bg-purple-600 hover:bg-purple-700">
                <Download className="w-4 h-4 mr-2" />
                Download History
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-12 gap-6">
            {/* Left Sidebar */}
            <div className="col-span-3">
              <div className="bg-white rounded-lg shadow-sm p-4">
                <h3 className="font-semibold mb-4">Categories</h3>
                <nav className="space-y-2">
                  {categories.map((category, index) => (
                    <button
                      key={index}
                      className="w-full flex items-center justify-between px-3 py-2 text-gray-600 hover:bg-gray-50 rounded-md"
                    >
                      <span>{category.name}</span>
                      <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs">
                        {category.count}
                      </span>
                    </button>
                  ))}
                </nav>
              </div>
            </div>

            {/* Main Content */}
            <div className="col-span-9">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex gap-4 mb-6">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input 
                        placeholder="Search resources..."
                        className="pl-10 w-full bg-gray-50"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  {previewResources.map((resource) => (
                    <Card key={resource.id} className="hover:bg-gray-50 transition-colors duration-200">
                      <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
                        <CardTitle className="text-lg font-medium">
                          <div className="flex items-start gap-4">
                            <div className="bg-purple-100 p-3 rounded-lg">
                              {resource.format.includes('Video') ? (
                                <Video className="w-6 h-6 text-purple-600" />
                              ) : (
                                <BookOpen className="w-6 h-6 text-purple-600" />
                              )}
                            </div>
                            <div>
                              <div className="flex items-center gap-2">
                                {resource.title}
                                <div className="flex items-center">
                                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                                  <span className="text-sm text-gray-600 ml-1">{resource.rating}</span>
                                </div>
                              </div>
                              <div className="text-sm text-gray-500 mt-1">
                                {resource.subject} • {resource.type} • {resource.downloads.toLocaleString()} downloads
                              </div>
                            </div>
                          </div>
                        </CardTitle>
                        <Button className="bg-purple-600 hover:bg-purple-700">
                          Download
                        </Button>
                      </CardHeader>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Premium Features CTA */}
        <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-r from-purple-600 to-blue-600 text-white p-4">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-xl">Access Academic Resources Seamlessly</h3>
              <p className="text-purple-100">Join thousands of students accessing quality study materials</p>
            </div>
            <div className="flex gap-4">
              <Link to="/login" className="px-6 py-2 bg-white text-blue-600 rounded-full font-semibold hover:bg-blue-50 transition-colors">
                Log In
              </Link>
              <Link to="/signup" className="px-6 py-2 bg-blue-500 text-white rounded-full font-semibold hover:bg-blue-400 transition-colors">
                Sign Up
              </Link>
            </div>
          </div>
          </div>
      </div>
    </div>
  );
};

export default ResourceVaultPreview;