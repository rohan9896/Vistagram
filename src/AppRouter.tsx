import { Route, Routes } from "react-router-dom";
import LoginPage from "./components/LoginPage";

export const AppRouter: React.FC = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
    </Routes>
  );
};
