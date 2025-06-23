import Sidebar_AD from './Sidebar_AD';
import Header from './Header';
import Categories from './Categories';
import AudioPlayer_AD from './AudioPlayer_AD';

import '../styles/Home_AD.css';

const Home_AD = () => {
  return (
    <div className="app">
      <Sidebar_AD />
      <div className="main-content">
        <Header />
        <Categories />
      </div>
      <div className="audio-player-container">
        <AudioPlayer_AD />
      </div>
    </div>
  );
};

export default Home_AD;
