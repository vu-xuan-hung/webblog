/* eslint-disable no-unused-vars */
import { avatar } from "@material-tailwind/react";
import React, { useState, useEffect } from "react";
//sử dụng đúng props object const AdminProfile = ({ isDarkMode, setIsDarkMode }) =>
const AdminProfile = ({ isDarkMode, setIsDarkMode }) => {
    const [isCount, setIsCount] = useState(0);
    const [isFull, setIsFull] = useState("");
    const [isOpen, setIsOpen] = useState(false);

    const apiUrl = import.meta.env.VITE_FILE_ALL;
    const admin = {
        name: "Admin User",
        role: "Software Developer",
        email: "admin@gmail.com",
        totalBlogs: isCount,
        avatar: "/c.png", // link ảnh avatar
    };

    const handleLogout = () => {
        localStorage.removeItem("adminToken");
        localStorage.removeItem("expiry");
        window.location.href = "/admin/adminLogin"; // điều hướng về login
    };

    useEffect(() => {
        async function fetchPosts() {
            try {
                //Có await → code dừng lại ở đó, đợi Promise trả về kết quả, rồi mới chạy tiếp.
                const res = await fetch(apiUrl);
                const data = await res.json();
                setIsCount(data.length);
            } catch (error) {
                console.log("err");
            }
        }
        fetchPosts();

    }, [apiUrl])
    return (
        <div className="flex justify-center items-center min-h-screen "
        >
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full text-center"
                style={{
                    backgroundColor: isDarkMode ? '#c2edda' : '#fff', // màu nền khi dark/light

                }}
            >
                {/* Avatar */}
                <img

                    src={admin.avatar}
                    alt="avatar"
                    className="w-24 h-24 rounded-full mx-auto border-4 border-blue-500"
                />

                {/* Thông tin */}
                <h2 className="mt-4 text-2xl font-bold text-gray-800">{admin.name}</h2>
                <p className="text-gray-600">{admin.role}</p>
                <p className="text-gray-500">{admin.email}</p>
                <p className="mt-2 font-semibold text-gray-500">
                    Total Blogs:
                    <span className="text-blue-600">{admin.totalBlogs}</span>
                </p>

                {/* Nút */}

                <button
                    onClick={handleLogout}
                    className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                >
                    Logout
                </button>

            </div>
        </div>
    );
};

export default AdminProfile;

// import React, { useEffect, useState } from "react";

// const AdminProfile = () => {
//     const [data, setData] = useState(null);

//     useEffect(() => {
//         fetch("http://localhost:5000/api/admin/stats") // endpoint backend
//             .then(res => res.json())
//             .then(json => setData(json))
//             .catch(err => console.error(err));
//     }, []);

//     if (!data) return <p>Loading...</p>;

//     return (
//         <div className="p-6">
//             <h1 className="text-2xl font-bold text-green-600 mb-4">Admin Profile</h1>

//             <div className="bg-white shadow-md rounded-lg p-6 mb-6">
//                 <h2 className="text-xl font-semibold mb-2">Thông tin cá nhân</h2>
//                 <p><strong>Tên:</strong> {data.name}</p>
//                 <p><strong>Email:</strong> {data.email}</p>
//                 <p><strong>Chức vụ:</strong> {data.role}</p>
//             </div>

//             <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
//                 <div className="bg-white p-6 rounded-lg shadow-md text-center">
//                     <h3 className="text-lg font-semibold">Total Views</h3>
//                     <p className="text-2xl font-bold">{data.totalViews}</p>
//                 </div>
//                 <div className="bg-white p-6 rounded-lg shadow-md text-center">
//                     <h3 className="text-lg font-semibold">Total Posts</h3>
//                     <p className="text-2xl font-bold">{data.totalPosts}</p>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default AdminProfile;
