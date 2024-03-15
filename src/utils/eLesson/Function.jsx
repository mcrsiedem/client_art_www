hello = function(){
    return 'Hello UnderWorld'
}

(function(){
    console.log('Hello');
})(); //hello

function sayHi (person){
    const fullName = ` ${person.firsName} ${person.lastName}`;
    console.log(`Hello, ${fullName} !`); 
}

sayHi({firstName:'John', lastName: 'Doe'}); // Hello John Doe


//callback - po upływie sekundy wykonsoluje napis
setTimeout(function(){
    console.log('A second has passed')
}, 1000);

//----------------------------------------------------

let sum;

sum = function(a,c) {
    return a+c;
};

sum = (a, c) => {
    return a + c;
}

sum = (a, c) => a + c; 
sum = (a=0, c=0) => a + c; // jak nie będzie wartości c => 0

add10 = (x) => x + 10;
add10 = x => x + 10;

//----------------------------------------------------

function log(...allTheThings) {
    console.log(allTheThings);
}
log (1,2,3); // [1,2,3]

//----------------------------------------------------

function createCounter(initial =0){
    let count = initial;
    return{
        inc: () => count++,
        dec: () => count--,
        value: () => count,
        reset: (value) => count = value,
    }
}

const counter = createCounter();
console.log(counter.value()); // 0
console.log(counter.value()); // 1
counter.reset(10);
console.log(counter.value()); // 10