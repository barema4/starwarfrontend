import React from 'react';
import {Routes, Route } from 'react-router-dom';
import Home from '../components/Home';
import SearchUser from '../components/SearchUser';

const StarRouter: React.FC = () => {
  return (
    <Routes>
      <Route  path="/" element={<Home/>} />
      <Route path="/:name" element={<SearchUser/>} />
    </Routes>
  );
};

export default StarRouter;
