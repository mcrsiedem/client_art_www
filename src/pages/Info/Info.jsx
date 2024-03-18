import style from "./Info.module.css";
import { useTest } from "hooks/useTest";
import { useState } from "react";
import { Button } from "react-bootstrap";
export default function Info(){
    const[value,setValue] = useState("wartosc domyslna")

const [test,togle]= useTest()


const showText2 = () => {

    console.log("OKOK")
    }

const showText = () => {

    console.log(value)
    }
    return (
        <div className={style.container}>

<       Child showText={showText}/>

        <Parent setValue={setValue}/>


        </div>
    )
}


function Parent({setValue}){


    return (
      <div className={style.parent}>
      
        <div>
            <Button onClick={()=>setValue("wartosc 2")} >set value</Button>  
        </div>

        
      </div>
    );

}

function Child({showText}){
    return(
        <div className={style.child}>
                <Button onClick={()=>showText()}>
                    Pokaz w konsoli
                </Button>
        </div>
    )

}