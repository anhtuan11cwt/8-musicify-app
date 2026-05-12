package com.musicify.musicify_api.document;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Document("albums")
public class Album {

    @Id
    @JsonProperty("_id")
    private String id;

    private String name;

    private String description;

    private String bgColor;

    private String image;
}
