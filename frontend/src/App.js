import React from "react";
import { Container } from "react-bootstrap";
import { Routes, Route } from "react-router-dom";

import "./App.scss";

import Home from "./components/Home";
import Login from "./components/Login";
import NoMatch from "./components/NoMatch";
import Profile from "./components/Profile";

import { AuthProvider } from "./utilities/auth";
import RequireAuth from "./utilities/RequireAuth";

function App() {
  return (
    <AuthProvider>
      <Container className="my-4">
        <Routes>
          <Route
            path="/"
            element={
              <RequireAuth>
                <Home />
              </RequireAuth>
            }
          />
          <Route
            path="profile"
            element={
              <RequireAuth>
                <Profile />
              </RequireAuth>
            }
          />
          <Route path="login" element={<Login />} />
          <Route path="*" element={<NoMatch />} />
        </Routes>
      </Container>
    </AuthProvider>
  );
}

export default App;
