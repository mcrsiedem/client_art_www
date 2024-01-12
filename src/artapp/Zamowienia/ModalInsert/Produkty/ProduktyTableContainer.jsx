
import Table from './Table';
import style from './ProduktyTableContainer.module.css'


export default function ProduktyTableContainer({produkty,handleChangeCardProdukty}){


    return (
      <>
        <div id="Produkty" className={style.produkty}>
          <Table produkty={produkty}/>
        </div>
      </>
    );
}   


