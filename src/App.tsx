import { AppRouter } from "./AppRouter";
import { Navbar } from "./components";

function App() {
  // const isLoggedIn = useSelector((state: RootState) => state.user.isLoggedIn);
  // const user = useSelector((state: RootState) => state.user.user);
  // const dispatch = useDispatch();

  return (
    <div>
      <Navbar />
      <AppRouter />
    </div>
  );
}

export default App;
