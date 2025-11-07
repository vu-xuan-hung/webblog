// src/components/CreateBlog.jsx
/* eslint-disable no-unused-vars */
import FileUploader from "./UpLoad";
import { useState } from "react";
import styled from "styled-components";

const PageContainer = styled.div`
    padding: 1.5rem; /* p-6 */
    /* Áp dụng màu nền Dark/Light Mode nếu cần */
    /* background-color: ${props => props.isDarkMode ? '#1e1e1e' : '#f4f4f4'}; */
`;

// 2. Tiêu đề
const Title = styled.h2`
    font-size: 1.5rem; /* text-2xl */
    font-weight: bold;
    margin-bottom: 1.5rem; /* mb-6 */
    color: ${props => props.isDarkMode ? '#e0e0e0' : '#333333'};
`;

// 3. Form
const FormGrid = styled.form`
    /* grid gap-6, style={{ gridTemplateColumns: "1fr 1fr" }} */
    display: grid;
    gap: 1.5rem; /* gap-6 */
    grid-template-columns: 1fr 1fr;
`;

// 4. Cột chứa File Uploaders
const UploaderColumn = styled.div`
    /* grid, gap: 50px, flex: 1fr */
    display: grid;
    gap: 50px;
    flex: 1; /* flex: "1fr" là không hợp lệ, dùng flex: 1 */
`;

// 5. Cột chứa Input và Textarea
const InputColumn = styled.div`
    /* flex flex-col space-y-4, flex: 1fr */
    display: flex;
    flex-direction: column;
    gap: 1rem; /* space-y-4 */
    flex: 1;
`;

// 6. Input/Textarea cơ bản
const BaseInput = styled.input`
    /* border p-2 w-full rounded */
    border: 1px solid #d1d5db; /* border */
    padding: 0.5rem; /* p-2 */
    width: 100%;
    border-radius: 0.25rem; /* rounded */
    box-sizing: border-box;
    /* Điều chỉnh màu sắc cho Dark Mode */
    background-color: ${props => props.isDarkMode ? '#333333' : '#ffffff'};
    color: ${props => props.isDarkMode ? '#e0e0e0' : '#333333'};
    transition: background-color 0.3s, color 0.3s;
`;

// 7. Textarea (Kế thừa từ BaseInput)
const DescriptionTextarea = styled(BaseInput).attrs({
    as: 'textarea'
})`
    /* h-40 */
    height: 10rem; /* h-40 tương đương 16 * 0.25rem = 4rem, nhưng 10rem hợp lý hơn cho textarea */
    resize: vertical;
`;

// 8. Button
const SubmitButton = styled.button`
    /* bg-blue-400 text-white px-2 py-2 rounded-lg */
    background-color: #60a5fa; /* bg-blue-400 */
    color: white;
    padding: 0.5rem 0.5rem; /* px-2 py-2 */
    border-radius: 0.5rem; /* rounded-lg */
    border: none;
    cursor: pointer;
    transition: background-color 0.2s;
    
   
    
    &:hover {
        background-color: #3b82f6; /* Màu đậm hơn khi hover */
    }
    align-self: flex-end; /* Đẩy nút xuống dưới nếu cần */
    width: fit-content; /* Chỉ chiếm đủ chiều rộng cần thiết */
`;

function CreateBlog({ isDarkMode, setIsDarkMode }) {
    const [istitle, setTitle] = useState("");
    const [isdescription, setDescription] = useState("");
    const [imageFile, setImageFile] = useState([]);
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
            setImageFile(Array.from(files)); // ép FileList -> array
        }
    };
    let newBlogEntry; // Biến để lưu blog mới (chứa ID)
    const handleSubmit = async (e) => {
        e.preventDefault();
        // title, description, releaseDate
        const formDataBase = {
            title: istitle ?? "unk",
            description: isdescription ?? "unk",
            releaseDate: new Date().toISOString(),
            views: 0,
        }
        try {
            const res = await fetch(apiUrl, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formDataBase),
            });
            console.log("da gui api ", apiUrl);
            newBlogEntry = await res.json();
        } catch (error) {
            console.error("Error :", error);
        }
        const blogId = newBlogEntry.id;
        // file HTML
        if (htmlFile) {
            const formDataHtml = new FormData();
            formDataHtml.append("htmlfile", htmlFile);

            try {
                const resHtml = await fetch(`${apiUrl1}/${blogId}`, {
                    method: "PATCH",
                    body: formDataHtml,
                });
                console.log("da gui api1 ", apiUrl1);
            } catch (error) {
                console.error("Error ", error);
            }
        }

        // folder Image
        if (imageFile && imageFile.length > 0) {
            const formDataImage = new FormData();

            for (const file of imageFile) {
                formDataImage.append('image', file); // Sử dụng cùng một key "files"
            }
            try {
                const resImg = await fetch(`${apiUrl2}/${blogId}`, {
                    method: "PATCH",
                    body: formDataImage,
                });

                console.log("da gui api2 ", apiUrl2);
            } catch (error) {
                console.error("Error", error);
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