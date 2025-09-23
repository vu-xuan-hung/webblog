import React, { useState } from 'react';

// Dữ liệu mẫu (có thể lấy từ API)
const initialBlogs = [
    {
        thumbnail: 'https://via.placeholder.com/150', // Thay bằng URL hình ảnh thực tế
        title: 'React Introduction',
        category: 'reactjs',
        date: 'Jul 29, 2023',
    },
    // Thêm các bài blog khác vào đây
    {
        thumbnail: 'https://via.placeholder.com/150',
        title: 'Learn JavaScript ES6',
        category: 'javascript',
        date: 'Aug 10, 2023',
    },
    {
        thumbnail: 'https://via.placeholder.com/150',
        title: 'CSS Grid Layout',
        category: 'css',
        date: 'Sep 05, 2023',
    },
];

const Dashboard = () => {
    const [blogs, setBlogs] = useState(initialBlogs);

    const handleDelete = (indexToDelete) => {
        setBlogs(blogs.filter((_, index) => index !== indexToDelete));
    };

    return (
        <div style={styles.dashboard}>
            {/* Phần hồ sơ người dùng */}
            <div style={styles.userProfile}>
                <div style={styles.profileInfo}>
                    <img src="https://via.placeholder.com/100" alt="User Avatar" style={styles.avatar} />
                    <div style={styles.details}>
                        <h2 style={styles.name}>Kamal Nayan Upadhyay</h2>
                        <p style={styles.text}>Software Developer</p>
                        <p style={styles.text}>knupadhyay784@gmail.com</p>
                        <p style={styles.totalBlogs}>Total Blog: {blogs.length}</p>
                    </div>
                </div>
                <div style={styles.actions}>
                    <button style={styles.createBlogBtn}>CREATE BLOG</button>
                    <button style={styles.logoutBtn}>LOGOUT</button>
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
                            <th style={styles.th}>Category</th>
                            <th style={styles.th}>Date</th>
                            <th style={styles.th}>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {blogs.map((blog, index) => (
                            <tr key={index} style={styles.tableRow}>
                                <td style={styles.td}>{index + 1}</td>
                                <td style={styles.td}>
                                    <img src={blog.thumbnail} alt="Thumbnail" style={styles.blogThumbnail} />
                                </td>
                                <td style={styles.td}>{blog.title}</td>
                                <td style={styles.td}>{blog.category}</td>
                                <td style={styles.td}>{blog.date}</td>
                                <td style={styles.td}>
                                    <button onClick={() => handleDelete(index)} style={styles.deleteBtn}>
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
        backgroundColor: '#f0f2f5',
        minHeight: '100vh',
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
    blogTableContainer: {
        marginTop: '20px',
        backgroundColor: 'white',
        borderRadius: '8px',
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
    },
    th: {
        padding: '15px',
        textAlign: 'left',
    },
    td: {
        padding: '15px',
        borderBottom: '1px solid #ddd',
    },
    blogThumbnail: {
        width: '50px',
        height: '30px',
        objectFit: 'cover',
        borderRadius: '4px',
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