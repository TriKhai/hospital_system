import type {
  ScheduleEvent,
  StaffScheduleRes,
} from "../types/staffScheduleType";

export const mapToEvents = (schedules: StaffScheduleRes[]): ScheduleEvent[] => {
  console.log("schedules: ", schedules)
  if (!schedules) return [];
  return schedules
    .filter((s): s is StaffScheduleRes => s !== null && s !== undefined)
    .map((s) => ({
      id: s.id.toString(),
      title: `BS ${s.doctor.name} (${s.doctor.specialty.name})`,
      start: `${s.workDate}T${s.startTime}`,
      end: `${s.workDate}T${s.endTime}`,
      status: s.status,
      doctorId: s.doctor.id,
    }));
};
