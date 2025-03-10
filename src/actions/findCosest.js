
export  function findClosest(arr,target) {

  if(target > arr[arr.length-1].naklad){
    return  arr[arr.length-1].naklad

  } else {
    let nadkomplet =   arr.filter( row => row.naklad > target)[0]?.nadkomplet

return nadkomplet
  }


// console.log(arr[47])
// console.log(arr.length)
// console.log(arr[arr.length-1].naklad)

// return 1;

  }
