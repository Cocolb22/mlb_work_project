// src/App.js
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./src/components/Navbar";
import Home from "./src/pages/Home";
import CreateSurvey from "./src/pages/Surveys/CreateSurvey";
import CreateQuestion from "./src/pages/Question/CreateQuestion";
import AddQuestionsToSurvey from "./src/pages/AddQuestionsToSurvey";
import IndexSurvey from "./src/pages/Surveys/IndexSurvey";
import Survey from "./src/pages/Surveys/Surveys";


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
          <Route path="/surveys" element={<IndexSurvey />} />
          <Route path="/survey/:id" element={<Survey />} />

        </Routes>
      </div>
    </Router>
  );
}

export default App;
