import "./App.css";
import { Login, Navigation, NotesContainer, Signup, ResetPassword, PrivateRoute } from "./Components";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <div className="grid-container">
        <Navigation />
        <Routes>
          <PrivateRoute path="/notes" element={<NotesContainer />} />
        </Routes>
      </div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/reset-password" element={<ResetPassword />} />
      </Routes>
    </div>
  );
}

export default App;
