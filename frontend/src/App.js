import React, { useCallback, useMemo } from 'react';

import './App.css';
import { Route, Routes } from 'react-router-dom';
import PathHome from './Components/Path/PathHome';
import HomePage from './Components/HomePage';

export const TextData = React.createContext({textData:{},encryptedData:[],token:"",updateText:()=>{},updateEncrypted:()=>{},updateToken:()=>{}});
TextData.displayName = "TextFiles";

function App() {

  const [textData,setTextData] = React.useState([])
  const [encryptedData,setEncryptedData] = React.useState([])
  const [token,setToken] = React.useState("")

  const updateText = useCallback((data)=>{
    setTextData(data);
    
    localStorage.setItem("text",JSON.stringify(data));
  },[])

  const updateEncrypted = useCallback((data)=>{
    setEncryptedData(data);
    
    localStorage.setItem("text",JSON.stringify(data));
  },[])

  const updateToken = useCallback((tkn)=>{
    setToken(tkn);
    localStorage.setItem("pathToken",JSON.stringify(tkn));
  },[])

  const contextValue = useMemo(()=>({textData,encryptedData,token,updateText,updateEncrypted,updateToken}),[textData,encryptedData,token,updateText,updateEncrypted,updateToken])

  return (
    <TextData.Provider value={contextValue}>
      <div className="App">
        <Routes>
          <Route path={"/"} element={<HomePage/>}/>
          <Route path={"/:pathName"} element={<PathHome/>}/>
        </Routes>
      </div>

    </TextData.Provider>
  );
}

export default App;
