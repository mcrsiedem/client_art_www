export function onContextMenuHanlder(
  event,
  wykonanie,wykonania,setWykonania,
  fechparametryTechnologiiDetails,
  
) {

  // if(prevet){

  // }
  
    event.preventDefault();
    setWykonania(
      wykonania
        .map((x) => {
          return { ...x, show: false };
        })
        .map((t) => {
          if (t.global_id == wykonanie.global_id) {
            return { ...t, show: true };
          } else {
            return t;
          }
        })
    );

    // if (grup.typ_grupy != 1) {
    //   fechparametryTechnologiiDetails(grup.zamowienie_id, grup.technologia_id);
    // } else {
    //   setProcesyElementowTech([]);
    // }
  
}
