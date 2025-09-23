// src/components/UploadFile.jsx
import { useState } from "react";

function UploadFile() {
    const [files, setFiles] = useState([]);

    const handleFiles = (newFiles) => {
        setFiles((prev) => [...prev, ...Array.from(newFiles)]);
        for (let i = 0; i < newFiles.length; i++) {
            uploadFile(newFiles[i]);
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        const droppedFiles = e.dataTransfer.files;
        if (droppedFiles.length > 0) {
            handleFiles(droppedFiles);
        }
    };

    const handleUploadClick = () => {
        document.getElementById("file-input").click();
    };

    async function uploadFile(file) {
        const API_URL = "http://localhost:8080/Upload"; // đổi theo backend

        const formData = new FormData();
        formData.append("file", file);

        try {
            const response = await fetch(API_URL, {
                method: "POST",
                body: formData,
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(
                    `Server responded with ${response.status} - ${errorText}`
                );
            }
            console.log(`${file.name} uploaded thành công!`);
        } catch (error) {
            console.error("Upload failed:", error);
        }
    }

    const formatBytes = (bytes, decimals = 2) => {
        if (bytes === 0) return "0 Bytes";
        const k = 1024;
        const dm = decimals < 0 ? 0 : decimals;
        const sizes = ["Bytes", "KB", "MB", "GB"];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
    };

    return (
        <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl p-8 space-y-8">
            <header className="text-center">
                <h1 className="text-3xl font-bold text-gray-800">File Uploader</h1>
                <p className="mt-2 text-base text-gray-500">
                    Drag and drop your files here to upload.
                </p>
            </header>

            <main className="space-y-6">
                {/* Drop Zone */}
                <div
                    id="drop-zone"
                    className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-xl p-6 flex items-center justify-center text-center transition-all duration-300 ease-in-out"
                    onDrop={handleDrop}
                    onDragOver={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                    }}
                    onClick={handleUploadClick}
                >
                    <input id="file-input" type="file" className="hidden" multiple onChange={(e) => handleFiles(e.target.files)} />
                    <div>
                        <svg
                            className="mx-auto h-12 w-12 text-gray-400"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v9"
                            />
                        </svg>
                        <p className="mt-2 text-sm text-gray-600">
                            <span className="font-semibold">Click to upload</span> or drag and drop
                        </p>
                        <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                    </div>
                </div>

                {/* File List */}
                <div id="file-list-container" className="space-y-4">
                    <h2 className="text-xl font-semibold text-gray-700">Uploaded Files</h2>
                    {files.length === 0 ? (
                        <div className="text-center text-gray-500 text-sm mt-4">
                            No files uploaded yet.
                        </div>
                    ) : (
                        <ul className="divide-y divide-gray-200">
                            {files.map((file, index) => (
                                <li key={index} className="file-item py-3 flex justify-between">
                                    <span className="text-gray-900 font-medium truncate">{file.name}</span>
                                    <span className="text-gray-500 text-sm ml-2">
                                        ({formatBytes(file.size)})
                                    </span>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </main>
        </div>
    );
}

export default UploadFile;
