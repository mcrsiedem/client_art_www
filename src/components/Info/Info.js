import React from "react";
import '../Info/Info.css';



import axios from "axios";

class Info extends React.Component{

    constructor(props){
        super(props);
        this.state={
             zlecenia : [],
             produkty : []
        };
    }

    componentDidMount(){
        this.fechZlecenia();
        this.fechProdukty();

    }

    async fechZlecenia(){
    const res = await axios.get('http://46.41.151.63:3001/api/zlecenianieoddane');
  //  const zlecenia =[...res.data].filter(row=> row.status === "Wydrukowane");
    const zlecenia =[...res.data];
                            
    this.setState({zlecenia});  
    }

    async fechProdukty(){
        const res = await axios.get('http://46.41.151.63:3001/api/produktyAllnieoddane');
        const produkty =[...res.data];
        // const produkty =[...res.data].filter(row=> row.status !== "Wydrukowane")
        //                           .filter(row=> row.status !== "Nowe")
        //                           .filter(row=> row.status !== "Pliki")
        //                           .filter(row=> row.status !== "Akcept")
        //                           .filter(row=> row.status !== "Sfalcowane")
        //                           .filter(row=> row.status !== "Oprawione")
        //                           .filter(row=> row.status !== "Oddane")
        //                           .filter(row=> row.status !== "Uszlachetnione")
        //                           .filter(row=> row.typ !== "Przerwa");
        this.setState({produkty});  
        }





render(){

    const title ='coś'
    const names =['raz','dwa','trzy']
    const nameList = this.state.zlecenia.map(row => <li key={row.id}>{row.klient}</li>)

    // Nowe
    // Pliki
    // Akcept
    // RIP
    // Zaświecone
    // Wydrukowane
    // Sfalcowane
    // Uszlachetnione
    // Oprawione
    // Oddane wykluczone na endpoitcie

    const czasfalcowania = this.state.zlecenia.reduce((czasfalcowania, row) => czasfalcowania + parseInt(row.falcCzas, 10), 0);
    const ilosczlecen = this.state.zlecenia.length;
    
   const zlecenie_do_wydrukowania_h3 = this.state.produkty
    .filter(row=> row.maszyna === "H3")
    .filter(row=> row.typ !== "Przerwa")
    .filter(row=> row.status !== "Wydrukowane")
    .filter(row=> row.status !== "Sfalcowane")
    .filter(row=> row.status !== "Uszlachetnione")
    .filter(row=> row.status !== "Oprawione")
    .filter(row=> row.nazwa !== "Wydrukowane")
    .length;

     
   const przeloty_do_wydrukowania_h3 = this.state.produkty  
   .filter(row=> row.maszyna === "H3")
   .filter(row=> row.typ !== "Przerwa")
   .filter(row=> row.status !== "Wydrukowane")
   .filter(row=> row.status !== "Sfalcowane")
   .filter(row=> row.status !== "Uszlachetnione")
   .filter(row=> row.status !== "Oprawione")
   .filter(row=> row.nazwa !== "Wydrukowane")
   .reduce((przelotyh3, row) => przelotyh3 + parseInt(row.przeloty, 10), 0);

   const czas_do_wydrukowania_h3 = this.state.produkty.  
   filter(row=> row.maszyna === "H3").
   filter(row=> row.typ !== "Przerwa").
   filter(row=> row.status !== "Wydrukowane").
   filter(row=> row.status !== "Sfalcowane").
   filter(row=> row.status !== "Uszlachetnione").
   filter(row=> row.status !== "Oprawione").
   filter(row=> row.nazwa !== "Wydrukowane").
   reduce((czash3, row) => czash3 + parseInt(row.czasDruku , 10), 0);

   const narzady_h3 = this.state.produkty.  
   filter(row=> row.maszyna === "H3").
   filter(row=> row.typ !== "Przerwa").
   filter(row=> row.status !== "Wydrukowane").
   filter(row=> row.status !== "Sfalcowane").
   filter(row=> row.status !== "Uszlachetnione").
   filter(row=> row.status !== "Oprawione").
   filter(row=> row.nazwa !== "Wydrukowane").
   reduce((narzady, row) => narzady + parseInt(row.arkusze , 10), 0);

   //----------H1
   const zlecenie_do_wydrukowania_h1 = this.state.produkty.  
   filter(row=> row.maszyna === "H1").
   filter(row=> row.typ !== "Przerwa").
   filter(row=> row.status !== "Wydrukowane").
   filter(row=> row.status !== "Sfalcowane").
   filter(row=> row.status !== "Uszlachetnione").
   filter(row=> row.status !== "Oprawione").
   filter(row=> row.nazwa !== "Wydrukowane").
   length;

   const przeloty_do_wydrukowania_h1 = this.state.produkty.  
   filter(row=> row.maszyna === "H1").
   filter(row=> row.typ !== "Przerwa").
   filter(row=> row.status !== "Wydrukowane").
   filter(row=> row.status !== "Sfalcowane").
   filter(row=> row.status !== "Uszlachetnione").
   filter(row=> row.status !== "Oprawione").
   filter(row=> row.nazwa !== "Wydrukowane").
   reduce((przelotyh1, row) => przelotyh1 + parseInt(row.przeloty, 10), 0);

   const czas_do_wydrukowania_h1 = this.state.produkty.  
   filter(row=> row.maszyna === "H1").
   filter(row=> row.typ !== "Przerwa").
   filter(row=> row.status !== "Wydrukowane").
   filter(row=> row.status !== "Sfalcowane").
   filter(row=> row.status !== "Uszlachetnione").
   filter(row=> row.status !== "Oprawione").
   filter(row=> row.nazwa !== "Wydrukowane").
   reduce((czash1, row) => czash1 + parseInt(row.czasDruku , 10), 0);

   const narzady_h1 = this.state.produkty.  
   filter(row=> row.maszyna === "H1").
   filter(row=> row.typ !== "Przerwa").
   filter(row=> row.status !== "Wydrukowane").
   filter(row=> row.status !== "Sfalcowane").
   filter(row=> row.status !== "Uszlachetnione").
   filter(row=> row.status !== "Oprawione").
   filter(row=> row.nazwa !== "Wydrukowane").
   reduce((narzady, row) => narzady + parseInt(row.arkusze , 10), 0);

    //----------------XL
    const zlecenie_do_wydrukowania_xl = this.state.produkty.  
    filter(row=> row.maszyna === "XL").
    filter(row=> row.typ !== "Przerwa").
    filter(row=> row.status !== "Wydrukowane").
    filter(row=> row.status !== "Sfalcowane").
    filter(row=> row.status !== "Uszlachetnione").
    filter(row=> row.status !== "Oprawione").
    filter(row=> row.nazwa !== "Wydrukowane").
    length;

    const przeloty_do_wydrukowania_xl = this.state.produkty.  
   filter(row=> row.maszyna === "XL").
   filter(row=> row.typ !== "Przerwa").
   filter(row=> row.status !== "Wydrukowane").
   filter(row=> row.status !== "Sfalcowane").
   filter(row=> row.status !== "Uszlachetnione").
   filter(row=> row.status !== "Oprawione").
   filter(row=> row.nazwa !== "Wydrukowane").
   reduce((przelotyh3, row) => przelotyh3 + parseInt(row.przeloty, 10), 0);

   const czas_do_wydrukowania_xl = this.state.produkty.  
   filter(row=> row.maszyna === "XL").
   filter(row=> row.typ !== "Przerwa").
   filter(row=> row.status !== "Wydrukowane").
   filter(row=> row.status !== "Sfalcowane").
   filter(row=> row.status !== "Uszlachetnione").
   filter(row=> row.status !== "Oprawione").
   filter(row=> row.nazwa !== "Wydrukowane").
   reduce((czasxl, row) => czasxl + parseInt(row.czasDruku , 10), 0);

   const narzady_xl = this.state.produkty.  
   filter(row=> row.maszyna === "XL").
   filter(row=> row.typ !== "Przerwa").
   filter(row=> row.status !== "Wydrukowane").
   filter(row=> row.status !== "Sfalcowane").
   filter(row=> row.status !== "Uszlachetnione").
   filter(row=> row.status !== "Oprawione").
   filter(row=> row.nazwa !== "Wydrukowane").
   reduce((narzady, row) => narzady + parseInt(row.arkusze , 10), 0);




    return (
        <div>
            <div className= "maszyna naglowek pogrubione">
             <p >Ilość zleceń w produkcji :  {ilosczlecen} </p>   
            </div>

            <div className= "maszyna">
                <p>Do wydrukowania na H1 :</p>
                <p>przeloty:  {przeloty_do_wydrukowania_h1} ark.  </p>
                <p>narządy:  {narzady_h1}   </p>
                <p>czas druku:  {parseInt(czas_do_wydrukowania_h1/60,10)} h  </p>
            </div>

            <div className= "maszyna">
                <p>Do wydrukowania na XL :</p>
                <p>przeloty:  {przeloty_do_wydrukowania_xl} ark.  </p>
                <p>narządy:  {narzady_xl}   </p>
                <p>czas druku:  {parseInt(czas_do_wydrukowania_xl/60,10)} h  </p>
            </div>
            
            <div className= "maszyna">
                <p>Do wydrukowania na H3 :</p>
                <p>przeloty:  {przeloty_do_wydrukowania_h3} ark.  </p>
                <p>narządy:  {narzady_h3}   </p>
                <p>czas druku:  {parseInt(czas_do_wydrukowania_h3/60,10)} h  </p>
            </div>
            
            {/* <div className= "maszyna">
               <p>Czas falcowania:  {czasfalcowania} h</p> 
            </div> */}


        
            
        </div>
    );
}
}
export default Info;