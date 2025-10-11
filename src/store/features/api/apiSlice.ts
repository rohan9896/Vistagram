import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type {
  LoginCredentials,
  LoginResponse,
  LogoutResponse,
  UserResponse,
  Post,
  Comment,
} from "../../../models";

interface CloudinaryUploadResponse {
  secure_url: string;
  url: string;
}

import type { RootState } from "../../store";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000/api",
    prepareHeaders: (headers, { getState }) => {
      const state = getState() as RootState;
      const token = state.user.token;

      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  refetchOnMountOrArgChange: true,
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginCredentials>({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
      }),
      transformErrorResponse: (response: any) => {
        return {
          status: response.status,
          data: response.data?.message || "Login failed. Please try again.",
        };
      },
    }),
    logout: builder.mutation<LogoutResponse, void>({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
    }),
    getCurrentUser: builder.query<UserResponse, void>({
      query: () => "/auth/me",
    }),
    getPosts: builder.query<Post[], { page?: number; limit?: number }>({
      query: ({ page = 1, limit = 10 } = {}) => ({
        url: "/posts",
        params: {
          _page: page,
          _limit: limit,
          _sort: "createdAt",
          _order: "desc",
        },
      }),
    }),
    getComments: builder.query<Comment[], number>({
      query: (postId) => `/comments?postId=${postId}`,
    }),
    uploadImageToCloudinary: builder.mutation<CloudinaryUploadResponse, File>({
      queryFn: async (imageFile) => {
        try {
          const formData = new FormData();
          formData.append("file", imageFile);
          formData.append(
            "upload_preset",
            import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET
          );

          const response = await fetch(
            `https://api.cloudinary.com/v1_1/${
              import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
            }/upload`,
            {
              method: "POST",
              body: formData,
            }
          );

          if (!response.ok) {
            throw new Error(`Upload failed: ${response.statusText}`);
          }

          const data = await response.json();
          return { data };
        } catch (error: any) {
          return { error: { status: "FETCH_ERROR", error: error.message } };
        }
      },
    }),
    createPost: builder.mutation<
      Post,
      {
        userId: number;
        username: string;
        userAvatar: string;
        imageUrl: string;
        caption: string;
        location?: string;
        likes?: number;
        createdAt?: string;
      }
    >({
      query: (postData) => ({
        url: "/posts",
        method: "POST",
        body: postData,
      }),
      transformErrorResponse: (response: any) => {
        return {
          status: response.status,
          data:
            response.data?.message ||
            "Failed to create post. Please try again.",
        };
      },
    }),
    createLike: builder.mutation<
      { id: number; postId: number; userId: number; createdAt: string },
      { postId: number; userId: number }
    >({
      query: (likeData) => ({
        url: "/likes",
        method: "POST",
        body: {
          ...likeData,
          createdAt: new Date().toISOString(),
        },
      }),
    }),
    deleteLike: builder.mutation<void, { likeId: number; postId: number }>({
      query: ({ likeId }) => ({
        url: `/likes/${likeId}`,
        method: "DELETE",
      }),
    }),
    getLikeByPostAndUser: builder.query<
      { id: number; postId: number; userId: number; createdAt: string } | null,
      { postId: number; userId: number }
    >({
      query: ({ postId, userId }) => `/likes?postId=${postId}&userId=${userId}`,
      transformResponse: (response: any[]) => {
        return response.length > 0 ? response[0] : null;
      },
    }),
    createComment: builder.mutation<
      Comment,
      {
        postId: number;
        userId: number;
        username: string;
        avatar: string;
        text: string;
      }
    >({
      query: (commentData) => ({
        url: "/comments",
        method: "POST",
        body: {
          ...commentData,
          createdAt: new Date().toISOString(),
        },
      }),
      transformErrorResponse: (response: any) => {
        return {
          status: response.status,
          data:
            response.data?.message ||
            "Failed to create comment. Please try again.",
        };
      },
    }),
    createSharedPost: builder.mutation<
      {
        id: number;
        postId: number;
        sharedAt: string;
        shareUrl: string;
      },
      { postId: number }
    >({
      query: (shareData) => ({
        url: "/shared-posts",
        method: "POST",
        body: shareData,
      }),
      transformErrorResponse: (response: any) => {
        return {
          status: response.status,
          data:
            response.data?.message ||
            "Failed to create shared post. Please try again.",
        };
      },
    }),
    getPostLikers: builder.query<UserResponse[], number>({
      query: (postId) => `/posts/${postId}/likers`,
      transformErrorResponse: (response: any) => {
        return {
          status: response.status,
          data:
            response.data?.message ||
            "Failed to fetch users who liked this post.",
        };
      },
    }),
    getUserById: builder.query<UserResponse, string>({
      query: (userId) => `/users/${userId}`,
      transformErrorResponse: (response: any) => {
        return {
          status: response.status,
          data: response.data?.message || "Failed to fetch user information.",
        };
      },
    }),
    getPostsByUserId: builder.query<
      Post[],
      { userId: string; page?: number; limit?: number }
    >({
      query: ({ userId, page = 1, limit = 10 }) => ({
        url: "/posts",
        params: {
          userId,
          _sort: "createdAt",
          _order: "desc",
          _page: page,
          _limit: limit,
        },
      }),
      transformErrorResponse: (response: any) => {
        return {
          status: response.status,
          data: response.data?.message || "Failed to fetch user posts.",
        };
      },
    }),
  }),
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useGetCurrentUserQuery,
  useGetPostsQuery,
  useGetCommentsQuery,
  useUploadImageToCloudinaryMutation,
  useCreatePostMutation,
  useCreateLikeMutation,
  useDeleteLikeMutation,
  useGetLikeByPostAndUserQuery,
  useCreateCommentMutation,
  useGetPostLikersQuery,
  useCreateSharedPostMutation,
  useGetUserByIdQuery,
  useGetPostsByUserIdQuery,
} = apiSlice;
