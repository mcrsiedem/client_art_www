import axios from "axios";
import { IP } from "../../../utils/Host";

export   const updatePaper = async (rowsToUpdate,setListaPapierowWyszukiwarka,listaPapierowWyszukiwarka,setListaPapierow,setListaPapierowNazwy,setBtnZapiszPapierDisabled)=> {

    await axios
      .put(IP + "updatePaper", rowsToUpdate  )
      .then((res) => {
        setListaPapierowWyszukiwarka(listaPapierowWyszukiwarka.map(x => {return {...x, update:null,insert:null,delete:null}}  ));
      }).then(res => {
        axios.get(IP + "lista-papierow").then(res => { setListaPapierow([...res.data]);})
      }).then(res => {
        axios.get(IP + "lista-papierow-nazwy").then(res =>{  setListaPapierowNazwy([...res.data]);})
        setBtnZapiszPapierDisabled(true)
      });
  };




