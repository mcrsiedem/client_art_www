import DecodeToken from "pages/Login/DecodeToken"

export function sprawdzDostepZamowienia(zamowienie){
     if(DecodeToken(sessionStorage.getItem("token")).zamowienia_wszystkie==1){
          return true
        }else{
         return zamowienie.opiekun_id == DecodeToken(sessionStorage.getItem("token")).id
        }
}
