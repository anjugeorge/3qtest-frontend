import React from "react";
import TestHero from "./TestHero";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
const personalityTestFeatures = [
  {
    id: 1,
    title: "Free Personality Insight",
    desc: `Get valuable insights into your personality traits and how they relate to your career choices with our free 3QTests personality insight.`,
  },
  {
    id: 2,
    title: "Personalized Reports",
    desc: `Get a detailed personality-based analysis — designed to help you better understand yourself and your unique traits.`,
  },
  {
    id: 3,
    title: "Report Access Anytime",
    desc: `Securely store your personalized reports for future reference and track your personal growth over time.`,
  },
];

const careerTestFeatures = [
  {
    id: 1,
    title: "Career Interests",
    desc: `Identify your strengths, interests, and ideal job paths.`,
  },
  {
    id: 2,
    title: "Affordable Price",
    desc: `Get started for just $9.99 and take the first step toward your dream career.`,
  },
  {
    id: 3,
    title: "Personalized Results",
    desc: `Receive personalized insights based on your results.`,
  },
];
const TestPage = () => {
  return (
    <>
      <TestHero />
      <div className="container">
        {" "}
        <div className="grid grid-cols-1 md:grid-cols-2 bg-white pt-10">
          {" "}
          <div className="">
            <img src="/assets/puzzle.png" className="md:max-w-sm" />
          </div>
          <div className="my-auto">
            <h1 className="text-3xl font-roboto font-bold text-center">
              Personality Insights
            </h1>
            <p className="font-roboto leading-7 py-5 px-5 text-justify">
              Understanding your personality is key when exploring new career
              paths. It helps match your traits with jobs that align with your
              strengths, ensuring a more fulfilling and successful journey.
              Whether you’re considering a career change or assessing your
              current job, knowing your personality type can provide valuable
              insights. Take the <strong>free</strong> 3QTests personality
              insight today to discover more about yourself and receive an
              in-depth results. Users can save their reports for future. For a
              more detailed career analysis, try the 3QTests for a small fee.
            </p>
          </div>
        </div>
        <div className="bg-purple-50">
          <div className="container mb-20">
            <div className="flex flex-col items-center py-20">
              <h1 className="text-3xl font-roboto font-bold text-center">
                Features
              </h1>
              <div
                className="py-5 grid md:grid-cols-3 grid-cols-1 gap-4"
                data-aos="fade-up"
                data-aos-duration="1500"
              >
                {personalityTestFeatures.map((content) => (
                  <div className="flex flex-col bg-white shadow-sm  p-6 text-slate-800 hover:bg-purple-800 hover:text-white">
                    <div key={content.id} className="flex items-center mb-4">
                      <h5 className="  font-semibold text-sm/7">
                        {content.title}
                      </h5>
                    </div>
                    <p className="block  pb-3 text-sm/7 text-justify">
                      {content.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        {" "}
        <div className="grid grid-cols-1 md:grid-cols-2 bg-white pb-10">
          {" "}
          <div className="">
            <img src="/assets/careerHat.png" className="md:max-w-sm" />
          </div>
          <div className="my-auto">
            <h1 className="text-3xl font-roboto font-bold text-center">
              Career Interests
            </h1>
            <p className="font-roboto leading-7 py-5 px-5 text-justify">
              Looking to start your career but unsure where to begin? Our career
              interests assessment is designed to help you identify your
              strengths, interests, and ideal work environments, bringing you
              one step closer to finding your dream job. Register now for just{" "}
              <strong className="font-bold text-purple-600">$4.99</strong>{" "}
              <span class="line-through text-gray-500">$9.99</span>{" "}
              (introductory offer) and receive a personalized report to help you
              understand your potential and make informed career choices. Start
              your journey to success today and discover what you were meant to
              do!
            </p>
          </div>
        </div>
        <div className="bg-purple-50">
          <div className="container mb-20">
            <div className="flex flex-col items-center py-20">
              <h1 className="text-3xl font-roboto font-bold text-center">
                Features
              </h1>
              <div
                className="py-5 grid md:grid-cols-3 grid-cols-1 gap-4"
                data-aos="fade-up"
                data-aos-duration="1500"
              >
                {careerTestFeatures.map((content) => (
                  <div className="flex flex-col bg-white shadow-sm  p-6 text-slate-800 hover:bg-purple-800 hover:text-white">
                    <div key={content.id} className="flex items-center mb-4">
                      <h5 className="  font-semibold text-sm/7">
                        {content.title}
                      </h5>
                    </div>
                    <p className="block  pb-3 text-sm/7 text-justify">
                      {content.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TestPage;
