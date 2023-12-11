{listaDostepnychGramatur.sort((a,c)=>a.gramatura-c.gramatura).map((option) => (
    <option key={option.id} value={option.id}>
      {option.gramatura} g/m2 vol. {option.bulk}  {option.wykonczenie}
    </option>
  ))}