import axios from 'axios';

export const fetchItems = async () => {
  const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/items`, {
    withCredentials: true,
  });
  return data.data.items;
};

export const fetchItem = async (id) => {
  const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/items/${id}`, {
    withCredentials: true,
  });
  return data.data.item;
};

export const fetchItemsByUser = async (id) => {
  const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/items`, {
    params: { owner: id },
    withCredentials: true,
  });
  return data.data.items;
};
export const fetchItemsByCollection = async (id) => {
  const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/items`, {
    params: { collectionId: id },
    withCredentials: true,
  });
  return data.data.items;
};

export const createItem = async (owner, collectionId, body) => {
  const { data } = await axios.post(
    `${process.env.REACT_APP_API_URL}/items`,
    {
      ...body,
      owner,
      collectionId,
    },
    { withCredentials: true },
  );
  return data.data.item;
};

export const deleteItems = async (items) => {
  const res = await axios.delete(`${process.env.REACT_APP_API_URL}/items`, {
    data: items,
    withCredentials: true,
  });
  return res;
};

export const updateItem = async (id, body) => {
  const { data } = await axios.patch(`${process.env.REACT_APP_API_URL}/items/${id}`, {
    data: body,
    withCredentials: true,
  });
  return data.data.item;
};
