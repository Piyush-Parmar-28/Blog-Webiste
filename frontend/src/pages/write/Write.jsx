import { useContext, useState } from "react";
import "./write.css";
import axios from "axios";
import { Context } from "../../context/Context";

export default function Write() {
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [category, setCategory] = useState("");
    const [file, setFile] = useState(null);
    const { user } = useContext(Context);


    const handleSubmit = async (e) => {
        e.preventDefault();

        const newPost = {
            username: user.username,
            userID: user._id,
            title,
            desc,
            category
        };

        if (file) {
            const data = new FormData();
            const filename = Date.now() + file.name;
            data.append("name", filename);
            data.append("file", file);
            newPost.photo = filename;
            try {
                await axios.post("/upload", data);
            } catch (err) { }
        }
        try {
            console.log("user is: ", user);

            const res = await axios.post("/posts", newPost);
            window.location.replace("/post/" + res.data._id);
        } catch (err) { }
    };

    return (
        <div className="write">
            {file && (
                <img className="writeImg" src={URL.createObjectURL(file)} alt="" />
            )}
            <form className="writeForm" onSubmit={handleSubmit}>
                <div className="writeFormGroup">
                    <label htmlFor="fileInput">
                        <i className="writeIcon fas fa-plus"></i>
                    </label>
                    <input
                        type="file"
                        id="fileInput"
                        style={{ display: "none" }}
                        onChange={(e) => setFile(e.target.files[0])}
                    />
                    <input
                        type="text"
                        placeholder="Title"
                        className="writeInput"
                        autoFocus={true}
                        onChange={e => setTitle(e.target.value)}
                    />
                </div>

                <div className="writeFormGroup">
                    <textarea
                        placeholder="Tell your story..."
                        type="text"
                        className="writeInput writeText"
                        onChange={e => setDesc(e.target.value)}
                    ></textarea>
                </div>

                <div className="mb-3 d-flex flex-column">
                    <label>
                        <b>Add Category</b>
                    </label>
                    <select className="btn btn-secondary" name="category" onChange={e => setCategory(e.target.value)}>
                        <option value="electronics">Electronics</option>
                        <option value="study">Study</option>
                        <option value="fashion">Fashion</option>
                        <option value="kitchen">Kitchen</option>
                        <option value="beauty">Beauty</option>
                        <option value="sports">Sports</option>
                        <option value="toys">Toys</option>
                        <option value="home">Home Decor</option>
                    </select>
                </div>

                <button className="writeSubmit" type="submit">
                    Publish
                </button>
            </form>
        </div>
    );
}
