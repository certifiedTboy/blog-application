import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";

const AuthPage = () => {
  const { currentUser } = useSelector((state) => state.userState);
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser) {
      navigate("/");
    }
  }, [currentUser]);

  return <Outlet />;
};

export default AuthPage;
