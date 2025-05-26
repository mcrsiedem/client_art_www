import axios from "axios";

import { IP } from "../utils/Host";


export function skasujTechnologie(technologia_id,zamowienie_id,user_id,refreshZamowienia,setShowTechnologyStage) {

// id = procesor id

  axios.get(IP + "skasujTechnologie/"+technologia_id+"/"+zamowienie_id+"/"+user_id+"/"+ sessionStorage.getItem("token"))
    .then((res) => {
    // console.log("procesor " +res.data[0].mcr)
    // fechparametryTechnologii
    // fechparametryTechnologii(zamowienie_id,res.data[0].technologia_id)
    // console.log("zamowienie id:" +zamowienie_id)
    // console.log("technologia id:" +technologia_id)
    setShowTechnologyStage(false)
    refreshZamowienia()
    // fechparametryTechnologii(zamowienie_id,technologia_id)

    });
}
// const res = await axios.get(IP + "technologie_parametry/"+technologia_id+"/"+ sessionStorage.getItem("token"));
