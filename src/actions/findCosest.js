
export async function findClosest(arr,target) {
  const n = arr.length
  let left = 0,
  right = n - 1;
while (left < right) {
  if (Math.abs(arr[left] - target) <= Math.abs(arr[right] - target)) {
    right--;
  } else {
    left++;
  }
}
return arr[left];


  }

  // const arr = [1, 2, 4, 5, 6, 6, 8, 8, 9];
  //   const n = arr.length;
  //   const target = 11;
  //   console.log(findClosest(arr, n, target));