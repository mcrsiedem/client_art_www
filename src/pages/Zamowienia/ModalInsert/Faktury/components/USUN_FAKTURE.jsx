import { useContext, useState } from "react";
import { AppContext } from "context/AppContext";
import { ModalInsertContext } from "context/ModalInsertContext";
import style from "../Faktury.module.css";

import iconTrash from "assets/trash2.svg";
import { useHistoria } from "hooks/useHistoria";

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
   const daneZamowienia = contextModal.daneZamowienia;
     const [add] = useHistoria()
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


                handleFaktury({
                  ...faktura,
                  delete: true,
                });

                if(faktura.insert != true){
                              add(         {
              kategoria: "Faktura",
              event: "Skasowano: "+ faktura.nazwa+" ilosc: "+ faktura.ilosc+" cena: " + faktura.cena+" suma: "+ faktura.suma , 
              zamowienie_id: daneZamowienia.id
            })
                }

   


          }}
          alt="Procesy"
        />
      </div>
    </div>
  );
}
