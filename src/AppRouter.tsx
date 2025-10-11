import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import { LoginPage, Feed, SharedPost, UserProfile } from "./pages";
import { useAppSelector } from "./store/store";

const PrivateRoutes = () => {
  const { isLoggedIn } = useAppSelector((state) => state.user);

  return isLoggedIn ? <Outlet /> : <Navigate to="/login" replace />;
};

const RestrictedRoutes = () => {
  const { isLoggedIn } = useAppSelector((state) => state.user);

  return isLoggedIn ? <Navigate to={"/home"} replace /> : <Outlet />;
};

export const AppRouter: React.FC = () => {
  return (
    <Routes>
      <Route path="/shared/:postId" element={<SharedPost />} />

      <Route path="" element={<PrivateRoutes />}>
        <Route path="/home" element={<Feed />} />
        <Route path="/profile/:userId" element={<UserProfile />} />
        <Route path="/" element={<Navigate to="/home" replace />} />
      </Route>

      <Route path="" element={<RestrictedRoutes />}>
        <Route path="/login" element={<LoginPage />} />
      </Route>
    </Routes>
  );
};
