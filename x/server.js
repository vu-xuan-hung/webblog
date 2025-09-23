/* eslint-disable no-unused-vars */
import express from "express";
import fs from "fs/promises";
import cors from "cors";
import path from "path";

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// Đường dẫn đến file JSON chứa dữ liệu blog
const postsPath = path.resolve("../src/posts.json");

// ======== HÀM HỖ TRỢ ========

// Đọc dữ liệu blog từ file (async)
const readBlogs = async () => {
    try {
        const rawData = await fs.readFile(postsPath, "utf-8");
        return JSON.parse(rawData);
    } catch (err) {
        // Nếu file chưa tồn tại, trả về mảng rỗng
        if (err.code === "ENOENT") return [];
        throw err;
    }
};

// Ghi dữ liệu blog vào file (async)
const writeBlogs = async (data) => {
    await fs.writeFile(postsPath, JSON.stringify(data, null, 2));
};

// ======== ENDPOINTS ========


// GET tất cả blog → khai báo trước
app.get("/api/blogs", async (req, res) => {
    try {
        const blogs = await readBlogs();
        res.json(blogs);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Không thể đọc dữ liệu blog" });
    }
});


// POST thêm blog mới hận method post
app.post("/api/blogs", async (req, res) => {
    try {
        const { title, tag, image, description, content } = req.body;
        const blogs = await readBlogs();

        const maxId = blogs.reduce((max, blog) => Math.max(max, blog.id), 0);
        const newBlog = {
            id: maxId + 1,
            title,
            tag: tag || "unk",
            image,
            description,
            releaseDate: new Date().toLocaleDateString("vi-VN"),
            content
        };

        blogs.unshift(newBlog);
        await writeBlogs(blogs);

        res.json({ message: "Blog added successfully!", blog: newBlog });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Không thể thêm blog" });
    }
});

// DELETE xóa blog theo id nhận method delete
app.delete("/api/blogs/:id", async (req, res) => {
    try {
        const id = parseInt(req.params.id, 10);
        const blogs = await readBlogs();

        const index = blogs.findIndex(b => b.id === id);
        if (index === -1) return res.status(404).json({ error: "Blog không tồn tại" });

        const deletedBlog = blogs.splice(index, 1)[0];
        await writeBlogs(blogs);

        res.json({ message: "Blog deleted successfully", blog: deletedBlog });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Không thể xóa blog" });
    }
});

// ======== START SERVER ========
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
