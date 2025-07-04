import React, { useState } from "react";
import { registerAPI } from "../../../api/apiService";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import TermsAndConditions from "../Terms-Conditions/TermsAndConditions";
const Register = () => {
  const [register, setRegister] = useState({
    fullName: "",
    email: "",
    password: "",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [isCreateAccountOpen, setCreateAccountOpen] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  function toggleShowPassword(event) {
    event.preventDefault();
    setShowPassword((prevState) => !prevState);
  }
  function closeCreateAccount() {
    setCreateAccountOpen(false);
  }
  function openModal() {
    setIsModalOpen(!isModalOpen);
  }
  function closeModal() {
    setIsModalOpen(false);
  }
  function handleChange(e) {
    e.preventDefault();
    const newValue = e.target.value;
    const inputName = e.target.name;
    setRegister((prevValue) => {
      if (inputName === "fName") {
        return {
          fullName: newValue,
          email: prevValue.email,
          password: prevValue.password,
        };
      } else if (inputName === "email") {
        return {
          fullName: prevValue.fullName,
          email: newValue,
          password: prevValue.password,
        };
      } else {
        return {
          fullName: prevValue.fullName,
          email: prevValue.email,
          password: newValue,
        };
      }
    });
  }

  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  const userRegister = async (event) => {
    try {
      event.preventDefault();
      if (!register.fullName) {
        alert("Please enter your full name.");
        return;
      }

      if (!isValidEmail(register.email)) {
        alert("Please enter a valid email address.");
        return;
      }
      if (register.password.length < 8) {
        alert("Password must be at least 8 characters long.");
        return;
      }
      const response = await registerAPI(
        register.fullName,
        register.email,
        register.password
      );
      alert("Account created successfully");
      setRegister({
        fullName: "",
        email: "",
        password: "",
      });
      closeCreateAccount();
    } catch (err) {
      alert("Error creating account. Please try again.");
      setRegister({
        fullName: "",
        email: "",
        password: "",
      });

      console.log("Error", err);
    }
  };
  return (
    <>
      {isCreateAccountOpen && (
        <div
          id="authentication-modal"
          tabindex="-1"
          aria-hidden="true"
          className="flex fixed  z-50 justify-center items-center w-full inset-0  max-h-full overflow-y-auto"
        >
          <div className="relative p-4 w-full max-w-md max-h-full">
            <div className="relative  shadow-lg bg-gray-100">
              <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Sign up for an account
                </h3>
                <button
                  type="button"
                  onClick={closeCreateAccount}
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
                <form className="space-y-4">
                  <div>
                    <label
                      for="fName"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Your full name
                    </label>
                    <input
                      type="text"
                      name="fName"
                      id="fName"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                      maxLength={50}
                      placeholder="full name"
                      required
                      value={register.fullName}
                      onChange={handleChange}
                    />
                  </div>
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
                      value={register.email}
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
                      minLength={8}
                      value={register.password}
                      onChange={handleChange}
                    />
                    <button
                      className="absolute right-8 top-[19rem]"
                      onClick={toggleShowPassword}
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>

                  <button
                    type="submit"
                    onClick={userRegister}
                    className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Create Account
                  </button>
                </form>
                <div className="mt-4">
                  <p className="text-sm text-gray-500 dark:text-gray-300 text-center">
                    By creating an account, you agree to our{" "}
                    <button
                      onClick={openModal}
                      className="font-normal text-blue-600 hover:underline dark:text-blue-500"
                    >
                      Terms and Conditions
                    </button>
                  </p>
                  {isModalOpen && (
                    <TermsAndConditions closeModal={closeModal} />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Register;
