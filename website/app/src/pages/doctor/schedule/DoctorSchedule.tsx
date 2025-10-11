import { useEffect, useState } from "react";
import WorkCalendar from "../../../components/layout/work/WorkCalendar";
import type { ScheduleRes } from "../../../types/scheduleType";
import { mapSchedulesToEvents } from "../../../utils/workHelper";
import doctorService from "../../../services/doctorApi";

const DoctorSchedule: React.FC = () => {
  const [events, setEvents] = useState<ScheduleRes[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedSchedule, setSelectedSchedule] = useState<ScheduleRes | null>(
    null
  );

  const fetchEvents = async () => {
    try {
      const scheduleRes: ScheduleRes[] = await doctorService.getSchedule();
      setEvents(scheduleRes);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, [])

  return (
    <div>
      <WorkCalendar
        events={mapSchedulesToEvents(events)}
        onDateClick={setSelectedDate}
        onEventClick={(info) => {
          const id = info.event.id;
          const schedule = events.find((e) => e.id === id);
          if (schedule) {
            setSelectedSchedule(schedule);
          } else {
            setSelectedSchedule(null); // nếu không tìm thấy thì clear
          }
        }}
        selectedEvent={selectedSchedule}
      />
    </div>
  );
};

export default DoctorSchedule;
