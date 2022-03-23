import './App.css';
import Header from './components/Header';
import GameBoard from './components/GameBoard';

const App = () => {
  return (
    <div className="App">
      <Header />
      <div className="content">
        <GameBoard />
      </div>
    </div>
  );
}

export default App;