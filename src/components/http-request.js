import axios from "axios";

const baseURL = "//ec2-52-78-142-179.ap-northeast-2.compute.amazonaws.com:8081";

export const getData = async (url, bearerToken) => {
  const response = await axios.get(`${baseURL}/${url}`, {
    headers: {
      Authorization: `Bearer ${bearerToken || ""}`,
    },
    credentials: "same-origin",
  });
  const responseData = await response.data;

  return responseData;
};

export const postData = async (url, data, token) => {
  const bearerToken = token ? token : null;
  const response = await axios.post(`${baseURL}/${url}`, data, {
    headers: {
      Authorization: `Bearer ${bearerToken || ""}`,
      "Content-Type": "application/json",
    },
    credentials: "same-origin",
  });
  const responseData = response.data;

  return responseData;
};
