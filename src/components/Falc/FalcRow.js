import React from "react";
import '../Falc/Falc.css';


import axios from "axios";

class FalcRow extends React.Component{

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

     if(this.props.status==='Sfalcowane'){
        this.setState({showMinus:true})
        console.log('minus true',this.props.status); 
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

      
   
     <div id={this.props.id+"x"} className ="note" >
    <p onClick={toggleDesc}> {this.props.nrZlecenia} {this.props.rokZlecenia}   {this.props.title}  {this.props.typ}</p> 
    {this.state.showDesc &&
                (
                <div className ="description">{this.props.body}</div>
                )}
    <button id={this.props.id} className = {this.props.status==='Sfalcowane' ? 'wydrukowane':'niewydrukowane'} onClick={ handleSend}>Sfalcowane</button>
    {this.state.showMinus &&
                (
                  <button className="delete" onClick={handleSendMinus}>-</button>
                )}
     </div>
     
 
     );

}

}
export default FalcRow;