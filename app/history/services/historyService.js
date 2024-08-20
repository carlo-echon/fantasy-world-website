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

export const getAllHistory = () => {
    return axios.get(
        `${API_BASE_URL}/history`
    )
}


export const postHistory = (args) => {
    return axios.post(
      `${API_BASE_URL}/history`,
      args,
      {
        headers: buildHeaders()
      }
    )
    
}

export const deleteOneHistory = (historyid) => {
  return axios.delete(
    `${API_BASE_URL}/history/${historyid}`
  )
}

export const getOneHistory = (historyid) => {
  return axios.get(
    `${API_BASE_URL}/history/${historyid}`
  )
}

export const updateOneHistory = (historyid, args) => {
  return axios.put(
    `${API_BASE_URL}/history/${historyid}`,
    args,
    {
      headers: buildHeaders() 
    }
  )
}


