package com.musicify.musicify_api.document;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Document("songs")
public class Song {

    @Id
    @JsonProperty("_id")
    private String id;

    private String name;

    private String description;

    private String album;

    private String image;

    private String file;

    private String duration;
}
