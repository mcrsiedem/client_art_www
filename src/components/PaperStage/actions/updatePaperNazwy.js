import axios from "axios";
import { IP } from "../../../utils/Host";

export   const updatePaperNazwy = async (rows,setListaPapierowNazwyWyszukiwarka,setListaPapierowNazwy,setBtnZapiszPapierDisabled)=> {

    await axios
      .put(IP + "updatePaperNazwy", rows )
      .then((res) => {
        axios.get(IP + "lista-papierow-nazwy").then(res => { setListaPapierowNazwy([...res.data]);setListaPapierowNazwyWyszukiwarka([...res.data]);})
      }).then(res => {
           setBtnZapiszPapierDisabled(true)
      });

  };




