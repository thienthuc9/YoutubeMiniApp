import "./App.css";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import routes from "./routes";
import React, { useEffect, useRef } from "react";
import { AppDispatch } from "./redux/store";
import { useDispatch } from "react-redux";
import { profileUser } from "./redux/slice/profileSlice";

const App: React.FC = () => {
  const token = localStorage.getItem("token");
  const dispatch = useDispatch<AppDispatch>();

  const isFetched = useRef(false);

  useEffect(() => {
    if (!isFetched.current) {
      dispatch(profileUser());
      isFetched.current = true;
    }
  }, [dispatch]);
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
