package com.nln.hospitalsystem.exception;

import com.nln.hospitalsystem.payload.ResponseData;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.nio.file.AccessDeniedException;

@RestControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<ResponseData<Object>> handleRuntimeException(RuntimeException ex) {
        return ResponseEntity
                .badRequest()
                .body(ResponseData.error(400, ex.getMessage()));
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ResponseData<Object>> handleGeneralException(Exception ex) {
        return ResponseEntity
                .status(500)
                .body(ResponseData.error(500, "Internal server error: " + ex.getMessage()));
    }

    @ExceptionHandler(EntityNotFoundException.class) // lỗi 404
    public ResponseEntity<ResponseData<Object>> handleEntityNotFound(EntityNotFoundException ex) {
        return ResponseEntity
                .status(404)
                .body(ResponseData.error(404, ex.getMessage()));
    }

    @ExceptionHandler(AccessDeniedException.class) // lỗi 403
    public ResponseEntity<ResponseData<Object>> handleAccessDenied(AccessDeniedException ex) {
        return ResponseEntity
                .status(403)
                .body(ResponseData.error(403, "Access denied"));
    }
}
