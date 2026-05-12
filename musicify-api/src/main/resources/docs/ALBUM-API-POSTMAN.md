# Album API – Tài liệu Postman

**Base URL**: `http://localhost:5000`
**Prefix**: `/api/albums`

---

## 1. Lấy danh sách album

- **Method**: GET
- **URL**: `http://localhost:5000/api/albums`
- **Authorization**: Không
- **Response**:
  - 200 (thành công):

```json
{
  "success": true,
  "albums": [
    {
      "_id": "...",
      "name": "Album Name",
      "description": "Album description",
      "bgColor": "#ffffff",
      "image": "https://res.cloudinary.com/..."
    }
  ]
}
```

---

## 2. Tạo album mới

- **Method**: POST
- **URL**: `http://localhost:5000/api/albums`
- **Authorization**: Không
- **Headers**:
  - `Content-Type: multipart/form-data`
- **Body** (form-data):
  - `request` (text): JSON string chứa thông tin album:

```json
{
  "name": "Album Name",
  "description": "Album description",
  "bgColor": "#1db954"
}
```

  - `file` (file): Ảnh bìa album (JPEG, PNG,...)

- **Response**:
  - 201 (thành công):

```json
{
  "success": true,
  "albums": [
    {
      "_id": "...",
      "name": "Album Name",
      "description": "Album description",
      "bgColor": "#1db954",
      "image": "https://res.cloudinary.com/..."
    }
  ]
}
```

  - 400 (file ảnh rỗng):

```json
{
  "message": "Image file cannot be empty"
}
```

  - 400 (lỗi upload ảnh):

```json
{
  "message": "Failed to upload image to Cloudinary"
}
```

---

## 3. Xóa album

- **Method**: DELETE
- **URL**: `http://localhost:5000/api/albums/{id}`
- **Authorization**: Không
- **Path Parameter**:
  - `id` – ID của album (MongoDB `_id`)
- **Response**:
  - 204 (thành công): Không có body trả về
  - 400 (lỗi):

```json
{
  "message": "Error message here"
}
```

---

## Ghi chú chung

- **Upload ảnh**: Ảnh bìa album được upload lên Cloudinary, trả về URL trong field `image`.
- **Không có xác thực**: Hiện tại các route album không yêu cầu JWT token.
- **Multipart request**: Route `POST /api/albums` dùng `multipart/form-data` — trong Postman, chọn body type là `form-data`, tạo 2 key: `request` (text, giá trị là JSON) và `file` (file).
