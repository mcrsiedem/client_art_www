export function onMouseDownHanlder(
  event,
  grup,
  setGrupyOprawaAll,
  grupyOprawaAll,
  selectedProcesor,
  i,
  sortowanieOprawy,sortOprawa
) {
  


          if (event.shiftKey) {
            let indeks_start = sessionStorage.getItem("indeks_start")
            let indeks_stop = i
                setGrupyOprawaAll( sortOprawa(grupyOprawaAll,sortowanieOprawy)
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
      sortOprawa(grupyOprawaAll,sortowanieOprawy)
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
      sortOprawa(grupyOprawaAll,sortowanieOprawy)
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
