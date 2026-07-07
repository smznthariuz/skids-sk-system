import React, { useState } from 'react';
import {
  IoAddOutline,
  IoCalendarOutline,
  IoChevronBackOutline,
  IoChevronForwardOutline,
  IoLocationOutline,
  IoTimeOutline,
  IoTodayOutline,
} from 'react-icons/io5';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import AddEventModal from '../user/AddEventModal';
import { getEvents } from '../../utils/mockData';

const AdminEvents = () => {
  const [events, setEvents] = useState(() => getEvents());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedDate, setSelectedDate] = useState(new Date().getDate());

  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const handleAddEvent = (newEvent) => {
    const event = {
      id: Date.now(),
      title: newEvent.title,
      time: newEvent.time,
      date: newEvent.eventDate,
      location: newEvent.location,
      description: newEvent.description,
      purpose: newEvent.purpose,
      eventColor: newEvent.eventColor,
      venueDetails: newEvent.venueDetails,
      procedure: newEvent.procedure,
    };

    setEvents((prev) => [event, ...prev]);
  };

  const prevMonth = () => {
    if (selectedMonth === 0) {
      setSelectedMonth(11);
      setSelectedYear((prev) => prev - 1);
    } else {
      setSelectedMonth((prev) => prev - 1);
    }
  };

  const nextMonth = () => {
    if (selectedMonth === 11) {
      setSelectedMonth(0);
      setSelectedYear((prev) => prev + 1);
    } else {
      setSelectedMonth((prev) => prev + 1);
    }
  };

  const goToToday = () => {
    const today = new Date();
    setSelectedMonth(today.getMonth());
    setSelectedYear(today.getFullYear());
    setSelectedDate(today.getDate());
  };

  const getDaysInMonth = (month, year) => new Date(year, month + 1, 0).getDate();
  const getFirstDayOfMonth = (month, year) => new Date(year, month, 1).getDay();

  const daysInMonth = getDaysInMonth(selectedMonth, selectedYear);
  const firstDay = getFirstDayOfMonth(selectedMonth, selectedYear);
  const calendarDays = [
    ...Array.from({ length: firstDay }, () => null),
    ...Array.from({ length: daysInMonth }, (_, index) => index + 1),
  ];

  const hasEvent = (day) =>
    events.some((event) => {
      const eventDate = new Date(event.date);
      return eventDate.getDate() === day && eventDate.getMonth() === selectedMonth && eventDate.getFullYear() === selectedYear;
    });

  const getEventsForDay = (day) =>
    events.filter((event) => {
      const eventDate = new Date(event.date);
      return eventDate.getDate() === day && eventDate.getMonth() === selectedMonth && eventDate.getFullYear() === selectedYear;
    });

  const selectedEvents = getEventsForDay(selectedDate);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Event Schedule</h1>
          <p className="text-slate-500 mt-1">Create and manage official barangay events for the admin and officer side.</p>
        </div>
        <Button
          variant="primary"
          icon={IoAddOutline}
          onClick={() => setIsModalOpen(true)}
        >
          Add Event
        </Button>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-semibold text-slate-900">Calendar View</h2>
              <p className="text-sm text-slate-500">Select a day to view the events scheduled for that date.</p>
            </div>
            <Button variant="secondary" size="sm" icon={IoTodayOutline} onClick={goToToday}>
              Today
            </Button>
          </div>

          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <button onClick={prevMonth} className="rounded-lg p-2 text-slate-600 hover:bg-slate-100">
                <IoChevronBackOutline className="h-5 w-5" />
              </button>
              <h3 className="text-lg font-semibold text-slate-900">{months[selectedMonth]} {selectedYear}</h3>
              <button onClick={nextMonth} className="rounded-lg p-2 text-slate-600 hover:bg-slate-100">
                <IoChevronForwardOutline className="h-5 w-5" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-7 gap-1 mb-2">
            {daysOfWeek.map((day) => (
              <div key={day} className="py-2 text-center text-xs font-semibold uppercase tracking-wide text-slate-400">
                {day}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-1">
            {calendarDays.map((day, index) => {
              if (!day) {
                return <div key={`empty-${index}`} className="aspect-square" />;
              }

              const isToday = day === new Date().getDate() && selectedMonth === new Date().getMonth() && selectedYear === new Date().getFullYear();
              const isSelected = day === selectedDate;
              const hasEventsForDay = hasEvent(day);

              return (
                <button
                  key={day}
                  onClick={() => setSelectedDate(day)}
                  className={`aspect-square rounded-xl border text-sm font-medium transition ${
                    isSelected
                      ? 'border-primary-600 bg-primary-600 text-white'
                      : isToday
                        ? 'border-primary-200 bg-primary-50 text-primary-700'
                        : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <span className="flex h-full flex-col items-center justify-center gap-1">
                    <span>{day}</span>
                    {hasEventsForDay && <span className={`h-2 w-2 rounded-full ${isSelected ? 'bg-white' : 'bg-primary-600'}`} />}
                  </span>
                </button>
              );
            })}
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-lg font-semibold text-slate-900">Upcoming Events</h2>
              <p className="text-sm text-slate-500">Events added here will appear in the schedule.</p>
            </div>
          </div>

          <div className="mb-4 rounded-2xl bg-slate-50 px-4 py-3 text-sm text-slate-600">
            Showing events for <span className="font-semibold text-slate-900">{months[selectedMonth]} {selectedDate}, {selectedYear}</span>
          </div>

          {selectedEvents.length > 0 ? (
            <div className="space-y-3">
              {selectedEvents.map((event) => (
                <div key={event.id} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                    <div>
                      <h3 className="font-semibold text-slate-900">{event.title}</h3>
                      <p className="mt-1 text-sm text-slate-600">{event.description || 'No description provided.'}</p>
                    </div>
                    <div className="space-y-2 text-sm text-slate-600">
                      <div className="flex items-center gap-2">
                        <IoCalendarOutline className="h-4 w-4 text-primary-600" />
                        <span>{new Date(event.date).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <IoTimeOutline className="h-4 w-4 text-primary-600" />
                        <span>{event.time}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <IoLocationOutline className="h-4 w-4 text-primary-600" />
                        <span>{event.location}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center text-slate-500">
              No events for this day yet.
            </div>
          )}
        </Card>
      </div>

      <AddEventModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleAddEvent}
      />
    </div>
  );
};

export default AdminEvents;