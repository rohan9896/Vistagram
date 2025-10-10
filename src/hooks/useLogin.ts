import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../store/store";
import {
  loginStart,
  loginFailed,
  loginSuccess,
} from "../store/features/auth/userSlice";

export function useLogin() {
  const dispatch = useAppDispatch();
  const { error, status } = useAppSelector((state) => state.user);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const handleLogin = (e: React.FormEvent<HTMLDivElement>) => {
    e.preventDefault();
    dispatch(loginStart());

    // TODO: mockng user for now
    setTimeout(() => {
      if (email === "test@example.com" && password === "password") {
        dispatch(loginSuccess({ email }));
      } else {
        dispatch(loginFailed("Invalid email or password"));
      }
    }, 1000);
  };

  return {
    email,
    password,
    rememberMe,
    error,
    status,

    setEmail,
    setPassword,
    setRememberMe,

    handleLogin,
  };
}
