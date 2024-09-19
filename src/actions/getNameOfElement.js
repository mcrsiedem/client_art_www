
export function getNameOfElement(element_id,elementyTech,_typ_elementu){

    // sprawdza nazwę elemntu po id
    let typ = elementyTech.filter(x => x.id == element_id)[0]?.typ;
    let name = _typ_elementu.filter(x=> x.id == typ)[0]?.nazwa

        return name;
}
