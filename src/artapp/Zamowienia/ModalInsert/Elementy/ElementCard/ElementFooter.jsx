
import style from "./ElementFooter.module.css"
export default    function CardFooter({fragmenty,setFragmenty,card}){
    return(
      <>
  
        <div className={style.footer}>
          {
            fragmenty
              .filter((fragmentCard) => fragmentCard.element_id === card.id)
            //   .filter((fragmentCard) =>  fragmentCard.produkt_id === card.produkt_id)
            //  .filter((fragmentCard) =>  fragmentCard.index === card.index)
            .map(((fragmentCard) => (
              <FragmentCard key={fragmentCard.id} fragmentCard={fragmentCard} fragmenty={fragmenty} setFragmenty={setFragmenty} />
            )))
          }
        </div>
  
      </>
    )
   }

   function FragmentCard({fragmentCard}){
  
    return(<>
  <div className={style.fragmentCard}>
      fragment id: {fragmentCard.id}  fragment index:{fragmentCard.index}  element id: {fragmentCard.element_id} 
  </div>
  
    </>)
   }