import React from "react";
import './Header.css'
import { FaRedditSquare } from 'react-icons/fa';
import SearchBar from "../Searchbar/Searchbar";



function Header() {
    return (
        <header >
            <div className="Logo">                  
                <FaRedditSquare className="reddit-logo"/>
                <p className="me-now"><span style={{color: 'red'}}>Reddit</span>Me Now</p>                                                    
            </div>
            <SearchBar />  
        </header>
    )
};


export default Header;