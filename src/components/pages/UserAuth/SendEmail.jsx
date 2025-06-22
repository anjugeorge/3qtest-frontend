import React, { useState } from "react";
import Login from "./Login";
import axios from "axios";

const SendEmail = ({ result }) => {
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [big5Results, setBig5Results] = useState({
    email: "",
  });

  function handleChange(event) {
    const newValue = event.target.value;
    const inputname = event.target.name;
    setBig5Results((prevValue) => {
      if (inputname === "email") {
        return {
          email: newValue,
        };
      }
    });
    console.log(result);
  }
  function toggleLogin() {
    setIsLoginOpen(true);
  }
  function closeModal() {
    setIsModalOpen(false);
  }

  async function sendResults() {
    event.preventDefault();
    try {
      const response = await axios.post(
        `http://localhost:3000/sendResultsAsEmail`,
        {
          email: big5Results.email,
          result: result,
        }
      );
      console.log("Email: ", response.data);

      closeModal();
      alert(response.data);
      return response.data;
    } catch (error) {
      console.log("Error: ", error);
    }
  }
  return (
    <>
      {" "}
      {isModalOpen && (
        <div
          id="authentication-modal"
          tabindex="-1"
          aria-hidden="true"
          className="flex fixed  z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
        >
          <div className="relative p-4 w-full max-w-md max-h-full">
            <div className="relative  shadow-lg bg-gray-100">
              <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Send Your Results
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
                      className="block mb-2 text-sm  text-gray-900 dark:text-white"
                    >
                      Enter your email to receive your detailed personality
                      report:
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                      placeholder="name@company.com"
                      required
                      onChange={handleChange}
                    />
                  </div>
                  <div className="flex flex-row py-5">
                    <div className="ml-auto">
                      <button
                        onClick={sendResults}
                        className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                      >
                        Continue
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SendEmail;
