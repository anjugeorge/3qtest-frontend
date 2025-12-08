import React, { useState } from "react";
import Disclaimer from "../Terms-Conditions/Disclaimer";

const CareerAssessmentHero = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  function openModal() {
    setIsModalOpen(!isModalOpen);
  }
  function closeModal() {
    setIsModalOpen(false);
  }
  return (
    <>
      {" "}
      <div className="flex flex-col">
        <div className="font-roboto my-auto text-gray-800">
          {" "}
          <h1 className="text-4xl font-bold text-center py-10 text-slate-800 ">
            {" "}
            Career Interests
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
            <div class="mt-10 md:mr-20 md:ml-20 py-2  md:flex items-center space-x-2.5 border border-violet-500/30 md:rounded-full bg-purple-100 p-1 text-sm text-purple-800">
              <div class="flex items-center space-x-1 bg-purple-900 text-white border border-violet-500 rounded-3xl px-3 py-1">
                <p> Special Introductory Offer!</p>
              </div>
              <p class="md:pr-3 text-center py-3">
                Get 50% off! Pay only $4.99 (was $9.99) to unlock your
                personalized career recommendations.
              </p>
            </div>
          </div>
        </div>
        <img className="max-w-sm mx-auto" src="" />
      </div>
    </>
  );
};

export default CareerAssessmentHero;
