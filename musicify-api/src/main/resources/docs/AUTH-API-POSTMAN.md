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
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
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

## 2. Đăng nhập

- **Method**: POST
- **URL**: `http://localhost:5000/api/login`
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
  - 200 (thành công):

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "email": "user@example.com",
  "role": "USER"
}
```

  - 401 (email hoặc mật khẩu không hợp lệ):

```json
{
  "message": "Email hoặc mật khẩu không hợp lệ"
}
```

---

## 3. Nâng quyền Admin

- **Method**: POST
- **URL**: `http://localhost:5000/api/promote-to-admin`
- **Authorization**: Bearer {admin_token}
- **Headers**:
  - `Content-Type: application/json`
- **Body** (raw JSON):

```json
{
  "email": "user@example.com"
}
```

- **Response**:
  - 200 (thành công):

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "email": "user@example.com",
  "role": "ADMIN"
}
```

  - 400 (không tìm thấy người dùng):

```json
{
  "message": "Không tìm thấy người dùng"
}
```

---

## Ghi chú chung

- **Role mặc định**: Tài khoản mới luôn được gán role `USER`.
- **JWT Token**: Cả đăng ký và đăng nhập đều trả về JWT token trong field `token`. Dùng token này cho các API yêu cầu xác thực bằng header `Authorization: Bearer {token}`.
- **Xác thực**: Mật khẩu được verify bởi Spring Security `AuthenticationManager` trước khi tạo JWT.
- **Không có validation**: Các trường `email` và `password` không có ràng buộc validation (định dạng email, độ dài mật khẩu,...).