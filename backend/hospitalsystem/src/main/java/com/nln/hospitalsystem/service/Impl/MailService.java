package com.nln.hospitalsystem.service.Impl;

import com.nln.hospitalsystem.dto.maIl.MailBody;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class MailService {
    @Value("${spring.mail.username}")
    private String fromEmail;

    private final JavaMailSender javaMailSender;

    public MailService(JavaMailSender javaMailSender) {
        this.javaMailSender = javaMailSender;
    }

    public void sendMail(MailBody mailBody) {

        if (mailBody == null) {
            throw new IllegalArgumentException("MailBody cannot be null");
        }

        if (mailBody.to() == null || mailBody.to().isBlank()) {
            throw new IllegalArgumentException("Recipient email cannot be empty");
        }

        if (mailBody.subject() == null || mailBody.subject().isBlank()) {
            throw new IllegalArgumentException("Email subject cannot be empty");
        }

        if (mailBody.text() == null || mailBody.text().isBlank()) {
            throw new IllegalArgumentException("Email content cannot be empty");
        }

        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(mailBody.to());
        message.setFrom(fromEmail);
        message.setSubject(mailBody.subject());
        message.setText(mailBody.text());

        javaMailSender.send(message);
    }
}