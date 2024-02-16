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

            let savedProducts2 = await saveProducts2({produktyEdit,zamowienie_id});
            // let savedProducts = await saveProducts({produktyEdit,zamowienie_id});

    //  savedProducts.forEach( x=>console.log(x.id) )
            // console.log('...produkt_id from main '+ savedProducts[0].id)

              console.log(savedProducts2[1].id);
            console.log("...from save order end");
}


const saveProducts2 = ({produktyEdit,zamowienie_id}) =>{

    return new Promise( (resolve,reject)=>{
 
        //   roll({produktyEdit,zamowienie_id}).then(res => resolve (res))

        produktyEdit.map(element => {
            element.id = 500;
        });
        produktyEdit.forEach(element => {
            console.log(element)
        });

        //   resolve ([{id:200},{id:300}])
          resolve (produktyEdit)

        
    })


}
   async function roll(produktyEdit,zamowienie_id){

    let data = produktyEdit.slice();
    for await (const produkt of data){

        const   save = axios.post(ip + "produkty", {
            nazwa: produkt.nazwa,
            zamowienie_id: zamowienie_id,
            typ: produkt.typ,
            wersja: produkt.wersja,
            uwagi: produkt.uwagi,
            })


    save.then((res) =>{
                //  console.log("id z produktu:" + produkt.id)
                // console.log("Id z odpowiedzi:" + res.data.insertId)
                data.id=res.data.insertId
                //  console.log("Id po przypisaniu:" + produkt.id)
                // let id = res.data.insertId; 
                // data[index].id = id 
                //  data[index].id =id;
               
                
                   
            })

            

    }
 
 


   }




//----------------------------------------------------------------------------------
const saveProducts = ({produktyEdit,zamowienie_id}) =>{
    return new Promise( (resolve,reject)=>{
        const data = [...produktyEdit]
        

        data.map(async (produkt, index) => {

                    let   res = await axios.post(ip + "produkty", {
                                    nazwa: produkt.nazwa,
                                    zamowienie_id: zamowienie_id,
                                    typ: produkt.typ,
                                    wersja: produkt.wersja,
                                    uwagi: produkt.uwagi,
                                    })

                                    produkt.id =  res.data.insertId; 
     
                                    
                                })
                                console.log("koniec mapowania") 

                                //  console.log("okok "+data[0].id)
                                resolve([{id: 200},{id: 300}]);
                                // resolve([...data]);
                }
                
                )
                

}

//----------------------------------------------------------------------------------
const changeId = (id,data,index) =>{

    return new Promise ((resolve,reject) =>{

            data[index].id = id
        // const produkt = data.find( produkt=> produkt.index === index)
        // produkt
        // console.log("id z changeId :" + id)
        resolve();

    })
}


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