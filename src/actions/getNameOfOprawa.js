
export function getNameOfElementTyp(typ,_typ_elementu){
    let name = _typ_elementu.filter(x=> x.id == typ)[0]?.nazwa
        return name;
}

