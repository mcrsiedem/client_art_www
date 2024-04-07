

const _firma = [
  {
    id: 1,
    nazwa: "ArtDruk",
    nIP: "123-111-22-33",
  },
  {
    id: 2,
    nazwa: "PrintStudio",
    nIP: "123-111-22-33"
  },
  {
    id: 3,
    nazwa: "ArtDruk Sp. z o.o.",
    nIP: "123-111-22-33"
  }
  
];

const _klient = [
  {
    id: 1,
    firma: "DESA SDA",
    user_id: "1",
    nIP: "123-111-22-33",
    data_dodania: "2023-10-20",
    opiekun_user_id: "Katalog",
  },
  {
    id: 2,
    firma: "Nowa Era",
    user_id: "1",
    nIP: "123-111-22-33",
    data_dodania: "2023-10-20",
    opiekun_user_id: "Katalog",
  },
  
];

const _opiekun = [
  {
    id: 1,
    imie: "Maciej",
    nazwisko: "Romiszewski",
    login: "Maciek",
    haslo: "mcr",
    dostep: "7"
  },
  {
    id: 2,
    imie: "Piotr",
    nazwisko: "Hołowicz",
    login: "Piotr",
    haslo: "p",
    dostep: "7"
  },
  
];

const initialProdukty = [
  {
    id: 1,
    zamowienie_id: 1,
    typ: 1,
    nazwa: "Nazwa produktu",
    wersja: "",
    ilosc_stron: "",
    format_x: "",
    format_y: "",
    oprawa: "PUR",
    naklad: "1000",
    indeks: 0,
    uwagi: "uwagi do produktu",
  },
  {
    id: 2,
    zamowienie_id: 1,
    typ: 1,
    nazwa: "Nazwa produktu",
    wersja: "",
    ilosc_stron: "",
    format_x: "",
    format_y: "",
    oprawa: "PUR",
    naklad: "1000",
    indeks: 0,
    uwagi: "uwagi do produktu",
  },
  

  
  
];

const initialElementy = [
  
  {
    id: 1,
    zamowienie_id: 1,
    produkt_id: 1,
    typ: 1,
    nazwa: "",
    ilosc_stron: "4",
    kolory: "CMYK PANTONE 666 / CMYK PANTONE 666 ",
    format_x: "210",
    format_y: "297",
    papier_id: 7,
    papier_info:"",
    gramatura_id: 0,
    naklad: "1000",
    uwagi:"uwagi",

    indeks: 1

  },

  
  {
    id: 2,
    zamowienie_id: 1,
    produkt_id: 1,
    typ: 2,
    nazwa: "",
    ilosc_stron: "80",
    kolory: "CMYK + CMYK",
    format_x: "210",
    format_y: "297",
    papier_id: 7,
    papier_info:"",
    gramatura_id: 0,
    naklad: "1000",
    uwagi:"uwagis",
    indeks: 2
  },

  
];

const initialFragmenty=[
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
    indeks: 0
  },
  {
    id: 2,
    zamowienie_id: 1,
    produkt_id: 1,
    element_id: 2, 
    oprawa_id:1,
    naklad: "1000",
    ilosc_stron: "80",
    wersja: " ",
    typ: 2,
    info: " ",
    indeks: 1
  }

  
]



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

];

const initialProcesy = [
  {
    id: 1,
    zamowienie_id: 1,
    produkt_id: 1,
    element_id: 1, 
    proces_id: 2, 
    proces_nazwa: "Druk",
    proces_typ: "farba",
    front:"CMYK",
    back:"CMYK",
    info:""

  },{
    id: 2,
    zamowienie_id: 1,
    produkt_id: 1,
    element_id: 1, 
    proces_id: 2, 
    proces_nazwa: "Uszlachetnienie",
    proces_typ: "lakier",
    front:"",
    back:"",
    info:""

  }
  ,{
    id: 3,
    zamowienie_id: 1,
    produkt_id: 1,
    element_id: 1, 
    proces_id: 2, 
    proces_nazwa: "Druk",
    front:"",
    back:"",
    info:""
    

  }


];


const _wykonczenie = [
  {
    id: 1,
    nazwa: "MAT"

  },{
    id: 2,
    nazwa: "GLOSS",


  }
]

const _vat = [
  {
    id: 1,
    stawka: 0
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
  }
]

const _waluta = [
  {
    id: 1,
    nazwa: "PLN"
  },
  {
    id: 2,
    nazwa: "EUR",
  },
  {
    id: 3,
    nazwa: "USD",
  }
]


const _rodzaj = [
  {
    id: 1,
    nazwa: "Szkic"

  },
  {
    id: 2,
    nazwa: "Wstępne",
  },
  {
    id: 3,
    nazwa: "Finalne",
  }
]

const _status = [
  {
    id: 1,
    nazwa: "Edycja"

  },{
    id: 2,
    nazwa: "Do weryfikacji",
  },{
    id: 3,
    nazwa: "Zweryfikowane",
  },{
    id: 4,
    nazwa: "Do korekty",
  },{
    id: 5,
    nazwa: "Do wyjaśnienia",
  }
]

const _stan = [
  {
    id: 1,
    nazwa: "Aktywne"

  },{
    id: 2,
    nazwa: "Nieaktywne",
  },{
    id: 3,
    nazwa: "Anulowane",
  },{
    id: 4,
    nazwa: "Wstrzymane",
  },{
    id: 5,
    nazwa: "Oddane",
  },{
    id: 6,
    nazwa: "Zwrócone",
  }



]

const _fsc = [
  {
    id: 1,
    nazwa: "Tak"

  },{
    id: 2,
    nazwa: "Nie",
  },



]

const _typ_produktu = [
  {
    id: 1,
    nazwa: "Magazyn"

  },{
    id: 2,
    nazwa: "Plakat",
  }
]
const _typ_elementu = [
  {
    id: 1,
    nazwa: "Okładka"

  },{
    id: 2,
    nazwa: "Środek",
  },
  ,{
    id: 3,
    nazwa: "Wklejka",
  },
  ,{
    id: 4,
    nazwa: "Insert",
  }  ,{
    id: 5,
    nazwa: "Ulotka",
  }
]

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

// const _uszlachetnienia = [
//   {
//     id: 1,
//     nazwa: "UV"
//   },{
//     id: 2,
//     nazwa: "Dyspersja",
//   }
//   ,{
//     id: 3,
//     nazwa: "Folia mat",
//   }
// ]


export {_firma,initialProdukty,_klient,initialElementy,_papiery,_rodzaj_oprawy,initialFragmenty,initialProcesy,_opiekun,_status,_stan,_typ_produktu,_typ_elementu,_rodzaj,_vat,_waluta, _fsc};