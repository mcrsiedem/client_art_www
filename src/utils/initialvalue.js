import { today } from "actions/today";
import { todayPlusDni } from "actions/todayPlusDni";
import DecodeToken from "pages/Login/DecodeToken";

const reg_txt = /^[a-zA-Z0-9_+\sąćęłńóśźżĄĘŁŃÓŚŹŻ]+$/;
const reg_int = /^[0-9]+$/;
const reg_cena = /^\d{0,6}(?:\,\d{0,2}){0,1}$/;


const _opiekun = [
  {
    id: 1,
    imie: "Maciej",
    nazwisko: "Romiszewski",
    login: "Maciek",
    haslo: "mcr",
    dostep: "7",
  },
  {
    id: 2,
    imie: "Piotr",
    nazwisko: "Hołowicz",
    login: "Piotr",
    haslo: "p",
    dostep: "7",
  },
];

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
  rok: "2024",
  firma_id: 0,
  klient_id: 0,
  opiekun_id:  0,
  tytul: "Tytuł zamówienia",
  data_przyjecia: today(),
  data_materialow: today(),
  data_spedycji: todayPlusDni(5),
  stan: 0,
  status: 0,
  rodzaj: 1,
  uwagi: "",
  cena: "",
  waluta_id: 1,
  termin_platnosci: 30,
  vat_id: 4,
  przedplata: "",
  fsc: 2,
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
    naklad: "",
    stan:1,
    status:1,
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
    ilosc_stron: "",
    kolory: "",
    format_x: "210",
    format_y: "297",
    papier_id: 0,
    papier_info: "",
    gramatura_id: 0,
    naklad: "1000",
    uwagi: "",

    indeks: 1,
  },

  {
    id: 2,
    zamowienie_id: 1,
    produkt_id: 1,
    typ: 2,
    nazwa: "",
    ilosc_stron: "80",
    kolory: "",
    format_x: "210",
    format_y: "297",
    papier_id: 0,
    papier_info: "",
    gramatura_id: 0,
    naklad: "1000",
    uwagi: "",
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
    naklad: "1000",
    ilosc_stron: "4",
    wersja: " ",
    typ: 1,
    info: " ",
    indeks: 0,
  },
  {
    id: 2,
    zamowienie_id: 1,
    produkt_id: 1,
    element_id: 2,
    oprawa_id: 1,
    naklad: "1000",
    ilosc_stron: "80",
    wersja: " ",
    typ: 2,
    info: " ",
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
    naklad: "500",
    uwagi: "",
    wersja: "",
    data_spedycji: today(),
    data_czystodrukow: today(),
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

const _papiery = [
  {
    id: 1,
    nazwa: "Kreda",
    wykonczenie: "Mat",
    gramatura: "90",
  },
  {
    id: 2,
    nazwa: "Offset",
    wykonczenie: "-",
    gramatura: "150",
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
    proces_nazwa: 2,
    proces_typ: 1,
    front_ilosc: "4",
    back_ilosc: "4",
    front_kolor: "CMYK",
    back_kolor: "CMYK",
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
    proces_nazwa: 2,
    proces_typ: 1,
    front_ilosc: "4",
    back_ilosc: "4",
    front_kolor: "CMYK",
    back_kolor: "CMYK",
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
    proces_nazwa: 29,
    proces_typ: 29,
    front_ilosc: "",
    back_ilosc: "",
    front_kolor: "",
    back_kolor: "",
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

const _status = [
  {
    id: 1,
    nazwa: "Edycja",
  },
  {
    id: 2,
    nazwa: "Do weryfikacji",
  },
  {
    id: 3,
    nazwa: "Zweryfikowane",
  },
  {
    id: 4,
    nazwa: "Do korekty",
  },
  {
    id: 5,
    nazwa: "Do wyjaśnienia",
  },
];

const _stan = [
  {
    id: 1,
    nazwa: "Aktywne",
  },
  {
    id: 2,
    nazwa: "Nieaktywne",
  },
  {
    id: 3,
    nazwa: "Anulowane",
  },
  {
    id: 4,
    nazwa: "Wstrzymane",
  },
  {
    id: 5,
    nazwa: "Oddane",
  },
  {
    id: 6,
    nazwa: "Zwrócone",
  },
];

const _etap = [
  {
    id: 0,
    nazwa: "Szkic",
  },
  {
    id: 1,
    nazwa: "Wstępne",
  },
  {
    id: 2,
    nazwa: "Zamówienie",
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
    nazwa: "Drukowanie",
  },  {
    id: 9,
    nazwa: "Uszlachetnianie",
  },  {
    id: 10,
    nazwa: "Falcowanie",
  },  {
    id: 11,
    nazwa: "Kompl;etowanie",
  },  {
    id: 12,
    nazwa: "Oprawa",
  },  {
    id: 13,
    nazwa: "Pakowanie",
  },  {
    id: 14,
    nazwa: "Spedycja",
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
  ,
  {
    id: 4,
    nazwa: "Insert",
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
  // _firma,
  initialProdukty,
  // _klient,
  initialElementy,
  _papiery,
  // _rodzaj_oprawy,
  initialFragmenty,
  initialOprawa,
  initalPakowanie,
  initialProcesy,
  _opiekun,
  _status,
  _stan,
  _etap,
  _typ_produktu,
  _typ_elementu,
  _rodzaj,
  _vat,
  _fsc,
  _waluta,
  initialDane,
  initialPreOrder,
  _rodzaj_oprawy,
  _wykonczenie

};
