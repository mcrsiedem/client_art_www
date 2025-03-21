import axios from "axios";
import { IP } from "../utils/Host";
export async function getPapieryParametry(setListaPapierow,setListaPapierowWyszukiwarka,setListaPapierowNazwy,setListaPapierowNazwyWyszukiwarka,
  setListaPapierowGrupa,setListaPapierowGrupaWyszukiwarka,setListaPapierowPostac,setListaPapierowPostacWyszukiwarka,setListaPapierowRodzaj,setListaPapierowRodzajWyszukiwarka,
  setListaPapierowWykonczenia,setListaPapierowWykonczeniaWyszukiwarka,setListaPapierowPowleczenie,setListaPapierowPowleczenieWyszukiwarka
) {
  // console.log("token"+sessionStorage.getItem("token") )
    const res = await axios.get(IP + "papiery-parametry/" + sessionStorage.getItem("token"));


    setListaPapierow(res.data[0].map(x => {return {...x, typ_row: 1, delete:false}}  )  );
    setListaPapierowWyszukiwarka(res.data[0].map(x => {return {...x, typ_row: 1, delete:false}}  )  );

    setListaPapierowNazwy(res.data[1].map(x => {return {...x, isExpand:false, typ_row: 2, delete:false}}  ));
    setListaPapierowNazwyWyszukiwarka(res.data[1].map(x => {return {...x, isExpand:false, typ_row: 2, delete:false}}  ));

    setListaPapierowGrupa(res.data[2].map(x => {return {...x, isExpand:false, typ_row: 3, delete:false}}  ));
    setListaPapierowGrupaWyszukiwarka(res.data[2].map(x => {return {...x, isExpand:false, typ_row: 3, delete:false}}  ));

    setListaPapierowPostac(res.data[3]);
    setListaPapierowPostacWyszukiwarka(res.data[3]);

    setListaPapierowRodzaj(res.data[4]);
    setListaPapierowRodzajWyszukiwarka(res.data[4]);
    
    setListaPapierowWykonczenia(res.data[5]);
    setListaPapierowWykonczeniaWyszukiwarka(res.data[5]);

    setListaPapierowPowleczenie(res.data[6]);
    setListaPapierowPowleczenieWyszukiwarka(res.data[6]);
    // setProcesyElementow(res.data[5])
  }

