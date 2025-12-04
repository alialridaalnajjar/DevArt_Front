import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import LandingPage from "./pages/LandingPage";
import RedirectRoute from "./utils/RedirectRoute";
import SearchPage from "./pages/SearchPage";
import CoursesPage from "./pages/CoursesPage";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/Register" element={<RegisterPage />} />
        <Route path="/Login" element={<LoginPage />} />
        <Route path="/" element={<LandingPage />} />

        <Route element={<RedirectRoute />}>
          <Route path="/Search" element={<SearchPage />} />
          <Route path="/Courses" element={<CoursesPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
