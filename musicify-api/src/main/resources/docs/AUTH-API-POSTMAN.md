# Auth API – Tài liệu Postman

**Base URL**: `http://localhost:5000`
**Prefix**: `/api`

---

## 1. Đăng ký tài khoản

- **Method**: POST
- **URL**: `http://localhost:5000/api/register`
- **Authorization**: Không
- **Headers**:
  - `Content-Type: application/json`
- **Body** (raw JSON):

```json
{
  "email": "user@example.com",
  "password": "123456"
}
```

- **Response**:
  - 201 (thành công):

```json
{
  "token": "",
  "email": "user@example.com",
  "role": "USER"
}
```

  - 400 (email đã tồn tại):

```json
{
  "message": "Email đã tồn tại"
}
```

---

## Ghi chú chung

- **Role mặc định**: Tài khoản mới luôn được gán role `USER`.
- **Token rỗng**: Sau đăng ký, `token` trả về là chuỗi rỗng. Client cần gọi API đăng nhập riêng (nếu có) để nhận JWT token.
- **Không gửi email**: Hiện tại không có email chào mừng hay xác thực email sau khi đăng ký.
- **Không có validation**: Các trường `email` và `password` không có ràng buộc validation (định dạng email, độ dài mật khẩu,...).