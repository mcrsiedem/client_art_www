import axios from "axios";

import { IP } from "../utils/Host";


export function sendMail(zamowienia,setShowZamowieniaInfo,setZamowieniaInfo) {

// id = procesor id
console.log(zamowienia)

  axios.put(IP + "mail/"+ sessionStorage.getItem("token"),zamowienia)
    .then((res) => {
    // console.log("procesor " +res.data[0].mcr)
    // fechparametryTechnologii
    // fechparametryTechnologii(zamowienie_id,res.data[0].technologia_id)
    // console.log("zamowienie id:" +zamowienie_id)
    // console.log(res.data)
//     setZamowieniaInfo(res.data)
// setShowZamowieniaInfo(true)
    // fechparametryTechnologii(zamowienie_id,technologia_id)

    });
}
// const res = await axios.get(IP + "technologie_parametry/"+technologia_id+"/"+ sessionStorage.getItem("token"));
