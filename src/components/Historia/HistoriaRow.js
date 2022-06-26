import React from "react";
import '../Historia/Historia.css';


import axios from "axios";

class HistoriaRow extends React.Component{

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

     if(this.props.status==='Falcowanie'){
      this.setState({showMinus:true})
      this.setState({showSfalcowane:true})

   }
        
    }

      // sfalcowaneTrue(){
      //  if(this.props.status==='W trakcie falcowania'){
      //     this.setState({showSfalcowane:true})
    
      //  }
  
          
      //   }

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

            <p onClick={toggleDesc}> {this.props.data} {this.props.user}   {this.props.kategoria}  {this.props.typ}  : {this.props.spedycja}</p> 
 



     </div>
     
 
     );

}

}
export default HistoriaRow;