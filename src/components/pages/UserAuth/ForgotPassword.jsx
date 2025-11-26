import React, { useState } from "react";
import { forgotPasswordAPI } from "../../../api/apiService";
import { FaEye, FaEyeSlash } from "react-icons/fa";
const ForgotPassword = () => {
  const [newPassword, setNewPassword] = useState({
    email: "",
    password: "",
  });
  const [isResetPasswordOpen, setResetPasswordOpen] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  function toggleShowPassword(event) {
    event.preventDefault();
    setShowPassword((prevState) => !prevState);
  }
  function closeResetPassword() {
    setResetPasswordOpen(false);
  }
  function handleChange(e) {
    const newValue = e.target.value;
    const inputName = e.target.name;
    setNewPassword((prevValue) => {
      if (inputName === "email") {
        return {
          email: newValue,
          password: prevValue.password,
        };
      } else if (inputName === "password") {
        return {
          email: prevValue.email,
          password: newValue,
        };
      }
    });
  }

  const resetPassword = async (event) => {
    try {
      event.preventDefault();
      if (!newPassword.email || !newPassword.password) {
        alert("Please fill in both email and password.");
        return;
      }
      const response = await forgotPasswordAPI(
        newPassword.email,
        newPassword.password
      );
      closeResetPassword();
      alert("Password changed successfully");
    } catch (err) {
      console.log("Error", err);
    }
  };
  return (
    <>
      {isResetPasswordOpen && (
        <div
          id="authentication-modal"
          tabindex="-1"
          aria-hidden="true"
          className="flex fixed  z-50 justify-center items-center w-full inset-0 h-[calc(100%-1rem)] max-h-full"
        >
          <div className="relative p-4 w-full max-w-md max-h-full">
            <div className="relative  shadow-lg bg-gray-100 h-[400px] overflow-y-auto">
              <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200">
                <h3 className="text-xl font-semibold text-gray-900 ">
                  Reset Password
                </h3>
                <button
                  type="button"
                  onClick={closeResetPassword}
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
                      for="fName"
                      className="block mb-2 text-sm font-medium text-gray-900 "
                    >
                      Enter Your Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      placeholder="••••••••"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:placeholder-gray-400 "
                      required
                      value={newPassword.email}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label
                      for="password"
                      className="block mb-2 text-sm font-medium text-gray-900 "
                    >
                      Enter new password
                    </label>
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      id="password"
                      placeholder="••••••••"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:placeholder-gray-400 "
                      minLength={8}
                      required
                      value={newPassword.password}
                      onChange={handleChange}
                    />
                    <button
                      className="absolute right-8 md:top-[13.6rem] top-[13rem]"
                      onClick={toggleShowPassword}
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>

                  <button
                    type="submit"
                    onClick={resetPassword}
                    className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Reset Password
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ForgotPassword;
