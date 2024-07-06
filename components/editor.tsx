import dynamic from "next/dynamic";
import { useMemo } from "react";
import "react-quill/dist/quill.snow.css";

interface PreviewProps {
    className: string;
    placeholder: string;
    value: string;
    onChange : () => void;
}

const modules = {
    toolbar: [
        [{ header: [1, 2, false] }],
        ["bold", "italic", "underline", "strike", "blockquote"],
        [{ list: "ordered" }, { list: "bullet" }, { indent: "-1" }, { indent: "+1" }],
        ["link", "image"],
        ["clean"],
    ],
};

const formats = ["header", "bold", "italic", "underline", "strike", "blockquote", "list", "bullet", "indent", "link", "image"];

const Preview = ({
    value, 
    placeholder, 
    className,
    onChange,
} : PreviewProps ) => {
    
const ReactQuill = useMemo(() => dynamic(() => import("react-quill"),{
        ssr : false,
        loading: () => <p>Loading editor...</p>
    }), []);

    return (
        <>
        <ReactQuill
            className={className}
            placeholder={placeholder}
            modules={modules}
            formats={formats}
            value={value}
            onChange={onChange}
        />
        </>
    );
};

export default Preview;
