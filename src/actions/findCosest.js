
export  function findClosest(arr,target) {

   if(target == '') return ''

  if(target < arr[0].naklad){
    return  arr[0].nadkomplet

  }

  if(target > arr[arr.length-1].naklad){
    return  arr[arr.length-1].nadkomplet

  } else {
    
// let nadkomplet =   arr.filter( row => row.naklad > target)[0]?.nadkomplet

const id = arr.find((element) => element.naklad > target).id -1;

let nadkomplet =   arr.filter( row => row.id ==id)[0]?.nadkomplet

// console.log(nadkomplet)

return nadkomplet
  }


  
// console.log(arr[47])
// console.log(arr.length)
// console.log(arr[arr.length-1].naklad)

// return 1;

  }
