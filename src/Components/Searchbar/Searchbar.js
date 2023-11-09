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
        dispatch(searchPosts());
    }

    return (
        <div className="Search-Bar">
            <form id='search-form' onSubmit={handleSearch}>
                <input 
                    type="text"
                    id='search-input' 
                    placeholder="Search"
                    value={searchResults}
                    onChange={(e) => setSearchResults(e.target.value)}
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