import React from "react";
import '../Papier/Papier.css';


import axios from "axios";

class PapierRow extends React.Component{

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

     if(this.props.czy_jest==='Jest'){
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
    <p onClick={toggleDesc}> {this.props.nrZlecenia}  {this.props.rokZlecenia}  {this.props.typ} {this.props.klient} {this.props.praca.substring(0,20)} </p> 
    {this.state.showDesc &&
                (
                <div className ="description">{this.props.praca.substring(20,200)}  </div>
                )}
    <button id={this.props.id} className = {this.props.czy_jest==='Jest' ? 'wydrukowane':'niewydrukowane'} onClick={ handleSend}>Papier</button>
    {this.state.showMinus &&
                (
                  <button className="delete" onClick={handleSendMinus}>-</button>
                )}
     </div>
     
 
     );

}

}
export default PapierRow;