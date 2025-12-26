// src/components/CreateBlog.jsx
/* eslint-disable no-unused-vars */
import FileUploader from "./UpLoad";
import { useState } from "react";
import styled from "styled-components";

const PageContainer = styled.div`
    padding: 1.5rem;
`;

const Title = styled.h2`
    font-size: 1.5rem;
    font-weight: bold;
    margin-bottom: 1.5rem;
    color: ${props => props.isDarkMode ? '#e0e0e0' : '#333333'};
`;

const FormGrid = styled.form`
    display: grid;
    gap: 1.5rem;
    grid-template-columns: 1fr 1fr;
`;

const UploaderColumn = styled.div`
    display: grid;
    gap: 50px;
    flex: 1;
`;

const InputColumn = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    flex: 1;
`;

const BaseInput = styled.input`
    border: 1px solid #d1d5db;
    padding: 0.5rem;
    width: 100%;
    border-radius: 0.25rem;
    box-sizing: border-box;
    background-color: ${props => props.isDarkMode ? '#333333' : '#ffffff'};
    color: ${props => props.isDarkMode ? '#e0e0e0' : '#333333'};
    transition: background-color 0.3s, color 0.3s;
`;

const DescriptionTextarea = styled(BaseInput).attrs({
    as: 'textarea'
})`
    height: 10rem;
    resize: vertical;
`;

const SubmitButton = styled.button`
    background-color: #60a5fa;
    color: white;
    padding: 0.5rem 0.5rem;
    border-radius: 0.5rem;
    border: none;
    cursor: pointer;
    transition: background-color 0.2s;
    
    &:hover {
        background-color: #3b82f6;
    }
    align-self: flex-end;
    width: fit-content;
`;

const AIContainer = styled.div`
  background-color: ${props => props.isDarkMode ? '#2d3748' : '#eeffff'};
  border: 2px dashed ${props => props.isDarkMode ? '#60a5fa' : '#0ea5e9'};
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const AIInput = styled(BaseInput).attrs({ as: 'textarea' })`
  height: 5rem;
  resize: none;
  font-family: monospace;
`;

const AIButton = styled(SubmitButton)`
  background-color: #8b5cf6;
  &:hover {
    background-color: #7c3aed;
  }
  align-self: flex-start;
  display: flex;
  align-items: center;
  gap: 5px;
`;

function CreateBlog({ isDarkMode, setIsDarkMode }) {
    const [istitle, setTitle] = useState("");
    const [isdescription, setDescription] = useState("");
    const [imageFile, setImageFile] = useState([]);
    const [htmlFile, setHtmlFile] = useState(null);
    const [imageTitle, setImageTitle] = useState();
    const [aiPrompt, setAiPrompt] = useState("");
    const [isGenerating, setIsGenerating] = useState(false);
    const [aiStatus, setAiStatus] = useState("");

    const apiUrl = import.meta.env.VITE_FILE_ALL_CONTENT;
    const apiUrl1 = import.meta.env.VITE_FILE_ALL_CONTENT_HTML;
    const apiUrl2 = import.meta.env.VITE_FILE_ALL_CONTENT_FOLDER;
    const apiUrl3 = import.meta.env.VITE_FILE_ALL_CONTENT_IMGTITLE;

    const handleHtmlFile = (files) => {
        if (files && files.length > 0) {
            setHtmlFile(files[0]);
        }
    };

    const handleGenerateAI = async (e) => {
        e.preventDefault();
        if (!aiPrompt.trim()) return;

        setIsGenerating(true);
        setAiStatus("Đang nhờ AI viết bài...");

        // Dùng model 1.5-flash
        const API_KEY = "AIzaSyBC_MXm2qo8iTjTlxpYqh7fwCOj8on0eYE";
        const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${API_KEY}`;

        const systemInstruction = `
            Bạn là một trợ lý viết blog chuyên nghiệp.
            Nhiệm vụ: Viết bài blog dựa trên: "${aiPrompt}".
            
            YÊU CẦU OUTPUT:
            1. Title: Giật tít hấp dẫn.
            2. Description: Mô tả ngắn chuẩn SEO.
            3. Content: Nội dung chi tiết định dạng HTML (dùng thẻ h2, p, ul, li, code...). KHÔNG dùng thẻ html, head, body bao ngoài.
            
            QUAN TRỌNG: Hãy đảm bảo nội dung HTML được escape đúng chuẩn JSON.
        `;

        try {
            const res = await fetch(API_URL, {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    contents: [{
                        parts: [{ text: systemInstruction }]
                    }],
                    generationConfig: {
                        responseMimeType: "application/json"
                    }
                })
            });

            if (!res.ok) throw new Error(`Lỗi API: ${res.status}`);

            const rawData = await res.json();
            let textResponse = rawData.candidates[0].content.parts[0].text;

            textResponse = textResponse.replace(/```json/g, '').replace(/```/g, '').trim();

            let data;
            try {
                data = JSON.parse(textResponse);
            } catch (parseError) {
                const cleanedText = textResponse.replace(/[\u0000-\u001F]+/g, "");
                data = JSON.parse(cleanedText);
            }

            if (data.title) setTitle(data.title);
            if (data.description) setDescription(data.description);

            if (data.content) {
                // --- ĐÂY LÀ CHỖ QUAN TRỌNG NHẤT ---

                // 1. Tạo khung HTML chuẩn (Để trình duyệt không đoán mò)
                const fullHtmlContent = `<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${data.title || 'Blog Post'}</title>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; padding: 20px; color: #333; }
        img { max-width: 100%; height: auto; }
        pre { background: #f4f4f4; padding: 10px; overflow-x: auto; border-radius: 4px; }
    </style>
</head>
<body>
    ${data.content}
</body>
</html>`;

                // 2. Thêm "cái tem" BOM (\ufeff) vào đầu file
                // Việc này làm cho file AI tạo ra GIỐNG HỆT file bạn Save bằng VS Code
                const blob = new Blob(
                    [new Uint8Array([0xEF, 0xBB, 0xBF]), fullHtmlContent],
                    { type: 'text/html;charset=utf-8' }
                );

                const generatedFile = new File([blob], "ai-blog.htm", { type: "text/html" });

                setHtmlFile(generatedFile);
                setAiStatus("✅ Đã tạo bài viết thành công!");
            }

        } catch (error) {
            console.error("Lỗi AI:", error);
            setAiStatus("❌ Lỗi: " + error.message);
        } finally {
            setIsGenerating(false);
        }
    };
    const handleImageFile = (files) => {
        if (files && files.length > 0) {
            setImageFile(Array.from(files));
        }
    };

    const handleImageTitle = (file) => {
        if (file && file.length > 0) {
            setImageTitle(file[0]);
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formDataBase = {
            title: istitle ?? "unk",
            description: isdescription ?? "unk",
            releaseDate: new Date().toISOString(),
            views: 0,
        }

        let newBlogEntry;
        try {
            const res = await fetch(apiUrl, {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formDataBase),
            });
            console.log("da gui api ", apiUrl);
            newBlogEntry = await res.json();
        } catch (error) {
            console.error("Error :", error);
            return; // Dừng nếu tạo base thất bại
        }

        const blogId = newBlogEntry.id;

        // Upload HTML File
        if (htmlFile) {
            const formDataHtml = new FormData();
            formDataHtml.append("htmlfile", htmlFile);

            try {
                await fetch(`${apiUrl1}/${blogId}`, {
                    method: "PATCH",
                    body: formDataHtml,
                });
                console.log("da gui api1 ", apiUrl1);
            } catch (error) {
                console.error("Error html upload", error);
            }
        }

        // Upload Images
        if (imageFile && imageFile.length > 0) {
            const formDataImage = new FormData();
            for (const file of imageFile) {
                formDataImage.append('image', file);
            }
            try {
                await fetch(`${apiUrl2}/${blogId}`, {
                    method: "PATCH",
                    body: formDataImage,
                });
                console.log("da gui api2 ", apiUrl2);
            } catch (error) {
                console.error("Error image upload", error);
            }
        }

        // Upload Image Title
        if (imageTitle) {
            const formDataImageT = new FormData();
            formDataImageT.append('imageTitle', imageTitle);
            try {
                await fetch(`${apiUrl3}/${blogId}`, {
                    method: "PATCH",
                    body: formDataImageT,
                });
                console.log("da gui api3 ", apiUrl3);
            } catch (error) {
                console.error("Error title image upload", error);
            }
        }
    };

    return (
        <PageContainer isDarkMode={isDarkMode}>
            <Title isDarkMode={isDarkMode}>Create Blog</Title>

            <FormGrid onSubmit={handleSubmit}>
                {/* Cột 1: Uploaders */}
                <UploaderColumn>
                    <FileUploader
                        id="image-file-input"
                        title="Image Uploader"
                        fileTypes="PNG, JPG, GIF up to 10MB"
                        onChange={handleImageFile}
                        isDarkMode={isDarkMode}
                    />
                    <FileUploader
                        id="html-file-input"
                        title="HTML Uploader"
                        fileTypes="HTM, HTML up to 10MB"
                        onChange={handleHtmlFile}
                        isDarkMode={isDarkMode}
                    />
                </UploaderColumn>

                {/* Cột 2: Inputs */}
                <InputColumn>
                    <AIContainer isDarkMode={isDarkMode}>
                        <div style={{ fontWeight: 'bold', color: isDarkMode ? '#fff' : '#333' }}>
                            AI Content Generator ✨
                        </div>
                        <AIInput
                            isDarkMode={isDarkMode}
                            placeholder="Nhập yêu cầu: Ví dụ 'Viết blog về React JS cơ bản...'"
                            value={aiPrompt}
                            onChange={(e) => setAiPrompt(e.target.value)}
                        />
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <AIButton onClick={handleGenerateAI} disabled={isGenerating}>
                                {isGenerating ? "Đang viết..." : "Tạo bài viết"}
                            </AIButton>
                            <span style={{ fontSize: '0.9rem', color: isDarkMode ? '#aaa' : '#555' }}>
                                {aiStatus}
                            </span>
                        </div>
                    </AIContainer>
                    <FileUploader
                        id="image-title-input"
                        title="Image Title Uploader"
                        fileTypes=".jpg up to 10MB"
                        onChange={handleImageTitle}
                        isDarkMode={isDarkMode}
                    />
                    <BaseInput
                        isDarkMode={isDarkMode}
                        type="text"
                        placeholder="Blog Title"
                        value={istitle}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <DescriptionTextarea
                        isDarkMode={isDarkMode}
                        placeholder="Blog description"
                        value={isdescription}
                        onChange={(e) => setDescription(e.target.value)}
                    />

                    <SubmitButton type="submit">
                        Submit Blog
                    </SubmitButton>
                </InputColumn>
            </FormGrid>
        </PageContainer>
    );
}

export default CreateBlog;