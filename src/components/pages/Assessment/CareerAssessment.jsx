import axios from "axios";
import React, { useEffect, useState } from "react";
import AssessmentHero from "./AssessmentHero";
import Result from "./Result";
import SendEmail from "../UserAuth/SendEmail";
import { useLocation, useNavigate } from "react-router";
import { LogIn } from "lucide-react";
import Login from "../UserAuth/Login";
import Token from "../UserAuth/Token";
import Register from "../UserAuth/Register";
import CareerAssessmentHero from "./CareerAssessmentHero";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFaceFrown } from "@fortawesome/free-solid-svg-icons";
import { faFaceFrownOpen } from "@fortawesome/free-solid-svg-icons";
import { faFaceMeh } from "@fortawesome/free-solid-svg-icons";
import { faFaceSmileBeam } from "@fortawesome/free-solid-svg-icons";
import { faFaceLaughBeam } from "@fortawesome/free-solid-svg-icons";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FaRegCircle } from "react-icons/fa6";
import { faCircle } from "@fortawesome/free-solid-svg-icons";
const CareerAssessment = () => {
  const [isLogin, setIsLogin] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState("");
  const [questionId, setQuestionId] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [currentQuestionId, setCurrentQuestionId] = React.useState(0);
  const [id, setId] = React.useState([]);
  const [result, setResult] = React.useState([]);
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
  const [allQuestionsAnswered, setAllQuestionsAnswered] = React.useState(false);

  const location = useLocation();
  //const userId = location.state?.userId || localStorage.getItem("userId");
  //const params = new URLSearchParams(location.search);

  const authToken = localStorage.getItem("authToken");
  const isPaid = localStorage.getItem("isPaid");

  //const sessionId = localStorage.getItem("sessionId");
  const navigate = useNavigate();

  const options = [
    {
      id: 1,
      title: "Strongly Disagree",
      value: "stronglyDisagree",
      class: `flex flex-col  my-auto  mx-auto  cursor-pointer rounded-full w-20 h-20  border-4 border-[#898AC4]  items-center justify-center`,
      icon: `${
        selectedValue === "stronglyDisagree" ? "bg-[#898AC4]" : "bg-white"
      }`,
    },
    {
      id: 2,
      title: "Disagree",
      value: "disagree",
      class: `flex flex-col  my-auto  mx-auto   cursor-pointer rounded-full w-16 h-16  border-4 border-[#898AC4]   items-center justify-center`,
      icon: `${selectedValue === "disagree" ? "bg-[#898AC4]" : "bg-white"}`,
    },
    {
      id: 3,
      title: "Neutral",
      value: "neutral",
      class: `flex flex-col  my-auto  mx-auto  cursor-pointer rounded-full w-10 h-10  border-4 border-[#A6AEBF]   items-center justify-center`,
      icon: `${selectedValue === "neutral" ? "bg-[#A6AEBF]" : "bg-white"}`,
    },
    {
      id: 4,
      title: "Agree",
      value: "agree",
      class: `flex flex-col  my-auto  mx-auto   tcursor-pointer rounded-full w-16 h-16  border-4 border-[#819A91]   items-center justify-center`,
      icon: `${selectedValue === "agree" ? "bg-[#819A91]" : "bg-white"}`,
    },
    {
      id: 5,
      title: "Strongly Agree",
      value: "stronglyAgree",
      class: `flex flex-col  my-auto  mx-auto  text-slate-800 cursor-pointer rounded-full w-20 h-20  border-4 border-[#819A91] hover:bg-blueviolet  items-center justify-center`,

      icon: `${
        selectedValue === "stronglyAgree" ? "bg-[#819A91]" : "bg-white"
      }`,
    },
  ];

  const userId = localStorage.getItem("userId");

  React.useEffect(() => {
    async function getTestResults() {
      try {
        if (authToken) {
          setIsLogin(true);
        }

        if (userId != null) {
          const response = await axios.get(
            `http://localhost:3000/getTestResults?userId=${userId}&testType=Career Test`
          );
          if (response.data.result == null) {
            const response = await axios.get(
              "http://localhost:3000/careerQuestions"
            );
            console.log(response.data);
            setQuestionId(response.data.id);
            setQuestions(response.data.question);
          } else {
            navigate(`/results?userId=${userId}&testType=Career Test`);
            //const { question_id, test_result } = response.data.result;
            // const questionIds = JSON.parse(question_id);
            //const testResults = JSON.parse(test_result);
            //console.log("questionIds", questionIds);
            //console.log("testResults", testResults);
            //setAllQuestionsAnswered(true);
            //calculateScore(questionIds, testResults, false);
          }
        }
      } catch (error) {
        console.log("Error: ", error);
      }
    }
    getTestResults();
  }, []);

  const handleChange = (value) => {
    setSelectedValue(value);
  };

  /*function gotoPreviousQueston() {
    if (currentQuestionId > 0) {
      setCurrentQuestionId(currentQuestionId - 1);
    }
  }*/

  async function gotoNextQuestion() {
    const updatedResults = [...result, selectedValue];
    const updatedIds = [...id, questionId[currentQuestionId]];
    if (selectedValue != "") {
      if (currentQuestionId + 1 < questions.length) {
        setResult(updatedResults);
        setId(updatedIds);
        setCurrentQuestionId((prevValue) => prevValue + 1);
        setSelectedValue("");
      } else {
        setResult(updatedResults);
        setId(updatedIds);
        const questionsAnswered = !allQuestionsAnswered;
        setAllQuestionsAnswered(questionsAnswered);
        localStorage.setItem("questionId", JSON.stringify(updatedIds));
        localStorage.setItem("results", JSON.stringify(updatedResults));
        //calculateScore(updatedIds, updatedResults, true);
        const response = await axios.post(
          `http://localhost:3000/updateCompletedTestField?userId=${userId}`
        );
        console.log("response", response.data);
        if (response.data) {
          navigate("/payment");
        }
        //calculateScore(updatedIds, updatedResults, true);
      }
    } else {
      alert("Please select an option to continue");
    }
  }

  const [isModalOpen, setIsModalOpen] = useState(false);
  function toggleModal() {
    setIsModalOpen(!isModalOpen);
  }
  return isLogin ? (
    <>
      <form>
        <CareerAssessmentHero />
        <div className="container py-20">
          <div className="font-roboto space-y-10 bg-purple-50 p-20 text-center">
            <div className="py-5">
              <label className="text-sm">
                Question {questionId[currentQuestionId]} of {questions.length}
              </label>
            </div>

            <label className="text-2xl md:text-4xl">
              {questions[currentQuestionId]}
            </label>

            <div className="bg-purple-50">
              <div className="container mb-10">
                <div className="flex flex-col items-center">
                  <div
                    className="py-5 grid md:grid-cols-7 grid-cols-1 gap-6"
                    data-aos-duration="1500"
                  >
                    {" "}
                    <h5 className="my-auto text-xl text-[#898AC4]">Disagree</h5>
                    {options.map((content) => (
                      <div
                        key={content.id}
                        onClick={() => handleChange(content.value)}
                        className={`${content.class} ${content.icon}`}
                      ></div>
                    ))}{" "}
                    <h5 className="my-auto text-xl text-[#819A91]">Agree</h5>
                  </div>
                </div>
              </div>
            </div>
            <div className="mx-auto">
              {/* Optional Previous Button */}
              {/*<button
                type="button"
                onClick={gotoPreviousQueston}
                className="mr-2 bg-gray-200 hover:bg-purple-950 hover:text-white w-12 h-10 text-purple-900 text-[14px] font-bold rounded-lg"
              >
                <FontAwesomeIcon icon={faArrowLeft} />
              </button>*/}
              <button
                type="button"
                onClick={gotoNextQuestion}
                className="bg-purple-900 hover:bg-purple-950 w-32 h-10 text-white text-[14px] font-bold rounded-lg"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </form>
    </>
  ) : (
    <Register />
  );
};

export default CareerAssessment;
