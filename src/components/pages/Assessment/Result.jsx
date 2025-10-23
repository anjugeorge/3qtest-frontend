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
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import html2pdf from "html2pdf.js";
import axios from "axios";
import { IoIosSend } from "react-icons/io";
import Loading from "../Loading/loading";
import Disclaimer from "../Terms-Conditions/Disclaimer";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: true,
      text: "Your Career Compatibility Scores Based on RIASEC Types",
    },
  },
};

const Result = () => {
  const { user } = useContext(AuthContext);
  const [traitDesc, setTraitDesc] = React.useState({
    openness: `Openness trait reflects the extent to which a person is open-minded, imaginative, curious, and willing to try new things. People who score high on openness tend to be creative, curious, and eager to explore new ideas and experiences. They enjoy novel experiences and often think abstractly. In contrast, individuals with lower openness may prefer routine, tradition, and familiarity.`,
    conscientiousness: `Conscientiousness refers to an individual’s degree of self-discipline, organization, and goal-oriented behavior. People who score high on conscientiousness are typically reliable, responsible, and efficient, with a strong attention to detail. They are good at managing tasks and achieving goals. Those with lower conscientiousness may be more spontaneous, flexible, and sometimes disorganized.`,
    extraversion: `Extraversion is characterized by how outgoing, energetic, and sociable a person is. Extraverts enjoy interacting with others, are often talkative, and feel energized by social situations. They tend to seek excitement and stimulation. On the other hand, introverts, who score lower in extraversion, tend to feel more comfortable in solitude or small, intimate settings.`,
    agreeableness: `Agreeableness refers to a person’s tendency to be compassionate, cooperative, and empathetic toward others. Individuals with high agreeableness are typically friendly, helpful, and considerate, often striving for harmony in relationships. Those with lower agreeableness may be more competitive, critical, or less concerned with others’ feelings.`,
    neuroticism: `Neuroticism reflects the tendency to experience negative emotions such as anxiety, stress, and emotional instability. Individuals who score high in neuroticism may be more prone to worrying, feeling anxious, and experiencing mood swings. Those who score lower in neuroticism tend to be more emotionally stable, calm, and resilient in stressful situations.`,
  });

  const [careerTypeDesc, setCareerTypeDesc] = React.useState({
    realistic: `The Realistic trait reflects a person’s preference for practical, hands-on activities and working with tangible objects, tools, or machines. People who score high in Realistic tend to enjoy building, fixing, or operating equipment and solving concrete problems. They are often practical, dependable, and prefer working in structured environments. In contrast, individuals with lower Realistic tendencies may avoid manual or technical tasks and prefer abstract or social activities.`,

    investigative: `The Investigative trait reflects a person’s curiosity and enjoyment of exploring ideas, analyzing information, and solving complex problems. People high in Investigative tend to enjoy research, critical thinking, and intellectual challenges. They are often analytical, detail-oriented, and enjoy understanding how things work. Individuals with lower Investigative tendencies may prefer action-oriented or creative tasks over analytical thinking.`,

    artistic: `The Artistic trait reflects a person’s inclination toward creativity, self-expression, and originality. People who score high in Artistic enjoy activities like writing, designing, performing, or creating visual art. They often value imagination, innovation, and personal expression over routine or structured tasks. Those with lower Artistic tendencies may prefer predictable and conventional tasks rather than open-ended creative projects.`,

    social: `The Social trait reflects a person’s interest in helping, teaching, and interacting with others. People high in Social are empathetic, cooperative, and enjoy supporting, guiding, or working collaboratively with people. They are often skilled communicators and value relationships and community. Individuals with lower Social tendencies may prefer solitary work or tasks that do not involve direct interaction with others.`,

    enterprising: `The Enterprising trait reflects a person’s preference for leadership, persuasion, and goal-oriented activities. People high in Enterprising are ambitious, confident, and enjoy motivating others, taking risks, and achieving tangible results. They often thrive in business, sales, or management roles. Those with lower Enterprising tendencies may avoid competitive or high-pressure situations and prefer more predictable tasks.`,

    conventional: `The Conventional trait reflects a person’s preference for organization, structure, and rule-based tasks. People high in Conventional enjoy managing data, following procedures, and maintaining order. They are often reliable, detail-oriented, and efficient in routine environments. Individuals with lower Conventional tendencies may resist repetitive tasks or highly structured settings and prefer more flexible or creative work.`,
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
    realistic: 0,
    investigative: 0,
    artistic: 0,
    social: 0,
    enterprising: 0,
    conventional: 0,
    description: "",
    fullName: "",
    fieldOfStudy: "",
    career: "",
    careerDesc: "",
    actionPlan: "",
    todayRelevance: "",
    futureRelevance: "",
    strength: "",
    weaknesses: "",
  });

  const [showPayment, setShowPayment] = React.useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const testType = location.state?.testType || null;
  const [isModalOpen, setIsModalOpen] = useState(false);
  function openModal() {
    setIsModalOpen(!isModalOpen);
  }
  function closeModal() {
    setIsModalOpen(false);
  }
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
        realistic: bestCareer ? bestCareer.realistic : prevValue.realistic,

        investigative: bestCareer
          ? bestCareer.investigative
          : prevValue.investigative,

        artistic: bestCareer ? bestCareer.artistic : prevValue.artistic,
        social: bestCareer ? bestCareer.social : prevValue.social,

        enterprising: bestCareer
          ? bestCareer.enterprising
          : prevValue.enterprising,

        conventional: bestCareer
          ? bestCareer.conventional
          : prevValue.conventional,

        description: bestCareer?.description,
        fullName: bestCareer?.fullName,
        fieldOfStudy: bestCareer?.fieldOfStudy,
        career: bestCareer?.career,
        careerDesc: bestCareer?.careerDesc,
        actionPlan: bestCareer?.actionPlan,
        todayRelevance: bestCareer?.todayRelevance,
        futureRelevance: bestCareer?.futureRelevance,
        strength: bestCareer?.strength,
        weaknesses: bestCareer?.weaknesses,
      });
      console.log(bestCareer);
      return response;
    } catch (error) {
      console.log("Error: ", error);
    }
  }

  function closePaymentModal() {
    setIsPaymentModalOpen(!isPaymentModalOpen);
    navigate("/");
  }

  function MyBarChart({ bestCareer }) {
    return (
      <Bar
        data={{
          labels: [
            "Realistic",
            "Investigative",
            "Artistic",
            "Social",
            "Enterprising",
            "Conventional",
          ],
          datasets: [
            {
              label: "Scores",
              data: [
                bestCareer.realistic.percentage,
                bestCareer.investigative.percentage,
                bestCareer.artistic.percentage,
                bestCareer.social.percentage,
                bestCareer.enterprising.percentage,
                bestCareer.conventional.percentage,
              ],
              backgroundColor: [
                "#819A91",
                "#687FE5",
                "#DEAA79",
                "#8E7DBE",
                "#AF3E3E",
              ],
              barThickness: 75,
            },
          ],
        }}
        options={options}
      />
    );
  }

  let pdfBlob;

  function generatePdfAndSendEmail() {
    const element = document.getElementById("forPDF");
    const header = document.createElement("div");
    header.innerHTML = ` <div style="display:flex; margin:10px;">
              <img src="/assets/favicon.ico" style="width:32px; height:32px" />
              <h1 style="font-size:20px; font-weight:bold; font-style:italic; color:#3B0764;">
                3QTest
              </h1>
              </div>
              <div style="margin-bottom:10px;">
              <h1 style="font-size:15px; font-weight:bold; font-style:italic; color:#hhhhhh;">
                Career Assessment Report
              </h1>
              <div/>
              `;
    header.appendChild(element.cloneNode(true));
    const options = {
      margin: [5, 10, 5, 10],
      filename: "Career Assessment Report.pdf",
      image: { type: "png", quality: 1 },
      html2canvas: { scale: 1 },
      jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
    };

    html2pdf()
      .set(options)
      .from(header)
      .output("blob")
      .then((blob) => {
        pdfBlob = blob;

        sendEmail(pdfBlob);
      });
  }

  // Send PDF as email
  async function sendEmail(pdfBlob) {
    const formData = new FormData();
    formData.append("pdfFile", pdfBlob, "Career Assessment Report.pdf");

    try {
      setIsLoading(true);
      const response = await axios.post(
        "http://localhost:3000/sendResultsAsEmail",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        }
      );
      setIsLoading(false);
      alert("Email sent successfully");
      console.log(response.data);
    } catch (error) {
      console.error("Error sending email:", error);
    }
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
                        Career Interests Results
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
                        <div
                          className="text-sm  leading-loose text-center mx-auto px-30 "
                          style={{
                            background: "#fff3cd",
                            borderLeft: "10px solid #ffc107",
                            padding: "15px",
                            margin: "25px 25px",
                            borderRadius: "4px",
                            color: "#474747",
                          }}
                        >
                          {" "}
                          <p>
                            <strong>
                              Important:This is an educational exploration tool.
                              Results are AI-generated and not professionally
                              validated. Not a substitute for professional
                              assessment.
                            </strong>{" "}
                          </p>
                          <div className="text-center pt-2 text-sm text-[#474747]">
                            <p>
                              <strong>
                                Please read this disclaimer before taking the
                                test:
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
                            {isModalOpen && (
                              <Disclaimer closeModal={closeModal} />
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="container flex flex-row pt-10">
                    <div className="ml-auto">
                      <button
                        onClick={generatePdfAndSendEmail}
                        type="button"
                        className="bg-purple-900 hover:bg-purple-950  w-48 h-10 text-white text-[14px] font-bold rounded-lg flex justify-center items-center gap-1"
                      >
                        <IoIosSend className="text-lg" />
                        Send Results to Email
                      </button>
                      {isLoading && (
                        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm">
                          <button
                            type="button"
                            className="inline-flex items-center px-4 py-2 bg-indigo-500 text-white text-sm font-medium rounded-md cursor-not-allowed opacity-80"
                            disabled
                          >
                            <svg
                              className="mr-3 h-5 w-5 animate-spin text-white"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                            >
                              <circle
                                className="opacity-30"
                                cx="15"
                                cy="15"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                              ></circle>
                            </svg>
                            Sending...
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </>
              ) : (
                <>
                  {" "}
                  <div className="flex flex-col">
                    <div className="font-roboto my-auto text-gray-800">
                      {" "}
                      <h1 className="text-4xl font-bold text-center ">
                        Personality Insights Results
                      </h1>
                      <div className="container py-20">
                        {" "}
                        <p className="text-lg md:text-xl leading-[2] text-center mx-auto px-30 font-roboto">
                          Hey there! Thanks for completing the Personality Test.
                          Now, let's take a deeper dive into a thoughtful and
                          easy-to-understand breakdown of your unique traits, so
                          you can better understand your strengths, preferences,
                          and areas for growth.
                        </p>
                        <div
                          className=" text-sm  leading-loose text-center mx-auto px-30 "
                          style={{
                            background: "#fff3cd",
                            borderLeft: "10px solid #ffc107",
                            padding: "15px",
                            margin: "25px 25px",
                            borderRadius: "4px",
                            color: "#474747",
                          }}
                        >
                          {" "}
                          <p>
                            <strong>
                              Important:This is an educational exploration tool.
                              Results are AI-generated and not professionally
                              validated. Not a substitute for professional
                              assessment.
                            </strong>{" "}
                          </p>
                          <div className="text-center pt-2 text-sm text-[#474747]">
                            <p>
                              <strong>
                                Please read this disclaimer before taking the
                                test:
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
                            {isModalOpen && (
                              <Disclaimer closeModal={closeModal} />
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </>
          )}
          <div className="container mt-1 mb-5">
            {" "}
            <div id="forPDF" className="bg-gray-100  p-10">
              <p className="text-lg md:text-xl leading-[2]  px-30 font-roboto font-bold">
                Results Overview
              </p>

              <div className="pt-2">
                <div className="flex flex-col pt-3">
                  {" "}
                  <p className="text-md/7 font-roboto leading-7 py-2">
                    <strong>Hey, {user?.name || "Guest"}!</strong>
                  </p>
                  {testType === "Career Test" ? (
                    <>
                      <p className="text-md/7 font-roboto leading-7">
                        Based on your assessment, you are{" "}
                        <strong>{bestCareer.fullName}</strong>. Your career
                        profile suggests a strong inclination toward the field
                        of <strong>{bestCareer.fieldOfStudy}</strong> including
                        areas like {bestCareer.career}
                      </p>
                      <div className="py-5">
                        <p className="text-md/7 font-roboto leading-7">
                          {bestCareer.careerDesc}
                        </p>
                      </div>
                      <div className="py-5">
                        {" "}
                        <p className="text-lg md:text-xl leading-[2]  px-30 font-roboto font-bold py-2">
                          Action Plan
                        </p>
                        <p
                          className="text-md/7 font-roboto leading-7"
                          style={{ whiteSpace: "pre-line" }}
                        >
                          {bestCareer.actionPlan}
                        </p>
                      </div>
                      <div className="py-5">
                        {" "}
                        <p className="text-lg md:text-xl leading-[2]  px-30 font-roboto font-bold py-2">
                          Relevance Today & Tomorrow
                        </p>
                        <p
                          className="text-md/7 font-roboto leading-7"
                          style={{ whiteSpace: "pre-line" }}
                        >
                          {bestCareer.todayRelevance}
                        </p>
                        <p
                          className="text-md/7 font-roboto leading-7"
                          style={{ whiteSpace: "pre-line" }}
                        >
                          {bestCareer.futureRelevance}
                        </p>
                      </div>
                      <div
                        className="py-5"
                        style={{
                          pageBreakBefore: "always",
                          pageBreakInside: "avoid",
                        }}
                      >
                        <p className="text-lg md:text-xl leading-[2]  px-30 font-roboto font-bold py-2">
                          Strengths
                        </p>
                        <p
                          className="text-md/7 font-roboto leading-7"
                          style={{ whiteSpace: "pre-line" }}
                        >
                          {bestCareer.strength}
                        </p>
                      </div>
                      <div className="py-5">
                        <p className="text-lg md:text-xl leading-[2]  px-30 font-roboto font-bold py-2">
                          Potential Weakness
                        </p>
                        <p
                          className="text-md/7 font-roboto leading-7"
                          style={{ whiteSpace: "pre-line" }}
                        >
                          {bestCareer.weaknesses}
                        </p>
                      </div>
                      <div className="py-5">
                        {" "}
                        <p className="text-lg md:text-xl leading-[2]  px-30 font-roboto font-bold">
                          Type Analysis
                        </p>
                      </div>
                      <div>
                        <MyBarChart bestCareer={bestCareer} />
                      </div>
                      <div
                        className="py-2"
                        style={{
                          pageBreakBefore: "always",
                          pageBreakInside: "avoid",
                        }}
                      >
                        <div className="flex flex-row  py-5">
                          {" "}
                          <p className="text-lg md:text-xl leading-[2] font-semibold px-30 font-roboto">
                            Realistic{" "}
                          </p>
                          <span className="text-gray-700 ml-auto font-semibold">
                            {bestCareer.realistic.percentage}%
                          </span>
                        </div>

                        <div className="h-4 rounded-full overflow-hidden">
                          <div
                            className={`h-full ${
                              bestCareer.realistic === null
                                ? "bg-gray-200"
                                : "bg-[#819A91]"
                            }`}
                            style={{
                              width:
                                bestCareer.realistic === null
                                  ? "0%"
                                  : `${bestCareer.realistic.percentage}%`,
                            }}
                          ></div>
                        </div>

                        <div className="py-2">
                          <p className="text-md/7 font-roboto leading-7">
                            {careerTypeDesc.realistic}
                          </p>
                        </div>
                        <div>
                          <p
                            className="text-md/7 font-roboto leading-7"
                            dangerouslySetInnerHTML={{
                              __html: bestCareer.realistic.description,
                            }}
                          />{" "}
                        </div>
                      </div>
                      <div
                        className="py-5"
                        style={{
                          pageBreakBefore: "always",
                          pageBreakInside: "avoid",
                        }}
                      >
                        <div className="flex flex-row  py-5">
                          {" "}
                          <p className="text-lg md:text-xl leading-[2] font-semibold  px-30 font-roboto">
                            Investigative{" "}
                          </p>
                          <span className="text-gray-700 ml-auto font-semibold">
                            {bestCareer.investigative.percentage}%
                          </span>
                        </div>
                        <div className="h-4  rounded-full overflow-hidden">
                          <div
                            className={`h-full ${
                              bestCareer.investigative === null
                                ? "bg-gray-200"
                                : "bg-[#687FE5]"
                            }`}
                            style={{
                              width:
                                bestCareer.investigative === null
                                  ? "0%"
                                  : `${bestCareer.investigative.percentage}%`,
                            }}
                          ></div>
                        </div>
                        <div className="py-5">
                          <p className="text-md/7 font-roboto leading-7">
                            {careerTypeDesc.investigative}
                          </p>
                        </div>
                        <div>
                          <p
                            className="text-md/7 font-roboto leading-7"
                            dangerouslySetInnerHTML={{
                              __html: bestCareer.investigative.description,
                            }}
                          />
                        </div>
                      </div>
                      <div
                        className=" py-2"
                        style={{
                          pageBreakBefore: "always",
                          pageBreakInside: "avoid",
                        }}
                      >
                        <div className="flex flex-row  py-5">
                          {" "}
                          <p className="text-lg md:text-xl leading-[2] font-semibold  px-30 font-roboto">
                            Artistic{" "}
                          </p>
                          <span className="text-gray-700 ml-auto font-semibold">
                            {bestCareer.artistic.percentage}%
                          </span>
                        </div>
                        <div className="h-4  rounded-full overflow-hidden">
                          <div
                            className={`h-full ${
                              bestCareer.artistic === null
                                ? "bg-gray-200"
                                : "bg-[#DEAA79]"
                            }`}
                            style={{
                              width:
                                bestCareer.artistic === null
                                  ? "0%"
                                  : `${bestCareer.artistic.percentage}%`,
                              backgroundColor:
                                bestCareer.artistic === null
                                  ? "bg-gray-200"
                                  : "bg-pink-700 ",
                            }}
                          ></div>
                        </div>
                        <div className="py-2">
                          <p className="text-md/7 font-roboto leading-7 ">
                            {careerTypeDesc.artistic}
                          </p>
                        </div>
                        <div className="py-5">
                          <p
                            className="text-md/7 font-roboto leading-7"
                            dangerouslySetInnerHTML={{
                              __html: bestCareer.artistic.description,
                            }}
                          />
                        </div>
                      </div>
                      <div
                        className="py-2"
                        style={{
                          pageBreakBefore: "always",
                          pageBreakInside: "avoid",
                        }}
                      >
                        <div className="flex flex-row  py-5">
                          {" "}
                          <p className="text-lg md:text-xl leading-[2] font-semibold  px-30 font-roboto">
                            Social{" "}
                          </p>
                          <span className="text-gray-700 ml-auto font-semibold">
                            {bestCareer.social.percentage}%
                          </span>
                        </div>
                        <div className="h-4 rounded-full overflow-hidden">
                          <div
                            className={`h-full ${
                              bestCareer.social === null
                                ? "bg-gray-200"
                                : "bg-[#8E7DBE]"
                            }`}
                            style={{
                              width:
                                bestCareer.social === null
                                  ? "0%"
                                  : `${bestCareer.social.percentage}%`,
                              backgroundColor:
                                bestCareer.social === null
                                  ? "bg-gray-200"
                                  : "bg-violet-600",
                            }}
                          ></div>
                        </div>
                        <div className="py-2">
                          <p className="text-md/7 font-roboto leading-7">
                            {careerTypeDesc.social}
                          </p>
                        </div>
                        <div>
                          <p
                            className="text-md/7 font-roboto leading-7"
                            dangerouslySetInnerHTML={{
                              __html: bestCareer.social.description,
                            }}
                          />
                        </div>
                      </div>
                      <div
                        className="py-2"
                        style={{
                          pageBreakBefore: "always",
                          pageBreakInside: "avoid",
                        }}
                      >
                        <div className="flex flex-row  py-5">
                          {" "}
                          <p className="text-lg md:text-xl leading-[2] font-semibold  px-30 font-roboto">
                            Enterprising{" "}
                          </p>
                          <span className="text-gray-700 ml-auto font-semibold">
                            {bestCareer.enterprising.percentage}%
                          </span>
                        </div>
                        <div className="h-4  rounded-full overflow-hidden">
                          <div
                            className={`h-full ${
                              bestCareer.enterprising === null
                                ? "bg-gray-200"
                                : "bg-[#AF3E3E]"
                            }`}
                            style={{
                              width:
                                bestCareer.enterprising === null
                                  ? "0%"
                                  : `${bestCareer.enterprising.percentage}%`,
                            }}
                          ></div>
                        </div>{" "}
                        <div className="py-5">
                          <p className="text-md/7 font-roboto leading-7">
                            {careerTypeDesc.enterprising}
                          </p>
                        </div>
                        <div>
                          <p
                            className="text-md/7 font-roboto leading-7"
                            dangerouslySetInnerHTML={{
                              __html: bestCareer.enterprising.description,
                            }}
                          />
                        </div>
                      </div>
                      <div
                        className="py-2"
                        style={{
                          pageBreakBefore: "always",
                          pageBreakInside: "avoid",
                        }}
                      >
                        <div className="flex flex-row  py-5">
                          {" "}
                          <p className="text-lg md:text-xl leading-[2] font-semibold  px-30 font-roboto">
                            Conventional{" "}
                          </p>
                          <span className="text-gray-700 ml-auto font-semibold">
                            {bestCareer.conventional.percentage}%
                          </span>
                        </div>
                        <div className="h-4  rounded-full overflow-hidden">
                          <div
                            className={`h-full ${
                              bestCareer.conventional === null
                                ? "bg-gray-200"
                                : "bg-[#a23eaf]"
                            }`}
                            style={{
                              width:
                                bestCareer.conventional === null
                                  ? "0%"
                                  : `${bestCareer.conventional.percentage}%`,
                            }}
                          ></div>
                        </div>{" "}
                        <div className="py-5">
                          <p className="text-md/7 font-roboto leading-7">
                            {careerTypeDesc.conventional}
                          </p>
                        </div>
                        <div>
                          <p
                            className="text-md/7 font-roboto leading-7"
                            dangerouslySetInnerHTML={{
                              __html: bestCareer.conventional.description,
                            }}
                          />
                        </div>
                      </div>
                      <div
                        className="py-5"
                        style={{
                          pageBreakBefore: "always",
                          pageBreakInside: "avoid",
                        }}
                      >
                        {" "}
                        <p className="text-lg md:text-xl leading-[2]  px-30 font-roboto font-bold">
                          Conclusion
                        </p>
                        <p className="text-md/7 font-roboto leading-7">
                          Your career assessment highlights your unique
                          strengths, interests, and preferences, offering clear
                          direction for your professional journey. By aligning
                          your skills and values with the right opportunities,
                          you can pursue a path that is both fulfilling and
                          sustainable. Remember, this report is a guide—not a
                          limit. Continual learning, adaptability, and openness
                          to new experiences will help you refine your choices
                          and thrive in an ever-changing career landscape.
                        </p>
                      </div>
                    </>
                  ) : (
                    <>
                      <p className="text-md/7 font-roboto leading-7 py-5">
                        Based on your personality assessment, your key traits
                        highlight that you are best described as...
                      </p>
                      <p className="text-lg md:text-xl leading-[2]  px-30 font-roboto font-bold">
                        Trait Analysis
                      </p>
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
                        <div>
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
                        <div>
                          <p
                            className="text-md/7 font-roboto leading-7"
                            dangerouslySetInnerHTML={{
                              __html: desc.conscientiousness,
                            }}
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
                            dangerouslySetInnerHTML={{
                              __html: desc.extraversion,
                            }}
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
                            dangerouslySetInnerHTML={{
                              __html: desc.agreeableness,
                            }}
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
                            dangerouslySetInnerHTML={{
                              __html: desc.neuroticism,
                            }}
                          />
                        </div>
                      </div>
                    </>
                  )}
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
