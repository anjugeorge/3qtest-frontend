import React from "react";

const CareerAssessmentHero = () => {
  return (
    <>
      {" "}
      <div className="flex flex-col">
        <div className="font-roboto my-auto text-gray-800">
          {" "}
          <h1 className="text-4xl font-bold text-center py-10 text-slate-800 ">
            {" "}
            Career Test
          </h1>
          <div className="container">
            {" "}
            <p className="text-lg md:text-xl leading-[2] text-center mx-auto px-30 font-roboto text-slate-800">
              Curious about the career path that suits you best?
              <br /> This career test will help you explore your strengths,
              preferences, and work style,
              <br /> providing valuable insights into the types of roles and
              environments
              <br /> where you're most likely to succeed and feel fulfilled.
            </p>
          </div>
        </div>
        <img className="max-w-sm mx-auto" src="" />
      </div>
    </>
  );
};

export default CareerAssessmentHero;
