/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

import fs from "fs";
import fetch from "node-fetch";
import readline from "readline";
import dotenv from "dotenv";
// Tạo interface nhập từ console
dotenv.config();
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
const api_Url = process.env.VITE_API_WEB;//co the thay doi Api

// Hỏi người dùng muốn lưu file nào
rl.question("Nhập 1 để lưu posts.json (tất cả bài), 2 để lưu postsn.json (số bài theo nhập): ", (fileChoice) => {
    let filePath;
    let apiUrl;

    if (fileChoice === "1") {
        filePath = process.env.VITE_FILE_ALL;
        apiUrl = `${api_Url}/posts/getAll`;//${...} lấy dữ liệu từ nhập hoặc const
        processFetch(filePath, apiUrl);
        rl.close();
    } else if (fileChoice === "2") {
        filePath = process.env.VITE_FILE_NEW;
        rl.question("Nhập số bài viết muốn lấy: ", (input) => {
            const numPosts = parseInt(input);
            if (isNaN(numPosts) || numPosts <= 0) {
                console.log("Vui lòng nhập một số hợp lệ!");
                rl.close();
                return;
            }
            apiUrl = `${api_Url}/posts/getMostViewed/${numPosts}`;//so post nhieu view nhat
            processFetch(filePath, apiUrl);
            rl.close();
        });
    } else {
        console.log("Lựa chọn không hợp lệ!");
        rl.close();
    }
});
// them dl vao filepath 
function processFetch(filePath, apiUrl) {
    // Đọc file hiện tại, nếu không có thì tạo mảng rỗng
    let jsonData = [];
    if (fs.existsSync(filePath)) {
        const data = fs.readFileSync(filePath, "utf-8");//doc file luu vao data theo String, utf-8 file đọc được dưới dạng ký tự Unicode
        jsonData = JSON.parse(data);//chuyen json-> doi tuong js(cai data dc luu ở trên)
    }

    // Fetch dữ liệu từ API
    fetch(apiUrl)
        .then(response => {
            if (!response.ok) throw new Error('Network error');
            return response.json();
        })
        //cho dl vao 
        .then(data => {
            for (let x of data) //cho x chạy trong data( data là 1 mảng đt)
            {
                const id = x.id ?? "unk";
                const title = x.title ?? "unk";
                const tag = x.tag ?? "unk";
                const image = `${api_Url}/FileImage/${id}.png`;
                const description = x.description ?? "unk";
                const releaseDate = x.releaseDate ?? "unk";
                const content = `${api_Url}/FileHtml/${id}.html`;
                jsonData.push({ id, title, tag, image, description, releaseDate, content });
            }

            // Ghi dữ liệu vào file
            fs.writeFileSync(filePath, JSON.stringify(jsonData, null, 4), 'utf-8');//hàm đồng bộ để ghi dữ liệu vào filepath, Chuyển đối tượng JavaScript thành chuỗi JSON.,
            console.log(`Dữ liệu đã được lưu vào ${filePath}`);
        })
        .catch(error => console.error('Fetch error:', error));
}
