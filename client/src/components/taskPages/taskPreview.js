import React from 'react';
import { 
  PlusCircle, CheckCircle, Calendar, Tag 
} from 'lucide-react';
import { Button, Card, CardHeader, CardContent, Alert, AlertTitle, AlertDescription } from '../custom-components/custom-components';
import { Link } from 'react-router-dom';

const TaskPreview = () => {
  const previewTasks = [
    {
      id: 1,
      text: 'Complete Math Assignment',
      dueDate: '2024-10-25',
      category: 'School',
      priority: 'High',
      completed: false,
    },
    {
      id: 2,
      text: 'Prepare for Java Exam',
      dueDate: '2024-10-28',
      category: 'Computer Science',
      priority: 'Normal',
      completed: false,
    },
    {
      id: 3,
      text: 'Buy Groceries',
      dueDate: '2024-10-24',
      category: 'Personal',
      priority: 'Low',
      completed: false,
    },
  ];

  return (
    <div className="p-8 bg-gray-0 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <Alert className="mb-6 bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200">
          <AlertTitle className="text-purple-800 text-lg font-semibold">Task Manager Preview</AlertTitle>
          <AlertDescription className="text-purple-700">
            Manage your tasks effortlessly with priority settings and due dates. Sign up to unlock full features.
          </AlertDescription>
        </Alert>

        <h1 className="text-4xl font-bold text-gray-900 mb-4">Task Manager</h1>
        <p className="text-gray-600 mb-8">Plan, organize, and manage your tasks efficiently. Try it out!</p>

        <div className="grid gap-4">
          {previewTasks.map((task) => (
            <Card key={task.id} className="p-4 hover:bg-gray-50 transition-colors">
              <CardHeader className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <Tag className="text-gray-500" />
                  <h2 className={`text-lg ${task.completed ? 'line-through text-gray-500' : ''}`}>
                    {task.text}
                  </h2>
                </div>
                <span
                  className={`px-2 py-1 rounded ${
                    task.priority === 'High'
                      ? 'bg-red-200'
                      : task.priority === 'Low'
                      ? 'bg-green-200'
                      : 'bg-yellow-200'
                  }`}
                >
                  {task.priority}
                </span>
              </CardHeader>

              <CardContent className="mt-2">
                <div className="flex items-center gap-2 text-gray-600">
                  <Calendar className="w-5 h-5" />
                  <span>{task.dueDate || 'No Due Date'}</span>
                </div>
                <div className="flex items-center gap-2 mt-1 text-gray-600">
                  <Tag className="w-5 h-5" />
                  <span>{task.category || 'Uncategorized'}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to Action Section */}
        <div className="mt-8 text-center">
          <p className="text-lg font-semibold mb-4">Unlock full task management features by creating an account.</p>
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

export default TaskPreview;
