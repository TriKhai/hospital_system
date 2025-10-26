import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type {
  AppointmentResponse,
  AppointmentRequest,
  AppointmentStatus,
} from "@/types/api/appointmentType";
import appointmentService from "@/services/appointmentApi";

interface AppointmentState {
  data: AppointmentResponse[];
  loading: boolean;
  error: string | null;
}

const cancelledStatuses = [
  "REJECTED",
  "CANCELLED_BY_PATIENT",
  "CANCELLED_BY_DOCTOR",
  "CANCELLED_BY_ADMIN",
];

const initialState: AppointmentState = {
  data: [],
  loading: false,
  error: null,
};


export const fetchAppointments = createAsyncThunk<
  AppointmentResponse[],
  AppointmentStatus | "ALL" | undefined
>("appointments/fetchAll", async (statusRender, { rejectWithValue }) => {
  try {
    const res = await appointmentService.getAll();

    let filtered: AppointmentResponse[];

    if (statusRender === "REJECTED") {
      filtered = res.filter((d) => cancelledStatuses.includes(d.status));
    } else if (statusRender && statusRender !== "ALL") {
      filtered = res.filter((d) => d.status === statusRender);
    } else {
      filtered = res;
    }

    return filtered.reverse();
  } catch (err: any) {
    return rejectWithValue(err.message);
  }
});

// Lấy lịch hẹn của bệnh nhân
export const fetchAppointmentsForPatient = createAsyncThunk(
  "appointments/fetchForPatient",
  async (_, { rejectWithValue }) => {
    try {
      const res = await appointmentService.getForPatient();
      return res;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Không thể tải lịch hẹn của bệnh nhân"
      );
    }
  }
);

// Lấy lịch hẹn của bác sĩ
export const fetchAppointmentsForDoctor = createAsyncThunk(
  "appointments/fetchForDoctor",
  async (_, { rejectWithValue }) => {
    try {
      const res = await appointmentService.getForDoctor();
      return res;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Không thể tải lịch hẹn của bác sĩ"
      );
    }
  }
);

// Tạo lịch hẹn mới
export const createAppointment = createAsyncThunk(
  "appointments/create",
  async (data: AppointmentRequest, { rejectWithValue }) => {
    try {
      await appointmentService.create(data);
      return data;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Không thể tạo lịch hẹn"
      );
    }
  }
);

// Cập nhật trạng thái
export const updateAppointmentStatus = createAsyncThunk(
  "appointments/updateStatus",
  async (
    { id, status }: { id: number; status: string },
    { rejectWithValue }
  ) => {
    try {
      await appointmentService.updateStatus(id, status);
      return { id, status };
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Không thể cập nhật trạng thái"
      );
    }
  }
);

// Hủy bởi bệnh nhân
export const cancelByPatient = createAsyncThunk(
  "appointments/cancelByPatient",
  async (id: number, { rejectWithValue }) => {
    try {
      await appointmentService.cancelByPatient(id);
      return id;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Không thể hủy lịch hẹn"
      );
    }
  }
);

// Hủy bởi bác sĩ
export const cancelByDoctor = createAsyncThunk(
  "appointments/cancelByDoctor",
  async (id: number, { rejectWithValue }) => {
    try {
      await appointmentService.cancelByDoctor(id);
      return id;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Không thể hủy lịch hẹn"
      );
    }
  }
);

// Xác nhận bởi bác sĩ
export const confirmByDoctor = createAsyncThunk(
  "appointments/confirmByDoctor",
  async (id: number, { rejectWithValue }) => {
    try {
      await appointmentService.confirmByDoctor(id);
      return id;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Không thể xác nhận lịch hẹn"
      );
    }
  }
);

const appointmentSlice = createSlice({
  name: "appointments",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // --- FETCH ---
      .addCase(fetchAppointments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAppointments.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchAppointments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // --- FETCH FOR PATIENT/DOCTOR ---
      .addCase(fetchAppointmentsForPatient.fulfilled, (state, action) => {
        state.data = action.payload;
      })
      .addCase(fetchAppointmentsForDoctor.fulfilled, (state, action) => {
        state.data = action.payload;
      })

      // --- UPDATE STATUS ---
      .addCase(updateAppointmentStatus.fulfilled, (state, action) => {
        const { id, status } = action.payload;
        const found = state.data.find((a) => a.id === id);
        if (found) found.status = status;
      })

      // --- CANCEL & CONFIRM ---
      .addCase(cancelByPatient.fulfilled, (state, action) => {
        const found = state.data.find((a) => a.id === action.payload);
        if (found) found.status = "CANCELLED";
      })
      .addCase(cancelByDoctor.fulfilled, (state, action) => {
        const found = state.data.find((a) => a.id === action.payload);
        if (found) found.status = "CANCELLED";
      })
      .addCase(confirmByDoctor.fulfilled, (state, action) => {
        const found = state.data.find((a) => a.id === action.payload);
        if (found) found.status = "CONFIRMED";
      });
  },
});

export default appointmentSlice.reducer;
