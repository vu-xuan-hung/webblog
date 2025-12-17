import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import useLocalStorage from "use-local-storage";
import { useMediaQuery } from "react-responsive";
import "react-toastify/dist/ReactToastify.css";

// Components
import Navbar from "./components/Nav/Navbar.jsx";
import Shuffle from "./components/Shuffle/Shuffle.jsx";
import BlogList from "./components/BlogList/BlogList";

// Pages
import Blogs from "./pages/Blogs.jsx";
import Contact from "./pages/Contact.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";
import PostDetail from "./pages/PostDetail.jsx";
import SearchResult from "./pages/SearchResult.jsx";

// Styles
import styles from "./App.module.css";

function App() {
  const preference = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const [isDarkMode, setIsDarkMode] = useLocalStorage("isDark", preference);
  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);


  const isMobile = useMediaQuery({ maxWidth: 650 });

  useEffect(() => {
    document.body.setAttribute("data-theme", isDarkMode ? "dark" : "light");
  }, [isDarkMode]);

  return (
    <>
      {/* Container chính: Quản lý chiều cao full màn hình và Flexbox */}
      <div className={styles.App}>

        <Navbar toggleDarkMode={toggleDarkMode} isDarkMode={isDarkMode} />

        <ToastContainer position="bottom-right" autoClose={3000} />


        <div className={styles.content}>
          <Routes>
            <Route
              index
              element={
                <main className={styles.maincontent}>
                  <section className={styles.blogsection}>
                    <div className={styles.herosection}>
                      <h3 className={styles.sectiontitle}>
                        <Shuffle
                          text="Most Posts"
                          shuffleDirection="right"
                          duration={0.35}
                          animationMode="evenodd"
                          shuffleTimes={1}
                          ease="power3.out"
                          stagger={0.02}
                          loop={true}
                          loopDelay={1.2}
                          threshold={0.1}
                          triggerOnce={true}
                          triggerOnHover={true}
                          respectReducedMotion={true}
                        />
                      </h3>
                    </div>

                    {/* Danh sách bài viết */}

                    <div className={styles.bloggrid}>
                      <BlogList />
                    </div>


                  </section>
                </main>
              }
            />

            {/* --- Các trang khác --- */}
            <Route path="contact" element={<Contact isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />} />
            <Route path="blog" element={<Blogs isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />} />
            <Route path="post/:id" element={<PostDetail />} />
            <Route path="search" element={<SearchResult />} />

            {/* Trang Iframe */}
            <Route
              path="aplicate"
              element={
                <iframe
                  src="/R.html"
                  style={{ width: "100%", height: "100%", border: "none", minHeight: "80vh" }}
                  title="Cảnh"
                />
              }
            />

            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>

        {/* --- Footer --- */}
        <footer className={styles.footer}>
          <div className={styles.footercontent}>
            <p>
              Hi! I'm <strong>Vũ Xuân Hùng</strong>, a Computer Science student at
              Hanoi University of Industry.
            </p>

            <div className={styles.social}>
              <a href="https://www.facebook.com/vu.xuan.hung.883474" target="_blank" rel="noreferrer">
                <i className="fab fa-facebook"></i> Facebook
              </a>
              <a href="https://github.com/vu-xuan-hung" target="_blank" rel="noreferrer">
                <i className="fab fa-github"></i> GitHub
              </a>
            </div>
          </div>

          <div className={styles.copyright}>
            <p>© 2025 Vũ Xuân Hùng. All rights reserved. | Designed & Developed by Hùng Vũ</p>
          </div>
        </footer>
      </div>
    </>
  );
}

export default App;