import axios from 'axios';

// export const getLikesCountPerItem = async (id) => {
//   const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/likes`, {
//     params: { item: id },
//   });
//   return data.data.likesCount;
// };

export const addLike = async (from, item) => {
  const res = await axios.post(
    `${process.env.REACT_APP_API_URL}/likes`,
    { from, item },
    { withCredentials: true },
  );
  return res;
};

export const removeLike = async (from, item) => {
  const res = await axios.delete(`${process.env.REACT_APP_API_URL}/likes`, {
    data: { from, item },
    withCredentials: true,
  });
  return res;
};
