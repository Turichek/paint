import { Box } from "@mui/material";
import React from "react";

export default function PaintField() {
    const Paint = (e) => {
        
        const grafics = e.target.getContext('2d');
        const grafics1 = e.target.getContext('2d');
        

        /*grafics.beginPath();
        grafics.ellipse(100, 100, 25, 25, Math.PI / 4, 0, 2 * Math.PI);
        grafics.stroke();*/
        console.log(e);
        console.log(grafics);
    }

    const Move = (e) =>{
        if(e.nativeEvent.which == 1) {
            const grafics = e.target.getContext('2d');
            grafics.fillStyle = 'red';
            grafics.beginPath();
            grafics.ellipse(e.pageX - 220, e.pageY, 25, 25, Math.PI / 4, 0, 2 * Math.PI);
            grafics.fill();
        }
        else if(e.nativeEvent.which == 2) {
            const grafics = e.target.getContext('2d');
            grafics.fillStyle = 'blue';
            grafics.fillRect(e.pageX - 220, e.pageY, 25, 25);
            grafics.fill();
        }
        // console.log(e.pageX - 220,e.pageY,'xy');

        // grafics.beginPath();
        // grafics.ellipse(e.pageX - 220, e.pageY, 1, 1, Math.PI / 4, 0, 2 * Math.PI);
        // grafics.stroke();
    }

    return (
        <canvas onMouseMove={(e) => Move(e)} onMouseDown={(e) => Paint(e)} width='1628px' height='981px'>

        </canvas>
    )
}