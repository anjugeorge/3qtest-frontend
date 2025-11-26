import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

const FAQ = () => {
  const [faq1, setFaq1] = useState(false);
  const [faq2, setFaq2] = useState(false);
  const [faq3, setFaq3] = useState(false);
  const [faq4, setFaq4] = useState(false);
  function openFaq1() {
    setFaq1(!faq1);
  }
  function openFaq2() {
    setFaq2(!faq2);
  }
  function openFaq3() {
    setFaq3(!faq3);
  }
  function openFaq4() {
    setFaq4(!faq4);
  }

  return (
    <>
      <div className="container py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            {" "}
            <h1 className="text-3xl text-center md:text-start font-semibold">
              Frequently asked questions
            </h1>
            <p className="py-5">
              Can’t find the answer you’re looking for? We’re here to help!
            </p>
            <img src="/assets/faq.jpg" className="w-auto" />
          </div>

          <div className="px-5">
            <p className="text-md/7 text-gray-700 font-bold text-justify">
              How do I figure out what career is right for me if I feel lost and
              don't know where to start?
            </p>
            <p className="py-5 text-gray-600 text-justify">
              With our career assessment tool, we can help pinpoint your
              personality traits and interests so that you can find a career
              that makes you happy. We'll help match you with careers that fit
              your skills and passions
            </p>
            <p className="text-md/7 text-gray-700 font-bold text-justify">
              How do I discover my passions and figure out what career change
              will make me happy, when I’m not sure what I really want?
            </p>
            <p className="py-5 text-gray-600 text-justify">
              A career assessment is the key to unlocking your interests and
              finding a career path that makes you happy. With your personality
              traits in hand, it becomes much easier to find a career that will
              make you excited to go to work every day.
            </p>
            <p className="text-md/7 text-gray-700 font-bold text-justify">
              How can I figure out what career path is right for me when I feel
              lost and overwhelmed by so many options?
            </p>
            <p className="py-5 text-gray-600 text-justify">
              A career assessment is the key to finding your dream job. This
              quiz will help identify your personality traits and interests, and
              then recommend careers that fit you perfectly.
            </p>
            <p className="text-md/7 text-gray-700 font-bold text-justify">
              What should I do when all the advice and resources I’ve tried to
              figure out my career just leave me feeling more confused?
            </p>
            <p className="py-5 text-gray-600 text-justify">
              A career assessment is the answer for you. This one is specific to
              your personality traits and interests, so it's guaranteed to help
              you find a career that makes you happy.
            </p>
          </div>
        </div>
      </div>
      {/* <div className="container">
        <div className="grid grid-cols-1 py-5 border-solid border-b-2">
          {" "}
          <div className="text-start">
            <button onClick={openFaq1}>
              {" "}
              <div className="grid grid-cols-3">
                <p className="text-md/7 text-gray-700 font-bold col-span-2 text-start">
                  How do I figure out what career is right for me if I feel lost
                  and don't know where to start?
                </p>
                <FontAwesomeIcon icon={faArrowRight} className="ml-auto" />
              </div>
              {faq1 && (
                <>
                  <p className="py-5 text-gray-600 text-start">
                    With our career assessment tool, we can help pinpoint your
                    personality traits and interests so that you can find a
                    career that makes you happy. We'll help match you with
                    careers that fit your skills and passions
                  </p>{" "}
                </>
              )}
            </button>
          </div>
        </div>

         <div className="grid grid-cols-1 py-5 border-solid border-b-2">
          {" "}
          <div className="text-start">
            <button onClick={openFaq2}>
              {" "}
              <div className="grid grid-cols-3">
                <p className="text-md/7 text-gray-700 font-bold col-span-2 text-start">
                  How do I discover my passions and figure out what career
                  change will make me happy, when I’m not sure what I really
                  want?
                </p>
                <FontAwesomeIcon icon={faArrowRight} className="ml-auto" />
              </div>
              {faq2 && (
                <>
                  <p className="py-5 text-gray-600 text-start">
                    A career assessment is the key to unlocking your interests
                    and finding a career path that makes you happy. With your
                    personality traits in hand, it becomes much easier to find a
                    career that will make you excited to go to work every day.
                  </p>{" "}
                </>
              )}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 py-5 border-solid border-b-2">
          {" "}
          <div className="text-start">
            <button onClick={openFaq3}>
              {" "}
              <div className="grid grid-cols-3">
                <p className="text-md/7 text-gray-700 font-bold col-span-2 text-start">
                  How do I figure out what career is right for me if I feel lost
                  and don't know where to start?
                </p>
                <FontAwesomeIcon icon={faArrowRight} className="ml-auto" />
              </div>
              {faq3 && (
                <>
                  <p className="py-5 text-gray-600 text-start">
                    With our career assessment tool, we can help pinpoint your
                    personality traits and interests so that you can find a
                    career that makes you happy. We'll help match you with
                    careers that fit your skills and passions
                  </p>{" "}
                </>
              )}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 py-5 border-solid border-b-2">
          {" "}
          <div className="text-start">
            <button onClick={openFaq4}>
              {" "}
              <div className="grid grid-cols-3">
                <p className="text-md/7 text-gray-700 font-bold col-span-2 text-start">
                  How do I figure out what career is right for me if I feel lost
                  and don't know where to start?
                </p>
                <FontAwesomeIcon icon={faArrowRight} className="ml-auto" />
              </div>
              {faq4 && (
                <>
                  <p className="py-5 text-gray-600 text-start">
                    With our career assessment tool, we can help pinpoint your
                    personality traits and interests so that you can find a
                    career that makes you happy. We'll help match you with
                    careers that fit your skills and passions
                  </p>{" "}
                </>
              )}
            </button>
          </div>
        </div>
      </div>*/}
    </>
  );
};

export default FAQ;
