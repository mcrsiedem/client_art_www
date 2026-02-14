import { useEffect,createContext,useState, useCallback ,useRef} from "react";
import { getUsers } from "../actions/getUsers";
import { getClients } from "../actions/getClients";
import { getProcesList } from 'actions/getProcesList';
import { getProductType } from "actions/getProductType";
import { getProcesListName } from "actions/getProcesListName";
import { getProcesory } from "actions/getProcesory";
import { getNadkomplety } from "actions/getNadkomplety";
import { _wykonczenie } from "utils/initialvalue";
import axios from "axios";
import { IP } from "utils/Host";

export const AppContext = createContext();
export const AppContextProvider = ({children})=>{
   

    const [idZamowieniaDiag, setIdZamowieniaDiag] = useState(127);
    const [isLoading, setIsLoading] = useState(false);
    const [restart, setRestart] = useState(false);

    const [valueZamowieniaWyszukiwarka, setValueZamowieniaWyszukiwarka] = useState('');
    const [sortowanieZamowieniaEtap, setSortowanieZamowieniaEtap] = useState(0);
    const [sortowanieZamowieniaFaktury, setSortowanieZamowieniaFaktury] = useState("Gotowe do faktury");
    const sortowanieZamowienia = useRef('rok, nr asc');  //  
    const zestawZamowienia = useRef('Bieżące');  //  ["biezace","wydrukowane","sfalcowane","oprawione","oddane","wszystkie"]
    const zestawFaktury = useRef('Gotowe do faktury');  //  []]

   
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
    const [realizacjeZestawienie, setRealizacjeZestawienie] = useState([]); 
    const [realizacjeZestawienieWyszukiwarka, setRealizacjeZestawienieWyszukiwarka] = useState([]); 
    const [realizacjeZestawienieGrupy, setRealizacjeZestawienieGrupy] = useState([]); 
    const [realizacjeZestawienieProcesory, setRealizacjeZestawienieProcesory] = useState([]); 
    const [realizacjeZestawienieKlienci, setRealizacjeZestawienieKlienci] = useState([]); 

    const [zamowienia, setZamowienia] = useState([]); 
    const [zamowieniaInfo, setZamowieniaInfo] = useState(); 
    const [zamowieniaPliki, setZamowieniaPliki] = useState([]); 
    const [zamowieniaWyszukiwarka, setZamowieniaWyszukiwarka] = useState([]); 
    const [listaPapierow, setListaPapierow] = useState();
    const [nadkomplety, setNadkomplety] = useState();
    const [oddaniaGrupy, setOddaniaGrupy] = useState();
    const [oddaniaGrupyWyszukiwarka, setOddaniaGrupyWyszukiwarka] = useState();
    const [oddaniaWykonania, setOddaniaWykonania] = useState([]);
    const [pokazUzytkownikowOnline, setPokazUzytkownikowOnline] = useState(null);



    const [sortowanieOddania,setSortowanieOddania] = useState("data");
            const [widokOddan, setWidokOddan] = useState(1);
    
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
    const [kalendarz, setKalendarz] = useState([]);
    const [kalendarzDane, setKalendarzDane] = useState([]);

    const [wykonczenieEdit, setWykonczenieEdit] = useState(_wykonczenie);
    const [procesory, setProcesory] = useState();
    const [mobile, setMobile] = useState(false);
    const [showZamowieniaInfo, setShowZamowieniaInfo] = useState(false);
      const [isBtnZapiszPapierDisabled, setBtnZapiszPapierDisabled] = useState(true);
const tableZamowienia = useRef();
//d
    const [rowSelected, setRowSelected] = useState(null); 

  const [showTabsRealizacje, setShowTabsRealizacje] = useState({grupy:false,maszyny:false,osoby:true,prace:false,klienci:false});


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

const nazwaStatusuWykonania = (id) => {
return _status_wykonania.filter(x=> x.id ==id)[0].nazwa
}

  async function fechOddaniaGrupy(widok) {

    await axios.get(IP + "oddania_grupy/"+widok+"/"+ sessionStorage.getItem("token")).then((res)=>{
      // console.log(res.data)
      setOddaniaGrupy(res.data)
      setOddaniaGrupyWyszukiwarka(res.data)
    
      return res
    }).then((res) =>{
      
      setOddaniaGrupy(prev=>{return prev})
      setOddaniaGrupyWyszukiwarka(prev=>{return prev})
      
    });
    

  }


    async function fechOddaniaWykonania(grupa_global_id) {

    await axios.get(IP + "oddania_wykonania/"+grupa_global_id+"/"+ sessionStorage.getItem("token")).then((res)=>{
      // console.log(res.data)
      setOddaniaWykonania(res.data)
  

      return res
    }).then((res) =>{
      
      setOddaniaWykonania(prev=>{return prev})

      
    });
    

  }



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
                  restart, setRestart,
             idZamowieniaDiag, setIdZamowieniaDiag,
                  isLoading, setIsLoading, 
                  sortowanieZamowieniaEtap, setSortowanieZamowieniaEtap,
                  sortowanieZamowienia,
                  zestawZamowienia,zestawFaktury,
                  realizacjeZestawienieGrupy, setRealizacjeZestawienieGrupy,
                  realizacjeZestawienieProcesory, setRealizacjeZestawienieProcesory,
                  realizacjeZestawienieKlienci, setRealizacjeZestawienieKlienci,
                  realizacjeZestawienie, setRealizacjeZestawienie,realizacjeZestawienieWyszukiwarka, setRealizacjeZestawienieWyszukiwarka,
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
                    uzytkownicyGrupy, setUzytkownicyGrupy,zamowieniaPliki, setZamowieniaPliki,_status_wykonania_przerwy,
                    showZamowieniaInfo, setShowZamowieniaInfo,zamowieniaInfo, setZamowieniaInfo,tableZamowienia,nazwaStatusuWykonania,
                    kalendarz, setKalendarz,kalendarzDane, setKalendarzDane,
                    _status_faktury,_sortowanieZamowienieFaktury,sortowanieZamowieniaFaktury, setSortowanieZamowieniaFaktury,
                    valueZamowieniaWyszukiwarka, setValueZamowieniaWyszukiwarka,
                    oddaniaGrupy, setOddaniaGrupy,fechOddaniaGrupy,sortowanieOddania,setSortowanieOddania,_status_oddania,widokOddan, setWidokOddan,
                    oddaniaGrupyWyszukiwarka, setOddaniaGrupyWyszukiwarka,oddaniaWykonania, setOddaniaWykonania,fechOddaniaWykonania,
                    pokazUzytkownikowOnline, setPokazUzytkownikowOnline,
                    showTabsRealizacje, setShowTabsRealizacje,
               
              
          
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
      id:0,
      nazwa: "Bieżące",
    },
            {
      id:1,
      nazwa: "Przed drukiem",
    },
    {
      id: 2,
      nazwa: "Harmonogram",
    },
    {
      id: 3,
      nazwa: "Wydrukowane",
    },
    {
      id: 4,
      nazwa: "Sfalcowane",
    },
    
    {
      id: 5,
      nazwa: "Oprawione",
    },
    
    {
      id: 6,
      nazwa: "Oddane",
    },

        {
      id: 7,
      nazwa: "Anulowane",
    },
    {
      id: 8,
      nazwa: "Wszystkie",
    }
  ,
    {
      id: 9,
      nazwa: "Proofy",
    },
  ];


  const _sortowanieZamowienieFaktury = [

    {
      id: 1,
      nazwa: "Wszystkie",
    },

    {
      id: 2,
      nazwa: "Oddane",
    },
        {
      id: 3,
      nazwa: "Gotowe do faktury",
    },
    
        {
      id: 4,
      nazwa: "Zafakturowane",
    },
    {
      id: 5,
      nazwa: "Brak faktury",
    },
        {
      id: 6,
      nazwa: "Proofy",
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

 const _status_faktury = [

    {
      id: 1,
      nazwa: "Brak",
    },
    {
      id: 2,
      nazwa: "W trakcie",
    },
  {
      id: 3,
      nazwa: "Zafakturowane",
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

  const _status_oddania = [
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
      nazwa: "Oddane"
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