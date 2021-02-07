import React, { useState } from 'react';
import './SearchTweet.css';

const SearchTweet = (props) => {
    const [searchText, setSearchText] = useState('');

    // Calls the searchTweet method callback with passed search text
    const searchTweet = (e) => {
        e.preventDefault();
        props.searchTweet(searchText);
    };

    // Updates the input field text value
    const updateSearchText = (e) => {
        setSearchText(e.target.value);
    };

    return (
        <form className="searchTweet" data-testid="searchTweet" onSubmit={searchTweet}>
            <input className="searchTxt" data-testid="searchTxt" type="text" placeholder="Search Twitter" onChange={updateSearchText}/>
            <button className="searchBtn" data-testid="searchBtn"><img src="https://cdn.iconscout.com/icon/free/png-256/search-2130850-1794981.png" alt="Search" /></button>
        </form>
    );
};

export default SearchTweet;