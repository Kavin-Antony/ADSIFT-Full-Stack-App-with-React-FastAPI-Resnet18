import Sidebar from './Sidebar';
import Header from './Header';
import Categories from './Categories';
import AudioPlayer from './AudioPlayer';
import '../styles/Home.css';

const Home = () => {
  return (
    <div className="app">
      <Sidebar />
      <div className="main-content">
        <Header />
        <Categories />
      </div>
      <div className="audio-player-container">
        <AudioPlayer />
      </div>
    </div>
  );
};

export default Home;
