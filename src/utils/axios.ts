import Axios from "axios";
import { api_base_url } from "./Constant";

export const axios = Axios.create({ baseURL: api_base_url });
