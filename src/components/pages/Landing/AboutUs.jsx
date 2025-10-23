import React from "react";

const AboutUs = () => {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 bg-white">
        {" "}
        <div className="">
          <img src="/assets/aboutUs.png" className="w-full" />
        </div>
        <div className="my-auto">
          <h1 className="text-3xl font-roboto font-bold text-center">
            About Us
          </h1>
          <p className="font-roboto leading-7 py-5 px-5 text-center md:text-start">
            3QTests is a Canadian-based company that helps you find the best
            career choice for yourself based on your personality traits. We
            believe that everyone has their own unique set of skills and
            abilities, and that it's important to find a career that aligns with
            who you are as a person. We want to help people find their passions
            and achieve their dreams!
          </p>
          <div className="text-center md:text-end p-5">
            <a href="/about-us">
              {" "}
              <button className="bg-purple-900 hover:bg-purple-950  w-48 h-10 text-white text-[14px] font-bold rounded-lg">
                Learn More
              </button>
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutUs;
