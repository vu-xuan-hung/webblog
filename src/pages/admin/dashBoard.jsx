import React, { useState,useEffect } from 'react';
import postsData from "../../posts.json"
import { Link, Router } from 'react-router-dom';
import HomePage from '../HomePage';
import { useNavigate } from "react-router-dom";
import PeopleIcon from "@mui/icons-material/People";
import ArticleIcon from "@mui/icons-material/Article";
// Dữ liệu người dùng được định nghĩa trực tiếp để tránh lỗi đường dẫn tệp
const adminData = {
    name: "H",
    title: "H",
    email: "vu",
    avatar: "https://placehold.co/80x80/6c5ce7/ffffff?text=H"
};
const Dashboard = () => {
    // Sử dụng useState để lưu trữ danh sách blog và thông tin người dùng
    // Khởi tạo state với các giá trị từ dữ liệu đã được định nghĩa trực tiếp
    // eslint-disable-next-line no-unused-vars
    const [blogs, setBlogs] = useState(postsData.blogs);
    // eslint-disable-next-line no-unused-vars
    const [userInfo, setUserInfo] = useState(adminData);
    const navigate = useNavigate(); // Khởi tạo navigate
    const mainBlogPosts = postsData.filter(post => post.tag !== "Featured");
    // Hàm xử lý việc xóa một bài blog khỏi danh sách
    const handleDelete = async (idToDelete) => {
        try {
            const res = await fetch(`http://localhost:3000/api/blogs/${idToDelete}`, {
                method: "DELETE",
            });
            if (res.ok) {
                setBlogs(prevBlogs => prevBlogs.filter(post => post.id !== idToDelete));
            } else {
                alert("Xóa thất bại!");
            }
        } catch (err) {
            console.error(err);
            alert("Lỗi kết nối server");
        }
    };
   


    // Hàm xử lý khi người dùng nhấn nút tạo ý tưởng blog

    return (
        <div style={styles.dashboard}>
            {/* Phần hồ sơ người dùng */}
            <div style={styles.userProfile}>
                <div style={styles.profileInfo}>
                    {/* Sử dụng src từ userInfo.avatar để hiển thị ảnh đại diện */}
                    <img src={userInfo.avatar} alt="User Avatar" style={styles.avatar} />
                    <div style={styles.details}>
                        <h2 style={styles.name}>{userInfo.name}</h2>
                        <p style={styles.text}>{userInfo.title}</p>
                        <p style={styles.text}>{userInfo.email}</p>
                        <p style={styles.totalBlogs}>Total Blog: {mainBlogPosts.length}</p>
                    </div>
                </div>
                <div style={styles.actions}>
                    <button
                        style={styles.createBlogBtn}
                        onClick={() => navigate("/createBlog")}
                    >
                        CREATE BLOG
                    </button>
                    <button style={styles.logoutBtn}
                        onClick={() => {
                            // Xoá token + expiry
                            localStorage.removeItem("adminToken");
                            localStorage.removeItem("expiry");

                            // Chuyển hướng về trang login
                            window.location.href = "/adminLogin";
                            // hoặc nếu bạn dùng useNavigate:
                            // navigate("/adminLogin");
                        }}
                    >LOGOUT</button>
                </div>
            </div>

            <hr style={styles.separator} />

            {/* Phần bảng danh sách blog */}
            <div style={styles.blogTableContainer}>
                <table style={styles.table}>
                    <thead style={styles.tableHeader}>
                        <tr>
                            <th style={styles.th}>S.No</th>
                            <th style={styles.th}>Thumbnail</th>
                            <th style={styles.th}>Title</th>
                            <th style={styles.th}>Date</th>
                            <th style={styles.th}>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {mainBlogPosts.map((post, index) => (

                            <tr key={index} style={styles.tableRow}>
                                <td style={styles.td}>{index + 1}</td>
                                <td style={styles.td}>
                                    <img src={post.thumbnail} alt="Thumbnail" style={styles.blogThumbnail} />
                                </td>
                                <td style={styles.td}>{post.title}</td>

                                <td style={styles.td}>{post.releaseDate}</td>
                                <td style={styles.td}>
                                    <button onClick={() => handleDelete(post.id)} style={styles.deleteBtn}>
                                        Delete
                                    </button>

                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

// Định nghĩa CSS với JavaScript (CSS-in-JS)
const styles = {
    dashboard: {
        fontFamily: 'Arial, sans-serif',
        padding: '20px',
        backgroundColor: '#f0f2f5'

    },
    userProfile: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)',

    },
    profileInfo: {
        display: 'flex',
        alignItems: 'center',
        margin: 'auto'
    },

    avatar: {
        width: '80px',
        height: '80px',
        borderRadius: '50%',
        border: '2px solid #6c5ce7',
        marginRight: '20px',
    },
    details: {
        lineHeight: '1.5',
    },
    name: {
        margin: '0',
        fontSize: '1.5em',
    },
    text: {
        margin: '0',
    },
    totalBlogs: {
        fontWeight: 'bold',
    },
    actions: {
        display: 'flex',
    },
    createBlogBtn: {
        padding: '10px 20px',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        fontWeight: 'bold',
        color: 'white',
        backgroundColor: '#6c5ce7',
        marginRight: '10px',
    },
    logoutBtn: {
        padding: '10px 20px',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        fontWeight: 'bold',
        color: 'white',
        backgroundColor: '#e74c3c',
    },
    separator: {
        border: '0',
        borderTop: '1px solid #ccc',
        margin: '20px 0',
    },
    aiSection: {
        marginTop: '20px',
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
        textAlign: 'center'
    },
    generateBtn: {
        padding: '12px 24px',
        border: 'none',
        borderRadius: '8px',
        cursor: 'pointer',
        fontWeight: 'bold',
        color: 'white',
        backgroundColor: '#5A5AD6',
        fontSize: '16px',
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
        transition: 'transform 0.2s',
    },
    loadingText: {
        marginTop: '10px',
        color: '#6c5ce7',
        fontStyle: 'italic',
    },
    aiIdeasContainer: {
        marginTop: '20px',
        textAlign: 'left',
    },
    aiIdeasTitle: {
        fontSize: '1.2em',
        color: '#333',
        marginBottom: '10px',
    },
    aiIdeasList: {
        listStyle: 'none',
        padding: '0',
        margin: '0',
    },
    aiIdeaItem: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '15px',
        border: '1px solid #ddd',
        borderRadius: '8px',
        marginBottom: '10px',
        backgroundColor: '#f9f9f9',
    },
    aiIdeaSummary: {
        fontSize: '0.9em',
        color: '#555',
        marginTop: '5px',
    },
    aiIdeaCategory: {
        fontSize: '0.8em',
        color: '#777',
        fontStyle: 'italic',
        marginTop: '5px',
    },
    addIdeaBtn: {
        padding: '8px 12px',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        fontWeight: 'bold',
        color: 'white',
        backgroundColor: '#6c5ce7',
    },
    blogTableContainer: {
        marginTop: '20px',
        backgroundColor: 'white',
        borderRadius: '10px',
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
        overflow: 'hidden',
    },
    table: {
        width: '100%',
        borderCollapse: 'collapse',
    },
    tableHeader: {
        backgroundColor: '#34495e',
        color: 'white',
        alignItems: 'left'
    },
    th: {
        padding: '15px',
        textAlign: 'left',

    },
    td: {
        padding: '15px',
        borderBottom: '1px solid #ddd',
        margin: 'auto',
        textAlign: 'left',
        overflow: 'hidden'
    },
    blogThumbnail: {
        width: '50px',
        height: '30px',
        objectFit: 'cover',
        borderRadius: '2px',
        overflow: 'hidden'
    },
    deleteBtn: {
        backgroundColor: '#e74c3c',
        color: 'white',
        border: 'none',
        padding: '8px 12px',
        borderRadius: '5px',
        cursor: 'pointer',
    },
};
export default Dashboard;
//
// const [aiIdeas, setAiIdeas] = useState([]);
// const [isLoading, setIsLoading] = useState(false); const handleGenerateIdeas = async () => {
//     setIsLoading(true);
//     setAiIdeas([]);

//     const prompt = "Hãy tạo một danh sách 3 ý tưởng viết blog về chủ đề công nghệ, mỗi ý tưởng bao gồm tiêu đề, một tóm tắt ngắn và thể loại. Đưa ra câu trả lời dưới dạng JSON array.";
//     const payload = {
//         contents: [{ parts: [{ text: prompt }] }],
//         generationConfig: {
//             responseMimeType: "application/json",
//             responseSchema: {
//                 type: "ARRAY",
//                 items: {
//                     type: "OBJECT",
//                     properties: {
//                         "title": { "type": "STRING" },
//                         "category": { "type": "STRING" },
//                         "summary": { "type": "STRING" }
//                     }
//                 }
//             }
//         }
//     };

//     const apiKey = "";
//     const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${apiKey}`;

//     try {
//         const response = await fetch(apiUrl, {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify(payload)
//         });

//         if (!response.ok) {
//             console.error('API call failed with status:', response.status);
//             setIsLoading(false);
//             return;
//         }

//         const result = await response.json();
//         const jsonText = result.candidates?.[0]?.content?.parts?.[0]?.text;
//         if (jsonText) {
//             const ideas = JSON.parse(jsonText);
//             setAiIdeas(ideas);
//         }
//     } catch (error) {
//         console.error('Error fetching blog ideas:', error);
//     } finally {
//         setIsLoading(false);
//     }
// };

// // Hàm thêm ý tưởng blog được tạo bởi AI vào danh sách blog hiện có
// const handleAddAiIdea = (idea) => {
//     const newBlog = {
//         thumbnail: "https://placehold.co/50x30/f39c12/ffffff?text=AI",
//         title: idea.title,
//         category: idea.category,
//         date: new Date().toLocaleDateString('vi-VN')
//     };
//     setBlogs([newBlog, ...blogs]);
// };

// <div style={styles.aiSection}>
//     <button onClick={handleGenerateIdeas} style={styles.generateBtn}>
//         Generate Blog Ideas ✨
//     </button>
//     {isLoading && <p style={styles.loadingText}>Đang tạo ý tưởng...</p>}
//     {aiIdeas.length > 0 && (
//         <div style={styles.aiIdeasContainer}>
//             <h3 style={styles.aiIdeasTitle}>Ý tưởng Blog được tạo bởi AI</h3>
//             <ul style={styles.aiIdeasList}>
//                 {aiIdeas.map((idea, index) => (
//                     <li key={index} style={styles.aiIdeaItem}>
//                         <div>
//                             <strong>{idea.title}</strong>
//                             <p style={styles.aiIdeaSummary}>{idea.summary}</p>
//                             <p style={styles.aiIdeaCategory}>Thể loại: {idea.category}</p>
//                         </div>
//                         <button onClick={() => handleAddAiIdea(idea)} style={styles.addIdeaBtn}>
//                             Add to Dashboard
//                         </button>
//                     </li>
//                 ))}
//             </ul>
//         </div>
//     )}
// </div>