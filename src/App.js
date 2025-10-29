import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Favorites from './pages/Favorites';
import './index.css';

export default function App() {
  return (
    <div className="app-root">
      <header className="top">
        <div className="container">
          <h1 className="logo">Book Finder</h1>
          <nav>
            <Link to="/">Search</Link>
            <Link to="/favorites">Favorites</Link>
          </nav>
        </div>
      </header>

      <main className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/favorites" element={<Favorites />} />
        </Routes>
      </main>

      <footer className="foot container">
        <small>Turning searches into stories, one page at a time</small>
      </footer>
    </div>
  );
}
