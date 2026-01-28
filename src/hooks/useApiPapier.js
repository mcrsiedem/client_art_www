
import { IP } from "utils/Host";
import axios from "axios";
import { useState,useEffect, useContext  } from "react";
import { AppContext } from "context/AppContext";
import { ModalInsertContext } from "context/ModalInsertContext";
export   function useApiPapier() {


      const appcontext = useContext(AppContext);
      const modalcontext = useContext(ModalInsertContext);
  
      const setListaPapierowWyszukiwarka = appcontext.setListaPapierowWyszukiwarka;
      const setListaPapierow = appcontext.setListaPapierow;
      const setListaPapierowNazwy = appcontext.setListaPapierowNazwy;
      const setListaPapierowNazwyWyszukiwarka = appcontext.setListaPapierowNazwyWyszukiwarka;
      const setListaPapierowGrupa = appcontext.setListaPapierowGrupa;
      const setListaPapierowGrupaWyszukiwarka = appcontext.setListaPapierowGrupaWyszukiwarka;
  
      const setListaPapierowPostac = appcontext.setListaPapierowPostac;
      const setListaPapierowPostacWyszukiwarka = appcontext.setListaPapierowPostacWyszukiwarka;
      const setListaPapierowRodzaj = appcontext.setListaPapierowRodzaj;
      const setListaPapierowRodzajWyszukiwarka = appcontext.setListaPapierowRodzajWyszukiwarka;
      const setListaPapierowWykonczenia = appcontext.setListaPapierowWykonczenia;
      const setListaPapierowWykonczeniaWyszukiwarka = appcontext.setListaPapierowWykonczeniaWyszukiwarka;
      const setListaPapierowPowleczenie = appcontext.setListaPapierowPowleczenie;
      const setListaPapierowPowleczenieWyszukiwarka = appcontext.setListaPapierowPowleczenieWyszukiwarka;
  
      const callForPaper = async () =>{
        
        const res = await axios.get(IP + "papiery-parametry/" + sessionStorage.getItem("token"));

        setListaPapierow(res.data[0].map(x => {return {...x, typ_row: 1, delete:false}}  )  );
        setListaPapierowWyszukiwarka(res.data[0].map(x => {return {...x, typ_row: 1, delete:false}}  )  );
    
        setListaPapierowNazwy(res.data[1].map(x => {return {...x, isExpand:false, typ_row: 2, delete:false}}  ));
        setListaPapierowNazwyWyszukiwarka(res.data[1].map(x => {return {...x, isExpand:false, typ_row: 2, delete:false}}  ));
    
        setListaPapierowGrupa(res.data[2].map(x => {return {...x, isExpand:false, typ_row: 3, delete:false}}  ));
        setListaPapierowGrupaWyszukiwarka(res.data[2].map(x => {return {...x, isExpand:false, typ_row: 3, delete:false}}  ));
    
        setListaPapierowPostac(res.data[3]);
        setListaPapierowPostacWyszukiwarka(res.data[3]);
    
        setListaPapierowRodzaj(res.data[4]);
        setListaPapierowRodzajWyszukiwarka(res.data[4]);
        
        setListaPapierowWykonczenia(res.data[5]);
        setListaPapierowWykonczeniaWyszukiwarka(res.data[5]);
    
        setListaPapierowPowleczenie(res.data[6]);
        setListaPapierowPowleczenieWyszukiwarka(res.data[6]);
    // console.log("api papi")
      }




    return [callForPaper];
  }