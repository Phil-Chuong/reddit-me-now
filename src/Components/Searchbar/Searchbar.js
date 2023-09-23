import React from "react";
import './Searchbar.css';
import { BiSearchAlt } from 'react-icons/bi';


function SearchBar() {

    return (
        <div className="Search-Bar">
            <form id='search-form'>
                <input type="text" id='search-input' placeholder="Search"></input>          
                <button className="Search-button" ><BiSearchAlt className="Search-icon" /></button>
            </form>
         </div>
    )
}

export default SearchBar;