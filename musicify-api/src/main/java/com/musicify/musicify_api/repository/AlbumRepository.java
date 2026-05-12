package com.musicify.musicify_api.repository;

import com.musicify.musicify_api.document.Album;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface AlbumRepository extends MongoRepository<Album, String> {
}
