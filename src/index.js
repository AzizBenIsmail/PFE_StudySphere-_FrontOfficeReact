
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

import "assets/css/nucleo-icons.css";
import "assets/scss/blk-design-system-react.scss";
import "assets/demo/demo.css";
import "assets/scss/black-dashboard-react.scss";

import Index from "views/Index.js";
import LandingPage from "views/examples/LandingPage.js";
import RegisterPage from "views/examples/RegisterPage.js";
import ProfilePage from "views/examples/ProfilePage.js";
import AdminLayout from "layouts/Admin/Admin.js";
import LoginPage from "views/examples/LoginPage";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/components" element={<Index />} />
      <Route path="/landing-page" element={<LandingPage />} />
      <Route path="/register-page" element={<RegisterPage />} />
      <Route path="/login-page" element={<LoginPage />} />
      <Route path="/profile-page" element={<ProfilePage />} />
      <Route path="/admin/*" element={<AdminLayout />} />
      <Route path="*" element={<Navigate to="/login-page" replace />} />
    </Routes>
  </BrowserRouter>
);
