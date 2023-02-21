import { Button, Grid, TextField,FormControl } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react'
import { TextData } from '../../App';
import Editor from '../Editor';

const EditorAndPreview = ({content,idx,handleSave,handleRemove}) => {

    const {textData,token,updateText,updateToken} = React.useContext(TextData);

    const [preview,setPreview] = React.useState(true);
    // const [fileName,setFileName]
    // console.log(textData.demo1[0]);
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
            
            {
            preview?
                <div>
                    <Grid container justifyContent={'space-around'}>
                        <Button onClick={handlePreviewClose} variant="outlined">Edit</Button>
                        <Button onClick={()=>handleRemove(idx)} variant="outlined" color='error'>Delete</Button>
                    </Grid>
                    <div  dangerouslySetInnerHTML={{ __html: value }}/>
                    {/* {textData[0].demo1.text} */}
                </div>:
                <div>
                    
                        <Grid container justifyContent={'center'} alignItems={'center'} spacing={2} sx={{marginBottom:'1rem'}}>
                            <Grid item  xs={12} md={6} sx={{justifyContent:'center',display:'flex'}}>
                                <FormControl >
                                    <TextField
                                        id="outlined-basic"
                                        label="File Name"
                                        
                                        variant="outlined"
                                        // error={!newName}
                                        value={fileName}
                                        onChange={(e) => {
                                            setFileName(e.target.value)
                                        }}
                                        sx={{ width: 300,marginBottom: 2 }}
                                        fullWidth
                                        required

                                        />
                                </FormControl>
                            </Grid>
                            <Grid item xs={6} md={3}  sx={{justifyContent:'center',display:'flex'}}>
                                <Button onClick={handleSaveAndOpenPreview} variant='outlined'>Save & See Preview</Button>
                            </Grid>
                            <Grid item xs={6} md={3}  sx={{justifyContent:'center',display:'flex'}}>
                                <Button onClick={()=>handleRemove(idx)} variant='outlined' color='error' sx={{width:'8rem'}}>Delete</Button>
                            </Grid>
                        </Grid>
                        
                    <Editor value={value} handleValueChange={setValue} />
                </div>
            }
        </div>
    )
}

export default EditorAndPreview