import axios from "axios";
import React from "react";

export const isValidPathName = async (pathName) => {
    const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/path/verify`,{pathName:pathName})
    console.log(response);
    return response.data;
    
  //   .then((res) => {
  //   console.log(res);
  //   // console.log(res.data);
  // });
};

// export const isValidToken = async (pathName,token) => {
//     const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/path/validateToken`,{token:token,pathName:pathName})
//     console.log(response);
//     return response.data;
    
//   //   .then((res) => {
//   //   console.log(res);
//   //   // console.log(res.data);
//   // });
// };

export const createNewPath = async(pathObj) => {
    console.log('new')
    const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/path/new`,{...pathObj})
    console.log(response);
    return response.data;
    
    // .then((res) => {
    //     console.log(res);
    //     return res;
    // });
}

export const getJWTtoken = async(pathObj) => {
    const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/path/generateToken`,{...pathObj})
    console.log(response);
    return response;
    // .then((res) => {
    //     console.log(res);
    //     return res;
    // });
}