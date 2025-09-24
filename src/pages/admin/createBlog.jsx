// src/components/CreateBlog.jsx
/* eslint-disable no-unused-vars */
import FileUploader from "./UpLoad"; 
import { useState } from "react";

function CreateBlog() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [imageFile, setImageFile] = useState(null);
    const [htmlFile, setHtmlFile] = useState(null);

    const handleHtmlFile = (files) => {
        if (files && files.length > 0) {
            setHtmlFile(files[0]);
        }
    };

    const handleImageFile = (files) => {
        if (files && files.length > 0) {
            setImageFile(files[0]);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("title", title);
        formData.append("description", description);
        formData.append("releaseDate", new Date().toISOString());

        if (imageFile) formData.append("imageFile", imageFile);
        if (htmlFile) formData.append("htmlFile", htmlFile);

        try {
            const res = await fetch("http://localhost:3000/api/blogs", {
                method: "POST",
                body: formData,
            });

            const data = await res.json();
            console.log("Blog created:", data);
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-6">Create Blog</h2>

            <form
                className="grid gap-6"
                style={{ gridTemplateColumns: "1fr 1fr" }}
                onSubmit={handleSubmit}
            >
                <div className="grid" style={{ gap: "50px", flex: "1fr" }}>
                    <FileUploader
                        id="image-file-input"
                        title="Image Uploader"
                        fileTypes="PNG, JPG, GIF up to 10MB"
                        onChange={handleImageFile}
                    />
                    <FileUploader
                        id="html-file-input"
                        title="HTML Uploader"
                        fileTypes="HTM, HTML up to 10MB"
                        onChange={handleHtmlFile}
                    />
                </div>

                <div className="flex flex-col space-y-4" style={{ flex: "1fr" }}>
                    <input
                        type="text"
                        placeholder="Blog Title"
                        className="border p-2 w-full rounded"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <textarea
                        placeholder="Blog description"
                        className="border p-2 w-full rounded h-40"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    ></textarea>

                    <button
                        type="submit"
                        className="bg-blue-400 text-white px-2 py-2 rounded-lg"
                        style={{ marginTop: "30px", marginLeft: "500px" }}
                    >
                        Submit Blog
                    </button>
                </div>
            </form>
        </div>
    );
}

export default CreateBlog;