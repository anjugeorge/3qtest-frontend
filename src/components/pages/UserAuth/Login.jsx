import React, { useContext, useState } from "react";
import Register from "./Register";
import { loginAPI } from "../../../api/apiService";
import { useNavigate } from "react-router";
import ForgotPassword from "./ForgotPassword";
import { AuthContext } from "../../../context/AuthContext";
import { FaEye, FaEyeSlash } from "react-icons/fa";
const Login = ({ closeModal, redirectPath, setRedirectPath }) => {
  const { loggedIn } = useContext(AuthContext);
  const [isCreateAccountOpen, setCreateAccountOpen] = useState(false);
  const [login, setLogin] = useState({ email: "", password: "" });
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  function toggleShowPassword(event) {
    event.preventDefault();
    setShowPassword((prevState) => !prevState);
  }
  function toggleIsForgotPassword() {
    setIsForgotPassword(!isForgotPassword);
  }
  const navigate = useNavigate();

  function toggleIsCreateAccountOpen() {
    setCreateAccountOpen(!isCreateAccountOpen);
  }
  function handleChange(e) {
    const newValue = e.target.value;
    const inputName = e.target.name;
    setLogin((prevValue) => {
      if (inputName === "email") {
        return {
          email: newValue,
          password: prevValue.password,
        };
      } else {
        return {
          email: prevValue.email,
          password: newValue,
        };
      }
    });
  }

  const userLogin = async (event) => {
    try {
      if (!login.email || !login.password) {
        alert("Please fill in both email and password.");
        return;
      }
      event.preventDefault();
      const response = await loginAPI(login.email, login.password);

      if (response.result) {
        sessionStorage.setItem("isLoggedInOnce", "true");
        //localStorage.setItem("userName", response.result.name);
        //localStorage.setItem("email", response.result.email);
        //localStorage.setItem("isPaid", response.result.is_paid);
        loggedIn(response.result);
        // setUsername(response.result.name);
        alert("Logged in successfully!");
        closeModal();
        if (redirectPath) {
          navigate(redirectPath);
          setRedirectPath(null);
        } else {
          navigate("/");
        }
      } else {
        alert("Login failed. Please check your credentials.");
        setLogin({ email: "", password: "" });
      }
    } catch (err) {
      alert("Login failed. Please check your credentials.");
      setLogin({ email: "", password: "" });
      console.log("Error", err);
    }
  };

  return (
    <>
      {" "}
      <div
        id="authentication-modal"
        tabindex="-1"
        aria-hidden="true"
        className="flex fixed  z-50 justify-center items-center w-full inset-0 h-[calc(100%-1rem)] max-h-full"
      >
        <div className="relative p-4 w-full max-w-md max-h-full">
          <div className="relative  shadow-lg bg-gray-100">
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Sign in to{" "}
                <strong className="text-2xl font-bold italic text-purple-950">
                  3QTest
                </strong>
              </h3>
              <button
                type="button"
                onClick={closeModal}
                className="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                data-modal-hide="authentication-modal"
              >
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>
            <div className="p-4 md:p-5">
              <form className="space-y-4" action="#">
                <div>
                  <label
                    for="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Your email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    placeholder="name@company.com"
                    required
                    value={login.email}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label
                    for="password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Your password
                  </label>
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    required
                    value={login.password}
                    onChange={handleChange}
                  />
                  <button
                    className="absolute right-8 top-[13.6rem]"
                    onClick={toggleShowPassword}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>

                <button
                  type="submit"
                  onClick={userLogin}
                  className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Login to your account
                </button>
              </form>
              <div className="grid grid-cols-2 mt-5 mb-5">
                <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
                  Not registered?{" "}
                  <button
                    onClick={toggleIsCreateAccountOpen}
                    className="text-blue-700 hover:underline dark:text-blue-500"
                  >
                    Sign Up
                  </button>
                </div>
                {isCreateAccountOpen && <Register />}
                <div className="text-sm font-medium text-gray-500 dark:text-gray-300 text-end">
                  <button
                    onClick={toggleIsForgotPassword}
                    className="text-blue-700 hover:underline dark:text-blue-500"
                  >
                    Forgot password?
                  </button>
                </div>
                {isForgotPassword && <ForgotPassword />}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
