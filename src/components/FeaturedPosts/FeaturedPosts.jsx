import React from 'react';
import styles from './FeaturedPosts.module.css';
import { useEffect, useState } from "react";

import Content from '../Content';
const FeaturedPosts = () => {
    const apiUrl = import.meta.env.VITE_FILE_ALL;
    const [allPostsn, setAllPostsn] = useState([]);
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
                    image: `${apiUrl.split('/api')[0]}/upload/${x.image}`,
                    description: x.description ?? "unk",
                    releaseDate: x.releaseDate ?? "unk",
                    view: x.view ?? 0,
                    content: `${apiUrl.split('/api')[0]}/upload/${x.content}`,
                }));

                setAllPostsn(mapped); // lưu vào state
            } catch (err) {
                console.error("Lỗi fetch API:", err);
            }
        }

        fetchPosts();
    }, [apiUrl]); // chạy 1 lần khi component mount

    const featuredPosts = allPostsn.slice(0, 4);
    return (

        <div className={styles.container}>
            <h3 className={styles.title}>Lastest</h3>
            <div className={styles.postList}>
                {featuredPosts.map(post => (
                    <Content key={post.id} post={post} />
                ))}

            </div>
        </div>

    );
};

export default FeaturedPosts;