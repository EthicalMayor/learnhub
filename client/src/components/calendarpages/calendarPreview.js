import React, { useState, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Clock, Calendar, Star } from 'lucide-react';
import {
  Card, CardContent, CardHeader, CardTitle,
} from "../custom-components/custom-components";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "../custom-components/custom-components";
import { Button, Input } from "../custom-components/custom-components";
import { Badge } from "../custom-components/custom-components";

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const CalendarPreview = ({ events = [] }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const handleEventClick = (events, event) => {
    const requiresSignUp = events.some((e) => e.requiresSignUp);
    if (requiresSignUp) {
      setIsSignUpModalOpen(true);
    } else {
      setSelectedEvent({
        events,
        position: { x: event.clientX, y: event.clientY },
      });
    }
  };

  const addTask = () => {
    if (newTask.trim()) {
      setTasks([...tasks, { id: tasks.length + 1, title: newTask, completed: false }]);
      setNewTask("");
    }
  };

  const toggleTaskCompletion = (id) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const navigateMonth = (direction) => {
    setCurrentDate((prevDate) => {
      const newDate = new Date(prevDate);
      newDate.setMonth(newDate.getMonth() + direction);
      return newDate;
    });
  };

  const renderCalendarDays = useCallback(() => {
    const cells = [];
    const firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();
    const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();

    for (let i = 0; i < firstDay; i++) {
      cells.push(<div key={`empty-${i}`} className="h-24 bg-gray-100 rounded-lg" />);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const dateString = `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${day}`;
      const dayEvents = events.filter((event) => event.date === dateString);
      const isToday = new Date().toDateString() === new Date(dateString).toDateString();

      cells.push(
        <div
          key={dateString}
          className={`h-24 p-2 rounded-lg border ${
            isToday ? 'border-black bg-gray-200' : 'border-gray-300'
          } cursor-pointer`}
          onClick={(e) => dayEvents.length && handleEventClick(dayEvents, e)}
        >
          <div className="flex justify-between">
            <span className={`font-bold ${isToday ? 'text-black' : 'text-gray-600'}`}>{day}</span>
            {dayEvents.length > 0 && (
              <Badge variant={dayEvents[0].priority === 'high' ? 'destructive' : 'secondary'}>
                {dayEvents.length}
              </Badge>
            )}
          </div>
        </div>
      );
    }
    return cells;
  }, [currentDate, events]);

  return (
    <div className="p-8 bg-black min-h-screen text-white">
      <div className="max-w-6xl mx-auto flex gap-8">
        {/* Calendar Section */}
        <div className="w-2/3">
          <Card>
            <CardHeader className="flex justify-between items-center">
              <Button variant="ghost" onClick={() => navigateMonth(-1)}>
                <ChevronLeft />
              </Button>
              <CardTitle>{`${MONTHS[currentDate.getMonth()]} ${currentDate.getFullYear()}`}</CardTitle>
              <Button variant="ghost" onClick={() => navigateMonth(1)}>
                <ChevronRight />
              </Button>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-7 text-center font-semibold">
                {WEEKDAYS.map((day) => (
                  <div key={day} className="p-2">
                    {day}
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-7 gap-2">{renderCalendarDays()}</div>
            </CardContent>
          </Card>
        </div>

        {/* Task Section */}
        <div className="w-1/3">
          <Card>
            <CardHeader>
              <CardTitle>Tasks</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Input
                  value={newTask}
                  onChange={(e) => setNewTask(e.target.value)}
                  placeholder="Add a new task..."
                />
                <Button onClick={addTask} className="w-full">
                  Add Task
                </Button>
                <ul className="space-y-2">
                  {tasks.map((task) => (
                    <li
                      key={task.id}
                      className={`flex items-center justify-between p-2 border rounded-lg ${
                        task.completed ? 'line-through text-gray-400' : 'text-white'
                      }`}
                      onClick={() => toggleTaskCompletion(task.id)}
                    >
                      {task.title}
                      <Star className={`w-5 h-5 ${task.completed ? 'text-yellow-500' : 'text-gray-500'}`} />
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Event Modal */}
      {isSignUpModalOpen && (
        <Dialog open={isSignUpModalOpen} onOpenChange={setIsSignUpModalOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Event Sign-Up</DialogTitle>
              <DialogDescription>
                This event requires a sign-up. Please register to participate.
              </DialogDescription>
            </DialogHeader>
            <Button onClick={() => setIsSignUpModalOpen(false)}>Close</Button>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default CalendarPreview;
