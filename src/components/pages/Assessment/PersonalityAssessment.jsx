import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Login from "../UserAuth/Login";
import {
  calculateScoreAPI,
  getPersonalityQuestionsAPI,
  getProtectedData,
  getTestResultsAPI,
  saveResultsAPI,
} from "../../../api/apiService";
import { radioOptions } from "../../../constants/radioOptions";
import PersonalityAssessmentHero from "./PersonalityAssessmentHero";
import { AuthContext } from "../../../context/AuthContext";
const PersonalityAssessment = () => {
  const { isLoggedIn } = useContext(AuthContext);
  const [selectedValue, setSelectedValue] = useState("");
  const [questionId, setQuestionId] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [currentQuestionId, setCurrentQuestionId] = useState(0);
  const [id, setId] = useState([]);
  const [result, setResult] = useState([]);
  const [pdfFileName, setPdfFileName] = useState("");
  const [allQuestionsAnswered, setAllQuestionsAnswered] = useState(false);
  const [redirectPath, setRedirectPath] = useState(null);
  const [percentage, setPercentage] = useState({
    openness: 0,
    conscientiousness: 0,
    extraversion: 0,
    agreeableness: 0,
    neuroticism: 0,
  });
  const [desc, setDesc] = useState({
    openness: "",
    conscientiousness: "",
    extraversion: "",
    agreeableness: "",
    neuroticism: "",
  });

  const navigate = useNavigate();

  const options = radioOptions(selectedValue);

  function closeModal() {
    setIsModalOpen(false);
  }

  useEffect(() => {
    async function getTestResults() {
      try {
        if (isLoggedIn) {
          const response = await getTestResultsAPI("Personality Test");

          if (response.result == null) {
            const response = await getPersonalityQuestionsAPI();

            setQuestionId(response.id);
            setQuestions(response.question);
          } else {
            const { question_id, test_result } = response.result;
            const questionIds = JSON.parse(question_id);
            const testResults = JSON.parse(test_result);

            setAllQuestionsAnswered(true);
            calculateScore(questionIds, testResults, false);
          }
        }
      } catch (error) {
        console.log("Error: ", error);
      }
    }
    getTestResults();
  }, [isLoggedIn]);

  const handleChange = (value) => {
    setSelectedValue(value);
  };

  async function calculateScore(id, result, isNewSubmission) {
    try {
      if (isNewSubmission) {
        await saveResultsAPI(
          JSON.stringify(id),
          JSON.stringify(result),
          "Personality Test"
        );
      }

      navigate(`/results`, {
        state: { testType: "Personality Test" },
      });
    } catch (error) {
      console.log("Error: ", error);
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

  return isLoggedIn ? (
    <>
      <form>
        <PersonalityAssessmentHero />

        <div className="container py-20">
          <div className="font-roboto space-y-10 bg-purple-50 p-20 text-center">
            <div className="py-5">
              <label className="text-sm">
                Question {questionId[currentQuestionId]} of {questions.length}
              </label>
            </div>

            <label className="text-2xl md:text-3xl text-gray-700">
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
    </>
  ) : (
    <Login />
  );
};

export default PersonalityAssessment;
