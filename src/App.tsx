import React from 'react';
import sb1h1buh75z from './assets/sb1-h1buh75z.mp4';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { ThemeProvider } from './context/ThemeContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { Collection } from './pages/Collection';
import { Cart } from './pages/Cart';
import { About } from './pages/About';

function App() {
  return (
    <Router>
      <ThemeProvider>
        <CartProvider>
          <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/collection" element={<Collection />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/about" element={<About />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </CartProvider>
      </ThemeProvider>
    </Router>
  );
}

export default App