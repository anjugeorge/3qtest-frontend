import React, { use, useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import {
  calculateCareerScoreAPI,
  calculateScoreAPI,
  getProtectedData,
  getTestResultsAPI,
} from "../../../api/apiService";
import { AuthContext } from "../../../context/AuthContext";
import Payment from "../UserAuth/Payment";
import Landing from "../Landing/Landing";
const Result = () => {
  const { user } = useContext(AuthContext);
  const [traitDesc, setTraitDesc] = React.useState({
    openness: `Openness trait reflects the extent to which a person is open-minded, imaginative, curious, and willing to try new things. People who score high on openness tend to be creative, curious, and eager to explore new ideas and experiences. They enjoy novel experiences and often think abstractly. In contrast, individuals with lower openness may prefer routine, tradition, and familiarity.`,
    conscientiousness: `Conscientiousness refers to an individual’s degree of self-discipline, organization, and goal-oriented behavior. People who score high on conscientiousness are typically reliable, responsible, and efficient, with a strong attention to detail. They are good at managing tasks and achieving goals. Those with lower conscientiousness may be more spontaneous, flexible, and sometimes disorganized.`,
    extraversion: `Extraversion is characterized by how outgoing, energetic, and sociable a person is. Extraverts enjoy interacting with others, are often talkative, and feel energized by social situations. They tend to seek excitement and stimulation. On the other hand, introverts, who score lower in extraversion, tend to feel more comfortable in solitude or small, intimate settings.`,
    agreeableness: `Agreeableness refers to a person’s tendency to be compassionate, cooperative, and empathetic toward others. Individuals with high agreeableness are typically friendly, helpful, and considerate, often striving for harmony in relationships. Those with lower agreeableness may be more competitive, critical, or less concerned with others’ feelings.`,
    neuroticism: `Neuroticism reflects the tendency to experience negative emotions such as anxiety, stress, and emotional instability. Individuals who score high in neuroticism may be more prone to worrying, feeling anxious, and experiencing mood swings. Those who score lower in neuroticism tend to be more emotionally stable, calm, and resilient in stressful situations.`,
  });
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
  const [bestCareer, setBestCareer] = React.useState({
    name: "",
    careerDesc: "",
  });
  const [showPayment, setShowPayment] = React.useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const testType = location.state?.testType || null;

  React.useEffect(() => {
    if (!user) return;
    if (testType === null) {
      setTimeout(() => {
        alert(
          "To view your results, please select a test type first. If you haven’t taken any test, please complete one to continue."
        );
        window.location.href = "/";
      }, 100);

      return;
    }
    async function getTestResults() {
      try {
        const response = await getTestResultsAPI(testType);
        if (response.showPaymentModal) {
          setShowPayment(true);
          alert(
            "You have completed the test. To view your results, please proceed to payment"
          );
        } else {
          setShowPayment(false);
          const { question_id, test_result } = response.result;

          const questionIds = JSON.parse(question_id);
          const testResults = JSON.parse(test_result);

          calculateScore(questionIds, testResults);
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
      }
    }
    getTestResults();
  }, [user, testType]);

  async function calculateScore(id, result) {
    try {
      let response;
      if (testType === "Career Test") {
        //if (user.is_paid === 1) {
        //setShowPayment(false);
        response = await calculateCareerScoreAPI(
          id.join(","),
          result.join(",")
        );
        //} else {
        //setShowPayment(true);
        //alert(
        ("You have completed the test. To view your results, please proceed to payment");
        //);
        //}
      } else if (testType === "Personality Test") {
        response = await calculateScoreAPI(id.join(","), result.join(","));
      }

      const {
        openness,
        conscientiousness,
        extraversion,
        agreeableness,
        neuroticism,
        bestCareer,
      } = response;
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

      setBestCareer({
        name: bestCareer?.name,
        careerDesc: bestCareer?.careerDesc, // Make sure the description is being passed here
      });

      return response;
    } catch (error) {
      console.log("Error: ", error);
    }
  }

  function closePaymentModal() {
    setIsPaymentModalOpen(!isPaymentModalOpen);
    navigate("/");
  }

  return (
    <>
      {showPayment ? (
        <Payment closePaymentModal={closePaymentModal} />
      ) : (
        <>
          {" "}
          {testType === null ? (
            <Landing />
          ) : (
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
                        <p className="text-lg md:text-xl leading-[2] text-center mx-auto px-30 font-roboto">
                          Hey there! Thanks for completing the Career Test.
                          Let’s take a detailed, friendly look. Understanding
                          these can help you choose a career path where you’ll
                          truly thrive — with a good fit for your natural style,
                          strengths, and even challenges.
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
                        <p className="text-lg md:text-xl leading-[2] text-center mx-auto px-30 font-roboto">
                          Hey there! Thanks for completing the Personality Test.
                          Now, let's take a deeper dive into a thoughtful and
                          easy-to-understand breakdown of your unique traits, so
                          you can better understand your strengths, preferences,
                          and areas for growth.
                        </p>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </>
          )}
          <div className="container py-20">
            {" "}
            <div className="bg-gray-100 p-10">
              <p className="text-lg md:text-xl leading-[2]  px-30 font-roboto font-bold">
                Results Overview
              </p>
              <div className=" pt-2">
                <div className="flex flex-col pt-3">
                  {" "}
                  <p className="text-md/7 font-roboto leading-7 py-2">
                    <strong>Hey, {user?.name || "Guest"}!</strong>
                  </p>
                  {testType === "Career Test" ? (
                    <p className="text-md/7 font-roboto leading-7">
                      Based on your personality profile, your top career match
                      is <strong>{bestCareer.name}</strong>
                    </p>
                  ) : (
                    <p className="text-md/7 font-roboto leading-7">
                      Based on your personality assessment, your key traits
                      highlight that you are best described as...
                    </p>
                  )}
                  <p className="text-md/7 font-roboto leading-7">
                    {bestCareer.careerDesc}
                  </p>
                </div>
              </div>

              <div className=" py-5">
                <div className="flex flex-row  py-5">
                  {" "}
                  <p className="text-lg md:text-xl leading-[2] font-semibold px-30 font-roboto">
                    Openness{" "}
                  </p>
                  <span className="text-gray-700 ml-auto font-semibold">
                    {percentage.openness}%
                  </span>
                </div>

                <div className="h-4 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${
                      percentage.Openness === null
                        ? "bg-gray-200"
                        : "bg-[#819A91]"
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
                  <p className="text-md/7 font-roboto leading-7">
                    {traitDesc.openness}
                  </p>
                </div>
                <div className="py-3">
                  <p
                    className="text-md/7 font-roboto leading-7"
                    dangerouslySetInnerHTML={{ __html: desc.openness }}
                  />{" "}
                </div>
              </div>
              <div className="py-5">
                <div className="flex flex-row  py-5">
                  {" "}
                  <p className="text-lg md:text-xl leading-[2] font-semibold  px-30 font-roboto">
                    Conscientiousness{" "}
                  </p>
                  <span className="text-gray-700 ml-auto font-semibold">
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
                  <p className="text-md/7 font-roboto leading-7">
                    {traitDesc.conscientiousness}
                  </p>
                </div>
                <div className="py-3">
                  <p
                    className="text-md/7 font-roboto leading-7"
                    dangerouslySetInnerHTML={{ __html: desc.conscientiousness }}
                  />
                </div>
              </div>
              <div className=" py-5">
                <div className="flex flex-row  py-5">
                  {" "}
                  <p className="text-lg md:text-xl leading-[2] font-semibold  px-30 font-roboto">
                    Extraversion{" "}
                  </p>
                  <span className="text-gray-700 ml-auto font-semibold">
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
                  <p className="text-md/7 font-roboto leading-7 font-semibold">
                    {traitDesc.extraversion}
                  </p>
                </div>
                <div className="py-5">
                  <p
                    className="text-md/7 font-roboto leading-7"
                    dangerouslySetInnerHTML={{ __html: desc.extraversion }}
                  />
                </div>
              </div>
              <div className="py-3">
                <div className="flex flex-row  py-5">
                  {" "}
                  <p className="text-lg md:text-xl leading-[2] font-semibold  px-30 font-roboto">
                    Agreeableness{" "}
                  </p>
                  <span className="text-gray-700 ml-auto font-semibold">
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
                  <p className="text-md/7 font-roboto leading-7">
                    {traitDesc.agreeableness}
                  </p>
                </div>
                <div className="py-3">
                  <p
                    className="text-md/7 font-roboto leading-7"
                    dangerouslySetInnerHTML={{ __html: desc.agreeableness }}
                  />
                </div>
              </div>
              <div className="py-5">
                <div className="flex flex-row  py-5">
                  {" "}
                  <p className="text-lg md:text-xl leading-[2] font-semibold  px-30 font-roboto">
                    Neuroticism{" "}
                  </p>
                  <span className="text-gray-700 ml-auto font-semibold">
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
                  <p className="text-md/7 font-roboto leading-7">
                    {traitDesc.neuroticism}
                  </p>
                </div>
                <div className="py-3">
                  <p
                    className="text-md/7 font-roboto leading-7"
                    dangerouslySetInnerHTML={{ __html: desc.neuroticism }}
                  />
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
      )}
    </>
  );
};

export default Result;
