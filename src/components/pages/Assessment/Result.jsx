import React, { useState } from "react";
import { useLocation } from "react-router";
import Login from "../UserAuth/Login";
import axios from "axios";

const Result = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [traitDesc, setTraitDesc] = React.useState({
    openness: `Openness trait reflects the extent to which a person is open-minded, imaginative, curious, and willing to try new things. People who score high on openness tend to be creative, curious, and eager to explore new ideas and experiences. They enjoy novel experiences and often think abstractly. In contrast, individuals with lower openness may prefer routine, tradition, and familiarity.`,
    conscientiousness: `Conscientiousness refers to an individual’s degree of self-discipline, organization, and goal-oriented behavior. People who score high on conscientiousness are typically reliable, responsible, and efficient, with a strong attention to detail. They are good at managing tasks and achieving goals. Those with lower conscientiousness may be more spontaneous, flexible, and sometimes disorganized.`,
    extraversion: `Extraversion is characterized by how outgoing, energetic, and sociable a person is. Extraverts enjoy interacting with others, are often talkative, and feel energized by social situations. They tend to seek excitement and stimulation. On the other hand, introverts, who score lower in extraversion, tend to feel more comfortable in solitude or small, intimate settings.`,
    agreeableness: `Agreeableness refers to a person’s tendency to be compassionate, cooperative, and empathetic toward others. Individuals with high agreeableness are typically friendly, helpful, and considerate, often striving for harmony in relationships. Those with lower agreeableness may be more competitive, critical, or less concerned with others’ feelings.`,
    neuroticism: `Neuroticism reflects the tendency to experience negative emotions such as anxiety, stress, and emotional instability. Individuals who score high in neuroticism may be more prone to worrying, feeling anxious, and experiencing mood swings. Those who score lower in neuroticism tend to be more emotionally stable, calm, and resilient in stressful situations.`,
  });
  const location = useLocation();
  const [pdfFileName, setPdfFileName] = React.useState("");
  const [percentage, setPercentage] = React.useState({
    openness: 0,
    conscientiousness: 0,
    extraversion: 0,
    agreeableness: 0,
    neuroticism: 0,
  });

  const [desc, setDesc] = React.useState({
    openness: "",
    conscientiousness: "",
    extraversion: "",
    agreeableness: "",
    neuroticism: "",
  });
  const params = new URLSearchParams(location.search);
  const userId = params.get("userId");

  const testType = params.get("testType");
  React.useEffect(() => {
    async function getTestResults() {
      try {
        localStorage.setItem("userId", userId);
        if (userId != null) {
          const response = await axios.get(
            `http://localhost:3000/getTestResults?userId=${userId}&testType=${testType}`
          );
          const { question_id, test_result } = response.data.result;
          const questionIds = JSON.parse(question_id);
          const testResults = JSON.parse(test_result);
          console.log("questionIds", questionIds);
          console.log("testResults", testResults);

          calculateScore(questionIds, testResults);
        }
      } catch (error) {
        console.log("Error: ", error);
      }
    }
    getTestResults();
  }, []);

  async function calculateScore(id, result) {
    try {
      let response;
      if (testType === "Career Test") {
        response = await axios.get(
          `http://localhost:3000/calculateCareerScore?id=${id}&result=${result}`
        );
      } else {
        response = await axios.get(
          `http://localhost:3000/calculateScore?id=${id}&result=${result}`
        );
      }

      const {
        message,
        fileName,
        openness,
        conscientiousness,
        extraversion,
        agreeableness,
        neuroticism,
      } = response.data;
      console.log(response.data);
      setPdfFileName(fileName);
      setPercentage((prevValue) => ({
        openness: openness ? openness.score : prevValue.openness,
        conscientiousness: conscientiousness
          ? conscientiousness.score
          : prevValue.conscientiousness,
        extraversion: extraversion
          ? extraversion.score
          : prevValue.extraversion,
        agreeableness: agreeableness
          ? agreeableness.score
          : prevValue.agreeableness,
        neuroticism: neuroticism ? neuroticism.score : prevValue.neuroticism,
      }));

      setDesc((prevValue) => ({
        openness: openness ? openness.desc : prevValue.openness,
        conscientiousness: conscientiousness
          ? conscientiousness.desc
          : prevValue.conscientiousness,
        extraversion: extraversion ? extraversion.desc : prevValue.extraversion,
        agreeableness: agreeableness
          ? agreeableness.desc
          : prevValue.agreeableness,
        neuroticism: neuroticism ? neuroticism.desc : prevValue.neuroticism,
      }));
      console.log(percentage);
      /*navigate("/results", {
        state: {
          testType: "personalityTest",
          percentage: {
            Openness: openness ? openness.score : 0,
            Conscientiousness: conscientiousness ? conscientiousness.score : 0,
            Extraversion: extraversion ? extraversion.score : 0,
            Agreeableness: agreeableness ? agreeableness.score : 0,
            Neuroticism: neuroticism ? neuroticism.score : 0,
          },
          description: {
            Openness: openness ? openness.desc : "",
            Conscientiousness: conscientiousness ? conscientiousness.desc : "",
            Extraversion: extraversion ? extraversion.desc : "",
            Agreeableness: agreeableness ? agreeableness.desc : "",
            Neuroticism: neuroticism ? neuroticism.desc : "",
          },
        },
      });*/
      console.log(response.data);

      return response.data;
    } catch (error) {
      console.log("Error: ", error);
    }
  }

  function toggleModal() {
    setIsModalOpen(!isModalOpen);
  }
  function closeModal() {
    setIsModalOpen(false);
  }
  return (
    <>
      {testType === "Career Test" ? (
        <>
          <div className="flex flex-col">
            <div className="font-roboto my-auto text-gray-800">
              {" "}
              <h1
                className="text-4xl font-bold text-center py-10
               "
              >
                Career Test Results
              </h1>
              <div className="container">
                {" "}
                <p className="text-xl md:text-2xl leading-[2] text-center mx-auto px-30 font-roboto">
                  Based on your responses to the questionnaire, here's your
                  career profile
                </p>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          {" "}
          <div className="flex flex-col">
            <div className="font-roboto my-auto text-gray-800">
              {" "}
              <h1 className="text-4xl font-bold text-center py-10 ">
                Personality Test Results
              </h1>
              <div className="container">
                {" "}
                <p className="text-xl md:text-2xl leading-[2] text-center mx-auto px-30 font-roboto">
                  Based on your responses to the questionnaire, here's your
                  personality profile
                </p>
              </div>
            </div>
          </div>
        </>
      )}
      <div className="container py-20">
        {" "}
        <div className="bg-gray-100 p-10">
          <p className="text-lg md:text-xl leading-[2]  px-30 font-roboto font-bold">
            Results Overview
          </p>
          <div className=" py-5">
            <div className="flex flex-row  py-5">
              {" "}
              <p className="text-lg md:text-xl leading-[2] font-semibold  px-30 font-roboto">
                Openness{" "}
              </p>
              <span className="text-gray-700 ml-auto">
                {percentage.openness}%
              </span>
            </div>

            <div className="h-4 rounded-full overflow-hidden">
              <div
                className={`h-full ${
                  percentage.Openness === null ? "bg-gray-200" : "bg-[#819A91]"
                }`}
                style={{
                  width:
                    percentage.Openness === null
                      ? "0%"
                      : `${percentage.openness}%`,
                }}
              ></div>
            </div>

            <div className="py-5">
              <p className="text-md/7 font-roboto">{traitDesc.openness}</p>
            </div>
            <div className="py-5">
              <p className="text-md/7 font-roboto">{desc.openness}</p>
            </div>
          </div>
          <div className="py-5">
            <div className="flex flex-row  py-5">
              {" "}
              <p className="text-lg md:text-xl leading-[2] font-semibold  px-30 font-roboto">
                Conscientiousness{" "}
              </p>
              <span className="text-gray-700 ml-auto">
                {percentage.conscientiousness}%
              </span>
            </div>
            <div className="h-4  rounded-full overflow-hidden">
              <div
                className={`h-full ${
                  percentage.Conscientiousness === null
                    ? "bg-gray-200"
                    : "bg-[#687FE5]"
                }`}
                style={{
                  width:
                    percentage.conscientiousness === null
                      ? "0%"
                      : `${percentage.conscientiousness}%`,
                }}
              ></div>
            </div>
            <div className="py-5">
              <p className="text-md/7 font-roboto">
                {traitDesc.conscientiousness}
              </p>
            </div>
            <div className="py-5">
              <p className="text-md/7 font-roboto">{desc.conscientiousness}</p>
            </div>
          </div>
          <div className=" py-5">
            <div className="flex flex-row  py-5">
              {" "}
              <p className="text-lg md:text-xl leading-[2] font-semibold  px-30 font-roboto">
                Extraversion{" "}
              </p>
              <span className="text-gray-700 ml-auto">
                {percentage.extraversion}%
              </span>
            </div>
            <div className="h-4  rounded-full overflow-hidden">
              <div
                className={`h-full ${
                  percentage.extraversion === null
                    ? "bg-gray-200"
                    : "bg-[#DEAA79]"
                }`}
                style={{
                  width:
                    percentage.extraversion === null
                      ? "0%"
                      : `${percentage.extraversion}%`,
                  backgroundColor:
                    percentage.extraversion === null
                      ? "bg-gray-200"
                      : "bg-pink-700 ",
                }}
              ></div>
            </div>
            <div className="py-5">
              <p className="text-md/7 font-roboto">{traitDesc.extraversion}</p>
            </div>
            <div className="py-5">
              <p className="text-md/7 font-roboto">{desc.extraversion}</p>
            </div>
          </div>
          <div className="py-5">
            <div className="flex flex-row  py-5">
              {" "}
              <p className="text-lg md:text-xl leading-[2] font-semibold  px-30 font-roboto">
                Agreeableness{" "}
              </p>
              <span className="text-gray-700 ml-auto">
                {percentage.agreeableness}%
              </span>
            </div>
            <div className="h-4 rounded-full overflow-hidden">
              <div
                className={`h-full ${
                  percentage.agreeableness === null
                    ? "bg-gray-200"
                    : "bg-[#8E7DBE]"
                }`}
                style={{
                  width:
                    percentage.agreeableness === null
                      ? "0%"
                      : `${percentage.agreeableness}%`,
                  backgroundColor:
                    percentage.neuroticism === null
                      ? "bg-gray-200"
                      : "bg-violet-600",
                }}
              ></div>
            </div>
            <div className="py-5">
              <p className="text-md/7 font-roboto">{traitDesc.agreeableness}</p>
            </div>
            <div className="py-5">
              <p className="text-md/7 font-roboto">{desc.agreeableness}</p>
            </div>
          </div>
          <div className="py-5">
            <div className="flex flex-row  py-5">
              {" "}
              <p className="text-lg md:text-xl leading-[2] font-semibold  px-30 font-roboto">
                Neuroticism{" "}
              </p>
              <span className="text-gray-700 ml-auto">
                {percentage.neuroticism}%
              </span>
            </div>
            <div className="h-4  rounded-full overflow-hidden">
              <div
                className={`h-full ${
                  percentage.neuroticism === null
                    ? "bg-gray-200"
                    : "bg-[#AF3E3E]"
                }`}
                style={{
                  width:
                    percentage.neuroticism === null
                      ? "0%"
                      : `${percentage.neuroticism}%`,
                }}
              ></div>
            </div>{" "}
            <div className="py-5">
              <p className="text-md/7 font-roboto">{traitDesc.neuroticism}</p>
            </div>
            <div className="py-5">
              <p className="text-md/7 font-roboto">{desc.neuroticism}</p>
            </div>
          </div>
        </div>
        {/*<div className="flex flex-row py-10">
          <div className="ml-auto">
            <button
              onClick={toggleModal}
              type="button"
              className="bg-purple-900 hover:bg-purple-950  w-48 h-10 text-white text-[14px] font-bold rounded-lg"
            >
              Send Results to Email
            </button>
            {isModalOpen && <Login />}
          </div>
        </div>*/}
      </div>
    </>
  );
};

export default Result;
