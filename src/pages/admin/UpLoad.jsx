import { useState } from "react";
import styled, { css } from "styled-components";


const formatBytes = (bytes, decimals = 2) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
};

// --- STYLED COMPONENTS (Đã định nghĩa trước đó) ---

// 1. Container cho toàn bộ Uploader
const UploaderWrapper = styled.div`
    /* w-full max-w-2xl bg-white rounded-2xl shadow-xl p-8 space-y-8 */
    width: 100%;
    max-width: 42rem;
    background-color: ${props => props.isDarkMode ? '#1e1e1e' : '#ffffff'};
    border-radius: 1rem;
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1);
    padding: 2rem;
    display: flex;
    flex-direction: column;
    gap: 2rem;
    transition: background-color 0.3s;
`;

// 2. Header
const Header = styled.header`
    text-align: center;
    h1 {
        font-size: 1.875rem;
        font-weight: 700;
        color: ${props => props.isDarkMode ? '#e0e0e0' : '#1f2937'};
    }
    p {
        margin-top: 0.5rem;
        font-size: 1rem;
        color: ${props => props.isDarkMode ? '#9ca3af' : '#6b7280'};
    }
`;

// 3. Main Content
const MainContent = styled.main`
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
`;

// 4. Drop Zone
const DropZone = styled.div`
    background-color: ${props => props.isDarkMode ? '#2c3e50' : '#f9fafb'};
    border: 2px dashed ${props => props.isDarkMode ? '#4b5563' : '#d1d5db'};
    border-radius: 0.75rem;
    padding: 1.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    min-height: 10rem;
    cursor: pointer;
    transition: all 0.3s ease-in-out;

    &:hover {
        background-color: ${props => props.isDarkMode ? '#34495e' : '#f3f4f6'};
        border-color: #2563eb;
    }
    ${props => props.isDragging && css`
        background-color: ${props => props.isDarkMode ? '#34495e' : '#e0f2fe'};
        border-color: #2563eb;
    `}
`;

// 5. Drop Zone Content (SVG và Text)
const DropZoneContent = styled.div`
    svg {
        margin-left: auto;
        margin-right: auto;
        height: 3rem;
        width: 3rem;
        color: ${props => props.isDarkMode ? '#9ca3af' : '#9ca3af'};
    }
    p.main-text {
        margin-top: 0.5rem;
        font-size: 0.875rem;
        color: ${props => props.isDarkMode ? '#cccccc' : '#4b5563'};
        span {
            font-weight: 600;
        }
    }
    p.file-types {
        font-size: 0.75rem;
        color: ${props => props.isDarkMode ? '#9ca3af' : '#6b7280'};
    }
`;

// 6. File List Container
const FileListContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    h2 {
        font-size: 1.25rem;
        font-weight: 600;
        color: ${props => props.isDarkMode ? '#e0e0e0' : '#374151'};
    }
    div.empty-state {
        text-align: center;
        color: ${props => props.isDarkMode ? '#9ca3af' : '#6b7280'};
        font-size: 0.875rem;
        margin-top: 1rem;
    }
`;

// 7. File List
const FileList = styled.ul`
    list-style: none;
    padding: 0;
    margin: 0;
    & > li:not(:last-child) {
        border-bottom: 1px solid ${props => props.isDarkMode ? '#374151' : '#e5e7eb'};
    }
`;

// 8. File Item
const FileItem = styled.li`
    padding-top: 0.75rem;
    padding-bottom: 0.75rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    span.file-name {
        color: ${props => props.isDarkMode ? '#f3f4f6' : '#111827'};
        font-weight: 500;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        max-width: 70%;
    }
    span.file-size {
        color: ${props => props.isDarkMode ? '#9ca3af' : '#6b7280'};
        font-size: 0.875rem;
        margin-left: 0.5rem;
        flex-shrink: 0;
    }
`;


// --- COMPONENT CHÍNH ---

function FileUploader({ id, title, fileTypes, onChange, isDarkMode }) {
    const [files, setFiles] = useState([]);
    const [isDragging, setIsDragging] = useState(false); // State mới

    const handleFiles = (newFiles) => {
        setFiles((prev) => [...prev, ...Array.from(newFiles)]);
        if (onChange) {
            onChange(Array.from(newFiles));
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false); // Kết thúc kéo
        const droppedFiles = e.dataTransfer.files;
        if (droppedFiles.length > 0) {
            handleFiles(droppedFiles);
        }
    };

    const handleUploadClick = () => {
        document.getElementById(id).click();
    };

    // Hàm formatBytes đã được đặt ở đầu file

    return (
        <UploaderWrapper isDarkMode={isDarkMode}>
            <Header isDarkMode={isDarkMode}>
                <h1>{title}</h1>
                <p>
                    Drag and drop your files here to upload.
                </p>
            </Header>

            <MainContent>
                <DropZone
                    id="drop-zone"
                    onDrop={handleDrop}
                    // Bắt đầu kéo
                    onDragEnter={() => setIsDragging(true)}
                    // Kéo qua (cần preventDefault và stopPropagation)
                    onDragOver={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                    }}
                    // Kết thúc kéo
                    onDragLeave={() => setIsDragging(false)}
                    onClick={handleUploadClick}
                    isDragging={isDragging}
                    isDarkMode={isDarkMode}
                >
                    <input
                        id={id}
                        type="file"
                        // ❌ Vẫn dùng className="hidden" hoặc tương đương CSS thuần
                        style={{ display: 'none' }}
                        multiple
                        onChange={(e) => {
                            handleFiles(e.target.files);
                            e.target.value = null; // Reset input để cho phép upload lại cùng file
                        }}
                    />
                    <DropZoneContent isDarkMode={isDarkMode}>
                        <svg
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
                        <p className="main-text">
                            <span className="font-semibold">Click to upload</span> or drag and drop
                        </p>
                        <p className="file-types">{fileTypes}</p>
                    </DropZoneContent>
                </DropZone>

                <FileListContainer isDarkMode={isDarkMode}>
                    <h2>Uploaded Files</h2>
                    {files.length === 0 ? (
                        <div className="empty-state">
                            No files uploaded yet.
                        </div>
                    ) : (
                        <FileList isDarkMode={isDarkMode}>
                            {files.map((file, index) => (
                                <FileItem key={index} isDarkMode={isDarkMode}>
                                    <span className="file-name">{file.name}</span>
                                    <span className="file-size">
                                        ({formatBytes(file.size)})
                                    </span>
                                </FileItem>
                            ))}
                        </FileList>
                    )}
                </FileListContainer>
            </MainContent>
        </UploaderWrapper>
    );
}

export default FileUploader;