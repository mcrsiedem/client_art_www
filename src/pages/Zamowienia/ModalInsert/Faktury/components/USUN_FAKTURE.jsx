import { useContext, useState } from "react";
import { AppContext } from "context/AppContext";
import { ModalInsertContext } from "context/ModalInsertContext";
import style from "../Faktury.module.css";

import iconTrash from "assets/trash2.svg";

export default function USUN_FAKTURE({faktura}) {


  const buttonStyles = {
    // backgroundColor: '#ffa69fff',
    color: "white",
    padding: "10px 20px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "16px",
    transition: "background-color 0.3s ease",
  };

  const buttonHoverStyles = {
    backgroundColor: "#ffa69fff",
  };
  const [isHovered, setIsHovered] = useState(false);

  const currentStyles = {
    ...buttonStyles,
    ...(isHovered ? buttonHoverStyles : {}),
  };

    const contextModal = useContext(ModalInsertContext );

  const faktury = contextModal.faktury;
  const setFaktury = contextModal.setFaktury;
  const handleFaktury = contextModal.handleFaktury;
    const setKosztyDodatkoweZamowienia = contextModal.setKosztyDodatkoweZamowienia;
  const ksiegowosc = contextModal.ksiegowosc;
  const setKsiegowosc = contextModal.setKsiegowosc;
  return (
    <div>
      <div>
        <img
          style={currentStyles}
          // onClick={onClick}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          src={iconTrash}
          onClick={() => {

      //             setFaktury(
      //   faktury.map((t) => {
      //     if (t.id == faktura.id) {
      //       return {...faktura, delete: true};
      //     } else {
      //       return t;
      //     }
      //   })
      // )


                handleFaktury({
                  ...faktura,
                  delete: true,
                });


                // console.log("lenght: "+faktury.filter(x=>x.delete != true).length)
                // if(faktury.filter(x=>x.delete == true).length ==0 ){
                //   setKsiegowosc({...ksiegowosc, faktury_status:1, update:true})
                // }

            // handleRemoveItem(row.indeks, row.id);
            //  setStatus(3)
          }}
          alt="Procesy"
        />
      </div>
    </div>
  );
}
