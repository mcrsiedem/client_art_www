export function sortOprawa( grupyOprawaAll,sortowanie) {
  
    let posortowanaOprawa =[...grupyOprawaAll.map((t) => {
        if (t.typ_grupy == 1) {
          return {...t,
            nr: "1",
            naklad: "1",
            typ_procesu: "1",
            data_spedycji: "1",
            typ_procesu: "1",
            klient: "1",
            tytul: "1",
            uwagi: "1",
            
          };
        } else {
          return t;
        }
      })] 



  switch (sortowanie) {
     case 'nr':
    posortowanaOprawa = posortowanaOprawa.sort((a, b) => a.nr - b.nr);
    break;
  case 'naklad':
    posortowanaOprawa = posortowanaOprawa.sort((a, b) => a.naklad - b.naklad);
    break;
      case 'zrealizowano':
    posortowanaOprawa = posortowanaOprawa.sort((a, b) => a.zrealizowano - b.zrealizowano);
    break;
  case 'oprawa':
    posortowanaOprawa = posortowanaOprawa.sort((a, b) => a.typ_procesu.localeCompare(b.typ_procesu) );
    break;
  case 'spedycja':
    posortowanaOprawa = posortowanaOprawa.sort((a, b) => new Date(a.data_spedycji) - new Date(b.data_spedycji));
    break;
  case 'data':
    posortowanaOprawa = posortowanaOprawa.sort((a, b) => new Date(a.poczatek) - new Date(b.poczatek));
    break;
  case 'klient':
    posortowanaOprawa = posortowanaOprawa.sort((a, b) => a.klient.localeCompare(b.klient));
    break;
      case 'praca':
    posortowanaOprawa = posortowanaOprawa.sort((a, b) => a.tytul.localeCompare(b.tytul));
    break;
      case 'status':
    posortowanaOprawa = posortowanaOprawa.sort((a, b) => b.status - a.status);
    break;
      case 'uwagi':
        posortowanaOprawa = posortowanaOprawa.sort((a, b) => a.uwagi.localeCompare(b.uwagi));
    break;
  default:
    posortowanaOprawa = posortowanaOprawa.sort((a, b) => new Date(a.poczatek) - new Date(b.poczatek));
    break;
}


      return posortowanaOprawa;

}
