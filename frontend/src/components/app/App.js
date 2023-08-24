import React from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import IndexPage from '../indexpage/IndexPage';
import BasicNavbar from '../utils/BasicNavbar';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route element={<BasicNavbar/>}>
          <Route exact path="/" element={<IndexPage/>} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
