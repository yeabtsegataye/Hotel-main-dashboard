import axios from "axios";
import { logOut } from "../features/auth/authSlice";

const VITE_API_URL = import.meta.env.VITE_API_URL;

const verifyToken = async (token, dispatch, refresh, user) => {
  if (token) {
    const url = `${VITE_API_URL}/auth/Dash_verify-token`; // Adjust the endpoint as needed
    const config = {
      headers: {
        Authorization: `Bearer ${token}`, // Add the token as Authorization header
      },
      withCredentials: true, // Include cookies in the request
    };

    try {
      // Include the `user` object in the request body
      const response = await axios.post(url, { user }, config);
     // console.log('resss',response)
      return {isverifed:response.data.verified,role:response.data.role};
    } catch (error) {
      console.log(error.response.data.statusCode);
      if (error.response.data.statusCode === 403) {
        refresh();
      } else {
        dispatch(logOut());
        throw error;
      }
    }
  } else {
    return false;
  }
};

export default verifyToken;