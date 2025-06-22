import React, { useState } from "react";

const Token = () => {
  const getToken = () => {
    const token = sessionStorage.getItem("token");
    const userToken = JSON.parse(token);
    return userToken?.token;
  };
  const [token, setToken] = useState(getToken());
  const saveToken = (userToken) => {
    sessionStorage.setItem("token", JSON.stringify(userToken));
    setToken(userToken.token);
  };

  // Return the token and function to update it
  return { token, setToken: saveToken };
};

export default Token;
