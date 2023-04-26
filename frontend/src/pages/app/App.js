import React from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import IndexPage from '../../components/indexpage/IndexPage';
import BasicNavbar from '../../components/utils/BasicNavbar';

import Articles from '../Articles/Articles';
import Basket from '../Basket/Basket';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route element={<BasicNavbar/>}>
          <Route exact path="/" element={<IndexPage/>} />
          <Route exact path='/articles' element={<Articles/>}/>
          <Route exact path='/basket' element={<Basket/>}/>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
