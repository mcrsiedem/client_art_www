import { useContext, useState } from "react";
import { AppContext } from "context/AppContext";
import { ModalInsertContext } from "context/ModalInsertContext";
import style from "../KosztyDodatkowe.module.css";

import iconTrash from "assets/trash2.svg";
import { useHistoria } from "hooks/useHistoria";

export default function UsunKoszt({koszt}) {
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

  const kosztyDodatkoweZamowienia = contextModal.kosztyDodatkoweZamowienia;
  const setKosztyDodatkoweZamowienia = contextModal.setKosztyDodatkoweZamowienia;
  const handleKosztyDodatkoweZamowienia = contextModal.handleKosztyDodatkoweZamowienia;
      const daneZamowienia = contextModal.daneZamowienia;
   const [add] = useHistoria()
  return (
    <div>
      <div>
        <img
          style={currentStyles}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          src={iconTrash}
          onClick={() => {

                      handleKosztyDodatkoweZamowienia({
                        ...koszt,
                        delete: true
                      });

              if(koszt.insert != true){       
            add(         {
              kategoria: "Koszty dodatkowe",
              event: "Skasowano: "+ koszt.nazwa+" ilosc: "+ koszt.ilosc+" cena: " + koszt.cena+" suma: "+ koszt.suma , 
              zamowienie_id: daneZamowienia.id
            })
            }}
          }

          
          alt="Procesy"
        />
      </div>
    </div>
  );
}
