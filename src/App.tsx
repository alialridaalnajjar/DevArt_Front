import { useEffect } from "react";
import { Toaster } from 'react-hot-toast';
import {
  Route,
  BrowserRouter as Router,
  Routes,
  useLocation,
} from "react-router-dom";
import "./App.css";
import AdminPage from "./pages/AdminPage";
import BrowseCoursePage from "./pages/BrowseCoursePage";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import MyAttemptsPage from "./pages/MyAttemptsPage";
import CoursesPage from "./pages/PlayPage";
import ProfilePage from "./pages/ProfilePage";
import QuizGenresPage from "./pages/QuizGenresPage";
import QuizResultsPage from "./pages/QuizResultsPage";
import QuizTakingPage from "./pages/QuizTakingPage";
import RegisterPage from "./pages/RegisterPage";
import AdminRedirectRoute from "./utils/AdminRedirectRoute";
import RedirectRoute from "./utils/RedirectRoute";

function ScrollToTop() {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [location.pathname]);
  return null;
}

function App() {
  return (
    <>
      <Toaster position="top-right" />
      <Router>
        <ScrollToTop />
        <Routes>
          <Route path="/Register" element={<RegisterPage />} />
          <Route path="/Login" element={<LoginPage />} />
          <Route element={<RedirectRoute />}>
            <Route
              path="/Courses/:courseName/:videoId"
              element={<CoursesPage />}
            />
            <Route path="/Courses/:genreName" element={<BrowseCoursePage />} />
            <Route path="/Quiz" element={<QuizGenresPage />} />
            <Route path="/quiz/:genreId" element={<QuizTakingPage />} />
            <Route path="/quiz/results/:attemptId" element={<QuizResultsPage />} />
            <Route path="/quiz/my-attempts" element={<MyAttemptsPage />} />
            <Route path="/Courses/:all" element={<BrowseCoursePage />} />
            <Route path="/Profile/:userId" element={<ProfilePage />} />
          </Route>
          <Route path="/" element={<LandingPage />} />
          <Route element={<AdminRedirectRoute />}>
            <Route path="/admin/:id" element={<AdminPage />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
