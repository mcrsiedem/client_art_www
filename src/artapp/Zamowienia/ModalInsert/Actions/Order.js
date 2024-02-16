import axios from "axios";
import DecodeToken from "../../../Login/DecodeToken";
import { ip } from "../../../../Host";



export async function saveOrder({daneZamowienia,produkty,elementy,fragmenty,oprawa,cookies}){
            console.clear();
    let produktyEdit = produkty.slice();


            
            console.log("...from save order start");
    let zamowienie_id  = await saveDataOrder({daneZamowienia,cookies})
            console.log("zamowienie_id: " +zamowienie_id);



    let savedProducts2 = await saveProducts2({produktyEdit,zamowienie_id});
            // let savedProducts = await saveProducts({produktyEdit,zamowienie_id});


            console.log(savedProducts2[0].id);
            console.log("...from save order end");
}


const saveProducts2 = ({produktyEdit,zamowienie_id}) =>{

    return new Promise( (resolve,reject)=>{

       // roll(produktyEdit,zamowienie_id,resolve)
     

    //    const array = [{ id: 'asdf'}, { id: 'foo' }, { id: 'bar' }]; // changed the input array a bit so that the `array[i].id` would actually work - obviously the asker's true array is more than some contrived strings
    //    let users = [];
    //    let promises = [];
    //    for (i = 0; i < array.length; i++) {
    //      promises.push(
    //        axios.get('/user/' + array[i].id).then(response => {
    //          // do something with response
    //          users.push(response);
    //        })
    //      )
    //    }
       
    //    Promise.all(promises).then(() => console.log(users));
       const array = [{ id: 'asdf'}, { id: 'foo' }, { id: 'bar' }]; // changed the input array a bit so that the `array[i].id` would actually work - obviously the asker's true array is more than some contrived strings
       let users = [];
       let promises = [];
       for (let i = 0; i < produktyEdit.length; i++) {
         promises.push(
            axios.post(ip + "produkty", {
                nazwa: produktyEdit[i].nazwa,
                zamowienie_id: zamowienie_id,
                typ: produktyEdit[i].typ,
                wersja: produktyEdit[i].wersja,
                uwagi: produktyEdit[i].uwagi,
                }).then(response => {
             // do something with response
             users.push({id:response.data.insertId});
             produktyEdit[i].id=response.data.insertId
           })
         )
       }
       
       Promise.all(promises).then(() => resolve(produktyEdit));







        
    })


}
   async function roll(produktyEdit,zamowienie_id,callback){
console.log("start roll") 
     let data = [{id:6}]

                produktyEdit.map(async (prod, index) => {
                                
               let res = await  axios.post(ip + "produkty", {
                    nazwa: prod.nazwa,
                    zamowienie_id: zamowienie_id,
                    typ: prod.typ,
                    wersja: prod.wersja,
                    uwagi: prod.uwagi,
                    })
                        //  console.log("to tu" +p.data.insertId)
                        data.push({id:res.data.insertId})
                        
                        produktyEdit[index]=res.data.insertId
                        
                        console.log("map roll") 
                    
                    //   let produkt_id = res2.data.insertId;
                    //   console.log(produkt_id)
                    
                    //   prod.id = 600;
                    
                })


    // console.log(data) 
    console.log("end roll") 
    callback(data)
    // callback([{id:200},{id:300}])

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