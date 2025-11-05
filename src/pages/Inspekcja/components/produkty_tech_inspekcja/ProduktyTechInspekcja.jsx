import React, { useEffect, useState,useRef,useContext,useCallback } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./ProduktyTechInspekcja.module.css";
import { AppContext } from "context/AppContext";
import { TechnologyContext } from "context/TechnologyContext";
import { _etapy_produkcji, _stan_dokumentu, _status, _status_dokumentu } from "utils/initialvalue";
import { ModalInsertContext } from "context/ModalInsertContext";




export default function ProduktyTechInspekcja( ) {
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
  const produktyTech =techContext.produktyTech;
  


  
      let  naglowki= [`etap`, `format_x`, `format_y`, `global_id`, `id`, `ilosc_stron`, `indeks`, `naklad`, `nazwa`, `oprawa`, `stan`, `status`, `technologia_id`, `typ`, `uwagi`, `zamowienie_id`]

       let klucze = [`etap`, `format_x`, `format_y`, `global_id`, `id`, `ilosc_stron`, `indeks`, `naklad`, `nazwa`, `oprawa`, `stan`, `status`, `technologia_id`, `typ`, `uwagi`, `zamowienie_id`]

  return (
    // <div className={styles.main}> 
    <div className={styles.tabelaKontener}>
      {/* <p> Elementy Tech</p> */}
                    <table className={styles.glownaTabela}>
                        <thead>
                            <tr>
                                {naglowki.map((naglowek, index) => (
                                    <th key={index}>{naglowek}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {produktyTech?.map((wiersz, rowIndex) => (
                                // Używamy rowIndex jako klucza, jeśli wiersz.id jest potencjalnie puste
                                <tr key={wiersz.global_id || rowIndex}> 
                                    {klucze.map((kluczKolumny, colIndex) => (
                                        <td key={colIndex}>{wiersz[kluczKolumny]}</td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
    </div>
    // </div>
  );
}


