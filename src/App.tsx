import "./App.css";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import routes from "./routes";
import React from "react";

const App: React.FC = () => {
  const token = localStorage.getItem("token");
  return (
    <Router>
      <Routes>
        {routes.map((route) =>
          route.protected ? (
            <Route
              key={route.path}
              path={route.path}
              element={token ? React.createElement(route.main) : <Navigate to="/login" />}
            />
          ) : (
            <Route key={route.path} path={route.path} element={React.createElement(route.main)} />
          )
        )}
      </Routes>
    </Router>
  );
};

export default App;
