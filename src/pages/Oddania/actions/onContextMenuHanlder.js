export function onContextMenuHanlder(
event,grup,setOddaniaGrupy,oddaniaGrupy,prevet,fechOddaniaWykonania
) {
console.log(grup.global_id)
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

  

      fechOddaniaWykonania(grup.global_id);

  }
}
