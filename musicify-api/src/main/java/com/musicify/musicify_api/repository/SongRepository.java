package com.musicify.musicify_api.repository;

import com.musicify.musicify_api.document.Song;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface SongRepository extends MongoRepository<Song, String> {
}
