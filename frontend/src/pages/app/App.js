import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import IndexPage from '../../components/indexpage/IndexPage';
import BasicNavbar from '../../components/utils/BasicNavbar';

import Articles from '../Articles/Articles';
import Basket from '../Basket/Basket';
import Profile from '../Profile/Profile';
import Connections from '../connections/Connections';
import Orders from '../Orders/Orders';

import Footer from '../../components/Footer/Footer';


function App() {
  return (
    <div className="App">
      <Router>
        <BasicNavbar/>
        <Routes>
          <Route path="/" element={<IndexPage/>} />
          <Route path='/articles' element={<Articles/>}/>
          <Route path='/connect' element={<Connections/>}/>
          <Route path='/basket' element={<Basket/>}/>
          <Route path='/profile' element={<Profile/>}/>
          <Route path='/orders' element={<Orders/>}/>
        </Routes>
        <Footer/>
      </Router>
    </div>
  );
}

export default App;
