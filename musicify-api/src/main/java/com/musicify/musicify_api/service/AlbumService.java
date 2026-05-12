package com.musicify.musicify_api.service;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import com.musicify.musicify_api.document.Album;
import com.musicify.musicify_api.dto.AlbumListResponse;
import com.musicify.musicify_api.dto.AlbumRequest;
import com.musicify.musicify_api.repository.AlbumRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class AlbumService {

    private final AlbumRepository albumRepository;
    private final Cloudinary cloudinary;

    public AlbumListResponse addAlbum(AlbumRequest request) throws IOException {
        Map uploadResult = cloudinary.uploader().upload(
                request.getImageFile().getBytes(),
                ObjectUtils.asMap(
                        "resource_type", "image",
                        "folder", "8-musicify-app/albums"
                )
        );

        String imageUrl = uploadResult.get("secure_url").toString();

        Album album = Album.builder()
                .name(request.getName())
                .description(request.getDescription())
                .bgColor(request.getBgColor())
                .image(imageUrl)
                .build();

        albumRepository.save(album);

        return AlbumListResponse.builder()
                .success(true)
                .albums(albumRepository.findAll())
                .build();
    }

    public AlbumListResponse getAllAlbums() {
        return AlbumListResponse.builder()
                .success(true)
                .albums(albumRepository.findAll())
                .build();
    }

    public boolean removeAlbum(String id) {
        albumRepository.deleteById(id);
        return true;
    }
}
