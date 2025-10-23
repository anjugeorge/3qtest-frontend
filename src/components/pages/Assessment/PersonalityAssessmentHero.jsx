import React, { useState } from "react";
import TermsAndConditions from "../Terms-Conditions/TermsAndConditions";
import Disclaimer from "../Terms-Conditions/Disclaimer";

const PersonalityAssessmentHero = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  function openModal() {
    setIsModalOpen(!isModalOpen);
  }
  function closeModal() {
    setIsModalOpen(false);
  }
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
        <div
          className="py-5 text-sm  leading-loose text-center mx-auto px-30 "
          style={{
            background: "#fff3cd",
            borderLeft: "10px solid #ffc107",
            padding: "15px",
            margin: "50px 50px",
            borderRadius: "4px",
            color: "#474747",
          }}
        >
          {" "}
          <p>
            <strong>
              Important:This is an educational exploration tool. Results are
              AI-generated and not professionally validated. Not a substitute
              for professional assessment.
            </strong>{" "}
          </p>
          <div className="text-center pt-2 text-sm text-[#474747]">
            <p>
              <strong>
                Please read this disclaimer before taking the test:
              </strong>
            </p>
            <a
              href="#"
              style={{ textDecoration: "underline" }}
              onClick={(e) => {
                e.preventDefault;
                openModal();
              }}
            >
              <strong>Disclaimer</strong>
            </a>
            {isModalOpen && <Disclaimer closeModal={closeModal} />}
          </div>
        </div>
      </div>
      <img className="max-w-sm mx-auto" src="" />
    </div>
  );
};

export default PersonalityAssessmentHero;
