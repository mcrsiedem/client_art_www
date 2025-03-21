import axios from "axios";
import { IP } from "utils/Host";


export   const updatePaperGrupy = async (rows,setListaPapierowGrupaWyszukiwarka,setListaPapierowGrupa,setBtnZapiszPapierDisabled)=> {

    await axios
      .put(IP + "updatePaperGrupa/" + sessionStorage.getItem("token"), rows )
      .then((res) => {
        axios.get(IP + "lista-papierow-grupa/" + sessionStorage.getItem("token")).then(res => { setListaPapierowGrupa([...res.data].map(x => {return {...x, isExpand:false, typ_row: 3, delete:false}}  ));setListaPapierowGrupaWyszukiwarka([...res.data].map(x => {return {...x, isExpand:false, typ_row: 3, delete:false}}  ));})
      }).then(res => {
           setBtnZapiszPapierDisabled(true)
      });

  };




