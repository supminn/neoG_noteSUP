import "./App.css";
import { LabelContainer, Navigation, NotesContainer } from "./Components";

function App() {
  return (
    <div className="grid-container">
      <Navigation />
      <div class="desktop-labels">
        <LabelContainer />
      </div>
      <NotesContainer />
      {/* <Footer /> */}
    </div>
  );
}

export default App;
