import { Routes, Route } from "react-router-dom";

import "./App.css";
import Header from "./components/Header.js";
import Home from "./components/Home.js";
import About from "./components/About.js";
import Country from "./components/Country.js";
import NotFound from "./components/NotFound.js";

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/about" element={<About />} />
        <Route exact path="/country/:cnt" element={<Country />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
