import React from "react";

const AboutUsHero = () => {
  return (
    <>
      <div className="flex flex-col bg-purple-50">
        <div className="font-roboto ">
          {" "}
          <h1 className="text-4xl font-bold text-center py-10 text-slate-900">
            About Us
          </h1>
          <p className="text-xl md:text-2xl leading-loose md:w-1/2 text-center mx-auto px-5 text-slate-800">
            What you do makes a difference, and
            <br /> you have to decide what kind of difference you want to make
          </p>
        </div>
        <img className="w-auto mx-auto" src="/assets/aboutUs.png" />
      </div>
    </>
  );
};

export default AboutUsHero;
