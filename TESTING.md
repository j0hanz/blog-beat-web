## Manual Testing Checklist

### Frontend Testing Checklist

#### General
- [ ] Verify that the website loads correctly in different browsers (Chrome, Firefox, Safari, Edge).
- [ ] Test the responsiveness of the website on various devices (desktop, tablet, mobile).
- [ ] Ensure all links navigate to the correct pages.
- [ ] Check that the favicon appears correctly in the browser tab.

#### Authentication
- [ ] **Sign Up Form:**
  - [ ] Check if the form opens when clicking the "Sign Up" button.
  - [ ] Enter valid credentials and ensure the user can sign up successfully.
  - [ ] Enter invalid credentials and check for appropriate error messages.
  - [ ] Verify that password and confirm password fields match.
  - [ ] Check if the user is redirected to the sign-in page after successful registration.

- [ ] **Sign In Form:**
  - [ ] Check if the form opens when clicking the "Login" button.
  - [ ] Enter valid credentials and ensure the user can log in successfully.
  - [ ] Enter invalid credentials and check for appropriate error messages.
  - [ ] Verify that the user is redirected to the homepage after successful login.
  - [ ] Ensure the "Forgot Password" functionality works as expected.

- [ ] **Sign Out:**
  - [ ] Check that the user can sign out successfully.
  - [ ] Ensure the user is redirected to the homepage after signing out.

#### Profile
- [ ] **View Profile:**
  - [ ] Verify that the profile page loads correctly with all user information.
  - [ ] Ensure that the "Edit Profile" button is visible for the profile owner.

- [ ] **Edit Profile:**
  - [ ] Check that the profile edit form opens correctly.
  - [ ] Update profile details and ensure they are saved correctly.
  - [ ] Test the functionality of uploading and removing profile images.
  - [ ] Verify that changes are reflected on the profile page after saving.

#### Posts
- [ ] **Create Post:**
  - [ ] Verify that the post creation form opens correctly.
  - [ ] Enter valid details and ensure the post is created successfully.
  - [ ] Check for appropriate error messages when submitting invalid data.
  - [ ] Verify that the newly created post appears in the posts list.

- [ ] **Edit Post:**
  - [ ] Ensure that the post edit form opens correctly.
  - [ ] Update post details and ensure they are saved correctly.
  - [ ] Verify that changes are reflected in the post details page.

- [ ] **Delete Post:**
  - [ ] Check that the user can delete a post.
  - [ ] Ensure the post is removed from the posts list after deletion.

- [ ] **View Post:**
  - [ ] Verify that the post details page loads correctly.
  - [ ] Ensure the post content, images, likes, and comments are displayed correctly.

#### Comments
- [ ] **Add Comment:**
  - [ ] Verify that the comment form is visible for logged-in users.
  - [ ] Enter a comment and ensure it is added successfully.
  - [ ] Check for appropriate error messages when submitting invalid data.
  - [ ] Ensure the new comment appears under the post.

- [ ] **Edit Comment:**
  - [ ] Ensure that the comment edit form opens correctly.
  - [ ] Update comment details and ensure they are saved correctly.
  - [ ] Verify that changes are reflected under the post.

- [ ] **Delete Comment:**
  - [ ] Check that the user can delete a comment.
  - [ ] Ensure the comment is removed from the post after deletion.

#### Likes
- [ ] **Like Post:**
  - [ ] Verify that the like button is visible for logged-in users.
  - [ ] Check that the user can like a post.
  - [ ] Ensure the like count increases after liking a post.

- [ ] **Unlike Post:**
  - [ ] Verify that the user can unlike a post.
  - [ ] Ensure the like count decreases after unliking a post.

### Backend Testing Checklist

#### Authentication Endpoints
- [ ] **Sign Up Endpoint:**
  - [ ] Send valid data to the endpoint and ensure the user is created successfully.
  - [ ] Send invalid data and check for appropriate error responses.

- [ ] **Login Endpoint:**
  - [ ] Send valid credentials and ensure the user receives a token.
  - [ ] Send invalid credentials and check for appropriate error responses.

- [ ] **Logout Endpoint:**
  - [ ] Ensure the user can log out successfully.

#### Profile Endpoints
- [ ] **Get Profile Endpoint:**
  - [ ] Verify that the profile data is retrieved correctly for a valid user.
  - [ ] Ensure unauthorized users cannot access other users' profiles.

- [ ] **Update Profile Endpoint:**
  - [ ] Send valid data to update the profile and ensure the changes are saved.
  - [ ] Send invalid data and check for appropriate error responses.

#### Post Endpoints
- [ ] **Create Post Endpoint:**
  - [ ] Send valid data to create a post and ensure it is saved successfully.
  - [ ] Send invalid data and check for appropriate error responses.

- [ ] **Get Post Endpoint:**
  - [ ] Verify that post data is retrieved correctly for a valid post ID.
  - [ ] Ensure unauthorized users cannot access restricted posts.

- [ ] **Update Post Endpoint:**
  - [ ] Send valid data to update a post and ensure the changes are saved.
  - [ ] Send invalid data and check for appropriate error responses.

- [ ] **Delete Post Endpoint:**
  - [ ] Ensure a post can be deleted successfully.

#### Comment Endpoints
- [ ] **Add Comment Endpoint:**
  - [ ] Send valid data to add a comment and ensure it is saved successfully.
  - [ ] Send invalid data and check for appropriate error responses.

- [ ] **Get Comments Endpoint:**
  - [ ] Verify that comments are retrieved correctly for a valid post ID.

- [ ] **Update Comment Endpoint:**
  - [ ] Send valid data to update a comment and ensure the changes are saved.
  - [ ] Send invalid data and check for appropriate error responses.

- [ ] **Delete Comment Endpoint:**
  - [ ] Ensure a comment can be deleted successfully.

#### Like Endpoints
- [ ] **Like Post Endpoint:**
  - [ ] Send a valid request to like a post and ensure the like is saved.
  - [ ] Send an invalid request and check for appropriate error responses.

- [ ] **Unlike Post Endpoint:**
  - [ ] Send a valid request to unlike a post and ensure the like is removed.

### Additional Testing
- [ ] **Security Testing:**
  - [ ] Ensure all API endpoints are protected and only accessible to authorized users.
  - [ ] Check for SQL injection, XSS, and other common vulnerabilities.

- [ ] **Performance Testing:**
  - [ ] Test the load time of different pages.
  - [ ] Ensure the API performs well under load.

- [ ] **Usability Testing:**
  - [ ] Ensure the UI is intuitive and user-friendly.
  - [ ] Gather feedback from users to improve the experience.
