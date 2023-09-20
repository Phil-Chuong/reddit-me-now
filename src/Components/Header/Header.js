import React from "react";
import './Header.css'
import { FaRedditSquare } from 'react-icons/fa';
import { BiSearchAlt } from 'react-icons/bi';

function Header() {
    return (
        <header className="App-header">
            <div className="header-logo"> 
                <div className="Logo">
                    <FaRedditSquare className="reddit-logo"/>     
                    <p>                    
                        <span style={{color: 'red'}}>Reddit</span> Me Now
                    </p>
                </div>               
            </div>
            <div className="Search-Bar">
                <SearchBar className="Search"/>
            </div>    
        </header>
    )
};

function SearchBar() {
    return (
        <form>
            <input type="text" placeholder="Search" >          
            </input>
            <button className="Search-button"><BiSearchAlt className="Search-icon" /></button>
        </form>
    )
}

export default Header;