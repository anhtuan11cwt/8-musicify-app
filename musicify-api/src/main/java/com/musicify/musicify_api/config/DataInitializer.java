package com.musicify.musicify_api.config;

import com.musicify.musicify_api.document.Album;
import com.musicify.musicify_api.document.Song;
import com.musicify.musicify_api.repository.AlbumRepository;
import com.musicify.musicify_api.repository.SongRepository;
import com.musicify.musicify_api.service.CloudinaryService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.Arrays;
import java.util.List;

@Configuration
public class DataInitializer {

    @Bean
    CommandLineRunner initDatabase(AlbumRepository albumRepo, SongRepository songRepo, CloudinaryService cloudinaryService) {
        return args -> {
            System.out.println("--- [Musicify] Đang kiểm tra dữ liệu khởi tạo... ---");

            // --- 1. Khởi tạo Albums ---
            if (albumRepo.count() == 0) {
                System.out.println("[Musicify] Nạp dữ liệu Albums...");
                try {
                    List<Album> sampleAlbums = Arrays.asList(
                        Album.builder().name("Top 50 Việt Nam").description("Cập nhật hàng tuần...").bgColor("#2a4365").image(cloudinaryService.uploadSampleFile("img8.jpg", "8-musicify-app/albums")).build(),
                        Album.builder().name("Top 50 K-Pop").description("Cập nhật hàng tuần...").bgColor("#22543d").image(cloudinaryService.uploadSampleFile("img9.jpg", "8-musicify-app/albums")).build(),
                        Album.builder().name("Xu Hướng V-Pop").description("Cập nhật hàng tuần...").bgColor("#742a2a").image(cloudinaryService.uploadSampleFile("img10.jpg", "8-musicify-app/albums")).build(),
                        Album.builder().name("Xu Hướng Quốc Tế").description("Cập nhật hàng tuần...").bgColor("#44337a").image(cloudinaryService.uploadSampleFile("img16.jpg", "8-musicify-app/albums")).build(),
                        Album.builder().name("Hits Lớn").description("Cập nhật hàng tuần...").bgColor("#234e52").image(cloudinaryService.uploadSampleFile("img11.jpg", "8-musicify-app/albums")).build(),
                        Album.builder().name("Vui Tươi Hết Mình").description("Cập nhật hàng tuần...").bgColor("#744210").image(cloudinaryService.uploadSampleFile("img15.jpg", "8-musicify-app/albums")).build()
                    );
                    albumRepo.saveAll(sampleAlbums);
                    System.out.println("[Musicify] Đã nạp xong " + sampleAlbums.size() + " Albums.");
                } catch (Exception e) {
                    System.err.println("[Musicify] LỖI nạp Album: " + e.getMessage());
                }
            } else {
                System.out.println("[Musicify] Albums đã có dữ liệu. Bỏ qua.");
            }

            // --- 2. Khởi tạo Songs ---
            if (songRepo.count() == 0) {
                System.out.println("[Musicify] Nạp dữ liệu Songs...");
                try {
                    List<Song> sampleSongs = Arrays.asList(
                        Song.builder().name("Em Là Của Anh").description("Giai điệu vui vẻ").duration("3:00").image(cloudinaryService.uploadSampleFile("img1.jpg", "8-musicify-app/songs")).file(cloudinaryService.uploadSampleFile("song1.mp3", "8-musicify-app/songs")).build(),
                        Song.builder().name("Nơi Này Có Anh").description("Giai điệu vui vẻ").duration("2:20").image(cloudinaryService.uploadSampleFile("img2.jpg", "8-musicify-app/songs")).file(cloudinaryService.uploadSampleFile("song2.mp3", "8-musicify-app/songs")).build(),
                        Song.builder().name("Chạy Ngay Đi").description("Giai điệu vui vẻ").duration("2:32").image(cloudinaryService.uploadSampleFile("img3.jpg", "8-musicify-app/songs")).file(cloudinaryService.uploadSampleFile("song3.mp3", "8-musicify-app/songs")).build(),
                        Song.builder().name("Hãy Trao Cho Anh").description("Giai điệu vui vẻ").duration("2:50").image(cloudinaryService.uploadSampleFile("img4.jpg", "8-musicify-app/songs")).file(cloudinaryService.uploadSampleFile("song1.mp3", "8-musicify-app/songs")).build(),
                        Song.builder().name("Nắng Ấp Đôi Bờ Môi").description("Giai điệu vui vẻ").duration("3:10").image(cloudinaryService.uploadSampleFile("img5.jpg", "8-musicify-app/songs")).file(cloudinaryService.uploadSampleFile("song2.mp3", "8-musicify-app/songs")).build(),
                        Song.builder().name("Tình Yêu Màu Nắng").description("Giai điệu vui vẻ").duration("2:45").image(cloudinaryService.uploadSampleFile("img14.jpg", "8-musicify-app/songs")).file(cloudinaryService.uploadSampleFile("song3.mp3", "8-musicify-app/songs")).build(),
                        Song.builder().name("Cơn Mưa Ngang Qua").description("Giai điệu vui vẻ").duration("2:18").image(cloudinaryService.uploadSampleFile("img7.jpg", "8-musicify-app/songs")).file(cloudinaryService.uploadSampleFile("song1.mp3", "8-musicify-app/songs")).build(),
                        Song.builder().name("Tháng Tư Là Lời Nói Dối").description("Giai điệu vui vẻ").duration("2:35").image(cloudinaryService.uploadSampleFile("img12.jpg", "8-musicify-app/songs")).file(cloudinaryService.uploadSampleFile("song2.mp3", "8-musicify-app/songs")).build()
                    );
                    songRepo.saveAll(sampleSongs);
                    System.out.println("[Musicify] Đã nạp xong " + sampleSongs.size() + " Songs.");
                } catch (Exception e) {
                    System.err.println("[Musicify] LỖI nạp Songs: " + e.getMessage());
                }
            } else {
                System.out.println("[Musicify] Songs đã có dữ liệu. Bỏ qua.");
            }

            System.out.println("--- [Musicify] Hoàn tất kiểm tra hệ thống. ---");
        };
    }
}
