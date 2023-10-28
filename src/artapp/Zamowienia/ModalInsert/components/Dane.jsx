import style from './Dane.module.css';
import {_firma,_produkty,_klient,_zestawy,_elementy} from './api';


export default function Dane({selected_firma,setSelected_firma,klient,setKlient}){

    return(<>
    <div className={style.dane}>
                      
                         
                      <div className={style.col}>
                          <label className={style.label}> Firma   </label>
                              <select className={style.firma} value={selected_firma} onChange={(event) => {
                                console.log(event.target.value);
                        setSelected_firma(event.target.value)}}>
                                  {_firma.map(option => (
                                      <option key={option.id} value={option.id}>
                                         {option.id}  {option.nazwa}
                                      </option>
                                  ))}
                              </select>
                      </div>
                    

                      <div className={style.col}>
                      <label className={style.label}> Klient    </label>
                          <select className={style.klient} value={klient} onChange={(event) => {
                        setKlient(event.target.value)}}>
                              {_klient.map(option => (
                                  <option key={option.id} value={option.klient}>
                                      {option.firma}
                                  </option>
                              ))}
                          </select>
                  </div>
                  


              

              <div className={style.col}>
                  <label className={style.label}> Data materiałów   </label>
                      <input className={style.data} type="date"></input>
              </div>
      

              <div className={style.col}>
                  <label className={style.label}> Data spedycji   </label>
                      <input className={style.data} type="date"></input>
              </div>

  </div>
    </>);
}