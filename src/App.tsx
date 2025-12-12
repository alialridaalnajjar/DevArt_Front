import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import BrowseCoursePage from "./pages/BrowseCoursePage";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import CoursesPage from "./pages/PlayPage";
import ProfilePage from "./pages/ProfilePage";
import RegisterPage from "./pages/RegisterPage";
import SearchPage from "./pages/SearchPage";
import RedirectRoute from "./utils/RedirectRoute";
function App() {  
  return (
    <Router>
      <Routes>
        <Route path="/Register" element={<RegisterPage />} />
        <Route path="/Login" element={<LoginPage />} />
        <Route element={<RedirectRoute />}>
          <Route
            path="/Courses/:courseName/:videoId"
            element={<CoursesPage />}
          />
          <Route
            path="/Courses/:courseName"
            element={<BrowseCoursePage />}
          />
          <Route path="/Search" element={<SearchPage />} />
          <Route path="/Courses/:all" element={<BrowseCoursePage/>} />
          <Route path="/Profile/:userId" element={<ProfilePage />} />
        </Route>
        <Route path="/" element={<LandingPage />} />
      </Routes>
    </Router>
  );
}

export default App;
