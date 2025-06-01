# React-Walla-Store

---

## 🚀 Project Overview

WallaStore is a practice e-commerce style application built as part of the Keepcoding Web Development Bootcamp. This application allows users to browse, create, and manage advertisements for items they want to sell or buy. It's a demonstration of fundamental React concepts.

---

## ✨ Features

- **Advertisements:** View a list of adverts, categorized by whether they are for sale or wanted items.

- **Advert Creation:** Easily create new adverts, with an optional image upload. Images are handled using `multipart/form-data`.

- **Advert Details:** Click on any advert to see its full details and, if you're the owner, the option to delete it.

- **Filtering:** Filter adverts by type ("sale" or "buy") and by various tags like "lifestyle," "mobile," or "motor."

- **User Authentication:** Secure login with "remember me" functionality. If checked, your authentication token is stored in **`localStorage`**; otherwise, it's stored in **`sessionStorage`**.

---

## 🛠️ Technologies Used

- **React:** The core JavaScript library for building the user interface.

- **Vite:** A fast build tool for modern web projects.

- **Tailwind CSS:** A utility-first CSS framework for rapid and responsive styling.

- **Lucide React:** A beautiful and customizable icon library for React.

- **React Router DOM:** For declarative routing within the application.

- **Fundamental React Concepts:** Use of `useState`, `useEffect`, `createContext`, and `ContextProvider` for state management and data flow.

---

## ⚙️ Getting Started

To get a copy of the project up and running on your local machine, follow these simple steps.

### Prerequisites

Make sure you have Node.js installed.

### Installation

1.  **Clone the repository:**

```bash
git clone https://github.com/Mitronios/keepcoding-react-fundamentals-walla-store

cd react-walla-store

```

2.  **Install dependencies:**

```bash
npm install
# or
yarn install

```

3.  **Run the development server:**

```bash
npm run dev
# or
yarn dev

```

    This will typically open the application in your browser at `http://localhost:5173`.

4.  **Clone the Backend repository**

```bash
git clone https://github.com/davidjj76/nodepop-api

cd nodepop-api

```

5.  **Install dependencies:**

```bash
npm install
# or
yarn install

```

6.  **Run the development server:**

```bash
npm run dev
# or
yarn dev

```

7. **Check the swagger docs**

- Navigate to: /swagger and check how the API works.

- If preferred use docker hub:

```bash
    $ docker run --name nodepop-api -dp 3001:3001 -v nodepop-api-data:/home/node/app/data -v nodepop-api-uploads:/home/node/app/uploads davidjj76/nodepop-api
```

---

## 📚 Learnings & Concepts Applied

This project provided hands-on experience with:

- **State Management:** Effectively using `useState` for local component state and `createContext`/`ContextProvider` for global application state.

- **Lifecycle Methods with `useEffect`:** Managing side effects in functional components.

- **Routing with React Router DOM:** Implementing navigation and dynamic routes.

- **Styling with Tailwind CSS:** Rapidly styling components with utility classes.

- **API Integration:** Handling data fetching and submission, including `multipart/form-data` for file uploads.

- **Local and Session Storage:** Managing user sessions and authentication tokens.

---

## 🎓 Acknowledgment

This project was developed as a practice exercise during the **Keepcoding Web Development Bootcamp**. It represents a culmination of the fundamental React principles taught throughout the course.
