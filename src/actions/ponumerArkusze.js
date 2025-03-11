
export function ponumerArkusze(row,elementyTech,setArkusze,arkusze){

 let m = 0;
    setArkusze( arkusze
        .map((ark,i) => {
        if(ark.element_id == row.id){
         m++;
          return {...ark, nr_arkusza: m}
        }else {return ark } 
       
        }
      )
      )

}
