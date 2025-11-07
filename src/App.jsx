import React, { useEffect } from "react";
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
import Shuffle from "./components/Shuffle/Shuffle.jsx";
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
      {/* Nội dung App hiển thị trên nền */}

      <Navbar toggleDarkMode={toggleDarkMode} isDarkMode={isDarkMode} />
      <ToastContainer position="bottom-right" autoClose={3000} />
      <div className="content">
        <Routes>
          {/* Trang chủ */}
          <Route
            index
            element={
              <div className={`app ${isMobile ? "mobile" : isTablet ? "tablet" : "desktop"}`}>
                <main className="main-content">
                  <section className="blog-section">
                    <h3 className="section-title">
                      <Shuffle
                        text="Most Post"
                        shuffleDirection="right"
                        duration={0.35}
                        animationMode="evenodd"
                        shuffleTimes={1}
                        ease="power3.out"
                        stagger={0.03}
                        threshold={0.1}
                        triggerOnce={true}
                        triggerOnHover={true}
                        respectReducedMotion={true}
                      /></h3>
                    <div className="blog-layout">
                      <div className="blog-grid">
                        <BlogList />
                      </div>
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
      <div className="footer">
        <div className="footer-content">
          <p>
            Hi! I'm <strong>Vũ Xuân Hùng</strong>, a Computer Science student at
            Hanoi University of Industry.
          </p>

          <div className="social">
            <a href="https://www.facebook.com/vu.xuan.hung.883474" target="_blank">
              <i className="fab fa-facebook"></i> Facebook
            </a>
            <a href="https://github.com/vu-xuan-hung" target="_blank">
              <i className="fab fa-github"></i> GitHub
            </a>
          </div>
        </div>

        <div className="copyright">
          <p>© 2025 Vũ Xuân Hùng. All rights reserved. | Designed & Developed by Hùng Vũ</p>
        </div>
      </div>


    </div>
  );

}

export default App;
