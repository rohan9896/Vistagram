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

### Get Current User

```bash
curl -X GET http://localhost:3000/api/auth/me \
  -H "Authorization: Bearer YOUR_JWT_TOKEN_HERE"
```

### Logout

```bash
curl -X POST http://localhost:3000/api/auth/logout
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

### Get All Posts

```bash
curl http://localhost:3000/api/posts
```

### Get Post by ID

```bash
curl http://localhost:3000/api/posts/1
```

### Create New Post

```bash
curl -X POST http://localhost:3000/api/posts \
  -H "Content-Type: application/json" \
  -d '{
    "userId": 1,
    "username": "mountain_explorer",
    "userAvatar": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
    "imageUrl": "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800",
    "caption": "Beautiful mountain view!",
    "location": "Swiss Alps, Switzerland",
    "likes": 0,
    "createdAt": "2024-01-01T00:00:00Z"
  }'
```

### Update Post

```bash
curl -X PUT http://localhost:3000/api/posts/1 \
  -H "Content-Type: application/json" \
  -d '{
    "caption": "Updated caption",
    "location": "New location"
  }'
```

### Delete Post

```bash
curl -X DELETE http://localhost:3000/api/posts/1
```

### Posts by Pagination

```bash
curl "http://localhost:3000/api/posts?_page=1&_limit=10"
```

## Comments

### Get All Comments

```bash
curl http://localhost:3000/api/comments
```

### Get Comment by ID

```bash
curl http://localhost:3000/api/comments/1
```

### Create New Comment

```bash
curl -X POST http://localhost:3000/api/comments \
  -H "Content-Type: application/json" \
  -d '{
    "postId": 1,
    "userId": 2,
    "username": "current_user",
    "avatar": "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=150",
    "text": "Amazing view!",
    "createdAt": "2024-01-01T00:00:00Z"
  }'
```

### Update Comment

```bash
curl -X PUT http://localhost:3000/api/comments/1 \
  -H "Content-Type: application/json" \
  -d '{
    "text": "Updated comment text"
  }'
```

### Delete Comment

```bash
curl -X DELETE http://localhost:3000/api/comments/1
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

### Create New Like

```bash
curl -X POST http://localhost:3000/api/likes \
  -H "Content-Type: application/json" \
  -d '{
    "postId": 1,
    "userId": 2,
    "createdAt": "2024-01-01T00:00:00Z"
  }'
```

### Delete Like

```bash
curl -X DELETE http://localhost:3000/api/likes/1
```
