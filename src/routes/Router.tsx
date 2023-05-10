import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../components/Home";
import SearchUser from "../components/SearchUser";

const StarRouter: React.FC = () => {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/:name" element={<SearchUser />} />
    </Routes>
    </Router>
    
  );
};

export default StarRouter;
