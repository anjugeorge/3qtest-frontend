import React from "react";

const TestHero = () => {
  return (
    <>
      <div className="flex flex-col bg-purple-50">
        <div className="font-roboto ">
          {" "}
          <h1 className="text-4xl font-bold text-center py-10 text-slate-900">
            {" "}
            Discover Yourself
          </h1>
          <p className="text-xl md:text-2xl leading-loose md:w-1/2 text-center mx-auto px-5 font-roboto text-slate-800">
            Do you want to discover yourself and determine where you best fit
            into?
          </p>
        </div>
        <img className="md:max-w-sm mx-auto" src="/assets/assessment.png" />
      </div>
    </>
  );
};

export default TestHero;
