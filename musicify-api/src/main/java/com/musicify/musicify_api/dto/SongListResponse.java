package com.musicify.musicify_api.dto;

import com.musicify.musicify_api.document.Song;
import lombok.*;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class SongListResponse {

    private boolean success;

    private List<Song> songs;
}
