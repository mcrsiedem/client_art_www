export function onContextMenuHanlder(
event,grup,setOddaniaGrupy,oddaniaGrupy,prevet
) {

  if(prevet){
    event.preventDefault();
  }
  
  if (grup.typ_grupy != 1) {
    setOddaniaGrupy(
      oddaniaGrupy
        .map((x) => {
          return { ...x, show: false };
        })
        .map((t) => {
          if (t.global_id == grup.global_id) {
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
}
