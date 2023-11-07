

const _firma = [
  {
    id: 1,
    nazwa: "ArtDruk",
    nip: "123-111-22-33"

  },
  {
    id: 2,
    nazwa: "PrintStudio",
    nip: "123-111-22-33"
  },
  {
    id: 3,
    nazwa: "ArtDruk Sp. z o.o.",
    nip: "123-111-22-33"
  }
  
];

const _klient = [
  {
    id: 1,
    firma: "DESA SDA",
    user_id: "1",
    nip: "123-111-22-33",
    data_dodania: "2023-10-20",
    opiekun_user_id: "Katalog",
  },
  {
    id: 2,
    firma: "Nowa Era",
    user_id: "1",
    nip: "123-111-22-33",
    data_dodania: "2023-10-20",
    opiekun_user_id: "Katalog",
  },
  
];

const _produkty = [
  {
    id: 1,
    typ: "Magazyn",
    tytul: "1",
    wersja: "",
    ilosc_stron: "84",
    format_x: "210",
    format_y: "297",
    oprawa: "PUR",
    naklad: "1000",
  },
  
  
];

const _elementy = [
  {
    id: 1,
    typ: "Okładka",
    nazwa: "PL",
    ilosc_stron: "4",
    kolor_front: "4",
    kolor_back: "4",
    format_x: "210",
    format_y: "297",
    papier_id: "Karton",
    gramatura: "250",
    wykonczenie: "gloss",
    naklad: "1000",
    uszlachetnianie_id: "UV",
    index: 0
  },
  {
    id: 2,
    typ: "Środek",
    nazwa: "PL",
    ilosc_stron: "80",
    kolor_front: "4",
    kolor_back: "4",
    format_x: "210",
    format_y: "297",
    papier_id: "Offset",
    gramatura: "110",
    wykonczenie: "",
    naklad: "1000",
    uszlachetnianie_id: "",
    index: 1
  },
  {
    id: 3,
    typ: "Insert",
    nazwa: "PL",
    ilosc_stron: "2",
    kolor_front: "4",
    kolor_back: "4",
    format_x: "200",
    format_y: "290",
    papier_id: "Offset",
    gramatura: "110",
    wykonczenie: "",
    naklad: "1000",
    uszlachetnianie_id: "",
    index: 2
  },
  {
    id: 4,
    typ: "Insert",
    nazwa: "EN",
    ilosc_stron: "2",
    kolor_front: "4",
    kolor_back: "4",
    format_x: "200",
    format_y: "290",
    papier_id: "Offset",
    gramatura: "110",
    wykonczenie: "",
    naklad: "1000",
    uszlachetnianie_id: "",
    index: 3
  },
  
  
  
  
];

const _zestawy = [
  {
    id: 1,
    typ: "Magazyn",
    nazwa: "1",
    ilosc_stron: "84",
    format_x: "210",
    format_y: "297",
    oprawa: "PUR",
    naklad: "1000",
  }


  
];

const _papiery = [
  {
    id: 1,
    nazwa: "Kreda",
    wykonczenie: "Mat",
    gramatura: "90",

  },{
    id: 2,
    nazwa: "Offset",
    wykonczenie: "-",
    gramatura: "150",

  }

]

export {_firma,_produkty,_klient,_zestawy,_elementy,_papiery};