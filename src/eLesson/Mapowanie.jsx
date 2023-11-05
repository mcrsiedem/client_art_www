

{elementy.map((card) => ( {...card, index: index++}
    )).map(((card) => (
     <ElementCard key={card.id} index={index} card={card} elementy={elementy} setElementy={setElementy}></ElementCard>
   )))}