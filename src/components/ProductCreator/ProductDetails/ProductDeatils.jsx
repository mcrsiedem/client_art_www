import style from './ProductDeatils.module.css'
export default function ProductDeatils(){
    return(
        <div className={style.container}>

            <row className={style.bindingContainer}>
            <CardBinding binding={"PUR"}/>
            <CardBinding binding={"Hotmelt"}/>
            <CardBinding binding={"Zeszyt"}/>
            <CardBinding binding={"Szystko-klejona"}/>
            <CardBinding binding={"Twarda"}/>
            </row>

            <row className={style.bindingContainer}>
            <CardBinding binding={"Okładka"}/>
            <CardBinding binding={"Srodek"}/>
        
            </row>

            <row className={style.bindingContainer}>
            <CardBinding binding={"210"}/>
            <CardBinding binding={"297"}/>
        
            </row>

            <row className={style.bindingContainer}>
            <button>Dodaj</button>
       
            </row>
           
           
           

        </div>
    )
}

const CardBinding = ({ binding }) => {

      return <div className={style.cardBinding}>
                {binding}
                <input className={style.cardInput} type="checkbox"></input>
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