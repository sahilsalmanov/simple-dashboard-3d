import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/layout/Header/Header";
import DesignersPage from "./pages/DesignersPage";
import EditorPage from "./pages/EditorPage";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Navigate to="/designers" replace />} />
        <Route path="/designers" element={<DesignersPage />} />
        <Route path="/editor" element={<EditorPage />} />
      </Routes>
    </Router>
  );
}

export default App;
