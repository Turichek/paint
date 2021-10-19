import { Box } from "@mui/material";
import React, { useRef, useState } from "react";
import { useEffect } from "react";
import Excret from "./excret";
import drawFromImage from "./helpers/drawFromImage";
import hideExcret from "./helpers/hideExcret";

export default function PaintField({ color, range, mode, visible, clear }) {
    const canva = useRef(null);
    const toImg = useRef(null);
    const [x, setX] = useState(0);
    const [y, setY] = useState(0);
    const [w, setW] = useState(0);
    const [h, setH] = useState(0);
    const [grafics, setGrafics] = useState('');
    let isClear = false;

    let excret = <Excret
        left={x}
        top={y}
        width={w}
        height={h}
        visibility={visible}
        setLeft={setX}
        setTop={setY}
        mode={mode}
        toImg={toImg}
        canva={canva}
    />

    if (grafics !== '' && clear.value === isClear) {
        grafics.fillStyle = '#eee';
        grafics.fillRect(0, 0, 1610, 981);
        grafics.fill();
        isClear = true;
    }

    useEffect(()=>{
        if(isClear === true){
            clear.func(true);
        }
    })

    function paint(e, color) {
        switch (mode.value) {
            case 'cleaner':
                grafics.lineWidth = range * 2;
                grafics.lineCap = 'round';
                grafics.lineJoin = 'round';
                grafics.strokeStyle = '#eee';
                grafics.lineTo(e.pageX - 220, e.pageY);
                grafics.stroke();
                break;

            case 'brush':
                grafics.lineWidth = range * 2;
                grafics.lineCap = 'round';
                grafics.lineJoin = 'round';
                grafics.strokeStyle = color;
                grafics.lineTo(e.pageX - 220, e.pageY);
                grafics.stroke();
                break;

            case 'marker':
                grafics.fillStyle = color;
                grafics.beginPath();
                grafics.fillRect(e.pageX - 220 - (range / 2), e.pageY - (range / 2), range, range);
                grafics.fill();
                grafics.closePath();
                break;

            case 'crop':
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
        move(e.target, e);

        if (e.pageX < 220) {
            hideCircle(e);
        }
    }

    function Down(e) {
        if (mode.value === 'excretion' || mode.value === 'crop') {
            toImg.current.src = 'null';
            visible.func('visible');
            setX(e.pageX);
            setY(e.pageY);
            setW(0);
            setH(0);
        }
        else if (mode.value === 'relocate') {
            drawFromImage(x, y, grafics, toImg, 1);
            hideExcret(toImg, visible.func, mode.func);
        }
    }

    function createImageFromExcret(copy) {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = copy.width;
        canvas.height = copy.height;
        ctx.putImageData(copy, 0, 0);
        toImg.current.src = canvas.toDataURL("image/jpeg");
    }

    function Up() {
        if (mode.value === 'excretion') {
            mode.func('relocate');

            const copyToImg = grafics.getImageData(x - 219, y + 1, w, h);
            grafics.fillStyle = '#eee';
            grafics.fillRect(x - 219, y + 1, w, h);
            grafics.fill();
            createImageFromExcret(copyToImg);

            alert("При зажатой ЛКМ вы можете переместить содержимое выделения\nЕсли зажмете Alt и будете перетаскивать, то скопируюте сожержимое")
        }
        else if (mode.value === 'crop') {
            const toCrop = grafics.getImageData(x - 219, y + 1, w, h);
            createImageFromExcret(toCrop);
            alert("При клике на выделение произойдет масштабирование изображения на весь холст")
        }
    }

    const Move = (e) => {
        setGrafics(e.target.getContext('2d'));
        const target = document.querySelector('#target');
        move(target, e);

        try {
            if (mode.value !== 'pipette') {
                if (e.nativeEvent.which === 1) {
                    paint(e, color.value);
                }
                else target.style.visibility = 'visible';
            }
            else {
                console.log(mode.value, 'mode 3');
            }
        }
        catch (e) { }
    }

    function getColor(e) {
        if (mode.value === 'pipette') {
            const pxData = grafics.getImageData(e.pageX - 220, e.pageY, 1, 1);
            const col = "#" + ((1 << 24) + (pxData.data[0] << 16) + (pxData.data[1] << 8) + pxData.data[2]).toString(16).slice(1);
            color.func(col);
            mode.func('brush');
            console.log(col);
        }
    }

    function bPath() {
        setGrafics(canva.current.getContext('2d'));
        if (grafics !== '') grafics.beginPath();
    }

    return (
        <>
            {excret}
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
            <canvas
                unselectable="on"
                draggable="false"
                ref={canva}
                style={{ backgroundColor: '#eee' }}
                onMouseDown={(e) => Down(e)}
                onMouseUp={(e) => Up(e)}
                onMouseEnter={bPath}
                onClick={(e) => getColor(e)}
                onMouseMove={(e) => Move(e)}
                onDragStart={() => { return false }}
                width='1610px' height='981px'></canvas>
        </>
    )
}