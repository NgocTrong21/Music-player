import "./App.css";
import Dashboard from "./components/Dashboard/Dashboard";
import SongPlaylist from "./components/SongPlaylist/SongPlaylist";
import Poster from "./components/Poster/Poster";
import GlobalStyles from "./components/GlobalStyles/GlobalStyles";
import Audio from "./components/Audio/Audio";
function App() {
  return (
    <GlobalStyles>
      <div className="App">
        <img
          src="https://res.cloudinary.com/djqqlrhi0/image/upload/v1666508387/my%20images/music%20images/pexels-sanaan-mazhar-3075993_cfumwf.jpg"
          alt=""
        />
        <div className="mainPage">
          <div className="playList">          
            <Dashboard />
            <Audio/>
            <SongPlaylist />
          </div>
          <Poster />
        </div>
      </div>
    </GlobalStyles>
  );
}

export default App;
