
// sortowwanie 1,2,3
{listaDostepnychGramatur.sort((a,c)=>a.gramatura-c.gramatura).map((option) => (
    <option key={option.id} value={option.id}>
      {option.gramatura} g/m2 vol. {option.bulk}  {option.wykonczenie}
    </option>
  ))}


// po jedyn z kazdego elementu
listaDostepnychGramatur.map((el)=> el.wykonczenie)
.filter((currentValue, index, arr) => (
   arr.indexOf(currentValue) === index))



   var flags = [], output = [], l = array.length, i;
for( i=0; i<l; i++) {
    if( flags[array[i].age]) continue;
    flags[array[i].age] = true;
    output.push(array[i].age);
}


//distinct

const array = [
  {
    name: "Joe",
    age: 17,
  },
  {
    name: "Bob",
    age: 17,
  },
  {
    name: "Carl",
    age: 35,
  },
];
const unique = [...new Set(array.map((item) => item.age))];
console.log(unique);


const arrayw = [
  {
    name: "Joe",
    age: 17,
  },
  {
    name: "Bob",
    age: 17,
  },
  {
    name: "Carl",
    age: 35,
  },
];
const unique2 = Array.from(new Set(array2.map((item) => item.age)));
console.log(unique2);