import axios from "axios";
export function postOprawa(oprawaEdit,ip,zamowienie_id,produkt_id,oprawa,dane){

    console.log("oprawa id: "+oprawaEdit[0].oprawa)

   oprawaEdit
    .map(async (opr, i) => {
      let oprawa_id_przed  =opr.id ;
      let res5 = await axios.post(ip + "oprawa", {
          zamowienie_id: zamowienie_id,
          produkt_id: produkt_id,
          oprawa: opr.oprawa,
          naklad: opr.naklad,
          uwagi: opr.uwagi,
          data_spedycji: opr.data_spedycji
        });
          let oprawa_id = res5.data.insertId;
            
          let indexof = oprawa.indexOf(opr);
          oprawaEdit[indexof].id = oprawa_id
          oprawaEdit[indexof].id_prev = oprawa_id_przed
          oprawaEdit[indexof].zamowienie_id = zamowienie_id
          oprawaEdit[indexof].produkt_id = produkt_id

          

          console.log("-Koniec oprawy")

          console.log("-Przystane 3")
             dane[0].test = 23;
             console.log("-Przystane 4")
             console.log( dane)
             console.log("-Przystane 5")
            //  console.log("postOprawatest: "+ postOprawatest(2))

    });


 return oprawaEdit;
}