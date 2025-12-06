import { useEffect, useState } from "react";
import WorkCalendar from "../../../components/layout/work/WorkCalendar";
import type { ScheduleRes } from "../../../types/scheduleType";
import { mapSchedulesToEvents } from "../../../utils/workHelper";
import doctorService from "../../../services/doctorApi";
import AddScheduleByDoctor from "../../../components/layout/dialog/AddScheduleByDoctor";
import type { DoctorType } from "../../../types/doctorType";
import { useOutletContext } from "react-router-dom";

interface ProfileContextType {
  doctor: DoctorType;
}

const DoctorSchedule: React.FC = () => {
  const [events, setEvents] = useState<ScheduleRes[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedSchedule, setSelectedSchedule] = useState<ScheduleRes | null>(
    null
  );

  const { doctor } = useOutletContext<ProfileContextType>();

  const fetchEvents = async () => {
    try {
      const scheduleRes: ScheduleRes[] = await doctorService.getSchedule();
      setEvents(scheduleRes);
      console.log(selectedDate) //
    } catch (err) {
      console.error(err);
    }
  };


  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <div>
      {doctor && (
        <div className="flex justify-end">
          <AddScheduleByDoctor
            doctorId={doctor.id} 
            onSuccess={fetchEvents} 
          />
        </div>
      )}
      <WorkCalendar
        events={mapSchedulesToEvents(events)}
        onDateClick={setSelectedDate}
        onEventClick={(info) => {
          const id = info.event.id;
          const schedule = events.find((e) => e.id === id);
          if (schedule) {
            setSelectedSchedule(schedule);
          } else {
            setSelectedSchedule(null); 
          }
        }}
        selectedEvent={selectedSchedule}
      />
    </div>
  );
};

export default DoctorSchedule;
