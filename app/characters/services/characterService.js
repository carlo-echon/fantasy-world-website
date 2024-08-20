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

export const getAllCharacters = () => {
    return axios.get(
        `${API_BASE_URL}/characters`
    )
}

export const postCharacter = (args) => {
    return axios.post(
      `${API_BASE_URL}/characters`,
      args,
      {
        headers: buildHeaders()
      }
    )   
}

export const deleteOneCharacter = (characterid) => {
    return axios.delete(
      `${API_BASE_URL}/characters/${characterid}`
    )
}

export const getOneCharacter = (characterid) => {
    return axios.get(
      `${API_BASE_URL}/characters/${characterid}`
    )
}

export const updateOneCharacter = (characterid, args) => {
    return axios.put(
      `${API_BASE_URL}/characters/${characterid}`,
      args,
      {
        headers: buildHeaders() 
      }
    )
}