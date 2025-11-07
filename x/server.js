/* eslint-disable no-unused-vars */
import express from "express";
import fs from "fs/promises";
import cors from "cors";
import path from "path";
import multer from "multer";

const app = express();
const PORT = 3000;

app.use(cors());
// ❌ Bỏ express.json() ở route này, vì FormData không phải JSON
// app.use(express.json());

// Thư mục lưu file upload

const uploadDir = path.resolve("./uploads");
const postsPath = path.resolve("../src/posts.json");

// Đảm bảo thư mục uploads tồn tại
import { existsSync, mkdirSync } from "fs";
if (!existsSync(uploadDir)) {
  mkdirSync(uploadDir, { recursive: true });
}

// Cấu hình Multer để lưu file
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage });

// ======== HÀM HỖ TRỢ ========
const readBlogs = async () => {
  try {
    const rawData = await fs.readFile(postsPath, "utf-8");
    return JSON.parse(rawData);
  } catch (err) {
    if (err.code === "ENOENT") return [];
    throw err;
  }
};
let dataBlogs = readBlogs();
const writeBlogs = async (data) => {
  await fs.writeFile(postsPath, JSON.stringify(data, null, 2));
};

// ======== ENDPOINTS ========

// GET tất cả blog
app.get("/api/blogs", async (req, res) => {
  try {

    res.json(dataBlogs);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Không thể đọc dữ liệu blog" });
  }
});

// POST thêm blog mới (multipart: image + html file + text fields)
app.post(
  "/api/blogs",
  upload.fields([{ name: "imageFile" }, { name: "htmlFile" }]),
  async (req, res) => {
    try {
      const { title, description } = req.body; // <-- giờ req.body sẽ có do Multer parse
      let blogs = await readBlogs();
      const maxId = blogs.reduce((max, blog) => Math.max(max, blog.id), 0);
      const newBlog = {
        id: maxId + 1,
        title,
        description,
        image: req.files?.imageFile?.[0]?.filename || null,
        content: req.files?.htmlFile?.[0]?.filename || null,
        releaseDate: new Date().toLocaleDateString("vi-VN"),
      };

      blogs = [...blogs, newBlog];
      await writeBlogs(blogs);

      res.json({ message: "Blog added successfully!", blog: newBlog });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Không thể thêm blog" });
    }
  }
);

// DELETE blog theo id
app.delete("/api/blogs/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    const blogs = await readBlogs();

    const index = blogs.findIndex((b) => b.id === id);
    if (index === -1)
      return res.status(404).json({ error: "Blog không tồn tại" });

    const newBlog = blogs.filter(bl => bl.id != id)
    await writeBlogs(newBlog);

    res.json({ message: "Blog deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Không thể xóa blog" });
  }
});

// Serve file tĩnh (để truy cập ảnh / html upload)
app.use("/uploads", express.static(uploadDir));

// ======== START SERVER ========
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
