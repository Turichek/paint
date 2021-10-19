import { Box, Button } from "@mui/material";
import React from "react";

export default function Menu({ color, range, mode, setVis, clear }) {
    const toButton = [
        {
            mode: 'brush',
            src: 'https://img.icons8.com/material/24/000000/paint-brush.png'
        },
        {
            mode: 'marker',
            src: 'https://img.icons8.com/material-sharp/24/000000/chisel-tip-marker.png'
        },
        {
            mode: 'cleaner',
            src: 'https://img.icons8.com/material-sharp/24/000000/eraser.png'
        },
        {
            mode: 'pipette',
            src: 'https://img.icons8.com/material-rounded/24/000000/color-dropper.png'
        },
        {
            mode: 'excretion',
            src: 'https://img.icons8.com/ios-glyphs/30/000000/ios-application-placeholder.png'
        },
        {
            mode: 'crop',
            src: 'https://img.icons8.com/ios-glyphs/30/000000/crop.png'
        }]

    function changeMode(e) {
        if (e.nodeName === 'IMG') {
            mode.func(e.parentNode.value);
            setVis('hidden');
        }
        else {
            mode.func(e.value);
            setVis('hidden');
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
                    justifyContent: 'space-between',
                    my: 1
                }}>
                    <label style={{ width: '100%', textAlign: 'center' }}>Выбранный мод: {mode.value}</label>
                    {toButton.map((item, index) =>
                        <Button key={index} sx={{ mt: 1 }} variant="outlined" value={item.mode} onClick={(e) => changeMode(e.target)} >
                            <img style={{ width: '24px' }} src={item.src} alt="..." />
                        </Button>)
                    }
                </Box>
                <Box sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'space-between',
                    my: 3
                }}>
                    <label style={{ width: '100%', textAlign: 'center' }}>Выберете цвет</label>
                    <input style={{ width: '100%', height: '50px' }} type="color" value={color.value} onChange={(e) => color.func(e.target.value)} />
                </Box>
                <Box sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'space-between',
                    my: 1
                }}>
                    {
                        mode.value === 'marker' ?
                        <label style={{ width: '100%', textAlign: 'center' }}>Ширина: {range.value}</label>
                        :
                        <label style={{ width: '100%', textAlign: 'center' }}>Ширина: {range.value * 2}</label>
                    }
                    <input style={{ width: '100%' }} type="range" min="1" max="100" step="1" value={range.value} onChange={(e) => range.func(e.target.value)} />
                </Box>
                <Button variant="contained" onClick={() => clear.func(false)}>Очистить полотно</Button>
            </Box>
        </Box>
    )
}