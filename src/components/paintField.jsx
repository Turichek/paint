import { Box } from "@mui/material";
import React, { useRef,useState } from "react";
import Excrect from "./excrect";

export default function PaintField({ color, range, mode, vis, setVis }) {
    const exc = useRef(null);
    const [x, setX] = useState(0);
    const [y, setY] = useState(0);
    const [w, setW] = useState(0);
    const [h, setH] = useState(0);

    let grafics;
    let excrect = <Excrect 
        left={x}
        top={y}
        width={w}
        height={h}
        visibility={vis}
    />

    function paint(e, g, color) {
        switch (mode.value) {
            case 'cleaner':
                g.lineWidth = range * 2;
                g.lineCap = 'round';
                g.lineJoin = 'round';
                g.strokeStyle = '#eee';
                g.lineTo(e.pageX - 220, e.pageY);
                g.stroke();
                break;

            case 'brush':
                g.lineWidth = range * 2;
                g.lineCap = 'round';
                g.lineJoin = 'round';
                g.strokeStyle = color;
                g.lineTo(e.pageX - 220, e.pageY);
                g.stroke();
                break;

            case 'marker':
                g.fillStyle = color;
                g.beginPath();
                g.fillRect(e.pageX - 220 - (range / 2), e.pageY - (range / 2), range, range);
                g.fill();
                g.closePath();
                break;

            case 'excretion':
                setW(e.pageX - 5 - x);
                setH(e.pageY - 5 - y);
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

    function move(elem, e) {
        if (mode.value === 'marker') {
            elem.style.left = e.pageX - range / 2 + "px";
            elem.style.top = e.pageY - range / 2 + "px";
        }
        else if (mode.value === 'brush' || mode.value === 'cleaner') {
            elem.style.left = e.pageX - range + "px";
            elem.style.top = e.pageY - range + "px";
        }
    }

    function moveTarget(e) {
        move(e.target, e)

        if (e.pageX < 220) {
            hideCircle(e);
        }
    }

    function Down(e) {
        if (mode.value === 'excretion') {
            setVis('visible');
            setX(e.pageX);
            setY(e.pageY);
            setW(0);
            setH(0);
        }
        console.log(e.pageX + " " + e.pageY, 'down rect');
    }

    function Up(e) {
        if (mode.value === 'excretion') {
            mode.func('relocate');

            console.log(e.pageX + " " + e.pageY   );
            console.log(x + " " + y + " " + w + " " + h, 'up rect');
            console.log(exc.current);
        }
        // проверка на состояние "перемещение"
        // поместить содержимое img на часть холста где он находится
        // удалить img
    }

    const Move = (e) => {
        grafics = e.target.getContext('2d');
        const target = document.querySelector('#target')
        move(target, e);

        try {
            /*if (mode.value === 'excretion') {
                if (e.nativeEvent.which === 1) {
                    paint(e, grafics, color.value)
                }
            }
            else*/ if (mode.value !== 'pipette') {
                //console.log(mode.value, 'mode 2');
                if (e.nativeEvent.which === 1) {
                    paint(e, grafics, color.value)
                }
                else target.style.visibility = 'visible';
            }
            else {
                console.log(mode.value, 'mode 3');
            }
        }
        catch (e) {/*console.log(e);*/ }
    }

    function getColor(e) {
        if (mode.value === 'pipette') {
            const pxData = grafics.getImageData(e.pageX - 220, e.pageY, 1, 1);
            const col = "#" + ((1 << 24) + (pxData.data[0] << 16) + (pxData.data[1] << 8) + pxData.data[2]).toString(16).slice(1)
            color.func(col);
            mode.func('brush');
            console.log(col);
        }
    }

    function bPath(e) {
        grafics = e.target.getContext('2d');
        grafics.beginPath();
    }

    return (
        <>
            {excrect}
            {
                mode.value === 'marker' ?
                    <Box id="target" sx={{
                        width: range + 'px',
                        height: range + 'px',
                        backgroundColor: 'black',
                        opacity: 0.2,
                        position: 'absolute',
                        visibility: "hidden",
                    }} onMouseMove={(e) => moveTarget(e)} onMouseDown={(e) => hideCircle(e)}></Box>
                    :
                    mode.value === 'brush' || mode.value === 'cleaner' ?
                        <Box id="target" sx={{
                            width: range * 2 + 'px',
                            height: range * 2 + 'px',
                            backgroundColor: 'black',
                            opacity: 0.2,
                            position: 'absolute',
                            visibility: "hidden",
                            borderRadius: '50%'
                        }} onMouseMove={(e) => moveTarget(e)} onMouseDown={(e) => hideCircle(e)}></Box>
                        :
                        <></>
            }

            <canvas id='field'
                style={{ backgroundColor: '#eee' }}
                onMouseDown={(e) => Down(e)}
                onMouseUp={(e) => Up(e)}
                onMouseEnter={(e) => bPath(e)}
                onClick={(e) => getColor(e)}
                onMouseMove={(e) => Move(e)} width='1610px' height='981px'></canvas>
        </>
    )
}