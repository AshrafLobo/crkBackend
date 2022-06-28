import React from "react";
import { Routes, Route } from "react-router-dom";

import { Home, Profile, NoMatch, Login, Agm, Faq } from "./components/pages";
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
        >
          <Route index element={<Agm />} />
          <Route path="profile" element={<Profile />} />
          <Route path="agm" element={<Agm />} />
          <Route path="faqs" element={<Faq />} />
        </Route>
        <Route path="login" element={<Login />} />
        <Route path="*" element={<NoMatch />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
