import { useState,useContext,useEffect } from 'react';
import style from './ProductDeatils.module.css'
import { AppContext } from 'context/AppContext';
export default function ProductDeatils(){

    const contextApp = useContext(AppContext);

    const[binding,setBinding] = useState(contextApp.bindingType.map((bind) => ( {...bind, isSelcted: false}))) // dodaje do obiektu pole isSelected
    const[products,setProducts] = useState([
      {id : 1,
      nazwa: "Okładka",
      strony: 4},
      {id : 2,
        nazwa: "Środek",
        strony: 80},
    ]) 

    return(
        <div className={style.container}>

            <row className={style.bindingContainer}>
                {binding
                .filter(bind1 => bind1.id !==1) // oprawa id 1 n/d
                .map(((bind) => (
                    <CardBinding bind={bind} binding={binding} setBinding={setBinding}/>
                )))}

            </row>

            <row className={style.bindingContainer}>
            {products
                .map(((product) => (
                    <CardProduct product={product} products={products} setProducts={setProducts}/>
                )))}
        
            </row>

            <row className={style.bindingContainer}>
            {/* <CardBinding binding={"210"}/>
            <CardBinding binding={"297"}/> */}
        
            </row>

            <row className={style.bindingContainer}>
            <button className={style.btn}>Dodaj</button>
       
            </row>
           
           
           

        </div>
    )
}

const clikBindingHandler = ({bind,binding,setBinding}) => {
  setBinding(
    binding.map((t) => {
      if (t.id === bind.id) {
        return {...t, isSelcted: true};
      } else {
        return  {...t, isSelcted: false};
      }
    })
  );
}


const CardBinding = ({bind,binding,setBinding} ) => {

      return (
        <div
          onClick={() => clikBindingHandler({ bind, binding, setBinding })}
          className={bind.isSelcted ? style.cardBindingSelected : style.cardBinding }
        >
          {bind.nazwa}
          {/* <input
            checked={bind.isSelcted}
            className={style.cardInput}
            type="checkbox"
            onChange={() => clikBindingHandler({ bind, binding, setBinding })}
          ></input> */}
        </div>
      );
    
  };


  const CardProduct = ({product,setProduct} ) => {

    return (
      <div
        // onClick={() => clikBindingHandler({ bind, binding, setBinding })}
        className={style.cardBinding }
      >
        {product.nazwa}
        {/* <input
          checked={bind.isSelcted}
          className={style.cardInput}
          type="checkbox"
          onChange={() => clikBindingHandler({ bind, binding, setBinding })}
        ></input> */}
      </div>
    );
  
};


// const CardBinding = ({ binding }) => {
//   if (binding == "PUR") {
//     return <div className={style.cardBinding}>
//         {binding}
//     </div>;
//   }

//   if (binding == "Hotmelt") {
//     return <div className={style.cardBinding}>
//         {binding}
//     </div>;
//   }

//   if (binding == "Zeszyt") {
//     return <div className={style.cardBinding}>
//         {binding}
//     </div>;
//   }

//   if (binding == "Szystko-klejona") {
//     return <div className={style.cardBinding}>
//         {binding}
//     </div>;
//   }

//   if (binding == "Twarda") {
//     return <div className={style.cardBinding}>
//         {binding}
//     </div>;
//   }



// };