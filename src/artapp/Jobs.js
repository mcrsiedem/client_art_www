import React, {Component} from "react";
import Row from "./Row";

// function Jobs(){
//     return (
//     <div>
//          jobs
//     </div>
//     );
// }

class Jobs extends Component{
    render(){
        return(
            <div>
                <Row/>
                <Row/>
                <Row/>
            </div>
        );
    }
}
export default Jobs;