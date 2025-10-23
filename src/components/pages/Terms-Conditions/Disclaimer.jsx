import React, { useState } from "react";

const Disclaimer = ({ closeModal }) => {
  return (
    <>
      <div
        id="authentication-modal"
        tabindex="-1"
        aria-hidden="true"
        className=" flex fixed  z-50 justify-center items-center w-full inset-0 h-[calc(100%-1rem)] max-h-full"
      >
        <div className="relative p-4 w-full max-w-md max-h-full">
          <div className="relative  shadow-lg  h-[450px] overflow-y-auto bg-[#fef8e3]">
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Disclaimer
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
            <div className="p-4 md:p-5 text-sm text-gray-800">
              <p className=" font-roboto leading-7 py-1 px-2 text-center md:text-start">
                <strong>Disclaimer:</strong> The 3QTest platform provides
                personality and career interest explorers for educational and
                informational purposes only.
                <div>
                  {" "}
                  <strong>Important Disclaimers:</strong>
                </div>
                <ul className="list-disc">
                  <li>
                    These tools are NOT professional psychological assessments
                    or career counseling{" "}
                  </li>
                  <li>
                    Results are AI-generated and have not been validated by
                    licensed professionals
                  </li>
                  <li>
                    This is NOT a substitute for advice from qualified career
                    counselors or psychologists
                  </li>
                  <li>
                    {" "}
                    We make no guarantees about the accuracy or completeness of
                    results
                  </li>
                  <li>
                    Users are solely responsible for any decisions made based on
                    these results
                  </li>
                  <li>
                    For major life, career, or educational decisions, please
                    consult licensed professionals
                  </li>
                </ul>
                <div className="text-center">
                  <strong>
                    {" "}
                    By using this platform, you acknowledge and accept these
                    limitations.
                  </strong>
                </div>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Disclaimer;
