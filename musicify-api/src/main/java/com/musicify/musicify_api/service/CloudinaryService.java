package com.musicify.musicify_api.service;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.InputStream;
import java.util.Map;

@Service
public class CloudinaryService {

    @Autowired
    private Cloudinary cloudinary;

    public String uploadSampleFile(String fileName, String folder) {
        try {
            InputStream inputStream = getClass().getClassLoader()
                    .getResourceAsStream("static/samples/" + fileName);
            
            if (inputStream == null) throw new RuntimeException("File không tìm thấy: " + fileName);

            byte[] fileBytes = inputStream.readAllBytes();
            Map uploadResult = cloudinary.uploader().upload(fileBytes, ObjectUtils.asMap(
                    "resource_type", "auto",
                    "folder", folder
            ));
            return (String) uploadResult.get("secure_url");
        } catch (Exception e) {
            throw new RuntimeException("Lỗi upload file: " + e.getMessage());
        }
    }
}
