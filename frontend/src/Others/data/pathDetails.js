import axios from "axios";

export const isValidPathName = async (pathName) => {
    const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/path/verify`,{pathName:pathName})
    // console.log(response);
    return response.data;
};

export const createNewPath = async(pathObj) => {
    const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/path/new`,{...pathObj})
    // console.log(response);
    return response.data;
}

export const getJWTtoken = async(pathObj) => {
    const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/path/generateToken`,{...pathObj})
    // console.log(response);
    return response;
}