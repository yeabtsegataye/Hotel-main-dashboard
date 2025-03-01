import { Route, Routes, useLocation, Navigate } from "react-router-dom";
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

// Protected Route Component
const ProtectedRoute = ({ element, allowedRoles }) => {
  const user = useSelector((state) => state.auth.user);

  // If the user is not logged in, redirect to login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // If the user's role is not allowed, redirect to the appropriate route
  if (!allowedRoles.includes(user.role)) {
    if (user.role === "employee") {
      return <Navigate to="/orders" replace />;
    }
    return <Navigate to="/" replace />; // Fallback for other roles
  }

  // If the user is allowed, render the element
  return element;
};

function App() {
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const refresh = useRefreshToken();
  const dispatch = useDispatch();
  const [isVerified, setIsVerified] = useState(false);
 // const [role, setRole] = useState("");

  useEffect(() => {
    if (isInitialLoad) {
      refresh();
      setIsInitialLoad(false);
      
    }
     verified();
  }, [isInitialLoad, refresh]);

  const token = useSelector((state) => state.auth.token);
  const user = useSelector((state) => state.auth.user);

  const verified = async () => {
    const { isverifed } = await verifyToken(token, dispatch, refresh, user);
   // console.log(role, "cccccc");
    setIsVerified(isverifed);
   // setRole(role);
  };
 

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
              element={
                <ProtectedRoute
                  element={<Add_bills />}
                  allowedRoles={["admin"]} // Only admin can access
                />
              }
            />
            <Route
              path="/bills/get"
              element={
                <ProtectedRoute
                  element={<Get_bills />}
                  allowedRoles={["admin"]} // Only admin can access
                />
              }
            />

            {/* Manage Employee List Routes */}
            <Route
              path="/employees/add"
              element={
                <ProtectedRoute
                  element={<NewEmployee />}
                  allowedRoles={["admin"]} // Only admin can access
                />
              }
            />
            <Route
              path="/employees/get"
              element={
                <ProtectedRoute
                  element={<AllEmployee />}
                  allowedRoles={["admin"]} // Only admin can access
                />
              }
            />

            {/* Manage Food Categories Routes */}
            <Route
              path="/food-categories/add"
              element={
                <ProtectedRoute
                  element={<NewCategory />}
                  allowedRoles={["admin", "employee"]} // Both admin and employee can access
                />
              }
            />
            <Route
              path="/food-categories/get"
              element={
                <ProtectedRoute
                  element={<AllCategory />}
                  allowedRoles={["admin", "employee"]} // Both admin and employee can access
                />
              }
            />

            {/* Manage Food List Routes */}
            <Route
              path="/food-list/add"
              element={
                <ProtectedRoute
                  element={<Add_food_list />}
                  allowedRoles={["admin", "employee"]} // Both admin and employee can access
                />
              }
            />
            <Route
              path="/food-list/get"
              element={
                <ProtectedRoute
                  element={<Get_food_list />}
                  allowedRoles={["admin", "employee"]} // Both admin and employee can access
                />
              }
            />

            {/* Profile Route */}
            <Route
              path="/profile"
              element={
                <ProtectedRoute
                  element={<Profile />}
                  allowedRoles={["admin", "employee"]} // Both admin and employee can access
                />
              }
            />

            {/* Orders List Route */}
            <Route
              path="/orders"
              element={
                <ProtectedRoute
                  element={<Orders />}
                  allowedRoles={["admin", "employee"]} // Both admin and employee can access
                />
              }
            />

            {/* Ingrediants Route */}
            <Route
              path="/ingrediants"
              element={
                <ProtectedRoute
                  element={<Ingrediants />}
                  allowedRoles={["admin", "employee"]} // Both admin and employee can access
                />
              }
            />

            {/* Feedback Route */}
            <Route
              path="/feedback"
              element={
                <ProtectedRoute
                  element={<Comment />}
                  allowedRoles={["admin", "employee"]} // Both admin and employee can access
                />
              }
            />

            {/* Default Routes */}
            <Route
              path="/"
              element={
                <ProtectedRoute
                  element={<Dashboard />}
                  allowedRoles={["admin"]} // Only admin can access
                />
              }
            />
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