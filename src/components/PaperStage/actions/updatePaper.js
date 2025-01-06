import axios from "axios";
import { IP } from "../../../utils/Host";

export   const updatePaper = async (rowsToUpdate,setListaPapierowWyszukiwarka,listaPapierowWyszukiwarka)=> {

    await axios
      .put(IP + "updatePaper", rowsToUpdate  )
      .then((res) => {
        setListaPapierowWyszukiwarka(listaPapierowWyszukiwarka.map(x => {return {...x, update:null,insert:null,delete:null}}  ));
      });

console.log("update lista: ",rowsToUpdate )


  };


