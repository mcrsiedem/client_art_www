import React from "react";
import '../Falc/Falc.css';


import axios from "axios";

class FalcRow extends React.Component{

    constructor(props){
        super(props);
        this.state={
             notes : [],
             showDesc: false,
             showMinus: false,
             showSfalcowane: false
             
        };






    }

 minusTrue(){
     if(this.props.status==='Sfalcowane'){
        this.setState({showMinus:true})
       // console.log('minus true',this.props.status); 
     }

     if(this.props.status==='W trakcie falcowania...'){
      this.setState({showMinus:true})
      this.setState({showSfalcowane:true})

   }
        
    }

      sfalcowaneTrue(){
       if(this.props.status==='W trakcie falcowania'){
          this.setState({showSfalcowane:true})
    
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

      const handleSendWtrakcie = () => {
        this.props.wtrakcie(this.props.id) 
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
                (        <div className ="description">{this.props.body}</div>                )
    }



    {/* start */}   
    <button id={this.props.id} className = {this.props.status==='W trakcie falcowania...' ? 'wydrukowane':'niewydrukowane'} onClick={ handleSendWtrakcie}>START</button>   

    {/* sfalcowane */}     
    {this.state.showMinus &&  (        
    <button id={this.props.id+'s'} className = {this.props.status==='Sfalcowane' ? 'wydrukowane':'niewydrukowane'} onClick={ handleSend}>Sfalcowane</button>        )   
     }
       
    {/* minus */}
    {this.state.showMinus &&  (         
    <button className="delete" onClick={handleSendMinus}>-</button>               )    
    }





     </div>
     
 
     );

}

}
export default FalcRow;