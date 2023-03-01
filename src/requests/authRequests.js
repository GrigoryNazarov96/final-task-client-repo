import axios from 'axios';
import jwt_decode from 'jwt-decode';

export const login = async (email, password) => {
  const { data } = await axios.post(
    `${process.env.REACT_APP_API_URL}/users/login`,
    {
      email,
      password,
    },
    { withCredentials: true },
  );
  return jwt_decode(data.token);
};

export const signup = async (name, email, password) => {
  const { data } = await axios.post(`${process.env.REACT_APP_API_URL}/users/signup`, {
    name,
    email,
    password,
  });
  return jwt_decode(data.token);
};

export const logout = async () => {
  const res = await axios.get(`${process.env.REACT_APP_API_URL}/users/logout`, {
    withCredentials: true,
  });
  if (res.status === 200) {
    window.location.reload(true);
  }
};
