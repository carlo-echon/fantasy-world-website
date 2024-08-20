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

export const getAllMagicItems = () => {
    return axios.get(
        `${API_BASE_URL}/magicitems`
    )
}

export const postMagicItem = (args) => {
    return axios.post(
      `${API_BASE_URL}/magicitems`,
      args,
      {
        headers: buildHeaders()
      }
    )   
}

export const deleteOneMagicItem = (magicitemid) => {
    return axios.delete(
      `${API_BASE_URL}/magicitems/${magicitemid}`
    )
}

export const getOneMagicItem = (magicitemid) => {
    return axios.get(
      `${API_BASE_URL}/magicitems/${magicitemid}`
    )
}

export const updateOneMagicItem = (magicitemid, args) => {
    return axios.put(
      `${API_BASE_URL}/magicitems/${magicitemid}`,
      args,
      {
        headers: buildHeaders() 
      }
    )
}