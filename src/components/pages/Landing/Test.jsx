import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router";

const Test = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="bg-gray-100  py-20">
        {" "}
        <div className="container">
          <h1 className="text-3xl font-roboto font-semibold text-center">
            Discover Yourself
          </h1>

          <p className="font-roboto leading-7 py-5 px-5 text-justify">
            For atleast once in life you must have wished for a sure-fire way to
            figure out what you wanted to do with your life. Our 3QTests
            assessments will help pinpoint your interests and strengths so you
            can focus your career search. With our assessments, making a
            decision about your future has never been easier.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 py-10">
            <div class="max-w-2xl rounded shadow-lg mx-auto">
              <div className="flex border-solid-2 bg-gray-50">
                {" "}
                <img src="/assets/personality.png" className="w-16 h-16" />
                <div class="font-bold text-xl ml-3  text-start  my-auto">
                  Personality Insights
                </div>
              </div>

              <div class="px-6 py-4">
                <p class="text-gray-700 text-base text-justify">
                  Personality traits aren't just important when choosing a
                  career; they can also be helpful when assessing your current
                  career.Try our 3QTests personality test for{" "}
                  <strong className="text-purple-900 animate-pulse font-bold">
                    free
                  </strong>{" "}
                  and get an insightful travel to discover who you are and
                  receive the analysis reports.
                </p>
              </div>
              <div class="px-6 py-6 text-end">
                <a
                  href="/test"
                  className="bg-purple-900 hover:bg-purple-950 px-4 py-2 w-10 h-10 text-white text-[14px] font-bold rounded-lg"
                >
                  <FontAwesomeIcon icon={faArrowRight} />
                </a>
              </div>
            </div>
            <div class="max-w-4xl rounded shadow-lg mx-auto ">
              <div className="flex md:flex-row flex-col border-solid-2 bg-gray-50">
                {" "}
                <img src="/assets/career.png" className="w-16 h-16" />
                <div class="font-bold text-xl ml-3  text-start  my-auto">
                  Career Interests
                </div>
                <div className="">
                  {" "}
                  <div className="mt-3 ml-3 mr-3 md:ml-5 md:mr-0 flex items-center space-x-2.5 border border-violet-500/30 rounded-full bg-purple-100 p-1 text-sm text-purple-800">
                    <div className="flex items-center space-x-1 bg-purple-900 text-white border border-violet-500 rounded-3xl px-3 py-1">
                      <p> Special Introductory Offer!</p>
                    </div>
                    <p className="pr-3">50% OFF</p>
                  </div>
                </div>
              </div>
              <div class="px-6 py-4">
                <p class="text-gray-700 text-base text-justify">
                  Our career assessment is designed to help identify your
                  strengths and interests, giving you a clear idea of which
                  careers might be a great fit. Register now and get started for
                  just{" "}
                  <strong className="text-purple-900 animate-pulse  font-bold">
                    just $4.99
                  </strong>{" "}
                  <span class="line-through text-gray-500">$9.99</span>{" "}
                  (introductory offer) to discover what you were meant to do!
                </p>
              </div>
              <div class="px-6  py-6  text-end">
                <a
                  href="/test"
                  className="bg-purple-900 hover:bg-purple-950 px-4 py-2 w-10 h-10 text-white text-[14px] font-bold rounded-lg"
                >
                  <FontAwesomeIcon icon={faArrowRight} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Test;
