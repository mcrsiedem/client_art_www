import React from "react";
import styles from "./Row.module.css";

export default function Row( {tabela,naglowki}) {
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
                            {tabela?.map((wiersz, rowIndex) => (
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


