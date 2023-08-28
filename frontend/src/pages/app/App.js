import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import IndexPage from '../../components/indexpage/IndexPage';
import BasicNavbar from '../../components/utils/BasicNavbar';
import AdminRoute from '../../components/utils/AdminRoute';

import Articles from '../Articles/Articles';
import Basket from '../Basket/Basket';
import Connections from '../connections/Connections';

import Orders from '../Orders/Orders';
import AdminPage from '../Admin/AdminPage';
import Profile from '../Profile/Profile';


import Footer from '../../components/Footer/Footer';


function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route element={<BasicNavbar/>}>
            <Route path="/" element={<IndexPage/>} />
            <Route path='/articles' element={<Articles/>}/>
            <Route path='/connect' element={<Connections/>}/>
            <Route path='/basket' element={<Basket/>}/>
            <Route path='/profile' element={<Profile/>}/>
            <Route path='/orders' element={<Orders/>}/>
          </Route>
          <Route element={<AdminRoute/>}>
            <Route path="/admin" element={<AdminPage/>}/>
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
