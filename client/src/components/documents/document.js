import React from 'react';
import { Plus, Search, Filter, MoreVertical, FileText, Share2, Clock, Users, Star, FolderOpen } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent, Alert, AlertTitle, AlertDescription, Button, Input } from '../custom-components/custom-components';
import { Link } from 'react-router-dom';

const DocumentPreview = () => {
  const previewDocuments = [
    { 
      id: 1, 
      title: 'Advanced Physics Notes - Quantum Mechanics',
      type: 'Study Notes',
      lastModified: '2024-10-21',
      shared: true,
      collaborators: 3,
      starred: true,
      folder: 'Physics 401'
    },
    { 
      id: 2, 
      title: 'Research Paper - Machine Learning Applications',
      type: 'Research',
      lastModified: '2024-10-20',
      shared: true,
      collaborators: 5,
      starred: false,
      folder: 'CS Research'
    },
    { 
      id: 3, 
      title: 'Study Group Meeting Minutes - Oct 2024',
      type: 'Meeting Notes',
      lastModified: '2024-10-19',
      shared: true,
      collaborators: 8,
      starred: true,
      folder: 'Study Group'
    }
  ];

  const filters = [
    { label: 'All Documents', count: 124 },
    { label: 'Shared with me', count: 45 },
    { label: 'Starred', count: 12 },
    { label: 'Recent', count: 28 }
  ];

  return (
    <div className="relative min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-6">
        <Alert className="mb-6 bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
          <AlertTitle className="text-blue-800 text-lg font-semibold">Document Features</AlertTitle>
          <AlertDescription className="text-blue-700">
            Experience LearnHub's advanced document management system. Create, collaborate, and organize your academic content efficiently.
          </AlertDescription>
        </Alert>

        <div className="filter blur-[0.4px]">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Documents</h1>
              <p className="text-gray-500 mt-1">Manage your academic content in one place</p>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" className="border-gray-200">
                <FolderOpen className="w-4 h-4 mr-2" />
                New Folder
              </Button>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Plus className="w-4 h-4 mr-2" />
                New Document
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-12 gap-6">
            {/* Left Sidebar */}
            <div className="col-span-3">
              <div className="bg-white rounded-lg shadow-sm p-4">
                <nav className="space-y-2">
                  {filters.map((filter, index) => (
                    <button
                      key={index}
                      className="w-full flex items-center justify-between px-3 py-2 text-gray-600 hover:bg-gray-50 rounded-md"
                    >
                      <span>{filter.label}</span>
                      <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs">
                        {filter.count}
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
                        placeholder="Search documents..."
                        className="pl-10 w-full bg-gray-50"
                      />
                    </div>
                  </div>
                  <Button variant="outline" className="border-gray-200">
                    <Filter className="w-4 h-4 mr-2" />
                    Filter
                  </Button>
                </div>

                <div className="space-y-3">
                  {previewDocuments.map((doc) => (
                    <Card key={doc.id} className="hover:bg-gray-50 transition-colors duration-200">
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-lg font-medium">
                          <div className="flex items-center">
                            <FileText className="w-5 h-5 mr-2 text-blue-600" />
                            <div>
                              <div className="flex items-center gap-2">
                                {doc.title}
                                {doc.starred && <Star className="w-4 h-4 text-yellow-400 fill-current" />}
                              </div>
                              <div className="text-sm text-gray-500 font-normal mt-1">
                                {doc.folder} • {doc.type}
                              </div>
                            </div>
                          </div>
                        </CardTitle>
                        <div className="flex items-center gap-4">
                          <div className="flex items-center text-gray-500">
                            <Users className="w-4 h-4 mr-1" />
                            <span className="text-sm">{doc.collaborators}</span>
                          </div>
                          <div className="flex items-center text-gray-500">
                            <Clock className="w-4 h-4 mr-1" />
                            <span className="text-sm">{doc.lastModified}</span>
                          </div>
                          <Button variant="ghost" size="sm">
                            <MoreVertical className="w-4 h-4" />
                          </Button>
                        </div>
                      </CardHeader>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-4">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-xl">Enjoy LearnHub Document Features</h3>
              <p className="text-blue-100">Collaborate seamlessly with unlimited storage and advanced tools</p>
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

export default DocumentPreview;