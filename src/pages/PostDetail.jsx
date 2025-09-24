// src/components/PostDetail.jsx

import { useParams } from "react-router-dom";
import styled from "styled-components";
import { useState, useEffect } from "react";
import StaticHtmlPage from "./StaticHtmlPage";

const Container = styled.div`
  
  margin: 2rem auto;
  padding: 0 1rem;
  display: block;
  text-align: center;
  
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
  line-height: 3.6;
  text-align: center;
  color:var(--primary-text-color)
`;
// eslint-disable-next-line no-unused-vars
const IframeWrapper = styled.div`
  position: relative;
  width: 100%;
  max-width: 1200px;
  margin: 2rem auto;
  aspect-ratio: 16 / 9;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
  background-color:#ffffff;
`;

const Iframe1 = styled.iframe`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: none;
`;


export default function PostDetail() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [allPosts, setAllPosts] = useState([]);
  const apiUrl = import.meta.env.VITE_FILE_ALL;

  useEffect(() => {
    //khai báo một hàm bất đồng bộ
    //Khi một hàm có async, nó sẽ luôn trả về một Promise.
    //Promise là một đối tượng trong JavaScript dùng để xử lý bất đồng bộ, Promise = đối tượng đại diện cho giá trị chưa có ngay (giống "phiếu hẹn").
    async function fetchPosts() {
      //Dùng await để đợi kết quả từ fetch và res.json().
      //await chỉ dùng được trong hàm async, Nó sẽ dừng tạm thời việc chạy code trong hàm, cho đến khi Promise trả về kết quả (resolve hoặc reject).
//fetchPosts() là hàm async → khi component render lần đầu, nó sẽ gọi API nhưng chưa có dữ liệu ngay lập tức.
      try {
        const res = await fetch(apiUrl);//res là đối tượng Response.
        const data = await res.json();//Chuyển dữ liệu JSON từ API thành JavaScript object/array.
        const mapped = data.map((x) => ({
          id: x.id ?? "unk",
          title: x.title ?? "unk",
          image: `${apiUrl.split('/api')[0]}/uploads/${x.image}`,
          description: x.description ?? "unk",
          releaseDate: x.releaseDate ?? "unk",
          content: `${apiUrl.split('/api')[0]}/uploads/${x.content}`,

/*           1. ${apiUrl.split('/api')[0]}
 Phần này lấy URL cơ sở (base URL) của API của bạn.
 apiUrl là một biến chứa URL của API, ví dụ: http://localhost:3000/api/blogs.
 .split('/api') chia chuỗi apiUrl thành một mảng các chuỗi, sử dụng chuỗi '/api' làm điểm phân tách.
Ví dụ: http://localhost:3000/api/blogs.split('/api')sẽ tạo ra mảng['http://localhost:3000', '/blogs']`.
 [0] lấy phần tử đầu tiên của mảng, tức là http://localhost:3000.
kết  quả cuối cùng là URL gốc của server, không bao gồm phần đường dẫn API.

Giả sử các giá trị sau:
apiUrl = "http://localhost:3000/api/blogs"
x.content = "1758722870732-x.html
Đoạn mã sẽ được xử lý như sau:
${apiUrl.split('/api')[0]} sẽ trả về "http://localhost:3000".
Sau đó, các chuỗi sẽ được nối lại: "http://localhost:3000" + "/uploads/" + "1758722870732-x.htm".
Kết quả cuối cùng là một URL hoàn chỉnh và chính xác: http://localhost:3000/uploads/1758722870732-x.htm.
*/
        }));

        setAllPosts(mapped); // lưu vào state
      } catch (err) {
        console.error("Lỗi fetch API:", err);
      }
    }

    fetchPosts();
  }, [apiUrl]); // chạy 1 lần khi component mount
  useEffect(() => {
    const foundPost = allPosts.find((p) => String(p.id) === id);
    setPost(foundPost);
  }, [id,allPosts]);
  //[id, allPosts] → cập nhật khi có dữ liệu mới và khi đổi id.
  //Khi id thay đổi → chạy lại useEffect.
// Khi allPosts thay đổi (do fetch API thành công) → cũng chạy lại useEffect.
// lần đầu render, allPosts mặc định là [] → find sẽ trả về undefined.

// Sau khi fetch API xong, bạn setAllPosts(mapped) → state allPosts thay đổi.

// Nếu dependency array chỉ có [id], thì useEffect không chạy lại khi allPosts đổi. Kết quả là post mãi bằng undefined.
  if (!post) {
    return <Container>Bài viết không tồn tại!</Container>;
  }

  return (
    <Container>
      <Title>{post.title}</Title>
      {post.description && <Description>{post.description}</Description>}
      {post.content &&
        <IframeWrapper>
          <Iframe1 src={post.content}/>
          
         
        </IframeWrapper>
      }
    </Container >
  );
}