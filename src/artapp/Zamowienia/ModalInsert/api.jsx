

const _firma = [
  {
    id: 1,
    nazwa: "ArtDruk",
    nip: "123-111-22-33",
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
    typ: "Magazyn",
    tytul: "Tytul 1",
    wersja: "",
    ilosc_stron: "84",
    format_x: "210",
    format_y: "297",
    oprawa: "PUR",
    naklad: "1000",
    index: 0
  },
  // {
  //   id: 2,
  //   zamowienie_id: 1,
  //   typ: "Magazyn",
  //   tytul: "Tytul 2",
  //   wersja: "",
  //   ilosc_stron: "84",
  //   format_x: "210",
  //   format_y: "297",
  //   oprawa: "PUR",
  //   naklad: "1000",
  //   index: 1
  // }
  
  
];

const initialElementy = [
  
  {
    id: 1,
    zamowienie_id: 1,
    produkt_id: 1,
    typ: "Okładka",
    nazwa: "PL",
    ilosc_stron: "4",
    kolory: "CMYK PANTONE 666 / CMYK PANTONE 666 ",
    format_x: "210",
    format_y: "297",
    papier_id: 7,
    papier_info:"",
    gramatura_id: 0,
    naklad: "1000",

    index: 0
  },
  {
    id: 2,
    zamowienie_id: 1,
    produkt_id: 1,
    typ: "Środek",
    nazwa: "PL",
    ilosc_stron: "80",
    kolory: "CMYK + CMYK",
    format_x: "210",
    format_y: "297",
    papier_id: 7,
    papier_info:"",
    gramatura_id: 0,
    naklad: "1000",

    index: 1
  },
  // {
  //   id: 3,
  //   zamowienie_id: 1,
  //   produkt_id: 2,
  //   typ: "Okładka",
  //   nazwa: "PL",
  //   ilosc_stron: "4",
  //   kolory: "CMYK + CMYK",
   
  //   format_x: "210",
  //   format_y: "297",
  //   papier_id: 7,
  //   papier_info:"",
  //   gramatura_id: 0,
  //   naklad: "1000",

  //   index: 2
  // },
  // {
  //   id: 4,
  //   zamowienie_id: 1,
  //   produkt_id: 2,
  //   typ: "Środek",
  //   nazwa: "PL",
  //   ilosc_stron: "80",
  //   kolor_front: "4",
  //   kolor_back: "4",
  //   kolory: "CMYK + CMYK",
  //   format_x: "210",
  //   format_y: "297",
  //   papier_id: 7,
  //   papier_info:"",
  //   gramatura_id: 0,
  //   naklad: "1000",

  //   index: 3
  // }

  
];

const initialFragmenty=[
  {
    id: 1,
    zamowienie_id: 1,
    produkt_id: 1,
    element_id: 1, 
    naklad: "1000",
    info:"",
    index:0
  },
  {
    id: 2,
    zamowienie_id: 1,
    produkt_id: 1,
    element_id: 2, 
    naklad: "1000",
    info:"",
    index:1
  },
  // {
  //   id: 3,
  //   zamowienie_id: 1,
  //   produkt_id: 2,
  //   element_id: 3, 
  //   naklad: "1000",
  //   info:"",
  //   index:2
  // },
  // {
  //   id: 4,
  //   zamowienie_id: 1,
  //   produkt_id: 2,
  //   element_id: 4, 
  //   naklad: "1000",
  //   info:"",
  //   index:3
  // },
  // {
  //   id: 5,
  //   zamowienie_id: 1,
  //   produkt_id: 2,
  //   element_id: 3, 
  //   naklad: "1000",
  //   info:"",
  //   index:4
  // }

  
]

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
  },
  {
    id: 2,
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

const _status = [
  {
    id: 1,
    nazwa: "Wstępne"

  },{
    id: 2,
    nazwa: "Do weryfikacji",
  }
]

const _stan = [
  {
    id: 1,
    nazwa: "Aktywne"

  },{
    id: 2,
    nazwa: "Nieaktywne",
  }
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
  const _oprawa = [
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


export {_firma,initialProdukty,_klient,_zestawy,initialElementy,_papiery,_oprawa,initialFragmenty,initialProcesy,_opiekun,_status,_stan,_typ_produktu};