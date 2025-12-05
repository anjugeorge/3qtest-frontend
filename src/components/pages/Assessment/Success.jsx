import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router";

import {
  saveResultsAPI,
  updateCompletedTestFieldAPI,
  updateIsPaidField,
} from "../../../api/apiService";

const Success = () => {
  const navigate = useNavigate();
  const hasSaved = useRef(false);

  useEffect(() => {
    async function handleSuccessfullPayment() {
      //const successfullPayment = await updateIsPaidField();
      //if (successfullPayment.success) {
      setTimeout(() => {
        navigate("/results", {
          state: {
            testType: "Career Test",
          },
        });
      }, 2000);

      //}
    }
    handleSuccessfullPayment();
  }, []);
  return (
    <div className="bg-purple-50 min-h-screen">
      <div className="container mb-20">
        <div className="flex flex-col items-center py-20 rounded-sm">
          <div
            className="py-5  gap-4"
            data-aos="fade-up"
            data-aos-duration="1500"
          >
            <div className="flex flex-col bg-white shadow-sm  p-6 text-slate-800  rounded-xl">
              <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg
                  className="w-10 h-10 text-purple-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <div className=" mb-2">
                {" "}
                <h1 className="text-3xl font-roboto font-bold text-center py-2">
                  Payment Confirmed
                </h1>
              </div>

              <p className="block text-lg  pb-3  text-justify">
                Your payment was successful. Loading your test results...
              </p>
              <div className="flex flex-row items-center justify-center gap-4 my-2">
                <div className="w-3 h-3 bg-purple-600 rounded-full animate-pulse"></div>
                <div className="w-3 h-3 bg-purple-600 rounded-full animate-pulse"></div>

                <div className="w-3 h-3 bg-purple-600 rounded-full animate-pulse"></div>
              </div>
              <p className="block  pb-3 text-sm/7 text-center">
                Redirecting...
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Success;
