import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router";
import { useNavigate } from "react-router";
import {
  checkoutAPI,
  getProtectedData,
  paymentAccess,
} from "../../../api/apiService";
import { AuthContext } from "../../../context/AuthContext";

const Payment = () => {
  const navigate = useNavigate();
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

  function closePaymentModal() {
    setIsPaymentModalOpen(!isPaymentModalOpen);
    navigate("/");
  }

  const checkout = async (event) => {
    try {
      event.preventDefault();
      const response = await checkoutAPI();

      if (response.url) {
        // Redirect to the Stripe checkout page
        //localStorage.setItem("userId", userId);
        window.location.href = response.url;
      }
      // navigate("/career-assessment");
    } catch (error) {
      const isLoggedInOnce = sessionStorage.getItem("isLoggedInOnce");

      if (
        error.response?.status === 401 &&
        error.response?.data?.TokenExpired &&
        isLoggedInOnce === "true"
      ) {
        sessionStorage.setItem("TokenExpired", "true");
        alert(
          error.response.data.message || "Session expired. Please log in again."
        );
        sessionStorage.removeItem("isLoggedInOnce");
        window.location.href = "/";

        return;
      }
      if (!isLoggedIn) {
        alert("please login and take test");
        navigate("/");
      } else if (isLoggedIn && error.response.status === 403) {
        alert("Please complete the test");
        navigate("/career-assessment");
      }
    }
  };
  return (
    <>
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
                Complete Payment to View Results{" "}
              </h3>
              <button
                type="button"
                onClick={closePaymentModal}
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
            <div className="p-4 md:p-5 text-sm text-gray-800">
              <p className=" font-roboto leading-7 py-1 px-3 text-center md:text-start">
                To view your Career Test results, please complete the payment of{" "}
                <strong>$9.99</strong>. This unlocks your personalized career
                recommendations and suitable career paths.
              </p>
            </div>
            <div className="p-4 md:p-5">
              <form className="space-y-4" action="#">
                <button
                  type="submit"
                  onClick={checkout}
                  className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Proceed to Payment
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Payment;
