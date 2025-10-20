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

  // const handleAddSchedules = async (data: ScheduleDocReq) => {
  //   try {
  //     const payload = {
  //       ...data,
  //       workDate: data.workDate,
  //     };
  //     console.log(payload);
  //     await scheduleService.createByDoctor(payload);
  //     await fetchEvents();
  //     toast.success("Đã thêm lịch thành công.");
  //   } catch (err) {
  //     console.error(err);
  //     toast.error("Đã xảy ra lỗi, không thể thêm lịch.");
  //   }
  // };

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <div>
      {doctor && (
        <div className="flex justify-end">
          <AddScheduleByDoctor
            doctorId={doctor.id} // TODO: thay bằng id bác sĩ hiện tại
            onSuccess={fetchEvents} // reload lịch sau khi thêm
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
            setSelectedSchedule(null); // nếu không tìm thấy thì clear
          }
        }}
        selectedEvent={selectedSchedule}
      />
    </div>
  );
};

export default DoctorSchedule;
