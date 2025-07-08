import axiosInstance from "./axiosInstance";

export const getProtectedData = async () => {
  try {
    const response = await axiosInstance.get(`/protected`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("Error updating completed test field:", error);
    throw error;
  }
};

export const forgotPasswordAPI = async (email, password) => {
  try {
    const response = await axiosInstance.post(`/forgotPassword`, {
      email: email,
      password: password,
    });
    return response.data;
  } catch (error) {
    console.error("Error updating password:", error);
    throw error;
  }
};

export const registerAPI = async (fullName, email, password) => {
  try {
    const response = await axiosInstance.post(`/register`, {
      fullName: fullName,
      email: email,
      password: password,
    });
    return response.data;
  } catch (error) {
    console.error("Error registering user:", error);
    throw error;
  }
};

export const loginAPI = async (email, password) => {
  try {
    const response = await axiosInstance.post(
      `/login`,
      {
        email: email,
        password: password,
      },
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    console.error("Error while login:", error);
    throw error;
  }
};

export const logoutAPI = async () => {
  try {
    const response = await axiosInstance.post(`/logout`);
    return response.data;
  } catch (error) {
    console.error("Error while logout:", error);
    throw error;
  }
};

export const getPersonalityQuestionsAPI = async () => {
  try {
    const response = await axiosInstance.get(`/questions`);
    return response.data;
  } catch (error) {
    console.error("Error fetching questions:", error);
    throw error;
  }
};

export const getCareerQuestionsAPI = async () => {
  try {
    const response = await axiosInstance.get(`/careerQuestions`);
    return response.data;
  } catch (error) {
    console.error("Error fetching questions:", error);
    throw error;
  }
};

export const getTestResultsAPI = async (testType) => {
  try {
    const response = await axiosInstance.post(`/getTestResults`, {
      testType: testType,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching test results:", error);
    throw error;
  }
};

export const saveResultsAPI = async (questionId, testResults, testType) => {
  try {
    const response = await axiosInstance.post(`/saveResults`, {
      questionId: questionId,
      testResults: testResults,
      testType: testType,
    });
    return response.data;
  } catch (error) {
    console.error("Error saving test results:", error);
    throw error;
  }
};

export const calculateScoreAPI = async (id, result) => {
  try {
    const response = await axiosInstance.get(`/calculateScore`, {
      params: {
        id: id,
        result: result,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error calculating test results:", error);
    throw error;
  }
};

export const calculateCareerScoreAPI = async (id, result) => {
  try {
    const response = await axiosInstance.get(`/calculateCareerScore`, {
      params: {
        id: id,
        result: result,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error calculating test results:", error);
    throw error;
  }
};

export const updateCompletedTestFieldAPI = async () => {
  try {
    const response = await axiosInstance.post(`/updateCompletedTestField`);
    return response.data;
  } catch (error) {
    console.error("Error updating completed test field:", error);
    throw error;
  }
};

export const checkoutAPI = async () => {
  try {
    const response = await axiosInstance.post(
      `/checkout`,
      {},
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    console.error("Error while checkout:", error);
    throw error;
  }
};

export const updateIsPaidField = async () => {
  try {
    const response = await axiosInstance.post(`/updateIsPaidField`);
    return response.data;
  } catch (error) {
    console.error("Error updating is-paid:", error);
    throw error;
  }
};
