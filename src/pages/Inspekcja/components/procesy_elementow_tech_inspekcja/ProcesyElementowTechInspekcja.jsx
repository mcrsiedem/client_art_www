import React, { useEffect, useState,useRef,useContext,useCallback } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./ProcesyElementowTechInspekcja.module.css";
import { AppContext } from "context/AppContext";
import { TechnologyContext } from "context/TechnologyContext";
import { _etapy_produkcji, _stan_dokumentu, _status, _status_dokumentu } from "utils/initialvalue";
import { ModalInsertContext } from "context/ModalInsertContext";




export default function ProcesyElementowTechInspekcja( ) {
  const navigate = useNavigate();

  const appContext = useContext(AppContext)
  const techContext = useContext(TechnologyContext);
  const modalContext = useContext(ModalInsertContext);
  const oddaniaGrupy =appContext.oddaniaGrupy;
  const setOddaniaGrupy =appContext.setOddaniaGrupy;
  const fechOddaniaGrupy =appContext.fechOddaniaGrupy;
  const widokOddan =appContext.widokOddan;


  const daneZamowienia =modalContext.daneZamowienia;
  const produkty =modalContext.produkty;
  const procesyElementowTech =techContext.procesyElementowTech;
  


  
      let  naglowki= [`global_id`, `arkusz`, `lega`,`id`,`indeks`,`element_id`,`nazwa`,`back_ilosc`, `back_kolor`,  `front_ilosc`, `front_kolor`,  `ilosc_uzytkow`,  `info`, `infoprocesy`, `komplet`,  `mnoznik`, `naklad`, `narzad`,  `nazwa_elementu`, `nazwa_id`, `nr`, `obszar`, `predkosc`, `proces_id`, `procesor_domyslny`, `produkt`, `produkt_id`, `rodzaj`, `stan`, `status`, `status_nazwa`, `technologia_id`, `typ`, `typ_elementu`, `wykonczenie`, `zamowienie_id`]


  return (
    <div className={styles.tabelaKontener}>
                    <table className={styles.glownaTabela}>
                        <thead>
                            <tr>
                                {naglowki.map((naglowek, index) => (
                                    <th key={index}>{naglowek}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {procesyElementowTech?.map((wiersz, rowIndex) => (
                                // Używamy rowIndex jako klucza, jeśli wiersz.id jest potencjalnie puste
                                <tr key={wiersz.global_id || rowIndex}> 
                                    {naglowki.map((kluczKolumny, colIndex) => (
                                        <td key={colIndex}>{wiersz[kluczKolumny]}</td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    
    </div>
  );
}


