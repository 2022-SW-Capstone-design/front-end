import axios from "axios";

const baseURL = "https://noveland.ml";

export const getData = async (url, bearerToken) => {
  const response = await axios.get(`${baseURL}/${url}`, {
    headers: {
      Authorization: `${bearerToken ? `Bearer ${bearerToken}` : ""}`,
    },
    credentials: "same-origin",
  });
  const responseData = await response.data;
  return responseData;
};

export const getDataWithUserID = async (url, userId) => {
  const response = await axios.get(
    `${baseURL}/${url}`,
    {
      userId,
    },
    { withCredentials: true }
  );

  const responseData = response.data;
  return responseData;
};

export const postData = async (url, data, token) => {
  const bearerToken = token ? token : "";
  const response = await axios.post(`${baseURL}/${url}`, data, {
    headers: {
      Authorization: `${bearerToken ? `Bearer ${bearerToken}` : ""}`,
      "Content-Type": "application/json",
    },
    credentials: "same-origin",
  });
  const responseData = response.data;
  return responseData;
};

export const postDataByForm = async (url, data, token) => {
  const bearerToken = token ? token : null;
  const response = await axios.post(`${baseURL}/${url}`, data, {
    headers: {
      Authorization: `${bearerToken ? `Bearer ${bearerToken}` : ""}`,
      "Content-Type": "multipart/form-data",
    },
    credentials: "same-origin",
  });
  const responseData = response.data;
  return responseData;
};
