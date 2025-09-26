/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useEffect } from "react";

import PaginationLink from "../components/Pagination/PaginationK.jsx";
import FeaturedPostsSidebar from "../components/FeaturedPostsSidebar/FeaturedPostsSidebar.jsx";



// Styled Components
const Container = styled.div`
  padding: 2rem 5rem;
  display: flex;
  gap: 2rem;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
`;

const MainContent = styled.div`
  flex: 0;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px));
  gap: 2rem;
`;

const Card = styled.div`
  max-height:230px;
  max-wight:250px;
  border-radius: 2rem;
  display: flex; 
  overflow: clip;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  background-color: #fff;

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 12px 25px rgba(0, 0, 0, 0.2);
  }

  
`;

const CardImage = styled.img`
  width: 33%;
  height: 230px;
  object-fit: cover;
  filter: brightness(0.9);
  ${Card}:hover & {
    filter: brightness(1);
  }
`;

const CardTitle = styled.h3`
  font-size: 1.3rem;
  color: #1a202c;
  margin: 0.5rem 0;
  line-height: 1.3;
  backdrop-filter: blur(2px);
`;
const CardContent = styled.div`

  flex: 1;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const CategoryLabel = styled.div`
  font-size: 0.8rem;
  background-color: #e0f2fe;
  color: #007bff;
  padding: 0.3rem 0.8rem;
  border-radius: 0.5rem;
  margin-bottom: 0.75rem;
  display: inline-block;
  font-weight: 600;
`;


const Pagination = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 40px;
  gap: 10px;
  overflow: hidden;
`;

const PageButton = styled.button`
  padding: 0.6rem 1rem;
  background: ${({ active }) =>
    active ? "linear-gradient(135deg, #4caf50, #66bb6a)" : "#2a2f3a"};
  color: ${({ active }) => (active ? "#fff" : "#ddd")};
  border: none;
  border-radius: 12px;
  cursor: pointer;
  min-width: 40px;
  font-size: 0.95rem;
  font-weight: 500;
  transition: all 0.3s ease;

  &:hover {
    background: ${({ active }) =>
    active ? "linear-gradient(135deg, #43a047, #66bb6a)" : "#3d4552"};
    color: #fff;
  }

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
`;


const CardSummary = styled.p`
  font-size: 1rem;
  color: #4a5568;
  line-height: 1.6;
  column-count: auto;
  max-height: 70%;
  overflow: hidden;
`;
const Search = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;

  padding: 12px 16px;
  max-width: 600px;
  margin: 20px auto 30px;

  background: ${({ active }) => (active ? "var(--background-color)" : "var(--background-color)")};
  color: ${({ active }) => (active ? "#fff" : "#333")};
  border: 1px solid ${({ active }) => (active ? "#4caf50" : "#ddd")};
  border-radius: 12px;
  box-shadow: 0 2px 6px rgba(0,0,0,0.05);
  transition: all 0.3s ease;

  input {
    flex: 1;
    padding: 8px 12px;
    border: none;
    outline: none;
    border-radius: 8px;
    font-size: 16px;
    background: #fff;
    color: var(--secondary-text-color);
    transition: background 0.3s, color 0.3s;
    &::placeholder {
      color: var(--secondary-text-color);
      opacity: 1; /* đảm bảo hiển thị rõ, mặc định nhiều browser để mờ */
    }// nó cho phép cái placeholder đc dùng css
  }
  // &::placeholder {
  //     color: var(--secondary-text-color);
  //     opacity: 1; /* đảm bảo hiển thị rõ, mặc định nhiều browser để mờ */
  //   }
  // }
  button {
    padding: 10px 18px;
    border: none;
    background: #4caf50;
    color: #fff;
    font-weight: 500;
    cursor: pointer;
    transition: 0.3s;

    &:hover {
      background: #43a047;
    }
  }

    &:hover {
      background: ${({ active }) => (active ? "#2e7d32" : "var(--secondary-text-color)")};
    }

    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  }


  
`;

const MainContent1 = styled.div`
  flex: 2;
  
  display: flex;
  gap: 2rem;
 justify-content: space-around;
`;
const CardData = styled.div`
  display: flex;
  flex-direction: column; /* Đặt các phần tử theo chiều dọc */
  align-items: center; /* Căn giữa theo chiều ngang */
  font-size: 12px;
  color: #0c0d0fff;
  margin-top: 40px;
  font-weight: 600;
  text-transform: uppercase;
  
  gap: 5px;
`;

const CardView = styled.div`
  font-size: 12px;
  color: #0c0d0fff;
  margin-top: 40px;
  font-weight: 600;
  text-transform: uppercase;
  display:inline-block;
  flex: 0;
  gap: 5px;
flex-direction: column;
  align-items: center;
`;
const MainWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;
const LogoImage = styled.img`
  max-width: 30px;
  max-height: 30px;
  object-fit: cover;
  flex-direction: row
`;
const PaginationContainer = styled.div`
  display: flex;
  justify-content: center; 
  margin-top: 2rem; 
`;
const HomePage = ({ isDarkMode, setIsDarkMode }) => {
  const [allPosts, setAllPosts] = useState([]);
  const apiUrl = import.meta.env.VITE_FILE_ALL;

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
          image: `${apiUrl.split('/api')[0]}/FileHtml/${x.id}`,
          description: x.description ?? "unk",
          releaseDate: x.releaseDate ?? "unk",
          content: `${apiUrl.split('/posts')[0]}/FileHtml/${x.id}.html`,
          view: x.view ?? 0,
        }));

        setAllPosts(mapped); // lưu vào state
      } catch (err) {
        console.error("Lỗi fetch API:", err);
      }
    }

    fetchPosts();
  }, [apiUrl]); // chạy 1 lần khi component mount


  const mainBlogPosts = allPosts.filter(post => post.tag !== "Featured");//loc bai viet ko co featured
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 8;// mỗi trang 7 bài
  const startIndex = (currentPage - 1) * postsPerPage;// 0
  const endIndex = startIndex + (postsPerPage - 1);//0+7
  const [inputValue, setInputValue] = useState("");
  // cắt mảng ra đúng số bài cho trang hiện tại
  const currentPosts = mainBlogPosts.slice(startIndex, endIndex);//cat so posts
  const totalPages = Math.ceil(mainBlogPosts.length / postsPerPage);//so trang
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };
  const handleGoPage = () => {
    const pageNumber = parseInt(inputValue, 10);
    if (!isNaN(pageNumber) && pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };
  //khung cua blog( cac khung bai viet)
  return (
    <Container>
      <MainWrapper>
        <MainContent

        >
          {currentPosts.map((post, index) => (
            <Link key={post.id} to={`/post/${post.id}`} style={{ textDecoration: "none" }}>
              {/* key={index} */}
              <Card
                style={{ backgroundColor: isDarkMode ? ' #c2edda' : '#fff' }}
              >
                <CardImage src={post.image} alt={post.title} />
                <CardContent>
                  <CardTitle>{post.title}</CardTitle>
                  <CardSummary>{post.description}</CardSummary>
                  <MainContent1>
                    <CardData>
                      <LogoImage src="./datelogo.png" alt="" />
                      <span>{post.releaseDate}</span>
                    </CardData>
                    <CardView>
                      <LogoImage src="./logo1.png" alt="" />
                      <span>{post.view}</span>
                    </CardView>
                  </MainContent1>
                </CardContent>

              </Card>
            </Link>
          ))}
        </MainContent>
        <PaginationContainer>
          <PaginationLink
            isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            currentPage={currentPage}

          />
        </PaginationContainer>
        <Search
          style={{
            backgroundColor: isDarkMode ? ' #c2edda' : '#fff',// màu nền khi dark/light
            color: isDarkMode ? '#fff' : '#333',             // màu chữ khi dark/light
          }}>
          <input
            style={{
              color: isDarkMode ? '#000' : '#000',             // màu chữ khi dark/light
            }}
            type="text"
            placeholder="Nhập trang..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}//lấy cái ở phần nhập: onchange
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleGoPage();
              }
            }}
          />
          <PageButton onClick={handleGoPage}>Go</PageButton>
        </Search>

      </MainWrapper>

      {/* Sidebar */}
      <FeaturedPostsSidebar
        isDarkMode={isDarkMode}
        posts={allPosts} />
    </Container>
  );
};

export default HomePage;
