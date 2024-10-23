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
import { Alert, AlertTitle, AlertDescription } from "../custom-components/custom-components";

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const PREVIEW_FEATURES = [
  { icon: Calendar, title: "Advanced Calendar Views", description: "Daily, weekly, and monthly views with custom layouts" },
  { icon: Star, title: "Smart Scheduling", description: "AI-powered scheduling suggestions and conflict resolution" },
  { icon: Clock, title: "Time Zone Management", description: "Seamless scheduling across multiple time zones" },
  { icon: Sparkles, title: "Custom Categories", description: "Organize events with custom colors and categories" }
];

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
        <TooltipProvider key={dateString}>
          <Tooltip>
            <TooltipTrigger asChild>
              <div
                className={`h-24 p-2 rounded-lg transition-all border relative
                  ${isToday ? 'border-blue-500 bg-blue-50/50' : 'border-gray-100 hover:border-gray-200'}
                  ${dayEvents.length ? 'cursor-pointer' : ''}`}
                onClick={() => dayEvents.length && setIsSignUpModalOpen(true)}
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
                {dayEvents.length > 0 && (
                  <div className="absolute inset-0 bg-white/0 hover:bg-white/80 transition-all flex items-center justify-center opacity-0 hover:opacity-100">
                    <Button size="sm" variant="secondary" className="flex items-center gap-2">
                      <Lock className="w-4 h-4" />
                      View Details
                    </Button>
                  </div>
                )}
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p className="text-sm">Sign up to view full event details</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      );
    }

    return cells;
  }, [currentDate, events, formatDateString, getDaysInMonth, getFirstDayOfMonth]);

  const SignUpModal = () => (
    <Dialog open={isSignUpModalOpen} onOpenChange={setIsSignUpModalOpen}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="text-2xl">Get Full Calendar Access</DialogTitle>
          <DialogDescription>
            Sign up now to unlock all features and start managing your schedule effectively.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-6 py-4">
          <div className="grid grid-cols-2 gap-4">
            {PREVIEW_FEATURES.map((feature, index) => (
              <div key={index} className="p-4 rounded-lg border bg-gray-50">
                <feature.icon className="w-6 h-6 text-blue-500 mb-2" />
                <h3 className="font-medium mb-1">{feature.title}</h3>
                <p className="text-sm text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
          <Alert>
            <AlertTitle className="flex items-center gap-2">
              <Star className="w-4 h-4" />
              Limited Time Offer
            </AlertTitle>
            <AlertDescription>
              Sign up today
            </AlertDescription>
          </Alert>
          <div className="space-y-4">
            <Button
              className="w-full bg-blue-600 hover:bg-blue-700"
              onClick={() => window.location.href = '/signup'}
            >
              Sign Up
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );

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

        <SignUpModal />
      </div>
    </div>
  );
};

export default CalendarPreview;