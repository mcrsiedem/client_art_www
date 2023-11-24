// import iconCopy from "../../../../../svg/copy.svg";
// import iconTrash from "../../../../../svg/trash2.svg";
import style from "./ElementTable.module.css";
import { _papiery } from "../../api";
import ElementTableHeader from "./ElementTableHeader";



export default function ElementTable({elementy,setElementy,handleChangeCardElementy,selected_papier,setSelected_papier,fragmenty,setFragmenty}) {
  return (
    <div className={style.elementCard}>
        
      <ElementTableHeader
        // card={card}
        elementy={elementy}
        setElementy={setElementy}
        fragmenty={fragmenty}
        setFragmenty={setFragmenty}
      />

      <div className={style.main}>
  
<table className={style.table}>
<thead>
          <tr>
            <th className="th_1">Person Name</th>
            {/* <th className="th_1">Person Name</th>
            <th className="th_1">Person Name</th>
            <th className="th_1">Person Name</th>
            <th className="th_1">Person Name</th>
            <th className="th_1">Person Name</th>
            <th className="th_1">Person Name</th>
            <th className="th_1">Person Name</th> */}
          </tr>

        </thead>
        <tbody>

        {elementy.map((row) => {
                                return (
                                    <tr
                                    key={row.id}
                                    // onDoubleClick={(node, event) => {
                               
                                    //     setOpenModal(true);
                                    //     setRow({ id: row.id, user: row.user });
                                    // }}
                                    >
                                            <td>1</td>
                                    </tr>
                                );
                                })}
    
        </tbody>
</table>

   
      </div>
      {/* <CardCenter
        card={card}
        setElementy={setElementy}
        handleChangeCardElementy={handleChangeCardElementy}
        selected_papier={selected_papier}
        setSelected_papier={setSelected_papier}
      /> */}

    </div>
  );
}


