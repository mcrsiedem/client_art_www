import React from "react";
import '../Druk/Druk.css';


import axios from "axios";

class Wydany_papier_row extends React.Component{

    constructor(props){
        super(props);
        this.state={
             notes : [],
             showDesc: false,
             showMinus: false
             
        };






    }

 minusTrue(){
      //  this.props.updateDruk(this.props.id) 
     // this.props.nazwa==='Wydrukowane' ? this.setState({showMinus:true}): null

     if(this.props.czy_jest==='Przygotowany' ){
        this.setState({showMinus:true})
        console.log('minus true',this.props.nazwa); 
     }
        
      }

 componentDidMount(){

    this.minusTrue();


    }

    


render(){
    const handleSend = () => {
        this.props.updateDruk(this.props.id) 
        this.setState({showMinus:true})
      }

      const handleSendMinus = () => {
        this.props.updateDrukNiewydrukowane(this.props.id)
        this.setState({showMinus:false})
      }

      const toggleDesc = ()=>{
        //zmiana setShowDesc na odwrotność aktualnego stanu
        this.setState(prevState => ({
            showDesc: !prevState.showDesc
          }));
  
    }

      




    return (

      
   
     <div className ="note" >
    <p onClick={toggleDesc}> {this.props.nrZlecenia} {this.props.rokZlecenia}   {this.props.title}  {this.props.typ}</p> 
    {this.state.showDesc &&
                (
                <div className ="description">{this.props.body} papier:  {this.props.format} <div className="poczatek">Początek druku: {this.props.poczatekDruku}</div> <div className="poczatek">Uwagi: {this.props.uwagi}</div> </div>
                )}
    <button id={this.props.id} className = {this.props.czy_jest==='Przygotowany' ? 'przygotowane':'niewydrukowane'} onClick={ handleSend}>Wydany</button>
    {this.state.showMinus &&
                (
                  <button className="delete" onClick={handleSendMinus}>-</button>
                )}
     </div>
     
 
     );

}

}
export default Wydany_papier_row;