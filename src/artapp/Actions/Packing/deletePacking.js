const deletePacking = (row, pakowanie ,setPakowanie) => {





    let pakowanieEdit = pakowanie.slice()  


    if (pakowanie.length > 1) {
        

        pakowanieEdit = pakowanieEdit.filter((p) => p.indeks !== row.indeks);

        pakowanieEdit
        .map((p) => {
            if (p.indeks > row.indeks) {
              p.indeks--
            }
          });
    }



      pakowanieEdit.sort((a, b) => a.indeks - b.indeks);
      setPakowanie(pakowanieEdit);
  
  };

  export {deletePacking}