import axios from "axios";
import { IP } from "../../../utils/Host";

export   const updatePaper = async (rows,setListaPapierowWyszukiwarka,setListaPapierow,setBtnZapiszPapierDisabled)=> {

    await axios
      .put(IP + "updatePaper/" + sessionStorage.getItem("token"), rows )
      .then((res) => {
        axios.get(IP + "lista-papierow/" + sessionStorage.getItem("token")).then(res => { setListaPapierow([...res.data]);setListaPapierowWyszukiwarka([...res.data]);})
      }).then(res => {
           setBtnZapiszPapierDisabled(true)
      });

  };




