import React, { useState, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Clock, Calendar, Star, Sparkles } from 'lucide-react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../custom-components/custom-components";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "../custom-components/custom-components";
import { Button } from "../custom-components/custom-components";
import { Badge } from "../custom-components/custom-components";
import { Alert, AlertTitle, AlertDescription } from "../custom-components/custom-components";

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const CalendarPreview = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);

  // Demo events to showcase calendar capabilities
  const events = [
    { id: 1, title: 'Team Meeting', date: '2024-10-25', time: '10:00', priority: 'high' },
    { id: 2, title: 'Project Review', date: '2024-10-25', time: '14:00', priority: 'medium' },
    { id: 3, title: 'Client Call', date: '2024-10-30', time: '11:00', priority: 'high' },
  ];

  const navigateMonth = useCallback((direction) => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      newDate.setMonth(prev.getMonth() + direction);
      return newDate;
    });
  }, []);

  const getDaysInMonth = useCallback(() => {
    return new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      0
    ).getDate();
  }, [currentDate]);

  const getFirstDayOfMonth = useCallback(() => {
    return new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      1
    ).getDay();
  }, [currentDate]);

  const formatDateString = useCallback((day) => {
    return `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
  }, [currentDate]);

  const renderCalendarDays = useCallback(() => {
    const cells = [];
    const firstDay = getFirstDayOfMonth();
    const daysInMonth = getDaysInMonth();

    // Empty cells for previous month
    for (let i = 0; i < firstDay; i++) {
      cells.push(
        <div key={`empty-${i}`} className="h-24 bg-gray-50/50 rounded-lg" />
      );
    }

    // Calendar days
    for (let day = 1; day <= daysInMonth; day++) {
      const dateString = formatDateString(day);
      const dayEvents = events.filter(event => event.date === dateString);
      const isToday = dateString === formatDateString(new Date().getDate());

      cells.push(
        <div
          key={dateString}
          className={`h-24 p-2 rounded-lg transition-all border
            ${isToday ? 'border-blue-500 bg-blue-50/50' : 'border-gray-100 hover:border-gray-200'}
            ${dayEvents.length ? 'cursor-pointer' : ''}`}
        >
          <div className="flex justify-between items-start">
            <span className={`text-sm font-medium ${
              isToday ? 'text-blue-600' : 'text-gray-700'
            }`}>
              {day}
            </span>
            {dayEvents.length > 0 && (
              <Badge variant={dayEvents[0].priority === 'high' ? 'destructive' : 'secondary'}>
                {dayEvents.length}
              </Badge>
            )}
          </div>
          <div className="mt-1 space-y-1">
            {dayEvents.map(event => (
              <div
                key={event.id}
                className="text-xs p-1 rounded bg-white shadow-sm border border-gray-100"
              >
                <div className="font-medium truncate">{event.title}</div>
                <div className="text-gray-500 flex items-center">
                  <Clock className="w-3 h-3 mr-1" />
                  {event.time}
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    }

    return cells;
  }, [currentDate, events, formatDateString, getDaysInMonth, getFirstDayOfMonth]);

  return (
    <div className="p-8 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900">Calendar</h1>
            <p className="text-gray-600 mt-2">
              Manage your schedule
            </p>
          </div>
          <div className="flex gap-4">
            <Button
              variant="outline"
              className="flex items-center gap-2"
            >
              <Calendar className="w-4 h-4" />
              Add Event
            </Button>
          </div>
        </div>

        <Card>
          <CardHeader className="pb-4">
            <div className="flex justify-between items-center">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigateMonth(-1)}
              >
                <ChevronLeft className="w-4 h-4 mr-1" />
                {MONTHS[(currentDate.getMonth() - 1 + 12) % 12]}
              </Button>
              <CardTitle className="text-xl">
                {MONTHS[currentDate.getMonth()]} {currentDate.getFullYear()}
              </CardTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigateMonth(1)}
              >
                {MONTHS[(currentDate.getMonth() + 1) % 12]}
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-7 gap-4 mb-4">
              {WEEKDAYS.map(day => (
                <div key={day} className="text-sm font-medium text-gray-600 text-center">
                  {day}
                </div>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-4">
              {renderCalendarDays()}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CalendarPreview;