#  Book Finder

A simple and elegant web application that allows users to **search for books**, **view detailed information**, and **save favorites** — built using **React** and the **Open Library Search API**.

This project fulfills the *“Book Finder”* user need from the Take-Home Challenge brief.

---

## 🧠 Challenge Context

**User Persona:**  
- **Name:** Alex  
- **Occupation:** College Student  
- **Need:** Alex wants to search for books efficiently and keep track of favorite titles.

**Goal:**  
Design and implement a clean, responsive web application that lets users:  
1. Search books by title (and optionally filter by author, year, or language)  
2. View book details in a modal popup  
3. Save and view favorite books across sessions  

---

## ⚙️ Technology Stack

| Purpose          | Tool                                                  |
|-------------------|-------------------------------------------------------|
| Frontend Framework | **React (CRA)**                                       |
| Styling           | **CSS Variables + Custom Styling**                     |
| Data Source       | **Open Library Search API**                            |
| State Management  | React’s built-in `useState`, `useEffect`, + custom `useLocalStorage` hook |
| Deployment        | CodeSandbox / Vercel / Netlify (any static host)      |

---

## 🚀 Getting Started

### 1️⃣ Clone or extract the project  
```
git clone <https://github.com/Jayasmitha1324/BookFinder>
cd book-finder
```

### 2️⃣ Install dependencies  
```
npm install
```

### 3️⃣ Run the development server  
```
npm start
```
The app will launch in your browser at [http://localhost:3000](http://localhost:3000).

---

## 🌐 Deployment

You can deploy this project easily to:  
- **CodeSandbox** → Upload your folder directly  

---

## 🔍 Features Implemented

✅ **Search Books**  
- Uses [Open Library API](https://openlibrary.org/search.json?title={bookTitle})  
- Supports pagination and filters (author, year, language)  

✅ **View Book Details**  
- Opens a modal with detailed info: title, author, publish year, language, and cover  

✅ **Favorites System**  
- Add/remove favorites via a heart icon  
- Favorites persist using browser `localStorage`  

✅ **Responsive Design**  
- Optimized for both desktop and mobile layouts  

✅ **Error Handling**  
- Displays friendly messages when no results found or network error occurs  

✅ **Routing**  
- `/` → Search page  
- `/favorites` → Favorites list  

---

## 💾 Project Structure

```
src/
 ├── api/
 │    └── openLibrary.js        # API logic  
 ├── components/
 │    ├── BookCard.js  
 │    ├── BookDetailsModal.js  
 │    └── SearchBar.js  
 ├── hooks/
 │    └── useLocalStorage.js  
 ├── pages/
 │    ├── Home.js  
 │    └── Favorites.js  
 ├── App.js  
 ├── index.css  
 └── index.js  
```

---

## 🧠 LLM (ChatGPT) Assistance

This project was developed with the help of **ChatGPT (OpenAI GPT-5)** for:  
- Designing the project structure and component breakdown  
- Writing and debugging React code  
- Reviewing CSS and UI improvements  
- Preparing this README and deployment instructions  

**Chat link:**  
[ChatGPT Project Conversation](https://chatgpt.com/share/690201ad-c044-8011-8450-0c7ab9ade5f3)

Including this link meets the **Level 1 (50%)** “Working with AI” requirement.

---

## 🧑‍💻 Author

**Name:** Jayasmitha B  
**Role:** Full-Stack Intern Candidate  
**Date:** October 2025  

---

## 📄 License  
This project is released under the MIT License.  


