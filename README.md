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

# Table of Contents

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
    - [Surface](#surface)
        - [Design Choices](#design-choices)
        - [Colors](#colors)
        - [Typography](#typography)
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

---

## Strategy

### Project Goals

To provide a rich blogging experience that encourages interaction and content creation.

### User Goals

To access a platform that is intuitive and enhances the blogging experience through user-centric design.

### Site Owner Goals

To grow a community around diverse blog content and provide tools that foster user engagement.

### Target Audience

Bloggers, readers, and content creators from various backgrounds interested in sharing and discussing diverse topics.

### User Requirements and Expectations

- A responsive and accessible website.
- Secure and efficient user authentication and management.
- Tools for content creation, editing, and interaction.

---

## Scope

### Features

Blog Beat is designed to deliver a blogging experience with the following features:

- **Responsive Design**: Optimized for all devices, ensuring accessibility anywhere.
- **User Authentication**: A robust system for secure logins and account management.
- **CRUD Operations**: For creating, editing, deleting, and viewing posts.
- **Interactive Comments**: A platform for users to comment and engage with the community.
- **Search Capability**: Efficient keyword search to swiftly find relevant posts.
- **Like Functionality**: Allows users to like posts, enhancing interactive feedback.
- **Popular Profiles**: Showcases leading user profiles based on activity and engagement.

### Future Features

- **Rich Text Editor**: Enhance the post creation experience with a rich text editor.
- **Analytics Dashboard**: Provide users with insights into their post performance.
- **Content Scheduling**: Allow users to schedule posts for future publication.
- **Multimedia Support**: Enable embedding of videos, images, and other media types in posts.
- **Dark Mode**: Offer an alternative theme for better readability in low light conditions.

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

---

## Surface

### Design Choices

Focus on minimalism and readability to enhance user experience.

### Colors

### Typography

---

## Technologies Used

### Front-End Technologies

- **React**: Component-based architecture for dynamic UIs.
- **Bootstrap**: For responsive and mobile-first design.
- **Axios**: For API data fetching and management.
- **Font Awesome**: For interface enhancement with icons.
- **Sass**: For advanced CSS features like variables and mixins.
- **HTML5 & CSS3**: Standards for structuring and styling web content.

### Back-End Technologies

- **Node.js**: Platform for server-side JavaScript.
- **Express.js**: Web framework for Node.js to build APIs.
- **MongoDB**: NoSQL database for handling large volumes of data.
- **JWT**: For secure information transmission and authentication.

### Development Tools and Libraries

- **Git & GitHub**: For version control and collaboration.
- **Heroku**: For deploying and managing the application.
- **Webpack & Babel**: For bundling modules and compiling modern JavaScript.
- **dotenv**: For managing environment variables.
- **CORS**: For enabling cross-origin requests.

---

## Methodology

### Agile Development

Followed an agile methodology with an initial focus on developing a functional site that covered all key user stories. Additional features and functionalities were added incrementally.

#### MoSCoW Method

The MoSCoW method was used to prioritize features:

- **Must Have**: Essential for project success.
- **Should Have**: Important but not critical.
- **Could Have**: Nice to have, consider for future.

#### Story Points

**Story Points** are a way to estimate the effort required to complete a task. They take into account the complexity, risks, and time needed. Story points use numbers 1, 2, 3, 5, and 8 to represent different effort levels.

#### Sprint

Details of sprint cycles and their outcomes are provided to showcase the iterative development approach.

### User Stories as GitHub Issues

User stories are managed as GitHub issues, allowing for transparent tracking and updates.

---

## Bugs

---

## Testing

[View detailed testing information here](TESTING.md).

---

## Deployment

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

- **React**: For building a dynamic user interface.
- **Node.js and Express**: For server-side logic.
- **Bootstrap**: For responsive design elements.
- **Axios**: For making HTTP requests from the front-end.

---

## Acknowledgements
