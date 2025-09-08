import style from "./Dane.module.css";
import { useContext} from "react";
import { _firma, _produkty, _klient, _zestawy, _elementy, _opiekun, _status_dokumentu,_stan_dokumentu,_vat,_waluta,_rodzaj,_fsc, _etapy_produkcji, reg_txt, reg_int } from "utils/initialvalue";
import addIcon2 from "../../../../assets/addIcon2.svg";
import { ModalInsertContext } from "context/ModalInsertContext";
import { AppContext } from "context/AppContext";
import { goInputValidation } from "actions/goInputValidation";
import { useHistoria } from "hooks/useHistoria";
import DecodeToken from "pages/Login/DecodeToken";

import axios from "axios";

import { IP } from "utils/Host";
import { today } from "actions/today";
import { useStatus } from "hooks/useStatus";
export default function Dane({showAddClientStage,setShowParametryZamowienia,setShowKosztyZamowienia}) {

  
  return (
    <>
      <div id="Dane" className={style.dane}>
        <Row style={style.row1}>
          <Firma />
          <Klient showAddClientStage={showAddClientStage} />
          <TerminPlatnosci />
          <Przedplata />
          <DataUwtorzenia />
          <DataPrzyjecia />
          <DataMeterialow />
          <DataSpedycji />
        </Row>

        <Row style={style.row2}>
          <NR_ZAMOWIENIA_stary />
          <NR_ZAMOWIENIA />
          <Rok />
          <Tytul />
          <NAKLAD />
          <Waluta />
          <Cena />
          <WARTOSC_ZAMOWIENIA />
          <Vat />
          <KOSZTY />
          <CenaZkosztami />
          <SKONTO />
          <WARTOSC_KONCOWA />
          
          <WARTOSC_FAKTURY />
        </Row>

        <Row style={style.row3}>
          <NR_KALKULACJI />
          <KODA_PRACY />
          <ISBN />
          <FSC />
          <Stan />
          <Status />
          <Etap />
        </Row>

        <Row style={style.row4}>
          <NR_ZAMOWIENIA_KLIENTA />
          <Uwagi />
          <Opiekun />
        </Row>
      </div>
    </>
  );
}

function Row({children,style}) {
  
    return (
      <div className={style}>
        {children}
      </div>
    );
  }

  

function Firma() {
const contextApp = useContext(AppContext);
const contextModalInsert = useContext(ModalInsertContext);
const setSaveButtonDisabled = contextModalInsert.setSaveButtonDisabled;
const daneZamowienia = contextModalInsert.daneZamowienia;
const setDaneZamowienia= contextModalInsert.setDaneZamowienia;
  return (
    <div className={style.col_dane}>
      <label className={style.label}> Firma </label>
      <select
        className={style.select}
        value={daneZamowienia.firma_id}
    // disabled
        onChange={(event) => {
          setDaneZamowienia({...daneZamowienia, firma_id: event.target.value,status: daneZamowienia.stan ==3 ? 3:daneZamowienia.status,update: true});
           
        }}
      >
        {contextApp._firma.map((option) => (
          <option key={option.id} value={option.id}>
          {option.nazwa}
          </option>
        ))}
      </select>
    </div>
  );
}

function Klient({showAddClientStage }) {

const contextModalInsert = useContext(ModalInsertContext);
const setSaveButtonDisabled = contextModalInsert.setSaveButtonDisabled;
const daneZamowienia = contextModalInsert.daneZamowienia;
const setDaneZamowienia= contextModalInsert.setDaneZamowienia;
const contextApp = useContext(AppContext);

const sprawdzDostep = (c) => {
  if(DecodeToken(sessionStorage.getItem("token")).klienci_wszyscy==1){
    return true
  }else{
   return c.opiekun_id == DecodeToken(sessionStorage.getItem("token")).id
  }

}
  return (
    <div className={style.col}>
      <label className={style.label}> Klient </label>
      <select
        className={style.klient}
        value={daneZamowienia.klient_id}
        onChange={(event) => {
          setDaneZamowienia({
            ...daneZamowienia,
            klient_id: event.target.value,
            status: daneZamowienia.stan ==3 ? 3:daneZamowienia.status,
            update: true,
          });
            // 
      // setStaus(3)
           ;
        }}
      >
        <option key={1} value={"0"}> 
           wybierz...
          </option>
        {contextApp.clients
        // .filter(c=>sprawdzDostep(c))
        .map((option) => (
          <option key={option.id} value={option.id}>
            {option.firma}
          </option>
        ))}
      </select>
      <img
         className={style.dodaj_klienta}
          src={addIcon2}
          onClick={() => {
            showAddClientStage(true)
          }}
          alt="Procesy"
        />
    </div>
  );
}


function DataMeterialow(){

  const contextModalInsert = useContext(ModalInsertContext);
  const daneZamowienia = contextModalInsert.daneZamowienia;
const setDaneZamowienia= contextModalInsert.setDaneZamowienia;
const setSaveButtonDisabled = contextModalInsert.setSaveButtonDisabled;
    return(
        <div className={style.col}>
        <label className={style.label}> Data materiałów </label>
        <input className={style.select} type="date"
             value={daneZamowienia.data_materialow}
             onChange={(event) => {
              setDaneZamowienia({...daneZamowienia, data_materialow: event.target.value,status: daneZamowienia.stan ==3 ? 3:daneZamowienia.status, update: true});
               
             }}></input>
      </div>
    );
}

function DataPrzyjecia(){
  const contextModalInsert = useContext(ModalInsertContext);
  const daneZamowienia = contextModalInsert.daneZamowienia;
const setDaneZamowienia= contextModalInsert.setDaneZamowienia;
const setSaveButtonDisabled = contextModalInsert.setSaveButtonDisabled;
const [add] = useHistoria()

  return(
      <div className={style.col}>
      <label className={style.label}> Data przyjęcia </label>
      <input className={style.select} type="date"
         value={daneZamowienia.data_przyjecia}
         disabled= {DecodeToken(sessionStorage.getItem("token")).zamowienie_przyjmij==1? false:true}
         onChange={(event) => {
            setDaneZamowienia({...daneZamowienia, data_przyjecia: event.target.value, status: daneZamowienia.stan ==3 ? 3:daneZamowienia.status,update: true});
        
            add(         {
              kategoria: "Data przyjęcia",
              event: " Zmiana  z "+daneZamowienia.data_spedycji+ " na "+event.target.value ,
              zamowienie_id: daneZamowienia.id
            })
         }}></input>
    </div>
  );
}
function DataUwtorzenia(){
  const contextModalInsert = useContext(ModalInsertContext);
  const daneZamowienia = contextModalInsert.daneZamowienia;
const setDaneZamowienia= contextModalInsert.setDaneZamowienia;
const setSaveButtonDisabled = contextModalInsert.setSaveButtonDisabled;
  return(
      <div className={style.col}>
      <label className={style.label}> Data utworzenia </label>
      <input className={style.select} type="date"
         value={daneZamowienia.data_utworzenia}
         disabled
         onChange={(event) => {
            setDaneZamowienia({...daneZamowienia, data_przyjecia: event.target.value, status: daneZamowienia.stan ==3 ? 3:daneZamowienia.status,update: true});
        
         }}></input>
    </div>
  );
}
function DataSpedycji(){

  const contextModalInsert = useContext(ModalInsertContext);
  const daneZamowienia = contextModalInsert.daneZamowienia;
const setDaneZamowienia= contextModalInsert.setDaneZamowienia;
const setSaveButtonDisabled = contextModalInsert.setSaveButtonDisabled;

const oprawa = contextModalInsert.oprawa;
const setOprawa = contextModalInsert.setOprawa;
const [add] = useHistoria()


    return(
        <div className={style.col}>
        <label className={style.label}> Data spedycji </label>
        <input className={style.select} type="date"
        value={daneZamowienia.data_spedycji}
        onChange={(event) => {
    
          setDaneZamowienia({
            ...daneZamowienia,
            data_spedycji: event.target.value,
            status: daneZamowienia.stan ==3 ? 3:daneZamowienia.status,
            update: true,
          });


          setOprawa(
            oprawa.map((t,i) => {
              if (i == 0) {
                return {...t,
                  data_spedycji: event.target.value,
                  update: true
                }
              } else {
                return t;
              }
            })
          );
          add(         {
            kategoria: "Data spedycji",
            event: " Zmiana  z "+daneZamowienia.data_spedycji+ " na "+event.target.value ,
            zamowienie_id: daneZamowienia.id
          })

        }
        }></input>
      </div>
    );
}

function Opiekun() {
  const contextApp = useContext(AppContext);
  const contextModalInsert = useContext(ModalInsertContext);
  const daneZamowienia = contextModalInsert.daneZamowienia;
const setDaneZamowienia= contextModalInsert.setDaneZamowienia;
  return (
    <div className={style.col}>
      <label className={style.label}> Opiekun </label>
      <select
        className={style.select}
        // value={DecodeToken(sessionStorage.getItem("token")).id}
        value={daneZamowienia.opiekun_id}
        onChange={(event) => {
          setDaneZamowienia({...daneZamowienia, opiekun_id: event.target.value, status: daneZamowienia.stan ==3 ? 3:daneZamowienia.status,update: true});
           
        }}
      >
        {contextApp.users?.filter(x => x.zamowienie_zapis == 1).map((option) => (
        // {contextApp.users?.map((option) => (
          <option key={option.id} value={option.id}>
          {option.Imie} {option.Nazwisko} 
          </option>
        ))}
      </select>
    </div>
  );
}

function Status() {
const contextModalInsert = useContext(ModalInsertContext);
const daneZamowienia = contextModalInsert.daneZamowienia;
const setDaneZamowienia= contextModalInsert.setDaneZamowienia;
const setSaveButtonDisabled = contextModalInsert.setSaveButtonDisabled;
const selectColor = (stan) =>{
  if (stan==2) return style.select_stan_3
  if (stan==3) return style.select_status_345
  if (stan==4) return style.select_status_345
  if (stan==5) return style.select_status_345
   return style.select


}

const [add] = useHistoria()
  return (
    <div className={style.col}>
      <label className={style.label}> Status zamówienia</label>
      <select
        className={selectColor(daneZamowienia.status)}
        value={daneZamowienia.status}
        onChange={(event) => {

          // 8 skasowane, tu nie można tego użyć ze względu na kontrolę uprawnień
          if(event.target.value !=8){
                      // nie można zrobić nieaktywnego, bo nie
          if(event.target.value !=1){
              if(DecodeToken(sessionStorage.getItem("token")).zamowienie_przyjmij == 1 && daneZamowienia.technologia_id ==null){
                setDaneZamowienia({...daneZamowienia, status: event.target.value, update: true});
                add({
                      kategoria: "Status zamówienia",
                      event: "Zmiana statusu zamówienia z "+ _status_dokumentu.filter(x=>x.id == daneZamowienia.status )[0].nazwa + " na "+ _status_dokumentu.filter(x=>x.id == event.target.value )[0].nazwa,
                      zamowienie_id: daneZamowienia.id
                    })
              }

          if(DecodeToken(sessionStorage.getItem("token")).zamowienie_przyjmij == 1 && event.target.value !=2){
            // if(DecodeToken(sessionStorage.getItem("token")).zamowienie_przyjmij == 1 && daneZamowienia.technologia_id ==null){
              setDaneZamowienia({...daneZamowienia, status: event.target.value, update: true});
              add({
                    kategoria: "Status zamówienia",
                    event: "Zmiana statusu zamówienia z "+ _status_dokumentu.filter(x=>x.id == daneZamowienia.status )[0].nazwa + " na "+ _status_dokumentu.filter(x=>x.id == event.target.value )[0].nazwa,
                    zamowienie_id: daneZamowienia.id
                  })
            }
            if(DecodeToken(sessionStorage.getItem("token")).zamowienie_przyjmij == 1 && event.target.value==5){
              setDaneZamowienia({...daneZamowienia, status: event.target.value, update: true});
              add({
                    kategoria: "Status zamówienia",
                    event: "Zmiana statusu zamówienia z "+ _status_dokumentu.filter(x=>x.id == daneZamowienia.status )[0].nazwa + " na "+ _status_dokumentu.filter(x=>x.id == event.target.value )[0].nazwa,
                    zamowienie_id: daneZamowienia.id
                  })
            }

            if(event.target.value==3 || event.target.value==4){
              setDaneZamowienia({...daneZamowienia, status: event.target.value, update: true});
              add({
                    kategoria: "Status zamówienia",
                    event: "Zmiana statusu zamówienia z "+ _status_dokumentu.filter(x=>x.id == daneZamowienia.status )[0].nazwa + " na "+ _status_dokumentu.filter(x=>x.id == event.target.value )[0].nazwa,
                    zamowienie_id: daneZamowienia.id
                  })
            }  

          }
          }



            

        }}
      >
        {_status_dokumentu.map((option) => (
          <option key={option.id} value={option.id}>
          {option.nazwa} 
          </option>
        ))}
      </select>
    </div>
  );
}

function  Etap() {
  const contextModalInsert = useContext(ModalInsertContext);
  const daneZamowienia = contextModalInsert.daneZamowienia;
const setDaneZamowienia= contextModalInsert.setDaneZamowienia;
const setSaveButtonDisabled = contextModalInsert.setSaveButtonDisabled;
const historiaZamowienia = contextModalInsert.historiaZamowienia;
const setHistoriaZamowienia = contextModalInsert.setHistoriaZamowienia;
const [add] = useHistoria()
// etap produkcji tj pliki akcept druk etc
// po każdej zmianie etapu z harmonogram / nowe zamówienie stan zmienia się na do przyjęcia
  return (
    <div className={style.col}>
      <label className={style.label}> Etap produkcji </label>
      <select
        className={style.select}
        value={daneZamowienia.etap}
        onChange={(event) => {
          //------------------------------------------
          // etap można zmieniać ponieżej plików
          if(daneZamowienia.etap < 3 && event.target.value <3 ){

            //jeśli stan poniżej przyjęte, zmiana etapu nie zmienia stanu
            if(daneZamowienia.stan < 3){
                setDaneZamowienia({...daneZamowienia, etap: parseInt(event.target.value), update: true});
                add({kategoria: "Etap zamówienia",
                    event: "Zmiana etapu zamówienia z "+ _etapy_produkcji.filter(x=>x.id == daneZamowienia.etap )[0].nazwa + " na "+ _etapy_produkcji.filter(x=>x.id == event.target.value )[0].nazwa,
                    zamowienie_id: daneZamowienia.id}
                );

            }
            // jeśli etap zamówienia wraca na harmonogram stan się nie zmienia
            if(event.target.value ==1){
              setDaneZamowienia({...daneZamowienia, etap: parseInt(event.target.value), update: true});
              add({kategoria: "Etap zamówienia",
                  event: "Zmiana etapu zamówienia z "+ _etapy_produkcji.filter(x=>x.id == daneZamowienia.etap )[0].nazwa + " na "+ _etapy_produkcji.filter(x=>x.id == event.target.value )[0].nazwa,
                  zamowienie_id: daneZamowienia.id}
              );
            }
          

            // jeśli etap zamówienia było przyjęte i zmienia się z harmonogramu na nowe zamówienie, stan zmienia się na do przyjęcia
            if(event.target.value ==2 && daneZamowienia.stan > 2){
              setDaneZamowienia({...daneZamowienia, etap: parseInt(event.target.value) , stan:2, update: true});
               add({kategoria: "Etap zamówienia",
                event: "Zmiana etapu zamówienia z "+ _etapy_produkcji.filter(x=>x.id == daneZamowienia.etap )[0].nazwa + " na "+ _etapy_produkcji.filter(x=>x.id == event.target.value )[0].nazwa,
                zamowienie_id: daneZamowienia.id}
            );
              
            }
   








          }
          

          if(DecodeToken(sessionStorage.getItem("token")).zamowienie_oddaj == 1 && event.target.value==16){
                  setDaneZamowienia({...daneZamowienia, etap: parseInt(event.target.value) , update: true});
               add({kategoria: "Etap zamówienia",
                event: "Zmiana etapu zamówienia z "+ _etapy_produkcji.filter(x=>x.id == daneZamowienia.etap )[0].nazwa + " na "+ _etapy_produkcji.filter(x=>x.id == event.target.value )[0].nazwa,
                zamowienie_id: daneZamowienia.id}
            );
          }


          //------------------------------------------
          
           
        }}
      >
        {_etapy_produkcji.map((option) => (
          <option key={option.id} value={option.id}>
          {option.nazwa} 
          </option>
        ))}
      </select>
    </div>
  );
}

function FSC( ) {
  const contextModalInsert = useContext(ModalInsertContext);
  const daneZamowienia = contextModalInsert.daneZamowienia;
const setDaneZamowienia= contextModalInsert.setDaneZamowienia;
const setSaveButtonDisabled = contextModalInsert.setSaveButtonDisabled;
  return (
    <div className={style.col}>
      <label className={style.label}> FSC </label>
      <select
        className={style.select}
        value={daneZamowienia.fsc}
        onChange={(event) => {
          setDaneZamowienia({...daneZamowienia, fsc: event.target.value,status: daneZamowienia.stan ==3 ? 3:daneZamowienia.status, update: true});
           
        }}
      >
        {_fsc.map((option) => (
          <option key={option.id} value={option.id}>
          {option.nazwa} 
          </option>
        ))}
      </select>
    </div>
  );
}

function Stan( ) {
  const contextModalInsert = useContext(ModalInsertContext);
  const daneZamowienia = contextModalInsert.daneZamowienia;
const setDaneZamowienia= contextModalInsert.setDaneZamowienia;
const setSaveButtonDisabled = contextModalInsert.setSaveButtonDisabled;

// const zamowienie_przyjmij = true;
const [add] = useHistoria()
const selectColor = (stan) =>{
  if (stan==1) return style.select_stan_1
  if (stan==2) return style.select_stan_2
  if (stan==3) return style.select_stan_3
   return style.select


}
  return (
    <div className={style.col}>
      <label className={style.label}> Stan zamówienia </label>
      <select
        // className={daneZamowienia.stan == 3 ? style.select3:style.select}
        className={selectColor(daneZamowienia.stan) }
        value={daneZamowienia.stan}
        onChange={(event) => {

          if(event.target.value != 3){

                      if(event.target.value == 2 && daneZamowienia.stan == 1){
          setDaneZamowienia({...daneZamowienia, stan: event.target.value, update: true});
                  add(                    {
                      kategoria: "Stan zamówienia",
                      event: "Zmiana stanu zamówienia z "+ _stan_dokumentu.filter(x=>x.id == daneZamowienia.stan )[0].nazwa + " na "+ _stan_dokumentu.filter(x=>x.id == event.target.value )[0].nazwa,
                      zamowienie_id: daneZamowienia.id
                  }
                  );
          }

          if(event.target.value == 1 && daneZamowienia.stan == 2){
            setDaneZamowienia({...daneZamowienia, stan: event.target.value, update: true});
                    add(                    {
                        kategoria: "Stan zamówienia",
                        event: "Zmiana stanu zamówienia z "+ _stan_dokumentu.filter(x=>x.id == daneZamowienia.stan )[0].nazwa + " na "+ _stan_dokumentu.filter(x=>x.id == event.target.value )[0].nazwa,
                        zamowienie_id: daneZamowienia.id
                    }
                    );
            }

          }

        }}
      >
        {_stan_dokumentu.map((option) => (
          <option key={option.id} value={option.id}>
          {option.nazwa} 
          </option>
        ))}
      </select>
    </div>
  );
}

function Tytul( ){
  const contextModalInsert = useContext(ModalInsertContext);
  const daneZamowienia = contextModalInsert.daneZamowienia;
const setDaneZamowienia= contextModalInsert.setDaneZamowienia;
const setSaveButtonDisabled = contextModalInsert.setSaveButtonDisabled;

  return(
      <div className={style.col}>
      <label className={style.label}> Tytul </label>
      <input className={style.input} type="text"
      value={daneZamowienia.tytul}
      onChange={(event) => {
        

         const re = /^[a-zA-Z0-9_+\sąćęłńóśźżĄĘŁŃÓŚŹŻŚĆŹ.-/-ŠšŽžČčĐđ,!:]+$/;
        if ( event.target.value === '' || re.test(event.target.value)) {
        setDaneZamowienia({...daneZamowienia, tytul: event.target.value, status: daneZamowienia.stan ==3 ? 3:daneZamowienia.status,update: true});
         
     }

      }}></input>
    </div>
  );
}


function Przedplata( ){
  const contextModalInsert = useContext(ModalInsertContext);
  const daneZamowienia = contextModalInsert.daneZamowienia;
const setDaneZamowienia= contextModalInsert.setDaneZamowienia;
const setSaveButtonDisabled = contextModalInsert.setSaveButtonDisabled;
  return(
      <div className={style.col}>
      <label className={style.label}> Przedpłata %</label>
      <input className={style.input} type="text"
      value={daneZamowienia.przedplata}
      onChange={(event) => {
        if(goInputValidation(event,'price')){
          setDaneZamowienia({...daneZamowienia, przedplata: event.target.value, status: daneZamowienia.stan ==3 ? 3:daneZamowienia.status,update: true});
           
        }
      }}></input>
    </div>
  );
}



function Uwagi( ){
  const contextModalInsert = useContext(ModalInsertContext);
  const daneZamowienia = contextModalInsert.daneZamowienia;
const setDaneZamowienia= contextModalInsert.setDaneZamowienia;
const setSaveButtonDisabled = contextModalInsert.setSaveButtonDisabled;
  return(
      <div className={style.col}>
      <label className={style.label}> Uwagi </label>
      <textarea className={style.input_textarea} rows="3" type="text"
      value={daneZamowienia.uwagi}
      onChange={(event) => {

   
        // const re = /^[a-zA-Z0-9_+\sąćęłńóśźżĄĘŁŃÓŚŹŻŚĆŹ./-šž,!:]+$/;
        if ( event.target.value === '' || reg_txt.test(event.target.value)) {
      
          setDaneZamowienia({...daneZamowienia, uwagi: event.target.value, status: daneZamowienia.stan ==3 ? 3:daneZamowienia.status,update: true});
           
     }

      }}></textarea>
    </div>
  );
}

function NR_ZAMOWIENIA( ){
  const contextModalInsert = useContext(ModalInsertContext);
  const daneZamowienia = contextModalInsert.daneZamowienia;
  const setDaneZamowienia= contextModalInsert.setDaneZamowienia;
  // const setSaveButtonDisabled = contextModalInsert.setSaveButtonDisabled;
  const [add] = useHistoria();

  if (daneZamowienia.stan == 1 && daneZamowienia.stan == 3) {
    return (
      <div className={style.col}>
        <label className={style.label}> Zamówienie </label>
        <input
          className={style.input}
          type="text"
          title="Numer zamówienia"
          value={daneZamowienia.nr}
        ></input>
      </div>
    );
  }

  

  if(daneZamowienia.stan==2 && daneZamowienia.etap==2 && DecodeToken(sessionStorage.getItem("token")).zamowienie_przyjmij==1){
 return(
      <div className={style.col}>
      <label className={style.label}> Zamówienie </label>
      <button className={style.btn_nadajNr} onClick={async()=>{
      let  res = await axios.post(IP + "zamowienieNumer/" + sessionStorage.getItem("token"),[{
          zamowienie_id: daneZamowienia.id,
          user_id: DecodeToken(sessionStorage.getItem("token")).id
         }])
         let zapis = res.data[0][0].zapis; // jeśli dane zapisały sie to zapis == true
         let zamowienie_nr = res.data[0][1].zamowienie_nr;  // nr id pod jakim zapisała sietechnologia
         setDaneZamowienia({...daneZamowienia, nr: zamowienie_nr,data_przyjecia: today() ,stan:3,status:2,update: true})
         
         add(                    {
          kategoria: "Stan zamówienia",
          event: "Zmiana stanu zamówienia z "+ _stan_dokumentu.filter(x=>x.id == daneZamowienia.stan )[0].nazwa + " na "+ _stan_dokumentu.filter(x=>x.id == 3 )[0].nazwa,
          zamowienie_id: daneZamowienia.id
      }
      );

      }}>
        dodaj nr
      </button>
    </div>
  );
   
  }

  if(daneZamowienia.stan==2 && daneZamowienia.etap==1 && DecodeToken(sessionStorage.getItem("token")).harmonogram_przyjmij==1){
    return(
         <div className={style.col}>
         <label className={style.label}> Harmonogram </label>
         <button className={style.btn_przujmij_do_harmonogramu} onClick={async()=>{

            setDaneZamowienia({...daneZamowienia,stan:3,status:2,update: true})
            add(                    {
              kategoria: "Stan zamówienia",
              event: "Zmiana stanu zamówienia z "+ _stan_dokumentu.filter(x=>x.id == daneZamowienia.stan )[0].nazwa + " na "+ _stan_dokumentu.filter(x=>x.id == 3 )[0].nazwa+" do Harmonogramu",
              zamowienie_id: daneZamowienia.id
          }
          );

         }}>
           przyjmij
         </button>
       </div>
     );
      
     }

     return (
      <div className={style.col}>
        <label className={style.label}> Zamówienie </label>
        <input
          className={style.input}
          type="text"
          title="Numer zamówienia"
          value={daneZamowienia.nr}
        ></input>
      </div>
    );

}
//--
function NR_ZAMOWIENIA_stary( ){
  const contextModalInsert = useContext(ModalInsertContext);
  const daneZamowienia = contextModalInsert.daneZamowienia;
  const setDaneZamowienia= contextModalInsert.setDaneZamowienia;

    return (
      <div className={style.col}>
        <label className={style.label}> Stary nr </label>
        <input
          className={style.input}
          type="text"
          title="Stary nr zamówienia"
          value={daneZamowienia.nr_stary}
          onChange={(event) => {
            const re = /^[a-zA-Z0-9_+\sąćęłńóśźżĄĘŁŃÓŚŹŻ./-]+$/;
            if ( event.target.value === '' || re.test(event.target.value)) {
              setDaneZamowienia({...daneZamowienia, nr_stary: event.target.value,update: true});
         }
          }}
        ></input>
      </div>
    );
  
}

function NR_KALKULACJI( ){
  const contextModalInsert = useContext(ModalInsertContext);
  const daneZamowienia = contextModalInsert.daneZamowienia;
  const setDaneZamowienia= contextModalInsert.setDaneZamowienia;

    return (
      <div className={style.col}>
        <label className={style.label}> Nr kalkulacji </label>
        <input
          className={style.input}
          type="text"
          title="Nr kalkulacji"
          value={daneZamowienia.nr_kalkulacji}
          onChange={(event) => {
            const re = /^[a-zA-Z0-9_+\sąćęłńóśźżĄĘŁŃÓŚŹŻ./-]+$/;
            if ( event.target.value === '' || re.test(event.target.value)) {
              setDaneZamowienia({...daneZamowienia, nr_kalkulacji: event.target.value,update: true});
         }
          }}
        ></input>
      </div>
    );
  
}
//---
function KODA_PRACY( ){
  const contextModalInsert = useContext(ModalInsertContext);
  const daneZamowienia = contextModalInsert.daneZamowienia;
  const setDaneZamowienia= contextModalInsert.setDaneZamowienia;

    return (
      <div className={style.col}>
        <label className={style.label}> Kod pracy</label>
        <input
          className={style.input}
          type="text"
          title="Kod pracy"
          value={daneZamowienia.kod_pracy}
          onChange={(event) => {
            const re = /^[a-zA-Z0-9_+\sąćęłńóśźżĄĘŁŃÓŚŹŻ./-]+$/;
            if ( event.target.value === '' || re.test(event.target.value)) {
              setDaneZamowienia({...daneZamowienia, kod_pracy: event.target.value,status: daneZamowienia.stan ==3 ? 3:daneZamowienia.status,update: true});
         }
          }}
        ></input>
      </div>
    );
  
}
//---
function NR_ZAMOWIENIA_KLIENTA( ){
  const contextModalInsert = useContext(ModalInsertContext);
  const daneZamowienia = contextModalInsert.daneZamowienia;
  const setDaneZamowienia= contextModalInsert.setDaneZamowienia;

    return (
      <div className={style.col}>
        <label className={style.label}> Nr zamówienia klienta</label>
        <input
          className={style.input}
          type="text"
          title="Numer zamówienia klienta"
          value={daneZamowienia.nr_zamowienia_klienta}
          onChange={(event) => {
            const re = /^[a-zA-Z0-9_+\sąćęłńóśźżĄĘŁŃÓŚŹŻ./-]+$/;
            if ( event.target.value === '' || re.test(event.target.value)) {
              setDaneZamowienia({...daneZamowienia, nr_zamowienia_klienta: event.target.value,status: daneZamowienia.stan ==3 ? 3:daneZamowienia.status,update: true});
         }
          }}
        ></input>
      </div>
    );
  
}
//---

function ISBN( ){
  const contextModalInsert = useContext(ModalInsertContext);
  const daneZamowienia = contextModalInsert.daneZamowienia;
  const setDaneZamowienia= contextModalInsert.setDaneZamowienia;

    return (
      <div className={style.col}>
        <label className={style.label}> ISBN</label>
        <input
          className={style.input}
          type="text"
          title="ISBN"
          value={daneZamowienia.isbn}
          onChange={(event) => {
            const re = /^[a-zA-Z0-9_+\sąćęłńóśźżĄĘŁŃÓŚŹŻ./-]+$/;
            if ( event.target.value === '' || re.test(event.target.value)) {
              setDaneZamowienia({...daneZamowienia, isbn: event.target.value,status: daneZamowienia.stan ==3 ? 3:daneZamowienia.status,update: true});
         }
          }}
        ></input>
      </div>
    );
  
}
//---


function Cena( ){
  const contextModalInsert = useContext(ModalInsertContext);
  const daneZamowienia = contextModalInsert.daneZamowienia;
const setDaneZamowienia= contextModalInsert.setDaneZamowienia;
const setSaveButtonDisabled = contextModalInsert.setSaveButtonDisabled;
  return(
      <div className={style.col}>
      <label className={style.label}> Cena szt. </label>
      <input className={style.input} type="text"
      title="Wartość / nakład"

      value={daneZamowienia.cena}
      onChange={(event) => {


       const re = /^\d{0,6}(?:\,\d{0,2}){0,1}$/;

       if ( event.target.value === '' || re.test(event.target.value)) {
        setDaneZamowienia({...daneZamowienia, cena: event.target.value, status: daneZamowienia.stan ==3 ? 3:daneZamowienia.status,update: true});
         
       }
        
      }}></input>
    </div>
  );
}

function CenaZkosztami( ){
  const contextModalInsert = useContext(ModalInsertContext);
  const daneZamowienia = contextModalInsert.daneZamowienia;
const setDaneZamowienia= contextModalInsert.setDaneZamowienia;
const ksiegowosc = contextModalInsert.ksiegowosc;
  return(
      <div className={style.col}>
      <label className={style.label}> Cena z kosztami </label>
      <input className={style.input_naklad} type="text"
      title=" ( nakład * cena lub wartosc zamowienia + koszty dodatkowe) / nakład"
      disabled
      value={daneZamowienia.cena_z_kosztami}
      onChange={(event) => {
      //  const re = /^\d{0,6}(?:\,\d{0,2}){0,1}$/;

      //  if ( event.target.value === '' || re.test(event.target.value)) {
      //   setDaneZamowienia({...daneZamowienia, cena_z_kosztami: event.target.value, status: daneZamowienia.stan ==3 ? 3:daneZamowienia.status,update: true});
      //  }
      }}></input>
    </div>
  );
}


function WARTOSC_ZAMOWIENIA( ){
  const contextModalInsert = useContext(ModalInsertContext);
  const daneZamowienia = contextModalInsert.daneZamowienia;
const setDaneZamowienia= contextModalInsert.setDaneZamowienia;
const setSaveButtonDisabled = contextModalInsert.setSaveButtonDisabled;
  return(
      <div className={style.col}>
      <label className={style.label}> Wartość </label>
      <input className={style.input} type="text"
      title="Nakład * cena"
      value={daneZamowienia.wartosc_zamowienia}
      onChange={(event) => {
       const re = /^\d{0,6}(?:\,\d{0,2}){0,1}$/;
       if ( event.target.value === '' || re.test(event.target.value)) {
        setDaneZamowienia({...daneZamowienia, wartosc_zamowienia: event.target.value, status: daneZamowienia.stan ==3 ? 3:daneZamowienia.status,update: true});
       }
        
      }}></input>
    </div>
  );
}

function WARTOSC_KONCOWA( ){
  const contextModalInsert = useContext(ModalInsertContext);
  const daneZamowienia = contextModalInsert.daneZamowienia;
const setDaneZamowienia= contextModalInsert.setDaneZamowienia;
const setSaveButtonDisabled = contextModalInsert.setSaveButtonDisabled;
  return(
      <div className={style.col}>
      <label className={style.label}> Wartość końcowa</label>
      <input className={style.input_naklad} type="text"
      disabled
      title="Cena za szt * nakład lub wartość + koszty dodatkowe - Skonto"

      value={daneZamowienia.wartosc_koncowa}
      onChange={(event) => {
       const re = /^\d{0,6}(?:\,\d{0,2}){0,1}$/;
       if ( event.target.value === '' || re.test(event.target.value)) {
        setDaneZamowienia({...daneZamowienia, wartosc_koncowa: event.target.value, status: daneZamowienia.stan ==3 ? 3:daneZamowienia.status,update: true});
       }
        
      }}></input>
    </div>
  );
}

function KOSZTY( ){
const contextModalInsert = useContext(ModalInsertContext);
const ksiegowosc = contextModalInsert.ksiegowosc;
  return(
      <div className={style.col}>
      <label className={style.label}> Koszty dodatkowe</label>
      <input className={style.input_naklad} type="text"
      value={ksiegowosc.koszty_wartosc}
      disabled
      onChange={(event) => {
 
      }}></input>
    </div>
  );
}

function WARTOSC_FAKTURY( ){
const contextModalInsert = useContext(ModalInsertContext);
const ksiegowosc = contextModalInsert.ksiegowosc;
  return(
      <div className={style.col}>
      <label className={style.label}> Faktury </label>
      <input className={style.input_naklad} type="text"
      value={ksiegowosc.faktury_wartosc}
      disabled
      onChange={(event) => {
 
        
      }}></input>
    </div>
  );
}

function NAKLAD( ){

  const contextModalInsert = useContext(ModalInsertContext);
  const produkty = contextModalInsert.produkty;
  const handleUpdateRowProdukty = contextModalInsert.handleUpdateRowProdukty;
  const [setStatus] = useStatus();

  return(
      <div className={style.col}>
      <label className={style.label}> Nakład </label>
      <input className={style.input} type="text"
      // disabled
      title="Nakład dodaj w parametrach"
      value={produkty[0].naklad.toLocaleString()}
      onChange={(e) => {

                    if (e.target.value === "" || reg_int.test(e.target.value)) {
              handleUpdateRowProdukty({
                ...produkty[0],
                naklad: e.target.value,
                update: true,
              });
      
              setStatus(3);
            }
        
      }}></input>
    </div>
  );
}
function SKONTO( ){
  const contextModalInsert = useContext(ModalInsertContext);
  const daneZamowienia = contextModalInsert.daneZamowienia;
const setDaneZamowienia= contextModalInsert.setDaneZamowienia;
// const setSaveButtonDisabled = contextModalInsert.setSaveButtonDisabled;
  return(
      <div className={style.col}>
      <label className={style.label}> Skonto %</label>
      <input className={style.input} type="text"
      value={daneZamowienia.skonto}
      onChange={(event) => {


       const re = /^\d{0,6}(?:\,\d{0,2}){0,1}$/;

       if ( event.target.value === '' || re.test(event.target.value)) {
        setDaneZamowienia({...daneZamowienia, skonto: event.target.value, status: daneZamowienia.stan ==3 ? 3:daneZamowienia.status,update: true});
         
       }
        
      }}></input>
    </div>
  );
}

function TerminPlatnosci( ){
  const contextModalInsert = useContext(ModalInsertContext);
  const daneZamowienia = contextModalInsert.daneZamowienia;
const setDaneZamowienia= contextModalInsert.setDaneZamowienia;
const setSaveButtonDisabled = contextModalInsert.setSaveButtonDisabled;
  return(
      <div className={style.col}>
      <label className={style.label}> Płatność (dni) </label>
      <input className={style.input} type="text"
      value={daneZamowienia.termin_platnosci} 
      onChange={(event) => {


        const re2 = /^[0-9]+$/;
        const re = /^[a-zA-Z0-9_+\sZąćęłńóśźżĄĘŁŃÓŚŹŻ]+$/;
       if ( event.target.value === '' || re2.test(event.target.value)) {
          setDaneZamowienia({...daneZamowienia, termin_platnosci: event.target.value, status: daneZamowienia.stan ==3 ? 3:daneZamowienia.status,update: true});
           
 
       }

      }}
      ></input>
    </div>
  );
}

function Vat( ) {
  const contextModalInsert = useContext(ModalInsertContext);
  const daneZamowienia = contextModalInsert.daneZamowienia;
const setDaneZamowienia= contextModalInsert.setDaneZamowienia;
const setSaveButtonDisabled = contextModalInsert.setSaveButtonDisabled;
  return (
    <div className={style.col}>
      <label className={style.label}> VAT</label>
      <select
        className={style.select}
        value={daneZamowienia.vat_id}
        onChange={(event) => {
          setDaneZamowienia({...daneZamowienia, vat_id: event.target.value, status: daneZamowienia.stan ==3 ? 3:daneZamowienia.status,update: true});
           
        }}
      >
        {_vat.map((option) => (
          <option key={option.id} value={option.id}>
          {option.stawka}%
          </option>
        ))}
      </select>
    </div>
  );
}



function Waluta( ) {
  const contextModalInsert = useContext(ModalInsertContext);
  const daneZamowienia = contextModalInsert.daneZamowienia;
const setDaneZamowienia= contextModalInsert.setDaneZamowienia;
const setSaveButtonDisabled = contextModalInsert.setSaveButtonDisabled;
  return (
    <div className={style.col}>
      <label className={style.label}> Waluta</label>
      <select
        className={style.select}
        value={daneZamowienia.waluta_id}
        onChange={(event) => {
          setDaneZamowienia({...daneZamowienia, waluta_id: event.target.value, status: daneZamowienia.stan ==3 ? 3:daneZamowienia.status,update: true});
           
        }}
      >
        {_waluta.map((option) => (
          <option key={option.id} value={option.id}>
          {option.nazwa}
          </option>
        ))}
      </select>
    </div>
  );
}






function Rok( ){
  const contextModalInsert = useContext(ModalInsertContext);
  const daneZamowienia = contextModalInsert.daneZamowienia;
const setDaneZamowienia= contextModalInsert.setDaneZamowienia;
const setSaveButtonDisabled = contextModalInsert.setSaveButtonDisabled;
  return(
      <div className={style.col}>
      <label className={style.label}> Rok </label>
      <input className={style.input} type="text"
            value={daneZamowienia.rok}

            
            onChange={(event) => {

              const re = /^[0-9]+$/;
              if (event.target.value === '' || re.test(event.target.value)) {
              setDaneZamowienia({...daneZamowienia, rok: event.target.value, status: daneZamowienia.stan ==3 ? 3:daneZamowienia.status,update: true});
               
              }
            }}></input>
    </div>
  );
}