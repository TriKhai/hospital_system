import type { EventInput } from "@fullcalendar/core/index.js";
import type { ScheduleRes } from "../types/scheduleType";

export function mapSchedulesToEvents(data: ScheduleRes[]): EventInput[] {
  return data.map(s => ({
    id: s.id,
    title: s.title,
    start: s.start,
    end: s.end,
    extendedProps: {
      status: s.status,
      doctorId: s.doctorId
    }
  }));
}