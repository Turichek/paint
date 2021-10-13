import React from "react";

export default function Excrect({ top, left, width, height,visibility }) {
    function Move(e){
        if (e.nativeEvent.which === 1) {

        }
    }

    function Down(e){
        
    }

    function Up(e){

    }
    return (
        <img id='excrect'
            style={{
                position: 'absolute',
                border: '1px dashed red',
                visibility: visibility,
                top: top + 'px',
                left: left + 'px',
                width: width + 'px',
                height: height + 'px'
            }}
            onMouseUp={(e)=>Up(e)}
            onMouseDown={(e)=>Down(e)}
            onMouseMove={(e)=>Move(e)}
            alt="" />
    )
}