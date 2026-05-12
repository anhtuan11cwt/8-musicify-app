package com.musicify.musicify_api.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.musicify.musicify_api.dto.SongRequest;
import com.musicify.musicify_api.service.SongService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/songs")
@RequiredArgsConstructor
public class SongController {

    private final SongService songService;

    @PostMapping
    public ResponseEntity<?> addSong(
            @RequestPart("request") String requestJson,
            @RequestPart("audio") MultipartFile audioFile,
            @RequestPart("image") MultipartFile imageFile
    ) {
        try {
            ObjectMapper mapper = new ObjectMapper();
            SongRequest request = mapper.readValue(requestJson, SongRequest.class);
            request.setAudioFile(audioFile);
            request.setImageFile(imageFile);

            return ResponseEntity.status(HttpStatus.CREATED).body(songService.addSong(request));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping
    public ResponseEntity<?> getAllSongs() {
        try {
            return ResponseEntity.ok(songService.getAllSongs());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> removeSong(@PathVariable String id) {
        try {
            songService.removeSong(id);
            return ResponseEntity.noContent().build();
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
