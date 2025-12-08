export type DashboardSummary = {
  totalPatients: number;
  totalDoctors: number;
  totalDepartments: number;
  totalSpecialties: number;
  appointmentsToday: number;
  totalAppointments: number;
  totalDrugs: number;
  totalBlogs: number;
};

export interface WeeklyAppointment {
  labels: string[];
  male: number[];
  female: number[];
}

export interface AppointmentStatusStats {
  status: string;
  count: number;
}

export interface AppointmentChart {
  label: string;
  active: number;
  cancelled: number;
}
