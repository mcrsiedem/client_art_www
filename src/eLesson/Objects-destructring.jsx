let point = {
    x: 0,
    y: 10,
    z: 20
}

{
    const x = point.x, y = point.y;
}

{
    const {x,y} = point;
}

{
    const {x: pointX, y: pointY, z: pointZ} = point;
    console.log(pointX, pointY, pointZ); // 0, 10, 20
}

{
    const {x, ...rest} = point;
    console.log(x, rest);  //  0,{ y: 10, z: 20 }
}
//-----------------------------------------------------------------------


let center = {
    name: 'origin',
    location: {x:0, y:0, z: 0 }
};

{
    const {location: loc} = center;
    console.log(loc); // {x:0, y:0, z: 0 }
}

{
    const {location: { x }} = center;
    console.log(x); // 0
}
