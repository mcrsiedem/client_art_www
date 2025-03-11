
export  function findNadkomplet(arr,target) {

  if(target == '') return ''

  if(target < arr[0].naklad){
    return  arr[0].nadkomplet
  }

  if(target > arr[arr.length-1].naklad){
    return  arr[arr.length-1].nadkomplet
  } else {
    
const id = arr.find((element) => element.naklad > target).id -1;
let nadkomplet =   arr.filter( row => row.id ==id)[0]?.nadkomplet

return nadkomplet
  }



  }
