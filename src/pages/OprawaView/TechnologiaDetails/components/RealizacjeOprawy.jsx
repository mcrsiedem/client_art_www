import React, {useContext, } from "react";
import style from "./RealizacjeOprawy.module.css";
import { TechnologyContext } from "context/TechnologyContext";

export default function RealizacjeOprawy({ grup }) {
  const techContext = useContext(TechnologyContext);
  const setGrupyOprawaAll = techContext.setGrupyOprawaAll;
  const grupyOprawaAll = techContext.grupyOprawaAll;
  return (
    <tr className={style.container}>
      <td ></td>
      <td ></td>
      <td ></td>
      <td ></td>
      <td ></td>
      <td ></td>
      <td ></td>
      <td ></td>
      <td ></td>
      <td >s</td>
       </tr>
  );
}


