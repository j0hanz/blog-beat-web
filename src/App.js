import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import './api/axiosDefaults';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import styles from './App.module.css';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import About from './pages/About';
import PostCreateForm from './pages/posts/PostCreateForm';
import PostPage from './pages/posts/PostPage';
import SignInForm from './pages/auth/SignInForm';
import SignUpForm from './pages/auth/SignUpForm';
import Notifications from './components/Notifications';
import { useCurrentUser } from './contexts/CurrentUserContext';
import PostsPage from './pages/posts/PostsPage';
import PostEditForm from './pages/posts/PostEditForm';
import ProfilePage from './pages/profiles/ProfilePage';

function App() {
  const currentUser = useCurrentUser();
  const profile_id = currentUser?.profile_id || '';

  return (
    <div className={styles.App}>
      <NavBar />
      <Notifications />
      <main className={styles.main}>
        <Routes>
          <Route
            path="/"
            element={
              <PostsPage message="No results found. Adjust the search keyword." />
            }
          />
          <Route
            path="/feed"
            element={
              <PostsPage
                message="No results found. Adjust the search keyword or follow a user."
                filter={`owner__followed__owner__profile=${profile_id}&`}
              />
            }
          />
          <Route
            path="/liked"
            element={
              <PostsPage
                message="No results found. Adjust the search keyword or like a post."
                filter={`likes__owner__profile=${profile_id}&ordering=-likes__created_at&`}
              />
            }
          />
          <Route path="/about" element={<About />} />
          <Route
            path="/posts/create"
            element={currentUser ? <PostCreateForm /> : <Navigate to="/" />}
          />
          <Route path="/posts/:id" element={<PostPage />} />
          <Route
            path="/posts/:id/edit"
            element={currentUser ? <PostEditForm /> : <Navigate to="/" />}
          />
          <Route path="/profiles/:id" element={<ProfilePage />} />
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
