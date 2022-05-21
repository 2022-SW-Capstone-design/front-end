import { useState } from "react";
import axios from "axios";

export const getData = async (url, bearerToken) => {  
  const response = await axios.get(`http://localhost:8081/${url}`, {
      headers: {
        Authorization: `Bearer ${bearerToken || ""}`,
      },
      credentials: "same-origin",
    })
  const responseData = await response.data;
  
  return responseData;
};

export const postData = async (url, data, token) => {
  const bearerToken = token ? token : null;
  const response = await axios.post(`http://localhost:8081/${url}`, data, {
      headers: {
        Authorization: `Bearer ${bearerToken || ""}`,
        "Content-Type": "application/json",
      },
      credentials: "same-origin", 
    })
  const responseData = response.data;
  
  return responseData;
};
