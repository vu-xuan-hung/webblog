import { AlignCenter } from "lucide-react";
import UploadFile from "./UpLoad";

function CreateBlog() {
    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-6">Create Blog</h2>
            {/* Form tạo blog */}
            <form className="space-y-6">
                <input type="text" placeholder="Blog Title" className="border p-2 w-full rounded" />
                <textarea placeholder="Blog description" className="border p-2 w-full rounded h-40"></textarea>
                <div className="flex justify-center">
                    <UploadFile />
                </div>
                <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg"
                >
                    Submit Blog
                </button>
            </form>
        </div>
    );
}

export default CreateBlog;
