import { Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import HomePage from "../pages/HomePage";
import BlogsPage from "../pages/BlogsPage";
import AuthPage from "../pages/AuthPage";
import DashboardPage from "../pages/DashboardPage";
import BlogDetailsPage from "../pages/BlogDetailsPage";
import SigninForm from "../components/authComponents/SigninForm";
import SignupForm from "../components/authComponents/SignupForm";
import ProtectedRoutes from "./ProtectedRoute";

const AppRoutes = () => {
  const { currentUser } = useSelector((state) => state.userState);

  return (
    <Routes>
      <Route
        path="*"
        element={
          <h1 className="flex text-3xl justify-center items-center font-bold">
            Error 404 Page not found
          </h1>
        }
      />
      <Route path="/" element={<HomePage />} />
      <Route path="/blogs" element={<BlogsPage />} />

      <Route path="/blogs/:blogTitle" element={<BlogDetailsPage />} />

      {/* {!currentUser && ( */}
      <Route path="/get-started" element={<AuthPage />}>
        <Route path="sign-up" element={<SignupForm />} />
        <Route path="sign-in" element={<SigninForm />} />
      </Route>
      {/* )} */}

      <Route
        path="/dashboard"
        element={
          <ProtectedRoutes currentUser={currentUser}>
            <DashboardPage />
          </ProtectedRoutes>
        }
      />
    </Routes>
  );
};

export default AppRoutes;
