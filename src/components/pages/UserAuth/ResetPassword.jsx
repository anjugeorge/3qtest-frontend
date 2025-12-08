import React, { useState } from "react";
import { forgotPasswordAPI, resetPasswordAPI } from "../../../api/apiService";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate, useSearchParams } from "react-router";
import cryptoRandomString from "crypto-random-string";
const ResetPassword = () => {
  const [resetNewPassword, setResetNewPassword] = useState({
    newPassword: "",
    confirmPassword: "",
  });
  const [isResetPasswordOpen, setResetPasswordOpen] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [searchParams] = useSearchParams();
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigate = useNavigate();
  const token = searchParams.get("resetToken");

  const generateStrongPassword = (event) => {
    const strongPassword = cryptoRandomString({
      length: 12,
      type: "ascii-printable", // includes uppercase, lowercase, numbers, and symbols
    });
    setResetNewPassword((prevValue) => ({
      ...prevValue,
      newPassword: strongPassword,
      confirmPassword: strongPassword,
    }));
    setShowPassword(true);
    setShowConfirmPassword(true);
  };
  function toggleShowPassword(event) {
    event.preventDefault();
    setShowPassword((prevState) => !prevState);
  }
  function toggleShowConfirmPassword(event) {
    event.preventDefault();
    setShowConfirmPassword((prevState) => !prevState);
  }
  function closeResetPassword() {
    setResetPasswordOpen(false);
  }
  function handleChange(e) {
    const newValue = e.target.value;
    const inputName = e.target.name;
    setResetNewPassword((prevValue) => {
      if (inputName === "newPassword") {
        return {
          newPassword: newValue,
          confirmPassword: prevValue.confirmPassword,
        };
      } else if (inputName === "confirmPassword") {
        return {
          newPassword: prevValue.newPassword,
          confirmPassword: newValue,
        };
      }
    });
  }

  const resetPassword = async (event) => {
    try {
      event.preventDefault();
      setShowPassword(false);
      setShowConfirmPassword(false);
      if (!resetNewPassword.newPassword || !resetNewPassword.confirmPassword) {
        alert("Please fill in both email and password.");
        return;
      }
      if (resetNewPassword.newPassword !== resetNewPassword.confirmPassword) {
        alert("do no match");
        return;
      }
      console.log("token", token);
      console.log("newPassword", resetNewPassword.newPassword);
      const response = await resetPasswordAPI(
        token,
        resetNewPassword.newPassword
        //resetNewPassword.confirmPassword
      );

      closeResetPassword();
      //navigate("/");
      alert("Password changed successfully");
    } catch (err) {
      if (err.status === 400) {
        alert(
          "Your reset link has expired or is invalid. Please go back and request a new password reset link."
        );
      }

      closeResetPassword();
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
                  <div className="">
                    {" "}
                    <div>
                      <label
                        htmlFor="newPassword"
                        className="block mb-2 text-sm font-medium text-gray-900"
                      >
                        Your password
                      </label>
                      <div className="relative">
                        <input
                          type={showPassword ? "text" : "password"}
                          name="newPassword"
                          id="newPassword"
                          placeholder="••••••••"
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 pr-10 dark:placeholder-gray-400"
                          required
                          minLength={8}
                          value={resetNewPassword.newPassword}
                          onChange={handleChange}
                          autoComplete="new-password"
                        />
                        <button
                          type="button"
                          className="absolute right-3 top-1/2 -translate-y-1/2"
                          onClick={toggleShowPassword}
                        >
                          {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </button>
                      </div>
                    </div>
                    <div className="flex justify-end">
                      {" "}
                      <button
                        type="button"
                        onClick={generateStrongPassword}
                        className="text-sm font-normal text-blue-600 hover:underline dark:text-blue-500"
                      >
                        Suggest Strong Password
                      </button>
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="confirmPassword"
                      className="block mb-2 text-sm font-medium text-gray-900"
                    >
                      Confirm password
                    </label>
                    <div className="relative">
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        name="confirmPassword"
                        id="confirmPassword"
                        placeholder="••••••••"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 pr-10 dark:placeholder-gray-400"
                        required
                        value={resetNewPassword.confirmPassword}
                        onChange={handleChange}
                        autoComplete="new-password"
                      />
                      <button
                        type="button"
                        className="absolute right-3 top-1/2 -translate-y-1/2"
                        onClick={toggleShowConfirmPassword}
                      >
                        {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                      </button>
                    </div>
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

export default ResetPassword;
