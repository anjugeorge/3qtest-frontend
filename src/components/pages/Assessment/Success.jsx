import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router";

import {
  saveResultsAPI,
  updateCompletedTestFieldAPI,
  updateIsPaidField,
} from "../../../api/apiService";

const Success = () => {
  const navigate = useNavigate();
  const hasSaved = useRef(false);

  useEffect(() => {
    async function handleSuccessfullPayment() {
      const successfullPayment = await updateIsPaidField();
      if (successfullPayment.success) {
        navigate("/results", {
          state: {
            testType: "Career Test",
          },
        });
      }
    }
    handleSuccessfullPayment();
  }, []);

  return <div className="text-center py-10">Redirecting...</div>;
};

export default Success;
