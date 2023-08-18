let point = {x: 0, y: 0};
let person = {name: 'Jennifer'};

console.log (typeof point); // object
console.log (typeof person); // object


 point = {type: 'point', x: 0, y: 0};
 person = {type: 'person', name: 'Jennifer'};

 console.log (typeof point); // point
console.log (typeof person); // person

if (point.type === 'point'){
    console.log(' This is a point');
}

if (point.type === 'person'){
    console.log(' This is a person');
}