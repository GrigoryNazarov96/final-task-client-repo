import axios from 'axios';

export const fetchUsers = async () => {
  const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/users`, {
    withCredentials: true,
  });
  return data.data.users;
};

export const deleteUsers = async (users) => {
  await axios.delete(`${process.env.REACT_APP_API_URL}/users`, {
    data: users,
    withCredentials: true,
  });
  return;
};

export const changeUsersStatus = async (users, isBlock) => {
  await axios.patch(
    `${process.env.REACT_APP_API_URL}/users`,
    {
      users,
      isBlock,
    },
    { withCredentials: true },
  );

  return;
};

export const changeUsersRole = async (user, role) => {
  await axios.patch(
    `${process.env.REACT_APP_API_URL}/users/${user}`,
    {
      user,
      role,
    },
    { withCredentials: true },
  );

  return;
};
