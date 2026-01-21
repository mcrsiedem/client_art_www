import DecodeToken from "pages/Login/DecodeToken"

// export function sprawdzDostepProcesy2(dostep){
//      if(DecodeToken(sessionStorage.getItem("token"))[dostep]==1){
//           return true
//         }else{
//          return false
//         }
// }

// sprawdza czy user ma dostęp do wszystkich procesów czy tylko do kooperacji
// odfiltrowanie niechcianych handlowców


export function sprawdzDostep(dostep) {
    // 1. Pobieramy i dekodujemy token raz (dla czytelności)
    const tokenData = DecodeToken(sessionStorage.getItem("token"));

    // 2. Zwracamy wynik porównania bezpośrednio (to już jest true lub false)
    // Używamy ?., aby uniknąć błędu, jeśli tokenData byłoby null/undefined
    return tokenData?.[dostep] == 1;
}