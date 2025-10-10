package com.nln.hospitalsystem.dto.maIl;

import lombok.Builder;

@Builder
public record MailBody(String to, String subject, String text) {
}
