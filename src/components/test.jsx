import { Box } from "@mui/material";
import React from "react";
import { useState } from "react";
import Menu from "./menu";
import PaintField from "./paintField";

export default function Test() {
    const [color, setColor] = useState('#000000');
    const [range, setRange] = useState(25);
    const [mode, setMode] = useState('brush');
    const [vis, setVis] = useState('hidden');

    const values = {
        color: {
            value: color,
            func: setColor
        },
        range: {
            value: range,
            func: setRange
        },
        mode: {
            value: mode,
            func: setMode
        },
        visible: {
            value: vis,
            func: setVis
        }
    }
    
    return (
        <Box sx={{ display: 'flex' }}>
            <Menu color = {values.color}
                range = {range}
                setRange={setRange}
                mode = {values.mode} 
                setVis={setVis}
                />
            <PaintField color = {values.color}
                range = {range}
                mode = {values.mode} 
                visible={values.visible}/>
        </Box>
    )
}
