export function sortOddania( oddaniaGrupy,sortowanie) {
  
    // let posortowaneOddania =[...oddaniaGrupy.map((t) => {
        
    //       return {...t,
    //         nr: "1",
    //         naklad: "1",
    //         typ_procesu: "1",
    //         data_spedycji: "1",
    //         typ_procesu: "1",
    //         klient: "1",
    //         tytul: "1",
    //         uwagi: "1",
            
    //       };
  
    //   })] 
     let posortowaneOddania;
  if(oddaniaGrupy){
   posortowaneOddania = [...oddaniaGrupy] 

  switch (sortowanie) {
     case 'nr':
    posortowaneOddania = posortowaneOddania.sort((a, b) => a.nr - b.nr);
    break;
  case 'naklad':
    posortowaneOddania = posortowaneOddania.sort((a, b) => a.naklad - b.naklad);
    break;
      case 'oprawiono':
    posortowaneOddania = posortowaneOddania.sort((a, b) => b.oprawiono - a.oprawiono )
// posortowaneOddania = posortowaneOddania.sort((a, b) => 
//   (b.oprawiono || 0) - (a.oprawiono || 0) || new Date(a.data_spedycji) - new Date(b.data_spedycji)
// );
    break;
      case 'oddano':
    posortowaneOddania = posortowaneOddania.sort((a, b) => a.oddano - b.oddano );
    break;

  case 'spedycja':
    posortowaneOddania = posortowaneOddania.sort((a, b) => new Date(a.data_spedycji) - new Date(b.data_spedycji));
    break;

  case 'klient':
    posortowaneOddania = posortowaneOddania.sort((a, b) => a.klient.localeCompare(b.klient));
    break;
      case 'praca':
    posortowaneOddania = posortowaneOddania.sort((a, b) => a.tytul.localeCompare(b.tytul));
    break;
      case 'status':
    posortowaneOddania = posortowaneOddania.sort((a, b) => b.status - a.status);
    break;
      case 'uwagi':
        posortowaneOddania = posortowaneOddania.sort((a, b) => a.uwagi.localeCompare(b.uwagi));
    break;
  default:
     posortowaneOddania = posortowaneOddania.sort((a, b) => new Date(a.data_spedycji) - new Date(b.data_spedycji));
    break;
}
  }



      return posortowaneOddania;

}
