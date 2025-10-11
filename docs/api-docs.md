# API Documentation

Base URL: `http://localhost:3000`

## Authentication

### Login

```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password"
  }'
```

**Response:**

```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "email": "test@example.com",
    "username": "mountain_explorer",
    "avatar": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
    "createdAt": "2024-01-01T00:00:00Z"
  }
}
```

### Get Current User

```bash
curl -X GET http://localhost:3000/api/auth/me \
  -H "Authorization: Bearer YOUR_JWT_TOKEN_HERE"
```

**Response:**

```json
{
  "id": 1,
  "email": "test@example.com",
  "username": "mountain_explorer",
  "avatar": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
  "createdAt": "2024-01-01T00:00:00Z"
}
```

### Logout

```bash
curl -X POST http://localhost:3000/api/auth/logout
```

**Response:**

```json
{
  "success": true,
  "message": "Logged out successfully"
}
```

## Users

### Get All Users

```bash
curl http://localhost:3000/api/users
```

### Get User by ID

```bash
curl http://localhost:3000/api/users/1
```

### Create New User

```bash
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{
    "email": "newuser@example.com",
    "password": "newpassword",
    "username": "new_user",
    "avatar": "https://example.com/avatar.jpg",
    "createdAt": "2024-01-01T00:00:00Z"
  }'
```

### Update User

```bash
curl -X PUT http://localhost:3000/api/users/1 \
  -H "Content-Type: application/json" \
  -d '{
    "username": "updated_username",
    "avatar": "https://new-avatar-url.com/image.jpg"
  }'
```

### Delete User

```bash
curl -X DELETE http://localhost:3000/api/users/1
```

## Posts

### Get All Posts (with Like Status)

```bash
curl http://localhost:3000/api/posts \
  -H "Authorization: Bearer YOUR_JWT_TOKEN_HERE"
```

**Features:**

- Returns posts with `isLikedByUser` field when authenticated
- Sorted by `createdAt` in descending order
- Includes like counts

**Response:**

```json
[
  {
    "id": 1,
    "userId": 1,
    "username": "mountain_explorer",
    "userAvatar": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
    "imageUrl": "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800",
    "caption": "Beautiful mountain view!",
    "location": "Swiss Alps, Switzerland",
    "likes": 5,
    "createdAt": "2024-01-01T00:00:00Z",
    "updatedAt": "2024-01-01T00:00:00Z",
    "isLikedByUser": true
  }
]
```

### Get Post by ID

```bash
curl http://localhost:3000/api/posts/1 \
  -H "Authorization: Bearer YOUR_JWT_TOKEN_HERE"
```

### Create New Post

```bash
curl -X POST http://localhost:3000/api/posts \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN_HERE" \
  -d '{
    "userId": 1,
    "username": "mountain_explorer",
    "userAvatar": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
    "imageUrl": "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800",
    "caption": "Beautiful mountain view!",
    "location": "Swiss Alps, Switzerland",
    "likes": 0
  }'
```

### Update Post

```bash
curl -X PUT http://localhost:3000/api/posts/1 \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN_HERE" \
  -d '{
    "caption": "Updated caption",
    "location": "New location"
  }'
```

### Delete Post

```bash
curl -X DELETE http://localhost:3000/api/posts/1 \
  -H "Authorization: Bearer YOUR_JWT_TOKEN_HERE"
```

### Posts with Pagination

```bash
curl "http://localhost:3000/api/posts?_page=1&_limit=10&_sort=createdAt&_order=desc" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN_HERE"
```

### Get Users Who Liked a Post

```bash
curl http://localhost:3000/api/posts/1/likers \
  -H "Authorization: Bearer YOUR_JWT_TOKEN_HERE"
```

**Response:**

```json
[
  {
    "id": 2,
    "email": "user2@example.com",
    "username": "travel_enthusiast",
    "avatar": "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=150",
    "createdAt": "2024-01-01T00:00:00Z"
  },
  {
    "id": 3,
    "email": "user3@example.com",
    "username": "sarah_wilson",
    "avatar": "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150",
    "createdAt": "2024-01-02T10:30:00Z"
  }
]
```

## Comments

### Get All Comments

```bash
curl http://localhost:3000/api/comments
```

### Get Comments by Post ID

```bash
curl http://localhost:3000/api/comments?postId=1
```

**Response:**

```json
[
  {
    "id": 1,
    "postId": 1,
    "userId": 2,
    "username": "travel_enthusiast",
    "avatar": "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=150",
    "text": "Absolutely stunning! The Swiss Alps are on my bucket list.",
    "createdAt": "2025-01-15T09:15:00Z"
  }
]
```

### Get Comment by ID

```bash
curl http://localhost:3000/api/comments/1
```

### Create New Comment

```bash
curl -X POST http://localhost:3000/api/comments \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN_HERE" \
  -d '{
    "postId": 1,
    "userId": 2,
    "username": "current_user",
    "avatar": "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=150",
    "text": "Amazing view!"
  }'
```

**Note:** `createdAt` is automatically added by the server.

**Response:**

```json
{
  "id": 6,
  "postId": 1,
  "userId": 2,
  "username": "current_user",
  "avatar": "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=150",
  "text": "Amazing view!",
  "createdAt": "2025-01-15T12:30:00Z"
}
```

### Update Comment

```bash
curl -X PUT http://localhost:3000/api/comments/1 \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN_HERE" \
  -d '{
    "text": "Updated comment text"
  }'
```

### Delete Comment

```bash
curl -X DELETE http://localhost:3000/api/comments/1 \
  -H "Authorization: Bearer YOUR_JWT_TOKEN_HERE"
```

## Likes

### Get All Likes

```bash
curl http://localhost:3000/api/likes
```

### Get Like by ID

```bash
curl http://localhost:3000/api/likes/1
```

### Get Like by Post and User

```bash
curl "http://localhost:3000/api/likes?postId=1&userId=2" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN_HERE"
```

**Response:**

```json
[
  {
    "id": 1,
    "postId": 1,
    "userId": 2,
    "createdAt": "2025-01-15T12:15:55.810Z"
  }
]
```

### Create New Like (with Duplicate Prevention)

```bash
curl -X POST http://localhost:3000/api/likes \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN_HERE" \
  -d '{
    "postId": 1,
    "userId": 2
  }'
```

**Features:**

- Prevents duplicate likes (same postId + userId combination)
- Automatically updates post like count
- Automatically adds `createdAt` timestamp

**Success Response:**

```json
{
  "id": 5,
  "postId": 1,
  "userId": 2,
  "createdAt": "2025-01-15T12:30:00Z"
}
```

**Duplicate Error Response (409):**

```json
{
  "error": "User has already liked this post"
}
```

### Delete Like (Unlike)

```bash
curl -X DELETE http://localhost:3000/api/likes/1 \
  -H "Authorization: Bearer YOUR_JWT_TOKEN_HERE"
```

**Features:**

- Automatically updates post like count (decrements)
- Removes the like record from database

## Image Upload

### Upload Image to Cloudinary

```bash
curl -X POST https://api.cloudinary.com/v1_1/YOUR_CLOUD_NAME/upload \
  -F "file=@/path/to/image.jpg" \
  -F "upload_preset=YOUR_UPLOAD_PRESET"
```

**Response:**

```json
{
  "secure_url": "https://res.cloudinary.com/your-cloud/image/upload/v1234567890/sample.jpg",
  "url": "http://res.cloudinary.com/your-cloud/image/upload/v1234567890/sample.jpg"
}
```

## Server Features

### Duplicate Like Prevention

- Server automatically prevents duplicate likes for the same post and user combination
- Returns 409 Conflict error if duplicate like is attempted

### Automatic Like Count Updates

- Post like counts are automatically updated when likes are created or deleted
- No manual intervention required

### Database Cleanup on Startup

- Server automatically removes duplicate likes on startup
- Recalculates post like counts to ensure data consistency

### JWT Authentication

- All protected endpoints require JWT token in Authorization header
- Token format: `Bearer YOUR_JWT_TOKEN_HERE`

### Error Handling

- Consistent error responses across all endpoints
- Proper HTTP status codes
- Descriptive error messages
