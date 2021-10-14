import React from "react";
import { useState } from "react";
import drawFromImage from "./helpers/drawFromImage";
import hideExcret from "./helpers/hideExcret";

export default function Excret({ top, left, width, height, visibility, setLeft, setTop, mode, toImg, canva }) {
    const [old_x, setOld_x] = useState(0);
    const [old_y, setOld_y] = useState(0);

    function Move(e) {
        if (e.nativeEvent.which === 1) {
            if ((mode.value !== 'excretion') && (mode.value !== 'crop')) {
                setLeft(left + (e.pageX - old_x));
                setTop(top + (e.pageY - old_y));

                setOld_x(e.pageX);
                setOld_y(e.pageY);
                console.log(e.altKey, mode.value);
            }
        }
    }

    function Down(e) {
        setOld_x(e.pageX);
        setOld_y(e.pageY);
        if (e.altKey) {
            mode.func('copy');
            const ctx = canva.current.getContext('2d');
            drawFromImage(left, top, ctx, toImg, 1);
        }
    }

    function Up(e) {
        if (mode.value === 'copy' || mode.value === 'relocate') {
            const ctx = canva.current.getContext('2d');
            drawFromImage(left, top, ctx, toImg, 1);
            hideExcret(toImg, visibility.func, mode.func);
        }
        else if (mode.value === 'crop') {
            const ctx = canva.current.getContext('2d');
            drawFromImage(left, top, ctx, toImg, 2);
            hideExcret(toImg, visibility.func, mode.func);
        }
        else {
            alert("некорректное выделение!")
            hideExcret(toImg, visibility.func, mode.func);
        }
    }

    return (
        <img ref={toImg}
            style={{
                position: 'absolute',
                border: '1px dashed red',
                visibility: visibility.value,
                top: top + 'px',
                left: left + 'px',
                width: width + 'px',
                height: height + 'px'
            }}
            onMouseUp={(e) => Up(e)}
            onMouseDown={(e) => Down(e)}
            onMouseMove={(e) => Move(e)}
            onDragStart={() => { return false }}
            alt={""} draggable="false"
            unselectable="on" />
    )
}