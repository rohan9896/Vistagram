import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "./store/store";
import { logout } from "./store/features/auth/userSlice";
import LoginPage from "./components/LoginPage";
import { AppRouter } from "./AppRouter";

function App() {
  // const isLoggedIn = useSelector((state: RootState) => state.user.isLoggedIn);
  // const user = useSelector((state: RootState) => state.user.user);
  // const dispatch = useDispatch();

  return (
    <div>
      <AppRouter />
    </div>
  );
}

export default App;
