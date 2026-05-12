package com.musicify.musicify_api.service;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import com.musicify.musicify_api.document.Song;
import com.musicify.musicify_api.dto.SongListResponse;
import com.musicify.musicify_api.dto.SongRequest;
import com.musicify.musicify_api.repository.SongRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
@RequiredArgsConstructor
public class SongService {

    private final SongRepository songRepository;
    private final Cloudinary cloudinary;

    public Song addSong(SongRequest request) throws Exception {
        Map audioUploadResult = cloudinary.uploader().upload(
                request.getAudioFile().getBytes(),
                ObjectUtils.asMap(
                        "resource_type", "video",
                        "folder", "8-musicify-app/songs"
                )
        );

        Map imageUploadResult = cloudinary.uploader().upload(
                request.getImageFile().getBytes(),
                ObjectUtils.asMap(
                        "resource_type", "image",
                        "folder", "8-musicify-app/songs"
                )
        );

        double durationSeconds = (double) audioUploadResult.get("duration");
        String formattedDuration = formatDuration(durationSeconds);

        Song newSong = Song.builder()
                .name(request.getName())
                .description(request.getDescription())
                .album(request.getAlbum())
                .image(imageUploadResult.get("secure_url").toString())
                .file(audioUploadResult.get("secure_url").toString())
                .duration(formattedDuration)
                .build();

        return songRepository.save(newSong);
    }

    public SongListResponse getAllSongs() {
        return SongListResponse.builder()
                .success(true)
                .songs(songRepository.findAll())
                .build();
    }

    public boolean removeSong(String id) {
        Song existingSong = songRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy bài hát"));
        songRepository.delete(existingSong);
        return true;
    }

    private String formatDuration(double seconds) {
        int minutes = (int) seconds / 60;
        int remainingSeconds = (int) seconds % 60;
        return String.format("%02d:%02d", minutes, remainingSeconds);
    }
}
