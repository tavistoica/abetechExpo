import { axios } from "./axios";

const doPost = async (url: string, body: object) => {
  console.log("ddd", url, JSON.stringify(body));
  const response = await axios
    .post(
      `https://us-central1-abetech-app.cloudfunctions.net/AppApi/${url}`,
      body,
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    )
    .catch((err) => {
      console.log(JSON.stringify(err));
      throw Error(err);
    });
  console.log(url, " ", response.data);
  if (response.status >= 200 && response.status < 300) {
    return response.data;
  }
};

export { doPost };
