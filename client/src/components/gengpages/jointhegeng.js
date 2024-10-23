import React from 'react';
import Navigation from "@/components/Navigation";
import { Form, Button } from "@/components/ui/button";

export const JoinGengPage = () => {
  return (
    <>
      <Navigation currentPage="join" />
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900">Join The Geng</h1>
            <p className="text-gray-600 mt-2">Become a part of our vibrant community!</p>
          </div>

          <Form className="bg-white p-6 rounded shadow-md mb-8">
            <div className="mb-4">
              <label className="block mb-1">Name</label>
              <input type="text" className="w-full p-2 border border-gray-300 rounded" required />
            </div>
            <div className="mb-4">
              <label className="block mb-1">Email</label>
              <input type="email" className="w-full p-2 border border-gray-300 rounded" required />
            </div>
            <div className="mb-4">
              <label className="block mb-1">Interests</label>
              <input type="text" className="w-full p-2 border border-gray-300 rounded" placeholder="e.g. Coding, Design" required />
            </div>
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700">Join Now</Button>
          </Form>

          {/* Sign Up Prompt */}
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Ready to dive in?</h2>
            <p className="text-gray-600 mb-6">Join us and collaborate with like-minded peers.</p>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
              Sign Up
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default JoinGengPage;
