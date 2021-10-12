import { Box } from "@mui/material";
import React from "react";

export default function PaintField({ color, range, mode }) {
    let grafics;
    function paint(e, g, color, number) {
        switch (number) {
            case 1:
                g.lineWidth = range * 2;
                g.lineCap = 'round';
                g.lineJoin = 'round';
                g.strokeStyle = color;
                g.lineTo(e.pageX - 220, e.pageY);
                g.stroke();
                break;

            case 2:
                g.fillStyle = color;
                g.beginPath();
                g.fillRect(e.pageX - 220 - (range / 2), e.pageY - (range / 2), range, range);
                g.fill();
                g.closePath();
                break;

            default:
                break;
        }
    }

    function hideCircle(e) {
        e.target.style.visibility = 'hidden';
        grafics.beginPath();
        console.log('hideCircle');
    }

    function beginMoveCircle(circle, e) {
        if (mode.value === 'marker') {
            circle.style.left = e.pageX - range / 2 + "px";
            circle.style.top = e.pageY - range / 2 + "px";
        }
        else if(mode.value === 'brush' || mode.value === 'cleaner') {
            circle.style.left = e.pageX - range + "px";
            circle.style.top = e.pageY - range + "px";
        }
    }

    function moveCircle(e) {
        if (mode.value === 'marker') {
            e.target.style.left = e.pageX - range / 2 + "px";
            e.target.style.top = e.pageY - range / 2 + "px";
        }
        else if(mode.value === 'brush' || mode.value === 'cleaner') {
            e.target.style.left = e.pageX - range + "px";
            e.target.style.top = e.pageY - range + "px";
        }

        if (e.pageX < 220) {
            hideCircle(e);
        }
    }

    const Move = (e) => {
        grafics = e.target.getContext('2d');

        const circle = document.querySelector('#circle')
        beginMoveCircle(circle, e);

        if (e.nativeEvent.which === 1) {
            if (mode.value === 'brush') {
                paint(e, grafics, color.value, 1)
            }
            else if (mode.value === 'marker') {
                paint(e, grafics, color.value, 2)
            }
            else if (mode.value === 'cleaner') {
                paint(e, grafics, '#ffffff', 1);
            }
        }
        else if(mode.value === 'pipette'){}
        else circle.style.visibility = 'visible';
    }

    function getColor(e) {
        if(mode.value === 'pipette'){
            const pxData = grafics.getImageData(e.pageX - 220, e.pageY,1,1);
            const col = "#" + ((1 << 24) + (pxData.data[0] << 16) + (pxData.data[1] << 8) + pxData.data[2]).toString(16).slice(1)
            color.func(col);
            mode.func('brush');
            console.log(col);
        }
    }

    function bPath(e) {
        grafics = e.target.getContext('2d');
        grafics.beginPath();
        console.log('beginPath');
    }

    function cPath() {
        grafics.closePath();
        console.log('closePath');
    }

    return (
        <>
            {
                mode.value === 'marker' ?
                    <Box id="circle" sx={{
                        width: range + 'px',
                        height: range + 'px',
                        backgroundColor: 'black',
                        opacity: 0.2,
                        position: 'absolute',
                        visibility: "hidden",
                    }} onMouseMove={(e) => moveCircle(e)} onMouseDown={(e) => hideCircle(e)}></Box>
                    :
                mode.value === 'brush' || mode.value === 'cleaner'?
                    <Box id="circle" sx={{
                        width: range * 2 + 'px',
                        height: range * 2 + 'px',
                        backgroundColor: 'black',
                        opacity: 0.2,
                        position: 'absolute',
                        visibility: "hidden",
                        borderRadius: '50%'
                    }} onMouseMove={(e) => moveCircle(e)} onMouseDown={(e) => hideCircle(e)}></Box>
                    :
                    <></>
            }

            <canvas
             onMouseEnter={(e) => bPath(e)}
             onClick={(e)=>getColor(e)}
             onMouseUp={cPath}
             onMouseMove={(e) => Move(e)} width='1610px' height='981px'></canvas>
        </>
    )
}