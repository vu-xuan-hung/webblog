import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import useLocalStorage from "use-local-storage";
import { useMediaQuery } from "react-responsive";
import "react-toastify/dist/ReactToastify.css";

// Components
import Shuffle from "./components/Shuffle/Shuffle.jsx";
import BlogList from "./components/BlogList/BlogList";
import MainLayout from "./layouts/MainLayout.jsx";

// Pages
import Blogs from "./pages/Blogs.jsx";
import Contact from "./pages/Contact.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";
import PostDetail from "./pages/PostDetail.jsx";
import SearchResultPage from "./pages/SearchResult.jsx";
import Login from "./pages/Login.jsx";

function App() {
  const preference = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const [isDarkMode, setIsDarkMode] = useLocalStorage("isDark", preference);
  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);

  const isMobile = useMediaQuery({ maxWidth: 650 });

  useEffect(() => {
    document.body.setAttribute("data-theme", isDarkMode ? "dark" : "light");
  }, [isDarkMode]);

  return (
    <Routes>
      {/* --- Main App Layout (with Navbar & Footer) --- */}
      <Route element={<MainLayout isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />}>
        <Route
          index
          element={
            <main className="w-full">
              <section className="w-full">
                <div className="text-center border-b border-red-500 mb-10 py-10">
                  <h3 className="text-4xl md:text-6xl font-bold flex justify-center items-center text-gray-900 dark:text-white">
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

                <div className="w-full">
                  <BlogList />
                </div>
              </section>
            </main>
          }
        />

        <Route path="contact" element={<Contact isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />} />
        <Route path="blog" element={<Blogs isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />} />
        <Route path="post/:id" element={<PostDetail />} />
        <Route path="search" element={<SearchResultPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>

      {/* --- Standalone Layouts (No Navbar/Footer) --- */}
      <Route path="login" element={<Login />} />
    </Routes>
  );
}

export default App;