import { useEffect,createContext,useState, useCallback ,useRef} from "react";
import { getUsers } from "../actions/getUsers";
import { getClients } from "../actions/getClients";
import { getProcesList } from 'actions/getProcesList';
import { getProductType } from "actions/getProductType";
import { getProcesListName } from "actions/getProcesListName";
import { getProcesory } from "actions/getProcesory";
import { getNadkomplety } from "actions/getNadkomplety";
import { _wykonczenie } from "utils/initialvalue";

export const AppContext = createContext();
export const AppContextProvider = ({children})=>{

    const [sortowanieZamowieniaEtap, setSortowanieZamowieniaEtap] = useState(1);
    const [sortowanieZamowienia, setSortowanieZamowienia] = useState("nr asc");
    const [users, setUsers] = useState(null);
    const [selectedUser, setSelectedUser] = useState("0");
    const [selectedKlient, setSelectedKlient] = useState("0");
    const [clients, setClients] = useState(null);
    const [uzytkownicy, setUzytkownicy] = useState(null);
    const [uzytkownicyGrupy, setUzytkownicyGrupy] = useState(null);
    const [clientsWyszukiwarka, setClientsWyszukiwarka] = useState(null);
    const [procesList, setProcesList] = useState(null); // lista wszystkich dostępnych procesów
    const [procesListName, setProcesListName] = useState(null); // lista nazw procesów
    const [productType, setProductType] = useState(null); 
    const [zamowienia, setZamowienia] = useState([]); 
    const [zamowieniaPliki, setZamowieniaPliki] = useState([]); 
    const [zamowieniaWyszukiwarka, setZamowieniaWyszukiwarka] = useState([]); 
    const [listaPapierow, setListaPapierow] = useState();
    const [nadkomplety, setNadkomplety] = useState();

    const [lockDragDropPapier, setLockDragDropPapier] = useState(false);
    const [listaPapierowWyszukiwarka, setListaPapierowWyszukiwarka] = useState();
    const [listaPapierowNazwy, setListaPapierowNazwy] = useState();
    const [listaPapierowNazwyWyszukiwarka, setListaPapierowNazwyWyszukiwarka] = useState();
    const [listaPapierowGrupa,setListaPapierowGrupa] = useState();
    const [listaPapierowGrupaWyszukiwarka, setListaPapierowGrupaWyszukiwarka] = useState();
    const [listaPapierowPostac,setListaPapierowPostac] = useState();
    const [listaPapierowPostacWyszukiwarka, setListaPapierowPostacWyszukiwarka] = useState();
    const [listaPapierowRodzaj,setListaPapierowRodzaj] = useState();
    const [listaPapierowRodzajWyszukiwarka, setListaPapierowRodzajWyszukiwarka] = useState();
    const [listaPapierowWykonczenia,setListaPapierowWykonczenia] = useState();
    const [listaPapierowWykonczeniaWyszukiwarka, setListaPapierowWykonczeniaWyszukiwarka] = useState();

    const [listaPapierowPowleczenieWyszukiwarka,setListaPapierowPowleczenieWyszukiwarka] = useState();
    const [listaPapierowPowleczenie, setListaPapierowPowleczenie] = useState();

    const [wykonczenieEdit, setWykonczenieEdit] = useState(_wykonczenie);
    const [procesory, setProcesory] = useState();
    const [mobile, setMobile] = useState(false);
      const [isBtnZapiszPapierDisabled, setBtnZapiszPapierDisabled] = useState(true);

//d
    const [rowSelected, setRowSelected] = useState(null); 

    const updateProcesList = useCallback(()=>{
        getProcesList(setProcesList) 
       },[])

    const updateClients = useCallback(()=>{
     getClients(setClients,setClientsWyszukiwarka)
    },[])

    const updateUsers = useCallback(()=>{
        getUsers(setUsers)
       },[])

       const showMeProcessName = (id) =>{

        return  procesListName?.filter(pln => pln.id == id)[0].nazwa
       }


  // const effectRan = useRef(false);
  // useEffect(() => {
  //   if (effectRan.current === true) {
      
  //       getUsers(setUsers) 
  //       getProcesList(setProcesList) // lista wszystkich dostępnych procesów
  //       getBindingType(setBindingTyp)
  //       getProductType(setProductType)
  //       getProcesListName(setProcesListName)
  //       getProcesory(setProcesory)
  //   }
  //   return () => {
  //     effectRan.current = true;
  //   };
  // }, []);

    useEffect(()=>{
      console.log("app context22")
        getUsers(setUsers) 
       
        getProcesList(setProcesList) 
        // getBindingType(setBindingTyp)
        getProductType(setProductType)
        getProcesListName(setProcesListName)
        getProcesory(setProcesory)
       

    },[])
    
    return  <AppContext.Provider 
                value={{
                  sortowanieZamowieniaEtap, setSortowanieZamowieniaEtap,
                  sortowanieZamowienia, setSortowanieZamowienia,
                  zamowienia, setZamowienia,
                  zamowieniaWyszukiwarka, setZamowieniaWyszukiwarka,
                    users,updateUsers,          // wszystcy uzytkownicy
                    selectedUser, setSelectedUser,
                    selectedKlient, setSelectedKlient,
                    clients,updateClients,  setClients,    // wszyscy klienci
                    clientsWyszukiwarka, setClientsWyszukiwarka,
                    procesList, updateProcesList,     // lista wszystkich dostępnych proce
                    procesListName,
                    productType,
                   
                    rowSelected, setRowSelected, // druk
                    _sortowanieZamowienieEtap,
                    _firma,typ_elementu,_status_koszty_dodatkowe,
                    showMeProcessName,
                    listaPapierow, setListaPapierow,
                    listaPapierowNazwy, setListaPapierowNazwy,
                    listaPapierowNazwyWyszukiwarka, setListaPapierowNazwyWyszukiwarka,
                    listaPapierowGrupa,setListaPapierowGrupa,
                    listaPapierowGrupaWyszukiwarka, setListaPapierowGrupaWyszukiwarka,
                    listaPapierowPostac,setListaPapierowPostac,listaPapierowPostacWyszukiwarka, setListaPapierowPostacWyszukiwarka,
                    listaPapierowRodzaj,setListaPapierowRodzaj,listaPapierowRodzajWyszukiwarka, setListaPapierowRodzajWyszukiwarka,
                    listaPapierowWykonczenia,setListaPapierowWykonczenia,listaPapierowWykonczeniaWyszukiwarka, setListaPapierowWykonczeniaWyszukiwarka,
                    listaPapierowPowleczenie, setListaPapierowPowleczenie,listaPapierowPowleczenieWyszukiwarka,setListaPapierowPowleczenieWyszukiwarka,
                    lockDragDropPapier, setLockDragDropPapier,
                    procesory,mnozniki, _status_wykonania,_stan_wykonania, setProcesory,
                    listaPapierowWyszukiwarka, setListaPapierowWyszukiwarka,
                    isBtnZapiszPapierDisabled, setBtnZapiszPapierDisabled,
                    mobile, setMobile,setNadkomplety,nadkomplety,wykonczenieEdit,
                    uzytkownicy, setUzytkownicy,
                    uzytkownicyGrupy, setUzytkownicyGrupy,zamowieniaPliki, setZamowieniaPliki,_status_wykonania_przerwy
                }}
            >
                {children}
            </AppContext.Provider>
}


const _firma = [
    {
      id: 1,
      nazwa: "ArtDruk",
      nazwa_skrocona: "ArtDruk",
      NIP: "123-111-22-33",
    },
    {
      id: 2,
      nazwa: "ArtDruk Sp. z o.o.",
      nazwa_skrocona: "ArtDruk Sp.",
      NIP: "123-111-22-33",
    },
  ];

  const _sortowanieZamowienieEtap = [

    {
      id: 1,
      nazwa: "Zamówienia",
    },
    {
      id: 2,
      nazwa: "Harmonogram",
    },
    {
      id: 3,
      nazwa: "Wszystkie",
    },
  ];

const typ_elementu=[
    {
      id: 1,
      nazwa: "Okładka",
      skrot: "OKŁ",
    },
    {
      id: 2,
      nazwa: "Środek",
      skrot: "SRD",
    },
    ,
    {
      id: 3,
      nazwa: "Wklejka",
      skrot: "WKL",
    },
    ,
    {
      id: 4,
      nazwa: "Insert",
      skrot: "INS",
    },
    {
      id: 5,
      nazwa: "Samoplet",
      skrot: "NAK",
    },
     {
      id: 6,
      nazwa: "Ulotka",
      skrot: "ULO",
    },
  ];
  
  const _status_koszty_dodatkowe = [

    {
      id: 1,
      nazwa: "W przygotowaniu",
    },
    {
      id: 2,
      nazwa: "Gotowe do faktury",
    },

  ];

  const _status_wykonania = [
    {
      id: 1,
      nazwa: "Niedostępne"
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
      nazwa: "Zakończone"
    },
    

  ];

    const _status_wykonania_przerwy = [
    {
      id: 1,
      nazwa: "Brak"
    },

    {
      id: 2,
      nazwa: "Akcept",
    },
    {
      id: 3,
      nazwa: "RIP",
    },
    {
      id: 4,
      nazwa: "Zakończone"
    },
    

  ];

  const _stan_wykonania = [

    {
      id: 1,
      nazwa: "Aktywne",
    },
    {
      id: 2,
      nazwa: "Wstrzymane",
    },
    {
      id: 3,
      nazwa: "Anulowane"
    },

  ];
  


 const  mnozniki = [   
   {value: 0.1,},
   {value: 0.2,},
   {value: 0.3,},
   {value: 0.4,},
   {value: 0.5,},
   {value: 0.6,},
   {value: 0.7,},
   {value: 0.8,},
   {value: 0.9,},
   {value: 1.0,},
   {value: 1.1,},
   {value: 1.2,},
   {value: 1.3,},
   {value: 1.4,},
   {value: 1.5,},
   {value: 1.6,},
   {value: 1.7,},
   {value: 1.8,},
   {value: 1.9,},
   {value: 2.0,},
  
  
  ]