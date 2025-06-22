import * as React from "react";
import { Questions } from "../Questions/Questions";
import AssessmentHero from "./AssessmentHero";
import Result from "./Result";
import axios from "axios";

export default function Assessment() {
  const [Questions, setQuestions] = React.useState([]);
  const [selectedValue, setSelectedValue] = React.useState("");
  const [score, setScore] = React.useState(0);
  const [currentQuestionId, setCurrentQuestionId] = React.useState(0);
  const [traitDesc, setTraitDesc] = React.useState({
    openness: `Openness trait reflects the extent to which a person is open-minded, imaginative, curious, and willing to try new things. People who score high on openness tend to be creative, curious, and eager to explore new ideas and experiences. They enjoy novel experiences and often think abstractly. In contrast, individuals with lower openness may prefer routine, tradition, and familiarity.`,
    conscientiousness: `Conscientiousness refers to an individual’s degree of self-discipline, organization, and goal-oriented behavior. People who score high on conscientiousness are typically reliable, responsible, and efficient, with a strong attention to detail. They are good at managing tasks and achieving goals. Those with lower conscientiousness may be more spontaneous, flexible, and sometimes disorganized.`,
    extraversion: `Extraversion is characterized by how outgoing, energetic, and sociable a person is. Extraverts enjoy interacting with others, are often talkative, and feel energized by social situations. They tend to seek excitement and stimulation. On the other hand, introverts, who score lower in extraversion, tend to feel more comfortable in solitude or small, intimate settings.`,
    agreeableness: `Agreeableness refers to a person’s tendency to be compassionate, cooperative, and empathetic toward others. Individuals with high agreeableness are typically friendly, helpful, and considerate, often striving for harmony in relationships. Those with lower agreeableness may be more competitive, critical, or less concerned with others’ feelings.`,
    neuroticism: `Neuroticism reflects the tendency to experience negative emotions such as anxiety, stress, and emotional instability. Individuals who score high in neuroticism may be more prone to worrying, feeling anxious, and experiencing mood swings. Those who score lower in neuroticism tend to be more emotionally stable, calm, and resilient in stressful situations.`,
  });
  const [result, setResult] = React.useState({
    openness: [],
    conscientiousness: [],
    extraversion: [],
    agreeableness: [],
    neuroticism: [],
  });
  const [total, setTotal] = React.useState({
    openness: 0,
    conscientiousness: 0,
    extraversion: 0,
    agreeableness: 0,
    neuroticism: 0,
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
  const [allQuestionsAnswered, setAllQuestionsAnswered] = React.useState(false);

  const totalQuestionsCount = Questions.length;
  const opennessCount = Questions.filter(
    (question) => question.trait === "Openness"
  ).length;
  const conscientiousnessCount = Questions.filter(
    (question) => question.trait === "Conscientiousness"
  ).length;
  const extraversionCount = Questions.filter(
    (question) => question.trait === "Extraversion"
  ).length;
  const agreeablenessCount = Questions.filter(
    (question) => question.trait === "Agreeableness"
  ).length;
  const neuroticismCount = Questions.filter(
    (question) => question.trait === "Neuroticism"
  ).length;

  React.useEffect(() => {
    async function getAllQuestions() {
      try {
        const response = axios.get("http://localhost:3000/questions");
        console.log(response);
        setQuestions(response);
        return response;
      } catch (error) {
        console.log("Error: ", error);
      }
    }
    getAllQuestions();
  }, []);

  let newScore = 0;
  const handleChange = (event) => {
    setSelectedValue(event.target.value);
    /*if (currentQuestionId + 1 === Questions.length) {
      console.log("All questions answered");
      const questionsAnswered = !allQuestionsAnswered;
      setAllQuestionsAnswered(questionsAnswered);
    }*/
    //setSelectedValue(event.target.value);
    if (Questions[currentQuestionId].trait === "Openness") {
      if (Questions[currentQuestionId].facet === "negative") {
        if (event.target.value === "stronglyDisagree") {
          newScore = 5;
        } else if (event.target.value === "disagree") {
          newScore = 4;
        } else if (event.target.value == "neutral") {
          newScore = 3;
        } else if (event.target.value === "agree") {
          newScore = 2;
        } else if (event.target.value === "stronglyAgree") {
          newScore = 1;
        }
      } else if (Questions[currentQuestionId].facet === "positive") {
        if (event.target.value === "stronglyDisagree") {
          newScore = 1;
        } else if (event.target.value === "disagree") {
          newScore = 2;
        } else if (event.target.value == "neutral") {
          newScore = 3;
        } else if (event.target.value === "agree") {
          newScore = 4;
        } else if (event.target.value === "stronglyAgree") {
          newScore = 5;
        }
      }
      const questionIndex = Questions.findIndex(
        (question) => question.id === Questions[currentQuestionId].id
      );
      let updatedOpennessScores = [...result.openness];

      if (questionIndex >= 0 && questionIndex < updatedOpennessScores.length) {
        // Replace the score at this index
        updatedOpennessScores[questionIndex] = newScore;
      } else {
        // Add new score
        updatedOpennessScores.push(newScore);
      }
      const updatedResult = {
        openness: [updatedOpennessScores],
        conscientiousness: [...result.conscientiousness],
        extraversion: [...result.extraversion],
        agreeableness: [...result.agreeableness],
        neuroticism: [...result.neuroticism],
      };
      setResult(updatedResult);

      const updatedTotal = updatedResult.openness.reduce(
        (accumulator, newScore) => accumulator + newScore,
        0
      );
      console.log(updatedTotal);

      setTotal((prevValue) => ({
        openness: updatedTotal,
        conscientiousness: prevValue.conscientiousness,
        extraversion: prevValue.extraversion,
        agreeableness: prevValue.agreeableness,
        neuroticism: prevValue.neuroticism,
      }));

      if (updatedResult.openness.length === opennessCount) {
        calculatePercentage(updatedTotal);
        console.log("All questions answered");
      }
    } else if (Questions[currentQuestionId].trait === "Conscientiousness") {
      if (Questions[currentQuestionId].facet === "negative") {
        if (event.target.value === "stronglyDisagree") {
          newScore = 5;
        } else if (event.target.value === "disagree") {
          newScore = 4;
        } else if (event.target.value == "neutral") {
          newScore = 3;
        } else if (event.target.value === "agree") {
          newScore = 2;
        } else if (event.target.value === "stronglyAgree") {
          newScore = 1;
        }
      } else if (Questions[currentQuestionId].facet === "positive") {
        if (event.target.value === "stronglyDisagree") {
          newScore = 1;
        } else if (event.target.value === "disagree") {
          newScore = 2;
        } else if (event.target.value == "neutral") {
          newScore = 3;
        } else if (event.target.value === "agree") {
          newScore = 4;
        } else if (event.target.value === "stronglyAgree") {
          newScore = 5;
        }
      }
      const questionIndex = Questions.findIndex(
        (question) => question.id === Questions[currentQuestionId].id
      );
      let updatedConscientiousnessScores = [...result.conscientiousness];

      if (
        questionIndex >= 0 &&
        questionIndex < updatedConscientiousnessScores.length
      ) {
        // Replace the score at this index
        updatedConscientiousnessScores[questionIndex] = newScore;
      } else {
        // Add new score
        updatedConscientiousnessScores.push(newScore);
      }
      const updatedConscientiousnessResult = {
        openness: [...result.openness],
        conscientiousness: [updatedConscientiousnessScores],
        extraversion: [...result.extraversion],
        agreeableness: [...result.agreeableness],
        neuroticism: [...result.neuroticism],
      };
      setResult(updatedConscientiousnessResult);

      const updatedConscientiousnessTotal =
        updatedConscientiousnessResult.conscientiousness.reduce(
          (accumulator, newScore) => accumulator + newScore,
          0
        );
      console.log(updatedConscientiousnessTotal);

      setTotal((prevValue) => ({
        openness: prevValue.openness,
        conscientiousness: updatedConscientiousnessTotal,
        extraversion: prevValue.extraversion,
        agreeableness: prevValue.agreeableness,
        neuroticism: prevValue.neuroticism,
      }));

      if (
        updatedConscientiousnessResult.conscientiousness.length ===
        conscientiousnessCount
      ) {
        calculatePercentage(updatedConscientiousnessTotal);
        console.log("All questions answered");
      }
    } else if (Questions[currentQuestionId].trait === "Extraversion") {
      if (Questions[currentQuestionId].facet === "negative") {
        if (event.target.value === "stronglyDisagree") {
          newScore = 5;
        } else if (event.target.value === "disagree") {
          newScore = 4;
        } else if (event.target.value == "neutral") {
          newScore = 3;
        } else if (event.target.value === "agree") {
          newScore = 2;
        } else if (event.target.value === "stronglyAgree") {
          newScore = 1;
        }
      } else if (Questions[currentQuestionId].facet === "positive") {
        if (event.target.value === "stronglyDisagree") {
          newScore = 1;
        } else if (event.target.value === "disagree") {
          newScore = 2;
        } else if (event.target.value == "neutral") {
          newScore = 3;
        } else if (event.target.value === "agree") {
          newScore = 4;
        } else if (event.target.value === "stronglyAgree") {
          newScore = 5;
        }
      }
      const questionIndex = Questions.findIndex(
        (question) => question.id === Questions[currentQuestionId].id
      );
      let updatedExtraversionScores = [...result.extraversion];

      if (
        questionIndex >= 0 &&
        questionIndex < updatedExtraversionScores.length
      ) {
        // Replace the score at this index
        updatedExtraversionScores[questionIndex] = newScore;
      } else {
        // Add new score
        updatedExtraversionScores.push(newScore);
      }
      const updatedExtraversionResult = {
        openness: [...result.openness],
        conscientiousness: [...result.conscientiousness],
        extraversion: [updatedExtraversionScores],
        agreeableness: [...result.agreeableness],
        neuroticism: [...result.neuroticism],
      };
      setResult(updatedExtraversionResult);

      const updatedExtraversionTotal =
        updatedExtraversionResult.extraversion.reduce(
          (accumulator, newScore) => accumulator + newScore,
          0
        );
      console.log(updatedExtraversionTotal);

      setTotal((prevValue) => ({
        openness: prevValue.openness,
        conscientiousness: prevValue.conscientiousness,
        extraversion: updatedExtraversionTotal,
        agreeableness: prevValue.agreeableness,
        neuroticism: prevValue.neuroticism,
      }));

      if (updatedExtraversionResult.extraversion.length === extraversionCount) {
        calculatePercentage(updatedExtraversionTotal);
        console.log("All questions answered");
      }
    } else if (Questions[currentQuestionId].trait === "Agreeableness") {
      if (Questions[currentQuestionId].facet === "negative") {
        if (event.target.value === "stronglyDisagree") {
          newScore = 5;
        } else if (event.target.value === "disagree") {
          newScore = 4;
        } else if (event.target.value == "neutral") {
          newScore = 3;
        } else if (event.target.value === "agree") {
          newScore = 2;
        } else if (event.target.value === "stronglyAgree") {
          newScore = 1;
        }
      } else if (Questions[currentQuestionId].facet === "positive") {
        if (event.target.value === "stronglyDisagree") {
          newScore = 1;
        } else if (event.target.value === "disagree") {
          newScore = 2;
        } else if (event.target.value == "neutral") {
          newScore = 3;
        } else if (event.target.value === "agree") {
          newScore = 4;
        } else if (event.target.value === "stronglyAgree") {
          newScore = 5;
        }
      }

      const questionIndex = Questions.findIndex(
        (question) => question.id === Questions[currentQuestionId].id
      );
      let updatedAgreeablenessScores = [...result.agreeableness];

      if (
        questionIndex >= 0 &&
        questionIndex < updatedAgreeablenessScores.length
      ) {
        // Replace the score at this index
        updatedAgreeablenessScores[questionIndex] = newScore;
      } else {
        // Add new score
        updatedAgreeablenessScores.push(newScore);
      }

      const updatedAgreeablenessResult = {
        openness: [...result.openness],
        conscientiousness: [...result.conscientiousness],
        extraversion: [...result.extraversion],
        agreeableness: updatedAgreeablenessScores,
        neuroticism: [...result.neuroticism],
      };
      setResult(updatedAgreeablenessResult);

      const updatedAgreeablenessTotal =
        updatedAgreeablenessResult.agreeableness.reduce(
          (accumulator, newScore) => accumulator + newScore,
          0
        );
      console.log(updatedAgreeablenessTotal);

      setTotal((prevValue) => ({
        openness: prevValue.openness,
        conscientiousness: prevValue.conscientiousness,
        extraversion: prevValue.extraversion,
        agreeableness: updatedAgreeablenessTotal,
        neuroticism: prevValue.neuroticism,
      }));

      if (
        updatedAgreeablenessResult.agreeableness.length === agreeablenessCount
      ) {
        calculatePercentage(updatedAgreeablenessTotal);
        console.log("All questions answered");
      }
    } else if (Questions[currentQuestionId].trait === "Neuroticism") {
      if (Questions[currentQuestionId].facet === "negative") {
        if (event.target.value === "stronglyDisagree") {
          newScore = 5;
        } else if (event.target.value === "disagree") {
          newScore = 4;
        } else if (event.target.value == "neutral") {
          newScore = 3;
        } else if (event.target.value === "agree") {
          newScore = 2;
        } else if (event.target.value === "stronglyAgree") {
          newScore = 1;
        }
      } else if (Questions[currentQuestionId].facet === "positive") {
        if (event.target.value === "stronglyDisagree") {
          newScore = 1;
        } else if (event.target.value === "disagree") {
          newScore = 2;
        } else if (event.target.value == "neutral") {
          newScore = 3;
        } else if (event.target.value === "agree") {
          newScore = 4;
        } else if (event.target.value === "stronglyAgree") {
          newScore = 5;
        }
      }
      const questionIndex = Questions.findIndex(
        (question) => question.id === Questions[currentQuestionId].id
      );
      let updatedNeuroticismScores = [...result.neuroticism];

      if (
        questionIndex >= 0 &&
        questionIndex < updatedNeuroticismScores.length
      ) {
        // Replace the score at this index
        updatedNeuroticismScores[questionIndex] = newScore;
      } else {
        // Add new score
        updatedNeuroticismScores.push(newScore);
      }
      const updatedNeuroticismResult = {
        openness: [...result.openness],
        conscientiousness: [...result.conscientiousness],
        extraversion: [...result.extraversion],
        agreeableness: [...result.agreeableness],
        neuroticism: [updatedNeuroticismScores],
      };
      setResult(updatedNeuroticismResult);

      const updatedNeuroticismTotal =
        updatedNeuroticismResult.neuroticism.reduce(
          (accumulator, newScore) => accumulator + newScore,
          0
        );
      console.log(updatedNeuroticismTotal);

      setTotal((prevValue) => ({
        openness: prevValue.openness,
        conscientiousness: prevValue.conscientiousness,
        extraversion: prevValue.extraversion,
        agreeableness: prevValue.agreeableness,
        neuroticism: updatedNeuroticismTotal,
      }));

      if (updatedNeuroticismResult.neuroticism.length === neuroticismCount) {
        calculatePercentage(updatedNeuroticismTotal);
        console.log("All questions answered");
      }
    }
  };

  async function calculatePercentage(total) {
    try {
      let totalSum = 0;
      if (Questions[currentQuestionId].trait === "Openness") {
        totalSum = opennessCount * 5;
      } else if (Questions[currentQuestionId].trait === "Conscientiousness") {
        totalSum = conscientiousnessCount * 5;
      } else if (Questions[currentQuestionId].trait === "Extraversion") {
        totalSum = extraversionCount * 5;
      } else if (Questions[currentQuestionId].trait === "Agreeableness") {
        totalSum = agreeablenessCount * 5;
      } else if (Questions[currentQuestionId].trait === "Neuroticism") {
        totalSum = neuroticismCount * 5;
      }
      const response = await axios.get(
        `http://localhost:3000/calculateScore?trait=${Questions[currentQuestionId].trait}&total=${total}&sum=${totalSum}`
      );
      console.log(response.data);
      if (Questions[currentQuestionId].trait === "Openness") {
        setPercentage((prevValue) => ({
          openness: response.data.score,
          conscientiousness: prevValue.conscientiousness,
          extraversion: prevValue.extraversion,
          agreeableness: prevValue.agreeableness,
          neuroticism: prevValue.neuroticism,
        }));
        setDesc((prevValue) => ({
          openness: response.data.desc,
          conscientiousness: prevValue.conscientiousness,
          extraversion: prevValue.extraversion,
          agreeableness: prevValue.agreeableness,
          neuroticism: prevValue.neuroticism,
        }));
      } else if (Questions[currentQuestionId].trait === "Conscientiousness") {
        setPercentage((prevValue) => ({
          openness: prevValue.openness,
          conscientiousness: response.data.score,
          extraversion: prevValue.extraversion,
          agreeableness: prevValue.agreeableness,
          neuroticism: prevValue.neuroticism,
        }));
        setDesc((prevValue) => ({
          openness: prevValue.openness,
          conscientiousness: response.data.desc,
          extraversion: prevValue.extraversion,
          agreeableness: prevValue.agreeableness,
          neuroticism: prevValue.neuroticism,
        }));
      } else if (Questions[currentQuestionId].trait === "Extraversion") {
        setPercentage((prevValue) => ({
          openness: prevValue.openness,
          conscientiousness: prevValue.conscientiousness,
          extraversion: response.data.score,
          agreeableness: prevValue.agreeableness,
          neuroticism: prevValue.neuroticism,
        }));
        setDesc((prevValue) => ({
          openness: prevValue.openness,
          conscientiousness: prevValue.conscientiousness,
          extraversion: response.data.desc,
          agreeableness: prevValue.agreeableness,
          neuroticism: prevValue.neuroticism,
        }));
      } else if (Questions[currentQuestionId].trait === "Agreeableness") {
        setPercentage((prevValue) => ({
          openness: prevValue.openness,
          conscientiousness: prevValue.conscientiousness,
          extraversion: prevValue.extraversion,
          agreeableness: response.data.score,
          neuroticism: prevValue.neuroticism,
        }));
        setDesc((prevValue) => ({
          openness: prevValue.openness,
          conscientiousness: prevValue.conscientiousness,
          extraversion: prevValue.extraversion,
          agreeableness: response.data.desc,
          neuroticism: prevValue.neuroticism,
        }));
      } else if (Questions[currentQuestionId].trait === "Neuroticism") {
        setPercentage((prevValue) => ({
          openness: prevValue.openness,
          conscientiousness: prevValue.conscientiousness,
          extraversion: prevValue.extraversion,
          agreeableness: prevValue.agreeableness,
          neuroticism: response.data.score,
        }));
        setDesc((prevValue) => ({
          openness: prevValue.openness,
          conscientiousness: prevValue.conscientiousness,
          extraversion: prevValue.extraversion,
          agreeableness: prevValue.agreeableness,
          neuroticism: response.data.desc,
        }));
      }

      return response.data;
    } catch (error) {
      console.log("Error: ", error);
    }
  }

  /*async function calculatePercentage(total) {
    try {
      let totalSum = 0;
      if (Questions[currentQuestionId].trait === "Openness") {
        totalSum = opennessCount * 5;
      } else if (Questions[currentQuestionId].trait === "Conscientiousness") {
        totalSum = conscientiousnessCount * 5;
      } else if (Questions[currentQuestionId].trait === "Extraversion") {
        totalSum = extraversionCount * 5;
      } else if (Questions[currentQuestionId].trait === "Agreeableness") {
        totalSum = agreeablenessCount * 5;
      } else if (Questions[currentQuestionId].trait === "Neuroticism") {
        totalSum = neuroticismCount * 5;
      }
      const response = await axios.get(
        `http://localhost:3000/calculateScore?trait=${Questions[currentQuestionId].trait}&total=${total}&sum=${totalSum}`
      );
      console.log(response.data);
      if (Questions[currentQuestionId].trait === "Openness") {
        setPercentage((prevValue) => ({
          openness: response.data.score,
          conscientiousness: prevValue.conscientiousness,
          extraversion: prevValue.extraversion,
          agreeableness: prevValue.agreeableness,
          neuroticism: prevValue.neuroticism,
        }));
      } else if (Questions[currentQuestionId].trait === "Conscientiousness") {
        setPercentage((prevValue) => ({
          openness: prevValue.openness,
          conscientiousness: response.data.score,
          extraversion: prevValue.extraversion,
          agreeableness: prevValue.agreeableness,
          neuroticism: prevValue.neuroticism,
        }));
      } else if (Questions[currentQuestionId].trait === "Extraversion") {
        setPercentage((prevValue) => ({
          openness: prevValue.openness,
          conscientiousness: prevValue.conscientiousness,
          extraversion: response.data.score,
          agreeableness: prevValue.agreeableness,
          neuroticism: prevValue.neuroticism,
        }));
      } else if (Questions[currentQuestionId].trait === "Agreeableness") {
        setPercentage((prevValue) => ({
          openness: prevValue.openness,
          conscientiousness: prevValue.conscientiousness,
          extraversion: prevValue.extraversion,
          agreeableness: response.data.score,
          neuroticism: prevValue.neuroticism,
        }));
      } else if (Questions[currentQuestionId].trait === "Neuroticism") {
        setPercentage((prevValue) => ({
          openness: prevValue.openness,
          conscientiousness: prevValue.conscientiousness,
          extraversion: prevValue.extraversion,
          agreeableness: prevValue.agreeableness,
          neuroticism: response.data.score,
        }));
      }
      console.log("neuro", response.data.score);

      return response.data;
    } catch (error) {
      console.log("Error: ", error);
    }
  }*/

  /*function calculatePercentage(total) {
    let totalSum = 0;
    if (Questions[currentQuestionId].trait === "Openness") {
      totalSum = opennessCount * 5;
    } else if (Questions[currentQuestionId].trait === "Conscientiousness") {
      totalSum = conscientiousnessCount * 5;
    } else if (Questions[currentQuestionId].trait === "Extraversion") {
      totalSum = extraversionCount * 5;
    } else if (Questions[currentQuestionId].trait === "Agreeableness") {
      totalSum = agreeablenessCount * 5;
    } else if (Questions[currentQuestionId].trait === "Neuroticism") {
      totalSum = neuroticismCount * 5;
    }
    const updatedPercentage = Math.round((total / totalSum) * 100);

    if (Questions[currentQuestionId].trait === "Openness") {
      setPercentage((prevValue) => ({
        openness: updatedPercentage,
        conscientiousness: prevValue.conscientiousness,
        extraversion: prevValue.extraversion,
        agreeableness: prevValue.agreeableness,
        neuroticism: prevValue.neuroticism,
      }));
      console.log("traitDesc", traitDesc);
      if (updatedPercentage > 80) {
        setDesc((prevValue) => ({
          openness: `A score greater than 80 indicates a highly open individual who is exceptionally creative, imaginative, and curious, often drawn to abstract concepts, art, and unconventional ideas.`,
          conscientiousness: prevValue.conscientiousness,
          extraversion: prevValue.extraversion,
          agreeableness: prevValue.conscientiousness,
          neuroticism: prevValue.neuroticism,
        }));
      } else if (updatedPercentage > 60) {
        setDesc((prevValue) => ({
          openness: `Those scoring above 60 still exhibit a strong inclination toward learning and novelty but maintain a balance between practicality and curiosity.`,
          conscientiousness: prevValue.conscientiousness,
          extraversion: prevValue.extraversion,
          agreeableness: prevValue.conscientiousness,
          neuroticism: prevValue.neuroticism,
        }));
      } else if (updatedPercentage > 40) {
        setDesc((prevValue) => ({
          openness: `Individuals with a score above 40 tend to be moderately open, appreciating new experiences while also valuing familiarity and structure.`,
          conscientiousness: prevValue.conscientiousness,
          extraversion: prevValue.extraversion,
          agreeableness: prevValue.conscientiousness,
          neuroticism: prevValue.neuroticism,
        }));
      } else if (updatedPercentage > 20) {
        setDesc((prevValue) => ({
          openness: `If the score falls above 20 but below 40, the person may prefer routine and practicality, showing limited interest in abstract thinking or change.`,
          conscientiousness: prevValue.conscientiousness,
          extraversion: prevValue.extraversion,
          agreeableness: prevValue.conscientiousness,
          neuroticism: prevValue.neuroticism,
        }));
      } else {
        setDesc((prevValue) => ({
          openness: `A score below 20 signifies a strong preference for stability and tradition, with a reluctance to embrace new ideas or unconventional experiences, favoring the familiar and concrete over novelty and abstraction.`,
          conscientiousness: prevValue.conscientiousness,
          extraversion: prevValue.extraversion,
          agreeableness: prevValue.conscientiousness,
          neuroticism: prevValue.neuroticism,
        }));
      }
    }

    if (Questions[currentQuestionId].trait === "Conscientiousness") {
      setPercentage((prevValue) => ({
        openness: prevValue.openness,
        conscientiousness: updatedPercentage,
        extraversion: prevValue.extraversion,
        agreeableness: prevValue.agreeableness,
        neuroticism: prevValue.neuroticism,
      }));
      console.log("traitDesc", traitDesc);
      if (updatedPercentage > 80) {
        setDesc((prevValue) => ({
          openness: prevValue.openness,
          conscientiousness: `A score greater than 80 indicates a highly open individual who is exceptionally creative, imaginative, and curious, often drawn to abstract concepts, art, and unconventional ideas.`,
          extraversion: prevValue.extraversion,
          agreeableness: prevValue.conscientiousness,
          neuroticism: prevValue.neuroticism,
        }));
      } else if (updatedPercentage > 60) {
        setDesc((prevValue) => ({
          openness: prevValue.openness,
          conscientiousness: `Those scoring above 60 still exhibit a strong inclination toward learning and novelty but maintain a balance between practicality and curiosity.`,
          extraversion: prevValue.extraversion,
          agreeableness: prevValue.conscientiousness,
          neuroticism: prevValue.neuroticism,
        }));
      } else if (updatedPercentage > 40) {
        setDesc((prevValue) => ({
          openness: prevValue.openness,
          conscientiousness: `Individuals with a score above 40 tend to be moderately open, appreciating new experiences while also valuing familiarity and structure.`,
          extraversion: prevValue.extraversion,
          agreeableness: prevValue.conscientiousness,
          neuroticism: prevValue.neuroticism,
        }));
      } else if (updatedPercentage > 20) {
        setDesc((prevValue) => ({
          openness: prevValue.openness,
          conscientiousness: `If the score falls above 20 but below 40, the person may prefer routine and practicality, showing limited interest in abstract thinking or change.`,
          extraversion: prevValue.extraversion,
          agreeableness: prevValue.conscientiousness,
          neuroticism: prevValue.neuroticism,
        }));
      } else {
        setDesc((prevValue) => ({
          openness: prevValue.openness,
          conscientiousness: `A score below 20 signifies a strong preference for stability and tradition, with a reluctance to embrace new ideas or unconventional experiences, favoring the familiar and concrete over novelty and abstraction.`,
          extraversion: prevValue.extraversion,
          agreeableness: prevValue.conscientiousness,
          neuroticism: prevValue.neuroticism,
        }));
      }
    }

    if (Questions[currentQuestionId].trait === "Extraversion") {
      setPercentage((prevValue) => ({
        openness: prevValue.openness,
        conscientiousness: prevValue.conscientiousness,
        extraversion: updatedPercentage,
        agreeableness: prevValue.agreeableness,
        neuroticism: prevValue.neuroticism,
      }));
      console.log("traitDesc", traitDesc);
      if (updatedPercentage > 80) {
        setDesc((prevValue) => ({
          openness: prevValue.openness,
          conscientiousness: prevValue.conscientiousness,
          extraversion: `A score greater than 80 indicates a highly open individual who is exceptionally creative, imaginative, and curious, often drawn to abstract concepts, art, and unconventional ideas.`,
          agreeableness: prevValue.conscientiousness,
          neuroticism: prevValue.neuroticism,
        }));
      } else if (updatedPercentage > 60) {
        setDesc((prevValue) => ({
          openness: prevValue.openness,
          conscientiousness: prevValue.conscientiousness,
          extraversion: `Those scoring above 60 still exhibit a strong inclination toward learning and novelty but maintain a balance between practicality and curiosity.`,
          agreeableness: prevValue.conscientiousness,
          neuroticism: prevValue.neuroticism,
        }));
      } else if (updatedPercentage > 40) {
        setDesc((prevValue) => ({
          openness: prevValue.openness,
          conscientiousness: prevValue.conscientiousness,
          extraversion: `Individuals with a score above 40 tend to be moderately open, appreciating new experiences while also valuing familiarity and structure.`,
          agreeableness: prevValue.conscientiousness,
          neuroticism: prevValue.neuroticism,
        }));
      } else if (updatedPercentage > 20) {
        setDesc((prevValue) => ({
          openness: prevValue.openness,
          conscientiousness: prevValue.conscientiousness,
          extraversion: `If the score falls above 20 but below 40, the person may prefer routine and practicality, showing limited interest in abstract thinking or change.`,
          agreeableness: prevValue.conscientiousness,
          neuroticism: prevValue.neuroticism,
        }));
      } else {
        setDesc((prevValue) => ({
          openness: prevValue.openness,
          conscientiousness: prevValue.conscientiousness,
          extraversion: `A score below 20 signifies a strong preference for stability and tradition, with a reluctance to embrace new ideas or unconventional experiences, favoring the familiar and concrete over novelty and abstraction.`,
          agreeableness: prevValue.conscientiousness,
          neuroticism: prevValue.neuroticism,
        }));
      }
    }

    if (Questions[currentQuestionId].trait === "Agreeableness") {
      setPercentage((prevValue) => ({
        openness: prevValue.openness,
        conscientiousness: prevValue.conscientiousness,
        extraversion: prevValue.extraversion,
        agreeableness: updatedPercentage,
        neuroticism: prevValue.neuroticism,
      }));
      console.log("traitDesc", traitDesc);
      if (updatedPercentage > 80) {
        setDesc((prevValue) => ({
          openness: prevValue.openness,
          conscientiousness: prevValue.conscientiousness,
          extraversion: prevValue.extraversion,
          agreeableness: `A score greater than 80 indicates a highly open individual who is exceptionally creative, imaginative, and curious, often drawn to abstract concepts, art, and unconventional ideas.`,
          neuroticism: prevValue.neuroticism,
        }));
      } else if (updatedPercentage > 60) {
        setDesc((prevValue) => ({
          openness: prevValue.openness,
          conscientiousness: prevValue.conscientiousness,
          extraversion: prevValue.extraversion,
          agreeableness: `Those scoring above 60 still exhibit a strong inclination toward learning and novelty but maintain a balance between practicality and curiosity.`,
          neuroticism: prevValue.neuroticism,
        }));
      } else if (updatedPercentage > 40) {
        setDesc((prevValue) => ({
          openness: prevValue.openness,
          conscientiousness: prevValue.conscientiousness,
          extraversion: prevValue.extraversion,
          agreeableness: `Individuals with a score above 40 tend to be moderately open, appreciating new experiences while also valuing familiarity and structure.`,
          neuroticism: prevValue.neuroticism,
        }));
      } else if (updatedPercentage > 20) {
        setDesc((prevValue) => ({
          openness: prevValue.openness,
          conscientiousness: prevValue.conscientiousness,
          extraversion: prevValue.extraversion,
          agreeableness: `If the score falls above 20 but below 40, the person may prefer routine and practicality, showing limited interest in abstract thinking or change.`,
          neuroticism: prevValue.neuroticism,
        }));
      } else {
        setDesc((prevValue) => ({
          openness: prevValue.openness,
          conscientiousness: prevValue.conscientiousness,
          extraversion: prevValue.extraversion,
          agreeableness: `A score below 20 signifies a strong preference for stability and tradition, with a reluctance to embrace new ideas or unconventional experiences, favoring the familiar and concrete over novelty and abstraction.`,
          neuroticism: prevValue.agreeableness,
        }));
      }
    }

    if (Questions[currentQuestionId].trait === "Neuroticism") {
      setPercentage((prevValue) => ({
        openness: prevValue.openness,
        conscientiousness: prevValue.conscientiousness,
        extraversion: prevValue.extraversion,
        agreeableness: prevValue.agreeableness,
        neuroticism: updatedPercentage,
      }));
      console.log("traitDesc", traitDesc);
      if (updatedPercentage > 80) {
        setDesc((prevValue) => ({
          openness: prevValue.openness,
          conscientiousness: prevValue.conscientiousness,
          extraversion: prevValue.extraversion,
          agreeableness: prevValue.agreeableness,
          neuroticism: `A score greater than 80 indicates a highly open individual who is exceptionally creative, imaginative, and curious, often drawn to abstract concepts, art, and unconventional ideas.`,
        }));
      } else if (updatedPercentage > 60) {
        setDesc((prevValue) => ({
          openness: prevValue.openness,
          conscientiousness: prevValue.conscientiousness,
          extraversion: prevValue.extraversion,
          agreeableness: prevValue.agreeableness,
          neuroticism: `Those scoring above 60 still exhibit a strong inclination toward learning and novelty but maintain a balance between practicality and curiosity.`,
        }));
      } else if (updatedPercentage > 40) {
        setDesc((prevValue) => ({
          openness: prevValue.openness,
          conscientiousness: prevValue.conscientiousness,
          extraversion: prevValue.extraversion,
          agreeableness: prevValue.agreeableness,
          neuroticism: `Individuals with a score above 40 tend to be moderately open, appreciating new experiences while also valuing familiarity and structure.`,
        }));
      } else if (updatedPercentage > 20) {
        setDesc((prevValue) => ({
          openness: prevValue.openness,
          conscientiousness: prevValue.conscientiousness,
          extraversion: prevValue.extraversion,
          agreeableness: prevValue.agreeableness,
          neuroticism: `If the score falls above 20 but below 40, the person may prefer routine and practicality, showing limited interest in abstract thinking or change.`,
        }));
      } else {
        setDesc((prevValue) => ({
          openness: prevValue.openness,
          conscientiousness: prevValue.conscientiousness,
          extraversion: prevValue.extraversion,
          agreeableness: prevValue.agreeableness,
          neuroticism: `A score below 20 signifies a strong preference for stability and tradition, with a reluctance to embrace new ideas or unconventional experiences, favoring the familiar and concrete over novelty and abstraction.`,
        }));
      }
    }
  }*/

  function gotoPreviousQueston() {
    if (currentQuestionId > 0) {
      setCurrentQuestionId(currentQuestionId - 1);
    }
  }

  function gotoNextQuestion() {
    if (currentQuestionId + 1 != Questions.length) {
      setCurrentQuestionId((prevValue) => prevValue + 1);

      setSelectedValue("");
    } else {
      const questionsAnswered = !allQuestionsAnswered;
      setAllQuestionsAnswered(questionsAnswered);
    }
  }

  return (
    <>
      <form>
        <div>
          {allQuestionsAnswered ? (
            <>
              {" "}
              <Result />
              <div className="container py-20">
                {" "}
                <div className="bg-gray-100 p-10">
                  <p className="text-lg md:text-xl leading-[2]  px-30 font-roboto font-bold">
                    Results Overview
                  </p>
                  <div className=" py-10">
                    <div className="flex flex-row  py-5">
                      {" "}
                      <p className="text-lg md:text-xl leading-[2] font-semibold  px-30 font-roboto">
                        Openness{" "}
                      </p>
                      <span className="text-gray-700 ml-auto">
                        {percentage.openness}%
                      </span>
                    </div>

                    <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-green-600"
                        style={{
                          width: `${percentage.openness}%`,
                        }}
                      ></div>
                    </div>

                    <div className="py-5">
                      <p className="text-md/7 font-roboto">
                        {traitDesc.openness}
                      </p>
                    </div>
                    <div className="py-5">
                      <p className="text-md/7 font-roboto">{desc.openness}</p>
                    </div>
                  </div>
                  <div className="py-10">
                    <div className="flex flex-row  py-5">
                      {" "}
                      <p className="text-lg md:text-xl leading-[2] font-semibold  px-30 font-roboto">
                        Conscientiousness{" "}
                      </p>
                      <span className="text-gray-700 ml-auto">
                        {percentage.conscientiousness}%
                      </span>
                    </div>
                    <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-indigo-600"
                        style={{
                          width: `${percentage.conscientiousness}%`,
                        }}
                      ></div>
                    </div>
                    <div className="py-5">
                      <p className="text-md/7 font-roboto">
                        {traitDesc.conscientiousness}
                      </p>
                    </div>
                    <div className="py-5">
                      <p className="text-md/7 font-roboto">
                        {desc.conscientiousness}
                      </p>
                    </div>
                  </div>
                  <div className=" py-10">
                    <div className="flex flex-row  py-5">
                      {" "}
                      <p className="text-lg md:text-xl leading-[2] font-semibold  px-30 font-roboto">
                        Extraversion{" "}
                      </p>
                      <span className="text-gray-700 ml-auto">
                        {percentage.extraversion}%
                      </span>
                    </div>
                    <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-red-600 "
                        style={{
                          width: `${percentage.extraversion}%`,
                        }}
                      ></div>
                    </div>
                    <div className="py-5">
                      <p className="text-md/7 font-roboto">
                        {traitDesc.extraversion}
                      </p>
                    </div>
                    <div className="py-5">
                      <p className="text-md/7 font-roboto">
                        {desc.extraversion}
                      </p>
                    </div>
                  </div>
                  <div className="py-10">
                    <div className="flex flex-row  py-5">
                      {" "}
                      <p className="text-lg md:text-xl leading-[2] font-semibold  px-30 font-roboto">
                        Agreeableness{" "}
                      </p>
                      <span className="text-gray-700 ml-auto">
                        {percentage.agreeableness}%
                      </span>
                    </div>
                    <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-violet-600"
                        style={{
                          width: `${percentage.agreeableness}%`,
                        }}
                      ></div>
                    </div>
                    <div className="py-5">
                      <p className="text-md/7 font-roboto">
                        {traitDesc.agreeableness}
                      </p>
                    </div>
                    <div className="py-5">
                      <p className="text-md/7 font-roboto">
                        {desc.agreeableness}
                      </p>
                    </div>
                  </div>
                  <div className="py-10">
                    <div className="flex flex-row  py-5">
                      {" "}
                      <p className="text-lg md:text-xl leading-[2] font-semibold  px-30 font-roboto">
                        Neuroticism{" "}
                      </p>
                      <span className="text-gray-700 ml-auto">
                        {percentage.neuroticism}%
                      </span>
                    </div>
                    <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-orange-600"
                        style={{
                          width: `${percentage.neuroticism}%`,
                        }}
                      ></div>
                    </div>{" "}
                    <div className="py-5">
                      <p className="text-md/7 font-roboto">
                        {traitDesc.neuroticism}
                      </p>
                    </div>
                    <div className="py-5">
                      <p className="text-md/7 font-roboto">
                        {desc.neuroticism}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex flex-row py-10">
                  <div className="ml-auto">
                    <button
                      type="button"
                      className="bg-purple-900 hover:bg-purple-950  w-48 h-10 text-white text-[14px] font-bold rounded-lg"
                    >
                      Download Results
                    </button>
                  </div>
                </div>
              </div>
              <div />
            </>
          ) : (
            <>
              <AssessmentHero />
              <div className="container py-20">
                <div className="font-roboto space-y-10 bg-purple-50 p-20">
                  {" "}
                  <div className=" py-5">
                    <label className="text-sm">
                      Question {Questions[currentQuestionId].id} of{" "}
                      {Questions.length}
                    </label>
                  </div>
                  <label className="text-2xl md:text-3xl">
                    {Questions[currentQuestionId].question}
                  </label>
                  <div>
                    {" "}
                    <input
                      type="radio"
                      id="stronglyDisagree"
                      name="p_test"
                      value="stronglyDisagree"
                      onChange={handleChange}
                      className="w-4 h-4"
                      checked={selectedValue === "stronglyDisagree"}
                    />
                     {" "}
                    <label htmlFor="stronglyDisagree" className="ml-2">
                      Strongly Disagree
                    </label>
                  </div>
                  <div>
                    <input
                      type="radio"
                      id="disagree"
                      name="p_test"
                      value="disagree"
                      onChange={handleChange}
                      className="w-4 h-4"
                      checked={selectedValue === "disagree"}
                    />
                     {" "}
                    <label htmlFor="disagree" className="ml-2">
                      Disagree
                    </label>
                  </div>
                   
                  <div>
                    <input
                      type="radio"
                      id="neutral"
                      name="p_test"
                      value="neutral"
                      onChange={handleChange}
                      className="w-4 h-4"
                      checked={selectedValue === "neutral"}
                    />
                     {" "}
                    <label htmlFor="neutral" className="ml-2">
                      Neutral
                    </label>
                  </div>
                  <div>
                    <input
                      type="radio"
                      id="agree"
                      name="p_test"
                      value="agree"
                      onChange={handleChange}
                      className="w-4 h-4"
                      checked={selectedValue === "agree"}
                    />
                     {" "}
                    <label htmlFor="agree" className="ml-2">
                      Agree
                    </label>
                  </div>
                  <div>
                    <input
                      type="radio"
                      id="stronglyAgree"
                      name="p_test"
                      value="stronglyAgree"
                      onChange={handleChange}
                      className="w-4 h-4"
                      checked={selectedValue === "stronglyAgree"}
                    />
                     {" "}
                    <label htmlFor="stronglyAgree" className="ml-2">
                      Strongly Agree
                    </label>
                  </div>
                </div>
                <div className="flex flex-row py-10">
                  <div>
                    <button
                      type="button"
                      onClick={gotoPreviousQueston}
                      className="bg-purple-900 hover:bg-purple-950  w-48 h-10 text-white text-[14px] font-bold rounded-lg"
                    >
                      Previous
                    </button>
                  </div>
                  <div className="ml-auto">
                    <button
                      type="button"
                      onClick={gotoNextQuestion}
                      className="bg-purple-900 hover:bg-purple-950  w-48 h-10 text-white text-[14px] font-bold rounded-lg"
                    >
                      Next
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </form>
    </>
  );
}
