import React, { useState } from 'react';
import { Input } from "../custom-components/custom-components";
import { Button } from "../custom-components/custom-components";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "../custom-components/custom-components";

const JoinTheGeng = () => {
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle sign-up logic (e.g., API call)
    console.log('Form Submitted:', formData);
    setIsSignUpModalOpen(false); // Close modal on submit
  };

  return (
    <div className="p-8 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 text-center mb-6">Join The Geng</h1>
        <p className="text-center text-gray-600 mb-4">
          Sign up to become a part of our community of passionate learners and innovators.
        </p>
        
        <Button
          onClick={() => setIsSignUpModalOpen(true)}
          className="mx-auto block bg-blue-600 hover:bg-blue-700 text-white"
        >
          Join Now
        </Button>

        <Dialog open={isSignUpModalOpen} onOpenChange={setIsSignUpModalOpen}>
          <DialogContent className="sm:max-w-[600px] transition-all duration-300 ease-in-out">
            <DialogHeader>
              <DialogTitle className="text-2xl">Sign Up for The Geng</DialogTitle>
              <DialogDescription className="text-gray-600">
                Fill in your details to join our community!
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                name="name"
                type="text"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
              <Input
                name="email"
                type="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
              <Input
                name="password"
                type="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleInputChange}
                required
              />
              <div className="flex gap-4">
                <Button type="submit" className="flex-1 bg-blue-600 hover:bg-blue-700">
                  Sign Up
                </Button>
                <Button variant="outline" className="flex-1" onClick={() => setIsSignUpModalOpen(false)}>
                  Cancel
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default JoinTheGeng;
