package com.musicify.musicify_api.service;

import com.musicify.musicify_api.document.User;
import com.musicify.musicify_api.dto.AuthResponse;
import com.musicify.musicify_api.dto.RegisterRequest;
import com.musicify.musicify_api.enums.Role;
import com.musicify.musicify_api.repository.UserRepository;
import com.musicify.musicify_api.security.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

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
                .token(jwtUtil.generateToken(newUser.getEmail()))
                .email(newUser.getEmail())
                .role(newUser.getRole())
                .build();
    }

    public AuthResponse authenticateUser(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy người dùng"));

        return AuthResponse.builder()
                .token(jwtUtil.generateToken(user.getEmail()))
                .email(user.getEmail())
                .role(user.getRole())
                .build();
    }

    public AuthResponse promoteToAdmin(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy người dùng"));

        user.setRole(Role.ADMIN);
        userRepository.save(user);

        return AuthResponse.builder()
                .token(jwtUtil.generateToken(user.getEmail()))
                .email(user.getEmail())
                .role(user.getRole())
                .build();
    }
}

