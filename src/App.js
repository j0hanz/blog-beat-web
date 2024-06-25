import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './api/axiosDefaults';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './App.module.css';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Post from './pages/NewPost';
import Login from './pages/auth/Login';
import Signup from './pages/auth/SignUp';
import { CurrentUserProvider } from './contexts/CurrentUserContext';

function App() {
  return (
    <CurrentUserProvider>
      <Router>
        <div className={styles.App}>
          <NavBar />
          <main className={styles.main}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/newpost" element={<Post />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </CurrentUserProvider>
  );
}

export default App;
