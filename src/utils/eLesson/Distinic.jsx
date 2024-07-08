const array = [
    { "name": "Joe", "age": 17 },
    { "name": "Bob", "age": 17 },
    { "name": "Carl", "age": 35 }
  ]
  
  const key = 'age'
  
  const redUniq = [
    ...array
      .reduce((uniq, curr) => {
        if (!uniq.has(curr[key])) {
          uniq.set(curr[key], curr);
        }
        return uniq;
      }, new Map())
      .values()
  ];
  
  console.log(redUniq); //Output: [ { name: 'Joe', age: 17 }, { name: 'Carl', age: 35 } ]



  // mój eksperyment
  const poj = null

  array.forEach(x=> {
    if (poj.some(z=> z.age != x.age)){
        poj.push(x)
    }
  })
