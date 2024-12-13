import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from 'react'
import CreateOrder from './pages/CreateOrder';
import CreateStore from './pages/CreateStore';
import Listorder from './pages/ListOrder';
import Login from './pages/Login';
import Register from './pages/Register';
import ListStores from './pages/ListStores';
import Home from './pages/Home';
import AuthCheck from './components/custom/AuthCheck';

const App  = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/order" element={
          <AuthCheck>
            <CreateOrder />
          </AuthCheck>
        } />
        <Route path="/store" element={
          <AuthCheck>
            <CreateStore />
          </AuthCheck>
        } />
        <Route path="/listorders" element={
          <AuthCheck>
            <Listorder />
          </AuthCheck>
        } />
        <Route path="/liststores" element={
          <AuthCheck>
            <ListStores />
          </AuthCheck>
        } />
      </Routes>
    </BrowserRouter>
  )
}

export default App