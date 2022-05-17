import React from "react";
import { Routes, Route } from "react-router-dom";

import Home from "./components/Home";
import Login from "./components/Login";
import NoMatch from "./components/NoMatch";
import Profile from "./components/Profile";

import { AuthProvider } from "./utilities/auth";
import RequireAuth from "./utilities/RequireAuth";

import "./App.scss";

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Routes>
          <Route
            path="/"
            element={
              <RequireAuth>
                <Home />
              </RequireAuth>
            }
          >
            <Route path="profile" element={<Profile />} />
          </Route>
          <Route path="login" element={<Login />} />
          <Route path="*" element={<NoMatch />} />
        </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;
