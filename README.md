# Vistagram - Local Development Setup

This guide will help you set up the Vistagram project locally. The project consists of a React Vite SPA frontend and a JSON Server backend.

## Testing Credentials
Email: test@example.com
Password: password

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (version 16 or higher)
- **npm** (comes with Node.js)
- **Git** (for cloning the repository)

## Project Structure

```
vistagram/
├── src/                    # React frontend source code
├── server/                 # JSON Server backend
│   ├── db.json            # Database file
│   └── server.js          # Custom server with auth middleware
├── public/                # Static assets
├── .env                   # Environment variables
└── package.json           # Dependencies and scripts
```

## Installation Steps

### 1. Clone the Repository

```bash
git clone <repository-url>
cd vistagram
```

### 2. Install Dependencies

```bash
npm install
```

This will install all dependencies for both the frontend and backend.

### 3. Environment Configuration

The project includes a `.env` file with the following configuration:

```env
VITE_CLOUDINARY_CLOUD_NAME=<>
VITE_CLOUDINARY_API_KEY=<>
VITE_CLOUDINARY_API_SECRET=<>
VITE_CLOUDINARY_UPLOAD_PRESET=<>
JWT_SECRET=<>
VITE_API_BASE_URL=http://localhost:3000
```

**Note:** For production, make sure to update these values with your own Cloudinary credentials and a secure JWT secret.

## Running the Application

You need to run both the backend server and frontend development server simultaneously.

### Run Both Servers Separately

#### Terminal 1 - Start the Backend Server

```bash
npm run json-server
```

This starts the JSON Server on `http://localhost:3000` with custom authentication middleware.

For development with auto-restart on changes:

```bash
npm run json-server:dev
```

#### Terminal 2 - Start the Frontend Development Server

```bash
npm run dev
```

This starts the Vite development server, typically on `http://localhost:5173`.

## Available Scripts

- `npm run dev` - Start Vite development server
- `npm run build` - Build the project for production
- `npm run preview` - Preview the production build
- `npm run lint` - Run ESLint
- `npm run json-server` - Start JSON Server backend
- `npm run json-server:dev` - Start JSON Server with nodemon (auto-restart)

## API Contracts

### Authentication

- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user info
- `POST /api/auth/logout` - User logout

### Posts

- `GET /api/posts` - Get all posts
- `POST /api/posts` - Create a new post
- `GET /api/posts/:id` - Get specific post
- `PUT /api/posts/:id` - Update post
- `DELETE /api/posts/:id` - Delete post

### Users

- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get specific user

### Likes

- `POST /api/likes` - Like a post
- `DELETE /api/likes/:id` - Unlike a post
- `GET /api/posts/:id/likers` - Get users who liked a post

### Comments

- `GET /api/comments` - Get all comments
- `POST /api/comments` - Create a comment

### Shared Posts

- `POST /api/shared-posts` - Share a post
- `GET /api/shared-posts/:id` - Get shared post (no auth required)

## Database

The project uses JSON Server with a `server/db.json` file as the database. The database includes:

- **users** - User accounts with authentication
- **posts** - User posts with images and content
- **comments** - Post comments
- **likes** - Post likes
- **sharedPosts** - Shared post references

### ⚠️ Data Persistence Notice

**Important**: This demo uses an in-memory JSON Server deployed on Render's free plan. Due to the following limitations, newly created data may not persist:

- **Server Sleep**: Render free tier puts inactive services to sleep after 15 minutes of inactivity
- **Memory Reset**: When the server restarts, it resets to the original `db.json` state
- **Data Loss**: Any posts, comments, or likes created during your session will be lost when the server goes to sleep

**For Local Development**: When running locally with `npm run json-server`, all data persists normally to your local `server/db.json` file.

## Features

- **Authentication** - JWT-based user authentication
- **Posts** - Create, read, update, delete posts
- **Image Upload** - Cloudinary integration for image uploads
- **Likes & Comments** - Interactive post engagement
- **Post Sharing** - Share posts with public URLs
- **Responsive Design** - Chakra UI components
- **State Management** - Redux Toolkit with persistence

## Development Tips

1. **Hot Reload**: Both servers support hot reload - changes will automatically refresh
2. **API Testing**: Use tools like Postman or curl to test API endpoints
3. **Database Reset**: To reset the database, restore `server/db.json` from backup
4. **Environment Variables**: Frontend env vars must be prefixed with `VITE_`

### Authentication Issues

- Verify JWT_SECRET is set in `.env`
- Check that the token is being sent in the Authorization header
- Ensure the user exists in `server/db.json`

## Production Build

To build for production:

```bash
npm run build
```

The built files will be in the `dist/` directory, ready for deployment.

---

# Architectural Choices

## UI Framework: Chakra UI over Tailwind CSS

**Choice:** Chakra UI provides pre-built, accessible components with built-in theming and customization capabilities, reducing development time compared to utility-first approaches.

## State Management: Redux Toolkit over Context API

**Choice:** Redux Toolkit offers better developer experience with DevTools, time-travel debugging, and structured state management patterns for complex application state.

## Backend: JSON Server over SQL Database

**Choice:** JSON Server allows rapid prototyping and frontend-focused development without the complexity of database setup, migrations, and ORM configuration.

## API Layer: RTK Query over Axios/Fetch

**Choice:** RTK Query provides hooks with built-in loading, error, and data states, eliminating the need for manual useState management in components.

## Authentication: JWT with Redux Persist

**Choice:** JWT tokens with session storage persistence maintain user sessions in the session storage while providing stateless authentication for the API.

## Image Storage: Cloudinary Integration

**Choice:** Cloudinary handles image optimization, transformations, and CDN delivery without requiring server-side file management or storage infrastructure.

## Location Services: OpenStreetMap API

**Choice:** OpenStreetMap API provides free reverse geocoding to convert latitude/longitude coordinates into human-readable addresses without API key requirements.

## Development Server: Vite over Create React App

**Choice:** Vite offers faster hot module replacement, optimized build times, and modern ES modules support for improved development experience.

## Type Safety: TypeScript

**Choice:** TypeScript provides compile-time error detection, better IDE support, and improved code maintainability for larger React applications.

---

# Features & Design Patterns

## UI/UX Features

### Infinite Scroll Pagination

**Implementation:** Load-more button pattern with automatic pagination for post listings, preventing performance issues with large datasets while maintaining user control.

### Optimistic UI Updates

**Implementation:** Immediate like/unlike feedback with rollback on failure, providing instant user interaction response while handling network delays gracefully.

### Real-time Location Services

**Implementation:** Automatic geolocation detection with OpenStreetMap reverse geocoding for human-readable addresses in post creation workflow.

### Progressive Image Loading

**Implementation:** Image preview during upload with loading states, ensuring smooth user experience during file processing and network operations.

### Share with Clipboard Integration

**Implementation:** One-click post sharing that generates shareable URLs (with no auth reqired) and automatically copies them to clipboard, with fallback toast notifications for unsupported browsers.

## Design Patterns

### Container-Presentation Pattern

**Implementation:** `AllPostsContainer` and `UserPostContainer` handles data fetching and state management while `PostList` focuses purely on rendering, ensuring clear separation of concerns.

### Custom Hooks Pattern

**Implementation:** `useLogin` hook encapsulates authentication logic, form state, and navigation, promoting reusability and cleaner component code.

### Compound Component Pattern

**Implementation:** Modal and drawer components with disclosure hooks, providing flexible and composable UI building blocks with consistent behavior.

### Utility-First Helpers

**Implementation:** Centralized utility functions like `formatTimestamp` for consistent data formatting across components, promoting code reuse and maintainability.

---

# API Documentation

Base URL: `http://localhost:3000` / `https://vistagram-pkne.onrender.com`

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
