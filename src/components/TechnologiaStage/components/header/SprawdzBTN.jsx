import style from "./Header.module.css";
import { useContext } from "react";
import { TechnologyContext } from "context/TechnologyContext";


//----
export default function SprawdzBTN () {
  const techContext = useContext(TechnologyContext);
  const procesyElementowTech = techContext.procesyElementowTech;
  const grupaWykonan = techContext.grupaWykonan;
  const setSaveButtonDisabled = techContext.setSaveButtonDisabled;

  return (
    <button
      // disabled={isSaveButtonDisabled}
      className={ style.btn}
      onClick={() => {

      const promiseA = new Promise((resolve, reject) => {

        if(procesyElementowTech.length == grupaWykonan.length){
        resolve(777);
        } else{
          reject("Dodaj procesy")
        }
      // techContext.setArkusze([])
      // techContext.setLegi([])
      // techContext.setLegiFragmenty([])
      // techContext.setGrupaWykonan([])
      // techContext.setWykonania([])
          
        })
        promiseA.then(res => setSaveButtonDisabled(false)  ).catch(function(rej) {
      //here when you reject the promise
alert(rej)
      console.log(rej);
    });

              
        
      }}
    >
      Sprawdź 
    </button>
  );
};
