import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Clock, PlusCircle } from 'lucide-react';
import { Button, Card, Modal, Tooltip } from '../custom-components/custom-components';
import { Link } from 'react-router-dom';

// Month and Weekday Names
const months = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];
const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const CalendarPreview = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [showModal, setShowModal] = useState(false);
  const [tasks, setTasks] = useState([
    { date: '2024-10-25', title: 'Midterm Exam', time: '10:00 AM' },
    { date: '2024-10-30', title: 'Project Submission', time: '5:00 PM' },
  ]);

  const handlePrevMonth = () => setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() - 1)));
  const handleNextMonth = () => setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() + 1)));

  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();

  const renderCalendarGrid = () => {
    const cells = [];
    // Empty cells for days before the 1st of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
      cells.push(<div key={`empty-${i}`} className="empty-cell" />);
    }
    // Calendar days with optional task previews
    for (let day = 1; day <= daysInMonth; day++) {
      const dateString = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      const task = tasks.find((t) => t.date === dateString);

      cells.push(
        <Tooltip key={`day-${day}`} text={task ? `${task.title} at ${task.time}` : 'No Events'}>
          <div
            className={`calendar-cell ${task ? 'bg-blue-50 border-l-4 border-blue-500' : 'hover:bg-gray-100'} 
            transition-all p-2 rounded`}
          >
            <span className={`day-number ${task ? 'text-blue-600 font-bold' : 'text-gray-900'}`}>
              {day}
            </span>
            {task && (
              <div className="text-sm text-blue-600 mt-1">
                <Clock className="w-4 h-4 inline mr-1" />
                {task.title}
              </div>
            )}
          </div>
        </Tooltip>
      );
    }
    return cells;
  };

  return (
    <div className="p-8 bg-gradient-to-r from-purple-50 via-blue-50 to-indigo-100 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-indigo-800">Calendar Preview</h1>
            <p className="text-gray-600">
              Explore your events and deadlines. Sign up for personalized schedules and reminders!
            </p>
          </div>
          <div className="flex gap-4">
            <Button className="bg-purple-600 hover:bg-purple-700" onClick={() => setShowModal(true)}>
              <PlusCircle className="w-5 h-5 mr-1" /> Add Event
            </Button>
            <Link to="/signup" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500">
              Sign Up for Full Access
            </Link>
          </div>
        </div>

        <div className="bg-white shadow-lg rounded-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <Button variant="ghost" onClick={handlePrevMonth}>
              <ChevronLeft className="w-5 h-5" /> {months[(currentDate.getMonth() - 1 + 12) % 12]}
            </Button>
            <h2 className="text-xl font-semibold">
              {months[currentDate.getMonth()]} {currentDate.getFullYear()}
            </h2>
            <Button variant="ghost" onClick={handleNextMonth}>
              {months[(currentDate.getMonth() + 1) % 12]} <ChevronRight className="w-5 h-5" />
            </Button>
          </div>

          <div className="grid grid-cols-7 gap-2 text-center font-semibold text-gray-600 mb-2">
            {weekdays.map((day) => (
              <div key={day}>{day}</div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-2">
            {renderCalendarGrid()}
          </div>
        </div>

        {showModal && (
          <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
            <h2 className="text-xl font-semibold mb-4">Add Event</h2>
            <input type="text" placeholder="Event Title" className="border p-2 w-full mb-4 rounded" />
            <input type="datetime-local" className="border p-2 w-full mb-4 rounded" />
            <Button onClick={() => {
              // Logic to add a new task
              setShowModal(false);
            }} className="bg-blue-600">
              Save Event
            </Button>
          </Modal>
        )}
      </div>
    </div>
  );
};

export default CalendarPreview;
