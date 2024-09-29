
export function zamienNaGodziny(minuty){


    let h = Math.floor(minuty / 60);
    let m = minuty - h*60;
    
    if (m<10) return [h, m].join(':0'); 
    return [h, m].join(':'); 
}
