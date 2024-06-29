import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import './api/axiosDefaults';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import styles from './App.module.css';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import PostCreateForm from './pages/posts/PostCreateForm';
import SignInForm from './pages/auth/SignInForm';
import SignUpForm from './pages/auth/SignUpForm';
import Notifications from './components/Notifications';
import { useCurrentUser } from './contexts/CurrentUserContext';

function App() {
  const currentUser = useCurrentUser();

  return (
    <div className={styles.App}>
      <NavBar />
      <Notifications />
      <main className={styles.main}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route
            path="/posts/create"
            element={
              currentUser ? <PostCreateForm /> : <Navigate to="/" />
            }
          />
          <Route
            path="/signin"
            element={!currentUser ? <SignInForm /> : <Navigate to="/" />}
          />
          <Route
            path="/signup"
            element={!currentUser ? <SignUpForm /> : <Navigate to="/" />}
          />
          <Route path="*" element={<p>Page not found!</p>} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
