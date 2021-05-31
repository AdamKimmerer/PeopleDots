import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Home.scss';

import TempPosts from '../TempPosts/TempPosts';

function Home() {

  useEffect(() => {
    document.body.classList.remove("no-overscroll");
  }, [])

  return (
    <div className="home-container">
        <div className="banner-area">
            <h1>Those People That <br/>Put Dots on Faces</h1>
            <h2>"If you can't see their face, you're going to look at how they're dressed, maybe their stance, their surroundings... You really do see that handshake. You know, it's not about those guys, it's about that handshake."</h2>
            <img alt="banner" src="images/Banner.png"/>
            <p>Ut et cursus aliquam tincidunt et mi est. Tincidunt sit lacus at fermentum porta suscipit. Tempus ultrices nisl, nullam molestie. Id rhoncus magnis eu et et nisl et. Lectus posuere egestas elit ultrices auctor erat maecenas proin eu.</p>
            <Link to="/wizard">
                <button className="home-button">Put dots on things</button>
            </Link>
        </div>
        <TempPosts></TempPosts>
    </div>
  );
}

export default Home;