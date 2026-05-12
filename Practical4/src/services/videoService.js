import axios from "axios";

const API_URL = "http://localhost:5000/api/videos";

export const fetchVideos = async ({ pageParam = null }) => {
  const response = await axios.get(API_URL, {
    params: {
      cursor: pageParam,
      limit: 5,
    },
  });

  return response.data;
};