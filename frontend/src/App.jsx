import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import { AuthProvider } from './api/AuthContext';
import Header from "./components/Header";
import Footer from "./components/Footer";
import ArticleDetail from "./Pages/ArticleDetail";
import UpdateArticle from "./Pages/UpdateArticle";
import CreateArticle from "./Pages/CreateArticle";
import Settings from "./Pages/Settings";


function App() {
  return (
 <AuthProvider>
      <Router>
        <Header/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/article/:id" element={<ArticleDetail/>} />
          <Route path="/NewArticle" element={<CreateArticle/>} />
          <Route path="/Settings" element={<Settings/>} />
          <Route path="/UpdateArticle/:id" element={<UpdateArticle/>} />
          <Route path="/register" element={<Register/>} />
          <Route path="/login" element={<Login/>} />
        </Routes>
        <Footer/>
      </Router>
      </AuthProvider>
  )
}

export default App;
