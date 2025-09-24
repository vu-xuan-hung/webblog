import React, { useState, useEffect } from "react";
import Header from "./components/Header/Header";
import FeaturedPosts from "./components/FeaturedPosts/FeaturedPosts";
import HomePage from "./pages/HomePage";
import Contact from "./pages/Contact.jsx";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import PostDetail from "./pages/PostDetail.jsx";
import BlogList from "./components/BlogList/BlogList";
import SearchResult from "./pages/SearchResult.jsx";
import useLocalStorage from "use-local-storage";

function App() {
  const apiUrl =  import.meta.env.VITE_FILE_ALL;

  const preference = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const [isDarkMode, setIsDarkMode] = useLocalStorage("isDark", preference);
  const [allPostsn, setAllPostsn] = useState([]);
  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);
  useEffect(() => {
    //khai báo một hàm bất đồng bộ
    //Khi một hàm có async, nó sẽ luôn trả về một Promise.
    //Promise là một đối tượng trong JavaScript dùng để xử lý bất đồng bộ, Promise = đối tượng đại diện cho giá trị chưa có ngay (giống "phiếu hẹn").
    async function fetchPosts() {
      //Dùng await để đợi kết quả từ fetch và res.json().
      //await chỉ dùng được trong hàm async, Nó sẽ dừng tạm thời việc chạy code trong hàm, cho đến khi Promise trả về kết quả (resolve hoặc reject).

      try {
        const res = await fetch(apiUrl);//res là đối tượng Response.
        const data = await res.json();//Chuyển dữ liệu JSON từ API thành JavaScript object/array.
        const mapped = data.map((x) => ({
          id: x.id ?? "unk",
          title: x.title ?? "unk",
          image: `${apiUrl.split('/api')[0]}/uploads/${x.image}`,
          description: x.description ?? "unk",
          releaseDate: x.releaseDate ?? "unk",
          view: x.view ?? 0,
          content: `${apiUrl.split('/api')[0]}/uploads/${x.content}`,
        }));

        setAllPostsn(mapped); // lưu vào state
      } catch (err) {
        console.error("Lỗi fetch API:", err);
      }
    }

    fetchPosts();
  }, [apiUrl]); // chạy 1 lần khi component mount
  useEffect(() => {
    document.body.setAttribute("data-theme", isDarkMode ? "dark" : "light");
  }, [isDarkMode]);
  const featuredPosts = allPostsn.slice(0, 4);
  return (
    <>
      <Header toggleDarkMode={toggleDarkMode} isDarkMode={isDarkMode} />
      <ToastContainer position="bottom-right" autoClose={3000} />

      <Routes>
        {/* Trang chủ */}
        <Route
          index
          element={
            <div className="app">
              <main className="main-content">
                <section className="blog-section">
                  <h3 className="section-title">Most Post</h3>
                  <div className="blog-layout">
                    <div className="blog-grid">
                      <BlogList />
                    </div>
                    <aside className="featured-sidebar">
                      <FeaturedPosts posts={featuredPosts} />
                    </aside>
                  </div>
                </section>
              </main>
            </div>
          }
        />

        <Route path="contact" element={<Contact isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />} />
        <Route path="blog" element={<HomePage isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />} />
        <Route path="post/:id" element={<PostDetail />} />
        <Route path="search" element={<SearchResult />} />

        <Route
          path="aplicate"
          element={
            <iframe
              src="/R.html"
              style={{ width: "1980px", height: "900px", border: "none" }}
              title="Cảnh"
            />
          }
        />
      </Routes>
    </>
  );
}

export default App;
