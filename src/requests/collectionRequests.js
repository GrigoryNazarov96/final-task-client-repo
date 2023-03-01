import axios from 'axios';

export const getCollections = async () => {
  const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/collections`);
  return data.data.collections;
};

export const getCollectionsByUser = async (id) => {
  try {
    const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/collections`, {
      params: { owner: id },
    });
    return data.data.collections;
  } catch (e) {
    console.log(e);
  }
};

export const getCollection = async (id) => {
  try {
    const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/collections/${id}`, {
      withCredentials: true,
    });
    return data.data.collection;
  } catch (e) {
    console.log(e);
  }
};

export const createCollection = async (owner = undefined, body) => {
  const { data } = await axios.post(
    `${process.env.REACT_APP_API_URL}/collections`,
    {
      ...body,
      owner,
    },
    { withCredentials: true },
  );
  return data.data.collection;
};

export const updateCollection = async (id, body) => {
  const { data } = await axios.patch(`${process.env.REACT_APP_API_URL}/collections/${id}`, body, {
    withCredentials: true,
  });
  return data.data.collection;
};

export const deleteCollection = async (id) => {
  const res = await axios.delete(`${process.env.REACT_APP_API_URL}/collections/${id}`, {
    withCredentials: true,
  });
  return res;
};
