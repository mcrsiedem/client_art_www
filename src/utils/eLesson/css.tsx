import React from "react";


var styles = {
    root: {
      display: "block"
    },
    item: {
      color: "black",
  
      complete: {
        textDecoration: "line-through"
      },
  
      due: {
        color: "red"
      }
    },
  }







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