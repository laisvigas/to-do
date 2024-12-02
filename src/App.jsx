import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/Auth";
import Login from "./pages/Login/Login";
import Home from "./pages/Home/Home";  
import Signup from './pages/Signup/Signup';
import Tasks from './pages/Tasks/Tasks';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />  
          <Route path="/Login" element={<Login />} />
          <Route path="/Signup" element={<Signup />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
