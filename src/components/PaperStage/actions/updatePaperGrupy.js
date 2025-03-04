import axios from "axios";
import { IP } from "../../../utils/Host";

export   const updatePaperGrupy = async (rows,setListaPapierowGrupaWyszukiwarka,setListaPapierowGrupa,setBtnZapiszPapierDisabled)=> {

    await axios
      .put(IP + "updatePaperGrupa", rows )
      .then((res) => {
        axios.get(IP + "lista-papierow-grupa/" + sessionStorage.getItem("token")).then(res => { setListaPapierowGrupa([...res.data]);setListaPapierowGrupaWyszukiwarka([...res.data]);})
      }).then(res => {
           setBtnZapiszPapierDisabled(true)
      });

  };




