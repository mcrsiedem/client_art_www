import react from "react";
//import {MdSearch} from 'react-icons/md';

const Search = ({handlerznajdz}) =>{
    return <div className="search">

        <input onChange={(event)=>handlerznajdz(event.target.value)}type='text' placeholder="Szukaj..." />
    </div>;


};

export default Search;