import axios from "axios";
import { buildHeaders } from "@/app/helpers/apiHelper";
import dotenv from 'dotenv';
dotenv.config();

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const handleError = (error) => {
    if (error.response) {
      throw new Error(`Error: ${error.response.data.message || error.response.statusText}`);
    } else if (error.request) {
      throw new Error('Error: No response received from server.');
    } else {
      throw new Error(`Error: ${error.message}`);
    }
  };

  export const getOneUser = (userid, args) => {
    return axios.put(
      `${API_BASE_URL}/users/verify/${userid}`,
      args,
      {
        headers: buildHeaders()
      }
    )
  }