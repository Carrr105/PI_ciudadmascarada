import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Edit from './pages/Edit'
import Main from './pages/Main'
import Navbar from './components/Navbar/Navbar';
import NewStory from './pages/NewStory'
import New from './pages/New'
import View from './pages/View'
import './App.css';

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Navbar/>
    </div>
      <Routes>
        <Route path='/' element={<Main />} />
        <Route path='/view' element={<View />} />
        <Route path='/edit' element={<Edit />} />
        <Route path='/newstory' element={<NewStory />} />
        <Route path='/new' element={<New />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
