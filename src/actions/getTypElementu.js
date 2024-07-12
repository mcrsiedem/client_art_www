
import { _typ_elementu } from "utils/initialvalue"
export function getTypElementu( id){


        return _typ_elementu.filter(x => x.id == id)[0].nazwa
}
