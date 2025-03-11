
export function ponumerArkusze(row,setArkusze,arkusze,legi,setLegi){

 let m = 0;
    setArkusze( arkusze
        .map((ark,i) => {
        if(ark.element_id == row.id){
         m++;
          return {...ark, nr_arkusza: m, update: true}
        }else {return ark } 
       
        }
      )
      )
      let n = 0;
      setLegi( legi
        .map((ark,i) => {
        if(ark.element_id == row.id){
        n++;
          return {...ark, nr_legi: n, update: true}
        }else {return ark } 
       
        }
      )
      )


}
