import React, { useState, useCallback } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Plus,
  Calendar as CalendarIcon,
  MoreHorizontal,
  Filter,
  Search,
  Layout
} from 'lucide-react';
import {
  Card,
  CardContent,
  CardHeader,
} from "../custom-components/custom-components";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../custom-components/custom-components";
import { Button } from "../custom-components/custom-components";
import { Input } from "../custom-components/custom-components";

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const WEEKDAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const ViewOptions = {
  MONTH: 'month',
  WEEK: 'week',
  DAY: 'day'
};

const CalendarPreview = ({ events = [] }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState(ViewOptions.MONTH);
  const [searchQuery, setSearchQuery] = useState('');

  const navigateDate = (direction) => {
    setCurrentDate(prevDate => {
      const newDate = new Date(prevDate);
      if (view === ViewOptions.MONTH) {
        newDate.setMonth(newDate.getMonth() + direction);
      } else if (view === ViewOptions.WEEK) {
        newDate.setDate(newDate.getDate() + direction * 7);
      } else {
        newDate.setDate(newDate.getDate() + direction);
      }
      return newDate;
    });
  };

  const goToToday = () => {
    setCurrentDate(new Date());
  };

  const renderCalendarDays = useCallback(() => {
    const cells = [];
    const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const startingDayOfWeek = firstDayOfMonth.getDay();
    const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
    const today = new Date();
    
    // Adjust for Monday start
    const adjustedStartDay = startingDayOfWeek === 0 ? 6 : startingDayOfWeek - 1;

    // Previous month's days
    for (let i = 0; i < adjustedStartDay; i++) {
      const prevMonthDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0 - (adjustedStartDay - i - 1));
      cells.push(
        <div key={`prev-${i}`} className="min-h-[120px] p-2 bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700">
          <span className="text-gray-400 text-sm">{prevMonthDate.getDate()}</span>
        </div>
      );
    }

    // Current month's days
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
      const isToday = date.toDateString() === today.toDateString();
      const dateString = date.toISOString().split('T')[0];
      const dayEvents = events.filter(event => event.date === dateString);

      cells.push(
        <div 
          key={dateString}
          className={`min-h-[120px] p-2 border border-gray-100 dark:border-gray-700 transition-colors
            ${isToday ? 'bg-blue-50 dark:bg-blue-900/20' : 'hover:bg-gray-50 dark:hover:bg-gray-800/50'}
          `}
        >
          <div className="flex justify-between items-start">
            <span className={`
              inline-flex items-center justify-center w-6 h-6 rounded-full
              ${isToday ? 'bg-blue-600 text-white' : 'text-gray-700 dark:text-gray-200'}
              text-sm font-medium
            `}>
              {day}
            </span>
            {dayEvents.length > 0 && (
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                {dayEvents.length}
              </span>
            )}
          </div>
          <div className="mt-2 space-y-1">
            {dayEvents.slice(0, 2).map((event, idx) => (
              <div 
                key={idx}
                className="text-xs p-1 rounded bg-gray-100 dark:bg-gray-700 truncate"
                title={event.title}
              >
                {event.title}
              </div>
            ))}
            {dayEvents.length > 2 && (
              <div className="text-xs text-gray-500 dark:text-gray-400">
                +{dayEvents.length - 2} more
              </div>
            )}
          </div>
        </div>
      );
    }

    return cells;
  }, [currentDate, events]);

  return (
    <div className="p-6 bg-white dark:bg-gray-900 min-h-screen">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button 
              variant="outline" 
              className="font-medium"
              onClick={goToToday}
            >
              Today
            </Button>
            <div className="flex items-center space-x-2">
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => navigateDate(-1)}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => navigateDate(1)}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
            <h2 className="text-xl font-semibold">
              {MONTHS[currentDate.getMonth()]} {currentDate.getFullYear()}
            </h2>
          </div>

          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                className="pl-9 w-64"
                placeholder="Search events..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>All Events</DropdownMenuItem>
                <DropdownMenuItem>Classes</DropdownMenuItem>
                <DropdownMenuItem>Assignments</DropdownMenuItem>
                <DropdownMenuItem>Meetings</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  <Layout className="h-4 w-4 mr-2" />
                  View
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => setView(ViewOptions.MONTH)}>Month</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setView(ViewOptions.WEEK)}>Week</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setView(ViewOptions.DAY)}>Day</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Event
            </Button>
          </div>
        </div>

        {/* Calendar Grid */}
        <Card>
          <CardHeader className="pb-0">
            <div className="grid grid-cols-7 border-b dark:border-gray-700">
              {WEEKDAYS.map((day) => (
                <div 
                  key={day} 
                  className="p-4 text-sm font-medium text-gray-500 dark:text-gray-400 text-center"
                >
                  {day}
                </div>
              ))}
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="grid grid-cols-7">
              {renderCalendarDays()}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CalendarPreview;