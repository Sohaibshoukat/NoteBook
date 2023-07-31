import React from 'react';
import './App.css';
import {
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import Navbar from './component/Navbar';
import Home from './component/Home';
import About from './component/About';
import Alert from './component/Alert';
import Login from './component/Login';
import Signup from './component/Signup';
import NotesState from "./context/notes/NoteState"
import AlertState from './context/Alert/AlertState';

function App() {
  return (
    <>
      <NotesState>
        <AlertState>
          <Router>
            <Navbar />
            <Alert />
            <div className="container">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/About" element={<About />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
              </Routes>
            </div>
          </Router>

        </AlertState>
      </NotesState>
    </>
  );
}

export default App;
