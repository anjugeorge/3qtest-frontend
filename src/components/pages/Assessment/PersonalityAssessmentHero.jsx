import React from "react";

const PersonalityAssessmentHero = () => {
  return (
    <div className="flex flex-col">
      <div className="font-roboto my-auto text-gray-800">
        {" "}
        <h1 className="text-4xl font-bold text-center py-10 ">
          {" "}
          Personality Test
        </h1>
        <div className="container">
          {" "}
          <p className="text-lg md:text-xl  leading-loose text-center mx-auto px-30 font-roboto">
            Want to gain a deeper understanding of who you are?
            <br /> This personality test will help you explore your strengths,
            preferences, and tendencies,
            <br /> offering valuable insights into how you navigate the world
            and interact with others.
          </p>
        </div>
      </div>
      <img className="max-w-sm mx-auto" src="" />
    </div>
  );
};

export default PersonalityAssessmentHero;
