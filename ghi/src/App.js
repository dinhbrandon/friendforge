import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from './screens/Home'
import Signup from './screens/Signup'
import AdminPannel from './screens/AdminPannel'
import CssStyle from './screens/CssStyle'


function App() {
  return (
    <BrowserRouter>
    <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/admin" element={<AdminPannel />} />
        <Route path="/admin/cssstyle" element={<CssStyle />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
