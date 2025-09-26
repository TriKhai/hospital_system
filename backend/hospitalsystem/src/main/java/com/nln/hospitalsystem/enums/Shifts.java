package com.nln.hospitalsystem.enums;

public enum Shifts {
    MORNING("08:00","12:00"),
    AFTERNOON("13:00","17:00"),
    EVENING("18:00","21:00");

    private final String start;
    private final String end;

    Shifts(String start, String end) {
        this.start = start;
        this.end = end;
    }

    public String getStart() { return start; }
    public String getEnd() { return end; }
}
