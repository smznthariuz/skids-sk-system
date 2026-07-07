import React, { useState, useEffect } from 'react';
import { 
  IoCalendarOutline, 
  IoLocationOutline, 
  IoTimeOutline,
  IoChevronBackOutline,
  IoChevronForwardOutline,
  IoAddOutline,
  IoEllipsisVerticalOutline,
  IoTodayOutline
} from 'react-icons/io5';
import Card from '../../components/common/Card';
import { getEvents } from '../../utils/mockData';

const EventsCalendar = () => {
  const [events, setEvents] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedDate, setSelectedDate] = useState(new Date().getDate());
  const [viewMode, setViewMode] = useState('month');

  useEffect(() => {
    setEvents(getEvents());
  }, []);

  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const prevMonth = () => {
    if (selectedMonth === 0) {
      setSelectedMonth(11);
      setSelectedYear(selectedYear - 1);
    } else {
      setSelectedMonth(selectedMonth - 1);
    }
  };

  const nextMonth = () => {
    if (selectedMonth === 11) {
      setSelectedMonth(0);
      setSelectedYear(selectedYear + 1);
    } else {
      setSelectedMonth(selectedMonth + 1);
    }
  };

  const goToToday = () => {
    const today = new Date();
    setSelectedMonth(today.getMonth());
    setSelectedYear(today.getFullYear());
    setSelectedDate(today.getDate());
  };

  const getDaysInMonth = (month, year) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (month, year) => {
    return new Date(year, month, 1).getDay();
  };

  const daysInMonth = getDaysInMonth(selectedMonth, selectedYear);
  const firstDay = getFirstDayOfMonth(selectedMonth, selectedYear);
  
  const calendarDays = [];
  for (let i = 0; i < firstDay; i++) {
    calendarDays.push(null);
  }
  for (let i = 1; i <= daysInMonth; i++) {
    calendarDays.push(i);
  }

  const hasEvent = (day) => {
    return events.some(event => {
      const eventDate = new Date(event.date);
      return eventDate.getDate() === day && 
             eventDate.getMonth() === selectedMonth && 
             eventDate.getFullYear() === selectedYear;
    });
  };

  const getEventsForDay = (day) => {
    return events.filter(event => {
      const eventDate = new Date(event.date);
      return eventDate.getDate() === day && 
             eventDate.getMonth() === selectedMonth && 
             eventDate.getFullYear() === selectedYear;
    });
  };

  const selectedEvents = getEventsForDay(selectedDate);

  return (
    <div>
      {/* Breadcrumb */}
      <div className="mb-6">
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <span className="text-gray-400">Dashboard</span>
          <span className="text-gray-300">/</span>
          <span className="text-gray-700 font-medium">Calendar</span>
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mt-1">Event Calendar</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar Section */}
        <Card className="lg:col-span-2 p-6">
          {/* Calendar Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <button 
                onClick={prevMonth}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <IoChevronBackOutline className="w-5 h-5 text-gray-600" />
              </button>
              <h2 className="text-xl font-semibold text-gray-800">
                {months[selectedMonth]} {selectedYear}
              </h2>
              <button 
                onClick={nextMonth}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <IoChevronForwardOutline className="w-5 h-5 text-gray-600" />
              </button>
            </div>
            <div className="flex items-center gap-2">
              <button 
                onClick={goToToday}
                className="px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors flex items-center gap-2"
              >
                <IoTodayOutline className="w-4 h-4" />
                Today
              </button>
              <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
                <IoEllipsisVerticalOutline className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>

          {/* View Mode Tabs */}
          <div className="flex gap-1 mb-6 bg-gray-100 rounded-lg p-1 w-fit">
            {['Month', 'Week', 'Day'].map((mode) => (
              <button
                key={mode}
                onClick={() => setViewMode(mode.toLowerCase())}
                className={`px-4 py-1.5 text-sm font-medium rounded-lg transition-colors ${
                  viewMode === mode.toLowerCase()
                    ? 'bg-white text-gray-800 shadow-sm'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                {mode}
              </button>
            ))}
          </div>

          {/* Day Headers */}
          <div className="grid grid-cols-7 gap-1 mb-2">
            {daysOfWeek.map((day) => (
              <div key={day} className="text-center text-xs font-medium text-gray-500 py-2">
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-1">
            {calendarDays.map((day, index) => {
              if (day === null) {
                return <div key={`empty-${index}`} className="aspect-square" />;
              }
              
              const isToday = day === new Date().getDate() && 
                             selectedMonth === new Date().getMonth() && 
                             selectedYear === new Date().getFullYear();
              const isSelected = day === selectedDate;
              const hasEvents = hasEvent(day);
              const dayEvents = getEventsForDay(day);

              return (
                <button
                  key={day}
                  onClick={() => setSelectedDate(day)}
                  className={`aspect-square rounded-lg flex flex-col items-center justify-center relative transition-colors ${
                    isSelected 
                      ? 'bg-blue-600 text-white hover:bg-blue-700' 
                      : isToday 
                        ? 'bg-blue-50 text-blue-600 hover:bg-blue-100' 
                        : 'hover:bg-gray-50'
                  }`}
                >
                  <span className={`text-sm font-medium ${isSelected ? 'text-white' : isToday ? 'text-blue-600' : 'text-gray-700'}`}>
                    {day}
                  </span>
                  {hasEvents && !isSelected && (
                    <div className="absolute bottom-1.5 w-1.5 h-1.5 rounded-full bg-blue-500" />
                  )}
                  {hasEvents && isSelected && (
                    <div className="absolute bottom-1.5 w-1.5 h-1.5 rounded-full bg-white" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Event Indicators */}
          {events.length > 0 && (
            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="flex items-center gap-4 text-xs text-gray-500">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-blue-500" />
                  <span>Has Events</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-blue-600" />
                  <span>Selected</span>
                </div>
              </div>
            </div>
          )}
        </Card>

        {/* Events List */}
        <Card className="lg:col-span-1 p-6">
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-gray-800">Upcoming Events</h3>
          </div>

          {/* Selected Date Events */}
          {selectedEvents.length > 0 ? (
            <div className="space-y-3">
              <p className="text-sm text-gray-500 mb-3">
                {months[selectedMonth]} {selectedDate}, {selectedYear}
              </p>
              {selectedEvents.map((event) => (
                <div key={event.id} className="p-4 bg-gray-50 rounded-xl border border-gray-100 hover:shadow-md transition-shadow">
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 text-center bg-blue-50 rounded-xl px-3 py-2 min-w-[52px]">
                      <p className="text-xs text-blue-600 font-medium">
                        {new Date(event.date).toLocaleDateString('en-US', { month: 'short' })}
                      </p>
                      <p className="text-lg font-bold text-blue-700">
                        {new Date(event.date).getDate()}
                      </p>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-gray-800 text-sm truncate">{event.title}</h4>
                      <div className="flex flex-col gap-0.5 mt-1 text-xs text-gray-500">
                        <span className="flex items-center gap-1">
                          <IoTimeOutline className="w-3.5 h-3.5" />
                          {event.time}
                        </span>
                        <span className="flex items-center gap-1">
                          <IoLocationOutline className="w-3.5 h-3.5" />
                          {event.location}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
                <IoCalendarOutline className="w-8 h-8 text-gray-400" />
              </div>
              <p className="text-gray-500 font-medium">No upcoming events</p>
              <p className="text-sm text-gray-400 mt-1">There are no events scheduled for this day.</p>
            </div>
          )}

          {/* All Upcoming Events Preview */}
          {events.length > 0 && (
            <div className="mt-6 pt-4 border-t border-gray-200">
              <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-3">All Upcoming Events</p>
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {events.slice(0, 3).map((event) => (
                  <div key={event.id} className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg transition-colors">
                    <div className="w-2 h-2 rounded-full bg-blue-500 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-700 truncate">{event.title}</p>
                      <p className="text-xs text-gray-400">
                        {new Date(event.date).toLocaleDateString()} • {event.time}
                      </p>
                    </div>
                  </div>
                ))}
                {events.length > 3 && (
                  <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                    View all {events.length} events →
                  </button>
                )}
              </div>
            </div>
          )}
        </Card>
      </div>

    </div>
  );
};

export default EventsCalendar;