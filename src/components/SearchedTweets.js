import './SearchedTweets.css';
const SearchedTweets = ({ draggable, tweets}) => {
    // onDragStart pass the index to the parent component
    const onDragStart = (event, index) => {
        event.dataTransfer.setData("index", index);
    };

    // If no tweets, display no tweets mesage
    if(!tweets || tweets.length === 0 || !Array.isArray(tweets)) {
        return <div>No tweets</div>;
    }
    
    return(
        <div className='searchedTweets' data-testid='searchedTweets'>
            {tweets.map((tweet, index) =>
                <div 
                    key={index}
                    data-testid={`tweet${index}`}
                    id={`tweet${index}`}
                    className='tweet'
                    index={index}
                    draggable={draggable? "true": "false"}
                    onDragStart={(event) => onDragStart(event, index)}
                >
                    <div className="profilePic">
                        <img src={tweet.profile_image_url} alt="profile" />
                    </div>
                    <div data-testid="profileDetails" className="profileDetails">
                        <div className="profileDetailsFirstRow">
                            <span className="userName">{tweet.userName}</span>
                            <span className="screenName">@{tweet.screenName}</span>
                            <span className="tweetDate">{tweet.date}</span>
                        </div>
                        <div>
                            <div>{tweet.text}</div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SearchedTweets;