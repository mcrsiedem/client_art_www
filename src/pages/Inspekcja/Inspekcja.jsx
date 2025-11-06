import React, { useEffect, useState,useRef,useContext,useCallback } from "react";
import axios from "axios";
import { IP } from "../../utils/Host";
import { useNavigate } from "react-router-dom";
import style from "./Inspekcja.module.css";
import { AppContext } from "context/AppContext";
import { TechnologyContext } from "context/TechnologyContext";
import { _status } from "utils/initialvalue";


import { ModalInsertContext } from "context/ModalInsertContext";
import DaneIns from "./components/dane/DaneIns";
import InspekcjaHeader from "./components/header/InspekcjaHeader";

import ProcesyElementowTechInspekcja from "./components/procesy_elementow_tech_inspekcja/ProcesyElementowTechInspekcja";
import Row from "./components/row/Row";

export default function Inspekcja( ) {
  const navigate = useNavigate();
  const modalContext = useContext(ModalInsertContext);
  const appContext = useContext(AppContext)
  const techContext = useContext(TechnologyContext);
  const fechOddaniaGrupy =appContext.fechOddaniaGrupy;
  const widokOddan =appContext.widokOddan;

  let  naglowki_produkty= [ `zamowienie_id`,`technologia_id`,`etap`, `format_x`, `format_y`, `global_id`, `id`, `ilosc_stron`, `indeks`, `naklad`, `nazwa`, `oprawa`, `stan`, `status`,  `typ`, `uwagi`]
  let  naglowki_elementy= [ `arkusz_szerokosc`, `arkusz_wysokosc`, `etap`, `format_x`, `format_y`, `global_id`, `id`, `ilosc_leg`, `ilosc_stron`, `indeks`, `lega`, `naklad`, `nazwa`, `papier_id`, `papier_info`, `papier_postac_id`, `produkt_id`, `stan`, `status`, `technologia_id`, `typ`, `typ_nazwa`, `uwagi`, `zamowienie_id`]
  let  naglowki_fragmenty= [`element_id`, `global_id`, `id`, `ilosc_stron`, `indeks`, `info`, `naklad`, `oprawa_id`, `produkt_id`, `technologia_id`, `typ`, `wersja`, `zamowienie_id`]
  let  naglowki_oprawa= [`global_id`,`bok_oprawy`, `data_czystodrukow`, `data_spedycji`,  `id`, `indeks`, `naklad`, `oprawa`, `produkt_id`, `technologia_id`, `utworzono`, `uwagi`, `wersja`, `zamowienie_id`, `zmodyfikowano`]
  let  naglowki_procesy_elementow= [`global_id`, `arkusz`, `lega`,`id`,`indeks`,`element_id`,`nazwa`,`back_ilosc`, `back_kolor`,  `front_ilosc`, `front_kolor`,  `ilosc_uzytkow`,  `info`, `infoprocesy`, `komplet`,  `mnoznik`, `naklad`, `narzad`,  `nazwa_elementu`, `nazwa_id`, `nr`, `obszar`, `predkosc`, `proces_id`, `procesor_domyslny`, `produkt`, `produkt_id`, `rodzaj`, `stan`, `status`, `status_nazwa`, `technologia_id`, `typ`, `typ_elementu`, `wykonczenie`, `zamowienie_id`]
  let  naglowki_arkusze= [`global_id`, `id`,`indeks`,`arkusz_szerokosc`, `arkusz_wysokosc`, `element_id`,  `ilosc_leg`, `ilosc_stron` , `korekta_zamowienia_alert`, `nadkomplet`, `naklad`, `nr_arkusza`, `papier_id`, `papier_postac_id`, `rodzaj_arkusza`, `technologia_id`, `typ_elementu`, `uwagi`, `zamowienie_id`]
  let  naglowki_legi= [`global_id`,`id`,`indeks`,`arkusz_id`, `element_id`,   `ilosc_stron`,  `korekta_zamowienia_alert`, `naklad`, `nr_legi`, `rodzaj_legi`, `technologia_id`, `typ_elementu`, `uwagi`, `zamowienie_id`]
  let  naglowki_legiFragmenty= [`arkusz_id`, `element_id`, `fragment_id`, `global_id`, `id`, `indeks`, `korekta_zamowienia_alert`, `lega_id`, `naklad`, `nr_legi`, `oprawa_id`, `technologia_id`, `typ`, `wersja`, `zamowienie_id`]
  let  naglowki_grupy= [`arkusz_szerokosc`, `arkusz_wysokosc`, `bulk`, `czas`, `data_spedycji`, `element_id`, `global_id`, `global_proces_id`, `gramatura`, `id`, `ilosc_narzadow`, `indeks`, `klient`, `klient_id`, `koniec`, `korekta_zamowienia_alert`, `mnoznik`, `naklad`, `narzad`, `naswietlenia`, `nazwa`, `nazwa_elementu`, `nazwa_papieru`, `nr`, `nr_stary`, `obszar_procesu`, `papier_info`, `papier_postac`, `papier_postac_id`, `poczatek`, `powleczenie`, `predkosc`, `proces_id`, `proces_nazwa_id`, `procesor_id`, `przeloty`, `rodzaj_procesu`, `rok`, `stan`, `status`, `technologia_id`, `typ_elementu`, `typ_grupy`, `typ_procesu`, `tytul`, `uwagi`, `uwagi_elementu`, `wydanie_papieru_status`, `wykonczenie`, `wykonczenie_procesu`, `zamowienia_pliki_etap`, `zamowienie_id`]
  let  naglowki_grupy_oprawa= [`bok_oprawy`, `czas`, `data_spedycji`, `global_id`, `id`, `ilosc_zbieran`, `indeks`, `klient`, `koniec`, `korekta_zamowienia_alert`, `mnoznik`, `naklad`, `narzad`, `nazwa`, `nr`, `obszar_procesu`, `oprawa_id`, `poczatek`, `predkosc`, `proces_id`, `proces_nazwa_id`, `procesor_id`, `rodzaj_procesu`, `rok`, `stan`, `status`, `technologia_id`, `typ_grupy`, `typ_procesu`, `tytul`, `uwagi`, `wersja`, `wykonczenie_procesu`, `zamowienie_id`, `zrealizowano`]
  let  naglowki_wykonania= [`arkusz_id`, `czas`, `do_wykonania`, `element_id`, `global_id`, `grupa_id`, `id`, `ilosc_uzytkow`, `indeks`, `koniec`, `lega_id`, `mnoznik`, `naklad`, `narzad`, `nazwa`, `nazwa_wykonania`, `nr_arkusza`, `papier_id`, `poczatek`, `predkosc`, `proces_id`, `proces_indeks`, `proces_nazwa_id`, `procesor_id`, `przeloty`, `stan`, `status`, `technologia_id`, `typ_elementu`, `uwagi`, `zamowienie_id`]
  let  naglowki_wykonania_oprawa= [`dodal`, `dodal_id`, `global_id`, `grupa_id`, `id`, `naklad`, `oprawa_id`, `proces_id`, `procesor_id`, `technologia_id`, `utworzono`, `zamowienie_id`]
  let  naglowki_realizacje= [`dodal`, `dodal_id`, `dzial`, `global_id`, `grupa_id`, `naklad`, `nazwa`, `proces_id`, `procesor_id`, `przeloty_wykonania`, `technologia_id`, `typ`, `utworzono`, `uwagi`, `wykonanie_global_id`, `wykonanie_id`, `zamowienie_id`, `zrealizowano`]
  let  naglowki_koszty_dodatkowe= [`cena`, `dodal`, `global_id`, `id`, `ilosc`, `indeks`, `info`, `nazwa`, `stan`, `status`, `suma`, `utworzono`, `zamowienie_id`, `zmienil`, `zmodyfikowano`]
  let  naglowki_faktury= [`cena`, `dodal`, `global_id`, `id`, `ilosc`, `indeks`, `info`, `nazwa`, `stan`, `status`, `suma`, `utworzono`, `wz`, `zamowienie_id`, `zmienil`, `zmodyfikowano`]
  let  naglowki_ksiegowosc= [`faktury_naklad`, `faktury_status`, `faktury_wartosc`, `global_id`, `info`, `koszty_status`, `koszty_wartosc`, `utworzono`, `zamowienie_id`, `zmodyfikowano`]
  let  naglowki_pliki= [`data_akceptu`, `data_otrzymania_plikow`, `data_utworzenia`, `element_id`, `etap`, `global_id`, `id`, `ilosc_stron`, `nazwa`, `produkt_id`, `stan`, `status`, `technologia_id`, `typ`, `utworzono`, `uwagi`, `zamowienie_id`, `zmodyfikowano`]
  let  naglowki_historia= [`data`, `event`, `id`, `kategoria`, `user`, `user_id`, `zamowienie_id`]
  
  async function checkToken() {

    let technologia_id;
    axios
      .get(IP + "/islogged/" + sessionStorage.getItem("token"))
      .then(async (res) => {
        if (res.data.Status === "Success") {
          fechOddaniaGrupy(widokOddan)

          const res = await axios.get(IP + "parametry/"+appContext.idZamowieniaDiag+"/"+ sessionStorage.getItem("token"));
           modalContext.setDaneZamowienia([])
           modalContext.setProdukty([])
           modalContext.setElementy([])
           modalContext.setFragmenty([])
           modalContext.setOprawa([])
           modalContext.setProcesyElementow([])
           modalContext.setTechnologieID([])
           modalContext.setHistoriaZamowienia([])
           modalContext.setPakowanie([])
           modalContext.setDaneZamowienia(res.data[0][0])
          technologia_id = res.data[0][0].technologia_id || 0
           modalContext.setProdukty(res.data[1])
           modalContext.setElementy(res.data[2])
           modalContext.setFragmenty(res.data[3])
           modalContext.setOprawa(res.data[4])
           modalContext.setProcesyElementow(res.data[5])
           modalContext.setTechnologieID(res.data[6])
           modalContext.setHistoriaZamowienia(res.data[7])
           modalContext.setPakowanie(res.data[8])
           modalContext.setKosztyDodatkoweZamowienia(res.data[9])
           modalContext.setKsiegowosc(res.data[10][0])
           modalContext.setFaktury(res.data[11])
                  techContext.setDaneTech([]) 
                  techContext.setProduktyTech([])
                  techContext.setElementyTech([])
                  techContext.setFragmentyTech([])
                  techContext.setOprawaTech([])
                  techContext.setProcesyElementowTech([])
                  techContext.setLegi([])
                  techContext.setLegiFragmenty([])
                  techContext.setArkusze([])
                  techContext.setGrupaWykonan([])
                  techContext.setGrupaWykonanInit([])
                  techContext.setWykonania([])
          //  if(modalContext.daneZamowienia.technologia_id){
           if(technologia_id){
              const res = await axios.get(IP + "technologie_parametry/"+technologia_id+"/"+ sessionStorage.getItem("token"));


                  techContext.setDaneTech(res.data[0][0]) 
                  techContext.setProduktyTech(res.data[1])
                  techContext.setElementyTech(res.data[2])
                  techContext.setFragmentyTech(res.data[3])
                  techContext.setOprawaTech(res.data[4])
                  techContext.setProcesyElementowTech(res.data[5])
                  techContext.setLegi(res.data[6])
                  techContext.setLegiFragmenty(res.data[7])
                  techContext.setArkusze(res.data[8])

                  // setGrupaWykonanInit(res.data[9])
                  techContext.setGrupaWykonan(res.data[9])
                  
                  techContext.setWykonania(res.data[10])
                  techContext.setGrupaOprawaTech(res.data[11])
           }
        } else {
          navigate("/Login");
        }
      });
  }

  useEffect(() => {
    checkToken();
  }, [appContext.idZamowieniaDiag]);


  return (
    <div className={style.main}>
        <InspekcjaHeader />

      <div className={style.container}>
       <DaneIns/>
       {/* <ProduktIns/> */}

                <div className={style.main2}>
                    <div className={style.title_container}>
                    <p className={style.title}> PRODUKTY </p>
                    <p className={style.title}> PRODUKTY TECHNOLOGII</p>
                    </div>
                    <div className={style.containerDouble}>
                    <Row tabela={modalContext.produkty} naglowki={naglowki_produkty}/>
                    <Row tabela={techContext.produktyTech} naglowki={naglowki_produkty}/>
                    </div>
                </div>

                <div className={style.main2}>
                    <div className={style.title_container}>
                    <p className={style.title}> ELEMENTY </p>
                    <p className={style.title}> ELEMENTY TECHNOLOGII</p>
                    </div>
                    <div className={style.containerDouble}>
                    <Row tabela={modalContext.elementy} naglowki={naglowki_elementy}/>
                    <Row tabela={techContext.elementyTech} naglowki={naglowki_elementy}/>
  
                    </div>
                </div>

                <div className={style.main2}>
                    <div className={style.title_container}>
                    <p className={style.title}> FRAGMENTY </p>
                    <p className={style.title}> FRAGMENTY TECHNOLOGII</p>
                    </div>
                    <div className={style.containerDouble}>
                    <Row tabela={modalContext.fragmenty} naglowki={naglowki_fragmenty}/>
                    <Row tabela={techContext.fragmentyTech} naglowki={naglowki_fragmenty}/>
               
                    </div>
                </div>


                <div className={style.main2}>
                    <div className={style.title_container}>
                    <p className={style.title}> PROCESY ELEMENTÓW </p>
                    <p className={style.title}> PROCESY ELEMENTÓW TECHNOLOGII</p>
                    </div>
                    <div className={style.containerDouble}>
                    <Row tabela={modalContext.procesyElementow} naglowki={naglowki_procesy_elementow}/>
                    <Row tabela={techContext.procesyElementowTech} naglowki={naglowki_procesy_elementow}/>
                    </div>
                </div>

                                <div className={style.main2}>
                    <div className={style.title_container}>
                    <p className={style.title}> ARKUSZE</p>
                    <p className={style.title}> </p>
                    </div>
                    <div className={style.containerDouble}>
                    <Row tabela={techContext.arkusze} naglowki={naglowki_arkusze}/>
                    {/* <Row tabela={techContext.legi} naglowki={naglowki_legi}/> */}
                    </div>
                </div>


                <div className={style.main2}>
                    <div className={style.title_container}>
                    <p className={style.title}> OPRAWA </p>
                    <p className={style.title}> OPRAWA TECHNOLOGII</p>
                    </div>
                    <div className={style.containerDouble}>
                    <Row tabela={modalContext.oprawa} naglowki={naglowki_oprawa}/>
                    <Row tabela={techContext.oprawaTech} naglowki={naglowki_oprawa}/>
                    </div>
                </div>

                <div className={style.main2}>
                    <div className={style.title_container}>
                    <p className={style.title}> LEGI</p>
                    <p className={style.title}> LEGI FRAGMENTY</p>
                    </div>
                    <div className={style.containerDouble}>
                    <Row tabela={techContext.legi} naglowki={naglowki_legi}/>
                    <Row tabela={techContext.legiFragmenty} naglowki={naglowki_legiFragmenty}/>
                    </div>
                </div>



      </div>
    </div>
  );
}


