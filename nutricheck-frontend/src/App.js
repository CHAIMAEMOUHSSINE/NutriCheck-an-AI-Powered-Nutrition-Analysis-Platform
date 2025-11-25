import "./App.css";
import Home from "./Components/Home";
import About from "./Components/About";
import Work from "./Components/Work";
import Testimonial from "./Components/Testimonial";
import Contact from "./Components/Contact";
import Footer from "./Components/Footer";
import Features from "./Components/Features";
import Login from "./Components/Login";

import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <Routes>

      {/* MAIN PAGE*/}
      <Route
        path="/"
        element={
          <div className="App">
            <Home />
            <About />
            <Features />
            <Testimonial />
            <Contact />
            <Work />
            <Footer />
          </div>
        }
      />

      {/* LOGIN PAGE */}
      <Route path="/login" element={<Login />} />

    </Routes>
  );
}

export default App;
