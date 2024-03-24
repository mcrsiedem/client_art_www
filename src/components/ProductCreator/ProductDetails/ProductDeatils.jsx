import { useState,useContext,useEffect } from 'react';
import style from './ProductDeatils.module.css'
import { AppContext } from 'context/AppContext';
export default function ProductDeatils(){

    const contextApp = useContext(AppContext);

    const[binding,setBinding] = useState(contextApp.bindingType.map((bind) => ( {...bind, isSelcted: false}))) // dodaje do obiektu pole isSelected

    return(
        <div className={style.container}>

            <row className={style.bindingContainer}>
                {binding
                .filter(bind1 => bind1.id !==1) // oprawa id 1 n/d
                .map(((bind) => (
                    <CardBinding bind={bind} binding={binding} setBinding={setBinding}/>
                )))}

            </row>

            <row className={style.bindingContainer}>
            {/* <CardBinding binding={"Okładka"}/>
            <CardBinding binding={"Srodek"}/> */}
        
            </row>

            <row className={style.bindingContainer}>
            {/* <CardBinding binding={"210"}/>
            <CardBinding binding={"297"}/> */}
        
            </row>

            <row className={style.bindingContainer}>
            <button className={style.btn}>Dodaj</button>
       
            </row>
           
           
           

        </div>
    )
}

const CardBinding = ({bind,binding,setBinding} ) => {

      return <div className={style.cardBinding}>
                {bind.nazwa}
                <input checked={bind.isSelcted} className={style.cardInput} type="checkbox" onChange={()=>{
                        setBinding(
                            binding.map((t) => {
                              if (t.id === bind.id) {
                                return {...t, isSelcted: true};
                              } else {
                                return  {...t, isSelcted: false};
                              }
                            })
                          );
      
                }}></input>
      </div>;
    
  };


// const CardBinding = ({ binding }) => {
//   if (binding == "PUR") {
//     return <div className={style.cardBinding}>
//         {binding}
//     </div>;
//   }

//   if (binding == "Hotmelt") {
//     return <div className={style.cardBinding}>
//         {binding}
//     </div>;
//   }

//   if (binding == "Zeszyt") {
//     return <div className={style.cardBinding}>
//         {binding}
//     </div>;
//   }

//   if (binding == "Szystko-klejona") {
//     return <div className={style.cardBinding}>
//         {binding}
//     </div>;
//   }

//   if (binding == "Twarda") {
//     return <div className={style.cardBinding}>
//         {binding}
//     </div>;
//   }



// };