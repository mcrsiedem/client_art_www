// JavaScript Objects Simplified // MasterClass - basarat
// https://www.youtube.com/watch?v=oxVcJzoVqZM 

let channig = {name: 'magic mike', gender: 'male'};

console.log(channing.name); // magic mike

channig.name = 'tatum';
console.log(channing.name); // tatum

channig.skill='dance';
console.log(channig.skill); // dance

channig.born = 1980;
console.log(chaning.born); //1980

chaning.planet = {name: 'earth'};
console.log(chaning.planet.name); //earth

console.log(chaning);
// {name: 'tatum', gender:'male', skill: 'dance', born: 1980, planet: {name:'earth}}


//-----------------------------------------------------------------------
const diet = 'food';
const alien = {
    name: 'martian',
    'age': 100, // 'age: 100' is the same
    'curren-status': 'alive',
    ['home' + 'planet']: 'Mars', // `homeplanet: 'mars'` is the same
    ['favorite' + diet]: 'pizza', // `favoritefood: 'pizza'` is the same
};

console.log(alien.name); // 'martian'
alien.name = 'martian';

console.log(alien['name']); // 'martian'
alien['name']= 'allen';

console.log(alien['current-status']); // 'alive'
console.log(alien['favorite' + diet]); // 'pizza'

//-----------------------------------------------------------------------

const digits ={
    1: 'one',
    dos: 'two',
    3: 'three',
}

console.log(digits.dos); // two
console.log(digits['dos']); // two
console.log(digits[1]); //one
console.log(digits['1']); //one

digits[1]='uno'; // uno - ndapisanie one na uno


//-----------------------------------------------------------------------

const make ='Ford';
const model ='Mustang';
const color = 'White';

let car;

car = {
    make: make,
    model: model,
    color: color,
};

// that same

car = {
    make,
    model,
    color,
};

//-----------------------------------------------------------------------
const point2d = {
    x: 0,
    y: 0,
}

let point3d = {
    ...point2d,
    z: 0,
    }   // rozpakowuje obiekt point2d i dodaje pole z

//-----------------------------------------------------------------------
let taskPending = {
    title: 'Record Tutorial',
    when: 'Today',
    isColeted: false,
};

let taskCompleted = {
    ...taskPending,
    isCompleted: true, // nadpisane pole
}

