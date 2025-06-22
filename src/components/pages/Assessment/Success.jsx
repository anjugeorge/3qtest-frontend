import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router";
import axios from "axios";

const Success = () => {
  const navigate = useNavigate();
  const hasSaved = useRef(false);

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    const questionId = localStorage.getItem("questionId");
    const results = localStorage.getItem("results");

    if (!hasSaved.current && userId && questionId && results) {
      hasSaved.current = true;
      saveResults(userId, questionId, results);
    }
  }, []);

  async function saveResults(userId, questionId, results) {
    try {
      await axios.post("http://localhost:3000/saveResults", {
        userId,
        questionId,
        testResults: results,
        testType: "Career Test",
      });

      localStorage.removeItem("userId");
      localStorage.removeItem("questionId");
      localStorage.removeItem("results");

      navigate(`/results?userId=${userId}&testType=Career Test`);
    } catch (error) {
      console.error("Error saving results:", error);
    }
  }

  return <div className="text-center py-10">Redirecting...</div>;
};

export default Success;
