import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/Protect";
import CreateTest from "./pages/CreateTest";
import FinishPage from "./pages/Finish";
import Login from "./pages/Login";
import CreateQuestionForm from "./pages/Question";
import Register from "./pages/Register";
import QuizInterface from "./pages/Test";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Login /> } />
        <Route path="/login" element={<Login /> } />
        <Route path="/register" element={<Register />} />
        <Route path="/createTest" element={<CreateTest />} />
        <Route path="/questions" element={
          <ProtectedRoute>
            <CreateQuestionForm />
          </ProtectedRoute>
        } />
        <Route path="/test" element={
          <ProtectedRoute>
            <QuizInterface />
          </ProtectedRoute>
        } />
        <Route path="/finish" element={<FinishPage />} />
      </Routes>
    </Router>
  );
};

export default App;