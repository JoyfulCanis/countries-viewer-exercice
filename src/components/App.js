import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from '../pages/Home';
import About from '../pages/About';
import PageNotFound from '../pages/PageNotFound';
import Blog from "../pages/Blog"
const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/About" element={<About />} />
          {/* path="*" fonctionne si jamais l'url ne correspond à rien de déclaré */}
          <Route path="*" element={<PageNotFound />} />
          <Route path="/Blog" element={<Blog />}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;