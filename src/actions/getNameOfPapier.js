
export function getNameOfPapier(listaPapierowWyszukiwarka,id){


let nazwa =    listaPapierowWyszukiwarka.filter((x) => x.id == id)[0].nazwa
let gramatura =    listaPapierowWyszukiwarka.filter((x) => x.id == id)[0].gramatura
let wykonczenie =    listaPapierowWyszukiwarka.filter((x) => x.id == id)[0].wykonczenie



        return nazwa+" "+gramatura+" "+wykonczenie;
}
// zmiana kolejność w obrębie grupy
// kolejność wykonań fragmentów
