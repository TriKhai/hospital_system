package com.nln.hospitalsystem.payload;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ResponseData<T> {
    private int status;
    private String message;
    private T data;
    private boolean success;

    public static <T> ResponseData<T> created(T data, String message) {
        return new ResponseData<>(201, message, data, true);
    }


    public static <T> ResponseData<T> success(T data, String message) {
        return new ResponseData<>(200, message, data, true);
    }

    public static <T> ResponseData<T> error(int status, String message) {
        return new ResponseData<>(status, message, null, false);
    }
}