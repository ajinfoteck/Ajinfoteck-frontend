import { useState, useEffect, createContext, useContext } from "react";
import Home from "./pages/Home"
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import About from "./pages/About";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Staffpro from "./pages/Staffpro";
import Talenthub from "./pages/Talenthub";
import Services from "./pages/Services";
import Careers from "./pages/Careers";
import Contact from "./pages/Contact";
const logo = "/assets/small-logo.png";
// --- Loader State ---
const LoaderContext = createContext();

// --- Logo Loader UI ---
function GlobalLoader() {
  const { loading } = useContext(LoaderContext);
  if (!loading) return null;

  return (
    <div style={{
      position: "fixed", inset: 0,
      backgroundColor: "rgba(255, 255, 255, 1)",
      zIndex: 9999, display: "flex",
      alignItems: "center", justifyContent: "center"
    }}>
      <img src={logo} alt="Loading..." style={{
        width: "50px",
        height:"55px",
        animation: "pulse 1.2s ease-in-out infinite"
      }} />
      <style>{`@keyframes pulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.5;transform:scale(0.95)} }`}</style>
    </div>
  );
}

// --- Route Change Watcher ---
function AppContent() {
  const location = useLocation();
  const { setLoading } = useContext(LoaderContext);

  useEffect(() => {
    setLoading(true);
    const t = setTimeout(() => setLoading(false), 800); // 👈 Adjust delay if needed
    return () => clearTimeout(t);
  }, [location.pathname]);

  return (
    <>
      <GlobalLoader />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/staff-pro" element={<Staffpro />} />
        <Route path="/talent-hub" element={<Talenthub />} />
        <Route path="/services" element={<Services />} />
        <Route path="/careers" element={<Careers />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<h1>404 Not Found</h1>} />
      </Routes>
      <Footer />
    </>
  );
}

function App() {
  const [loading, setLoading] = useState(false);

  return (
    <LoaderContext.Provider value={{ loading, setLoading }}>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </LoaderContext.Provider>
  );
}

export default App;