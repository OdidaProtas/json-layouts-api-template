import axios from "axios";

export const useAxios = () => {
  return axios.create({
    baseURL: "/",
    timeout: 50000,
  });
};
