
import style from "./ElementFooter.module.css"
export default    function CardFooter({fragmenty,setFragmenty,card}){
    return(
      <>
  
        <div className={style.footer}>
          {
            fragmenty
            .filter((fragmentCard) => fragmentCard.element_id === card.id)
            .filter((fragmentCard) =>  fragmentCard.produkt_id === card.produkt_id)
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
  
    fragmentCard id: {fragmentCard.id} fragment index:{fragmentCard.index} el id: {fragmentCard.element_id}
    </>)
   }