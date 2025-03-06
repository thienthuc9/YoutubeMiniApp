import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import routes from './routes';
import React from 'react';
const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        {routes.map((route) => (
          <Route key={route.path} path={route.path} element={React.createElement(route.main)} />
        ))}
      </Routes>
    </Router>
  );
};

export default App
