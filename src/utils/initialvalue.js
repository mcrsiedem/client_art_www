import { today } from "actions/today";
import { todayPlusDni } from "actions/todayPlusDni";
import DecodeToken from "pages/Login/DecodeToken";

const reg_txt = /^[a-zA-Z0-9_+\sąćęłńóśźżĄĘŁŃÓŚŹŻ]+$/;
const reg_int = /^[0-9]+$/;
const reg_cena = /^\d{0,6}(?:\,\d{0,2}){0,1}$/;


// const _opiekun2 = [
//   {
//     id: 1,
//     imie: "Maciej",
//     nazwisko: "Romiszewski",
//     login: "Maciek",
//     haslo: "mcr",
//     dostep: "7",
//   },
//   {
//     id: 2,
//     imie: "Piotr",
//     nazwisko: "Hołowicz",
//     login: "Piotr",
//     haslo: "p",
//     dostep: "7",
//   },
// ];

const initialPreOrder = {
  typ: 1,
  oprawa: "",
  naklad: "",
  strony_okl: "4",
  strony_srd: "",
  szerokosc: "",
  wysokosc: "",
  bok_oprawy: "",
  falc_skladka: "29", // rodzaj legi
  druk_skladka: "", // rodzaj  legi

  proces: [{id:1}]
};


const initialDane = {
  id: 1,
  prime_id: 1,
  nr: "",
  rok: "2025",
  firma_id: 0,
  klient_id: 0,
  opiekun_id:  0,
  tytul: "",
  data_przyjecia: today(),
  data_materialow: null,
  // data_spedycji: todayPlusDni(5),
  data_spedycji: null,
  stan: 1,
  status: 1,
  etap: 2,
  uwagi: "",
  cena: "",
  waluta_id: 1,
  termin_platnosci: 30,
  vat_id: 4,
  przedplata: "",
  fsc: 2,
  zgoda_na_zapis: false,
  update: false

};
const initialProdukty = [
  {
    id: 1,
    zamowienie_id: 1,
    typ: 1,
    nazwa: "",
    wersja: "",
    ilosc_stron: "",
    format_x: "",
    format_y: "",
    oprawa: "",
    naklad: 0,
    stan:1,
    status:1,
    etap:1,
    indeks: 0,
    uwagi: "",
  },
];

const initialElementy = [
  {
    id: 1,
    zamowienie_id: 1,
    produkt_id: 1,
    typ: 1,
    nazwa: "",
    ilosc_stron: null,
    kolory: "",
    format_x: null,
    format_y: null,
    papier_id: 0,
    papier_postac_id: 1,
    papier_info: "",
    // gramatura_id: 0,
    naklad: null,
    uwagi: "",
    stan:0,
    status:0,
    etap:1,
    info:"",
    tytul:"",
    indeks: 1,
  },

  {
    id: 2,
    zamowienie_id: 1,
    produkt_id: 1,
    typ: 2,
    nazwa: "",
    ilosc_stron: null,
    kolory: "",
    format_x: null,
    format_y: null,
    papier_id: 0,
    papier_postac_id: 1,
    papier_info: "",
    // gramatura_id: 0,
    naklad: null,
    uwagi: "",
    stan:0,
    status:0,
    etap:1,
    info:"",
    tytul:"",
    indeks: 2,
  },
];

const initialFragmenty = [
  {
    id: 1,
    zamowienie_id: 1,
    produkt_id: 1,
    element_id: 1,
    oprawa_id: 1,
    naklad: null,
    ilosc_stron: null,
    wersja: "",
    typ: 1,
    info: "",
    indeks: 0,
  },
  {
    id: 2,
    zamowienie_id: 1,
    produkt_id: 1,
    element_id: 2,
    oprawa_id: 1,
    naklad: null,
    ilosc_stron: null,
    wersja: "",
    typ: 2,
    info: "",
    indeks: 1,
  },
];

const initialOprawa = [
  {
    id: 1,
    zamowienie_id: 1,
    produkt_id: 1,
    oprawa: 1,
    bok_oprawy: "",
    naklad: null,
    uwagi: "",
    wersja: "",
    data_spedycji: null,
    data_czystodrukow:null,
    indeks: 0,
  },
];

const initalPakowanie = [
  {
    id: 1,
    zamowienie_id: 1,
    produkt_id: 1,
    nazwa: "Adres...",
    naklad: "",
    sztuki_w_paczce: "",
    rodzaj_pakowania: "",
    uwagi: "",
    indeks: 0,
  },
];



const initialProcesy = [
  {
    id: 1,
    zamowienie_id: 1,
    produkt_id: 1,
    element_id: 1,
    proces_id: 1,
    nazwa_id: 1,
    front_ilosc: "4",
    back_ilosc: "4",
    front_kolor: "CMYK",
    back_kolor: "CMYK",
    ilosc_uzytkow: 1,
    info: "",
    indeks: 0,
  },
  {
    id: 2,
    zamowienie_id: 1,
    produkt_id: 1,
    element_id: 2,
    proces_id: 1,
    nazwa_id: 1,
    // proces_nazwa: 2,
    // proces_typ: 1,
    front_ilosc: "4",
    back_ilosc: "4",
    front_kolor: "CMYK",
    back_kolor: "CMYK",
    ilosc_uzytkow: 1,
    info: "",
    indeks: 1,
  },
  {
    id: 3,
    zamowienie_id: 1,
    produkt_id: 1,
    element_id: 2,
    proces_id: 29,
    nazwa_id: 3,
    front_ilosc: "",
    back_ilosc: "",
    front_kolor: "",
    back_kolor: "",
    ilosc_uzytkow: 1,
    info: "",
    indeks: 2,
  },
];

const _wykonczenie = [
  {
    id: 1,
    nazwa: "matt",
  },
  {
    id: 2,
    nazwa: "gloss",
  },
  {
    id: 3,
    nazwa: "silk",
  },
  {
    id: 4,
    nazwa: "",
  }
];

const _vat = [
  {
    id: 1,
    stawka: 0,
  },
  {
    id: 2,
    stawka: 5,
  },
  {
    id: 3,
    stawka: 8,
  },
  {
    id: 4,
    stawka: 23,
  },
];

const _waluta = [
  {
    id: 1,
    nazwa: "PLN",
  },
  {
    id: 2,
    nazwa: "EUR",
  },
  {
    id: 3,
    nazwa: "USD",
  },
];


// do skasowania
const _rodzaj = [
  {
    id: 1,
    nazwa: "Szkic",
  },
  {
    id: 2,
    nazwa: "Wstępne",
  },
  {
    id: 3,
    nazwa: "Finalne",
  },
];


const _stan_technologi = [
  {
    id: 1,
    nazwa: "Wstępna",
  },
  {
    id: 2,
    nazwa: "Finalna",
  },
  {
    id: 3,
    nazwa: "Korketa",
  },
  {
    id: 4,
    nazwa: "Zakończone",
  }
];

const _status_technologi = [
  {
    id: 1,
    nazwa: "Nieaktywna",
  },
  {
    id: 2,
    nazwa: "Aktywna",
  },
  {
    id: 3,
    nazwa: "Wstrzymana",
  },
  {
    id: 4,
    nazwa: "Anulowana",
  }
];

const _stan_dokumentu = [
  {
    id: 1,
    nazwa: "Szkic",
  },
  {
    id: 2,
    nazwa: "Do przyjęcia",
  },
  {
    id: 3,
    nazwa: "Przyjęte",
  }
];

const _stan_wykonania = [
  {
    id: 1,
    nazwa: "Niedostępne",
  },
  {
    id: 2,
    nazwa: "Oczekujące",
  },
  {
    id: 3,
    nazwa: "W trakcie",
  },
  {
    id: 4,
    nazwa: "Wstrzymane",
  },
  {
    id: 5,
    nazwa: "Zakończone",
  }
];

const _status_dokumentu = [
  {
    id: 1,
    nazwa: "Nieaktywne",
  },
  {
    id:2,
    nazwa: "Aktywne",
  },
  {
    id:3,
    nazwa: "Do korekty",
  },
  {
    id: 4,
    nazwa: "Po korekcie",
  },
  {
    id: 5,
    nazwa: "Skorygowane",
  },
  {
    id: 6,
    nazwa: "Wstrzymane",
  },
  {
    id: 7,
    nazwa: "Anulowane",
  },
];

const _status_wykonania = [
  {
    id: 1,
    nazwa: "Nieaktywne",
  },
  {
    id:2,
    nazwa: "Aktywne",
  },

  {
    id: 3,
    nazwa: "Wstrzymane",
  },
  {
    id: 4,
    nazwa: "Anulowane",
  },
];
const _etapy_produkcji = [
  {
    id: 1,
    nazwa: "Harmonogram",
  },
  {
    id: 2,
    nazwa: "Nowe zamówienie",
  },
  {
    id: 3,
    nazwa: "Pliki",
  },
  {
    id: 4,
    nazwa: "Akcept",
  },
  {
    id: 5,
    nazwa: "Impozycja",
  },
  {
    id: 6,
    nazwa: "RIP",
  },  {
    id: 7,
    nazwa: "Naświetlanie",
  },  {
    id: 8,
    nazwa: "Druk",
  },  {
    id: 9,
    nazwa: "Uszlachetnianie",
  },  {
    id: 10,
    nazwa: "Falcowanie",
  },  {
    id: 11,
    nazwa: "Oprawa",
  },  {
    id: 12,
    nazwa: "Procesy dodatkowe",
  },  {
    id: 13,
    nazwa: "Pakowanie",
  },  {
    id: 14,
    nazwa: "Magazyn",
  },
    {
    id: 15,
    nazwa: "Spedycja",
  },
    {
    id: 16,
    nazwa: "Oddane",
  },
];

const _typ_produktu = [
  {
    id: 1,
    nazwa: "Magazyn",
  },
  {
    id: 2,
    nazwa: "Plakat",
  },
];
const _typ_elementu = [
  {
    id: 1,
    nazwa: "Okładka",
  },
  {
    id: 2,
    nazwa: "Środek",
  },
  ,
  {
    id: 3,
    nazwa: "Wklejka",
  },
  
  {
    id: 4,
    nazwa: "Insert",
  },
  {
    id: 5,
    nazwa: "Samolep",
  },
  {
    id: 6,
    nazwa: "Ulotka",
  },
];

const _fsc = [
  {
    id: 1,
    nazwa: "Tak",
  },
  {
    id: 2,
    nazwa: "Nie",
  },
];

const _rodzaj_oprawy = [
  {
    id: 1,
    nazwa: "HotMelt"
  },
  {
    id: 2,
    nazwa: "PUR",
  },
  {
    id: 3,
    nazwa: "Zeszyt",
  },
  {
    id: 4,
    nazwa: "Szyto klejona",
  },
  {
    id: 5,
    nazwa: "Kompletowanie",
  }

]




export {
  reg_int,
  reg_txt,
  reg_cena,
  initialProdukty,
  initialElementy,
  initialFragmenty,
  initialOprawa,
  initalPakowanie,
  initialProcesy,

  _status_dokumentu,
  _stan_dokumentu,
  _status_wykonania,
  _stan_wykonania,
  _etapy_produkcji,
  _typ_produktu,
  _typ_elementu,
  _rodzaj,
  _vat,
  _fsc,
  _waluta,
  initialDane,
  initialPreOrder,
  _rodzaj_oprawy,
  _wykonczenie,
  _stan_technologi,
  _status_technologi

};
