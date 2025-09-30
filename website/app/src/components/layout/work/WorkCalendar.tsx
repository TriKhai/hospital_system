import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import type { EventInput } from "@fullcalendar/core";
import interactionPlugin from "@fullcalendar/interaction"; // needed for dayClick
import timeGridPlugin from "@fullcalendar/timegrid";
import viLocale from "@fullcalendar/core/locales/vi";
import { useRef } from "react";
// import { MonthPicker } from "@mui/x-date-pickers/MonthPicker";
import MiniCalendar from "./MiniCalendar";
import { Dayjs } from "dayjs";
import tippy from "tippy.js";
import "tippy.js/dist/tippy.css"; // CSS cơ bản
import "tippy.js/themes/light.css"; // nếu muốn theme light

interface Props {
  events: EventInput[];
}

const WorkCalendar: React.FC<Props> = ({ events }) => {
  const mainCalendarRef = useRef<FullCalendar | null>(null);

  const handleMiniChange = (date: Dayjs) => {
    const api = mainCalendarRef.current?.getApi();
    api?.gotoDate(date.toDate()); // nhảy ngày theo mini calendar
  };

  return (
    <div className="flex gap-4">
      <div className="flex-1">
        <FullCalendar
          ref={mainCalendarRef}
          height="70vh"
          plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
          initialView="dayGridMonth"
          allDaySlot={false}
          //   headerToolbar={false}
          headerToolbar={{
            left: "prev,next today",
            center: "title",
            right: "dayGridMonth,timeGridWeek,timeGridDay",
          }}
          locale={viLocale}
          // dayHeaderFormat={{ weekday: 'short' }}

          fixedWeekCount={false}
          dayHeaderContent={(args) => {
            // args.date là ngày đầy đủ
            const d = args.date;
            const weekday = d.toLocaleDateString("vi-VN", { weekday: "short" }); // Th 2
            const dayNum = d.getDate(); // 29, 30,...
            return (
              <div className="flex flex-col items-center">
                <span className="text-sm font-semibold">{weekday}</span>
                <span className="text-lg">{dayNum}</span>
              </div>
            );
          }}
          events={events}
          eventDidMount={(info) => {
            const e = info.event;
            tippy(info.el, {
              content: 
                `
                    <b>${e.title}</b>
                    <br/>
                    ${e.start?.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                    })}
                    -
                    ${e.end?.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                `,
              allowHTML: true,
              theme: "light",
              trigger: "click", // hoặc "mouseenter"
              placement: "right",
            });
          }}
        />
      </div>

      <MiniCalendar onChange={handleMiniChange} />
    </div>
  );
};

export default WorkCalendar;
