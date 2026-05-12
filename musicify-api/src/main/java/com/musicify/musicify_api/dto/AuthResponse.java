package com.musicify.musicify_api.dto;

import com.musicify.musicify_api.enums.Role;
import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class AuthResponse {
    private String token;
    private String email;
    private Role role;
}
