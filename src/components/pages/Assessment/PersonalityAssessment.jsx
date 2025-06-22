import axios from "axios";
import React, { useEffect, useState } from "react";
import AssessmentHero from "./AssessmentHero";
import { useLocation, useNavigate } from "react-router";
import Login from "../UserAuth/Login";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFaceFrown } from "@fortawesome/free-solid-svg-icons";
import { faFaceFrownOpen } from "@fortawesome/free-solid-svg-icons";
import { faFaceMeh } from "@fortawesome/free-solid-svg-icons";
import { faFaceSmileBeam } from "@fortawesome/free-solid-svg-icons";
import { faFaceLaughBeam } from "@fortawesome/free-solid-svg-icons";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FaRegCircle } from "react-icons/fa6";
import { faCircle } from "@fortawesome/free-solid-svg-icons";
import Register from "../UserAuth/Register";

/*const options = [
  {
    id: 1,
    title: "Strongly Disagree",
    value: "stronglyDisagree",
    icon: (
      <FontAwesomeIcon
        icon={faFaceFrown}
        style={{ fontSize: "30px", padding: "10px", color: "blueviolet" }}
      />
    ),
  },
  {
    id: 2,
    title: "Disagree",
    value: "disagree",
    icon: (
      <FontAwesomeIcon
        icon={faFaceFrownOpen}
        style={{ fontSize: "30px", padding: "10px", color: "orangered" }}
      />
    ),
  },
  {
    id: 3,
    title: "Neutral",
    value: "neutral",
    icon: (
      <FontAwesomeIcon
        icon={faFaceMeh}
        style={{ fontSize: "30px", padding: "10px", color: "orange" }}
      />
    ),
  },
  {
    id: 4,
    title: "Agree",
    value: "agree",
    icon: (
      <FontAwesomeIcon
        icon={faFaceSmileBeam}
        style={{ fontSize: "30px", padding: "10px", color: "olive" }}
      />
    ),
  },
  {
    id: 5,
    title: "Strongly Agree",
    value: "stronglyAgree",
    icon: (
      <FontAwesomeIcon
        icon={faFaceLaughBeam}
        style={{ fontSize: "30px", padding: "10px", color: "darkgreen" }}
      />
    ),
  },
];*/

const PersonalityAssessment = () => {
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
  //const params = new URLSearchParams(location.search);
  const userId = localStorage.getItem("userId");
  const authToken = localStorage.getItem("authToken");
  console.log(userId);
  console.log(authToken);
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

  React.useEffect(() => {
    async function getTestResults() {
      try {
        if (authToken) {
          setIsLogin(true);
        }

        if (userId != null) {
          const response = await axios.get(
            `http://localhost:3000/getTestResults?userId=${userId}&testType=Personality Test`
          );
          if (response.data.result == null) {
            const response = await axios.get("http://localhost:3000/questions");
            console.log(response.data);
            setQuestionId(response.data.id);
            setQuestions(response.data.question);
          } else {
            const { question_id, test_result } = response.data.result;
            const questionIds = JSON.parse(question_id);
            const testResults = JSON.parse(test_result);
            console.log("questionIds", questionIds);
            console.log("testResults", testResults);
            setAllQuestionsAnswered(true);
            calculateScore(questionIds, testResults, false);
          }
        }
      } catch (error) {
        console.log("Error: ", error);
      }
    }
    getTestResults();
  }, [authToken]);

  const handleChange = (value) => {
    setSelectedValue(value);
  };

  async function calculateScore(id, result, isNewSubmission) {
    try {
      if (isNewSubmission) {
        await axios.post("http://localhost:3000/saveResults", {
          userId: userId,
          questionId: JSON.stringify(id),
          testResults: JSON.stringify(result),
          testType: "Personality Test",
        });
      }

      //console.log("id", id);
      //console.log("result", result);
      //if (userId === null) {
      //const sessionId = Math.random.toString(36).substring(7);
      //localStorage.setItem("sessionId", sessionId);
      //localStorage.setItem("questionId", JSON.stringify(id));
      //localStorage.setItem("testResults", JSON.stringify(result));
      //localStorage.setItem("userId", userId);
      //}
      const response = await axios.get(
        `http://localhost:3000/calculateScore?id=${id}&result=${result}`
      );

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
      navigate(`/results?userId=${userId}&testType=Personality Test`);
      /*, {
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

  function gotoPreviousQueston() {
    if (currentQuestionId > 0) {
      setCurrentQuestionId(currentQuestionId - 1);
    }
  }

  function gotoNextQuestion() {
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
        calculateScore(updatedIds, updatedResults, true);
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
        <AssessmentHero />

        <div className="container py-20">
          <div className="font-roboto space-y-10 bg-purple-50 p-20 text-center">
            <div className="py-5">
              <label className="text-sm">
                Question {questionId[currentQuestionId]} of {questions.length}
              </label>
            </div>

            <label className="text-2xl md:text-3xl">
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
    <Login />
  );
};

export default PersonalityAssessment;
