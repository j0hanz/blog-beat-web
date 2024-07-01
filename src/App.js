import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
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
import UsernameForm from './pages/profiles/UsernameForm';
import UserPasswordForm from './pages/profiles/UserPasswordForm';
import ProfileEditForm from './pages/profiles/ProfileEditForm';
import NotFound from './components/NotFound';

function App() {
  const currentUser = useCurrentUser();
  const profile_id = currentUser?.pk || '';

  return (
    <div className={styles.App}>
      <NavBar />
      <Notifications />
      <main className={styles.main}>
        <Routes>
          <Route
            exact
            path="/"
            element={
              <PostsPage message="No results found. Adjust the search keyword." />
            }
          />
          <Route
            exact
            path="/feed"
            element={
              <PostsPage
                message="No results found. Adjust the search keyword or follow a user."
                filter={`owner__followed__owner__profile=${profile_id}&`}
              />
            }
          />
          <Route
            exact
            path="/liked"
            element={
              <PostsPage
                message="No results found. Adjust the search keyword or like a post."
                filter={`likes__owner__profile=${profile_id}&ordering=-likes__created_at&`}
              />
            }
          />
          <Route exact path="/about" element={<About />} />
          <Route
            exact
            path="/posts/create"
            element={currentUser ? <PostCreateForm /> : <Navigate to="/" />}
          />
          <Route exact path="/posts/:id" element={<PostPage />} />
          <Route
            exact
            path="/posts/:id/edit"
            element={currentUser ? <PostEditForm /> : <Navigate to="/" />}
          />
          <Route exact path="/profiles/:id" element={<ProfilePage />} />
          <Route
            exact
            path="/profiles/:id/edit/username"
            element={<UsernameForm />}
          />
          <Route
            exact
            path="/profiles/:id/edit/password"
            element={<UserPasswordForm />}
          />
          <Route
            exact
            path="/profiles/:id/edit"
            element={<ProfileEditForm />}
          />
          <Route
            exact
            path="/signin"
            element={!currentUser ? <SignInForm /> : <Navigate to="/" />}
          />
          <Route
            exact
            path="/signup"
            element={!currentUser ? <SignUpForm /> : <Navigate to="/" />}
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
