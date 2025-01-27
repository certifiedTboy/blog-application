import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import ErrorMessage from "../common/ErrorMessage";
import { useLoginUserMutation } from "../../lib/apis/authApis";

const SigninForm = () => {
  const [loginData, setLoginData] = useState({ email: "", password: "" });

  const [loginUser, { isLoading, isSuccess, isError, error, data }] =
    useLoginUserMutation();

  const navigate = useNavigate();

  const loginUserHandler = async (event) => {
    event.preventDefault();

    await loginUser(loginData);
  };

  useEffect(() => {
    if (isSuccess) {
      localStorage.setItem("a_t", data?.data?.refreshToken);
      navigate("/");
    }
  }, [isSuccess]);

  return (
    <>
      <h1 className="text-center text-2xl font-bold my-10">
        Sign in to get started
      </h1>
      <form className="max-w-md mx-auto my-10" onSubmit={loginUserHandler}>
        {isError && error && (
          <ErrorMessage
            message={error?.data?.error || "Something went wrong"}
          />
        )}
        <div className="relative z-0 w-full mb-5 group">
          <div className="grid md:grid-cols-2 md:gap-6"></div>
          <input
            type="email"
            name="floating_email"
            id="floating_email"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            onChange={(event) =>
              setLoginData({ ...loginData, email: event.target.value })
            }
          />
          <label
            htmlFor="floating_email"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Email address
          </label>
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="password"
            name="floating_password"
            id="floating_password"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            onChange={(event) =>
              setLoginData({ ...loginData, password: event.target.value })
            }
          />
          <label
            htmlFor="floating_password"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Password
          </label>
        </div>

        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          {isLoading ? "Please wait..." : "Login"}
        </button>

        <div className="flex justify-between items-end">
          <p>
            Don't have an account?
            <Link to="/get-started/sign-up">Sign up</Link>
          </p>
          <p>
            Forgot Password? <Link to="/get-started/sign-up">Reset</Link>
          </p>
        </div>
      </form>
    </>
  );
};

export default SigninForm;
