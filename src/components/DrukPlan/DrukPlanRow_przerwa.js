import React, { useState } from "react";
import style from '../DrukPlan/DrukPlan.module.css';




function DrukPlanRow_przerwa (props){

  
  const [Czasdruku,setCzasdruku] = useState('');


    return (

<div className={style.bodyprzerwa+ ' '+style.note}>
 {props.czasDruku}
</div>
 
     );

}


export default DrukPlanRow_przerwa;