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

export const getAllLocations = () => {
    return axios.get(
        `${API_BASE_URL}/locations`
    )
}

export const postLocation = (args) => {
    return axios.post(
      `${API_BASE_URL}/locations`,
      args,
      {
        headers: buildHeaders()
      }
    )   
}

export const deleteOneLocationEntry = (locationsid) => {
    return axios.delete(
      `${API_BASE_URL}/locations/${locationsid}`
    )
}

export const getOneLocationEntry = (locationsid) => {
    return axios.get(
      `${API_BASE_URL}/locations/${locationsid}`
    )
}

export const updateOneLocationEntry = (locationsid, args) => {
    return axios.put(
      `${API_BASE_URL}/locations/${locationsid}`,
      args,
      {
        headers: buildHeaders() 
      }
    )
}