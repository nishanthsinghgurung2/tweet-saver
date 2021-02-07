import React, { useState } from 'react';
import './App.css';
import SearchTweet from './components/SearchTweet';
import SearchedTweets from './components/SearchedTweets';

const App =() => {
  let tweetsStoredInLocalStorage = JSON.parse(localStorage.getItem('savedTweets'));
  const [tweets, setTweets] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedTweets, setSelectedTweets] = useState(tweetsStoredInLocalStorage? tweetsStoredInLocalStorage: []);
  let selectedTweetsDropped = [];
  let savedTweets = [];
  
  // Searches for top 10 tweets of given search term.
  // Makes api request to the local server running at port 3000.
  const searchTweet = async(searchTerm) => {
    setLoading(true);
    try {
      let response = await fetch(`http://localhost:3000/searchTweets/${searchTerm}`);
      let tweets = await response.json();
      setError(false);
      setLoading(false);
      let specificDataFromTweets = [];
      specificDataFromTweets = tweets && tweets.statuses && tweets.statuses.map(tweet => {
        return {
          text: tweet? tweet.text: '',
          id: tweet? tweet.id: '',
          userName: tweet && tweet.user ? tweet.user.name: '',
          screenName: tweet && tweet.user? tweet.user.screen_name: '',
          profile_image_url: tweet && tweet.user? tweet.user.profile_image_url: '',
          date: tweet? (new Date(tweet.created_at)).toLocaleDateString(): ''
        };
      })
     
      setTweets(specificDataFromTweets);
    } catch(error) {
      setError(true);
      setLoading(false);
      console.log('Error occured:', error);
    }


  };

  // When the tweet is dropped to the saved tweets container
  // remove the tweet from searchedTweets list and add it to
  // savedTweets list
  const onDrop = (event) => {
    event.preventDefault();
    const index = event.dataTransfer.getData("index");
    const tweet = tweets[index];
    removeTweetFromSearchList(index);
    saveTweet(tweet);
  };

  // Remove tweet from searched Tweets list
  const removeTweetFromSearchList = (index) => {
    let tweetsList = [...tweets ];
    tweetsList.splice(index, 1);
    setTweets(tweetsList);
  };

  // Save dropped tweet in the state and also on local storage
  const saveTweet = (tweet) => {
    selectedTweetsDropped = [...selectedTweets, tweet];
    setSelectedTweets(selectedTweetsDropped);
    localStorage.setItem('savedTweets', JSON.stringify(selectedTweetsDropped));
  };
  
  // Gets called when an element is dragged over a drop target.
  const onDragOver = (event) => {
    event.preventDefault();
  };

  savedTweets = JSON.parse(localStorage.getItem('savedTweets'));
  
  return (
    <div className="TweetSaverApp" data-testid="TweetSaverApp">
      <header>
        <h1>Tweet Saver</h1>
        <hr/>
      </header>
      <main className="tweetsBody">
        <div className="container searchedTweetsMain" data-testid="searchedTweetsMain">
          <SearchTweet searchTweet={searchTweet}  />
          {error? <div className="searchError" data-testid="searchError">Error fetching Tweets</div>: 
            (loading? <div data-testid="searchLoading">Loading...</div> : <SearchedTweets tweets={tweets} draggable={true} />)}
        </div>
        <div className="container savedTweets" data-testid="savedTweets" onDragOver={(event) => onDragOver(event)} onDrop={(event) => onDrop(event)}>
          <div className="savedTweetsHeading">Saved Tweets</div>
          <SearchedTweets tweets={savedTweets} draggable={false} />
        </div>
      </main>
    </div>
  );
}

export default App;
