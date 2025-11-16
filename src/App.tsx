import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import RegisterPage from "./pages/RegisterPage";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<RegisterPage />} />
      </Routes>
    </Router>
  );
}

export default App;
