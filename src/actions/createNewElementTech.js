

export function createNewElementTech(row,  elementyTech, setElementyTech) {

  // dodaje nowy elementTech np.  drugą okładkę

  const newElementy = elementyTech.slice();
  newElementy.push({
    id: Math.max(...newElementy.map((f) => f.id)) + 1,
    zamowienie_id: row.zamowienie_id,
    produkt_id: row.produkt_id,
    naklad: row.naklad,
    indeks: Math.max(...newElementy.map((f) => f.indeks)) + 1,
    typ: row.typ,
    nazwa: row.nazwa,
    ilosc_stron: row.ilosc_stron,
    format_x: row.format_x,
    format_y: row.format_y,
    papier_id: row.papier_id,
    gramatura_id: row.gramatura_id,
    papier_info: row.papier_info,
    uwagi: row.uwagi
  
  });

  newElementy.sort((a, b) => a.indeks - b.indeks);
  setElementyTech(newElementy);



const generateMaxID = (value) => {
  let maxID = null;
  if (value.length == 0) return (maxID = 1);
  maxID = Math.max(...value.map((f) => f.id)) + 1;

  return maxID;
};

const generateMaxIndeks = (value) => {
  let maxIndeks = null;
  if (value.length == 0) return (maxIndeks = 1);
  maxIndeks = Math.max(...value.map((f) => f.indeks)) + 1;

  return maxIndeks;
};

const generateMaxIndeksOprawa = (value,oprawa_id) => {
  let maxIndeks = null;
  if (value.length == 0) return (maxIndeks = 1);
  maxIndeks = Math.max(...value
    .filter(x=> x.oprawa_id == oprawa_id)
    .map((f) => f.indeks)) + 1;

  return maxIndeks;
};

}