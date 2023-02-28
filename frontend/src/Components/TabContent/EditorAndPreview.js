import { Button, Grid, TextField,FormControl } from '@mui/material';
import React from 'react'
import { TbChevronsDown } from "react-icons/tb";


import Editor from '../Editor';

const EditorAndPreview = ({content,idx,handleSave,handleRemove}) => {

    // const {textData, encryptedData, token, updateText, updateEncrypted, updateToken} = React.useContext(TextData);

    const [preview,setPreview] = React.useState(true);
    const [value,setValue] = React.useState(content.text);
    const [fileName,setFileName] = React.useState(content.name);

    const handlePreviewClose = () => {
        setPreview(false);
    }

    const handleSaveAndOpenPreview = () => {

        handleSave(idx,{name:fileName,text:value})
        setPreview(true);
    }

    return (
        <div>
            <br/>
            {
            preview?
                <div>
                    <Grid container justifyContent={'center'} alignItems={'center'} spacing={2} sx={{marginBottom:'1rem'}}>
                            <Grid item  xs={12} md={6} sx={{justifyContent:'center',display:'flex'}}>
                                <h3 style={{}}> Showing Preview <TbChevronsDown style={{fontWeight:"900"}}/></h3>
                            </Grid>
                            <Grid item xs={6} md={3}  sx={{justifyContent:'center',display:'flex'}}>
                                <Button onClick={handlePreviewClose} sx={{fontWeight:600 }} variant="outlined">Edit</Button>
                            </Grid>
                            <Grid item xs={6} md={3}  sx={{justifyContent:'center',display:'flex'}}>
                                <Button onClick={()=>handleRemove(idx)} variant="outlined" sx={{fontWeight:600}} color='error'>Delete</Button>
                            </Grid>
                    </Grid>
                    <br/>
                    <div  dangerouslySetInnerHTML={{ __html: value }}/>
                </div>:
                <div>
                    
                        <Grid container justifyContent={'center'} alignItems={'center'} spacing={2} sx={{marginBottom:'1rem'}}>
                            <Grid item  xs={12} md={6} sx={{justifyContent:'center',display:'flex'}}>
                                <FormControl >
                                    <TextField
                                        id="outlined-basic"
                                        label="File Name"
                                        variant="outlined"
                                        value={fileName}
                                        onChange={(e) => {
                                            setFileName(e.target.value)
                                        }}
                                        sx={{
                                            width: { xs:300, sm: 500, md: 400 }
                                        }}
                                        fullWidth
                                        required
                                        />
                                </FormControl>
                            </Grid>
                            <Grid item xs={6} md={3}  sx={{justifyContent:'center',display:'flex'}}>
                                <Button onClick={handleSaveAndOpenPreview} variant='outlined' sx={{minHeight:'4rem'}}>Save & See Preview</Button>
                            </Grid>
                            <Grid item xs={6} md={3}  sx={{justifyContent:'center',display:'flex'}}>
                                <Button onClick={()=>handleRemove(idx)} variant='outlined' color='error' sx={{width:'8rem', minHeight:'4rem'}}>Delete</Button>
                            </Grid>
                        </Grid>
                        <br/>
                    <Editor value={value} handleValueChange={setValue} />
                </div>
            }
        </div>
    )
}

export default EditorAndPreview