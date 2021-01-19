import { api_base_url } from "./Constant";
import axios from "axios";

const doPost = async (url, body) => {
  try {
    const response = await axios({
      method: "post",
      url: api_base_url + url,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      data: body,
    });
    return response.data;
  } catch (err) {
    return err;
  }
};

const doPostFile = async (url, formData, onSuccess, onFail) => {
  try {
    let response = await axios({
      method: "post",
      url: api_base_url + url,
      headers: {
        "Content-Type": "multipart/form-data",
      },
      data: formData,
    });
    let data = await response.data;
    onSuccess(data);
  } catch (err) {
    onFail(err);
  }
};

export default { doPost, doPostFile };
