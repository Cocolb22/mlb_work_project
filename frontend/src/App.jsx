// src/App.js
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// TO DO : fix the import jsconfig.json @
// import { Provider } from "@/components/ui/provider"
import { Provider } from "./components/ui/provider"
import Header from "./components/app/Header";
// import Navbar from "./components/app/Navbar";
import Home from "./pages/Home";
import CreateSurvey from "./pages/Surveys/CreateSurvey";
import CreateQuestion from "./pages/Question/CreateQuestion";
import AddQuestionsToSurvey from "./pages/AddQuestionsToSurvey";
import IndexSurvey from "./pages/Surveys/IndexSurvey";
import Surveys from "./pages/Surveys/Surveys";

function App() {
  return (
    <Provider>
      <Router>
        <div className="App">
          {/* <Navbar /> */}
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/create-survey" element={<CreateSurvey />} />
            <Route path="/create-question" element={<CreateQuestion />} />
            <Route path="/add-questions-to-survey" element={<AddQuestionsToSurvey />} />
            <Route path="/surveys" element={<IndexSurvey />} />
            <Route path="/surveys/:id" element={<Surveys />} />
            </Routes>
      </div>
      </Router>
    </Provider>
  );
}

export default App;
