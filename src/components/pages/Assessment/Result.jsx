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
import { Bar, Bubble, Pie, PolarArea } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  RadialLinearScale,
  ArcElement,
  BubbleController,
  PointElement,
  LineElement, // <-- for Line chart
} from "chart.js";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import html2pdf from "html2pdf.js";
import axios from "axios";
import { IoIosSend } from "react-icons/io";
import Loading from "../Loading/loading";
import Disclaimer from "../Terms-Conditions/Disclaimer";
import { Fa1, FaBrain } from "react-icons/fa6";
import { FaLightbulb } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import { FaCompass } from "react-icons/fa";
import { FaBalanceScale } from "react-icons/fa";
import { IoAlertCircle } from "react-icons/io5";
import { FaHeart } from "react-icons/fa";
import { TbMoodSadFilled } from "react-icons/tb";
import { MdAccessTimeFilled } from "react-icons/md";
import { MdHexagon } from "react-icons/md";
import { HiMiniArrowTrendingUp } from "react-icons/hi2";
import { GoGraph } from "react-icons/go";
import { FaMountain } from "react-icons/fa";
import { FaBuilding } from "react-icons/fa6";
import { FaHammer } from "react-icons/fa6";
import { FaSearch } from "react-icons/fa";
import { FaHandsHelping } from "react-icons/fa";
import { LuClipboardPenLine } from "react-icons/lu";
import { RiTeamFill } from "react-icons/ri";
ChartJS.register(
  RadialLinearScale,
  ArcElement,
  Tooltip,
  Legend,
  LinearScale,
  BubbleController,
  PointElement,
  LineElement, // <-- for Line chart
  CategoryScale
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

const title = {
  R: "The Ultimate Doer",
  I: "The Analytical Genius",
  A: "The Master Creator",
  S: "The Heartfelt Helper",
  E: "The Charismatic Leader",
  C: "The Chief Organizer",
};

const icons = {
  R: FaHammer,
  I: FaSearch,
  A: FaLightbulb,
  S: FaHandsHelping,
  E: RiTeamFill,
  C: LuClipboardPenLine,
};

const colorMap = {
  R: "#819A91",

  I: "#687FE5",
  A: "#DEAA79",
  S: "#8E7DBE",
  E: "#AF3E3E",
  C: "#a23eaf",
};

const colorMapBg = {
  R: "#D3DCD8",
  I: "#D6DDFB",
  A: "#F4E5D2",
  S: "#DDD7EE",
  E: "#EBCFCF",
  C: "#EACFEE",
};

const Result = () => {
  const { user } = useContext(AuthContext);
  const [traitDesc, setTraitDesc] = React.useState({
    openness: `Openness refers to a person's ability to think abstractly, be imaginative and have a wide range of interests. Openness is an important trait because it affects how we view the world and handle daily tasks. It makes sense that people who can think outside of the box would do better academically and in their careers, because they can think of ways to solve problems and build ideas that others may not have thought of.`,
    conscientiousness: `Conscientiousness reflects a person\'s ability to control their impulses and manage emotions, habits and behaviours effectively. It is perceived as a personality trait associated with success in many different aspects of everyday life. A recent study has demonstrated that there is a link between conscientiousness and the ability to succeed in certain careers. Researchers found that individuals who rank highly on this personality trait are more likely to find employment, earn high salaries and ascend the career ladder quickly.`,
    extraversion: `Extraversion is the state of mainly relying on external sources of satisfaction and stimulation. People who are extraverted, enjoy getting energized by social gatherings, romantic relationships and interactions with other people. They possess a great deal of warmth, enthusiasm, and self-disclosure in their dealings with others. The Extraverted person finds that engagement in the external world helps to charge their internal batteries.`,
    agreeableness: `Agreeableness is considered to be one of the most desirable personality traits, because people who are high on this dimension tend to possess positive character traits such as honesty, integrity and altruism. Because agreeable people place a high value on getting along with others, they tend to be popular and easy to get along with.`,
    neuroticism: `Neuroticism relates to emotional stability and impulse control. It contributes to individual differences in emotionality or moodiness. Neuroticism can be characterized by such traits as anxiety , anger , depressive tendencies, and guilt . It is generally viewed as a negative trait , though there are some individuals who are high in this trait and do not experience any distress. Neuroticism is a predictor of psychological disorders such as anxiety, depressive, bipolar or addictive disorders. It has been found that there is a link between neuroticism and physical arousal in the body.`,
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
    matchedCareers: [],
    primaryCareerMatch: [],
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
    if (!user) {
      window.location.href = "/";

      return;
    }
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
              "Please log in to access this test. If you’re new here, you can quickly sign up to continue."
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
        matchedCareers: bestCareer?.matchedCareers,
        primaryCareerMatch: bestCareer?.primaryCareerMatch,
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

  function MyBubbleChart({ percentage }) {
    return (
      <Bubble
        data={{
          labels: [
            "Realistic",
            "Investigative",
            "Artistic",
            "Social",
            "Enterprising",
          ],
          datasets: [
            {
              label: "Scores",
              data: [
                { x: 1, y: percentage.openness ?? 0, r: 10 },
                { x: 2, y: percentage.conscientiousness ?? 0, r: 10 },
                { x: 3, y: percentage.extraversion ?? 0, r: 10 },
                { x: 4, y: percentage.agreeableness ?? 0, r: 10 },
                { x: 5, y: percentage.neuroticism ?? 0, r: 10 },
              ],
              backgroundColor: [
                "#819A91",
                "#687FE5",
                "#DEAA79",
                "#8E7DBE",
                "#AF3E3E",
              ],
              barThickness: 25,
            },
          ],
        }}
        options={options}
      />
    );
  }

  function MyPolarAreaChart({ bestCareer }) {
    return (
      <PolarArea
        data={{
          labels: [
            "Practical", // Realistic
            "Analytical", // Investigative
            "Creative", // Artistic
            "Social", // Social
            "Ambitious", // Enterprising
            "Organized", // Conventional
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
                "#65786F", // Realistic – slightly lighter
                "#5474E0", // Investigative – slightly lighter
                "#C9986A", // Artistic – slightly lighter
                "#7F6FBF", // Social – slightly lighter
                "#A63D3D", // Enterprising – slightly lighter
                "#843FA3", // Conventional – slightly lighter
              ],
            },
          ],
        }}
        options={{
          responsive: true,
          plugins: {
            legend: {
              position: "bottom",
            },
          },
          scales: {
            r: {
              ticks: {
                beginAtZero: true,
              },
            },
          },
        }}
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
              <h1 style="font-size:16px; font-weight:bold; font-style:italic; color:#hhhhhh;">
                Career Assessment Report
              </h1>
              <div/>
              `;
    const clone = element.cloneNode(true);
    const canvas = element.querySelector("canvas");
    const clonedCanvas = clone.querySelector("canvas");
    if (canvas) {
      const img = document.createElement("img");
      img.src = canvas.toDataURL("image/png");
      img.style.width = canvas.style.width || canvas.width + "px";
      img.style.height = canvas.style.height || canvas.height + "px";
      clonedCanvas.replaceWith(img);
    }

    header.appendChild(clone);
    header.querySelectorAll("*").forEach((el) => {
      el.style.fontSize = "16px";
    });
    const options = {
      margin: [5, 5, 5, 5],
      filename: "Career Assessment Report.pdf",

      image: { type: "jpeg", quality: 0.8 },
      html2canvas: {
        scale: 3,
      },
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
                    <div className="font-roboto my-auto text-purple-950">
                      {" "}
                      <h1
                        className="text-4xl font-bold text-center py-10
               "
                      >
                        Career Interests Results
                      </h1>
                      <div className="container">
                        <p className="text-lg md:text-md/7 leading-7  mx-auto px-30 font-roboto text-justify">
                          Hey there! Thanks for completing the Career Test.
                          Let’s take a detailed, friendly look. Understanding
                          these can help you choose a career path where you’ll
                          truly thrive — with a good fit for your natural style,
                          strengths, and even challenges.
                        </p>
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
                    <div className="font-roboto my-auto text-purple-950">
                      {" "}
                      <h1 className="text-4xl  font-bold text-center ">
                        Personality Insights Results
                      </h1>
                      <div className="container py-20">
                        {" "}
                        <p className="text-lg md:text-md/7 leading-7 text-center mx-auto px-30 font-roboto">
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
          <div className="container mt-1 mb-5">
            {" "}
            <div id="forPDF" className="bg-gray-100  p-10">
              <p className="text-lg md:text-xl leading-[2]  px-30 font-roboto font-bold">
                Results Overview
              </p>

              <div className="pt-2">
                <div className="flex flex-col pt-3">
                  {" "}
                  {testType === "Career Test" ? (
                    <>
                      <div className="bg-purple-50">
                        <div className="flex flex-col items-center py-10">
                          {bestCareer.matchedCareers[0] && (
                            <h1 className="text-6xl font-roboto font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-800 to-sky-600">
                              {bestCareer.primaryCareerMatch.title}
                            </h1>
                          )}

                          <div
                            className="py-5 grid md:grid-cols-3 grid-cols-1 gap-4"
                            data-aos="fade-up"
                            data-aos-duration="1500"
                          >
                            {bestCareer.matchedCareers.map((content) => {
                              const typeNameMap = {
                                R: "Practical Power",
                                I: "Analytical Power",
                                A: "Creative Power",
                                S: "Helping Power",
                                E: "Leadership Power",
                                C: "Organizing Power",
                              };

                              const typeColor = {
                                R: "text-[#819A91]",
                                I: "text-[#687FE5]",
                                A: "text-[#DEAA79]",

                                S: "text-[#8E7DBE]",
                                E: "text-[#AF3E3E]",
                                C: "text-[#a23eaf]",
                              };

                              const percentageMap = {
                                R: bestCareer.realistic.percentage,
                                I: bestCareer.investigative.percentage,
                                A: bestCareer.artistic.percentage,

                                S: bestCareer.social.percentage,
                                E: bestCareer.enterprising.percentage,
                                C: bestCareer.conventional.percentage,
                              };

                              return (
                                <div
                                  className={`flex flex-col  shadow-sm  p-6 ${
                                    typeColor[content.type]
                                  } hover:bg-purple-800 hover:text-white`}
                                >
                                  <div
                                    key={content.id}
                                    className="flex items-center mb-4"
                                  >
                                    <h1 className="block font-bold text-5xl">
                                      {percentageMap[content.type]}%
                                    </h1>
                                  </div>
                                  <div className="text-center">
                                    <h5 className="  font-semibold text-sm/7">
                                      {typeNameMap[content.type]}
                                    </h5>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                      <p className="text-md/7 font-roboto leading-7 py-2">
                        <strong>Hey, {user?.name || "Guest"}!</strong>
                      </p>
                      <p className="text-md/7 font-roboto leading-7 pb-3">
                        Based on your assessment, you are{" "}
                        <strong>{bestCareer.fullName}</strong>.
                      </p>
                      <div className="p-5 bg-[#e0eaf4]  rounded-md">
                        <p className="text-lg md:text-xl leading-[2] px-30 font-roboto font-bold py-2 text-[#3B82F6]">
                          <HiMiniArrowTrendingUp
                            size={60}
                            style={{
                              backgroundColor: "#eaf4f1",
                              border: "solid 5px #3B82F6",
                              borderRadius: "10px",
                              padding: "5px",
                              margin: "5px",
                            }}
                          />
                          Career Insights
                        </p>
                        <p
                          className="text-md/7 font-roboto leading-7 text-justify"
                          style={{ whiteSpace: "pre-line" }}
                        >
                          {bestCareer.primaryCareerMatch?.careerDesc}
                        </p>
                      </div>
                      <div
                        className="p-10"
                        style={{
                          pageBreakBefore: "always",
                          pageBreakInside: "avoid",
                        }}
                      >
                        <h1 className="text-3xl font-roboto font-bold text-center">
                          Type Analysis
                        </h1>
                      </div>
                      <div className="grid grid-cols-3 gap-5 pb-5">
                        {bestCareer.matchedCareers?.map((content) => {
                          const percentageMap = {
                            R: bestCareer.realistic.percentage,
                            I: bestCareer.investigative.percentage,
                            A: bestCareer.artistic.percentage,

                            S: bestCareer.social.percentage,
                            E: bestCareer.enterprising.percentage,
                            C: bestCareer.conventional.percentage,
                          };
                          const IconComponent = icons[content.type];
                          return (
                            <div
                              className="p-3 bg-white rounded-xl mb-3"
                              key={content.id}
                            >
                              <p className="text-lg md:text-xl font-roboto font-bold flex items-center gap-2 text-slate-700">
                                {IconComponent && (
                                  <IconComponent
                                    size={22}
                                    style={{
                                      backgroundColor: colorMap[content.type],

                                      color: "#ffffff",
                                      borderRadius: "8px",
                                      padding: "5px",
                                      margin: "0px",
                                    }}
                                  />
                                )}
                                {title[content.type]}
                              </p>

                              <div className="flex items-center mt-2">
                                <p
                                  className=" font-semibold font-roboto text-sm/10"
                                  style={{ color: colorMap[content.type] }}
                                >
                                  {content.fullName}
                                </p>
                                <span className="text-gray-700 ml-auto font-semibold text-sm/10">
                                  {percentageMap[content.type]}%
                                </span>
                              </div>

                              <div className="h-3 rounded-full overflow-hidden mt-1 bg-gray-200">
                                <div
                                  className={`h-full `}
                                  style={{
                                    backgroundColor:
                                      percentageMap[content.type] == null
                                        ? "bg-gray-200"
                                        : colorMap[content.type],
                                    width:
                                      percentageMap[content.type] == null
                                        ? "0%"
                                        : `${percentageMap[content.type]}%`,
                                  }}
                                ></div>
                              </div>
                            </div>
                          );
                        })}
                      </div>

                      {bestCareer.matchedCareers?.map((content) => (
                        <div className="mb-5 grid md:grid-cols-1">
                          <div
                            style={{
                              backgroundColor: colorMapBg[content.type],
                            }}
                            className="flex flex-col shadow-sm  p-6 text-slate-800 "
                          >
                            <div className="flex items-center mb-4">
                              <h5 className="  font-semibold text-sm/7">
                                {content.fullName} - {title[content.type]}
                              </h5>
                            </div>
                            <p className="block  pb-3 text-sm/7 text-justify">
                              {content.careerDesc}
                            </p>
                          </div>
                        </div>
                      ))}

                      <div className="py-5">
                        {" "}
                        <p className="text-lg md:text-xl leading-[2]  px-30 font-roboto font-bold py-2"></p>
                        <div className="bg-purple-50">
                          <div className="flex flex-col items-center py-10">
                            <h1 className="text-3xl font-roboto font-bold text-center">
                              What's your power
                            </h1>
                            <div
                              className="py-5 grid md:grid-cols-3 grid-cols-1 gap-4 "
                              data-aos="fade-up"
                              data-aos-duration="1500"
                            >
                              {bestCareer.primaryCareerMatch?.powers?.map(
                                (content) => {
                                  const icons = {
                                    FaBrain: (
                                      <FaBrain
                                        size={30}
                                        style={{ color: "#8E24AA" }}
                                      />
                                    ),
                                    FaLightbulb: (
                                      <FaLightbulb
                                        size={30}
                                        style={{ color: "#8E24AA" }}
                                      />
                                    ),
                                    FaEye: (
                                      <FaEye
                                        size={30}
                                        style={{ color: "#8E24AA" }}
                                      />
                                    ),
                                    FaCompass: (
                                      <FaCompass
                                        size={30}
                                        style={{ color: "#8E24AA" }}
                                      />
                                    ),
                                    FaBalanceScale: (
                                      <FaBalanceScale
                                        size={30}
                                        style={{ color: "#8E24AA" }}
                                      />
                                    ),
                                  };
                                  return (
                                    <div className="flex flex-col bg-white shadow-sm  p-6 text-slate-800 hover:bg-purple-800 hover:text-white">
                                      <div
                                        key={content.id}
                                        className="flex items-center mb-4"
                                      >
                                        <h5 className="  font-semibold text-lg">
                                          {icons[content.icon]}
                                          {content.title}
                                        </h5>
                                      </div>
                                      <p className="block  pb-3 text-sm/7 text-justify">
                                        {content.desc}
                                      </p>
                                    </div>
                                  );
                                }
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div
                        className="bg-purple-50"
                        style={{
                          pageBreakBefore: "always",
                          pageBreakInside: "avoid",
                        }}
                      >
                        <div className="flex flex-col items-center py-10">
                          <h1 className="text-3xl font-roboto font-bold text-center pb-5">
                            Data Visualization{" "}
                          </h1>
                          <div
                            className="py-5 grid md:grid-cols-2 grid-cols-1 gap-4"
                            data-aos="fade-up"
                            data-aos-duration="1500"
                          >
                            <div className=" flex flex-col items-center ">
                              <h1 className="text-2xl font-roboto font-bold text-center pb-5">
                                Personality Overview
                              </h1>
                              <p className="block  pb-3 text-sm/7 text-justify">
                                {bestCareer.primaryCareerMatch.typeDesc}
                              </p>
                            </div>
                            <div
                              className="flex flex-col
                              bg-white
                              shadow-sm
                              p-6 rounded-3xl "
                            >
                              <MyPolarAreaChart bestCareer={bestCareer} />
                            </div>
                          </div>
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
                        <p className="text-lg md:text-xl leading-[2]  px-30 font-roboto font-bold py-2"></p>
                        <div className="bg-purple-50">
                          <div className="flex flex-col items-center py-10">
                            <h1 className="text-3xl font-roboto font-bold text-center">
                              Weakness to Transform
                            </h1>
                            <div
                              className="py-5 grid md:grid-cols-3 grid-cols-1 gap-4"
                              data-aos="fade-up"
                              data-aos-duration="1500"
                            >
                              {bestCareer.primaryCareerMatch?.weaknesses?.map(
                                (content) => {
                                  const icons = {
                                    IoAlertCircle: (
                                      <IoAlertCircle
                                        size={30}
                                        style={{ color: "#8E24AA" }}
                                      />
                                    ),
                                    FaHeart: (
                                      <FaHeart
                                        size={30}
                                        style={{ color: "#8E24AA" }}
                                      />
                                    ),
                                    TbMoodSadFilled: (
                                      <TbMoodSadFilled
                                        size={30}
                                        style={{ color: "#8E24AA" }}
                                      />
                                    ),
                                    MdAccessTimeFilled: (
                                      <MdAccessTimeFilled
                                        size={30}
                                        style={{ color: "#8E24AA" }}
                                      />
                                    ),
                                    MdHexagon: (
                                      <MdHexagon
                                        size={30}
                                        style={{ color: "#8E24AA" }}
                                      />
                                    ),
                                  };
                                  return (
                                    <div className="flex flex-col bg-white shadow-sm  p-6 text-slate-800 hover:bg-purple-800 hover:text-white">
                                      <div
                                        key={content.id}
                                        className="flex items-center mb-4"
                                      >
                                        <h5 className="  font-semibold text-lg">
                                          {icons[content.icon]}
                                          {content.title}
                                        </h5>
                                      </div>
                                      <p className="block  pb-3 text-sm/7 text-justify">
                                        {content.desc}
                                      </p>
                                    </div>
                                  );
                                }
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div
                        style={{
                          pageBreakBefore: "always",
                          pageBreakInside: "avoid",
                        }}
                      >
                        <h1 className="text-3xl font-roboto font-bold text-center">
                          Professional Overview
                        </h1>

                        <div className="flex flex-col items-center py-5">
                          <div
                            className={`py-5 grid ${
                              bestCareer.primaryCareerMatch?.workplaceHabits &&
                              bestCareer.primaryCareerMatch?.careerPaths
                                ? "md:grid-cols-2 gap-4"
                                : "md:grid-cols-1"
                            }  `}
                            data-aos="fade-up"
                            data-aos-duration="1500"
                          >
                            {bestCareer.primaryCareerMatch?.workplaceHabits && (
                              <div className="p-5 bg-[#e0eaf4]  rounded-md">
                                <p className="text-lg md:text-xl leading-[2] px-30 font-roboto font-bold py-2 text-[#3B82F6]">
                                  <FaBuilding
                                    size={60}
                                    style={{
                                      backgroundColor: "#eaf4f1",
                                      border: "solid 5px #3B82F6",
                                      borderRadius: "10px",
                                      padding: "5px",
                                      margin: "5px",
                                    }}
                                  />
                                  {
                                    bestCareer.primaryCareerMatch
                                      ?.workplaceHabits?.title
                                  }
                                </p>
                                <p
                                  className="text-md/7 font-roboto leading-7 text-justify"
                                  style={{ whiteSpace: "pre-line" }}
                                >
                                  {
                                    bestCareer.primaryCareerMatch
                                      ?.workplaceHabits?.desc
                                  }
                                </p>
                              </div>
                            )}
                            {bestCareer.primaryCareerMatch?.careerPaths && (
                              <div className="p-5 bg-[#e0ece8]  rounded-md">
                                <p className="text-lg md:text-xl leading-[2] px-30 font-roboto font-bold py-2 text-[#2DBAA4]">
                                  <HiMiniArrowTrendingUp
                                    size={60}
                                    style={{
                                      backgroundColor: "#eaf4f1",
                                      border: "solid 5px #2DBAA4",
                                      borderRadius: "10px",
                                      padding: "5px",
                                      margin: "5px",
                                    }}
                                  />
                                  {
                                    bestCareer.primaryCareerMatch?.careerPaths
                                      ?.title
                                  }
                                </p>
                                <p
                                  className="text-md/7 font-roboto leading-7 text-justify"
                                  style={{ whiteSpace: "pre-line" }}
                                >
                                  {
                                    bestCareer.primaryCareerMatch?.careerPaths
                                      ?.desc
                                  }
                                </p>
                              </div>
                            )}
                          </div>
                        </div>

                        {bestCareer.primaryCareerMatch
                          ?.seekingNewChallenges && (
                          <div className="p-5 bg-[#e920630d]  rounded-md mb-10">
                            <p className="text-lg md:text-xl leading-[2] px-30 font-roboto font-bold py-2 text-[#b5053fdb]">
                              <FaMountain
                                size={60}
                                style={{
                                  backgroundColor: "#e920630d",
                                  border: "solid 5px #b5053fdb",
                                  borderRadius: "10px",
                                  padding: "5px",
                                  margin: "5px",
                                }}
                              />
                              {
                                bestCareer.primaryCareerMatch
                                  ?.seekingNewChallenges?.title
                              }
                            </p>
                            <p
                              className="text-md/7 font-roboto leading-7 text-justify"
                              style={{ whiteSpace: "pre-line" }}
                            >
                              {
                                bestCareer.primaryCareerMatch
                                  ?.seekingNewChallenges?.desc
                              }
                            </p>
                          </div>
                        )}

                        {bestCareer.primaryCareerMatch?.whatToImprove && (
                          <div className="p-5 bg-[#E0F2FE]  rounded-md mb-10">
                            <p className="text-lg md:text-xl leading-[2] px-30 font-roboto font-bold py-2 text-blue-800">
                              <GoGraph
                                size={60}
                                style={{
                                  backgroundColor: "#E0F2FE",
                                  border: "solid 5px #1565c0",
                                  borderRadius: "10px",
                                  padding: "5px",
                                  margin: "5px",
                                }}
                              />
                              {
                                bestCareer.primaryCareerMatch?.whatToImprove
                                  ?.title
                              }
                            </p>
                            <p
                              className="text-md/7 font-roboto leading-7 text-justify"
                              style={{ whiteSpace: "pre-line" }}
                            >
                              {
                                bestCareer.primaryCareerMatch?.whatToImprove
                                  ?.desc
                              }
                            </p>
                          </div>
                        )}

                        {bestCareer.primaryCareerMatch?.idealFuture && (
                          <div className="p-5 bg-[#e920630d]  rounded-md mb-10">
                            <p className="text-lg md:text-xl leading-[2] px-30 font-roboto font-bold py-2 text-[#b5053fdb]">
                              <FaMountain
                                size={60}
                                style={{
                                  backgroundColor: "#e920630d",
                                  border: "solid 5px #b5053fdb",
                                  borderRadius: "10px",
                                  padding: "5px",
                                  margin: "5px",
                                }}
                              />
                              {
                                bestCareer.primaryCareerMatch?.idealFuture
                                  ?.title
                              }
                            </p>
                            <p
                              className="text-md/7 font-roboto leading-7 text-justify"
                              style={{ whiteSpace: "pre-line" }}
                            >
                              {bestCareer.primaryCareerMatch?.idealFuture?.desc}
                            </p>
                          </div>
                        )}
                      </div>
                    </>
                  ) : (
                    <>
                      {/*<MyBubbleChart percentage={{ percentage }} />*/}
                      <p className="text-md/7 font-roboto leading-7 py-5 text-justify">
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

                        <div className="h-4 rounded-full overflow-hidden bg-gray-300">
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
                          <p className="text-md/7 font-roboto leading-7 text-justify">
                            {traitDesc.openness}
                          </p>
                        </div>
                        <div>
                          <p
                            className="text-md/7 font-roboto leading-7 text-justify"
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
                        <div className="h-4  rounded-full overflow-hidden bg-gray-300">
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
                          <p className="text-md/7 font-roboto leading-7 text-justify">
                            {traitDesc.conscientiousness}
                          </p>
                        </div>
                        <div>
                          <p
                            className="text-md/7 font-roboto leading-7 text-justify"
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
                        <div className="h-4  rounded-full overflow-hidden bg-gray-300">
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
                          <p className="text-md/7 font-roboto leading-7  text-justify">
                            {traitDesc.extraversion}
                          </p>
                        </div>
                        <div className="py-5">
                          <p
                            className="text-md/7 font-roboto leading-7 text-justify"
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
                        <div className="h-4 rounded-full overflow-hidden bg-gray-300">
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
                          <p className="text-md/7 font-roboto leading-7 text-justify">
                            {traitDesc.agreeableness}
                          </p>
                        </div>
                        <div className="py-3">
                          <p
                            className="text-md/7 font-roboto leading-7 text-justify"
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
                        <div className="h-4  rounded-full overflow-hidden bg-gray-300">
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
                          <p className="text-md/7 font-roboto leading-7  text-justify">
                            {traitDesc.neuroticism}
                          </p>
                        </div>
                        <div className="py-3">
                          <p
                            className="text-md/7 font-roboto leading-7  text-justify"
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
          </div>
        </>
      )}
    </>
  );
};

export default Result;
