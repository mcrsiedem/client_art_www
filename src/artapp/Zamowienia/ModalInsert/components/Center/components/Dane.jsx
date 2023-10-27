import style from '../Center.module.css';
import {_firma,_produkty,_klient,_zestawy,_elementy} from '../components/api';
export default function Dane({selected_firma,setSelected_firma,klient,setKlient}){

    return(<>
    <div className={style.row1}>
                      
                         
                      <div className={style.col}>
                          <label className={style.label}> Firma   </label>
                              <select className={style.firma} value={selected_firma} onChange={(event) => {
                        setSelected_firma(event.target.value)}}>
                                  {_firma.map(option => (
                                      <option key={option.id} value={option.nazwa}>
                                          {option.nazwa}
                                      </option>
                                  ))}
                              </select>
                      </div>
                    

                      <div className={style.col}>
                      <label className={style.label}> Klient    </label>
                          <select className={style.klient} value={klient} onChange={(event) => {
                        setKlient(event.target.value)}}>
                              {_klient.map(option => (
                                  <option key={option.id} value={option.firma}>
                                      {option.firma}
                                  </option>
                              ))}
                          </select>
                  </div>
                  

                  <div className={style.col}>
                  <label className={style.label}> Tytuł   </label>
                      <input className={style.tytul} value="Tytuł" type="text" />
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