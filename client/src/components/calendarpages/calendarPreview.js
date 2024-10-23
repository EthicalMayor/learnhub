import React, { useState, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Clock, Calendar, Star } from 'lucide-react';
import {
  Card, CardContent, CardHeader, CardTitle,
} from "../custom-components/custom-components";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "../custom-components/custom-components";
import { Button } from "../custom-components/custom-components";
import { Badge } from "../custom-components/custom-components";

const MONTHS = [
    "January", "February", "March", "April", "May", "June", 
    "July", "August", "September", "October", "November", "December"
  ];
  
  const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const CalendarPreview = ({ events = [] }) => {
    const [currentDate, setCurrentDate] = useState(new Date());
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
              isToday ? 'border-blue-500 bg-blue-50/50' : 'border-gray-100 hover:border-gray-200'
            } ${dayEvents.length ? 'cursor-pointer' : ''}`}
            onClick={(e) => dayEvents.length && handleEventClick(dayEvents, e)}
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
    }, [currentDate, events, formatDateString, getDaysInMonth, getFirstDayOfMonth]);
  
    return (
      <div className="p-8 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
        <div className="max-w-6xl mx-auto">
          {/* Header and navigation code */}
          <CardContent>
            <div className="grid grid-cols-7 gap-4">{renderCalendarDays()}</div>
          </CardContent>
        </div>
      </div>
    );
  };
  
  export default CalendarPreview;
