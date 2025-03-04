// src/App.js
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import CreateSurvey from "./pages/Surveys/CreateSurvey";
import CreateQuestion from "./pages/Question/CreateQuestion";
import AddQuestionsToSurvey from "./pages/AddQuestionsToSurvey";

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create-survey" element={<CreateSurvey />} />
          <Route path="/create-question" element={<CreateQuestion />} />
          <Route path="/add-questions-to-survey" element={<AddQuestionsToSurvey />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
