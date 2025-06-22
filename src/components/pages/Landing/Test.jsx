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
            Our Assessments
          </h1>

          <p className="font-roboto leading-7 py-5 px-5 text-center md:text-start">
            For atleast once in life you must have wished for a sure-fire way to
            figure out what you wanted to do with your life. Our 3Qtest
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
                  Personality Test
                </div>
              </div>

              <div class="px-6 py-4">
                <p class="text-gray-700 text-base">
                  Personality traits aren't just important when choosing a
                  career; they can also be helpful when assessing your current
                  career.Try our 3QTest personality test for{" "}
                  <strong className="text-purple-900 animate-pulse font-bold">
                    free
                  </strong>{" "}
                  and get an insightful travel to discover who you are and
                  receive the analysis reports by email.
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
              <div className="flex border-solid-2 bg-gray-50">
                {" "}
                <img src="/assets/career.png" className="w-16 h-16" />
                <div class="font-bold text-xl ml-3  text-start  my-auto">
                  Career Test
                </div>
              </div>
              <div class="px-6 py-4">
                <p class="text-gray-700 text-base">
                  Our career assessment is designed to help identify your
                  strengths and interests, and give you a better understanding
                  of what careers might be a good fit for you.Register and get
                  started for{" "}
                  <strong className="text-purple-900 animate-pulse font-bold">
                    just $9.99
                  </strong>{" "}
                  and find out what you were meant to do!
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
