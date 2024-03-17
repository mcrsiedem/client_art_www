import style from "./Info.module.css";
import { useAuth } from "hooks/useAuth";
import { useTest } from "hooks/useTest";
export default function Info(){
    
const [test,togle]= useTest()
    return (
        <div className={style.container}>
            <button onClick={()=>togle()}>Schowaj</button>
            {/* <button>Pokaz</button> */}
           {test&&(<p1>napis</p1>)} 


        </div>
    )
}