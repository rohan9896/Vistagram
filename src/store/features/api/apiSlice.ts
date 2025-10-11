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
    getPosts: builder.query<Post[], void>({
      query: () => "/posts",
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
    createPost: builder.mutation<Post, { caption: string; imageUrl: string }>({
      query: (postData) => ({
        url: "/posts",
        method: "POST",
        body: postData,
      }),
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
} = apiSlice;
