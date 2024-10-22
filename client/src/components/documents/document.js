import React from 'react';
import { Plus, Search, Filter, MoreVertical, FileText, Share2, Edit, Trash2 } from 'lucide-react';
import {
    Card,
    CardHeader,
    CardTitle,
    CardContent,
    Alert,
    AlertTitle,
    AlertDescription
  } from '../../custom-components/custom-components.js'; 

const Document = () => {
    // Preview documents

const previewDocuments = [
    { id: 1, title: 'Course Notes - Physics 201', lastModifed: '2024-10-21', shared: true },
    { id: 2, title: 'Draft on Research Paper', lastModifed: '2024-10-12', shared: false },
    { id: 3, title: 'Study Group Notes', lastModifed: '2024-10-19', shared: true },
];

return (
    <div className="relative p-6 max-w-7x1 mx-auto">
        {/* Preview Banner */}
        <Alert className="mb-6 bg-blue-50 border-blue-200">
            <AlertTitle className="text-blue-800">Preview Mode</AlertTitle>
            <AlertDescription className="text-blue-700">
                You are viewing a demo of LearnHub's document features. Sign Up to create and collaborate on your own documents.
            </AlertDescription>
        </Alert>

        <div className="filter blur-[0.5px]"> {/* Slight blur to indicate preview */}
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Documents</h1>
                <Button className="bg-blue-600 hover:bg-blue-700">
                    <Plus className="w-4 h-4 mr-2" />
                    New Document
                </Button>
            </div>


            <div className="flex gap-4 mb-6">
                <div className="flex-1">
                    <Input 
                        placeholder="Search documents..."
                        className="w-full"
                        disabled
                    />
                </div>
                <Button variant="outline" disabled>
                    <Filter className="w-4 h-4 mr-2" />
                    Filter
                </Button>
            </div>


            <div className="grid gap-4">
                {previewDocuments.map((doc) => (
                    <Card key={doc.id} className="hover:bg-gray-50 cursor-not-allowed">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-lg font-medium">
                                <div className="flex items-center">
                                    <FileText className="w-5 h-5 mr-2 text-blue-600" />
                                    {doc.title}
                                </div>
                            </CardTitle>
                            <div className="flex items-center gap-2">
                                {doc.shared && (
                                    <Share2 className="w-4 h-4 text-gray-500" />
                                )}
                                <Button variant="ghost" size="sm" disabled>
                                    <MoreVertical className="w-4 h-4" />
                                </Button>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-gray-500">
                                Last Modified: {doc.lastModified}
                            </p>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>

        {/* Sign Up Call to Action */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg p-4">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                <div>
                    <h3 className="font-semibold text-lg">Ready to Create and share documents with peers?</h3>
                    <p className="text-gray-600">Join LearnHub to access all document features</p>
                </div>
                <div className="flex gap-4">
                    <Link   to="/login"  variant="outline" onClick={() => window.location.href='/login'}>
                        Log In
                    </Link>
                    <Link   to="/signup"   className="bg-blue-600 hover:bg-blue-700" onClick={() => window.location.href = '/signup'}>
                        Sign Up Now
                    </Link>
                </div>
            </div>
        </div>
        

        {/* Overlay to prevent interactions */}
        <div className="absolute inset-0 bg-transparent" onClick={() => window.location.href = '/signup'} />
    </div>
);
};

export default Document;