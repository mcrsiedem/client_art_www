import axios from "axios";

import { IP } from "../utils/Host";


export function updateWykonaniaOrazGrupaFromProcesView(global_id_grupa_wykonan,kolumna,wartosc,fechGrupyAndWykonaniaForProcesor,selectedProcesor) {

// id = procesor id

  axios.get(IP + "updateWykonaniaOrazGrupa/"+global_id_grupa_wykonan+"/"+kolumna+"/"+wartosc)
    .then((res) => {
    // console.log("procesor " +res.data[0].mcr)
    // fechparametryTechnologii
    // console.log("selected procesor:"+ selectedProcesor)
    fechGrupyAndWykonaniaForProcesor(selectedProcesor)

    });
}
