import React, { useState, useEffect } from "react";
import Navbar from "./components/Nav/Navbar.jsx"
import FeaturedPosts from "./components/FeaturedPosts/FeaturedPosts";
import Blogs from "./pages/Blogs.jsx";
import Contact from "./pages/Contact.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";
import {
  Routes,
  Route,

} from 'react-router-dom'; import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

import PostDetail from "./pages/PostDetail.jsx";
import BlogList from "./components/BlogList/BlogList";
import SearchResult from "./pages/SearchResult.jsx";
import useLocalStorage from "use-local-storage";
import { useMediaQuery } from "react-responsive";
function App() {
  const preference = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const [isDarkMode, setIsDarkMode] = useLocalStorage("isDark", preference);
  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);
  const isMobile = useMediaQuery({ maxWidth: 650 });
  const isTablet = useMediaQuery({ minWidth: 651, maxWidth: 1024 });

  // const router = createBrowserRouter(
  //   createRoutesFromElements(

  //   )
  // );
  useEffect(() => {
    document.body.setAttribute("data-theme", isDarkMode ? "dark" : "light");
  }, [isDarkMode]);
  return (
    <div className="body">
      <Navbar toggleDarkMode={toggleDarkMode} isDarkMode={isDarkMode} />

      <ToastContainer position="bottom-right" autoClose={3000} />

      <Routes>
        {/* Trang chủ */}
        <Route
          index
          element={
            <div className={`app ${isMobile ? "mobile" : isTablet ? "tablet" : "desktop"}`}>
              <main className="main-content">
                <section className="blog-section">
                  <h3 className="section-title">Most Post</h3>
                  <div className="blog-layout">
                    <div className="blog-grid">
                      <BlogList />
                    </div>
                    {!isMobile &&
                      <aside className="featured-sidebar">
                        <FeaturedPosts />
                      </aside>}

                  </div>
                </section>
              </main>
            </div>
          }
        />
        <Route path="contact" element={<Contact isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />} />
        <Route path="blog" element={<Blogs isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />} />
        <Route path="post/:id" element={<PostDetail />} />
        <Route path="search" element={<SearchResult />} />

        <Route
          path="aplicate"
          element={
            <iframe
              src="/R.html"
              style={{ width: "100%", height: "100vh", border: "none" }}
              title="Cảnh"
            />
          }
        />

        <Route path="*" element={<NotFoundPage />} />
      </Routes>

    </div>
  );
}

export default App;
