import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./components/Home";
import LoginForm from "./components/LoginForm";
import RegistrationForm from "./components/RegistrationForm";
import EmployeeHome from "./components/EmployeeHome";
import NewPostForm from "./components/NewPostForm";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegistrationForm />} />
        <Route path="/employee/:id" element={<EmployeeHome />} />
        <Route path="/employee/:id/newPost" element={<NewPostForm />} />
      </Routes>
    </Router>
  );
}

export default App;
