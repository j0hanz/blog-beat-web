import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import './api/axiosDefaults';
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
import PrivateRoute from './components/PrivateRoute';

/* App component to get the current user's profile ID */
function App() {
  const currentUser = useCurrentUser();
  const profile_id = currentUser?.profile_id;

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
          <Route
            path="/favorites"
            element={
              <PostsPage
                message="No results found. Adjust the search keyword or add a post to favorites."
                filter={`favorites__owner__profile=${profile_id}&ordering=-favorites__created_at&`}
              />
            }
          />
          <Route path="/about" element={<About />} />
          <Route
            path="/posts/create"
            element={
              <PrivateRoute>
                <PostCreateForm />
              </PrivateRoute>
            }
          />
          <Route path="/posts/:id" element={<PostPage />} />
          <Route
            path="/posts/:id/edit"
            element={
              <PrivateRoute>
                <PostEditForm />
              </PrivateRoute>
            }
          />
          <Route path="/profiles/:id" element={<ProfilePage />} />
          <Route
            path="/profiles/:id/edit/username"
            element={
              <PrivateRoute>
                <UsernameForm />
              </PrivateRoute>
            }
          />
          <Route
            path="/profiles/:id/edit/password"
            element={
              <PrivateRoute>
                <UserPasswordForm />
              </PrivateRoute>
            }
          />
          <Route
            path="/profiles/:id/edit"
            element={
              <PrivateRoute>
                <ProfileEditForm />
              </PrivateRoute>
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
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
