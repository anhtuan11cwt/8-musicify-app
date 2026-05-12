# Musicify — Spotify Clone Fullstack

## Tổng Quan Dự Án

Musicify là ứng dụng nghe nhạc trực tuyến được xây dựng theo mô hình Spotify, bao gồm 3 thành phần:

| Thành phần | Công nghệ | Mô tả |
|------------|-----------|-------|
| `musicify-app` | React + Vite | Ứng dụng nghe nhạc cho người dùng |
| `musicify-admin-app` | React + Vite | Trang quản trị cho admin |
| `musicify-api` | Spring Boot + MongoDB | API Backend |

---

## Công Nghệ Sử Dụng

### Frontend (React)

| Category | Công nghệ |
|----------|-----------|
| Framework | React 19 + Vite 8 |
| Styling | Tailwind CSS 4 |
| Routing | React Router DOM 7 |
| HTTP Client | Axios |
| Icons | Lucide React |
| Notifications | React Hot Toast |
| Font | Urbanist |

### Backend (Spring Boot)

| Category | Công nghệ |
|----------|-----------|
| Framework | Spring Boot 3.5.x |
| Language | Java 21 |
| Database | MongoDB |
| Security | Spring Security + JWT |
| File Storage | Cloudinary |

---

## Cấu Trúc Thư Mục

### musicify-app (User Frontend)

```
musicify-app/
├── src/
│   ├── assets/                  # Hình ảnh, icons, audio mẫu
│   ├── components/              # UI components
│   │   ├── AlbumItem.jsx        # Component hiển thị album
│   │   ├── AuthWrapper.jsx     # Wrapper xác thực người dùng
│   │   ├── Navbar.jsx          # Thanh điều hướng
│   │   ├── Player.jsx           # Music player
│   │   ├── Sidebar.jsx          # Thanh bên
│   │   └── SongItem.jsx         # Component hiển thị bài hát
│   ├── context/                 # React Context
│   │   ├── AuthContext.jsx      # Context xác thực
│   │   ├── AuthContextProvider.jsx
│   │   ├── PlayerContext.jsx    # Context quản lý player & data
│   │   ├── PlayerContextValue.jsx
│   │   ├── SearchContext.jsx    # Context tìm kiếm
│   │   └── SearchContextValue.jsx
│   ├── hooks/
│   │   └── useAuth.js           # Hook sử dụng AuthContext
│   ├── pages/
│   │   ├── DisplayAlbum.jsx     # Trang chi tiết album
│   │   ├── DisplayHome.jsx      # Trang chủ dashboard
│   │   ├── Login.jsx            # Form đăng nhập
│   │   ├── Register.jsx         # Form đăng ký
│   │   └── Search.jsx           # Trang tìm kiếm
│   ├── App.jsx                  # Component chính
│   ├── main.jsx                 # Entry point
│   └── index.css                # Global styles (Tailwind)
├── .env                         # Biến môi trường
├── package.json
└── vite.config.js
```

### musicify-admin-app (Admin Frontend)

```
musicify-admin-app/
├── src/
│   ├── assets/
│   │   └── assets.js            # Icons, hình ảnh
│   ├── components/
│   │   ├── Navbar.jsx           # Thanh điều hướng
│   │   ├── Sidebar.jsx          # Thanh bên
│   │   └── LoadingSpinner.jsx   # Component loading
│   ├── context/
│   │   └── AuthContext.jsx      # Context xác thực admin
│   ├── hooks/
│   │   └── useAuth.js            # Hook sử dụng AuthContext
│   ├── layout/
│   │   └── DashboardLayout.jsx  # Layout chính dashboard
│   ├── pages/
│   │   ├── Login.jsx             # Form đăng nhập admin
│   │   ├── AddAlbum.jsx          # Trang thêm album
│   │   ├── AddSong.jsx           # Trang thêm bài hát
│   │   ├── ListAlbums.jsx        # Trang danh sách album
│   │   └── ListSongs.jsx         # Trang danh sách bài hát
│   ├── routes/
│   │   └── ProtectedRoute.jsx    # Route bảo vệ (chỉ admin)
│   ├── services/
│   │   └── apiService.js         # API service với interceptor
│   ├── App.jsx                  # Component chính
│   ├── main.jsx                 # Entry point
│   └── index.css                # Global styles (Tailwind)
├── .env
├── package.json
└── vite.config.js
```

### musicify-api (Backend)

```
musicify-api/
├── src/main/java/com/musicify/musicify_api/
│   ├── config/
│   │   ├── CloudinaryConfig.java       # Cấu hình Cloudinary
│   │   ├── DataInitializer.java        # Khởi tạo dữ liệu mặc định
│   │   └── SecurityConfig.java        # Cấu hình Spring Security
│   ├── controller/
│   │   ├── AlbumController.java        # API quản lý album
│   │   ├── AuthController.java         # API xác thực
│   │   ├── RootController.java         # Health check
│   │   └── SongController.java         # API quản lý bài hát
│   ├── dto/
│   │   ├── AlbumListResponse.java      # Response danh sách album
│   │   ├── AlbumRequest.java           # Request thêm album
│   │   ├── AuthResponse.java           # Response xác thực
│   │   ├── LoginRequest.java           # Request đăng nhập
│   │   ├── PromoteRequest.java         # Request thăng role
│   │   ├── RegisterRequest.java        # Request đăng ký
│   │   ├── SongListResponse.java       # Response danh sách bài hát
│   │   └── SongRequest.java            # Request thêm bài hát
│   ├── document/
│   │   ├── Album.java                  # Document Album
│   │   ├── Song.java                   # Document Bài hát
│   │   └── User.java                   # Document User
│   ├── enums/
│   │   └── Role.java                   # Enum role (USER, ADMIN)
│   ├── repository/
│   │   ├── AlbumRepository.java        # Repository Album
│   │   ├── SongRepository.java         # Repository Bài hát
│   │   └── UserRepository.java         # Repository User
│   ├── security/
│   │   ├── JwtAuthenticationFilter.java # Filter xử lý JWT
│   │   └── JwtUtil.java                 # Utility tạo/validate JWT
│   ├── service/
│   │   ├── AlbumService.java          # Service Album
│   │   ├── CloudinaryService.java      # Service upload Cloudinary
│   │   ├── DataInitializationService.java # Service khởi tạo data
│   │   ├── SongService.java            # Service Bài hát
│   │   └── security/
│   │       └── AppUserDetailsService.java # UserDetails Service
│   └── MusicifyApiApplication.java      # Main Application
├── pom.xml
└── src/main/resources/
    └── application.properties          # Cấu hình ứng dụng
```

---

## Tính Năng

### User App (musicify-app)

- **Xác thực**: Đăng ký, đăng nhập, auto-login, đăng xuất
- **Dashboard**: Hiển thị album và bài hát
- **Chi tiết album**: Gradient background, danh sách bài hát
- **Music Player**: Play/Pause, Next/Previous, Seek bar, Volume
- **Tìm kiếm**: Real-time search với hỗ trợ tiếng Việt không dấu

### Admin App (musicify-admin-app)

- **Đăng nhập admin**: Xác thực với role ADMIN
- **Quản lý album**: Thêm mới, xem danh sách, xóa
- **Quản lý bài hát**: Thêm mới (upload audio + ảnh), xem danh sách, xóa

### Backend API (musicify-api)

- **Album CRUD**: Thêm, lấy danh sách, xóa album
- **Song CRUD**: Thêm (tự động tính duration), lấy danh sách, xóa
- **Auth**: Đăng ký, đăng nhập, JWT token
- **Authorization**: Phân quyền USER/ADMIN
- **Cloudinary**: Upload file ảnh và audio
- **Admin mặc định**: Tự động tạo tài khoản admin@musify.com / admin123

---

## API Endpoints

| Method | Endpoint | Role | Mô tả |
|--------|----------|------|-------|
| POST | `/api/register` | All | Đăng ký tài khoản |
| POST | `/api/login` | All | Đăng nhập |
| GET | `/api/health` | All | Health check |
| GET | `/api/albums` | USER/ADMIN | Lấy danh sách album |
| POST | `/api/albums` | ADMIN | Thêm album |
| DELETE | `/api/albums/{id}` | ADMIN | Xóa album |
| GET | `/api/songs` | USER/ADMIN | Lấy danh sách bài hát |
| POST | `/api/songs` | ADMIN | Thêm bài hát |
| DELETE | `/api/songs/{id}` | ADMIN | Xóa bài hát |
| POST | `/api/promote-to-admin` | ADMIN | Thăng role user lên admin |

---

## Cấu Hình Môi Trường

### Frontend (.env)

```env
# musicify-app/.env
VITE_API_BASE_URL=http://localhost:8080/api

# musicify-admin-app/.env
VITE_API_BASE_URL=http://localhost:8080/api
```

### Backend (application.properties)

```properties
spring.data.mongodb.uri=mongodb://localhost:27017/musifyapp

cloudinary.cloud_name=your_cloud_name
cloudinary.api_key=your_api_key
cloudinary.api_secret=your_api_secret

jwt.secret=your_jwt_secret
jwt.expiration=86400000
```

---

## Cách Chạy Dự Án

### Yêu Cầu

- Node.js v22.x trở lên
- JDK 21
- MongoDB (local hoặc Atlas)

### Backend

```bash
cd musicify-api
./mvnw spring-boot:run
# Chạy tại http://localhost:8080
```

### User App

```bash
cd musicify-app
npm install
npm run dev
# Chạy tại http://localhost:5173
```

### Admin App

```bash
cd musicify-admin-app
npm install
npm run dev
# Chạy tại http://localhost:5174
```

---

## Tài Khoản Demo

| Role | Email | Password |
|------|-------|----------|
| Admin | admin@musify.com | admin123 |
| User | (đăng ký mới) | (tự đặt) |

---

## Giấy Phép

MIT License