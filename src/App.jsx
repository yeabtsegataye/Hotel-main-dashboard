import { Route, Routes, useLocation } from "react-router-dom";
import Footer from "./components/Footer";
import "@fortawesome/fontawesome-free/css/all.min.css"; // Import Font Awesome
import Header from "./components/Header";
import SideBar from "./components/SideBar";
import { Dashboard } from "./pages/Dashboard";
import { Notfound } from "./pages/Notfound";
import Login from "./auth/Login";
import { Signup } from "./auth/Signup";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useRefreshToken from "./hooks/useRefreshToken";
import verifyToken from "./middleware/verifiToken";
import AllCategory from "./pages/Category/AllCategory"; // Direct import without lazy loading
import NewCategory from "./pages/Category/NewCategory"; // Direct import without lazy loading
import AllEmployee from "./pages/Employee/AllEmployee"; // Direct import without lazy loading
import NewEmployee from "./pages/Employee/NewEmployee"; // Direct import without lazy loading
import Add_food_list from "./pages/Food/Add_food_list";
import Profile from "./pages/Setting/Profile";
import Add_bills from "./pages/Bills/Add_bills";
import Get_bills from "./pages/Bills/Get_bills";
import { Get_food_list } from "./pages/Food/Get_food_list";
import { Orders } from "./pages/Orders/Orders";
import { Ingrediants } from "./pages/Ingrediants/Ingrediants";
import { Comment } from "./pages/Feedback/Comment";

function App() {
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const refresh = useRefreshToken();
  const dispatch = useDispatch();
  const [isVerified, setIsVerified] = useState(false);

  useEffect(() => {
    if (isInitialLoad) {
      refresh();
      setIsInitialLoad(false);
    }
  }, [isInitialLoad, refresh]);

  const token = useSelector((state) => state.auth.token);
  const user = useSelector((state) => state.auth.user);

  const verified = async () => {
    const Is_Verified = await verifyToken(token, dispatch, refresh , user);
    setIsVerified(Is_Verified);
  };
  verified();

  const location = useLocation();
  const authPaths = ["/login", "/signup"];
  const currentPath = location.pathname.toLowerCase();
  const shouldHideSideBarAndHeader = authPaths.includes(currentPath);

  return (
    <>
      {!shouldHideSideBarAndHeader && isVerified && <Header />}
      <main className={!shouldHideSideBarAndHeader && isVerified && `main`}>
        {!shouldHideSideBarAndHeader && isVerified && <SideBar />}
        <div className={!shouldHideSideBarAndHeader && isVerified && `content`}>
          <Routes>
            {/* Manage Bills Routes */}
            <Route
              path="/bills/add"
              element={isVerified ? <Add_bills /> : <Login />}
            />
            <Route
              path="/bills/get"
              element={isVerified ? <Get_bills /> : <Login />}
            />

            {/* Manage Employee List Routes */}
            <Route
              path="/employees/add"
              element={isVerified ? <NewEmployee /> : <Login />}
            />
            <Route
              path="/employees/get"
              element={isVerified ? <AllEmployee /> : <Login />}
            />

            {/* Manage Food Categories Routes */}
            <Route
              path="/food-categories/add"
              element={isVerified ? <NewCategory /> : <Login />}
            />
            <Route
              path="/food-categories/get"
              element={isVerified ? <AllCategory /> : <Login />}
            />

            {/* Manage Food List Routes */}
            <Route
              path="/food-list/add"
              element={isVerified ? <Add_food_list /> : <Login />}
            />
            <Route
              path="/food-list/get"
              element={isVerified ? <Get_food_list /> : <Login />}
            />

            {/* Profile Route */}
            <Route
              path="/profile"
              element={isVerified ? <Profile /> : <Login />}
            />

            {/* Orders List Route */}
            <Route
              path="/orders"
              element={isVerified ? <Orders /> : <Login />}
            />
            {/* Ingrediants Route */}

            <Route
              path="/ingrediants"
              element={isVerified ? <Ingrediants /> : <Login />}
            />
            {/* feedback Route */}

            <Route
              path="/feedback"
              element={isVerified ? <Comment /> : <Login />}
            />
            {/* Default Routes */}
            <Route path="/" element={isVerified ? <Dashboard /> : <Login />} />
            <Route
              path="/login"
              element={isVerified ? <Dashboard /> : <Login />}
            />
            <Route
              path="/signup"
              element={isVerified ? <Dashboard /> : <Signup />}
            />

            {/* 404 Route */}
            <Route path="*" element={<Notfound />} />
          </Routes>
          <Footer />
        </div>
      </main>
    </>
  );
}

export default App;
