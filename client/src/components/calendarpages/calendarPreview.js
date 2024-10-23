import React from 'react';
import { CalendarDays, Calendar, AlertCircle } from 'lucide-react';
import { Card, CardHeader, CardContent, Alert, AlertTitle, AlertDescription } from '../custom-components/custom-components';
import { Link } from 'react-router-dom';

const CalendarPreview = () => {
  const previewEvents = [
    {
      id: 1,
      title: 'Java Exam',
      date: '2024-10-28',
      description: 'Prepare for final Java exam covering topics A to Z.',
    },
    {
      id: 2,
      title: 'Group Project Meeting',
      date: '2024-10-25',
      description: 'Discuss presentation slides for group project.',
    },
    {
      id: 3,
      title: 'Personal Appointment',
      date: '2024-10-24',
      description: 'Meet with mentor for career guidance.',
    },
  ];

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <Alert className="mb-6 bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
          <AlertTitle className="text-green-800 text-lg font-semibold">Calendar Preview</AlertTitle>
          <AlertDescription className="text-green-700">
            Stay organized by tracking events, exams, meetings and deadlines. Sign up to access the full calendar.
          </AlertDescription>
        </Alert>

        <h1 className="text-4xl font-bold text-gray-900 mb-4">Calendar</h1>
        <p className="text-gray-600 mb-8">Manage your time with scheduled events and reminders. See how it works below!</p>

        <div className="grid gap-4">
          {previewEvents.map((event) => (
            <Card key={event.id} className="p-4 hover:bg-gray-50 transition-colors">
              <CardHeader className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <CalendarDays className="text-gray-500" />
                  <h2 className="text-lg font-semibold">{event.title}</h2>
                </div>
                <span className="text-gray-500">{event.date}</span>
              </CardHeader>

              <CardContent className="mt-2">
                <p className="text-gray-600">{event.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to Action Section */}
        <div className="mt-8 text-center">
          <p className="text-lg font-semibold mb-4">Unlock full calendar features by creating an account.</p>
          <div className="flex justify-center gap-4">
            <Link
              to="/login"
              className="px-6 py-2 bg-white text-blue-600 rounded-full font-semibold hover:bg-blue-50 transition-colors"
            >
              Log In
            </Link>
            <Link
              to="/signup"
              className="px-6 py-2 bg-blue-500 text-white rounded-full font-semibold hover:bg-blue-400 transition-colors"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarPreview;
