
import { useContext  } from "react";
import axios from "axios";
import { IP } from "../utils/Host";
import { ModalInsertContext } from "context/ModalInsertContext";
import { _typ_elementu } from "utils/initialvalue";
import DecodeToken from "pages/Login/DecodeToken";
import { getMaxID } from "actions/getMaxID";
import { getMaxIndeks } from "actions/getMaxIndeks";
import { AppContext } from "context/AppContext";
export   function useKosztyDodatkowe() {

  const modalcontext = useContext(ModalInsertContext);
  const kosztyDodatkoweZamowienia = modalcontext.kosztyDodatkoweZamowienia;
  const setKosztyDodatkoweZamowienia = modalcontext.setKosztyDodatkoweZamowienia;
  const daneZamowienia = modalcontext.daneZamowienia;
const ksiegowosc = modalcontext.ksiegowosc;
    const setKsiegowosc = modalcontext.setKsiegowosc;
  const faktury = modalcontext.faktury;
  const setFaktury = modalcontext.setFaktury;
  const contextApp = useContext(AppContext);
  const tableZamowienia = contextApp.tableZamowienia;
  const setIsLoading = contextApp.setIsLoading;
  const zamowienia = contextApp.zamowienia;
  const setZamowienia = contextApp.setZamowienia;

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
 setKsiegowosc({...ksiegowosc, faktury_status:3, update:true})
setFaktury(faktura)
}





const importKosztyDodatkowwe = async (nr, rok) => {
  setIsLoading(true);

  try {
    const token = sessionStorage.getItem("token");
    const res = await axios.get(`${IP}import_koszty_dodatko/${nr}/${rok}/${token}`);

    // Tworzymy kopię aktualnego stanu
    const noweKoszty = [...kosztyDodatkoweZamowienia];

    // Poprawione: forEach zamiast forech
    res.data.forEach((k) => {
      noweKoszty.push({
        id: k.id,
        indeks: getMaxIndeks(noweKoszty),
        zamowienie_id: daneZamowienia.id,
        nazwa: k.nazwa,
        ilosc: 1, // Sugestia: używaj liczb zamiast stringów do obliczeń
        cena: 0,
        suma: 0,
        info: "",
        status: 1,
        stan: 1,
        insert: true,
        dodal: DecodeToken(token).id,
      });
    });

    setKosztyDodatkoweZamowienia(noweKoszty);
  } catch (error) {
    console.error("Błąd podczas importu kosztów:", error);
    // Tutaj możesz dodać powiadomienie dla użytkownika o błędzie
  } finally {
    // Wykona się zawsze, niezależnie od sukcesu czy błędu
    setIsLoading(false);
  }
};


return {dodajKoszty,dodajFakture,importKosztyDodatkowwe};
  }