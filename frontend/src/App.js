import React from "react";
import { Routes, Route } from "react-router-dom";

import { NoMatch, Login, Home } from "./components/pages";
import { AuthProvider, RequireAuth } from "./utilities";

import "./App.scss";

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route
          path="/"
          element={
            <RequireAuth>
              <Home />
            </RequireAuth>
          }
        />
        <Route exact path="/login" element={<Login />} />
        <Route path="*" element={<NoMatch />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
