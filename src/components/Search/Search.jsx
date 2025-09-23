import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // import useNavigate
import "./Search.css";

export default function SearchBar() {
    const [inputText, setInputText] = useState("");//useState khởi tạo inputText ban đầu bằng chuỗi rỗng

    /* useState("") → khởi tạo kiểu string.

    useState(1) → khởi tạo kiểu number.

    useState([]) → khởi tạo kiểu array.

    useState({}) → khởi tạo kiểu object. */
    const navigate = useNavigate(); // hook navigate

    const inputHandler = (e) =>// khi nhập inputhandler sẽ gán = e rồi setcais input
    {
        //e chính là event object (sự kiện mà React truyền vào khi trong input), target là phần tử HTML phát ra sự kiện (ở đây chính là <input>)..
        var lowerCase = e.target.value.toLowerCase();//e.target là <input type="text" />
        setInputText(lowerCase);//set
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (inputText.trim()) {
            // Navigate tới page /search với query

            navigate(`/search?q=${encodeURIComponent(inputText)}`);
        }
    };

    return (
        <form className="search" onSubmit={handleSubmit}//bấm Enter React sẽ gọi hàm handleSubmit(e)
        >
            < input type="text"
                placeholder=""
                value={inputText}//giá trị hiển thị trong ô input luôn lấy từ state inputText
                onChange={inputHandler} //mỗi khi gõ vào, gọi hàm inputHandler(e), lấy e.target.value, cập nhật state bằng setInputText(...)->set luôn inputtext
            /> <div> <svg> <use xlinkHref="#path" /> </svg> </div>


            {/* Hidden SVG */}
            <svg xmlns="http://www.w3.org/2000/svg" style={{ display: "none" }}>
                <symbol xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 28" id="path">
                    <path
                        d="M32.94,-20.68 C37.94,-20.68 40.94,-16.68 40.94,-12.68 
               C40.94,-8.68 37.94,-4.68 32.94,-4.68 
               C27.94,-4.68 24.94,-8.68 24.94,-12.68 
               C24.94,-16.68 27.94,-20.68 32.94,-20.68 
               L32.94,-29.87 
               C32.94,-30.36 33.34,-30.77 33.84,-30.77 
               C34.08,-30.77 34.30,-30.67 34.47,-30.50 
               L141.37,76.38"
                        transform="translate(83.15,22.17) rotate(-225) translate(-83.15,-22.17)"
                    />
                </symbol>
            </svg>
        </form>
    );
}
