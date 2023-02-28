import React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import TabPanel from "./TabPanel";
import { TextData } from "../../App";
import { Button } from "@mui/material";
import { useParams } from "react-router-dom";
import { setDataFiles } from "../../Others/data/dataDetails";
import CryptoJS from "crypto-js";

const GroupedTabs = () => {

  const { textData, encryptedData, token, updateText, updateEncrypted,  } = React.useContext(TextData);
  const pathName = useParams();
  
  // console.log("TD",textData);

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const encryptData = (txt) => {
    const data = CryptoJS.AES.encrypt(
      JSON.stringify(txt),
      process.env.REACT_APP_ENCRYPTION_KEY
    ).toString();

    return data;
  };

  const generateNewFile = () => {
    
    try{
      let copyText = [...encryptedData];
      let newTextFile = {name:`File - ${textData.length+1}`,text:`<h3> start writing... </h3>`};
      
      let localCopyText = [...textData];
      localCopyText.push(newTextFile);

      const encryptedFileName = encryptData(newTextFile.name)
      const encryptedFileContent = encryptData(newTextFile.text)
      copyText.push({name:encryptedFileName,text:encryptedFileContent})
      // const encryptedFiles = encrypt(copyText,process.env.REACT_APP_ENCRYPTION_KEY)
      const res = setDataFiles(pathName.pathName,token,copyText);
      if(res)
        {
          updateEncrypted(copyText);
          updateText(localCopyText);
        }
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

      let copyText = [...encryptedData]
      let localCopyText = [...textData]
      localCopyText[idx] = content
      
      const encryptedFileName = encryptData(content.name)
      const encryptedFileContent = encryptData(content.text)
      copyText[idx] = {name:encryptedFileName,text:encryptedFileContent}

      const res = setDataFiles(pathName.pathName,token,copyText);

      if(res)
      {
        updateEncrypted(copyText);
        updateText(localCopyText);
      }
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
      let copyText = [...encryptedData];
      copyText.splice(idx,1);
      
      let localCopyText = [...textData];
      localCopyText.splice(idx,1);
      
      const res = setDataFiles(pathName.pathName,token,copyText);
      
      if(res)
      {
        updateEncrypted(copyText);
        updateText(localCopyText);
      }
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
      <div style={{display:'flex',justifyContent:'end',marginTop:'2%'}}>
        <Button onClick={generateNewFile} sx={{marginRight:'5%',fontWeight:600}} variant='outlined' color="success"> New File </Button>
      </div>
      <div style={{display:'flex',justifyContent:'center'}}>
        <Box sx={{ width: "95%" }}>
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
                    <Tab  key={`key-${index}`} label={content.name} {...a11yProps(index)} sx={{fontWeight: 800,fontSize:'1rem'}} />
                  )
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
      </div>
    </>
  );
};

export default GroupedTabs;
