import { Box } from "@mui/material";
import React from "react";
import { useState } from "react";
import Menu from "./menu";
import PaintField from "./paintField";

export default function Test() {
    const [color, setColor] = useState('#000000');
    const [range, setRange] = useState(25);
    const [mode, setMode] = useState('brush');

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
        }
    }
    
    return (
        <Box sx={{ display: 'flex' }}>
            <Menu color = {values.color}
                range = {values.range}
                mode = {values.mode} />
            <PaintField color = {values.color}
                range = {range}
                mode = {values.mode} />
        </Box>
    )
}
