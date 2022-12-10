import axios from "axios";

const API_URL = "/api/info/";

// Create info
const createInfo = async (userData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  // const response = await axios.post(API_URL, userData, config);
  localStorage.setItem("res", JSON.stringify(userData));

  return JSON.parse(localStorage.getItem("res"));
};

const infoService = {
  createInfo,
};

export default infoService;
