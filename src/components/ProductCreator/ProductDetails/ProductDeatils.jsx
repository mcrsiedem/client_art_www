import { useState,useContext,useEffect } from 'react';
import style from './ProductDeatils.module.css'
import { AppContext } from 'context/AppContext';
export default function ProductDeatils(){

    const contextApp = useContext(AppContext);

    const[showProduct,setShowProduct] = useState(false)
    const[binding,setBinding] = useState(contextApp.bindingType.map((bind) => ( {...bind, isSelcted: false}))) // dodaje do obiektu pole isSelected
    const[products,setProducts] = useState([
      {id : 1,
      nazwa: "Okładka",
      strony: 4},
      {id : 2,
        nazwa: "Środek",
        strony: null},
    ]) 

    const[netto,setNetto] = useState([
      {x : 210,
      y:297,
      }
    ]) 

    return(
        <div className={style.container}>

            <row className={style.bindingContainer}>
                {binding
                .filter(bind1 => bind1.id !==1) // oprawa id 1 n/d
                .map(((bind) => (
                    <CardBinding bind={bind} binding={binding} setBinding={setBinding} setShowProduct={setShowProduct}/>
                )))}

            </row>

{showProduct &&          <row className={style.bindingContainer}>
            {products
                .map(((product) => (
                    <CardProduct product={product} products={products} setProducts={setProducts}/> 
                )))}
        
            </row>
}
   
{showProduct &&    <row className={style.bindingContainer}>
      

  <CardNettoX netto={netto} setNetto={setNetto}/>
  <CardNettoY netto={netto} setNetto={setNetto}/>
        
            </row>}

            <row className={style.bindingContainer}>
            <button className={style.btn}>Dodaj</button>
       
            </row>
           
           
           

        </div>
    )
}

const clikBindingHandler = ({bind,binding,setBinding,setShowProduct}) => {
  setShowProduct(true)
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



const CardBinding = ({bind,binding,setBinding,setShowProduct} ) => {

      return (
        <div
          onClick={() => clikBindingHandler({ bind, binding, setBinding,setShowProduct })}
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


  const CardProduct = ({product,products,setProducts} ) => {

    const changeProductHandler = (product) => {

      setProducts(
        products.map((p) => {
          if (p.id === product.id) {
            return product;
          } else {
            return  p;
          }
        })
      );
    }
    return (
      <div
        // onClick={() => clikBindingHandler({ bind, binding, setBinding })}
        className={style.cardProduct}
      >
         {product.nazwa} 
        <input

          className={style.cardInput}
          defaultValue={product.strony}
          placeholder='...'
          type="text"
           onChange={(e) => changeProductHandler({ ...product, strony: e.target.value })}
        ></input> str.
    
      </div>
    );
  
};

const CardNettoX = ({netto,setNetto} ) => {

  return (
    <div
      // onClick={() => clikBindingHandler({ bind, binding, setBinding })}
      className={style.cardNetto}
    >
       {/* {product.nazwa}  */}
       Format X
      <input

        className={style.cardInputNetto}
        defaultValue={netto.x}
        placeholder='...'
        type="text"
        //  onChange={() => changeProductHandler({ product, products, setProducts })}
      ></input> mm.
  
    </div>
  );

};

const CardNettoY = ({netto,setNetto} ) => {

  return (
    <div
      // onClick={() => clikBindingHandler({ bind, binding, setBinding })}
      className={style.cardNetto}
    >
       {/* {product.nazwa}  */}
       Format Y
      <input

        className={style.cardInputNetto}
        defaultValue={netto.y}
        placeholder='...'
        type="text"
        //  onChange={() => changeProductHandler({ product, products, setProducts })}
      ></input> mm.
  
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