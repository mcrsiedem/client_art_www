

export function getMaxID(stan){
    let max;
    if(stan.length > 0){
         max = Math.max(...stan.map((f) => f.id)) + 1
    }else max =1 ;
   

   return max; 
}