package com.musicify.musicify_api.service;

import com.musicify.musicify_api.document.User;
import com.musicify.musicify_api.dto.AuthResponse;
import com.musicify.musicify_api.dto.RegisterRequest;
import com.musicify.musicify_api.enums.Role;
import com.musicify.musicify_api.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public AuthResponse registerUser(RegisterRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email đã tồn tại");
        }

        User newUser = User.builder()
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(Role.USER)
                .build();

        userRepository.save(newUser);

        return AuthResponse.builder()
                .token("")
                .email(newUser.getEmail())
                .role(newUser.getRole())
                .build();
    }
}
