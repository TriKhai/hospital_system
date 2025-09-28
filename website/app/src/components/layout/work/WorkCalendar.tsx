import React, { useEffect, useState } from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
// import type { Event } from 'react-big-calendar';
import { format, parse, startOfWeek, getDay } from 'date-fns';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import {enUS} from 'date-fns/locale';
import type { ScheduleRes } from '../../../types/scheduleType';
import scheduleService from '../../../services/scheduleApi';

export interface CalendarEvent {
  id: string | number;
  title: string;
  start: Date;
  end: Date;
  resource: {
    doctorId: number;
    status: string; // AVAILABLE / BOOKED
  };
}



// interface WorkDTO {
//   id: number | string;
//   title: string;
//   start: string; // ISO string
//   end: string;   // ISO string
//   status: 'AVAILABLE' | 'BOOKED';
//   doctorId: number;
//   specialty?: string | null;
// }

interface WorkCalendarProps {
  specialtyID?: number | null;
}

const locales = {
  'en-US': enUS
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const WorkCalendar: React.FC<WorkCalendarProps> = ({ specialtyID }) => {
  const [events, setEvents] = useState<CalendarEvent[]>([]);

  useEffect(() => {
    const fetchWork = async () => {
      try {
        const data: ScheduleRes[] = await scheduleService.getAll(specialtyID || undefined);
        const mapped: CalendarEvent[] = data.map((w) => ({
            id: w.id,
            title: w.title,
            start: new Date(w.start),
            end: new Date(w.end),
            resource: { doctorId: w.doctorId, status: w.status || "UNKNOWN" }
        }));
        setEvents(mapped);
      } catch (err) {
        console.error(err);
      }
    };

    fetchWork();
  }, [specialtyID]);

  return (
    <div style={{ height: '800px' }}>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        titleAccessor="title"
        style={{ height: 800 }}
        eventPropGetter={(event) => {
          const backgroundColor = event.resource.status === 'AVAILABLE' ? '#28a745' : '#dc3545';
          return { style: { backgroundColor, color: 'white' } };
        }}
      />
    </div>
  );
};

export default WorkCalendar;
