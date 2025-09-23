import fs from "fs";
import path from "path";
import fetch from "node-fetch"; // nếu Node chưa hỗ trợ fetch

const filePath = path.resolve("src/posts.json");
let posts = [];

// Load JSON từ file local
function loadPosts() {
    if (fs.existsSync(filePath)) {
        const data = JSON.parse(fs.readFileSync(filePath, "utf8"));
        return Array.isArray(data) ? data : [];
    }
    return [];
}

// Khởi tạo posts từ file khi import
posts = loadPosts();

// Hàm fetch API và thêm vào JSON ngay khi import
async function fetchAndSavePosts() {
    try {
        const res = await fetch("https://chubby-pandas-hug.loca.lt/api/getAllPostMetadata");
        if (!res.ok) throw new Error("Network response was not ok");

        const data = await res.json();

        // Nếu API trả về object, lấy mảng trong 'posts' hoặc biến object thành mảng [data]
        const apiPosts = Array.isArray(data) ? data : data.posts ? data.posts : [data];

        // Thêm vào posts hiện tại, tránh trùng id
        apiPosts.forEach(p => {
            if (!posts.some(existing => existing.id === p.id)) posts.push(p);
        });

        // Ghi lại vào file JSON
        fs.writeFileSync(filePath, JSON.stringify(posts, null, 2), "utf8");
    } catch (err) {
        console.error("Fetch API failed:", err);
    }
}

// Gọi ngay khi import
fetchAndSavePosts();

// Hàm thêm post thủ công (nếu cần)
export const addPost = (newPost) => {
    const nextId = posts.length > 0 ? Math.max(...posts.map(p => p.id)) + 1 : 1;
    const postToAdd = {
        id: newPost.id ?? nextId,
        title: newPost.title,
        tag: newPost.tag,
        image: newPost.image,
        description: newPost.description,
        date: newPost.date ?? new Date().toLocaleDateString(),
    };
    posts.push(postToAdd);
    fs.writeFileSync(filePath, JSON.stringify(posts, null, 2), "utf8");
    return postToAdd;
};

export default posts;
