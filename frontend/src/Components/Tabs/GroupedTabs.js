import React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import TabPanel from "./TabPanel";
import { TextData } from "../../App";
import { Button } from "@mui/material";
import {isValidToken} from '../../Others/data/pathDetails';
import { useParams } from "react-router-dom";
import { setDataFiles } from "../../Others/data/dataDetails";
import { encrypt } from "n-krypta";

const GroupedTabs = () => {

  const { textData, token, updateText, updateToken } = React.useContext(TextData);
  const pathName = useParams();
  
  console.log("TD",textData);

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const generateNewFile = () => {
    
    try{
      let copyText = [...textData];
      copyText.push({name:`File - ${textData.length+1}`,text:`<p> start writing... </p>`})
      // const res = isValidToken(pathName.pathName,token);
      const encryptedFiles = encrypt(copyText,process.env.REACT_APP_ENCRYPTION_KEY)
      const res = setDataFiles(pathName.pathName,token,encryptedFiles);
      if(res)
        updateText(copyText);
      else
        alert("data update in DB failed")
    }
    catch(error){
      console.log(error);
      alert("Invalid token");
    }

  }

  const saveContent = (idx,content) => {
    try{

      let copyText = [...textData]
      copyText[idx] = content
      // const res = isValidToken(pathName.pathName,token);
      // const res = setDataFiles(pathName.pathName,token,copyText);
      const encryptedFiles = encrypt(copyText,process.env.REACT_APP_ENCRYPTION_KEY)
      const res = setDataFiles(pathName.pathName,token,encryptedFiles);
      if(res)
        updateText(copyText);
      else
        alert("data update in DB failed")
    
    }
    catch(error){
      console.log(error);
      alert('invalid error');
    }
  }

  const removeFile = (idx) => {
    try{
      let copyText = [...textData];
      copyText.splice(idx,1);
      // const res = setDataFiles(pathName.pathName,token,copyText);
      const encryptedFiles = encrypt(copyText,process.env.REACT_APP_ENCRYPTION_KEY)
      const res = setDataFiles(pathName.pathName,token,encryptedFiles);
      if(res)
        updateText(copyText);
      else
        alert("data update in DB failed")
    
    }
    catch(error){
      console.log(error);
      alert('invalid error');
    }
  }

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }

  return (
    <>
      <Button onClick={generateNewFile}> New File </Button>
      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            variant="scrollable"
            scrollButtons="auto"
            aria-label="basic tabs example"
          >
            {textData.map((content,index)=>{
              return(
                <Tab  key={`key-${index}`} label={content.name} {...a11yProps(index)}/>)
            })}
          </Tabs>
        </Box>

        {textData.map((content,idx)=>{
          return(
              <TabPanel key={`key- ${idx}`} value={value} index={idx} handleSave={saveContent} handleRemove={removeFile}>
                {content}
              </TabPanel>)
        })}
      </Box>
    </>
  );
};

export default GroupedTabs;
