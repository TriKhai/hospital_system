import type { DoctorType } from "./doctorType";

export interface ScheduleDS {
    id:        number;
    workDate:  string;
    delStatus: string;
    status:    string;
    note:      null;
    createdAt: string;
    updatedAt: string;
}

export interface SlotDS {
    id:        number;
    status:    string;
    startTime: string;
    endTime:   string;
    createdAt: string;
    updatedAt: string;
}


export interface KeyID {
    doctorId:   number;
    scheduleId: number;
}

export interface DoctorScheduleRes {
    id:        KeyID;
    doctor:    DoctorType;
    schedule:  ScheduleDS;
    status:    string;
    startTime: string;
    endTime:   string;
    shiftType: string;
    note:      string;
    createdAt: string;
    updatedAt: string;
    slots:     SlotDS[];
}
