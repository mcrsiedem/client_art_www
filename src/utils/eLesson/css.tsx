import React from "react";

const red ={
    color: 'red'
}

const blue ={
    color: 'blue'
}


export default function CSS(){
    return(
        <>
        <div style={red}>
            Hello 1
        </div>

        <div style={blue}>
            Hello 2
        </div>

        </>
    )
}


// monźna łączyć className={style.red} style={{fontWeight: 'bold'}}