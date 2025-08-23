export function onMouseDownHanlder(
  event,
  grup,
  setGrupyOprawaAll,
  grupyOprawaAll,
  selectedProcesor,
  i
) {
  


          if (event.shiftKey) {
            let indeks_start = sessionStorage.getItem("indeks_start")
            let indeks_stop = i
                setGrupyOprawaAll( grupyOprawaAll
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
      setGrupyOprawaAll(
      grupyOprawaAll
      .map(x => {return { ...x, select: false}})
      .map((t,indeks) => {
        if (t.global_id == grup.global_id) {
          return { ...t, select: true};
        } else {
          return t;
        }
      })
    );
         }

                              if (event.ctrlKey) {
                            setGrupyOprawaAll(
      grupyOprawaAll
      .map((t,indeks) => {
        if (t.global_id == grup.global_id) {
          return { ...t, select: !t.select};
        } else {
          return t;
        }
      })
    );
         }


          sessionStorage.setItem("indeks_start",i)

          
}
