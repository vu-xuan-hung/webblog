// src/components/CreateBlog.jsx
/* eslint-disable no-unused-vars */
import FileUploader from "./UpLoad";
import { useState } from "react";

function CreateBlog() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [imageFile, setImageFile] = useState(null);
    const [htmlFile, setHtmlFile] = useState(null);
    const apiUrl = import.meta.env.VITE_FILE_ALL_CONTENT;

    const apiUrl1 = import.meta.env.VITE_FILE_ALL_CONTENT_HTML;
    const apiUrl2 = import.meta.env.VITE_FILE_ALL_CONTENT_FOLDER;

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
        // title, description, releaseDate
        const formDataBase = new FormData();
        formDataBase.append("title", title);
        formDataBase.append("description", description);
        formDataBase.append("releaseDate", new Date().toISOString());
        formDataBase.append("views", 0);

        try {
            const res = await fetch(apiUrl, {
                method: "POST",
                body: formDataBase,
            });
            const data = await res.json();
            console.log(" blog created:", data);
        } catch (error) {
            console.error("Error :", error);
        }

        // file HTML
        if (htmlFile) {
            const formDataHtml = new FormData();
            formDataHtml.append("file", htmlFile);

            try {
                const resHtml = await fetch(apiUrl1, {
                    method: "POST",
                    body: formDataHtml,
                });
                const dataHtml = await resHtml.json();
                console.log("HTML :", dataHtml);
            } catch (error) {
                console.error("Error ", error);
            }
        }

        // folder Image
        if (imageFile) {
            const formDataImage = new FormData();
            formDataImage.append("files", imageFile);

            try {
                const resImg = await fetch(apiUrl2, {
                    method: "POST",
                    body: formDataImage,
                });
                const dataImg = await resImg.json();
                console.log("Image :", dataImg);
            } catch (error) {
                console.error("Error", error);
            }
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