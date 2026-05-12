package com.musicify.musicify_api.dto;

import lombok.*;
import org.springframework.web.multipart.MultipartFile;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class AlbumRequest {

    private String name;

    private String description;

    private String bgColor;

    private MultipartFile imageFile;
}
