import axios from "axios";
import { IP } from "../../../utils/Host";

export   const insertPaper = async (rowsToUpdate,setListaPapierowWyszukiwarka,listaPapierowWyszukiwarka,setListaPapierow,setListaPapierowNazwy,setBtnZapiszPapierDisabled)=> {

    await axios
      .post(IP + "insertPaper", rowsToUpdate  )
      .then((res) => {
        setListaPapierowWyszukiwarka(listaPapierowWyszukiwarka.map(x => {return {...x, insert:false}}  ));
      }).then(res => {
        axios.get(IP + "lista-papierow").then(res => { setListaPapierow([...res.data]);})
      }).then(res => {
        axios.get(IP + "lista-papierow-nazwy").then(res =>{  setListaPapierowNazwy([...res.data]);})
        setBtnZapiszPapierDisabled(true)
      });
  };




