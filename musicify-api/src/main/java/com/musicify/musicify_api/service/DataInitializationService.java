package com.musicify.musicify_api.service;

import com.musicify.musicify_api.document.User;
import com.musicify.musicify_api.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class DataInitializationService implements CommandLineRunner {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) {
        String adminEmail = "admin@musify.com";
        if (userRepository.findByEmail(adminEmail).isEmpty()) {
            User admin = User.builder()
                    .email(adminEmail)
                    .password(passwordEncoder.encode("admin123"))
                    .role(com.musicify.musicify_api.enums.Role.ADMIN)
                    .build();
            userRepository.save(admin);
            System.out.println("Tài khoản admin mặc định đã được tạo");
        }
    }
}
