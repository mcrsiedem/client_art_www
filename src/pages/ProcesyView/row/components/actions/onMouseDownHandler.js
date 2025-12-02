


export function onMouseDownHandler (event,grupyWykonanAll,setGrupWykonanAll,selectedProcesor,grup,i){

   if (event.shiftKey) {
            let indeks_start = sessionStorage.getItem("indeks_start")
            let indeks_stop = i
                setGrupWykonanAll( grupyWykonanAll
                              .filter(
                (x) => x.procesor_id == selectedProcesor 
              )          

      .map(x => {return { ...x, select: false}})
      .map((t,indeks) => {
        if (indeks >= indeks_start && indeks<= indeks_stop ) {
          return { ...t, select: true};
        } else {
          return t;
        }
      })  );
          }else{
      setGrupWykonanAll(
      grupyWykonanAll
      .map(x => {return { ...x, select: false}})
      .map((t) => {
        if (t.global_id == grup.global_id) {
          return { ...t, select: true};
        } else {
          return t;
        }
      })
    );
         }

                              if (event.ctrlKey) {
                            setGrupWykonanAll(
      grupyWykonanAll
      .map((t) => {
        if (t.global_id == grup.global_id) {
          return { ...t, select: !t.select};
        } else {
          return t;
        }
      })
    );
         }

          sessionStorage.setItem("indeks_start",i)
          sessionStorage.setItem("row_global_id",grup.global_id)
          sessionStorage.setItem("selectedProcesor",selectedProcesor)
  }