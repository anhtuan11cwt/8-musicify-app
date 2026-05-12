package com.musicify.musicify_api.dto;

import com.musicify.musicify_api.document.Album;
import lombok.*;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class AlbumListResponse {

    private boolean success;

    private List<Album> albums;
}
