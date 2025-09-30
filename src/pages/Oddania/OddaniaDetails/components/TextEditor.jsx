import React, { useContext, useState } from 'react';
import styles from './TextEditor.module.css'; // Importuj jako obiekt!
import axios from "axios";
import { IP } from 'utils/Host';
import { TechnologyContext } from 'context/TechnologyContext';
import { useNavigate } from 'react-router-dom';
import { AppContext } from 'context/AppContext';


const TextEditor = ({grup,mini}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(grup.uwagi);
  const techContext = useContext(TechnologyContext);
  const grupyOprawaAll = techContext.grupyOprawaAll;
  const setGrupyOprawaAll = techContext.setGrupyOprawaAll;
  const navigate = useNavigate();

      const appContext = useContext(AppContext)
    
      const oddaniaGrupy =appContext.oddaniaGrupy;
      const setOddaniaGrupy =appContext.setOddaniaGrupy
  const handleSave = () => {



  axios.put(IP + "oddania_uwagi/"+ sessionStorage.getItem("token"),[text, grup.global_id,grup.zamowienie_id])
    .then((res) => {

       if(res.data =='OK'){
        
    setOddaniaGrupy(
      oddaniaGrupy.map((t) => {
        if (t.global_id == grup.global_id) {
          return {...t,
            uwagi: text,
      
          }
        } else {
          return t;
        }
      })
    );

      }else navigate("/Login");

   

    
    });


    setIsEditing(false);
  };

  const handleCancel = () => {
    setText(grup.uwagi)
    setIsEditing(false);
  };

  const handleScroll = (e) => {
    // Zapobiega domyślnemu zachowaniu - przewijaniu
    e.preventDefault(); 
  };
  return (
    <div  className={mini? styles.editorContainerMini :styles.editorContainer}>
      <textarea
      //  onWheel={handleScroll}
      // disabled={mini}
        className={styles.editorTextarea}
        value={text}
        // placeholder='Uwagi do oprawy...'
        onFocus={() => setIsEditing(true)}
        onChange={(e) => setText(e.target.value)}
      />

      {/* Warunkowo dodaj nakładkę, jeśli isEditing jest true */}
      {isEditing && <div className={styles.overlay} />}

      {isEditing && (
        <div className={styles.editorControls}>
          <button className={styles.btnCancel} onClick={handleCancel}>Anuluj</button>
          <button className={styles.btnSave} onClick={handleSave}>Zapisz</button>
        </div>
      )}
    </div>
  );
};

export default TextEditor;