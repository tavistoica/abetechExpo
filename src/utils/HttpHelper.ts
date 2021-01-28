import { axios } from "./axios";

const doPost = async (url: string, body: object) => {
  const response = await axios.post(url, body, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
  return response.data;
};

export default { doPost };
