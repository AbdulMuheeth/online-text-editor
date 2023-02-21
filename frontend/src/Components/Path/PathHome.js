import {
  Box,
  Button,
  FormControl,
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
import { encrypt,decrypt,compare } from "n-krypta";

const PathHome = () => {
  const { textData, token, updateText, updateToken } =
    React.useContext(TextData);
  const pathName = useParams();
  const [open, setOpen] = React.useState(true);
  const [password, setPassword] = React.useState("");
  const [newPath, setPath] = React.useState(true);
  // const [tkn,setToken] = React.useState(token);

  React.useEffect(() => {
    const verifyPath = async () => {
      try {
        const ans = await isValidPathName(pathName.pathName);
        console.log(ans);
        if (ans) {
          console.log("inside");
          setPath(false);
        }
      } catch (error) {
        alert("invalid token or path name");
      }
    };

    // const getData = async () => {
    //   try{
    //     console.log("inside data fetch")
    //     const data = await getDataFiles(pathName.pathName,token);
    //     console.log(data);
    //     updateText(data);
    //     console.log("after data fetch")
    //   }
    //   catch(error){
    //     alert("invalid token or pathName")
    //   }
    // }

    // const pathToken = localStorage.getItem("pathToken");
    // console.log(pathToken);
    // if (pathToken === null || pathToken === "") {
    verifyPath();
    // }

    // if(!open){
    //   console.log("called data fetch")
    //   console.log(token)
    //   getData()
    // }
    // else{
    //   setPath(false)
    // }

    return () => {
      // localStorage.removeItem("pathToken");
    };
  }, []);

  React.useEffect(() => {
    const getData = async () => {
      try {
        console.log("inside data fetch");
        const data = await getDataFiles(pathName.pathName, token);
        console.log("0----------00-0000000000",data);
        const decrpytedFiles = decrypt(data.files,process.env.REACT_APP_ENCRYPTION_KEY);
        updateText(decrpytedFiles);
        console.log("after data fetch");
      } catch (error) {
        console.log(error);
        alert("invalid token or pathName");
      }
    };

    if (!open) {
      console.log("called data fetch");
      console.log(token);
      getData();
    }
  }, [open]);

  const handleOpen = () => {
    setOpen(true);
  };
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
      console.log(res);
      if (res.status !== 404 && res.data.token !== "") {
        console.log("not error");
        updateToken(res.data.token);
        return res.data.token;
      }
    } catch (error) {
      console.log("----------invalid------");
      alert("Invalid Password");
    }
  };

  const createNewPathVariable = async (pathObj) => {
    try {
      console.log("------>inside----------");
      const res = await createNewPath(pathObj);
      console.log("------> newpath done,token Gen ----------");
      const resToken = await generateToken(pathObj);
      console.log("------> token done ----------", resToken);
      const res2 = await setNew(pathName.pathName, resToken);
      console.log("----------", res, resToken, res2, "---------");
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
          await generateToken({
            pathName: pathName.pathName,
            password: password,
          });
          handleClose();
        };
        getToken();
      }
    }
  };

  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        sx={{ backgroundColor: "rgba(0, 0, 0, 0.25)", zIndex: 1 }}
        hideBackdrop={true}
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 500,
            bgcolor: "white",
            border: "2px solid #000",
            boxShadow: 24,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            p: 4,
          }}
        >
          <Typography id="title" variant="h6" sx={{ marginBottom: 3 }}>
            {newPath &&
              "This path is empty, own the path by creating a password.\n"}
            <br />
            "Please remember you password, because you won't be able to reset it
            again"
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
            {/* <br /> */}
            {/* <FormControl>
              <TextField
                label="Description"
                multiline
                rows={3}
                variant="outlined"
                onChange={(e) => {
                  setNewDescription(e.target.value);
                }}
                sx={{ width: 250,marginBottom:2 }}
              />
            </FormControl> */}
            <br />

            <div style={{ display: "flex", justifyContent: "space-around" }}>
              <Button type="submit" onClick={(e) => handleSubmit(e)}>
                Submit
              </Button>
              {/* <Button onClick={handleClose}>cancel</Button> */}
            </div>
          </form>
        </Box>
      </Modal>

      {!open && <GroupedTabs />}
    </>
  );
};

export default PathHome;
