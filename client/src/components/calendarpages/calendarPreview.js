import React, { useState, useCallback, useEffect } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Plus,
  Calendar as CalendarIcon,
  MoreHorizontal,
  Filter,
  Search,
  Layout,
  X
} from 'lucide-react';
import {
  Card,
  CardContent,
  CardHeader,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  Button,
  Input,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "../custom-components/custom-components";

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const WEEKDAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const EVENT_TYPES = {
  CLASS: 'class',
  ASSIGNMENT: 'assignment',
  MEETING: 'meeting',
  OTHER: 'other'
};

const ViewOptions = {
  MONTH: 'month',
  WEEK: 'week',
  DAY: 'day'
};

const CalendarPreview = () => {
  // State management
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState(ViewOptions.MONTH);
  const [searchQuery, setSearchQuery] = useState('');
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [isAddEventOpen, setIsAddEventOpen] = useState(false);
  const [newEvent, setNewEvent] = useState({
    title: '',
    date: '',
    type: EVENT_TYPES.OTHER,
    description: ''
  });

  // Filter events based on search and type
  useEffect(() => {
    let filtered = [...events];
    
    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(event => 
        event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.description?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply type filter
    if (selectedFilter !== 'all') {
      filtered = filtered.filter(event => event.type === selectedFilter);
    }

    setFilteredEvents(filtered);
  }, [events, searchQuery, selectedFilter]);

  const addEvent = () => {
    if (newEvent.title && newEvent.date) {
      setEvents(prev => [...prev, { ...newEvent, id: Date.now() }]);
      setNewEvent({
        title: '',
        date: '',
        type: EVENT_TYPES.OTHER,
        description: ''
      });
      setIsAddEventOpen(false);
    }
  };

  const deleteEvent = (eventId) => {
    setEvents(prev => prev.filter(event => event.id !== eventId));
  };

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
      const dayEvents = filteredEvents.filter(event => event.date === dateString);

      cells.push(
        <div 
          key={dateString}
          className={`min-h-[120px] p-2 border border-gray-100 dark:border-gray-700 transition-colors
            ${isToday ? 'bg-blue-50 dark:bg-blue-900/20' : 'hover:bg-gray-50 dark:hover:bg-gray-800/50'}
          `}
          onClick={() => {
            setNewEvent(prev => ({ ...prev, date: dateString }));
            setIsAddEventOpen(true);
          }}
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
            {dayEvents.map((event, idx) => (
              <div 
                key={event.id}
                className="group relative text-xs p-1 rounded bg-gray-100 dark:bg-gray-700 truncate"
                title={event.title}
              >
                <div className="flex justify-between items-center">
                  <span>{event.title}</span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteEvent(event.id);
                    }}
                    className="hidden group-hover:block"
                  >
                    <X className="h-3 w-3 text-gray-500 hover:text-red-500" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    }

    return cells;
  }, [currentDate, filteredEvents]);

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
                  {selectedFilter === 'all' ? 'All Events' : selectedFilter.charAt(0).toUpperCase() + selectedFilter.slice(1)}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => setSelectedFilter('all')}>All Events</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSelectedFilter(EVENT_TYPES.CLASS)}>Classes</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSelectedFilter(EVENT_TYPES.ASSIGNMENT)}>Assignments</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSelectedFilter(EVENT_TYPES.MEETING)}>Meetings</DropdownMenuItem>
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
            <Button onClick={() => setIsAddEventOpen(true)}>
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

        {/* Add Event Dialog */}
        <Dialog open={isAddEventOpen} onOpenChange={setIsAddEventOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Event</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 pt-4">
              <Input
                placeholder="Event Title"
                value={newEvent.title}
                onChange={(e) => setNewEvent(prev => ({ ...prev, title: e.target.value }))}
              />
              <Input
                type="date"
                value={newEvent.date}
                onChange={(e) => setNewEvent(prev => ({ ...prev, date: e.target.value }))}
              />
              <select
                className="w-full rounded-md border border-gray-200 p-2"
                value={newEvent.type}
                onChange={(e) => setNewEvent(prev => ({ ...prev, type: e.target.value }))}
              >
                <option value={EVENT_TYPES.OTHER}>Other</option>
                <option value={EVENT_TYPES.CLASS}>Class</option>
                <option value={EVENT_TYPES.ASSIGNMENT}>Assignment</option>
                <option value={EVENT_TYPES.MEETING}>Meeting</option>
              </select>
              <Input
                placeholder="Description (optional)"
                value={newEvent.description}
                onChange={(e) => setNewEvent(prev => ({ ...prev, description: e.target.value }))}
              />
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsAddEventOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={addEvent}>
                  Add Event
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default CalendarPreview;