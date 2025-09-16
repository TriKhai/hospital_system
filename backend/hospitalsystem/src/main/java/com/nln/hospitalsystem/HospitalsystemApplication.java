package com.nln.hospitalsystem;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableJpaAuditing
public class HospitalsystemApplication {


	public static void main(String[] args) {
		SpringApplication.run(HospitalsystemApplication.class, args);
	}

}
