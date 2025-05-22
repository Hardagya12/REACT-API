import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useLocation } from 'react-router-dom';
import Home from './components/Home';
import Meals from './components/Meals';
import Recipe from './components/Recipe';
import Cocktails from './components/Cocktails';
import Potter from './components/Potter';
import Banks from './components/Banks';
import ContactUs from './components/ContactUs';

const App = () => {

  return (
    <Router>
      <div className="app">

        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/meals" element={<Meals />} />
            <Route path="/recipe/:id" element={<Recipe />} />
            <Route path="/cocktails" element={<Cocktails />} />
            <Route path="/potter" element={<Potter />} />
            <Route path="/banks" element={<Banks />} />
            <Route path="/contactus" element={<ContactUs />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;