import React, { Component, useEffect, useState, forwardRef, useImperativeHandle,useRef,useContext } from "react";
import Row from "./Row";
import style from './Print.module.css';
import axios from "axios";
import { IP } from "../../utils/Host2";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import Dialog from "./Dialog";

const Jobs = forwardRef((props, ref) => {

  const snackbarRef = useRef(null);

    const [blacha_id, setBlacha_id] = useState();
    const [data, setData] = useState([]);
    const [sztuki, setSztuki] = useState();


    useImperativeHandle(ref, () => ({
        callChildFunction(maszyna) {
            fechDruk(maszyna);
        }
    }));


    const navigate = useNavigate();
  

    async function fechDruk(maszyna) {
        switch (maszyna) {
          case "XL":
            setBlacha_id("2")
            break;
          case "H1":
            setBlacha_id("1")
            break;
          case "H3":
            setBlacha_id("1")
            break;
        }

        const res = await axios.get(IP + 'druk/' + maszyna + '/1');
        const job = [...res.data];
        // const notes =[...res.data].filter(row=> row.status !== "Wydrukowane")
        //                           .filter(row=> row.status !== "Nowe")
        // setData(job);

        setData(job.map((obj) => {
          return { ...obj,  isSelected: false };
          }
        ));





    
      //  console.log('notes ' + job);
    };


    const handleEditBlachy = (sztuki,id) => {
        //  event.preventDefault();
        setSztuki(sztuki);
        axios
          .put(IP + "updatenaswietlenieprimewww/", {
            id: id,
            ilosc: sztuki,
            blacha_id: blacha_id,
            user_id: sessionStorage.getItem("id"),
            token: sessionStorage.getItem("token"),
          })
          .then((res) => {
            if (res.status === 201) {
              console.log(res.data);
    
              snackbarRef.current.show();
    
              //    token.setToken(res.data);
              // localStorage.setItem('header', true)
              //   setCookie("token", res.data, { path: "/" });
              //   header.style.display = "grid";
              //   navigate("/ArtApp");
            } else {
              if (res.data.Error === "Wrong token") {
                navigate("/Login");
              }
              console.log("Błąd");
            }

          });
      };

      const odznacz = () => {

      

        setData(data.map((obj) => {
          return { ...obj,  isSelected: false };
          }
        ));
      // console.log(token.rowSelected);
      }

      
  const zaznacz = (id) => {

    const dataSelected = data.map(obj => {

      if (obj.id === id) {
        return { ...obj, isSelected: true };
      }

      return obj;
    });

    setData(dataSelected);

  }

  const odznacz_zaznacz = (id) => {

    setData(data.map((obj) => {
      return { ...obj,  isSelected: false };
      }
    ));


    const newState = data.map(obj => {

      if (obj.id === id) {
        return { ...obj, isSelected: true };
      }

      return obj;
    });

    setData(newState);

  }




    useEffect(() => {
        fechDruk('XL');
        
    }, []);

    return (
        <div id='jobs' className={style.center}>
            <div id='scroll-container' className={style.body}>
                {data.map((row) => {
                    return (
                        <Row
                            key={row.id}
                            
                            title={row.klient}
                            body={row.praca}
                            poczatekDruku={row.poczatekDruku}
                            czasDruku={row.czasDruku}
                            koniecDruku={row.koniecDruku}
                            id={row.id}
                            handleEditBlachy={(sztuki)=>handleEditBlachy(sztuki,row.id)}
                            klient={row.klient}
                            nrZlecenia={row.nrZlecenia}
                            rokZlecenia={row.rokZlecenia}
                            nazwa={row.nazwa}
                            typ={row.typ}
                            format={row.formatPapieru}
                            status={row.status}
                            spedycja={row.spedycja}
                            blachy={row.xl_ok}
                            id_zlecenia={row.id_zlecenia}
                            // handleEditStatus={(status)=>handleEditStatus(status,row.id,row.id_zlecenia)}
                            odznacz={(s)=>odznacz(s)}
                            zaznacz={(id)=>zaznacz(id)}
                            // odznacz_zaznacz={(id)=>odznacz_zaznacz(id)}
                            // ref={rowRef}
                            isSelected={row.isSelected}
                           
                
                        />
                        
                    );
                })}
              <Dialog  sztuki={sztuki} ref={snackbarRef}/>

            </div>
         
            
        </div>
    );
}
)
export default Jobs;