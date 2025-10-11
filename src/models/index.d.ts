interface LoginResponse {
  success: boolean;
  token: string;
  user: {
    id: number;
    email: string;
    username: string;
    avatar: string;
    createdAt: string;
  };
  message?: string;
}

interface LogoutResponse {
  success: boolean;
  message: string;
}

interface UserResponse {
  id: number;
  email: string;
  username: string;
  avatar: string;
  createdAt: string;
}

interface LoginCredentials {
  email: string;
  password: string;
}

interface Post {
  id: number;
  userId: number;
  username: string;
  userAvatar: string;
  imageUrl: string;
  caption: string;
  location: string;
  likes: number;
  createdAt: string;
  updatedAt: string;
  isLikedByUser?: boolean;
}

interface Comment {
  id: number;
  postId: number;
  userId: number;
  username: string;
  avatar: string;
  text: string;
  createdAt: string;
}

export {
  LoginCredentials,
  LoginResponse,
  LogoutResponse,
  UserResponse,
  Post,
  Comment,
};
