import React, { useState } from "react";
import './Searchbar.css';
import { BiSearchAlt } from 'react-icons/bi';
import { useDispatch } from "react-redux";
import { searchPosts } from "../../API/RedditSlice";


function SearchBar() {

    const [searchResults, setSearchResults] = useState('');
    const dispatch = useDispatch();

    const handleSearch = (e) => {
        e.preventDefault();
        dispatch(searchPosts(searchResults));
        // setSearchResults('');
    }

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            dispatch(searchPosts(searchResults));
            // setSearchResults('');
        }       
    }


    return (
        <div className="Search-Bar">
            <form id='search-form'>
                <input 
                    type="text"
                    id='search-input' 
                    placeholder="Search"
                    value={searchResults}
                    onChange={(e) => setSearchResults(e.target.value)}
                    onKeyPress={handleKeyPress}
                />       
                <button className="Search-button" >
                    <BiSearchAlt 
                    className="Search-icon" 
                    onClick={handleSearch}/>
                </button>
            </form>
         </div>
    )
}

export default SearchBar;