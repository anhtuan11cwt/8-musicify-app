package com.musicify.musicify_api.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.musicify.musicify_api.dto.AlbumRequest;
import com.musicify.musicify_api.service.AlbumService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/albums")
@RequiredArgsConstructor
public class AlbumController {

    private final AlbumService albumService;

    @PostMapping
    public ResponseEntity<?> addAlbum(
            @RequestPart("request") String request,
            @RequestPart("file") MultipartFile file
    ) {
        try {
            ObjectMapper mapper = new ObjectMapper();
            AlbumRequest albumRequest = mapper.readValue(request, AlbumRequest.class);
            albumRequest.setImageFile(file);

            return ResponseEntity
                    .status(HttpStatus.CREATED)
                    .body(albumService.addAlbum(albumRequest));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping
    public ResponseEntity<?> getAlbums() {
        try {
            return ResponseEntity.ok(albumService.getAllAlbums());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> removeAlbum(@PathVariable String id) {
        try {
            albumService.removeAlbum(id);
            return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
