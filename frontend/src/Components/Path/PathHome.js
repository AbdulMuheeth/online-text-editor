import {
  Alert,
  AlertTitle,
  Box,
  Button,
  Collapse,
  FormControl,
  IconButton,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import { useParams } from "react-router-dom";
import { TextData } from "../../App";
import { getDataFiles, setNew } from "../../Others/data/dataDetails";
import {
  isValidPathName,
  createNewPath,
  getJWTtoken,
} from "../../Others/data/pathDetails";
import GroupedTabs from "../Tabs/GroupedTabs";
import CryptoJS from "crypto-js";
import { AiOutlineClose } from "react-icons/ai";

const PathHome = () => {
  const { textData, encryptedData, token, updateText, updateEncrypted, updateToken } =
    React.useContext(TextData);
  const pathName = useParams();
  const [open, setOpen] = React.useState(true);
  const [password, setPassword] = React.useState("");
  const [newPath, setPath] = React.useState(true);
  const [incorrectPassword,setIncorrectPass] = React.useState(false);
  // const [tkn,setToken] = React.useState(token);

  const decrpytContent = (txt) => {
    
    const bytes = CryptoJS.AES.decrypt(txt, process.env.REACT_APP_ENCRYPTION_KEY);
    const data = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    
    return data;
  }

  const decrpytFiles =  (files) => {
    const decrpytedFiles = []
    
    files.map((file)=>{
      decrpytedFiles.push({name:decrpytContent(file.name),text:decrpytContent(file.text)});
    })
    
    return decrpytedFiles;
  }

  React.useEffect(() => {
    const verifyPath = async () => {
      try {
        const ans = await isValidPathName(pathName.pathName);
        if (ans) {
          setPath(false);
        }
      } catch (error) {
        alert("invalid token or path name");
      }
    };

    verifyPath();    
  }, []);

  React.useEffect(() => {
    const getData = async () => {
      try {
        const data = await getDataFiles(pathName.pathName, token);
        const decrpytedFiles = decrpytFiles(data.files)
        updateText(decrpytedFiles);
        updateEncrypted(data.files);
      } catch (error) {
        console.log(error);
        alert("invalid token or pathName");
      }
    };

    if (!open) {
      getData();
    }
  }, [open]);

  const handleClose = () => {
    setOpen(false);
  };
  const validateForm = () => {
    if (password !== "" || password.length >= 6) return true;
    alert("password should be atleast 6 letters");
    return false;
  };

  const generateToken = async (pathObj) => {
    try {
      const res = await getJWTtoken(pathObj);
      if (res.status !== 404 && res.data.token !== "") {
        updateToken(res.data.token);
        return res.data.token;
      }
    } catch (error) {
      setIncorrectPass(true);
      return null;
    }
  };

  const createNewPathVariable = async (pathObj) => {
    try {
      
      await createNewPath(pathObj);
      const resToken = await generateToken(pathObj);
      await setNew(pathName.pathName, resToken);
      handleClose();
    } catch (error) {
      alert("error while generating new path");
    }
  };

  const handleSubmit = (e) => {
    if (validateForm()) {
      e.preventDefault();
      // call the new path
      if (newPath) {
        createNewPathVariable({
          pathName: pathName.pathName,
          password: password,
        });
      } else {
        // generate the token the existing path // generate token for the new path
        const getToken = async () => {
          
          const tkn = await generateToken({
            pathName: pathName.pathName,
            password: password,
          });

          if(tkn)
            handleClose();

        };
        getToken();
      }
    }
  };

  return (
    <>
  
    <div style={{display:'flex',justifyContent:'center'}}>
      <Collapse in={incorrectPassword} >
        <Alert
        severity="error"
        action={
          <IconButton
            aria-label="close"
            color="inherit"
            size="small"
            onClick={() => {
              setIncorrectPass(false);
            }}
          >
            <AiOutlineClose fontSize="inherit" />
          </IconButton>
        }
        sx={{ width:'100%',mb: 2,zIndex:1000,fontSize:'1rem' }}
        >
          <AlertTitle>Error</AlertTitle>
          Incorrect Password — <strong>Please, enter correct password</strong>
        </Alert>
      </Collapse>
    </div>

      <Modal
        open={open}
        onClose={handleClose}
        sx={{ backgroundColor: "rgba(0, 0, 0, 0.25)", zIndex: -1 }}
        hideBackdrop={true}
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            // width: 500,
            width:{xs:'95%',md:'60%'},
            padding:'0.5rem',
            bgcolor: "white",
            border: "0.5px solid grey",
            boxShadow: 24,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            borderRadius:'40px'
            // p: 4,
          }}
        >
          <Typography id="title" variant="h6" sx={{ marginBottom: 3,padding:'1rem' }}>
            {newPath ?
              <p>This path is empty, own the path by creating a password. <b> Please remember you password</b>, because you won't be able to reset it again</p>:
              <p>This is path is already occupied, If this is your path <b> Please Enter The Password</b></p>
              }
          </Typography>
          <form>
            <FormControl>
              <TextField
                id="outlined-basic"
                type="password"
                label="password"
                variant="outlined"
                // error={!newName}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                sx={{ width: 250, marginBottom: 1 }}
                required
              />
            </FormControl>

            <br />

            <div style={{ display: "flex", justifyContent: "space-around",margin:'2rem 0' }}>
              <Button type="submit" onClick={(e) => handleSubmit(e)} sx={{fontWeight:600}} variant='outlined' color='success'>
                Submit
              </Button>
            </div>
          </form>
        </Box>
      </Modal>

      {!open && <GroupedTabs />}
    </>
  );
};

export default PathHome;
