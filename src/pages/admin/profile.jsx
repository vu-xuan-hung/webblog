/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
// 💡 Bước 1: Import CSS Module
import styles from "./profile.module.css";

const AdminProfile = () => {
    const [isCount, setIsCount] = useState(0);

    const apiUrl = import.meta.env.VITE_FILE_ALL;

    const admin =
        [
            {
                name: "Admin User1",
                role: "Software Developer",
                email: "vuxuanhung2203@gmail.com",
                totalBlogs: isCount,
                avatar: "/c.png",
            },
            {
                name: "Admin User2",
                role: "Software Developer",
                email: "quangkhaipro07gmail.com",
                totalBlogs: isCount,
                avatar: "/k.png",
            }
        ];



    const handleLogout = () => {
        localStorage.removeItem("adminToken");
        localStorage.removeItem("expiry");
        window.location.href = "/admin/adminLogin";
    };

    useEffect(() => {
        async function fetchPosts() {
            try {
                const res = await fetch(apiUrl);

                if (!res.ok) {
                    throw new Error(`Failed to fetch posts. Status: ${res.status}`);
                }

                const data = await res.json();
                setIsCount(data.length);
            } catch (error) {
                console.error("Lỗi khi fetch posts (CORS/Network):", error);
                setIsCount(0);
            }
        }
        fetchPosts();

    }, [apiUrl]);

    return (
        // 💡 Bước 2: Sử dụng styles.className
        <>
            <div className={styles.profileContainer}
            >

                {
                    admin.map((ad, index) =>

                        <div key={index} className={styles.profileCard}>
                            <div className={styles.Card}>
                                <img
                                    src={ad.avatar}
                                    alt="avatar"
                                    className={styles.avatar}
                                />
                                < h2 className={styles.profileName} > {ad.name}</h2>
                                <p className={styles.profileRole}>{ad.role}</p>
                                <p className={styles.profileEmail}>{ad.email}</p>
                                <p className={styles.totalBlogs}>
                                    Total Blogs:
                                    <span>{ad.totalBlogs}</span>
                                </p>
                                <p>

                                </p>
                            </div>
                        </div>
                    )}



            </div>

            <button
                onClick={handleLogout}
                className={styles.logoutButton}
            >
                Logout
            </button>
        </>
    );
};

export default AdminProfile;