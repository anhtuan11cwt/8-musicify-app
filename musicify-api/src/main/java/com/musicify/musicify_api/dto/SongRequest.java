package com.musicify.musicify_api.dto;

import lombok.*;
import org.springframework.web.multipart.MultipartFile;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class SongRequest {

    private String name;

    private String description;

    private String album;

    private MultipartFile audioFile;

    private MultipartFile imageFile;
}
