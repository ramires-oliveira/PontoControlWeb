import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
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
            <Route path="/" element={<Home />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/resetePassword" element={<ResetePassword />}></Route>
            <Route path="/home" element={<Home />}></Route>
            <Route path="/perfil" element={<Perfil />}></Route>
            <Route path="/markTime" element={<MarkTime />}></Route>
            <Route path="/dotMirror" element={<DotMirror />}></Route>
            <Route path="/newEmployee" element={<NewEmployee />}></Route>
          </Routes>
        </Router>
      </SidebarProvider>
    </ThemeProvider>
  );
}

export default App;
