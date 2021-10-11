import { Box, Button } from "@mui/material";
import BrushIcon from '@mui/icons-material/Brush';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import React from "react";

export default function Menu() {

    return (
        <Box sx={{
            backgroundColor: 'lightgreen',
            minWidth: '220px',
            maxWidth: '220px',
            //minHeight: "100%",

        }}>
            <Box sx={{
                p: 1,
                display: 'flex',
                flexDirection: 'column',
            }} variant="contained">
                <Box sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'space-between'
                    
                }}>
                    <Button sx={{mt:1}} variant="outlined" ><img src="https://img.icons8.com/material/24/000000/paint-brush.png"/></Button>
                    <Button sx={{mt:1}} variant="outlined" ><img src="https://img.icons8.com/material-sharp/24/000000/chisel-tip-marker.png"/></Button>
                    <Button sx={{mt:1}} variant="outlined" ><img src="https://img.icons8.com/material-sharp/24/000000/eraser.png"/></Button>
                    <Button sx={{mt:1}} variant="contained" ><BorderColorIcon /></Button>
                    <Button sx={{mt:1}} variant="contained" ><BrushIcon /></Button>
                    <Button sx={{mt:1}} variant="contained" ><BorderColorIcon /></Button>
                </Box>
                <input style={{ width: '100%' }} type="color" />
            </Box>
        </Box>
    )
}