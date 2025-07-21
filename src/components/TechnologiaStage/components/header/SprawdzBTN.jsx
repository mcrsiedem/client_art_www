import style from "./Header.module.css";
import { useContext } from "react";
import { TechnologyContext } from "context/TechnologyContext";


//----
export default function SprawdzBTN () {
  const techContext = useContext(TechnologyContext);
  const procesyElementowTech = techContext.procesyElementowTech;
  const grupaWykonan = techContext.grupaWykonan;
  const wykonania = techContext.wykonania;
  const setSaveButtonDisabled = techContext.setSaveButtonDisabled;

  return (
    <button
      // disabled={isSaveButtonDisabled}
      className={ style.btn}
      onClick={() => {

    //   const promiseA = new Promise((resolve, reject) => {

    //     if(procesyElementowTech.length == grupaWykonan.length){
    //     resolve(777);
    //     } else{
    //       reject("Dodaj procesy")
    //     }

          
    //     })
    //     promiseA.then(res => setSaveButtonDisabled(false)  ).catch(function(rej) {
    //   alert(rej)
    //   console.log(rej);
    // });

           
    
          const promiseB = new Promise((resolve, reject) => {

        if(wykonania.map(x => x.proces_id).includes(procesyElementowTech.map(x => x.id))){
        resolve(777);
        } else{
          reject("Nie za każdego procesu wygenerowały się wykonania. ")
        }

        })
        promiseB.then(res => setSaveButtonDisabled(false)  ).catch(function(rej) {
      alert(rej)
      console.log(rej);
    });



        
      }}
    >
      Sprawdź 
    </button>
  );
};
