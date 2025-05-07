import { _etap_plikow } from "utils/initialvalue";

export function getNameOfEtapPliki(etap_plikow){
    let name = _etap_plikow.filter(x=> x.id == etap_plikow)[0]?.nazwa
        return name;
}

