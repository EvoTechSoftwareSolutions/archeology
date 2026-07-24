import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/home/Navbar';
import Footer from './components/layout/home/Footer';
import Home from './pages/Home';
import TempleOfToothDetails from './pages/TempleOfToothDetails';

function App() {
  return (
    <BrowserRouter>
      <div className="font-sans antialiased text-text-dark bg-cream selection:bg-gold selection:text-deep-green">
        <Navbar />
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/temple-of-the-tooth" element={<TempleOfToothDetails />} />
        </Routes>

      <Footer />
    </div>
    </BrowserRouter>
  );
}

export default App;
