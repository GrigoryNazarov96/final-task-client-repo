import axios from 'axios';

export const fetchReviewsByItem = async (id) => {
  const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/reviews`, {
    params: { item: id },
  });
  return data.data.reviews;
};

export const createReviewForItem = async (item, author, body) => {
  const { data } = await axios.post(
    `${process.env.REACT_APP_API_URL}/reviews`,
    {
      item,
      author,
      body,
    },
    { withCredentials: true },
  );
  return data.data.review;
};

export const fetchReviewForItem = async (id, item) => {
  const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/reviews/${id}`, {
    params: { item },
    withCredentials: true,
  });
  return data.data.review;
};

export const deleteReviewForItem = async (id, item) => {
  const res = await axios.delete(`${process.env.REACT_APP_API_URL}/reviews/${id}`, {
    params: { item },
    withCredentials: true,
  });
  return res;
};
