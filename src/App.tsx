import React from "react";
import { Route, Routes } from "react-router-dom";
import { LoginPage } from "./pages/LoginPage";
import { TablePage } from "./pages/TablePage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />}></Route>
      <Route path="/table" element={<TablePage />}></Route>
    </Routes>
  );
}

export default App;
