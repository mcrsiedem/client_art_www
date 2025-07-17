
import { useContext  } from "react";
import { ModalInsertContext } from "context/ModalInsertContext";
import { _typ_elementu } from "utils/initialvalue";
import DecodeToken from "pages/Login/DecodeToken";
import { getMaxID } from "actions/getMaxID";
import { getMaxIndeks } from "actions/getMaxIndeks";
export   function useKosztyDodatkowe() {

  const modalcontext = useContext(ModalInsertContext);
  const kosztyDodatkoweZamowienia = modalcontext.kosztyDodatkoweZamowienia;
  const setKosztyDodatkoweZamowienia = modalcontext.setKosztyDodatkoweZamowienia;
  const daneZamowienia = modalcontext.daneZamowienia;

  const faktury = modalcontext.faktury;
  const setFaktury = modalcontext.setFaktury;


const dodajKoszty = () => {

let koszty = [...kosztyDodatkoweZamowienia]
 koszty.push({
      id: getMaxID(koszty),
      indeks:getMaxIndeks(koszty),
      zamowienie_id: daneZamowienia.id,
      nazwa:"",
      ilosc: "1",
      cena: "0",
      suma: "0",
      info:"",
      status:1,
      stan:1,
      insert: true,
      dodal: DecodeToken(sessionStorage.getItem("token")).id,
    }
)
setKosztyDodatkoweZamowienia(koszty)
}

const dodajFakture = () => {

let faktura = [...faktury]
 faktura.push({
      id: getMaxID(faktura),
      indeks:getMaxIndeks(faktura),
      zamowienie_id: daneZamowienia.id,
      nazwa:"",
      ilosc: "1",
      cena: "0",
      suma: "0",
      info:"",
      wz:"",
      status:1,
      stan:1,
      insert: true,
      dodal: DecodeToken(sessionStorage.getItem("token")).id,
    }
)
setFaktury(faktura)
}


return [dodajKoszty,dodajFakture];
  }