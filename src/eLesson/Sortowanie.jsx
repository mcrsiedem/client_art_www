
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