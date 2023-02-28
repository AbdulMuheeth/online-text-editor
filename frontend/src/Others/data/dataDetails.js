import axios from "axios";


export const getDataFiles = async (pathName,token) => {
    const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/data/getSpecific`,{pathName:pathName,token:token})
    // console.log(response);
    return response.data;
};

export const setNew = async (pathName,token) => {
    const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/data/new`,{pathName:pathName,token:token})
    // console.log(response);
    return response.data;
};

export const setDataFiles = async (pathName,token,files) => {
    const response = await axios.put(`${process.env.REACT_APP_BACKEND_URL}/data/updateFiles `,{pathName:pathName,token:token,files:files})
    // console.log(response);
    return response.data;
};
