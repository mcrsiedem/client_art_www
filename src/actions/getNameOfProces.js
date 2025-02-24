
export function getNameOfProces(nazwa_id,procesyNazwa){

    // sprawdza nazwę elemntu po id
    let nazwa_procesu = procesyNazwa.filter(x => x.id == nazwa_id)[0]?.nazwa;
    // let name = _typ_elementu.filter(x=> x.id == typ)[0]?.nazwa

        return nazwa_procesu;
}

