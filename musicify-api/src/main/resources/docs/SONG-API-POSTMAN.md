# Song API – Tài liệu Postman

**Base URL**: `http://localhost:5000`
**Prefix**: `/api/songs`

---

## 1. Lấy danh sách bài hát

- **Method**: GET
- **URL**: `http://localhost:5000/api/songs`
- **Authorization**: Không
- **Response**:
  - 200 (thành công):

```json
{
  "success": true,
  "songs": [
    {
      "_id": "...",
      "name": "Song Name",
      "description": "Song description",
      "album": "Album Name",
      "image": "https://res.cloudinary.com/...",
      "file": "https://res.cloudinary.com/...",
      "duration": "03:45"
    }
  ]
}
```

  - 400 (lỗi):

```json
{
  "message": "Error message here"
}
```

---

## 2. Tạo bài hát mới

- **Method**: POST
- **URL**: `http://localhost:5000/api/songs`
- **Authorization**: Không
- **Headers**:
  - `Content-Type: multipart/form-data`
- **Body** (form-data):
  - `request` (text): JSON string chứa thông tin bài hát:

```json
{
  "name": "Song Name",
  "description": "Song description",
  "album": "Album Name"
}
```

  - `audio` (file): File audio bài hát (MP3, WAV,...)
  - `image` (file): Ảnh bìa bài hát (JPEG, PNG,...)

- **Response**:
  - 201 (thành công):

```json
{
  "_id": "...",
  "name": "Song Name",
  "description": "Song description",
  "album": "Album Name",
  "image": "https://res.cloudinary.com/...",
  "file": "https://res.cloudinary.com/...",
  "duration": "03:45"
}
```

  - 400 (lỗi upload hoặc thiếu file):

```json
{
  "message": "Error message here"
}
```

---

## 3. Xóa bài hát

- **Method**: DELETE
- **URL**: `http://localhost:5000/api/songs/{id}`
- **Authorization**: Không
- **Path Parameter**:
  - `id` – ID của bài hát (MongoDB `_id`)
- **Response**:
  - 204 (thành công): Không có body trả về
  - 400 (không tìm thấy):

```json
{
  "message": "Không tìm thấy bài hát"
}
```

---

## Ghi chú chung

- **Upload file**: Audio và ảnh bìa được upload lên Cloudinary (`resource_type` của audio là `video`, ảnh là `image`).
- **Duration**: Thời lượng bài hát được tính tự động từ file audio và format theo `MM:SS`.
- **Không có xác thực**: Hiện tại các route song không yêu cầu JWT token.
- **Multipart request**: Route `POST /api/songs` dùng `multipart/form-data` — trong Postman, chọn body type là `form-data`, tạo 3 key: `request` (text, giá trị là JSON), `audio` (file), và `image` (file).