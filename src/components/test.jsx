import { Box } from "@mui/material";
import React from "react";
import Menu from "./menu";
import PaintField from "./paintField";

export default function Test() {
    return (
        <Box sx={{ display: 'flex' }}>
            <Menu />
            <PaintField />
        </Box>
    )
}
