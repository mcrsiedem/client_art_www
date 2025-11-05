
export function getNameStatus(id,_statusy){
    
    let name = _statusy?.filter(x=> x.id == id)[0]?.nazwa
        return name;
}

