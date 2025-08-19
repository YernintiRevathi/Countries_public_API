# Countries of the World - A Next.js Project

Welcome! This is a web application that lets you explore countries from around the world.

This project is designed to be simple, clean, and fast. It fetches data from a public API and displays it in a user-friendly interface that you can search and browse through.

---

### ✨ Live Demo

A live version of this project is deployed and can be viewed here:

[https://drive.google.com/file/d/1TmYGg8U_8d_p4jzEL7zG9NItzPotkGQA/view?usp=drive_link](url)


---

### 📸 Project Screenshot

<img width="1917" height="969" alt="image" src="https://github.com/user-attachments/assets/f6fcefdd-8dce-46aa-9825-fbb4926c89f9" />

---

### ✅ Core Features

This project meets all the requirements of the screening task, including:

-   **View All Countries:** Fetches and displays a list of all countries from the REST Countries API.
-   **Search Functionality:** Instantly filter the list by typing a country's name in the search bar.
-   **Pagination:** Browse through the results with "Previous" and "Next" buttons, showing 20 countries per page.
-   **Responsive Design:** The layout looks great on all devices, from mobile phones to desktop computers.
-   **Graceful States:** Shows a clear "Loading..." message while fetching data and a helpful error message if the API fails.
-   **Hydration Error Fix:** Carefully handles client-specific formatting to avoid common errors in Next.js.

---

### 🛠️ Technology Stack

This project was built using modern web development tools.The main technologies are:

-   **Next.js:** A powerful **React framework**. It helps build fast and efficient web applications by handling things like server-side rendering and code optimization.
-   **React:** A **JavaScript library** for building user interfaces. It allows us to create reusable "components" (like `CountryCard` or `CountryList`) to keep our code organized.
-   **Tailwind CSS:** A **CSS framework** for styling the application. Instead of writing custom CSS files, we apply pre-made utility classes directly in the HTML, which speeds up development.
-   **REST Countries API:** A free **public API** that provides all the data about the countries used in this project.

---

### 🚀 How to Run This Project Locally

Want to run this project on your own computer? Follow these simple steps.

#### Prerequisites

Make sure you have [Node.js](https://nodejs.org/) installed on your system. This project was built with version 18 or higher.

#### Installation and Setup

1.  **Clone the repository**
    *   This command downloads the project's code from GitHub to your computer.
    ```bash
    git clone https://github.com/YernintiRevathi/Countries_public_API.git
    ```

2.  **Navigate into the project directory**
    ```bash
    cd my-countriesapp
    ```

3.  **Install all the necessary dependencies**
    *   This command reads the `package.json` file and downloads all the tools (like Next.js and React) that the project needs to run.
    ```bash
    npm install
    ```

4.  **Run the development server**
    *   This starts the application.
    ```bash
    npm run dev
    ```

5.  **See the result!**
    *   Open your web browser and go to [http://localhost:3000](http://localhost:3000). You should see the application running.

OR the Next.js app can be created using
```bash
   npx create-next-app@latest my-countriesapp
```
---

### 🧠 Understanding the Code - Key Concepts

For anyone learning, here are some of the key concepts demonstrated in this project's code:

-   **Server vs. Client Components:**
    *   The main page (`page.js`) is a **Server Component**. It runs on the server to fetch all the data quickly. Think of it as a chef preparing the whole meal in the kitchen.
    *   The interactive parts (`CountryList.jsx`, `CountryCard.jsx`) are **Client Components** (marked with `'use client';`). They run in the browser to handle user actions like typing in the search bar. They are like the waiter who brings the meal to you and adds pepper if you ask.

-   **Data Fetching (`async`/`await`):**
    *   We fetch data from the API in an `async` function. The `await fetch(...)` command tells our code to pause and wait for the API to send back the data before continuing.

-   **State Management (`useState`):**
    *   `useState` is a React Hook that gives a component its own "memory." We use it to remember what the user has typed in the search bar (`search`) and which page they are currently on (`currentPage`). When this memory changes, React automatically re-renders the component to show the updates.

-   **Side Effects (`useEffect`):**
    *   `useEffect` is a React Hook for handling "side effects"—things that happen *after* the component has rendered. We used it to solve a tricky hydration error by only formatting the population number *after* the initial render, ensuring the server and client match perfectly.
