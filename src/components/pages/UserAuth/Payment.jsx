import axios from "axios";
import React, { useState } from "react";
import { useLocation } from "react-router";
import { useNavigate } from "react-router";

const Payment = () => {
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");
  const email = localStorage.getItem("email");
  console.log("User ID:", userId);
  console.log("Email", localStorage.getItem("email"));
  const checkout = async (event) => {
    try {
      event.preventDefault();
      const response = await axios.post("http://localhost:3000/checkout", {
        userId: userId,
        email: email,
      });
      if (response.data.url) {
        // Redirect to the Stripe checkout page
        //localStorage.setItem("userId", userId);
        window.location.href = response.data.url;
      }
      // navigate("/career-assessment");
    } catch (err) {
      alert(err.response.data.message);
      navigate("/career-assessment");
      console.log("Error", err);
    }
  };
  return (
    <>
      <div
        id="authentication-modal"
        tabindex="-1"
        aria-hidden="true"
        className="flex fixed  z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
      >
        <div className="relative p-4 w-full max-w-md max-h-full">
          <div className="relative  shadow-lg bg-gray-100">
            <div className="flex flex-col items-center  justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Complete Payment to Access Results!
              </h3>
              <div>
                <p className="text-sm text-center text-gray-700 mt-2 mb-2">
                  To view your Career Test results, please complete the payment
                  of <strong>$9.99</strong>. This unlocks your personalized
                  career recommendations and suitable career paths.
                </p>
              </div>
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
