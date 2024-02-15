import axios from "axios";
import DecodeToken from "../../../Login/DecodeToken";
import { ip } from "../../../../Host";



export async function saveOrder({daneZamowienia,produkty,elementy,fragmenty,oprawa,cookies}){
            console.clear();
    let produktyEdit = produkty.slice();


            
            console.log("...from save order start");
    let zamowienie_id  = await saveDataOrder({daneZamowienia,cookies})
            console.log("zamowienie_id: " +zamowienie_id);

            // produktyEdit.forEach(async (produkt, index) => {
                
            // })  

    let savedProducts = await saveProducts({produktyEdit,zamowienie_id});

     savedProducts.forEach( x=>console.log(x.id) )
            // console.log('...produkt_id from main '+ savedProducts[0].id)
            console.log("...from save order end");
}








//----------------------------------------------------------------------------------
const saveProducts = ({produktyEdit,zamowienie_id}) =>{
const data = [...produktyEdit]
    return new Promise( (resolve,reject)=>{
        

        produktyEdit.map( (produkt, index) => {

        const   save = axios.post(ip + "produkty", {
                          nazwa: produkt.nazwa,
                          zamowienie_id: zamowienie_id,
                          typ: produkt.typ,
                          wersja: produkt.wersja,
                          uwagi: produkt.uwagi,
                          })
                save.then((res) =>{
                            //  console.log("id z produktu:" + produkt.id)
                             console.log("Id z odpowiedzi:" + res.data.insertId)
                            //  produkt.id=res.data.insertId
                            //  console.log("Id po przypisaniu:" + produkt.id)
                            let id = res.data.insertId;  
                            data[index].id =id;
                            // data.push(produkt)
                            
                            resolve(data);   
                        })
                        
                         
                    })
                    
                }
                
                )
                

}

//----------------------------------------------------------------------------------



//----------------------------------------------------------------------------------

const saveDataOrder = ({daneZamowienia,cookies}) =>{

    return new Promise(async(resolve,reject)=>{

    let res = await axios.post(ip + "zamowienie", {
        nr: daneZamowienia.nr,
        rok: daneZamowienia.rok,
        firma_id: daneZamowienia.firma_id,
        klient_id: daneZamowienia.klient_id,
        tytul: daneZamowienia.tytul,
        data_przyjecia: daneZamowienia.dataPrzyjecia,
        data_materialow: daneZamowienia.dataMaterialow,
        data_spedycji: daneZamowienia.dataSpedycji,
        opiekun: daneZamowienia.opiekun_id,
        user: DecodeToken(cookies.token).id,
        stan: daneZamowienia.stan,
        status: daneZamowienia.status,
        uwagi: daneZamowienia.uwagi,
      });
    let zamowienie_id = res.data.insertId;

        resolve(zamowienie_id)

    })
}