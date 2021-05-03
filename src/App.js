import './App.css';
import { LabelContainer, NotesContainer } from './Components';

function App() {
  return (
    <div className="App">
      <h2>My Notes app - noteSUP</h2>
      <div className="grid-container">
        <LabelContainer />
        <NotesContainer />
      </div>
    </div>
  );
}

export default App;
