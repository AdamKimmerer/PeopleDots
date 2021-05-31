import React,{useState,useEffect} from 'react';

import './TempPosts.scss';

function TempPosts() {
    const [data,setData]=useState([]);

    const getData = () => {
        fetch('data/postsList.json')
            .then(response => response.json())
            .then(data => setData(data));
    }
    
    useEffect(()=>{
        getData()
      },[])

    const renderPosts = () => {
        var tweets = data.map((tweet, i) => (
            <li key={i}>
                <div className="profile">
                    <div className="profile-image">
                        <img alt="profile img" src={tweet.profile_img} />
                    </div>
                    <div className="profile-text">
                        <div className="profile-text-name">
                            {tweet.name}
                        </div>
                        <div className="profile-text-user">
                            {tweet.user_name}
                        </div>
                    </div>
                </div>
                <div className="caption">
                    {tweet.caption}
                </div>
                <div className="media">
                    <img alt="media" src={`images/tweet/${tweet.media}`} />
                </div>
                <div className="date">
                    {tweet.date}
                </div>
                <div className="likes">
                    <span>
                        <i className="far fa-heart"></i> {tweet.likes}
                    </span>
                    <span>
                        <i className="far fa-comment"></i> {tweet.comments} people are Tweeting about this
                    </span>
                </div>
            </li>
        ))

        return tweets;
    }
    
    return (
        <ul className="tweetList">
            { renderPosts() }
        </ul>
    );
}

export default TempPosts;