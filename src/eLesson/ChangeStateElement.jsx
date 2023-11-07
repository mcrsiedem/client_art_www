
//tam gdzie useState elementy
function handleChangeCardElementy(card) {
    setElementy(
      elementy.map((t) => {
        if (t.id === card.id) {
          return card;
        } else {
          return t;
        }
      })
    );
  }

  // tam gdzie input
  const nakladHandler =(e)=>{     handleChangeCardElementy({...card, naklad: e.target.value})   }