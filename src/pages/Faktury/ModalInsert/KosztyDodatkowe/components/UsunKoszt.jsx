import { useContext, useState } from "react";
import { AppContext } from "context/AppContext";
import { ModalInsertContext } from "context/ModalInsertContext";
import style from "../KosztyDodatkowe.module.css";

import iconTrash from "assets/trash2.svg";

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

      //             setKosztyDodatkoweZamowienia(
      //   kosztyDodatkoweZamowienia.map((t) => {
      //     if (t.id == koszt.id) {
      //       return {...koszt, delete: true};
      //     } else {
      //       return t;
      //     }
      //   })
      // )


                      handleKosztyDodatkoweZamowienia({
                        ...koszt,
            
                        delete: true
                      });
            // handleRemoveItem(row.indeks, row.id);
            //  setStatus(3)
          }}
          alt="Procesy"
        />
      </div>
    </div>
  );
}
