import ProduktyCardContainer from "./ProduktyCardContainer";
import ProduktyTableContainer from "./ProduktyTableContainer";
export default function Produkty({produkty,handleChangeCardProdukty,_typ_produktu,isTable}){
    return (
      <div >
  
  {isTable ? (
            <ProduktyCardContainer
              produkty={produkty}
              handleChangeCardProdukty={handleChangeCardProdukty}
              _typ_produktu={_typ_produktu}
            />
          ) : (
            <ProduktyTableContainer
              produkty={produkty}
              handleChangeCardProdukty={handleChangeCardProdukty}
              _typ_produktu={_typ_produktu}
            />
          )}
  
  
      </div>
    );
  }