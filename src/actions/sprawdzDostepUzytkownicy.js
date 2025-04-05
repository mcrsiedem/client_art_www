import DecodeToken from "pages/Login/DecodeToken"

export function sprawdzDostepUzytkownicy(user){
     if(DecodeToken(sessionStorage.getItem("token")).zamowienia_wszystkie==1){
          return true
        }else{
         return user.id == DecodeToken(sessionStorage.getItem("token")).id
        }
}
