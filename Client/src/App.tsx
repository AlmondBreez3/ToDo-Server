import { useState } from 'react';
import reactLogo from './assets/react.svg';
import './App.css';
import axios from 'axios';
import { Route, Routes } from 'react-router-dom';
import IndexPage from './pages/IndexPage';
import Login from './pages/Login';
import Register from './pages/Register';
import ToDo from './pages/ToDo';
import MyPage from './pages/MyPage';

axios.defaults.baseURL = 'http://localhost:4000';
axios.defaults.withCredentials = true;

function App() {
  return (
    <Routes>
      <Route path="/" index element={<IndexPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/Register" element={<Register />} />
      <Route path="/todo" element={<ToDo />} />
      <Route path="/mypage" element={<MyPage />} />
    </Routes>
  );
}

export default App;
