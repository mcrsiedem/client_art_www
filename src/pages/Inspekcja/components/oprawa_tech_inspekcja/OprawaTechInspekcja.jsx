import React, { useEffect, useState,useRef,useContext,useCallback } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./OprawaTechInspekcja.module.css";
import { AppContext } from "context/AppContext";
import { TechnologyContext } from "context/TechnologyContext";
import { _etapy_produkcji, _stan_dokumentu, _status, _status_dokumentu } from "utils/initialvalue";
import { ModalInsertContext } from "context/ModalInsertContext";




export default function OprawaTechInspekcja( ) {
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
  const oprawaTech =techContext.oprawaTech;
  


  
      let  naglowki= [`global_id`,`bok_oprawy`, `data_czystodrukow`, `data_spedycji`,  `id`, `indeks`, `naklad`, `oprawa`, `produkt_id`, `technologia_id`, `utworzono`, `uwagi`, `wersja`, `zamowienie_id`, `zmodyfikowano`]


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
                            {oprawaTech?.map((wiersz, rowIndex) => (
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


