import axios from "axios";

export const getFeaturedCollections = async (queryStr) => {
  const { data } = await axios.get(
    `${process.env.REACT_APP_API_URL}/featured`,
    { params: { type: queryStr }, withCredentials: true }
  );
  return data.data.collections;
};
