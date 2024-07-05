## Manual Testing Checklist

### Frontend Testing Checklist

#### General
- [x] Verify that the website loads correctly in different browsers (Chrome, Firefox, Safari, Edge).
- [x] Test the responsiveness of the website on various devices (desktop, tablet, mobile).
- [x] Ensure all links navigate to the correct pages.
- [x] Check that the favicon appears correctly in the browser tab.

#### Authentication
- [x] **Sign Up Form:**
  - [x] Check if the form opens when clicking the "Sign Up" button.
  - [x] Enter valid credentials and ensure the user can sign up successfully.
  - [x] Enter invalid credentials and check for appropriate error messages.
  - [x] Verify that password and confirm password fields match.
  - [x] Check if the user is redirected to the sign-in page after successful registration.

- [x] **Sign In Form:**
  - [x] Check if the form opens when clicking the "Login" button.
  - [x] Enter valid credentials and ensure the user can log in successfully.
  - [x] Enter invalid credentials and check for appropriate error messages.
  - [x] Verify that the user is redirected to the homepage after successful login.

- [x] **Sign Out:**
  - [x] Check that the user can sign out successfully.
  - [x] Ensure the user is redirected to the homepage after signing out.

#### Profile
- [x] **View Profile:**
  - [x] Verify that the profile page loads correctly with all user information.
  - [x] Ensure that the "Edit Profile" button is visible for the profile owner.

- [x] **Edit Profile:**
  - [x] Check that the profile edit form opens correctly.
  - [x] Update profile details and ensure they are saved correctly.
  - [x] Test the functionality of uploading and removing profile images.
  - [x] Verify that changes are reflected on the profile page after saving.

#### Posts
- [x] **Create Post:**
  - [x] Verify that the post creation form opens correctly.
  - [x] Enter valid details and ensure the post is created successfully.
  - [x] Check for appropriate error messages when submitting invalid data.
  - [x] Verify that the newly created post appears in the posts list.

- [x] **Edit Post:**
  - [x] Ensure that the post edit form opens correctly.
  - [x] Update post details and ensure they are saved correctly.
  - [x] Verify that changes are reflected in the post details page.

- [x] **Delete Post:**
  - [x] Check that the user can delete a post.
  - [x] Ensure the post is removed from the posts list after deletion.

- [x] **View Post:**
  - [x] Verify that the post details page loads correctly.
  - [x] Ensure the post content, images, likes, and comments are displayed correctly.

#### Comments
- [x] **Add Comment:**
  - [x] Verify that the comment form is visible for logged-in users.
  - [x] Enter a comment and ensure it is added successfully.
  - [x] Check for appropriate error messages when submitting invalid data.
  - [x] Ensure the new comment appears under the post.

- [x] **Edit Comment:**
  - [x] Ensure that the comment edit form opens correctly.
  - [x] Update comment details and ensure they are saved correctly.
  - [x] Verify that changes are reflected under the post.

- [x] **Delete Comment:**
  - [x] Check that the user can delete a comment.
  - [x] Ensure the comment is removed from the post after deletion.

#### Likes
- [x] **Like Post:**
  - [x] Verify that the like button is visible for logged-in users.
  - [x] Check that the user can like a post.
  - [x] Ensure the like count increases after liking a post.

- [x] **Unlike Post:**
  - [x] Verify that the user can unlike a post.
  - [x] Ensure the like count decreases after unliking a post.

### Backend Testing Checklist

#### Authentication Endpoints
- [x] **Sign Up Endpoint:**
  - [x] Send valid data to the endpoint and ensure the user is created successfully.
  - [x] Send invalid data and check for appropriate error responses.

- [x] **Login Endpoint:**
  - [x] Send valid credentials and ensure the user receives a token.
  - [x] Send invalid credentials and check for appropriate error responses.

- [x] **Logout Endpoint:**
  - [x] Ensure the user can log out successfully.

#### Profile Endpoints
- [x] **Get Profile Endpoint:**
  - [x] Verify that the profile data is retrieved correctly for a valid user.
  - [x] Ensure unauthorized users cannot access other users' profiles.

- [x] **Update Profile Endpoint:**
  - [x] Send valid data to update the profile and ensure the changes are saved.
  - [x] Send invalid data and check for appropriate error responses.

#### Post Endpoints
- [x] **Create Post Endpoint:**
  - [x] Send valid data to create a post and ensure it is saved successfully.
  - [x] Send invalid data and check for appropriate error responses.

- [x] **Get Post Endpoint:**
  - [x] Verify that post data is retrieved correctly for a valid post ID.
  - [x] Ensure unauthorized users cannot access restricted posts.

- [x] **Update Post Endpoint:**
  - [x] Send valid data to update a post and ensure the changes are saved.
  - [x] Send invalid data and check for appropriate error responses.

- [x] **Delete Post Endpoint:**
  - [x] Ensure a post can be deleted successfully.

#### Comment Endpoints
- [x] **Add Comment Endpoint:**
  - [x] Send valid data to add a comment and ensure it is saved successfully.
  - [x] Send invalid data and check for appropriate error responses.

- [x] **Get Comments Endpoint:**
  - [x] Verify that comments are retrieved correctly for a valid post ID.

- [x] **Update Comment Endpoint:**
  - [x] Send valid data to update a comment and ensure the changes are saved.
  - [x] Send invalid data and check for appropriate error responses.

- [x] **Delete Comment Endpoint:**
  - [x] Ensure a comment can be deleted successfully.

#### Like Endpoints
- [x] **Like Post Endpoint:**
  - [x] Send a valid request to like a post and ensure the like is saved.
  - [x] Send an invalid request and check for appropriate error responses.

- [x] **Unlike Post Endpoint:**
  - [x] Send a valid request to unlike a post and ensure the like is removed.

### Additional Testing
- [x] **Security Testing:**
  - [x] Ensure all API endpoints are protected and only accessible to authorized users.

- [x] **Performance Testing:**
  - [x] Test the load time of different pages.
  - [x] Ensure the API performs well under load.

- [x] **Usability Testing:**
  - [x] Ensure the UI is intuitive and user-friendly.


## Lighthouse

Lighthouse performance reports for Desktop and Mobile.

<p align="center">
  <b>Desktop</b><br>
  <img src="/docs/testing/Desktop_lighthouse.png" alt="Lighthouse report for Desktop">
</p>

<p align="center">
  <b>Mobile</b><br>
  <img src="/docs/testing/Mobile_lighthouse.png" alt="Lighthouse report for Mobile">
</p>

## Responsiveness

Application responsiveness across different devices.

<p align="center">

https://github.com/j0hanz/blog-beat-web/assets/159924955/42b1d09d-fde6-42e1-b476-ec2932f13989
   
</p>

