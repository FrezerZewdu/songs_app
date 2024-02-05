import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Dashboard from './pages/dashboard/Dashboard';
import SongsView from './pages/songs/SongsView';

function App() {
  return (
    <>
      <Router>
        <div>
          <Header />
          <Routes>
            <Route path='/'element={<Dashboard />} />
            <Route path="/my-songs" element={<SongsView />} />
          </Routes>
        </div>
      </Router>
    </>
    
  );
}

export default App;
