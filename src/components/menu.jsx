import { Box, Button } from "@mui/material";
import BrushIcon from '@mui/icons-material/Brush';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import React from "react";

export default function Menu({ color, range, mode }) {

    function changeMode(e){
        if(e.nodeName === 'IMG'){
            mode.func(e.parentNode.value);
        }
        else{
            mode.func(e.value);
        }
    }
    return (
        <Box sx={{
            backgroundColor: 'lightgreen',
            minWidth: '220px',
            maxWidth: '220px',
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
                    <Button sx={{ mt: 1 }} variant="outlined" value={'brush'} onClick={(e) => changeMode(e.target)}>
                        <img src="https://img.icons8.com/material/24/000000/paint-brush.png" alt='...'/>
                    </Button>
                    <Button sx={{ mt: 1 }} variant="outlined" value={'marker'} onClick={(e) => changeMode(e.target)}>
                        <img src="https://img.icons8.com/material-sharp/24/000000/chisel-tip-marker.png" alt='...'/>
                    </Button>
                    <Button sx={{ mt: 1 }} variant="outlined" value={'cleaner'} onClick={(e) => changeMode(e.target)}>
                        <img src="https://img.icons8.com/material-sharp/24/000000/eraser.png" alt='...'/>
                    </Button>
                    <Button sx={{ mt: 1 }} variant="outlined" value={'pipette'} onClick={(e) => changeMode(e.target)}>
                        <img src="https://img.icons8.com/material-rounded/24/000000/color-dropper.png" alt='...'/>
                    </Button>
                    <Button sx={{ mt: 1 }} variant="contained" ><BrushIcon /></Button>
                    <Button sx={{ mt: 1 }} variant="contained" ><BorderColorIcon /></Button>
                </Box>
                <input style={{ width: '100%' }} type="color" value={color.value} onChange={(e) => color.func(e.target.value)} />
                <input type="range" min="1" max="100" step="1" value={range.value} onChange={(e) => range.func(e.target.value)} />
            </Box>
        </Box>
    )
}