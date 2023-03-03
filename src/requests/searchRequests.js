import axios from "axios";

export const getSearchResults = async (query) => {
  const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/search/`, {
    params: { searchString: query },
    withCredentials: true,
  });
  return data.data.results;
};
