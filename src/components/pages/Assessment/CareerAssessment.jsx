import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Register from "../UserAuth/Register";
import CareerAssessmentHero from "./CareerAssessmentHero";
import { radioOptions } from "../../../constants/radioOptions";
import {
  getCareerQuestionsAPI,
  getProtectedData,
  getTestResultsAPI,
  paymentAccess,
  saveResultsAPI,
  updateCompletedTestFieldAPI,
} from "../../../api/apiService";
import Login from "../UserAuth/Login";
import { AuthContext } from "../../../context/AuthContext";
import Payment from "../UserAuth/Payment";
const CareerAssessment = () => {
  const { isLoggedIn, logout } = useContext(AuthContext);
  const [selectedValue, setSelectedValue] = React.useState("");
  const [questionId, setQuestionId] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [currentQuestionId, setCurrentQuestionId] = React.useState(0);
  const [id, setId] = React.useState([]);
  const [result, setResult] = React.useState([]);
  const [pdfFileName, setPdfFileName] = React.useState("");
  const [allQuestionsAnswered, setAllQuestionsAnswered] = React.useState(false);
  const [showPayment, setShowPayment] = React.useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const navigate = useNavigate();

  const options = radioOptions(selectedValue);
  console.log(isLoggedIn);
  useEffect(() => {
    async function getTestResults() {
      try {
        if (isLoggedIn) {
          const response = await getTestResultsAPI("Career Test");
          //console.log("response", response);
          //else {
          navigate(`/results`, {
            state: { testType: "Career Test" },
          });
          //}
        }
      } catch (error) {
        const isLoggedInOnce = sessionStorage.getItem("isLoggedInOnce");

        if (
          error.response?.status === 401 &&
          error.response?.data?.TokenExpired &&
          isLoggedInOnce === "true"
        ) {
          sessionStorage.setItem("TokenExpired", "true");
          alert(
            error.response.data.message ||
              "Session expired. Please log in again."
          );
          sessionStorage.removeItem("isLoggedInOnce");
          window.location.href = "/";

          return;
        }

        if (error.status === 403) {
          const response = await getCareerQuestionsAPI();
          setQuestionId(response.id);
          setQuestions(response.question);
        }
        console.log("Error Check: ", error.status);
      }
    }
    getTestResults();
  }, [isLoggedIn]);

  function closePaymentModal() {
    setIsPaymentModalOpen(!isPaymentModalOpen);
    navigate("/");
  }

  const handleChange = (value) => {
    setSelectedValue(value);
  };

  async function gotoNextQuestion() {
    try {
      await getProtectedData();
    } catch (error) {
      const isLoggedInOnce = sessionStorage.getItem("isLoggedInOnce");

      if (
        error.response?.status === 401 &&
        error.response?.data?.TokenExpired &&
        isLoggedInOnce === "true"
      ) {
        sessionStorage.setItem("TokenExpired", "true");

        alert(
          error.response.data.message || "Session expired. Please log in again."
        );
        sessionStorage.removeItem("isLoggedInOnce");
        window.location.href = "/";
      }
      return;
      //console.log("Error:", error);
    }
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
        await saveResultsAPI(
          JSON.stringify(updatedIds),
          JSON.stringify(updatedResults),
          "Career Test"
        );
        const response = await updateCompletedTestFieldAPI();

        if (response) {
          //const paymentAccessResponse = await paymentAccess();
          //console.log(paymentAccessResponse);
          //if (paymentAccessResponse.Paid) {
          //alert("You have already paid for the test");
          setShowPayment(true);
          //navigate("/results", {
          //tate: { testType: "Career Test" },
          //});
          // } else {
          //setShowPayment(true);
          //}
        }
      }
    } else {
      alert("Please select an option to continue");
    }
  }

  return isLoggedIn ? (
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

            <label className="text-2xl md:text-4xl text-gray-700">
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
      {showPayment && <Payment />}
    </>
  ) : (
    <Login />
  );
};

export default CareerAssessment;
