// tableka z technologiami
import { useRef,useEffect,useContext } from "react";
import style from "./TechnologiaTable.module.css";
import { TechnologyContext } from "context/TechnologyContext";
import { AppContext } from "context/AppContext";
import { getTechnology } from "actions/getTechnolgy";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { IP } from "utils/Host";
export default function TechnologiaTable(){
  const techContext = useContext(TechnologyContext);
  const technology = techContext.technology;
  const setTechnology = techContext.setTechnology;
  const fechparametryTechnologii = techContext.fechparametryTechnologii;
  // const setShowTechnologyStage = techContext.setShowTechnologyStage;
  // const test = techContext.test;

  // const appContext = useContext(AppContext);

  // const setListaPapierow =appContext.setListaPapierow;
  // const setListaPapierowNazwy =appContext.setListaPapierowNazwy;

  // const navigate = useNavigate();

  const effectRan = useRef(false);
  useEffect(() => {
    if (effectRan.current === true) {
      //  fetchTechnologie();
      // const socket = io.connect("http://localhost:3002")
      // console.log(technology)
      // checkToken()
       getTechnology(setTechnology)
    }
    return () => {
      effectRan.current = true;
    };
  }, []);


  // async function checkToken() {
  //   axios.get(IP + "/islogged/" + sessionStorage.getItem("token")).then((res) => {
  //     if (res.data.Status === "Success") {
  //       // fechZamowienia();
  //       // getTechnology(setTechnology)

  //  start()
        
  //     } else {
  //       navigate("/Login");
  //     }
  //   });
  // }

  // const start = async() => {
  //   getTechnology(setTechnology)
  //   const res3 = await axios.get(IP + "lista-papierow");
  //   setListaPapierow([...res3.data]);
  //   const res4 = await axios.get(IP + "lista-papierow-nazwy");
  //   setListaPapierowNazwy([...res4.data]);
  // }

  
return(
    <table>
    <thead>
      <tr>
        <th className={style.col_id}>#</th>
        <th className={style.col_nr}>Nr</th>
        <th className={style.col_rok}>Rok</th> 
        <th className={style.col_tytul}>tytul</th>
       

      </tr>
    </thead>
    <tbody>
      {/* <tr             onDoubleClick={(node, event) => {
        setShowTechnologyStage(true)
      techContext.setRowTechnologia({id: 2})  // zamienić na row

            }}>
         <td>1</td>
    <td>1</td>
    <td>2024</td>
      </tr>
    */}

      {technology?.map((row) => {
        return (
          <tr 
            key={row.id}
            onDoubleClick={(node, event) => {
              fechparametryTechnologii(row.id)
              // setActiveRowId(row.id)
              // setShowTechnologyStage(true);
            }}
            onClick={()=> {
                // setRow(row.id)
            // console.log(row.id)
            }}
          >
            <td>{row.id} </td>
            <td>{row.nr} </td>
            <td>{row.rok} </td>
   
            <td>{row.tytul}</td>

          </tr>
        );
      })}
    </tbody>
  </table>
)
}