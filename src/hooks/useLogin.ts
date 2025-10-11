import { useState } from "react";
import {
  useLoginMutation,
  useLogoutMutation,
} from "../store/features/api/apiSlice";
import { useAppDispatch } from "../store/store";
import { logout as logoutAction } from "../store/features/auth/userSlice";
import { useNavigate } from "react-router-dom";

export function useLogin() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [login, { isLoading: isLoginLoading, error: loginError }] =
    useLoginMutation();
  const [logout, { isLoading: isLogoutLoading }] = useLogoutMutation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const navigateToLogin = () => navigate("/login", { replace: true });

  const handleLogin = async (e: React.FormEvent<HTMLDivElement>) => {
    e.preventDefault();
    try {
      await login({ email, password }).unwrap();
    } catch (error) {
      console.error("Login failed:", error);
    } finally {
      setEmail("");
      setPassword("");
      setRememberMe(false);
    }
  };

  const handleLogout = async () => {
    try {
      await logout().unwrap();
      dispatch(logoutAction());
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return {
    email,
    password,
    rememberMe,

    setEmail,
    setPassword,
    setRememberMe,

    handleLogin,
    isLoginLoading,
    loginError,

    handleLogout,
    isLogoutLoading,

    isLoading: isLoginLoading || isLogoutLoading,

    navigateToLogin,
  };
}
