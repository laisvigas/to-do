import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/Auth";
import Login from "./pages/Login/Login";
import Home from "./pages/Home/Home";  
import Signup from './pages/Signup/Signup';
import NotFound from './components/NotFound/NotFound';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />  
          <Route path="/Login" element={<Login />} />
          <Route path="/Signup" element={<Signup />} />
          <Route path="*" element={<NotFound />} /> 
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
