import { useParams } from "react-router-dom";
import styled from "styled-components";
import { useState, useEffect } from "react";
import { ClimbingBoxLoader } from "react-spinners";
import parse, { domToReact } from 'html-react-parser'; // Import thư viện
// 1. Container chính
const Container = styled.div`
  margin: 2rem auto;
  padding: 0 1rem;
  display: block;
  text-align: center;
  max-width: 1200px; /* Giới hạn chiều rộng để đẹp hơn */
`;

const Title = styled.h1`
  font-size: 2rem;
  color: #4f46e5;
  text-align: center;
  margin: 2rem auto;
`;

const Description = styled.div`
  margin: 1rem 0;
  font-size: 1rem;
  color: #333;
  line-height: 1.6;
  text-align: center;
  color: var(--primary-text-color);
`;

// 2. Thay IframeWrapper bằng ContentBox để chứa nội dung HTML
const ContentBox = styled.div`
  margin: 2rem auto;
  padding: 2rem;
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1); /* Đổ bóng nhẹ cho đẹp */
  border: 1px solid #e5e7eb; /* Viền mỏng */
  text-align: left; /* Nội dung bài viết thường căn trái */
  min-height: 200px;
  overflow: hidden;

  /* CSS cho các thẻ bên trong nội dung HTML được nạp vào */
  img {
    max-width: 100%;
    height: auto;
    border-radius: 8px;
  }
  
  p {
    line-height: 1.8;
    margin-bottom: 1rem;
  }
`;

export default function PostDetail() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [allPosts, setAllPosts] = useState([]);
  const [htmlContent, setHtmlContent] = useState(""); // State mới để lưu mã HTML thô
  const [loading, setLoading] = useState(true);

  const apiUrl = import.meta.env.VITE_FILE_ALL;

  // Effect 1: Lấy danh sách bài viết
  useEffect(() => {
    async function fetchPosts() {
      try {
        const res = await fetch(apiUrl);
        const data = await res.json();
        const mapped = data.map((x) => ({
          id: x.id ?? "unk",
          title: x.title ?? "unk",
          // image: `${apiUrl}/upload/${x.id}.png`, // Tạm ẩn nếu chưa cần
          description: x.description ?? "unk",
          releaseDate: x.releaseDate ?? "unk",
          contentUrl: `${apiUrl}${x.content}`, // Đổi tên thành contentUrl cho rõ nghĩa
        }));

        setAllPosts(mapped);
      } catch (err) {
        console.error("Lỗi fetch API:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchPosts();
  }, [apiUrl]);

  // Effect 2: Tìm bài viết theo ID
  useEffect(() => {
    const foundPost = allPosts.find((p) => String(p.id) === id);
    setPost(foundPost);
  }, [id, allPosts]);

  // Effect 3 (QUAN TRỌNG): Fetch nội dung HTML từ URL khi đã có post
  useEffect(() => {
    if (post && post.contentUrl) {
      async function fetchHtmlBody() {
        try {
          // Gọi fetch vào đường dẫn file .html
          const res = await fetch(post.contentUrl);
          // Lấy text thay vì json
          const text = await res.text();
          setHtmlContent(text);
        } catch (error) {
          console.error("Không tải được nội dung HTML", error);
          setHtmlContent("<p>Lỗi tải nội dung bài viết.</p>");
        }
      }
      fetchHtmlBody();
    }
  }, [post]);

  if (!post && !loading) {
    return <Container>Bài viết không tồn tại!</Container>;
  }
  const getBaseUrl = () => {
    if (!post.contentUrl) return "";
    return post.contentUrl.substring(0, post.contentUrl.lastIndexOf('/') + 1);// cắt /upload/9/9.htm->/upload/9/
  }; const options = {
    replace: (domNode) => {
      // Nếu node hiện tại là thẻ <img> và có thuộc tính src
      if (domNode.type === 'tag' && domNode.name === 'img' && domNode.attribs.src) {
        const oldSrc = domNode.attribs.src;//lấy src:"image003.png"

        // Nếu link chưa có http/https thì nối thêm base path
        if (!oldSrc.startsWith('http')) {
          const newSrc = `${getBaseUrl()}${oldSrc}`;

          // Trả về thẻ img của React với src mới
          return (
            <img
              {...domNode.attribs} // Giữ lại các thuộc tính khác (width, height, class...)
              src={newSrc}
              style={{ maxWidth: '100%', height: 'auto' }} // Thêm style nếu thích
            />
          );
        }
      }
    }
  };
  return (
    <Container>
      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <ClimbingBoxLoader color="#4f46e5" />
        </div>
      ) : (
        <>
          <Title>{post.title}</Title>
          {post.description && <Description>{post.description}</Description>}

          {/* Phần hiển thị HTML trực tiếp */}
          <ContentBox>
            {/* Thay thế dangerouslySetInnerHTML bằng hàm parse */}
            {post ? parse(htmlContent, options) : null}
          </ContentBox>
        </>
      )}
    </Container>
  );
}