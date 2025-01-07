import axios from "axios";
import { IP } from "../../../utils/Host";

export   const updatePaper = async (rows,setListaPapierowWyszukiwarka,listaPapierowWyszukiwarka,setListaPapierow,setListaPapierowNazwy,setBtnZapiszPapierDisabled)=> {

    await axios
      .put(IP + "updatePaper", rows )
      .then((res) => {
        setListaPapierowWyszukiwarka(listaPapierowWyszukiwarka.map(x => {return {...x, update:false,insert:false,delete:false}}  ));
      }).then(res => {
        axios.get(IP + "lista-papierow").then(res => { setListaPapierow([...res.data]);setListaPapierowWyszukiwarka([...res.data]);})
      }).then(res => {
        axios.get(IP + "lista-papierow-nazwy").then(res =>{  setListaPapierowNazwy([...res.data]);})
        setBtnZapiszPapierDisabled(true)
      });

  };




