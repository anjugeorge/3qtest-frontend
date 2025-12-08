import React, { useState } from "react";
import { forgotPasswordAPI } from "../../../api/apiService";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isResetPasswordOpen, setResetPasswordOpen] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  function closeResetPassword() {
    setResetPasswordOpen(false);
  }

  function handleChange(e) {
    setEmail(e.target.value);
  }

  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  const sendResetLink = async (event) => {
    try {
      event.preventDefault();

      if (!email) {
        alert("Please enter your email address.");
        return;
      }

      if (!isValidEmail(email)) {
        alert("Please enter a valid email address.");
        return;
      }

      setIsSubmitting(true);
      const response = await forgotPasswordAPI(email);

      alert(
        "Password reset link has been sent to your email. Please check your inbox."
      );
      setEmail("");
      closeResetPassword();
    } catch (err) {
      if (err.status === 404) {
        alert("No account found with this email address.");
      } else {
        alert(`${err.message || "An error occurred"}. Please try again later.`);
      }
      console.log("Error", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {isResetPasswordOpen && (
        <div
          id="authentication-modal"
          tabIndex="-1"
          aria-hidden="true"
          className="flex fixed z-50 justify-center items-center w-full inset-0 max-h-full"
        >
          <div className="relative p-4 w-full max-w-md max-h-full">
            <div className="relative shadow-lg bg-gray-100">
              <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200">
                <h3 className="text-xl font-semibold text-gray-900">
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
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                    />
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
              </div>
              <div className="p-4 md:p-5">
                <p className="text-sm text-gray-600 mb-4">
                  Enter your email address and we'll send you a link to reset
                  your password.
                </p>
                <form className="space-y-4" autoComplete="on">
                  <div>
                    <label
                      htmlFor="email"
                      className="block mb-2 text-sm font-medium text-gray-900"
                    >
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      placeholder="name@company.com"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:placeholder-gray-400"
                      required
                      value={email}
                      onChange={handleChange}
                      autoComplete="email"
                      disabled={isSubmitting}
                    />
                  </div>

                  <button
                    type="submit"
                    onClick={sendResetLink}
                    disabled={isSubmitting}
                    className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? "Sending..." : "Send Reset Link"}
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
