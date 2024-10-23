import React, { useState, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Clock, Calendar, Star } from 'lucide-react';
import {
  Card, CardContent, CardHeader, CardTitle,
} from "../custom-components/custom-components";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "../custom-components/custom-components";
import { Button } from "../custom-components/custom-components";
import { Badge } from "../custom-components/custom-components";

const CalendarPreview = ({ events }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const handleEventClick = (events) => {
    const requiresSignUp = events.some((event) => event.requiresSignUp);
    if (requiresSignUp) {
      setIsSignUpModalOpen(true);
    } else {
      setSelectedEvent({
        events,
        position: { x: window.event.clientX, y: window.event.clientY },
      });
    }
  };

  const getFirstDayOfMonth = () =>
    new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();

  const getDaysInMonth = () =>
    new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();

  const formatDateString = (day) => {
    const month = currentDate.getMonth() + 1;
    return `${currentDate.getFullYear()}-${month < 10 ? '0' + month : month}-${
      day < 10 ? '0' + day : day
    }`;
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
    const firstDay = getFirstDayOfMonth();
    const daysInMonth = getDaysInMonth();

    for (let i = 0; i < firstDay; i++) {
      cells.push(<div key={`empty-${i}`} className="h-24 bg-gray-50/50 rounded-lg" />);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const dateString = formatDateString(day);
      const dayEvents = events.filter((event) => event.date === dateString);
      const isToday = dateString === formatDateString(new Date().getDate());

      cells.push(
        <div
          key={dateString}
          className={`h-24 p-2 rounded-lg transition-all border relative ${
            isToday
              ? 'border-blue-500 bg-blue-50/50'
              : 'border-gray-100 hover:border-gray-200'
          } ${dayEvents.length ? 'cursor-pointer' : ''}`}
          onClick={() => dayEvents.length && handleEventClick(dayEvents)}
        >
          <div className="flex justify-between items-start">
            <span className={`text-sm font-medium ${isToday ? 'text-blue-600' : 'text-gray-700'}`}>
              {day}
            </span>
            {dayEvents.length > 0 && (
              <Badge variant={dayEvents[0].priority === 'high' ? 'destructive' : 'secondary'}>
                {dayEvents.length}
              </Badge>
            )}
          </div>
          <div className="mt-1 space-y-1">
            {dayEvents.slice(0, 2).map((event) => (
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
            {dayEvents.length > 2 && (
              <div className="text-xs text-gray-500 pl-1">+{dayEvents.length - 2} more</div>
            )}
          </div>
        </div>
      );
    }
    return cells;
  }, [currentDate, events, formatDateString, getDaysInMonth, getFirstDayOfMonth, handleEventClick]);

  return (
    <div className="p-8 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900">LearnHub Calendar</h1>
            <p className="text-gray-600 mt-2">Experience our powerful calendar features</p>
          </div>
          <div className="flex gap-4">
            <Button variant="outline" onClick={() => setIsSignUpModalOpen(true)}>
              <Calendar className="w-4 h-4" /> Log In
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700" onClick={() => setIsSignUpModalOpen(true)}>
              <Star className="w-4 h-4" /> Sign Up now
            </Button>
          </div>
        </div>

        <Card>
          <CardHeader className="pb-4">
            <div className="flex justify-between items-center">
              <Button variant="ghost" size="sm" onClick={() => navigateMonth(-1)}>
                <ChevronLeft className="w-4 h-4 mr-1" />
                {MONTHS[(currentDate.getMonth() - 1 + 12) % 12]}
              </Button>
              <CardTitle className="text-xl">
                {MONTHS[currentDate.getMonth()]} {currentDate.getFullYear()}
              </CardTitle>
              <Button variant="ghost" size="sm" onClick={() => navigateMonth(1)}>
                {MONTHS[(currentDate.getMonth() + 1) % 12]}
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
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
