import { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import "./App.css";
import Login from "./pages/Login/Login";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Home from "./pages/Home/Home";
import Perfil from "./pages/Profile/Profile";
import MarkTime from "./pages/MarkTime/MarkTime";
import NewEmployee from "./pages/NewEmployee/NewEmployee";
import { SidebarProvider } from "./reactContext/SidebarContext";
import DotMirror from "./pages/DotMirror/DotMirror";
import ResetePassword from "./pages/ResetePassword/ResetePassword";
import { isAuthenticated } from "./auth/authService";

const theme = createTheme({
  palette: {
    primary: {
      main: "#29ABE3",
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <SidebarProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/resetePassword" element={<ResetePassword />} />
            <Route
              path="/home"
              element={isAuthenticated() ? <Home /> : <Navigate to="/login" />}
            />
            <Route
              path="/profile"
              element={
                isAuthenticated() ? <Perfil /> : <Navigate to="/login" />
              }
            />
            <Route
              path="/markTime"
              element={
                isAuthenticated() ? <MarkTime /> : <Navigate to="/login" />
              }
            />
            <Route
              path="/dotMirror"
              element={
                isAuthenticated() ? <DotMirror /> : <Navigate to="/login" />
              }
            />
            <Route
              path="/newEmployee"
              element={
                isAuthenticated() ? <NewEmployee /> : <Navigate to="/login" />
              }
            />
          </Routes>
        </Router>
      </SidebarProvider>
    </ThemeProvider>
  );
}

export default App;
