---

<p align="center">
  <img src="/docs/logo.png" alt="Blog Beat Logo">
</p>

Blog Beat is an interactive web application for reading, writing, and interacting with blog posts. It provides a user-friendly platform for bloggers, readers, and content creators to share ideas and engage with the community.

---

## Links

<p>
  <a href="https://blog-beat-17c62545ca2a.herokuapp.com" style="text-decoration: none;">
    <img src="https://img.icons8.com/ios-filled/15/ffffff/web.png" alt="Frontend App"> Frontend App
  </a>
</p>
<p>
  <a href="https://github.com/j0hanz/blog-beat-web" style="text-decoration: none;">
    <img src="https://img.icons8.com/ios-filled/15/ffffff/github.png" alt="Frontend Repository"> Frontend Repository
  </a>
</p>
<p>
  <a href="https://blog-beat-api-bab609deb9ee.herokuapp.com" style="text-decoration: none;">
    <img src="https://img.icons8.com/ios-filled/15/ffffff/api.png" alt="API"> API
  </a>
</p>
<p>
  <a href="https://github.com/j0hanz/blog_beat_api" style="text-decoration: none;">
    <img src="https://img.icons8.com/ios-filled/15/ffffff/github.png" alt="API Repository"> API Repository
  </a>
</p>

---

## Table of Content

- [Introduction](#introduction)
- [User Experience (UX)](#user-experience-ux)
    - [Strategy](#strategy)
        - [Project Goals](#project-goals)
        - [User Goals](#user-goals)
        - [Site Owner Goals](#site-owner-goals)
        - [Target Audience](#target-audience)
        - [User Requirements and Expectations](#user-requirements-and-expectations)
    - [Scope](#scope)
        - [Features](#features)
        - [Future Features](#future-features)
    - [Structure](#structure)
    - [Component Architecture](#component-architecture)
        - [Core Components](#core-components)
        - [Reusable Components](#reusable-components)
    - [Skeleton](#skeleton)
        - [Wireframes](#wireframes)
    - [Pages](#pages)
    - [Surface](#surface)
        - [Design Choices](#design-choices)
        - [Colors](#colors)
- [Technologies Used](#technologies-used)
    - [Front-End Technologies](#front-end-technologies)
    - [Back-End Technologies](#back-end-technologies)
    - [Development Tools and Libraries](#development-tools-and-libraries)
- [Methodology](#methodology)
    - [Agile Development](#agile-development)
        - [MoSCoW Method](#moscow-method)
        - [Story Points](#story-points)
        - [Sprint](#sprint)
    - [User Stories as GitHub Issues](#user-stories-as-github-issues)
- [Bugs](#bugs)
- [Testing](#testing)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [Credits](#credits)
- [Acknowledgements](#acknowledgements)

---

<p align="center">
  <img src="/docs/mockup.png" alt="Blog Beat Mockup">
</p>

---

## Introduction

Blog Beat is an all-in-one blogging platform designed to provide an enriching experience for both writers and readers. It enables users to create, share, and engage with content seamlessly.

---

## User Experience (UX)

Blog Beat is intuitive and user-friendly, enabling users to:

- **View Posts**: Explore all blog posts directly from the homepage.
- **Sign Up/Log In**: Create an account or log in to unlock personalized features.
- **Create Posts**: Users can publish new blog posts using an intuitive interface.
- **Edit/Delete Posts**: Authors have full control to modify or remove their posts.
- **Comment on Posts**: Interact with the community by commenting on posts.
- **Search Functionality**: Use the search bar to quickly locate posts by keywords.

[Back up](#table-of-content)

---

## Strategy

### Project Goals

To provide a rich and engaging blogging experience that fosters interaction and encourages content creation.

### User Goals

To access a platform that is intuitive and enhances their blogging experience through user-centric design.

### Site Owner Goals

To build a community centered around diverse blog content and provide tools that promote user engagement.

### Target Audience

Bloggers, readers, and content creators from various backgrounds interested in sharing and discussing diverse topics.

### User Requirements and Expectations

- A responsive and accessible website.
- Secure and efficient user authentication and management.
- Tools for content creation, editing, and interaction.

[Back up](#table-of-content)

---

## Scope

### Features

Blog Beat offers a rich blogging experience with the following features:

- **Responsive Design**: Optimized for all devices, ensuring accessibility anywhere.
- **User Authentication**: A robust system for secure logins and account management.
- **CRUD Operations**: Create, edit, delete, and view posts.
- **Interactive Comments**: Comment and engage with the community.
- [Search Capability](https://github.com/j0hanz/blog-beat-web/issues/11): Efficient keyword search to quickly find relevant posts.
- [Like Functionality](https://github.com/j0hanz/blog-beat-web/issues/5): Allows users to like posts, enhancing interactive feedback.
- **Popular Profiles**: Showcases leading user profiles based on activity and engagement.

### Future Features

Blog Beat aims to continually improve and expand its functionality. Here are some of the planned future features:

- [Bookmark Posts](https://github.com/j0hanz/blog-beat-web/issues/9): Allow users to bookmark posts for easy access later.
- [Add Social Media Links](https://github.com/j0hanz/blog-beat-web/issues/7): Enable users to link their social media profiles.
- [Receive Notifications](https://github.com/j0hanz/blog-beat-web/issues/13): Notify users about important activities and updates.
- [Report Inappropriate Content](https://github.com/j0hanz/blog-beat-web/issues/14): Provide a way for users to report inappropriate content.
- [View Post Analytics](https://github.com/j0hanz/blog-beat-web/issues/15): Offer detailed analytics for user posts.
- [Save Drafts of Posts](https://github.com/j0hanz/blog-beat-web/issues/16): Allow users to save drafts of their posts for later editing.
- [Filter Posts by Category](https://github.com/j0hanz/blog-beat-web/issues/17): Enable users to filter posts by different categories.
- [Receive Email Notifications](https://github.com/j0hanz/blog-beat-web/issues/31): Send email notifications for important activities.
- [Enable Two-Factor Authentication](https://github.com/j0hanz/blog-beat-web/issues/27): Enhance account security with two-factor authentication.
- [User Mentions in Posts](https://github.com/j0hanz/blog-beat-web/issues/34): Allow users to mention others in their posts.
- [Report Bugs or Issues](https://github.com/j0hanz/blog-beat-web/issues/32): Provide a way for users to report bugs or issues.

[Back up](#table-of-content)

---

## Structure

### Database

You can find all details regarding the database in the [Backend repository](https://github.com/j0hanz/blog_beat_api).

---

## Component Architecture

### Core Components

- **Header**: Navigation bar with links to main sections.
- **Footer**: Contains social media links and additional navigation options.
- **PostList**: Displays a list of blog posts.
- **PostDetail**: Shows detailed view of a single post.
- **UserProfile**: Displays user information and their posts.

### Reusable Components

- **Button**: Customizable button component.
- **InputField**: Reusable input field with validation.
- **Modal**: Reusable modal dialog for various actions.
- **Spinner**: Loading indicator for asynchronous operations.
- **Dropdown**: Customizable dropdown menu for various selections.
- **Offcanvas**: Sliding panel for additional navigation or content.
- **OverlayTrigger**: Component to trigger overlays such as tooltips and popovers.
- **Tooltip**: Informative text that appears on hover.
- **Alert**: Notification component for messages and warnings.
- **Form**: Reusable form component with validation.

[Back up](#table-of-content)

---

## Skeleton

### Wireframes

Blog Beat's wireframes were designed in Balsamiq to serve as a visual guide to the layout and interface, streamlining UI development and enhancing user experience.

<details><summary>Home Page / Menu</summary>
<img src="/docs/wireframes/home.png" alt="Home Page Wireframe">
<img src="/docs/wireframes/Menu.png" alt="Menu Wireframe">
</details>
<details><summary>Sign Up / Login</summary>
<img src="/docs/wireframes/Sign-In.png" alt="Sign In Wireframe">
<img src="/docs/wireframes/Sign-Up.png" alt="Sign Up Wireframe">
</details>
<details><summary>Profile / Edit</summary>
<img src="/docs/wireframes/User-Profile.png" alt="User Profile Wireframe">
<img src="/docs/wireframes/Profile.png" alt="Profile Wireframe">
<img src="/docs/wireframes/Update-Password.png" alt="Update Password Wireframe">
</details>
<details><summary>Post Detail</summary>
<img src="/docs/wireframes/Post-Detail.png" alt="Post Detail Wireframe">
</details>

[Back up](#table-of-content)

---

## Pages

Explore the various pages of Blog Beat, each designed to provide a seamless and engaging user experience:

<p align="center">
  <img src="/docs/readme_pages/About_page.png" alt="About Page" title="About Page">
  <br>
  <strong>About Page:</strong> Learn more about Blog Beat and its features.
</p>

---

<p align="center">
  <img src="/docs/readme_pages/Edit_Profile.png" alt="Edit Profile Page" title="Edit Profile Page">
  <br>
  <strong>Edit Profile Page:</strong> Customize your profile information and settings.
</p>

---

<p align="center">
  <img src="/docs/readme_pages/Home.png" alt="Home Page" title="Home Page">
  <br>
  <strong>Home Page:</strong> Browse the latest blog posts and explore trending topics.
</p>

---

<p align="center">
  <img src="/docs/readme_pages/Login_Signup.png" alt="Login and Signup Page" title="Login and Signup Page">
  <br>
  <strong>Login and Signup Page:</strong> Access your account or create a new one to start blogging.
</p>

---

<p align="center">
  <img src="/docs/readme_pages/Menu_Logged_In.png" alt="Menu for Logged-In Users" title="Menu for Logged-In Users">
  <br>
  <strong>Menu for Logged-In Users:</strong> Navigate through your account options and site features.
</p>

---

<p align="center">
  <img src="/docs/readme_pages/Menu.png" alt="Menu" title="Menu">
  <br>
  <strong>Menu:</strong> Access various sections of the site easily.
</p>

---

<p align="center">
  <img src="/docs/readme_pages/Post_Page.png" alt="Post Page" title="Post Page">
  <br>
  <strong>Post Page:</strong> View detailed information about individual blog posts.
</p>

---

<p align="center">
  <img src="/docs/readme_pages/Profile_Page.png" alt="Profile Page" title="Profile Page">
  <br>
  <strong>Profile Page:</strong> Check out user profiles and their published posts.
</p>

[Back up](#table-of-content)

## Surface

### Design Choices

Blog Beat focuses on minimalism and readability to enhance user experience:

- **Minimalist Layout**: Clean and uncluttered design.
- **High Readability**: Clear text with good contrast.
- **Easy Navigation**: Simple and intuitive menus.
- **Responsive Design**: Works well on all devices.
- **Visual Consistency**: Uniform use of colors and fonts.

### Colors

Blog Beat uses the following color scheme to ensure a visually appealing and accessible user interface:

- **Background Color**: `#1e1e1e` (dark gray)
- **Primary Color**: `#007bff` (blue)
- **Text Color**: `#ffffff` (white)

[Back up](#table-of-content)

---

## Technologies Used

### Front-End Technologies

- **React**: Component-based architecture for dynamic UIs.
- **Bootstrap**: For responsive and mobile-first design.
- **Axios**: For API data fetching and management.
- **Font Awesome**: For interface enhancement with icons.
- **Sass**: For advanced CSS features like variables and mixins.
- **HTML5 & CSS3**: Standards for structuring and styling web content.
- **JSX (JavaScript XML)**: Syntax extension for React that allows writing HTML in JavaScript.
- **React Router**: For handling client-side routing.
- **React-Bootstrap**: Integration of Bootstrap components with React.
- **React Toastify**: For elegant toast notifications.

### Back-End Technologies

- **Node.js**: Platform for server-side JavaScript.
- **Express.js**: Web framework for Node.js to build APIs.
- **MongoDB**: NoSQL database for handling large volumes of data.
- **Mongoose**: ODM library for MongoDB and Node.js.
- **JWT**: For secure information transmission and authentication.

### Development Tools and Libraries

- **Git & GitHub**: For version control and collaboration.
- **Heroku**: For deploying and managing the application.
- **Webpack & Babel**: For bundling modules and compiling modern JavaScript.
- **CORS**: For enabling cross-origin requests.
- **ESLint & Prettier**: For maintaining code quality and formatting.
- **Balsamiq**: For creating wireframes and mockups.

[Back up](#table-of-content)

---

## Methodology

### Agile Development

Blog Beat was developed using an agile methodology, initially focusing on creating a functional site that addressed all key user stories.
Additional features and functionalities were added incrementally, ensuring continuous improvement and adaptation.

#### MoSCoW Method

The MoSCoW method was utilized to prioritize features effectively:

- **Must Have**: Essential for the project's success.
- **Should Have**: Important but not critical for the initial release.
- **Could Have**: Desirable features to consider for future updates.

#### Story Points

Story Points were used to estimate the effort required for tasks.
This system considers complexity, risks, and time, using numbers 1, 2, 3, 5, and 8 to represent different levels of effort.

#### Sprint

Sprint cycles were employed to structure the development process.
Each sprint focused on specific tasks and user stories, with outcomes documented to demonstrate the iterative development approach.

### User Stories as GitHub Issues

User stories are managed as GitHub issues, allowing for transparent tracking and updates.

#### User Stories

- As a User, I want to register an account so that I can create and interact with content on the blog site. [3#](https://github.com/j0hanz/blog-beat-web/issues/3#issue-2370591512)
- As a User, I want to like blog posts to engage with the content. [5#](https://github.com/j0hanz/blog-beat-web/issues/5#issue-2370603973)
- As a User, I want to view other users' profiles so that I can learn more about them and see their posts. [12#](https://github.com/j0hanz/blog-beat-web/issues/12#issue-2370621259)
- As a User, I want to edit my published posts so that I can correct errors or update information. [26#](https://github.com/j0hanz/blog-beat-web/issues/26#issue-2370657407)
- As a User, I want to search for posts so that I can find specific content quickly. [11#](https://github.com/j0hanz/blog-beat-web/issues/11#issue-2370619104)

#### Site Owner Stories

- As a Site Owner, I want to manage posts and comments submitted by users to ensure content quality and relevance. [2#](https://github.com/j0hanz/blog-beat-web/issues/2#issue-2370587484)
- As a Site Owner, I want to create and manage user accounts so that I can control access to the blog site. [1#](https://github.com/j0hanz/blog-beat-web/issues/1#issue-2369664130)


[Back up](#table-of-content)

---

## Bugs

### Unsolved Bugs

- **Profile Image Disappears in Navbar**: The profile image disappears from the navbar upon page reload. It reappears after navigating to the edit profile page and clicking save.
- **New Account Profile Image**: When a user creates a new account, the profile image initially appears blank.




---

## Testing

[View detailed testing information here](TESTING.md).

---

## Deployment

Blog Beat is deployed using Heroku. Follow these steps to deploy your instance:

1. **Create a Heroku Account**: Sign up for [Heroku](https://signup.heroku.com/) to manage cloud-based applications.

2. **Prepare Your Application**:
   - Push your code to the [Blog Beat Web Repository](https://github.com/j0hanz/blog-beat-web) on GitHub.
   - Ensure all necessary changes are committed for deployment.

3. **Create a New Heroku Application**:
   - Log in to Heroku and create a new app.
   - Choose a unique name and select a region.

4. **Set Environment Variables**:
   - Navigate to your app's settings on Heroku.
   - Add required environment variables under "Config Vars" to secure sensitive data.

5. **Deploy Your Application**:
   - Go to the "Deploy" tab in your app's Heroku dashboard.
   - Connect to your GitHub repository and choose the branch to deploy.
   - Click "Deploy Branch" to start the deployment process.

6. **Verify Deployment**:
   - Once deployed, Heroku provides a URL for your live application.
   - Open this URL in your browser to ensure the application is running correctly.

---

### Contributing to Blog Beat

To contribute or make changes:

1. **Fork the Repository**:
   - Visit [Blog Beat Web Repository](https://github.com/j0hanz/blog-beat-web).
   - Click "Fork" to create a copy in your GitHub account.

2. **Clone the Repository**:
   - Copy the repository URL using HTTPS, SSH, or GitHub CLI.
   - Use Git Bash or terminal to clone the repository:
     ```
     git clone https://github.com/YOUR-USERNAME/blog-beat-web.git
     ```
   - Navigate to the cloned directory and start working locally.

Now you're ready to deploy and contribute to Blog Beat!

[Back up](#table-of-content)

---

## Contributing

Contributors looking to improve Blog Beat or add features are welcome.

Please follow the outlined steps:

- Fork the repository
- Clone your fork
- Create a new branch for your feature
- Commit changes with meaningful messages
- Push changes and open a pull request

---

## Credits

This project was inspired by the [Moments](https://github.com/mr-fibonacci/moments/tree/master) project, influencing similar code implementations.

- **Websites:**
  - [favicon.io](https://favicon.io): Used to create the project's favicon.
  - [am I responsive](https://ami.responsivedesign.is/): Utilized for generating website preview images featured at the top of this README.

These resources were instrumental in enhancing and refining the project's functionality and visual appeal.

- **React**: For building a dynamic user interface.
- **Node.js and Express**: For server-side logic.
- **Bootstrap**: For responsive design elements.
- **Axios**: For making HTTP requests from the front-end.

### YouTube Channels

- [ByteGrad](https://www.youtube.com/@ByteGrad)
- [Web Dev Simplified](https://www.youtube.com/@WebDevSimplified)
- [Cosden Solutions](https://www.youtube.com/@cosdensolutions)
- [Jack Herrington](https://www.youtube.com/@jherr)

---

## Acknowledgements

Special thanks to:

- Namify and Logo.com for branding resources.
- **Kristyna** - My cohort facilitator. Thank you for all the support I got from you!

[Back up](#table-of-content)
