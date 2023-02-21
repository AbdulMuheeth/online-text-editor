import React, { useCallback, useMemo } from 'react';

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Editor from './Components/Editor';

import './App.css';
import GroupedTabs from './Components/Tabs/GroupedTabs';
import { demoTextFiles } from './Others/demoData'
import { Button } from '@mui/material';
import EditorAndPreview from './Components/TabContent/EditorAndPreview';
import { Route, Routes, useParams } from 'react-router-dom';
import PathHome from './Components/Path/PathHome';
import { setDataFiles } from './Others/data/dataDetails';
import Practice from './Others/Practice';

export const TextData = React.createContext({textData:{},token:"",updateText:()=>{},updateToken:()=>{}});
TextData.displayName = "TextFiles";

function App() {

  const pathName  = useParams();
  const getTextFiles = () => {
    
    if(localStorage.getItem("text") === null){
      localStorage.setItem("text",JSON.stringify(demoTextFiles));
    }
    const text = JSON.parse(localStorage.getItem("text"));
    return text;
  }
  
  const [textData,setTextData] = React.useState([])
  const [token,setToken] = React.useState("")

  const updateText = useCallback((data)=>{
    setTextData(data);
    // const res = setDataFiles(pathName,token,data);
    console.log("In App");
    console.log("",pathName.pathName,token,data);
    localStorage.setItem("text",JSON.stringify(data));
  },[])

  const updateToken = useCallback((tkn)=>{
    setToken(tkn);
    localStorage.setItem("pathToken",JSON.stringify(tkn));
  })

  const contextValue = useMemo(()=>({textData,token,updateText,updateToken}),[textData,token,updateText,updateToken])

  return (
    <TextData.Provider value={contextValue}>
      <div className="App">
        {/* <GroupedTabs/> */}
        {/* <EditorAndPreview/> */}
      </div>

      <Routes>
        <Route path={"/"} element={"hello"}/>
        <Route path={"/prac"} element={<Practice/>}/>
        <Route path={"/:pathName"} element={<PathHome/>}/>
      </Routes>

    </TextData.Provider>
  );
}

export default App;
