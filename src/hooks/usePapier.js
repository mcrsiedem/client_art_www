
import { IP } from "utils/Host";
import axios from "axios";
import { useState,useEffect, useContext  } from "react";
import { AppContext } from "context/AppContext";
import { ModalInsertContext } from "context/ModalInsertContext";
export  async function usePapier() {


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
  
      const res = await axios.get(IP + "lista-papierow/" + sessionStorage.getItem("token"));
      setListaPapierow([...res.data].map(x => {return {...x, typ_row: 1}}  )  );
      setListaPapierowWyszukiwarka([...res.data].map(x => {return {...x, typ_row: 1}}  )  );
  
      const res2 = await axios.get(IP + "lista-papierow-nazwy/" + sessionStorage.getItem("token"));
          setListaPapierowNazwy([...res2.data].map(x => {return {...x, isExpand:false, typ_row: 2}}  ));
      setListaPapierowNazwyWyszukiwarka([...res2.data].map(x => {return {...x, isExpand:false, typ_row: 2}}  ));
  
  
      const res3 = await axios.get(IP + "lista-papierow-grupa/" + sessionStorage.getItem("token"));
      setListaPapierowGrupa([...res3.data].map(x => {return {...x, isExpand:false, typ_row: 3}}  ));
      setListaPapierowGrupaWyszukiwarka([...res3.data].map(x => {return {...x, isExpand:false, typ_row: 3}}  ));
  
      const res4 = await axios.get(IP + "lista-papierow-postac/" + sessionStorage.getItem("token"));
      setListaPapierowPostac([...res4.data]);
      setListaPapierowPostacWyszukiwarka([...res4.data]);
  
      const res5 = await axios.get(IP + "lista-papierow-rodzaj/" + sessionStorage.getItem("token"));
      setListaPapierowRodzaj([...res5.data]);
      setListaPapierowRodzajWyszukiwarka([...res5.data]);
      
      const res6 = await axios.get(IP + "lista-papierow-wykonczenia/" + sessionStorage.getItem("token"));
      setListaPapierowWykonczenia([...res6.data]);
      setListaPapierowWykonczeniaWyszukiwarka([...res6.data]);
  
      const res7 = await axios.get(IP + "lista-papierow-powleczenie/" + sessionStorage.getItem("token"));
      setListaPapierowPowleczenie([...res7.data]);
      setListaPapierowPowleczenieWyszukiwarka([...res7.data]);
  



    return true;
  }