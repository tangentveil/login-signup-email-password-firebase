import "./App.css";

import { BrowserRouter as Router } from "react-router-dom";
import { Routes, Route } from "react-router-dom";

import Auth from "./pages/Auth/Auth";
import TaskForm from './pages/Tasks/TaskForm'

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Auth />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
