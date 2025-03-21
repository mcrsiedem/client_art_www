import axios from "axios";
import { IP } from "utils/Host";

export   const updatePaperNazwy = async (rows,setListaPapierowNazwyWyszukiwarka,setListaPapierowNazwy,setBtnZapiszPapierDisabled)=> {

    await axios
      .put(IP + "updatePaperNazwy/" + sessionStorage.getItem("token"), rows )
      .then((res) => {
        axios.get(IP + "lista-papierow-nazwy/" + sessionStorage.getItem("token")).then(res => { setListaPapierowNazwy([...res.data].map(x => {return {...x, isExpand:false, typ_row: 2, delete:false}}  ));setListaPapierowNazwyWyszukiwarka([...res.data].map(x => {return {...x, isExpand:false, typ_row: 2, delete:false}}  ));})
      }).then(res => {
           setBtnZapiszPapierDisabled(true)
      });

  };




