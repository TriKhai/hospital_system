import * as React from "react";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs, { Dayjs } from "dayjs";
import "dayjs/locale/vi";

export default function MiniCalendar({
  onChange,
}: {
  onChange?: (date: Dayjs) => void;
}) {
  const [value, setValue] = React.useState<Dayjs | null>(dayjs());

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="vi">
      <DateCalendar
        value={value}
        onChange={(newValue) => {
          setValue(newValue);
          if (onChange && newValue) onChange(newValue);
        }}
      />
    </LocalizationProvider>
  );
}
