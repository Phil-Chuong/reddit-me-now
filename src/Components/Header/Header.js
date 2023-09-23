import React from "react";
import './Header.css'
import { FaRedditSquare } from 'react-icons/fa';
import SearchBar from "../Searchbar/Searchbar";



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
            <SearchBar />  
        </header>
    )
};


export default Header;