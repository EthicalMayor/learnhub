import React, { useState, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Clock, Calendar, Star, Sparkles, Lock } from 'lucide-react';
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
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../custom-components/custom-components";
import { Button } from "../custom-components/custom-components";
import { Badge } from "../custom-components/custom-components";

// [...Previous constants remain the same...]

const CalendarPreview = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  // Refined event handling
  const handleEventClick = (events) => {
    // Instead of immediately showing the signup modal,
    // show a preview of the event first
    setSelectedEvent({
      events,
      position: { x: window.event.clientX, y: window.event.clientY }
    });
    
    // Auto-dismiss the preview after 5 seconds if no action is taken
    setTimeout(() => {
      setSelectedEvent(null);
    }, 5000);
  };

  // Event preview overlay
  const EventPreview = () => {
    if (!selectedEvent) return null;

    return (
      <div 
        className="fixed z-50 transform transition-all duration-200 ease-in-out"
        style={{
          top: `${selectedEvent.position.y}px`,
          left: `${selectedEvent.position.x}px`,
          transform: 'translate(-50%, -100%)'
        }}
      >
        <Card className="w-64 shadow-lg">
          <CardContent className="p-4">
            <div className="space-y-2">
              {selectedEvent.events.slice(0, 2).map((event, idx) => (
                <div key={idx} className="text-sm">
                  <div className="font-medium">{event.title}</div>
                  <div className="text-gray-500 flex items-center">
                    <Clock className="w-3 h-3 mr-1" />
                    {event.time}
                  </div>
                </div>
              ))}
              {selectedEvent.events.length > 2 && (
                <div className="text-xs text-gray-500">
                  +{selectedEvent.events.length - 2} more events
                </div>
              )}
              <Button 
                size="sm" 
                className="w-full mt-2"
                onClick={() => {
                  setSelectedEvent(null);
                  setIsSignUpModalOpen(true);
                }}
              >
                View Full Details
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  };

  // Refined sign-up modal with smooth transitions
  const SignUpModal = () => (
    <Dialog 
      open={isSignUpModalOpen} 
      onOpenChange={setIsSignUpModalOpen}
    >
      <DialogContent className="sm:max-w-[600px] transition-all duration-300 ease-in-out">
        <DialogHeader>
          <DialogTitle className="text-2xl">Get Full Calendar Access</DialogTitle>
          <DialogDescription className="text-gray-600">
            Sign up now to unlock all features and start managing your schedule effectively.
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-6 py-4">
          <div className="grid grid-cols-2 gap-4">
            {PREVIEW_FEATURES.map((feature, index) => (
              <div 
                key={index} 
                className="p-4 rounded-lg border bg-gray-50 hover:bg-gray-100 transition-colors duration-200"
              >
                <feature.icon className="w-6 h-6 text-blue-500 mb-2" />
                <h3 className="font-medium mb-1">{feature.title}</h3>
                <p className="text-sm text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
          
          <div className="flex gap-4 mt-4">
            <Button
              className="flex-1 bg-blue-600 hover:bg-blue-700"
              onClick={() => setIsSignUpModalOpen(false)}
            >
              Sign Up Now
            </Button>
            <Button
              variant="outline"
              className="flex-1"
              onClick={() => setIsSignUpModalOpen(false)}
            >
              Maybe Later
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );

  // Modified calendar day rendering
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
          className={`h-24 p-2 rounded-lg transition-all border relative
            ${isToday ? 'border-blue-500 bg-blue-50/50' : 'border-gray-100 hover:border-gray-200'}
            ${dayEvents.length ? 'cursor-pointer' : ''}`}
          onClick={() => dayEvents.length && handleEventClick(dayEvents)}
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
            {dayEvents.slice(0, 2).map(event => (
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
              <div className="text-xs text-gray-500 pl-1">
                +{dayEvents.length - 2} more
              </div>
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
            <p className="text-gray-600 mt-2">
              Experience our powerful calendar features
            </p>
          </div>
          <div className="flex gap-4">
            <Button
              variant="outline"
              onClick={() => setIsSignUpModalOpen(true)}
              className="flex items-center gap-2"
            >
              <Calendar className="w-4 h-4" />
              Log In 
            </Button>
            <Button
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700"
              onClick={() => setIsSignUpModalOpen(true)}
            >
              <Star className="w-4 h-4" />
              Sign Up now
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
        <EventPreview />
        <SignUpModal />
      </div>
    </div>
  );
};

export default CalendarPreview;