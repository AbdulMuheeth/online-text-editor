import React from 'react'
import { Box, Typography } from '@mui/material';
import EditorAndPreview from '../TabContent/EditorAndPreview';

const TabPanel = (props) => {
    const { children, value, index, handleSave, handleRemove,...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{
            <EditorAndPreview content={children} idx={index} handleSave={handleSave} handleRemove={handleRemove}/>
          }</Typography>
        </Box>
      )}
    </div>
  );
  
}

export default TabPanel